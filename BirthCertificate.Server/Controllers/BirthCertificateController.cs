using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing;
using Microsoft.VisualBasic;
using OpenCvSharp;
using System.Text.RegularExpressions;
using Tesseract;


namespace BirthCertificate.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BirthCertificateController : ControllerBase
    {

        [NonAction]
        private void TextToData(string text)
        {
            Console.WriteLine(text);

            //regular expressions
            Regex registerNoRegex = new Regex(@"Register No: (\d+) =");
            Regex dateOfIssueRegex = new Regex(@"Date of Issue: (\d{2}/\d{2}/\d{4})");
            Regex dateOfRegistrationRegex = new Regex(@"Date of Registration: (\d{2}/\d{2}/\d{4})");
            Regex brNumberRegex = new Regex(@"BR Number: (.*)");
            Regex nameRegex = new Regex(@"Name: (.*)");
            Regex sexRegex = new Regex(@"Sex: (Male|Female)");
            Regex dateOfBirthRegex = new Regex(@"Date of Birth: (\d{1,2}/\d{1,2}/\d{4})");
            Regex inWordRegex = new Regex(@"In Word: (\d{1,2}[a-z]{2}, \d{4})");
            Regex orderOfChildRegex = new Regex(@"Order of Child: (\d+)");
            Regex placeOfBirthRegex = new Regex(@"Place of Birth: (.+)");
            Regex permanentAddressRegex = new Regex(@"Permanent Address: (.+)");
            Regex fathersNameRegex = new Regex(@"Father's Name: (.+)");
            Regex fathersBRNRegex = new Regex(@"Father's BRN: (.+?)\s*Father's Nationality: (.+)");
            Regex fathersNationalityRegex = new Regex(@"Father's Nationality: (.+?)\s*(?:\||$)");
            Regex fathersNIDRegex = new Regex(@"Father's NID: (.*)");
            Regex mothersNameRegex = new Regex(@"Mother's Name: (.+)");
            Regex mothersBRNRegex = new Regex(@"Mother's BRN: (.+?)\s*(?:\||$)");
            Regex mothersNationalityRegex = new Regex(@"Mother's Nationality: (.+)");
            Regex mothersNIDRegex = new Regex(@"Mother's NID: (.*)");


            //Match the regular expressions with text
            Match registerNoMatch = registerNoRegex.Match(text);
            Match dateOfIssueMatch = dateOfIssueRegex.Match(text);
            Match dateOfRegistrationMatch = dateOfRegistrationRegex.Match(text);
            Match brNumberMatch = brNumberRegex.Match(text);
            Match nameMatch = nameRegex.Match(text);
            Match sexMatch = sexRegex.Match(text);
            Match dateOfBirthMatch = dateOfBirthRegex.Match(text);
            Match inWordMatch = inWordRegex.Match(text);
            Match orderOfChildMatch = orderOfChildRegex.Match(text);
            Match placeOfBirthMatch = placeOfBirthRegex.Match(text);
            Match permanentAddressMatch = permanentAddressRegex.Match(text);
            Match fathersNameMatch = fathersNameRegex.Match(text);
            Match fathersBRNMatch = fathersBRNRegex.Match(text);
            Match fathersNationalityMatch = fathersNationalityRegex.Match(text);
            Match fathersNIDMatch = fathersNIDRegex.Match(text);
            Match mothersNameMatch = mothersNameRegex.Match(text);
            Match mothersBRNMatch = mothersBRNRegex.Match(text);
            Match mothersNationalityMatch = mothersNationalityRegex.Match(text);
            Match mothersNIDMatch = mothersNIDRegex.Match(text);


            //information from matches
            string registerNo = registerNoMatch.Success ? registerNoMatch.Groups[1].Value.Trim() : "";
            string dateOfIssue = dateOfIssueMatch.Success ? dateOfIssueMatch.Groups[1].Value : "";
            string dateOfRegistration = dateOfRegistrationMatch.Success ? dateOfRegistrationMatch.Groups[1].Value : "";
            string brNumber = brNumberMatch.Success ? brNumberMatch.Groups[1].Value.Trim() : "";
            string name = nameMatch.Success ? nameMatch.Groups[1].Value.Trim() : "";
            string sex = sexMatch.Success ? sexMatch.Groups[1].Value : "";
            string dateOfBirth = dateOfBirthMatch.Groups[1].Success ? dateOfBirthMatch.Groups[1].Value : "";
            string inWord = inWordMatch.Groups[1].Success ? inWordMatch.Groups[1].Value : "";
            string orderOfChild = orderOfChildMatch.Success ? orderOfChildMatch.Groups[1].Value : "";
            string placeOfBirth = placeOfBirthMatch.Success ? placeOfBirthMatch.Groups[1].Value.Trim() : "";
            string permanentAddress = permanentAddressMatch.Success ? permanentAddressMatch.Groups[1].Value.Trim() : "";
            string fathersName = fathersNameMatch.Success ? fathersNameMatch.Groups[1].Value.Trim() : "";
            string fathersBRN = fathersBRNMatch.Success ? fathersBRNMatch.Groups[1].Value.Trim() : "";
            string fathersNationality = fathersNationalityMatch.Success ? fathersNationalityMatch.Groups[1].Value.Trim() : "";
            string fathersNID = fathersNIDMatch.Success ? fathersNIDMatch.Groups[1].Value.Trim() : "";
            string mothersName = mothersNameMatch.Success ? mothersNameMatch.Groups[1].Value.Trim() : "";
            string mothersBRN = mothersBRNMatch.Success ? mothersBRNMatch.Groups[1].Value.Trim() : "";
            string mothersNationality = mothersNationalityMatch.Success ? mothersNationalityMatch.Groups[1].Value.Trim() : "";
            string mothersNID = mothersNIDMatch.Success ? mothersNIDMatch.Groups[1].Value.Trim() : "";








            Console.WriteLine("Register No: " + registerNo);
            Console.WriteLine("Date of Issue: " + dateOfIssue);
            Console.WriteLine("Date of Registration: " + dateOfRegistration);
            Console.WriteLine("BR Number: " + brNumber);
            Console.WriteLine("Name: " + name);
            Console.WriteLine("Sex: " + sex);
            Console.WriteLine("Date of Birth (Numeric): " + dateOfBirth);
            Console.WriteLine("Date of Birth (In Word): " + inWord);
            Console.WriteLine("Order of Child: " + orderOfChild);
            Console.WriteLine("Place of Birth: " + placeOfBirth);
            Console.WriteLine("Permanent Address: " + permanentAddress);
            Console.WriteLine("Father's Name: " + fathersName);
            Console.WriteLine("Father's BRN: " + fathersBRN);
            Console.WriteLine("Father's Nationality: " + fathersNationality);
            Console.WriteLine("Father's NID: " + fathersNID);
            Console.WriteLine("Mother's Name: " + mothersName);
            Console.WriteLine("Mother's BRN: " + mothersBRN);
            Console.WriteLine("Mother's Nationality: " + mothersNationality);
            Console.WriteLine("Mother's NID: " + mothersNID);

        }

        [NonAction]
        private void ImageToText(string base64Image)
        {
            try
            {
                // Assuming the image is received as a Base64 string in the request body

                byte[] bytes = Convert.FromBase64String(base64Image);

                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    // Convert MemoryStream to Mat (OpenCV image format)
                    Mat image = Mat.FromStream(ms, ImreadModes.Color);

                    // Convert image to grayscale
                    Mat grayImage = new Mat();
                    Cv2.CvtColor(image, grayImage, ColorConversionCodes.BGR2GRAY);

                    // Apply threshold
                    Mat thresholdImage = new Mat();
                    Cv2.Threshold(grayImage, thresholdImage, 128, 255, ThresholdTypes.Binary);

                    // Save the thresholded image to a file
                    string thresholdImagePath = "thresholded_image.png";
                    thresholdImage.SaveImage(thresholdImagePath);

                    // Perform OCR on the saved image using Tesseract
                    using (var engine = new TesseractEngine(@"G:\Csharp\BirthCertificate\BirthCertificate.Server\tessdata\", "eng", EngineMode.Default))
                    {
                        using (var img = Pix.LoadFromFile(thresholdImagePath))
                        {
                            using (var page = engine.Process(img))
                            {
                                string text = page.GetText();

                                //Console.WriteLine(text);
                                TextToData(text);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Catch Erorr: " + ex.Message);
                throw;
            }
        }





        [HttpPost(Name = "GetBirthCertificate")]
        public ActionResult Post([FromBody] string base64Image)
        {
            ImageToText(base64Image);


            return Ok(base64Image);
        }
    }
}

using BirthCertificate.Server.Models;
using BirthCertificate.Server.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using OpenCvSharp;
using System.Buffers.Text;
using System.Text.RegularExpressions;
using Tesseract;


namespace BirthCertificate.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BirthCertificateController : ControllerBase
    {

        [NonAction]
        private BirthCertificateDTO TextToData(string text, string base64Image)
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
            Regex permanentAddressRegex = new Regex(@"Permanent Address: ([^\n]+(?:\n(?!Father's Name:).*)*)");
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
            int registerNo = registerNoMatch.Success ? Convert.ToInt16(registerNoMatch.Groups[1].Value.Trim()) : 0;
            string dateOfIssue = dateOfIssueMatch.Success ? dateOfIssueMatch.Groups[1].Value : "";
            string dateOfRegistration = dateOfRegistrationMatch.Success ? dateOfRegistrationMatch.Groups[1].Value : "";
            Int64 brNumber = brNumberMatch.Success ? Convert.ToInt64(brNumberMatch.Groups[1].Value.Trim()) : 0;
            string name = nameMatch.Success ? nameMatch.Groups[1].Value.Trim() : "";
            string sex = sexMatch.Success ? sexMatch.Groups[1].Value : "";
            string dateOfBirth = dateOfBirthMatch.Groups[1].Success ? dateOfBirthMatch.Groups[1].Value : "";
            string inWord = inWordMatch.Groups[1].Success ? inWordMatch.Groups[1].Value : "";
            int orderOfChild = orderOfChildMatch.Success ? Convert.ToInt16(orderOfChildMatch.Groups[1].Value) : 0;
            string placeOfBirth = placeOfBirthMatch.Success ? placeOfBirthMatch.Groups[1].Value.Trim() : "";
            string permanentAddress = permanentAddressMatch.Success ? permanentAddressMatch.Groups[1].Value.Trim() : "";
            string fathersName = fathersNameMatch.Success ? fathersNameMatch.Groups[1].Value.Trim() : "";
            Int64 fathersBRN = fathersBRNMatch.Success ? Convert.ToInt64(fathersBRNMatch.Groups[1].Value.Trim()) : 0;
            string fathersNationality = fathersNationalityMatch.Success ? fathersNationalityMatch.Groups[1].Value.Trim() : "";
            Int32 fathersNID = fathersNIDMatch.Success ? Convert.ToInt32(fathersNIDMatch.Groups[1].Value.Trim()) : 0;
            string mothersName = mothersNameMatch.Success ? mothersNameMatch.Groups[1].Value.Trim() : "";
            Int64 mothersBRN = mothersBRNMatch.Success ? Convert.ToInt64(mothersBRNMatch.Groups[1].Value.Trim()) : 0;
            string mothersNationality = mothersNationalityMatch.Success ? mothersNationalityMatch.Groups[1].Value.Trim() : "";
            Int32 mothersNID = mothersNIDMatch.Success ? Convert.ToInt32(mothersNIDMatch.Groups[1].Value.Trim()) : 0;


            BirthCertificateDTO data = new BirthCertificateDTO();


            data.base64Image = base64Image;
            data.registerNo = registerNo;
            data.dateOfIssue = dateOfIssue;
            data.dateOfRegistration = dateOfRegistration;
            data.brNumber = brNumber;
            data.name = name;
            data.gender = sex;
            data.dateOfBirth = dateOfBirth;
            data.inWord = inWord;
            data.orderOfChild = orderOfChild;
            data.placeOfBirth = placeOfBirth;
            data.permanentAddress = permanentAddress;
            data.fathersName = fathersName;
            data.fathersBRN = fathersBRN;
            data.fathersNationality = fathersNationality;
            data.fathersNID = fathersNID;
            data.mothersName = mothersName;
            data.mothersBRN = mothersBRN;
            data.mothersNationality = mothersNationality;
            data.mothersNID = mothersNID;




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


            return data;

        }

        [NonAction]
        private BirthCertificateDTO ImageToText(string base64Image)
        {
            try
            {
                byte[] bytes = Convert.FromBase64String(base64Image);

                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    // Convert MemoryStream to Mat (OpenCV image format)
                    Mat image = Mat.FromStream(ms, ImreadModes.Color);

                    //Console.WriteLine(image);

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
                //H:\Tesseract\tessdata
                    using (var engine = new TesseractEngine(@"G:\Csharp\BirthCertificate\BirthCertificate.Server\tessdata\", "eng", EngineMode.Default))
                    {
                        using (var img = Pix.LoadFromFile(thresholdImagePath))
                        {
                            using (var page = engine.Process(img))
                            {
                                string text = page.GetText();

                                //Console.WriteLine(text);
                                BirthCertificateDTO data = TextToData(text, base64Image);

                                return data;
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
        public ActionResult Post([FromBody] ImageModel image)
        {

            if(Base64.IsValid(image.base64Image))
            {
            BirthCertificateDTO data = ImageToText(image.base64Image);
                Console.WriteLine("Image is a valid base64 string");

            return Ok(data);
            }
            else 
            {
                Console.WriteLine("Image is not a valid base64 string");
                return BadRequest("Image is not a valid base64 string");
            }



        }

    }
}

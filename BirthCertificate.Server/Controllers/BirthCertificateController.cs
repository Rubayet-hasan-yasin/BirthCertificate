using Microsoft.AspNetCore.Mvc;
using OpenCvSharp;
using Tesseract;


namespace BirthCertificate.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BirthCertificateController : ControllerBase
    {
        [HttpPost(Name = "GetBirthCertificate")]
        public ActionResult Post([FromBody] string base64Image)
        {
            try
            {
                // Assuming the image is received as a Base64 string in the request body

                byte[] bytes = Convert.FromBase64String(base64Image);

                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    // Convert MemoryStream to Mat (OpenCV image format)
                    Mat image = Mat.FromStream(ms, ImreadModes.Unchanged);

                    // Convert image to grayscale
                    Mat grayImage = new Mat();
                    Cv2.CvtColor(image, grayImage, ColorConversionCodes.BGR2GRAY);

                    // Apply threshold
                    Mat thresholdImage = new Mat();
                    Cv2.Threshold(grayImage, thresholdImage, 0, 255, ThresholdTypes.Binary);

                    // Save the thresholded image to a file
                    string thresholdImagePath = "thresholded_image.png";
                    thresholdImage.SaveImage(thresholdImagePath);

                    // Perform OCR on the saved image using Tesseract
                    using (var engine = new TesseractEngine(@"H:\Tesseract\tessdata", "eng", EngineMode.Default))
                    {
                        using (var img = Pix.LoadFromFile(thresholdImagePath))
                        {
                            using (var page = engine.Process(img))
                            {
                                string text = page.GetText();

                                Console.WriteLine(text);
                                return Ok(base64Image);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Catch Erorr: " + ex.Message);
            }


            return Ok(base64Image);
        }
    }
}

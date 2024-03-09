using BirthCertificate.Server.Models;
using BirthCertificate.Server.Models.DTO;
using BirthCertificate.Server.Operations;
using Microsoft.AspNetCore.Mvc;
using System.Buffers.Text;
using System.Net.Http.Headers;




namespace BirthCertificate.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BirthCertificateController : ControllerBase
    {
        [HttpPost]
        public ActionResult PostImageData([FromBody] ImageModel image)
        {
            if (Base64.IsValid(image.base64Image))
            {
                BirthCertificateOperation Operation = new BirthCertificateOperation();
                BirthCertificateDTO data = Operation.ExtractTextFromImage(image.base64Image);
                Console.WriteLine("Image is a valid base64 string");

                return Ok(data);
            }
            else
            {
                Console.WriteLine("Image is not a valid base64 string");
                return BadRequest("Image is not a valid base64 string");
            }
        }


        [HttpPut]
        public ActionResult PostImageData([FromBody] BirthCertificateEnglishAndBanglaData data)
        {
            Console.WriteLine(data);

            


            return Ok(data);
        }

        
    }

}
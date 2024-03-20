using BirthCertificate.Server.env;
using BirthCertificate.Server.Models;
using BirthCertificate.Server.Models.DTO;
using BirthCertificate.Server.Operations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Buffers.Text;





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
        public async Task<ActionResult> PostImageData([FromBody] BirthCertificateEnglishData BRInfoEn)
        {

           

            

            try
            {
                Env env = new Env();
                BirthCertificateOperation operation = new BirthCertificateOperation();
                //MySqlConnection connection = env.MysqlDBConnection();
                //connection.Open();

                //var command = connection.CreateCommand();

                //command.CommandType = CommandType.StoredProcedure;
                //command.CommandText = "InsertBirthCertificateEnglishAndBangla";


                //command.Parameters.AddWithValue("p_base64Image", data.base64Image);
                ////english data

                //command.Parameters.AddWithValue("p_registerNo", BRInfoEn.registerNo);
                //command.Parameters.AddWithValue("p_dateOfIssue", BRInfoEn.dateOfIssue);
                //command.Parameters.AddWithValue("p_dateOfRegistration", BRInfoEn.dateOfRegistration);
                //command.Parameters.AddWithValue("p_brNumber", BRInfoEn.brNumber);
                //command.Parameters.AddWithValue("p_name", BRInfoEn.name);
                //command.Parameters.AddWithValue("p_gender", BRInfoEn.gender);
                //command.Parameters.AddWithValue("p_dateOfBirth", BRInfoEn.dateOfBirth);
                //command.Parameters.AddWithValue("p_inWord", BRInfoEn.inWord);
                //command.Parameters.AddWithValue("p_orderOfChild", BRInfoEn.orderOfChild);
                //command.Parameters.AddWithValue("p_placeOfBirth", BRInfoEn.placeOfBirth);
                //command.Parameters.AddWithValue("p_permanentAddress", BRInfoEn.permanentAddress);
                //command.Parameters.AddWithValue("p_fathersName", BRInfoEn.fathersName);
                //command.Parameters.AddWithValue("p_fathersBRN", BRInfoEn.fathersBRN);
                //command.Parameters.AddWithValue("p_fathersNationality", BRInfoEn.fathersNationality);
                //command.Parameters.AddWithValue("p_fathersNID", BRInfoEn.fathersNID);
                //command.Parameters.AddWithValue("p_mothersName", BRInfoEn.mothersName);
                //command.Parameters.AddWithValue("p_mothersBRN", value: BRInfoEn.mothersBRN);
                //command.Parameters.AddWithValue("p_mothersNationality", BRInfoEn.mothersNationality);
                //command.Parameters.AddWithValue("p_mothersNID", BRInfoEn.mothersNID);


                ////bangla Data 

                //command.Parameters.AddWithValue("p_registerNoBn", BRInfoBn.registerNoBn);
                //command.Parameters.AddWithValue("p_dateOfIssueBn", BRInfoBn.dateOfIssueBn);
                //command.Parameters.AddWithValue("p_dateOfRegistrationBn", BRInfoBn.dateOfRegistrationBn);
                //command.Parameters.AddWithValue("p_brNumberBn", BRInfoBn.brNumberBn);
                //command.Parameters.AddWithValue("p_nameBn", BRInfoBn.nameBn);
                //command.Parameters.AddWithValue("p_genderBn", BRInfoBn.genderBn);
                //command.Parameters.AddWithValue("p_dateOfBirthBn", BRInfoBn.dateOfBirthBn);
                //command.Parameters.AddWithValue("p_inWordBn", BRInfoBn.inWordBn);
                //command.Parameters.AddWithValue("p_orderOfChildBn", BRInfoBn.orderOfChildBn);
                //command.Parameters.AddWithValue("p_placeOfBirthBn", BRInfoBn.placeOfBirthBn);
                //command.Parameters.AddWithValue("p_permanentAddressBn", BRInfoBn.permanentAddressBn);
                //command.Parameters.AddWithValue("p_fathersNameBn", BRInfoBn.fathersNameBn);
                //command.Parameters.AddWithValue("p_fathersBRNBn", BRInfoBn.fathersBRNBn);
                //command.Parameters.AddWithValue("p_fathersNationalityBn", BRInfoBn.fathersNationalityBn);
                //command.Parameters.AddWithValue("p_fathersNIDBn", BRInfoBn.fathersNIDBn);
                //command.Parameters.AddWithValue("p_mothersNameBn", BRInfoBn.mothersNameBn);
                //command.Parameters.AddWithValue("p_mothersBRNBn", BRInfoBn.mothersBRNBn);
                //command.Parameters.AddWithValue("p_mothersNationalityBn", BRInfoBn.mothersNationalityBn);
                //command.Parameters.AddWithValue("p_mothersNIDBn", BRInfoBn.mothersNIDBn);


                //command.ExecuteNonQuery();
                //connection.Close();

                

                var translate = await operation.TranslateTextApi("rubayet");

                Console.WriteLine(translate);
                return Ok(translate);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error happened in data Update:" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        
    }

    
}
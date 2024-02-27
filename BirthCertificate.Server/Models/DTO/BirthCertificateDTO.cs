using System.ComponentModel.DataAnnotations;

namespace BirthCertificate.Server.Models.DTO
{
    public class BirthCertificateDTO
    {
        [Base64String(ErrorMessage = "Image data is must be a valid base64 string")]
        public string base64Image { get; set; } = string.Empty;


        public int registerNo { get; set; } = 0;
        public string dateOfIssue { get; set; } = string.Empty;
        public string dateOfRegistration { get; set; } = string.Empty;
        public Int64 brNumber { get; set; } = 0;
        public string name { get; set; } = string.Empty;
        public string gender { get; set; } = string.Empty;
        public string dateOfBirth { get; set; } = string.Empty;
        public string inWord { get; set; } = string.Empty;
        public int orderOfChild { get; set; } = 0;
        public string placeOfBirth { get; set; } = string.Empty;
        public string permanentAddress { get; set; } = string.Empty;
        public string fathersName { get; set; } = string.Empty;
        public Int64 fathersBRN { get; set; } = 0;
        public string fathersNationality { get; set; } = string.Empty;
        public Int32 fathersNID { get; set; } = 0;
        public string mothersName { get; set; } = string.Empty;
        public Int64 mothersBRN { get; set; } = 0;
        public string mothersNationality { get; set; } = string.Empty;
        public Int32 mothersNID { get; set; } = 0;
    }
}

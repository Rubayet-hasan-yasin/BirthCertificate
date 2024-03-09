namespace BirthCertificate.Server.Models
{
    public class BirthCertificateEnglishAndBanglaData
    {
        public required string base64Image { get; set; }
        public required BirthCertificateEnglishData BRInfoEn {  get; set; }

        public required BirthCertificateBanglaData BRInfoBn { get; set; }


    }
}

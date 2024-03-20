using Newtonsoft.Json;

namespace BirthCertificate.Server.Models
{
    public class TranslationResponse
    {
        [JsonProperty("responseData")]
        public ResponseData? ResponseData { get; set; }
    }

    public class ResponseData
    {
        [JsonProperty("translatedText")]
        public string? TranslatedText { get; set; }

        public double Match { get; set; }
    }
}

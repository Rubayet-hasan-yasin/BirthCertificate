﻿using BirthCertificate.Server.Models;
using BirthCertificate.Server.Models.DTO;
using Newtonsoft.Json;
using OpenCvSharp;
using System.Text.RegularExpressions;
using Tesseract;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BirthCertificate.Server.Operations
{
    public class BirthCertificateOperation
    {

        public BirthCertificateDTO ExtractTextFromImage(string base64Image)
        {
            string text = ImageToText(base64Image);

            BirthCertificateDTO result = TextToData(text, base64Image);

            return result;
        }


        private BirthCertificateDTO TextToData(string text, string base64Image)
        {
            Console.WriteLine(text);

            //regular expressions
            Match registerNoMatch = new Regex(@"Register No\.\s*(\d+)").Match(text);
            Match dateOfIssueMatch = new Regex(@"Date of Issue:\s+(\d{2}/\d{2}/\d{4})").Match(text);
            Match dateOfRegistrationMatch = new Regex(@"Date of Registration: (\d{2}/\d{2}/\d{4})").Match(text);
            Match brNumberMatch = new Regex(@"BR Number: (.*)").Match(text);
            Match nameMatch = new Regex(@"Name:(?!.*(Mother's Name:|Father's Name:))(.+)").Match(text);
            Match sexMatch = new Regex(@"Sex: (Male|Female)").Match(text);
            Match dateOfBirthMatch = new Regex(@"Date of Birth: (\d{1,2}/\d{1,2}/\d{4})").Match(text);
            Match inWordMatch = new Regex(@"In Word: (\d{1,2}(?:st|nd|rd|th) [a-zA-Z]+, \d{4})").Match(text);
            Match orderOfChildMatch = new Regex(@"Order of (?:CRIld|Child): (\d+)").Match(text);
            Match placeOfBirthMatch = new Regex(@"Place of Birth: (.+)").Match(text);
            Match permanentAddressMatch = new Regex(@"Permanent Address: ([^\n]+(?:\n(?!Father's Name:).*)*)").Match(text);
            Match fathersNameMatch = new Regex(@"Father's Name: (.+)").Match(text);
            Match fathersBRNMatch = new Regex(@"Father's BRN: (.+?)\s*Father's Nationality: (.+)").Match(text);
            Match fathersNationalityMatch = new Regex(@"Father's Nationality: (.+?)\s*(?:\||$)").Match(text);
            Match fathersNIDMatch = new Regex(@"Father's NID: (.*)").Match(text);
            Match mothersNameMatch = new Regex(@"Mother's Name: (.+)").Match(text);
            Match mothersBRNMatch = new Regex(@"Mother's BRN: (.+?)\s*(?:\||$)").Match(text);
            Match mothersNationalityMatch = new Regex(@"Mother's Nationality: (.+)").Match(text);
            Match mothersNIDMatch = new Regex(@"Mother's NID: (.*)").Match(text);


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

        private string ImageToText(string base64Image)
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
                                //BirthCertificateDTO data = TextToData(text, base64Image);

                                return text;
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


        public BirthCertificateBanglaData TranslateDataEnToBn(BirthCertificateData BRInfoEn)
        {
            BirthCertificateBanglaData BRInfoBn = new BirthCertificateBanglaData();

            BRInfoBn.registerNoBn = TranslateNumeric(BRInfoEn.registerNo.ToString());
            BRInfoBn.dateOfIssueBn = TranslateDate(BRInfoEn.dateOfIssue);
            BRInfoBn.dateOfRegistrationBn = TranslateDate(BRInfoEn.dateOfRegistration);
            BRInfoBn.brNumberBn = TranslateNumeric(Convert.ToString(BRInfoEn.brNumber));
            BRInfoBn.nameBn = TranslateTextApi(BRInfoEn.name).Result;
            BRInfoBn.genderBn = TranslateTextApi(BRInfoEn.gender).Result;
            BRInfoBn.dateOfBirthBn = TranslateDate(BRInfoEn.dateOfBirth);
            BRInfoBn.inWordBn = TranslateDate(BRInfoEn.inWord);
            BRInfoBn.orderOfChildBn = TranslateNumeric(BRInfoEn.orderOfChild.ToString());
            BRInfoBn.placeOfBirthBn = TranslateTextApi(BRInfoEn.placeOfBirth).Result;
            BRInfoBn.permanentAddressBn = TranslateTextApi(BRInfoEn.permanentAddress).Result;
            BRInfoBn.fathersNameBn = TranslateTextApi(BRInfoEn.fathersName).Result;
            BRInfoBn.fathersBRNBn = TranslateNumeric(BRInfoEn.fathersBRN.ToString());
            BRInfoBn.fathersNationalityBn = TranslateTextApi(BRInfoEn.fathersNationality).Result;
            BRInfoBn.fathersNIDBn = TranslateNumeric(BRInfoEn.fathersNID.ToString());
            BRInfoBn.mothersNameBn = TranslateTextApi(BRInfoEn.mothersName).Result;
            BRInfoBn.mothersBRNBn = TranslateNumeric(BRInfoEn.mothersBRN.ToString());
            BRInfoBn.mothersNationalityBn = TranslateTextApi(BRInfoEn.mothersNationality).Result;
            BRInfoBn.mothersNIDBn = TranslateNumeric(BRInfoEn.mothersNID.ToString());


            return BRInfoBn;
        }
        
        private string TranslateDate(string date)
        {


            Match datePattern = new Regex(@"^(0[1-9]|[12][0-9]|3[01])(st|nd|rd|th)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec),\s+\d{4}$").Match(date);


            if (datePattern.Success)
            {
                var text = TranslateTextApi(date).Result;

                string[] textSplit = text.Split(' ');

                string firstNum = TranslateNumeric(textSplit[0]);
                string secondNum = TranslateNumeric(textSplit[2]);

                string[] BnArray = { firstNum, textSplit[1], secondNum };

                string BnDate = string.Join(" ", BnArray);

                return BnDate;
            }
            else
            {
                string[] numberArray = date.Split('/');
                string[] datenums = new string[numberArray.Length];
                for (int i = 0; i < numberArray.Length; i++)
                {
                    datenums[i] = TranslateNumeric(numberArray[i]);
                }

                string newDate = string.Join("/", datenums);
                return newDate;
            }
        }

        private string TranslateNumeric(string numbers)
        {
            Console.WriteLine(numbers);
            string[] banglaDigits = { "০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯" };
            string banglaVersion = "";

            string numString = numbers.ToString();

            

            foreach (char digit in numString)
            {
                int digitValue = int.Parse(digit.ToString());
                banglaVersion += banglaDigits[digitValue];
            }

            return banglaVersion;

        }

        private async Task<string> TranslateTextApi(string text)
        {

            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"https://api.mymemory.translated.net/get?q={text}&langpair=en|bn");


                if (response.IsSuccessStatusCode)
                {
                    string data = await response.Content.ReadAsStringAsync();

                    var translationResponse = JsonConvert.DeserializeObject<TranslationResponse>(data);

                    Console.WriteLine("t text: " + translationResponse?.ResponseData?.TranslatedText);

                    return translationResponse?.ResponseData?.TranslatedText ?? "";
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode}");
                    return "";
                }
            }

        }
    }
}

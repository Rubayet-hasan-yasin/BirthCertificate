import axios from "axios";
import { Base64 } from "js-base64";
import React from "react";

const Home = () => {
    
  

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return; 
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            const image = reader.result?.toString() || "";
            const base64String = Base64.encode(image);

            axios.post("https://localhost:7208/api/BirthCertificate", { base64Image: base64String })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        };

        reader.readAsDataURL(file);
    };


    //const fileToBase64 = (file: File): Promise<string> => {
    //    return new Promise((resolve, reject) => {
    //        const reader = new FileReader();

    //        reader.onload = () => {
    //            if (typeof reader.result === 'string') {
    //                resolve(reader.result);
    //            } else {
    //                reject(new Error('Failed to read file as base64'));
    //            }
    //        };

    //        reader.onerror = () => {
    //            reject(reader.error);
    //        };

    //        reader.readAsDataURL(file);
    //    });
    //}

    


    return (
        <section className={"bg-[#171717] h-screen flex justify-center items-center text-white"}>
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Upload Your Birth Certificate</h1>
                <p className="text-lg md:text-xl mb-8">Upload the image of your birth certificate to begin the registration process.</p>
                <label htmlFor="upload" className="btn-primary px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ease-in-out bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">Upload Image</label>
                <input id="upload" type="file" className="hidden" accept="image/*" onChange={handleFileUpload } />
            </div>
        </section>
    );
};

export default Home;

import axios from "axios";
import { Base64 } from "js-base64";
import React, { useContext } from "react";
import { AuthContext } from "../../../provider/Authprovider";
import AnikiHamster from "../../../assets/Aniki Hamster.json"
import Lottie from "lottie-react";

const Home = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { isLoading, setIsLoading }: any = useContext(AuthContext);


    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setIsLoading(true);

        const reader = new FileReader();

        reader.onloadend = () => {
            const image = reader.result?.toString() || "";
            const base64String = Base64.encode(image);

            axios.post("https://localhost:7208/api/BirthCertificate", { base64Image: base64String })
                .then(res => {
                    console.log(res.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                })
        };

        reader.readAsDataURL(file);
    };


    return (
        <section className={"bg-[#171717] h-screen flex justify-center items-center text-white"}>
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Upload Your Birth Certificate</h1>
                <p className="text-lg md:text-xl mb-8">Upload the image of your birth certificate to begin the registration process.</p>
                <label htmlFor="upload" className="btn-primary px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ease-in-out bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">Upload Image</label>
                <input id="upload" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </div>

            <div className={`absolute w-80 animation-bg rounded-full ${isLoading?"block":"hidden"}`}>
                <Lottie animationData={AnikiHamster} loop={true} />
            </div>
        </section>
    );
};

export default Home;

import { useContext } from 'react';
import AnikiHamster from "../assets/Aniki Hamster.json"
import Lottie from "lottie-react";
import { AuthContext } from "../provider/Authprovider";

const AnimationAnikiHamster = () => {
    const {isLoading} = useContext(AuthContext)
    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ${isLoading ? "block" : "hidden"}`}>
            <div className={` w-80 animation-bg rounded-full `}>
                <Lottie animationData={AnikiHamster} loop={true} />
            </div>
        </div>
    );
};

export default AnimationAnikiHamster;
import React, { ReactNode, createContext, useState } from "react";


type ProviderProps = {
    children: ReactNode;
};

type BRInformation = {
    base64Image: string;
    registerNo: number;
    dateOfIssue: string;
    dateOfRegistration: string;
    brNumber: number;
    name: string;
    gender: string;
    dateOfBirth: string;
    inWord: string;
    orderOfChild: number;
    placeOfBirth: string;
    permanentAddress: string;
    fathersName: string;
    fathersBRN: number;
    fathersNationality: string;
    fathersNID: number;
    mothersName: string;
    mothersBRN: number;
    mothersNationality: string;
    mothersNID: number;
};


export const AuthContext = createContext({});

const Authprovider = ({ children }: ProviderProps): React.JSX.Element => {
    const [BRInformation, setBRInformation] = useState<BRInformation>();
    const [isLoading, setIsLoading] = useState<boolean>(false);




    const numericBN: Record<string, string> = {
        0: "০",
        1: "১",
        2: "২",
        3: "৩",
        4: "৪",
        5: "৫",
        6: "৬",
        7: "৭",
        8: "৮",
        9: "৯",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const translate = async (text: any) => {


        const datePattern = new RegExp(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/);
        const inWordPattern = new RegExp(/^(0[1-9]|[12][0-9]|3[01])(st|nd|rd|th)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec),\s+\d{4}$/);
        
        if(inWordPattern.test(text)){
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|bn`)
            const data = await res.json();
            const bnText = data.responseData.translatedText;

            const dateArray = bnText.split(" ");
            const dateArrayBn = numberToBnNumber(dateArray);
            const newArray = [dateArrayBn[0],dateArray[1],dateArrayBn[2]]

            const bnDate = newArray.join(" ")

            return bnDate;
        }
        else if(datePattern.test(text)){
            const dateArry = text.toString().split("/")

            const dateArayBn = numberToBnNumber(dateArry);

            const bnDate = dateArayBn.join("/")
            
            return bnDate;
        }
        else if (typeof text == 'string') {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|bn`)
            const data = await res.json();
            const bnText = data.responseData.translatedText;

            return bnText;
        }
        else if(typeof text == "number"){
            const numArray = text.toString().split("")

            const bnDigits = numArray.map((num) => numericBN[num])

            const bnNumber = bnDigits.join("");
            return bnNumber;
        }
        
    };


    const numberToBnNumber=(dateArry:string[])=>{
       
        const dateArayBn = dateArry.map((num: string)=>{
            const singleDigit = num.split("");
            const bnArray = singleDigit.map(num=> numericBN[num])

            const number = bnArray.join("")

            return number
        });

        return dateArayBn;
    }

    const info = {
        BRInformation,
        setBRInformation,
        isLoading,
        setIsLoading,
        translate
    };

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;
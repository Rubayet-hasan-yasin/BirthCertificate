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
    sex: string;
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
    const [BRInformation, setBRInformation] = useState<BRInformation>({
        "registerNo": 1,
        "dateOfIssue": "11/11/2022",
        "dateOfRegistration": "11/11/2022",
        "brNumber": 11111111111111111,
        "name": "Rubayet Hasan Yasin",
        "sex": "Male",
        "dateOfBirth": "23/12/2020",
        "inWord": "10th Feb, 2020",
        "placeOfBirth": "pabna",
        "orderOfChild": 3,
        "permanentAddress": "dhaka,bangladesh",
        "fathersName": "Kalam Molla",
        "fathersBRN": 11111111111111111,
        "fathersNID": 1111111111111,
        "fathersNationality": "Bangladeshi",
        "mothersName": "Asma",
        "mothersBRN": 11111111111111111,
        "mothersNID": 1111111111,
        "mothersNationality": "Bangladeshi"
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const translate = async (text: any) => {

        const numericBN = {
            0:"০",
            1:"১",
            2: "২",
            3: "৩",
            4: "৪",
            5: "৫",
            6: "৬",
            7: "৭",
            8: "৮",
            9: "৯",
        };

        const pattern = new RegExp(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/);

        if(pattern.test(text)){
            const dateArry = text.toString().split("/")

            const dateArayBn = dateArry.map((num: string)=>{
                const singleDigit = num.split("");
                const bnArray = singleDigit.map(num=> numericBN[num])

                const number = bnArray.join("")

                return number
            })

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

            const bnDigits = numArray.map((num)=> numericBN[num])

            const bnNumber = bnDigits.join("");
            return bnNumber;
        }
        
    };

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
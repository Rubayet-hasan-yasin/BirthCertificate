import React, { ReactNode, createContext, useState } from "react";


type ProviderProps = {
    children: ReactNode;
};

type BRInformation ={
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

const Authprovider = ({children}:ProviderProps):React.JSX.Element => {
    const [BRInformation, setBRInformation] = useState<BRInformation>();
    const [isLoading, setIsLoading]= useState<boolean>(false);

    const info ={
        BRInformation,
        setBRInformation,
        isLoading,
        setIsLoading,
    };

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;
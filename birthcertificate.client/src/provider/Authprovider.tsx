import React, { ReactNode, createContext, useState } from "react";

export const AuthContext = createContext({});

type ProviderProps = {
    children: ReactNode;
};

type allInformation ={
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

const Authprovider = ({children}:ProviderProps):React.JSX.Element => {
    const [allInformation, setAllInformation] = useState<allInformation>();
    const [isLoading, setIsLoading]= useState<boolean>(false);

    const info ={
        allInformation,
        setAllInformation,
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
import { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "../../provider/Authprovider";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";


type Inputs = {
    registerNo?: number;
    dateOfIssue?: string;
    dateOfRegistration?: string;
    brNumber?: number;
    name?: string;
    gender?: string;
    dateOfBirth?: string;
    inWord?: string;
    orderOfChild?: number;
    placeOfBirth?: string;
    permanentAddress?: string;
    fathersName?: string;
    fathersBRN?: number;
    fathersNationality?: string;
    fathersNID?: number;
    mothersName?: string;
    mothersBRN?: number;
    mothersNationality?: string;
    mothersNID?: number;
}


const VerifyForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { BRInformation, translate, setBRInformation }: any = useContext(AuthContext);

    const Navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit: SubmitHandler<Inputs> = async(data) => {

        setBRInformation(data);
        const base64Image = BRInformation?.base64Image;

        const newData = { BRInfoEn: { base64Image, ...data } }

        const bnData = await translateObj(data);

        console.log(bnData);
        
        

        // axios.put("https://localhost:7208/api/BirthCertificate", newData)
        //     .then(res => console.log(res.data))


    };


    const translateObj = async(data:Inputs) => {
        const translatedData = {};
        
        
        for (const [key, value] of Object.entries(data)) {
            
            if(key == "registerNo" || key == "brNumber" || key == "orderOfChild" || key == "fathersBRN" || key == "fathersNID" || key == "mothersBRN" || key == "mothersNID"){
                translatedData[key] = await translate(parseInt(value));
            }
            else{
                translatedData[key] = await translate(value);
            }
        }      
        return translatedData;
    }

    

    useEffect(() => {
        if (!BRInformation) {
            // Navigate('/');
        }

        
        
    }, [BRInformation, Navigate])

    return (
        <section className="bg-[#171717] min-h-screen text-white py-10">
            <div className="container mx-auto">


                <h3 className="text-6xl font-bold text-gray-300 border-b-2 w-fit mx-auto">Confirm Your Information</h3>


                <form className="mt-20" onSubmit={handleSubmit(onSubmit)}>

                    {/* Register No and Date of issue */}
                    <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="registerNo"
                                {...register("registerNo", { required: true, pattern: { value: /^[0-9]+$/, message: "Please enter a valid number" } })}
                                defaultValue={BRInformation?.registerNo}
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="registerNo" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Register No.</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="dateOfIssue"

                                {...register("dateOfIssue", { required: "Date of issue is required", pattern: { value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, message: "Please enter a valid date in the format dd/mm/yyyy" } })} defaultValue={BRInformation?.dateOfIssue}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                            <label htmlFor="dateOfIssue" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of issue</label>
                        </div>
                    </div>


                    {/* Date of Registration and BR Number  */}
                    <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="dateOfRegistration"

                                {...register("dateOfRegistration", { required: "Date Of Registration is required", pattern: { value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, message: "Please enter a valid date in the format dd/mm/yyyy" } })} defaultValue={BRInformation?.dateOfRegistration}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="dateOfRegistration" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Registration</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="BRNumber"
                                defaultValue={BRInformation?.brNumber ? BRInformation?.brNumber : null}

                                {...register("brNumber", { required: "brNumber is required", pattern: { value: /^\d{17}$/, message: "Please enter your 17 digits BRNumber" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="BRNumber" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">BR Number</label>
                        </div>
                    </div>



                    {/* Name and Sex */}
                    <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="name"
                                defaultValue={BRInformation?.name}

                                {...register("name", { required: "Name is required", pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter a valid name" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="sex"
                                defaultValue={BRInformation?.sex}

                                {...register("sex", { required: "sex is required", pattern: { value: /^(Male|Female|Other)$/, message: "Please enter a valid sex (Male, Female, or Other)" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="sex" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sex</label>
                        </div>
                    </div>


                    {/* Date of Birth and Date of Birth in word*/}
                    <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="dateOfBirth"
                                defaultValue={BRInformation?.dateOfBirth}

                                {...register("dateOfBirth", { required: "Date of Birth", pattern: { value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, message: "Please enter a valid date in the format dd/mm/yyyy" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="InWord"
                                defaultValue={BRInformation?.inWord}

                                {...register("inWord", { required: "Date is required", pattern: { value: /^(0?[1-9]|[12][0-9]|3[01])(st|nd|rd|th)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec),\s+\d{4}$/, message: "Please enter a valid date in the format '10th Feb, 2000'" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="InWord" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">In Word</label>
                        </div>
                    </div>


                    {/* Place of Birth and Order of child*/}
                    <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="placeOfBirth"
                                defaultValue={BRInformation?.placeOfBirth}

                                {...register("placeOfBirth", { required: "Place of birth is required", pattern: { value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/, message: "Please enter a valid Place of Birth" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="placeOfBirth" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Place of Birth</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="orderOfChild"
                                defaultValue={BRInformation?.orderOfChild}

                                {...register("orderOfChild", { required: "Order Of Child", pattern: { value: /^[0-9]+$/, message: "Please enter a valid number" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="orderOfChild" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Order of Child</label>
                        </div>
                    </div>


                    {/* permanentAddress */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="permanentAddress"
                            defaultValue={BRInformation?.permanentAddress}

                            {...register("permanentAddress", { required: true })}

                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="permanentAddress" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Permanent Address</label>
                    </div>

                    <div className=" my-20">
                        {errors.registerNo && <p className="text-red-500 w-full">{errors.registerNo.message as ReactNode}</p>}
                        {errors.dateOfIssue && <p className="text-red-500 w-full">{errors.dateOfIssue.message as ReactNode}</p>}
                        {errors.dateOfRegistration && <p className="text-red-500 w-full">{errors.dateOfRegistration.message as ReactNode}</p>}
                        {errors.brNumber && <p className="text-red-500 w-full">{errors.brNumber.message as ReactNode}</p>}
                        {errors.name && <p className="text-red-500 w-full">{errors.name.message as ReactNode}</p>}
                        {errors.sex && <p className="text-red-500 w-full">{errors.sex.message as ReactNode}</p>}
                        {errors.dateOfBirth && <p className="text-red-500 w-full">{errors.dateOfBirth.message as ReactNode}</p>}
                        {errors.InWord && <p className="text-red-500 w-full">{errors.InWord.message as ReactNode}</p>}
                        {errors.placeOfBirth && <p className="text-red-500 w-full">{errors.placeOfBirth.message as ReactNode}</p>}
                        {errors.orderOfChild && <p className="text-red-500 w-full">{errors.orderOfChild.message as ReactNode}</p>}

                        <hr className="border-b-2 border-dashed border-gray-600 my-5" />

                        {errors.fathersName && <p className="text-red-500 w-full">{errors.fathersName.message as ReactNode}</p>}
                        {errors.fathersBRN && <p className="text-red-500 w-full">{errors.fathersBRN.message as ReactNode}</p>}
                        {errors.fathersNID && <p className="text-red-500 w-full">{errors.fathersNID.message as ReactNode}</p>}
                        {errors.fathersNationality && <p className="text-red-500 w-full">{errors.fathersNationality.message as ReactNode}</p>}

                    </div>


                    {/* father's Information */}
                    <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="fatherName"
                                defaultValue={BRInformation?.fathersName}

                                {...register("fathersName", { required: "Father's Name is required", pattern: { value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/, message: "Please enter a valid Name" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                            <label htmlFor="fatherName" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Father's Name</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="fathersBRN"
                                defaultValue={BRInformation?.fathersBRN ? BRInformation?.fathersBRN : null}

                                {...register("fathersBRN", { required: "fathersBRN is required", pattern: { value: /^\d{17}$/, message: "Please enter Father's BRN 17 digits BRNumber" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                            <label htmlFor="fatherBRN" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Father's BRN</label>
                        </div>

                    </div>

                    <div className="flex gap-10">

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="fathersNID"
                                defaultValue={BRInformation?.fathersNID ? BRInformation?.fathersNID : null}

                                {...register("fathersNID", { required: "Father's NID is required", pattern: { value: /^\d{10}(\d{3})?$/, message: "Enter a valid NID Number" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                            <label htmlFor="fatherNID" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Father's NID</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="fathersNationality"
                                defaultValue={BRInformation?.fathersNationality}

                                {...register("fathersNationality", { required: "Father Nationality is required", pattern: /^[a-zA-Z]+$/ })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                            <label htmlFor="fatherNationality" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Father's Nationality</label>
                        </div>
                    </div>


                    {/* mother's Information */}
                    <div className="flex gap-10 mt-14">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="mothersName"
                                defaultValue={BRInformation?.mothersName}

                                {...register("mothersName", { required: "Mother's Name is required", pattern: { value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/, message: "Please enter a valid Name" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                            <label htmlFor="motherName" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mother's Name</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="mothersBRN"
                                defaultValue={BRInformation?.mothersBRN ? BRInformation?.mothersBRN : null}

                                {...register("mothersBRN", { required: "MothersBRN is required", pattern: { value: /^\d{17}$/, message: "Please enter Mother's BRN 17 digits BRNumber" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                            <label htmlFor="motherBRN" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mother's BRN</label>
                        </div>

                    </div>

                    <div className="flex gap-10">

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="motherNID"
                                defaultValue={BRInformation?.mothersNID ? BRInformation?.mothersNID : null}

                                {...register("mothersNID", { required: false, pattern: { value: /^\d{10}(\d{3})?$/, message: "Enter a valid NID Number" } })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                            <label htmlFor="motherNID" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mother's NID</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="mothersNationality"
                                defaultValue={BRInformation?.mothersNationality}

                                {...register("mothersNationality", { required: "Mother's Nationality is required", pattern: /^[a-zA-Z]+$/ })}

                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="motherNationality" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mother's Nationality</label>
                        </div>
                    </div>


                    <div className="mt-20 flex justify-center">
                        <button type="submit" className="glow-on-hover font-bold text-gray-400 flex justify-center items-center gap-5">NEXT</button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default VerifyForm;
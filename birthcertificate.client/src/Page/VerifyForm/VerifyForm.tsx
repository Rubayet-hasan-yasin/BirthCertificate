import { ReactNode, useContext } from "react";
import { AuthContext } from "../../provider/Authprovider";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    registerNo?: number;
    dateOfIssue?: string;
    // dateOfRegistration: string;
    // brNumber: number;
    // name: string;
    // gender: string;
    // dateOfBirth: string;
    // inWord: string;
    // orderOfChild: number;
    // placeOfBirth: string;
    // permanentAddress: string;
    // fathersName: string;
    // fathersBRN: number;
    // fathersNationality: string;
    // fathersNID: number;
    // mothersName: string;
    // mothersBRN: number;
    // mothersNationality: string;
    // mothersNID: number;
  }


const VerifyForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { BRInformation, setBRInformation }:any = useContext(AuthContext);


    const {register, handleSubmit, formState:{errors}} = useForm();

    console.log(errors);

    const onSubmit: SubmitHandler<Inputs> = (data)=>{
        console.log(data);

        setBRInformation(data)
    };


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
                            {...register("registerNo", {required:true, pattern: {value:/^[0-9]+$/, message:"Please enter a valid number"}})} 
                            defaultValue={BRInformation?.registerNo} 
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="registerNo" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Register No.</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input 
                            type="text" 
                            id="dateOfIssue" 
                            {...register("dateOfIssue", {required: "Date of issue is required", pattern: { value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, message: "Please enter a valid date in the format dd/mm/yyyy" }})} defaultValue={BRInformation?.dateOfIssue} 
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                            <label htmlFor="dateOfIssue" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of issue</label>
                        </div>
                    </div>


                    {/* Date of Registration and BR Number  */}
                    {/* <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="dateOfRegistration" id="dateOfRegistration" defaultValue={BRInformation?.dateOfRegistration} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="dateOfRegistration" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Registration</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="BRNumber" id="BRNumber" defaultValue={BRInformation?.brNumber} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="BRNumber" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">BR Number</label>
                        </div>
                    </div> */}



                    {/* Name and Sex */}
                    {/* <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="name" id="name" defaultValue={BRInformation?.name} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="sex" id="sex" defaultValue={BRInformation?.gender} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="sex" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sex</label>
                        </div>
                    </div> */}


                    {/* Date of Birth and Date of Birth in word*/}
                    {/* <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="dateOfBirth" id="dateOfBirth" defaultValue={BRInformation?.dateOfBirth} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="InWord" id="InWord" defaultValue={BRInformation?.inWord} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="InWord" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">In Word</label>
                        </div>
                    </div> */}


                    {/* Place of Birth and Order of child*/}
                    {/* <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="placeOfBirth" id="placeOfBirth" defaultValue={BRInformation?.placeOfBirth} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="placeOfBirth" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Place of Birth</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="orderOfChild" id="orderOfChild" defaultValue={BRInformation?.orderOfChild} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="orderOfChild" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Order of Child</label>
                        </div>
                    </div> */}


                    {/* permanentAddress */}
                    {/* <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="permanentAddress" id="permanentAddress" defaultValue={BRInformation?.permanentAddress} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="permanentAddress" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Permanent Address</label>
                    </div> */}

                    <div className="border-b-2 border-dashed border-gray-600 my-20 pb-5">
                    {errors.registerNo && <p className="text-red-500 w-full">{errors.registerNo.message as ReactNode}</p>}
                    {errors.dateOfIssue && <p className="text-red-500 w-full">{errors.dateOfIssue.message as ReactNode}</p>}
                    </div>


                    {/* father's Information */}
                    {/* <div className="flex gap-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="fatherName" id="fatherName" defaultValue={BRInformation?.fathersName} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="fatherName" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Father's Name</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="fatherBRN" id="fatherBRN" defaultValue={BRInformation?.fathersBRN} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="fatherBRN" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Father's BRN</label>
                        </div>

                    </div> */}

                    {/* <div className="flex gap-10">

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="fatherNID" id="fatherNID" defaultValue={BRInformation?.fathersNID} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="fatherNID" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Father's NID</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="fatherNationality" id="fatherNationality" defaultValue={BRInformation?.fathersNationality} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="fatherNationality" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Father's Nationality</label>
                        </div>
                    </div> */}


                    {/* mother's Information */}
                    {/* <div className="flex gap-10 mt-14">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="motherName" id="motherName" defaultValue={BRInformation?.mothersName} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="motherName" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mother's Name</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="motherBRN" id="motherBRN" defaultValue={BRInformation?.mothersBRN} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="motherBRN" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mother's BRN</label>
                        </div>

                    </div> */}

                    {/* <div className="flex gap-10">

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="motherNID" id="motherNID" defaultValue={BRInformation?.mothersNID} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="motherNID" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mother's NID</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="motherNationality" id="motherNationality" defaultValue={BRInformation?.mothersNationality} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label htmlFor="motherNationality" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mother's Nationality</label>
                        </div>
                    </div> */}


                    <div className="mt-20 flex justify-center">
                        <button type="submit" className="glow-on-hover font-bold text-gray-400">CONFIRM</button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default VerifyForm;
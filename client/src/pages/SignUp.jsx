import React from "react";
import { Link } from "react-router-dom";

const SignUp= ()=>{


    return (
        <div className="flex justify-center">
        <div className="w-lg">
            <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="  userName"
                 className=" bg-white border p-1.5 rounded-lg" id="userName"/>
                 
                <input type="text" placeholder="  email"
                 className=" bg-white border p-1.5 rounded-lg" id="password"/>
                 
                <input type="text" placeholder="  userName"
                 className=" bg-white border p-1.5 rounded-lg" id="password"/>

                 <button className="bg-slate-700 hover:opacity-90
                  text-white uppercase p-2 rounded-lg disabled:opacity-40">Sign Up</button>
            </form>

            <div className="flex gap-2 mt-3">
            <p>Have an account?</p>
                <Link to={'sign-in'}>
                <span className="text-blue-600 hover:underline">Sign-in</span>
                </Link>
            </div>
        </div>
        </div>

    );
}

export default SignUp;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn= ()=>{


    const [formData, setFormData] =useState({});
    const { loading, error } = useSelector((store)=>store.user)
    const navigate= useNavigate();
    const dispatch= useDispatch();


    const handleChange= (e)=>{
         setFormData({
            ...formData,
            [e.target.id]: e.target.value
         })
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        dispatch(signInStart());
        try{
            const response= await fetch('/api/auth/sign-in',
                {
                    method :"POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );
            const jsonData= await response.json();
            if(jsonData.success===false){
                dispatch(signInFailure(jsonData.message));
                return;
            }
            console.log(jsonData);
            dispatch(signInSuccess(jsonData));
            navigate('/');
    
        } catch(e){
            dispatch(signInFailure(e.message));
            console.log(e.message);
        }
        
    }


    return (
        <div className="flex justify-center">
        <div className="w-lg">
            <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
                <input type="text" placeholder="  email"
                 className=" bg-white border p-1.5 rounded-lg" id="email" onChange={handleChange}/>
                 
                <input type="password" placeholder="  password"
                 className=" bg-white border p-1.5 rounded-lg" id="password" onChange={handleChange}/>

                 <button disabled={loading} type="submit" className="bg-slate-700 hover:opacity-90
                  text-white uppercase p-2 rounded-lg disabled:opacity-40">{(loading) ? 'loading...' : 'Sign in'}</button>

                  <OAuth></OAuth>
            </form>

            <div className="flex gap-2 mt-3">
            <p>Don't Have an account?</p>
                <Link to={'/sign-up'}>
                <span className="text-blue-600 hover:underline">Sign up</span>
                </Link>
            </div>
            <div>
                {(error) && <p className="text-red-500">{error}</p>}
            </div>
        </div>
        </div>

    );
}

export default SignIn;
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { uploadImage } from "../utills/uploadImage";
import { printSupabase, supabase } from "../supabaseClient";

const Profile = () => {
  let fileRef = useRef(null);
  const { currentUser } = useSelector((store) => store.user);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});


   //this function pick the selected picture from input and save it in file variable
      const handleFileChange= async (event)=>{
        console.log("handle change is called");
        const file = event.target.files[0];
        handleUpload(file);
      }


      //this function call to uploadImage function that is in separate file
      //and set public url on the useState() of imageUrl
 const handleUpload= async (file)=>{
        const userName= currentUser;
        const result = await uploadImage(file, userName);
        if (result.error) {
            alert("Upload failed: " + result.error);
          } else {
            setImageUrl(result.publicData.publicUrl);
            console.log(result.publicData.publicUrl);
          }
      }


  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div>
        <h1 className="text-center text-3xl text font-semibold my-7">
          Profile
        </h1>
      </div>

      <div className="flex justify-center">
        <img onClick={()=>fileRef.current.click()}
          className="w-30 h-30 rounded-full"
          src= {imageUrl=="" ? `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLeor7Lf4ePn6eqrsbW5vsHIzM7a3d60ur3BxsjR1NbN0dPX2tzr7O29wsX2DjRMAAADaUlEQVR4nO2bW3LkIAwADYi3be5/25iZZB4bxyDZgqkt+ivZn+0SQgahTNNgMBgMBoPBYDAYDAaDwWCaAGBSG/mn3i53AFQMxt8xdpm6ewE466XU4getpZlVVy9YjHgKPcRE6Ke1KclfRnct2UkLprATpWe05g5W4PzfShmZVHOneGh0D1ZjK5j/yKZ3lpZLCPZ46R7Bcu2sKuN0i1Uzp1gXpxvN8qpeSQjTyMkgAiV0aJFWMGOctnrVpLZXJ/k3DRYQAi5Q2wJGdqkFqZThXj98oHKouK2wGZVhzqra78s/oXK8VobgxF2rHMVpY+WUipSU2goo5/pBoqTUtn6cZ+OV5sScVLTV4y0Kjhgp4fmOVajT3TuMUshTyxPG8kmr5xnGmnBCiu8C8b9JMS7fRyY6vSQwSi0fWDwn9YmfGaBKBUap1dOctGU8JVC3H29LaCGePHnvWKT104lVCgIpUMwXd1JR4KxSGcr+Y917NwhFXTIrTYQ7coNeHjhsVnFnVGZFtTyZL6IPFM7Js/YRfgBcWWduAz2sEN082e55prrPwV+iXii89T3i1NKp8tWhzWsDzqpxnDKlO6AW7J3q38BymFjSdHlvP3pu12LuYHRjdUHuaWlhew5xgApe6Fex7RffLUoPrWmxRkipM1KKNLv+IzjfuBjnuOTv3GcYAawvQN8Rqvy/K7dEG5L5Po4ak4KdF9dpvAtWtdhkvL5l02ue538RPoWoYG0oBpOKQUh9WNJz3pvZqSYRg9VZL3bL017B8iFyxwsmZ2uFniFLC2MpBYh7024VWt4yVQpQ9jiLDr1kYGhaHw+71WiJdHGTaosSMpP2kOnKWwTMlWfyAvq63ic4T+2//ta66L4M9iqju1Y6Xx+Kk5N4q9NTJhDP7bl9rZOZZS/Lple2S8UJJ+IYQhEt6ImF7EShoJasq1P8DeIjBGecMoRYAbeT0Ohsh8Cy797AdmjpT9gItEEtIL4vTULiPoTEx0YsGpHslLlJGr5eqs3iZRCN2tTKSVTPMNGnDwjoVPcgQX1SJ1pVherE7AhJqq6t3Wzr3amq67hHqvPImtMxceiVjimn+koaWT5DTaq3zahMcf2A8ucC5yhXdfqEG51UWrx23+InvphSLb97PxQz3cv2FN++VQeKyzcYDAaDwaA9XxcLKh2A6JUdAAAAAElFTkSuQmCC` 
            : imageUrl
          }
          alt="profile pic"
        />
      </div>
      <div className="w-lg">
        <form className="flex flex-col gap-3">
        {//this input field is hidden it only used to pick image from storage
        //it is called by profile picture click
        }
        <input type="file" accept="image/*" ref={fileRef} onChange={handleFileChange} hidden/>

          <input
            type="text"
            placeholder=" userName"
            className=" bg-white p-1.5 rounded-lg"
            id="userName"
          />

          <input
            type="text"
            placeholder="email"
            className=" bg-white p-1.5 rounded-lg"
            id="email"
          />

          <input
            type="text"
            placeholder="password"
            className=" bg-white p-1.5 rounded-lg"
            id="password"
          />
          <button
            type="button"
            className="text-center hover:opacity-90 text-white rounded-lg p-2 bg-slate-700 uppercase"
          >
            Update
          </button>
        </form>
      </div>
      <div className="flex w-lg justify-between text-red-700 mt-3">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;

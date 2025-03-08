import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { uploadImage } from "../utills/uploadImage";
import { printSupabase, supabase } from "../supabaseClient";
import { uploadFailure, uploadStart, uploadSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";


const Profile = () => {
  let fileRef = useRef(null);
  const { currentUser, error } = useSelector((store) => store.user);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const dispatch= useDispatch();
  const [updateSuccess, setUpdateSuccess]= useState(false);

   //this function pick the selected picture from input and save it in file variable
      const handleFileChange= async (event)=>{
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
            setFormData({...formData, avatar: result.publicData.publicUrl});
            console.log(formData);
          }
      }

      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        console.log(formData);
      };

      const handleSubmit= async (e)=>{
        e.preventDefault();

        try{
          dispatch(uploadStart());
        const response= await fetch(`/api/user/update/${currentUser._id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          }
        );

        const jsonData= await response.json();
        if(jsonData.success ==false){
          dispatch(uploadFailure(jsonData.message));
          setUpdateSuccess(false);
          return;
        }
        dispatch(uploadSuccess(jsonData));
        setUpdateSuccess(true);
      }catch(e){
        dispatch(uploadFailure(e.message));
        setUpdateSuccess(false);
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
          src= {imageUrl=="" ?  currentUser.avatar : imageUrl}
          alt="profile pic"
        />
      </div>
      <div className="w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {//this input field is hidden it only used to pick image from storage
        //it is called by profile picture click
        }
        <input type="file" accept="image/*" ref={fileRef} onChange={handleFileChange} hidden/>

          <input
            type="text"
            placeholder=" userName"
            defaultValue={currentUser.userName}
            className=" bg-white p-1.5 rounded-lg"
            id="userName"
            onChange={handleInputChange}
          />

          <input
            type="text"
            defaultValue={currentUser.email}
            placeholder="email"
            className=" bg-white p-1.5 rounded-lg"
            id="email"
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="password"
            className=" bg-white p-1.5 rounded-lg"
            id="password"
            onChange={handleInputChange}
          />
          <button
            type="submit"
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

      <div className="flex w-lg justify-between text-red-700 mt-3">
        <span className="">{error ? error : ''}</span>
        <span className="text-green-700">{updateSuccess ? 'user updated Successfully!' : ''}</span>
      </div>

      <div className="flex w-lg justify-between text-green-700 mt-3" >
     
      </div>
    </div>
  );
};

export default Profile;

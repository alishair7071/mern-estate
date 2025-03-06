import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((store) => store.user);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div>
        <h1 className="text-center text-3xl text font-semibold my-7">
          Profile
        </h1>
      </div>
      <div className="flex justify-center">
        <img
          className=" rounded-full"
          src={currentUser.avatar}
          alt="profile pic"
        />
      </div>
      <div className="w-lg">
        <form className="flex flex-col gap-3">
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

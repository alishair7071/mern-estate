import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

  const { currentUser }= useSelector((store)=>store.user);
  const [searchTerm, setSearchTerm]= useState('');
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault(); 
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery= urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }


  useEffect(()=>{
    const urlParams= new URLSearchParams(window.location.search);
    const searchTermFromUrl= urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }

  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center w-24 sm:w-64">
          <input
            className=" focus:outline-none"
            type="text"
            value={searchTerm}
            placeholder="Search..."
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button type="submit"> 
          <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-6">
            <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Home
          </li>
          </Link>
          <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            About
          </li>
          </Link>


          <Link to="/profile">
          {currentUser? <img className="w-7 h-7 rounded-full object-cover" src={currentUser.avatar} alt="profile"></img>
          : <li className="text-slate-700 hover:underline">Sign In</li>
          }
          
          </Link>


          </ul>
      </div>
    </header>
  );
};

export default Header;

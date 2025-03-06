import React from "react";
import { useSelector } from "react-redux";

const Home= ()=>{

    const { loading, error, currentUser } = useSelector((store)=>store.user)

    const printReduxData=()=>{

        console.log("loading: "+loading);
        console.log("error: "+error);
        console.log("currentUser: "+JSON.stringify(currentUser));

    }

    return (
        <div>
            Home
            <br />
            <button onClick={()=>printReduxData()}>print data</button>
        </div>
    );
}

export default Home;
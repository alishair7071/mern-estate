const  mongoose  = require("mongoose");
const listingModel = require("../models/listing.model");


const createListing=async (req, res, next)=>{

      console.log(req.body);

      try{
            console.log("enterd in try");

            const listing= await listingModel.create(req.body);
            res.status(201).json(listing);

            console.log("ending try");
        
      }catch(e){
            console.log("enter in catch");

        next(e.message);
        console.log(e.message);
      }


}

module.exports= createListing;
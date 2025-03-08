const  mongoose  = require("mongoose");
const listingModel = require("../models/listing.model");


const createListing=async (req, res, next)=>{

      try{

            const listing= await listingModel.create(req.body);
            res.status(201).json(listing);
        
      }catch(e){
        next(e);
      }


}

module.exports= createListing;
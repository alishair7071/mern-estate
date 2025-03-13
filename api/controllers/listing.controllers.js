const mongoose = require("mongoose");
const listingModel = require("../models/listing.model");
const errorHandler = require("../utills/error");

const createListing = async (req, res, next) => {
  console.log(req.body);
  try {
    console.log("enterd in try");
    const listing = await listingModel.create(req.body);
    res.status(201).json(listing);
  } catch (e) {
    next(e.message);
    console.log(e.message);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await listingModel.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can delete only your own listing"));
  }
  try {
    await listingModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "listing has been deleted",
    });
    console.log("Deleted");
  } catch (e) {
    next(e);
  }
};

const updateListing = async (req, res, next) => {
  const listing = await listingModel.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "liting not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listing"));
  }

  try {
    const updatedListing = await listingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (e) {
      next(e);
  }
};


const getListing= async (req, res, next)=>{

  try{
    const listing= await listingModel.findById(req.params.id);
    if(!listing){
      return next(errorHandler(404, 'listing is not found'));
    }
    res.status(200).json(listing);

  }catch(e){
    next(e);
  }
      
}


module.exports = { createListing, deleteListing, updateListing, getListing };

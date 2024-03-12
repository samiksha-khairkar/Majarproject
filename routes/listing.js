const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/trend", listingController.renderTrend);
router.get("/rooms", listingController.renderRooms);
router.get("/iconic_cities", listingController.renderIconicCities);
router.get("/mountains", listingController.renderMountains);
router.get("/castles", listingController.renderCastles);
router.get("/amazing_pools", listingController.renderAmazingPools);
router.get("/camping", listingController.renderCamping);
router.get("/farms", listingController.renderFarms);
router.get("/arctic", listingController.renderArctic);

router
 .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn, 
        upload.single('listing[image]'),
        validateListing, 
        wrapAsync(listingController.createListing)
    );
    
// New Route
router.get("/new", isLoggedIn, listingController.renderNewform);

router.route("/:id")
    .get(
        wrapAsync(listingController.showListing))
    .put(
    isLoggedIn, 
    isOwner,
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(listingController.updateListing)
    )
    .delete( 
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.destroyListing)
    );

//Edit Route
router.get("/:id/edit", 
isLoggedIn, 
isOwner,
wrapAsync(listingController.renderEditForm));

module.exports = router;

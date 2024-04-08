const express = require("express");
const router = express.Router();
const Url = require('../models/urlModel');
// const nanoid = import('nanoid');
const baseUrl = 'http://localhost:1335/urlapi/'

// Generate a unique short ID with a length of 6
function generateShortId() {
  let shortId;
    // Generate a random number between 100000 (inclusive) and 999999 (exclusive)
    shortId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    // Convert the number to a string and remove leading zeros (if any)
    shortId = shortId.toString().padStart(6, '0');
    return shortId;
};

router.post("/", async (req, res) => {
    try {
      const { longUrl } = req.body;
      // longUrl => id;
    //   const existingUrl = await Url.findOne({ longUrl });
    //   if (existingUrl) {
    //     return res.json({ shortUrl: existingUrl.shortId }); // Return existing short URL
    //   }

    const shortId = generateShortId();
       const url = new Url({ longUrl, shortId });
      
    await url.save();

    return res.status(200).json({
        status: "ok",
        shortUrl: `${baseUrl}/${shortId}`
      })
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating short URL' });
  }
});
  
// Redirect to the original long URL
router.get('/:short', async (req, res) => {
    try {
      const shortId = req.params.short;
      const url = await Url.findOne({shortId});
      if (!url) {
        return res.status(404).json({ error: 'Short URL not found' });
      }
  
      res.redirect(url.longUrl);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving URL' });
    }
  });
  
  module.exports = router
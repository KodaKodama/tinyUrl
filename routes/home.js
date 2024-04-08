const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res)=> {
    const staticPath = path.join(__dirname, 'static', 'index.html');
    res.sendFile(staticPath);
});

module.exports = router;
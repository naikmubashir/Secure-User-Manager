const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'../views','index.html'));
});

router.get('/newpage(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,"../views",'new-page.html'));
});

router.get('/oldPage(.html)?', (req,res)=>{
    res.redirect(301,'/newPage.html'); //302/304 is default for redirect.. 301 is for permanent redirect
})

module.exports =router;
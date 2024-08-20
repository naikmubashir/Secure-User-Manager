const User = require('../model/User');

const bcrypt = require('bcrypt'); // to check the hashed password

const jwt = require('jsonwebtoken');

const handleLogin = async (req,res)=>{

    const {user,pwd} = req.body;
    if(!user || !pwd ) return res.status(400).json({'message':'Username and password are required...'});
    const foundUser = await User.findOne({username:user}).exec();
    if(!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd,foundUser.password);

    if(match){

        const roles = Object.values(foundUser.roles);

        //create JWT
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "username":foundUser.username,
                    "roles":roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'120s'}
        );

        const refreshToken = jwt.sign(
            {
                "username":foundUser.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );

        //saving the refreshToken with current user in database
        foundUser.refreshToken= refreshToken;
        const result = await foundUser.save();
        console.log(result);

        //Also, saving the refreshToken in memory( httpOnly cookie)
        res.cookie('jwt',refreshToken, {httpOnly:true, sameSite:'None',  maxAge:24*60*60*1000});//secure:true,

        //accessToken for the front end developer
        res.json(accessToken);
        
    }else{
        res.sendStatus(401);
    }

}

module.exports= handleLogin
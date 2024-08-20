const User= require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res)=>{
    const {user,pwd} = req.body;
    if( !user || !pwd) return res.status(400).json({'message':"Username and password are required...."});

    //check for duplicates
    const duplicates = await User.findOne({username:user}).exec();
    if(duplicates) return res.sendStatus(409);//conflict

    try{
        const hashPwd = await bcrypt.hash(pwd,10);

        const result = User.create({
            "username":user,
            "password":hashPwd
        });
        console.log(user);

        res.status(201).json({'Success': `New user ${user} sucessfully created....`})
    }
    catch(err){
        res.status(500).json({'message':err.message});
    }
}

module.exports = handleNewUser;
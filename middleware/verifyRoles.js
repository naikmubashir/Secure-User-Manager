const verifyRoles =(...allowedRoles)=>{
    return (req, res, next )=>{
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles.map((role)=>rolesArray.includes(role)).find(val=>val===true);//.find will return true whenit will find the first true
        console.log(result);
        if (!result) return res.sendStatus(401);
        
        next();
    }
}

module.exports = verifyRoles

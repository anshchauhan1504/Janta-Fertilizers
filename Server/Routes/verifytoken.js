const jwt=require("jsonwebtoken")

const verifytoken=(req,res,next)=>{
    const authHeader=req.headers.token //req.headers is for verify token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) {
                res.status(403).json("Token is not valid");
            }else{
                req.user=user;
                next(); //It will leave this function here and move to user
            }
        })

    }else{
        return res.status(401).json("You are not authenticated");
    }
}

const verifytokenandauthorization=(req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
}

const verifytokenandadmin=(req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
}

module.exports={verifytoken,verifytokenandauthorization,verifytokenandadmin};
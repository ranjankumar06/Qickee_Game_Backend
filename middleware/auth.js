const jwt=require('jsonwebtoken');
exports.authCustomer=(req,resp,next)=>{
    if(req.header('Authorization').replace('Bearer ', '')){
        const token=req.header('Authorization').replace('Bearer ', '');
        
        const user=jwt.verify(token,"this is my");
        req.user=user;
        if(req.user=="user"){
            return resp.status(400).json({success:false,Message:"invalid user !"})
         }
         next();
        
    }else{
        return resp.status(400).json({success:false,Message:'Authorization required'});
    }
   
    
}
const UserSchema=require('../model/UserSchem');
const bcrypt=require('bcrypt')
const jwtToken=require('jsonwebtoken')

const signUp=(req,resp)=>{
    bcrypt.hash(req.body.password,10, function(err, hash) {
        const user = new UserSchema({
            email:req.body.email,
            password:hash,
            name:req.body.name,
        });
        user.save().then(result=>{
            const token =  jwtToken.sign({
                email:req.body.email,
                name:req.body.name,

            },'key')

            resp.status(201).json({result:token,massage:'saved'})
        }).catch(erro=>{
            resp.status(500).json({error:erro,massage:"internal server erro"})
        })

    })




}
const login=(req,resp)=>{
    UserSchema.findOne({email:req.body.email}).then(existsUser=>{
        if (existsUser!=null){

            bcrypt.compare(req.body.password, existsUser.password, function(err, result) {
               if (result){
                   const token =  jwtToken.sign({
                       email:req.body.email,
                       name:req.body.name,

                   },'key');
                   resp.status(200).json({result:token})
               }else{
                   resp.status(401).json({message:"UnAuthorize Attept"})
               }
            });


        }else {
            resp.status(404).json({message:"Not FGound"})
        }

    });


}
module.exports = {
    signUp,login
}
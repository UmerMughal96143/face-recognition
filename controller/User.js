const mongoose = require('mongoose');
const User = require('../modal/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//POST Request
//Register New Users

exports.registerUser = async(req,res,next) => {

    User.find({
        email : req.body.email
    }).exec()
    .then(user => {
        if(user.length  >= 1){
            console.log(user);
            return res.status(409).json({
                message : 'User Exist'
            })
        }else {
            bcrypt.hash(req.body.password , 10 , (err , hash)=> {
                if(err){
                    return res.status(500).json({
                        error : err
                    })
                }else {
                    const { name, email, password } = req.body;
                    console.log(req.body);

                    const user = new User({
                      _id: new mongoose.Types.ObjectId(),
                      name: req.body.name,
                      email: req.body.email,
                      password: hash,
                      entries : 0,
                    });
                     user
                       .save()
                       .then((result) => {
                         console.log(result);
                         res.status(201).json({
                           message: "User Created",
                           data: user,
                           success: true,
                         });
                       })
                       .catch((err) => {
                         res.status(500).json({
                           err: err,
                         });
                       });
                }
            })
        }
    })

}


//POST Request
//Signed In Users

exports.signinUser = async (req, res, next) => {

    User.find({
      email: req.body.email,
    })
    .exec()
    .then(user => {
        console.log(user)
        if(user < 1){
            console.log(user);
            return res.status(401).json({
                message : 'AuthFaileeeeeeeeeeed'
            })
        }
        bcrypt.compare(
            req.body.password,
            user[0].password,
            (err , result) => {
                if(err){
                    
                    return res.status(401).json({
                        Error : err
                    })
                }
                if(result){
                    return res.status(200).json({
                        message : 'Auth Successfull',
                        data : user ,
                    })
                }
                 return res.status(401).json({
                   message: "AuthFaiiiiiiiled",
                 });
            }
            
        )
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            err : err
        })
    })

  
};



//POST Image Count 

exports.postImage = async (req , res , next ) => {

    const {id} = req.body;
    console.log(req.body)
    let found = false ;
    
    User.find({
        _id : id 
    }).exec()
    .then(user => {
        console.log(user)
        user.forEach(user => {
                user
               found = true;
               user.entries++;
               user.save();
               return res.status(200).json({
                 data: user.entries,
               }); 
            
        })
        
    })

}


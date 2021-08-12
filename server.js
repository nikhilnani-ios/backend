/*npm dependencies*/
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

/*local dependencies*/ 
import Hospital from "./model.js";

/*const port */
const port = process.env.PORT||5000;
var hospitalName="";
var hospitalId="";
/*app config */
const app = express();
app.use(bodyParser.json({extended: true}));
app.use(cors({
    origin:process.env.FRONTEND_CONNECTION_URL
}));

/*mongoose setup */
const mogodburl = process.env.MONGOOSE_CONNECTION_URL
mongoose.connect(mogodburl,{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},function(err){
    if(err){
        console.log(err);
    }
    else
    {
        console.log("sucess fully connected");
    }
});
mongoose.set('useFindAndModify', false);
app.post("/hospitalregister",(req,res)=>{
    const hospitalname=req.body.hname;
    const hospitalid=req.body.hid;
    const location = req.body.location;
    Hospital.findOne({hospital_id:hospitalid},(err,result)=>{
        if(err)
        {
            res.status(400).json({message:"database error"});
        }
        else{
            if(result){
                res.status(400).json({message:"user already found"});
            }
            else{
                const new_hospital = new Hospital({
                    hospital_name:hospitalname,
                    hospital_id:hospitalid,
                    hospital_password:req.body.hpasscode,
                    hospital_location:location,
                    o_positive:0,
                    o_negative:0,
                    ab_positive:0,
                    ab_negative:0,
                    a_positive:0,
                    a_negative:0,
                    b_positive:0,
                    b_negative:0
                });
                new_hospital.save();
                hospitalName=hospitalname;
                hospitalId=hospitalid;
                res.status(200).json({message:"user created succesfully"})
            }
        }
    });
});
app.post("/hospitallogin",(req,res)=>{
    Hospital.findOne({hospital_id:req.body.hospitalId},function(err,result){
        if(err)
        {
            res.status(400).json({message:"database error"});
        }
        else
        {
            if(result)
            {
                if(result.hospital_password===req.body.hospital_password)
                {
                    hospitalId=req.body.hospitalId;
                    res.status(200).json({message:result.hospital_name});
                }
                else{
                    res.status(400).json({message:"password incorrect"});
                }
            }
            else
            {
                res.status(400).json({message:"user not found"});
            }
        }
    })
});
app.post("/bloodtypes",(req,res)=>{
    Hospital.findOneAndUpdate({hospital_id:hospitalId},{
        o_positive:req.body.Opos,
        o_negative:req.body.Oneg,
        ab_positive:req.body.ABpos,
        ab_negative:req.body.ABneg,
        a_positive:req.body.Apos,
        a_negative:req.body.Aneg,
        b_positive:req.body.Bpos,
        b_negative:req.body.Bneg
    },function(err,result){
        if(err)
        {
            res.status(400).json({message:"database error"});
        }
        else
        {
            if(result)
            {
                console.log("this is the result");
                console.log(result);
                res.status(200).json({message:"user found"});
            }
            else
            {
                res.status(400).json({message:"user not found"});
            }
        }
    })
});
app.post("/gethospitals",function(req,res){
    const bloodtype = req.body.bloodtype;
    if(bloodtype==="abpos")
    {
        Hospital.find({ab_positive:{$gte:1}},"hospital_name hospital_id ab_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="abneg")
    {
        Hospital.find({ab_negative:{$gte:1}},"hospital_name hospital_id ab_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="apos")
    {
        Hospital.find({a_positive:{$gte:1}},"hospital_name hospital_id a_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="aneg")
    {
    Hospital.find({a_negative:{$gte:1}},"hospital_name hospital_id a_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="bpos")
    {
        Hospital.find({b_positive:{$gte:1}},"hospital_name hospital_id b_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        }); 
    }
    else if(bloodtype==="bneg")
    {
        Hospital.find({b_negative:{$gte:1}},"hospital_name hospital_id b_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="opos")
    {
        Hospital.find({o_positive:{$gte:1}},"hospital_name hospital_id o_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="oneg")
    {
        Hospital.find({o_negative:{$gte:1}},"hospital_name hospital_id o_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
});
app.post("/location",function(req,res)
{
    const location = req.body.location;
    const bloodtype = req.body.blood_type;
    if(location==="India")
    {
        if(bloodtype==="abpos")
    {
        Hospital.find({ab_positive:{$gte:1}},"hospital_name hospital_id ab_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="abneg")
    {
        Hospital.find({ab_negative:{$gte:1}},"hospital_name hospital_id ab_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="apos")
    {
        Hospital.find({a_positive:{$gte:1}},"hospital_name hospital_id a_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="aneg")
    {
    Hospital.find({a_negative:{$gte:1}},"hospital_name hospital_id a_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="bpos")
    {
        Hospital.find({b_positive:{$gte:1}},"hospital_name hospital_id b_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        }); 
    }
    else if(bloodtype==="bneg")
    {
        Hospital.find({b_negative:{$gte:1}},"hospital_name hospital_id b_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="opos")
    {
        Hospital.find({o_positive:{$gte:1}},"hospital_name hospital_id o_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="oneg")
    {
        Hospital.find({o_negative:{$gte:1}},"hospital_name hospital_id o_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    }
    else{
     
        if(bloodtype==="abpos")
    {
        Hospital.find({hospital_location:location,ab_positive:{$gte:1}},"hospital_name hospital_id ab_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="abneg")
    {
        Hospital.find({hospital_location:location,ab_negative:{$gte:1}},"hospital_name hospital_id ab_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="apos")
    {
        Hospital.find({hospital_location:location,a_positive:{$gte:1}},"hospital_name hospital_id a_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="aneg")
    {
    Hospital.find({hospital_location:location,a_negative:{$gte:1}},"hospital_name hospital_id a_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="bpos")
    {
        Hospital.find({hospital_location:location,b_positive:{$gte:1}},"hospital_name hospital_id b_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        }); 
    }
    else if(bloodtype==="bneg")
    {
        Hospital.find({hospital_location:location,b_negative:{$gte:1}},"hospital_name hospital_id b_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="opos")
    {
        Hospital.find({hospital_location:location,o_positive:{$gte:1}},"hospital_name hospital_id o_positive",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }
    else if(bloodtype==="oneg")
    {
        Hospital.find({hospital_location:location,o_negative:{$gte:1}},"hospital_name hospital_id o_negative",function(err,result)
        {
            if(err)
            {
                res.status(400).json({message:"databse error"});
            }
            else{
                if(result)
                {
                    res.status(200).json(result);
                }
            }
        });
    }

    }
})
app.get("/",function(req,res){
    res.send("<h1>i am up and running</h1>")
});
app.listen(port,function(){
    console.log("server is up and running");
});
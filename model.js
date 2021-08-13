import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';
import dotenv from "dotenv";
dotenv.config();
const stext = process.env.SECRET_TEXT;
const hospital_schema = new mongoose.Schema({
    hospital_name:String,
    hospital_id:String,
    hospital_password:String,
    hospital_location:String,
    o_positive:Number,
    o_negative:Number,
    ab_positive:Number,
    ab_negative:Number,
    a_positive:Number,
    a_negative:Number,
    b_positive:Number,
    b_negative:Number
});
hospital_schema.plugin(encrypt,{secret:stext,
    encryptedFields:['hospital_password']
});
const Hospital = mongoose.model('Hospital',hospital_schema);

export default Hospital;
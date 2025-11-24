import mongoose from "mongoose";

//create a collection in the database
const userSchema = new mongoose.Schema({
    name : {type:String , required : true},
    email : {type : String , required : true , unique:true},
    password :{type : String , required : true},
},{timestamps:true});


//export the table that should be available for everyone
export default mongoose.model("User",userSchema);
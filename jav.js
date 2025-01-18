import express from "express";
import data from "./data/mock.json";

const expresss = require("express");
const app = express();
app.use(express.json());




//CRUD Operations

//To display all the data 

app.get("/jsondata",(req,res)=>{
   res.json(data) ;
})

//To add a record in json data

app.post("/additem",async (req,res)=>{
   const student = {
      "first_name":req.body.first_name ,
      "last_name":req.body.last_name,
      "email":req.body.email
   }
   try{
      data.push(student) ;
      res.json(data) ;
   }
   catch(err){
      res.send(err) ;
   }
})

//To update a field  in json data 

app.patch("/update/:id", async (req,res)=>{
   const id = Number(req.params.id) ;
   const {first_name} = req.body ;
   
   
   try{
      const userUpdate = data.find(item => (item.id === id)) ;
      
      if(!userUpdate){
         res.status(202).res.send("user not found") ;
      }
      else if (first_name) userUpdate.first_name = first_name ;
     
     res.json({message:"new update  is successfully updated.",data}) ;
   }
   
   
   catch(err){
      res.status(500).send({error:"An error occurred",details:err});
   }
    
})

//To update entire record in  json data 

app.put("/change/:id",async (req,res)=>{
   const id = Number(req.params.id) ;
   const {first_name,last_name,email,gender,} = req.body ;

   

   const  changedValues = data.find(value => (value.id === id))


   if(first_name) changedValues.first_name = first_name ;
   if(last_name) changedValues.last_name = last_name ;
   if(email) changedValues.email =  email ;
   if(gender) changedValues.gender = gender ;
   res.json({message:"successfully updated",data})

   



})
//deleting the entry  

app.delete("/delete/:id",async (req,res) =>{
   const id = Number(req.params.id) ;
   const value = data.findIndex(studId => (studId.id === id ))
   data.splice(value) ;
   res.json({message:"deleted successfully",data}) ;
})

app.listen(3000,()=>{
   console.log("you server is running on the local host 3000 port....") ;
})
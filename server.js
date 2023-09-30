const mongoose=require("mongoose");
//import mongoose from 'mongoose';

const Connection=async (username='indeevar1019',password='leomessi')=>{
    const URL=`mongodb+srv://${username}:${password}@google-docs-clone.kypgn1s.mongodb.net/?retryWrites=true&w=majority`;
    try{
       await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
       console.log('Database Connected');

    }catch(err){
        console.log('error database',err);
    }

}
Connection();
//import Connection from "./Database/db.js";
// const {Schema,model} = require('mongoose')
// const Document=new Schema({
//     _id:String,
//     data:Object
// });
const Document=require('./Document');
//Connection();

// mongoose.connect("mongodb://localhost:27017/google-docs-clone",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     // useFindAndModify:false,
//     // useCreateIndex:true,
// })
//var conn = mongoose.connection;


const defaultValue="";
const io=require('socket.io')(3001,{
    cors:{
        origin:'http://localhost:3000',
        method:["GET","POST"]
    }

})

io.on("connection",socket=>{
    socket.on('get-document',async documentId=>{
        const document=await findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document',document.data);
        socket.on("send-changes",delta=>{
            // console.log(delta);
     
            socket.broadcast.to(documentId).emit("receive-changes",delta);
         })

         socket.on("save-document",async data=>{
            await Document.findByIdAndUpdate(documentId,{data});
            // var conn = mongoose.connection;
            // var d={_id:documentId,val:data};
            // conn.collection('data').insert(d);
            

         });
    })

    async function findOrCreateDocument(id){
        if(id==null)
        {
            return;
        }
        const document=await Document.findById(id);
       // const document=await conn.collection('data').findOne(id);
        if(document)
        {
            return document;
        }
        return await Document.create({_id:id,data:defaultValue});
        //return await conn.collection('data').insert({_id:id,data:defaultValue});
    }
    
    console.log("connected");

})
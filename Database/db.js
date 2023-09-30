import mongoose from 'mongoose';

const Connection=async (username='indeevar1019',password='leomessi')=>{
    const URL=`mongodb+srv://${username}:${password}@google-docs-clone.kypgn1s.mongodb.net/?retryWrites=true&w=majority`;
    try{
       await  mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
       console.log('Database Connected');

    }catch(err){
        console.log('error database',err);
    }

}

export default Connection;
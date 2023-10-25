const mongoose = require("mongoose");
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
const Chat = require("./models/chat.js");

main()
    .then(()=>{
        console.log("Connection Done: ");
    })
    .catch((err)=>console.log("Error: "));

let allChat = [
    {
        from:"Aayush",
        to:"Krish",
        msg:"Hello",
        createdAt: new Date(),
    },
    {
       from: "Shiv" ,
       to: "Aayush",
       msg: "Bye",
       createdAt: new Date(),

    }
]
Chat.insertMany(allChat);

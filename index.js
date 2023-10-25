const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
// const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
// app.use(methodOverride("_method"));



async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
    .then(()=>{
        console.log("Connection Done: ");
    })
    .catch((err)=>console.log("Error: "));

// Index route: 
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
})

app.post("/chats",(req,res)=>{
    let {from , msg ,to} = req.body;
    let newChat = new Chat(
        {
            from: from,
            msg: msg,
            to : to,
            createdAt: new Date(),

        }
    )
    newChat.save().then(
        (res)=>{
            console.log(res);
        }
    )
    res.redirect("/chats");
});

// New route:
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

// Edit Route: 
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})

// Update Route: 
app.post("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let {msg: Newmsg} = req.body;
    let updatedMsg =  await Chat.findByIdAndUpdate(id, {msg: Newmsg});
    res.redirect("/chats");
});

// Destroy route:
app.post("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let delChat = await Chat.findOneAndDelete(id);
    console.log(delChat);
})


app.get("/",(req,res)=>{
    res.send("Server is working: ");
});

app.listen(8080,()=>{
    console.log("Listening: ");
});
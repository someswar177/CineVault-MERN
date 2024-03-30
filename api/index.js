const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const dbConnect = require('./dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors')

const User = require('./models/userModel');
const Bookmark = require('./models/bookmarkModel');
const auth = require('./auth')

dbConnect();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
})

app.post("/signup",async (req,res)=>{
    const {email , password} = req.body;
    try{
        const hashedpassword = await bcrypt.hash(password,10);
        const user = new User({
            email:email,
            password:hashedpassword
        })
        try{
            await user.save()
            res.status(200).send({
                message:`User(${email}) created successfully`,
                user
            })
        }catch{
            res.status(500).send({
                message:"Email already exists"
            })
        }
    }catch{
        res.status(500).send({
            message:"password not hashed properly"
        })
    }
})

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email:email})
    if(!user){
        return(
            res.status(500).send({
                message:"email not found"
            })
        )
    }
    const passCheck = await bcrypt.compare(password,user.password);
    if(!passCheck){
        return(
            res.status(500).send({
                message:"Incorrect password"
            }
            )
        )
    }
    const token = jwt.sign({
        userId:user._id,
        userEmail:user.email
    },"TOKEN",
    {expiresIn:"24h"}
    )
    console.log(`token : ${token}`)
    res.status(200).send({
        message:"login successfully",
        email:user.email,
        token
    })
})

app.get('/getuser',auth,async (req,res)=>{
    const user = await User.findOne({_id:req.user.userId})
    console.log(user)
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    res.status(200).send({
        user,
        message: "You are authorized to access"
    });
})

app.post('/addbookmark',auth,async (req,res)=>{
    console.log("this is from sever side /addbookmark  ")
    try{
        const newBookmark = new Bookmark({
            id:req.body.id,
            poster_path:req.body.poster_path,
            backdrop_path:req.body.backdrop_path,
            title:req.body.title
        });
        await newBookmark.save();
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $push:{bookmarks:newBookmark._id}},
            {new:true}
        );
        console.log(user);
        res.json(user);
    }catch(error){
        console.error('Error adding bookmark:', error);
        res.status(500).json({ message: "Already added to bookmark", error: 'Internal Server Error' });
    }
})

app.get('/getbookmarks',auth,async (req,res)=>{
    console.log(req.user)
    try{
        const user = await User.find({_id:req.user.userId});
        if(!user){
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // console.log("user = ",user)
        // console.log("user bookmark = ",user[0].bookmarks);

        const allBookmarks = []

        for(let i=0;i< user[0].bookmarks.length;i++){ 
            let eachBookmark = await Bookmark.findById(user[0].bookmarks[i]);
            // console.log("eachbookamrk = ",eachBookmark);
            allBookmarks.push(eachBookmark);
        }
        // console.log("allbookmarks = ",allBookmarks)
        res.json({allBookmarks})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"});
    }
})
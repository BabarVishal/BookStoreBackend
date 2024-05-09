
import LoginSchema from "../modal/Login.modal.js";
import Book from "../modal/Book.modal.js"

import bcryptjs from "bcryptjs"

const userLoginData = async (req, res) =>{
   try {
    const {email, password} = req.body;
    const user = await LoginSchema.findOne({email});
    const ismach =await bcryptjs.compare(password, user.password);
    if(!user || !ismach){
       return res.status(400).json({mes: "Invalid User!"});
    }else{
        res.status(200).json({mes: "User LogIN",
         user:{
            _id : user._id,
            email: user.email,
            password : user.password
        }
    });
    }
   } catch (error) {
    console.log(error);
    res.status(500).json({mes:"Internal server Error"});
   }
 
}

const userSingInData = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await LoginSchema.findOne({email});
        if(user){
        return res.status(400).json({mes: "User are present!"});
        }
        
         const hashPassword = await bcryptjs.hash(password,10)

        const singIn = new LoginSchema({
           email: email,
           password: hashPassword
        })

       await singIn.save();
       res.status(200).json({mes: "User Creted!"});

    } catch (error) {
        console.log(error.message);
      res.status(500).json({message: "Internal server Error!"})
    }
}

 const getBook = async (req,res)=>{
    try {
       const book =  await Book.find()
       res.status(200).json(book);
    } catch (error) {
        console.log("Error", error)
        res.status(500).json(error);
    }
}

export{
    userLoginData,
    userSingInData,
    getBook
}
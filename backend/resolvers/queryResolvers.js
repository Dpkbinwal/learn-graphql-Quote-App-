import mongoose from "mongoose";
import {quotes,users} from "../fackdb.js";
import {randomBytes} from 'crypto'
import bcrypt from 'bcryptjs';

const User= mongoose.model("User")

const resolvers = {
    Query:{
        users:()=>users,  

        user:(_,args)=>users.find((user)=>user._id==args._id),
        quotes:()=>quotes,
        quote:(_,args)=>quotes.filter((quote)=>quote.by==args.by)
        
    },
    User:{
        quotes:(ur)=>quotes.filter(quote=> quote.by==ur._id)
    },
    
    // Mutation:{
    //     signupUser:(_,{newUser})=>{
    //         const _id= randomBytes(5).toString("hex");
    //         const user={_id,...newUser};
    //         users.push(user);
    //         return users.find(user=>user._id==_id);
    //     }   
    // }
    Mutation:{
        signupUser: async (_,{newUser})=>{     
           const user = await User.findOne({email: newUser.email})
            // console.log(user);
           if(user){
            throw new Error('Email already exists');
           }
           const hashPassword = await bcrypt.hash(newUser.password,12)

           const NEWUSER = new User({
           ...newUser,
           password:hashPassword
           })
           return await NEWUSER.save();
            
        },
        
        signinUser: async (_,{userLogin})=>{
            
            const user = await User.findOne({email:userLogin.email});
            if(!user){
                throw new Error("User not exist")
            }
            
            const isPasswordCorrect = await bcrypt.compare(userLogin.password,user.password)

            if(!isPasswordCorrect){
                throw new Error("Password is incorrect")
            }

            return user;
            
            

        }
    }

}

export default resolvers
import Chat from '../models/chat.js';
import User from '../models/user.js';
import dotenv from 'dotenv';
import { format } from 'path';
import multer from 'multer';
import fs from 'fs';
dotenv.config();
import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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",
  });

const msg = async (message) => {
    console.log("Starting OpenRouter API example...");
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          "role": "user",
          "content": message
        }
      ],
      
    });
    return completion;
    //console.log(completion.choices[0].message);
}

export const getChat = async (req,res)=>{
    try{
        const chat = await Chat.findOne({chatUrl:req.query.chatUrl});
        if(!chat) return res.status(404).json("Chat not found");
        res.status(200).json(chat);
    }catch(err){
        res.status(500).json({err:err.message});
    }   
}

export const getAllChat = async (req,res)=>{
    try{
        const chat = await Chat.find({user:req.query.user});
        res.status(200).json(chat);
    }catch(err){
        res.status(500).json({err:err.message});
    }
}

export const startChat = async (req,res)=>{
    try{
        const chat = await Chat.create({
            user:req.body.user,
            chatUrl: crypto.randomBytes(20).toString('hex'),
            chatTitle:"New Chat",
        });
        res.status(201).json(chat);
    
    }catch(err){
        res.status(500).json({err:err.message});
    }
}

export const newMessage = async (req,res)=>{
    try{
        const chat = await Chat.findOne({chatUrl:req.body.chatUrl}).lean()
        console.log(req.body.userMessage)
        if(chat.messages.length==0){
            const chatTitle = await msg([{role:"user",content:`Yazıcağım metin için içeriği en iyi yansıtan kısa bir başlık önerir misin? Cevabın sadece başlığı içersin ve başka bir şey yazılı olmasın : ${req.body.userMessage}`}],"claude-3-5-haiku-20241022");
            chat.chatTitle = chatTitle.choices[0].message;
        }

        chat.messages.push({role:"user", content:req.body.userMessage});
        const response = await msg(chat.messages.map(({role,content})=>({role,content})),req.body.version); 
        chat.messages.push({role:"assistant", content:response.choices[0].message});

        await chat.save();
        res.status(200).json(chat);
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:err.message});
    }
}
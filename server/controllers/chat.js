import Chat from '../modules/chat.js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();
import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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"
  });

const msg = async (message,chatModel) => {
    
    const completion = await openai.chat.completions.create({
      model: chatModel,
      messages: message,
      
    });
    return completion;
}

export const getChat = async (req,res)=>{
    try{
        const chat = await Chat.findOne({chatUrl:req.params.chatUrl});
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
            chatModel:req.body.chatModel,
        });
        res.status(201).json(chat);
    
    }catch(err){
        res.status(500).json({err:err.message});
    }
}

export const newMessage = async (req,res)=>{
    try{
        const chat = await Chat.findOne({chatUrl:req.body.chatUrl});
        if(chat.messages.length==0){
            const chatTitle = await msg([{role:"user",content:`Yazıcağım metin için içeriği en iyi yansıtan kısa bir başlık önerir misin? Cevabın sadece başlığı içersin ve başka bir şey yazılı olmasın : ${req.body.userMessage}`}],"deepseek/deepseek-r1:free");
            console.log(chatTitle.choices[0].message.content)
            chat.chatTitle = chatTitle.choices[0].message.content;
        }

        chat.messages.push({role:"user", content:req.body.userMessage});
        const response = await msg(chat.messages.map(({role,content})=>({role,content})),chat.chatModel); 
        chat.messages.push({role:"assistant", content:response.choices[0].message.content});

        await chat.save();
        res.status(200).json(chat);
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:err.message});
    }
}

export const deleteChat = async (req,res)=>{
    try{
        console.log(req.body.chatUrl)
        const chat = await Chat.findOneAndDelete({chatUrl:req.body.chatUrl});
        if(!chat) return res.status(404).json("Chat not found");
        res.status(200).json(chat);
    }catch(err){
        res.status(500).json({err:err.message});
    }
}
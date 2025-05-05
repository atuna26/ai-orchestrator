import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    chatUrl: {type: String, required: true},
    chatModel: {type: String, required: true},
    chatTitle: {type: String
    },
    messages: [
        {
            role: {type: String, required: true},
            content: {type: String, required: true},
            createdAt: {type: Date, default: Date.now}
        }
    ],
    createdAt: {type: Date, default: Date.now},
})

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
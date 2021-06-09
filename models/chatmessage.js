const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: {
        type: String
    }, 
    chatId: {
        type: String
    },
    messageTime: {
        type: String
    }, 
    sender: {
        type: String
    }
},{
    timestamps: true
});

const ChatMessage = mongoose.model('ChatMessage', messageSchema);
module.exports = ChatMessage;
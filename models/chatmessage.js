const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dayjs = require('dayjs');
const messageSchema = new Schema({
    content: {
        type: String
    }, 
    chatId: {
        type: String
    },
    messageTime: {
        type: String,
        default: dayjs().format('D MMM YYYY HH:mm')
    }, 
    sender: {
        type: String
    }
},{
    timestamps: false
});

const ChatMessage = mongoose.model('ChatMessage', messageSchema);
module.exports = ChatMessage;
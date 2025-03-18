const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    sender_id: { type: String, required: true },
    receiver_id: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
})

module.exports=new mongoose.model('Message',messageSchema)
const amqp = require("amqplib");

async function sendToQueue(message){
    const connection=await amqp.connect(process.env.RABBITMQ_URL)
    const channel=await connection.createChannel()
    await channel.assertQueue("message_queue")
    channel.sendToQueue("message_queue",Buffer.from(JSON.stringify(message)))
    console.log('message pushed')
    await channel.close()
    await connection.close()
}

const sendMessage=async (req,res)=>{
    const { sender_id, receiver_id, content } = req.body;
    if(!sender_id || !receiver_id || !content){
        return res.status('400').json({ error: "All fields are required"})
    }
    if (typeof content !== "string" || content.trim() === "") {
        return res.status(400).json({ error: "Message must be a non-empty string." });
    }
    const message = { sender_id, receiver_id, content, timestamp: new Date(), read: false };
    await sendToQueue(message);
    res.json({ success: true, message: "Message queued for processing" });
}

module.exports={
    sendMessage
}


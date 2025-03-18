const amqp = require("amqplib");
const mongoose = require("mongoose");
const messageDB=require('./model/chatModel')

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Worker connected to MongoDB"))
  .catch((err) => console.error(err));

async function consumeMessages() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("message_queue");

   channel.consume("message_queue",async (msg)=>{
    if(msg!==null){
        const messages=JSON.parse(msg.content.toString())
        const newMessage = new messageDB(messages);
        await newMessage.save();
        console.log("Message saved to DB:", messageData);
        channel.ack(msg);
    }
   })
}
consumeMessages();
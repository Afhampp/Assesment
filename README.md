# Messaging Platform Backend  

This is a **backend API** for a messaging platform built using **Node.js, Express, MongoDB, and RabbitMQ**. It allows users to send and receive messages asynchronously via a queue.  

## **🚀 How to Run the Project**  

1) Install Dependencies**  
npm install

2) Set Up Environment Variables
Create a .env file in the project root and add:
MONGO_URI=mongodb://127.0.0.1:27017/chatapp
RABBITMQ_URL=amqp://localhost

3) Start the Server
npm start

4) Start the Consumer Worker
node consumer.js

How to Make API Requests
1) Send a Message (POST)
Endpoint: POST /api/messages
Request Body:
{
  "sender_id": "user123",
  "receiver_id": "user456",
  "content": "Hello, how are you?"
}

Response:
{
  "message": "Message queued successfully"
}

2) Get Conversation History (GET)
Endpoint: GET /api/messages?user1=user123&user2=user456

Response:
[
  {
    "message_id": "msg001",
    "sender_id": "user123",
    "receiver_id": "user456",
    "content": "Hey!",
    "timestamp": "2024-03-13T10:00:00Z",
    "read": true
  }
]
3) Mark a Message as Read (PATCH)

Endpoint: PATCH /api/messages/:message_id/read

Response:
{
  "status": "read"
}

**Notes**

Messages are queued using RabbitMQ and processed asynchronously.
The consumer service (consumer.js) processes messages and stores them in MongoDB.
Supports pagination and sorting for message history retrieval.

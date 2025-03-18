require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')

const app=express()

const messageRoutes=require('./routes/routes')
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('connected'))
.catch((err)=>console.log('not connected',err))

app.use("/api", messageRoutes);

const port='5000'
app.listen(port,()=>console.log('server is running at '+port))
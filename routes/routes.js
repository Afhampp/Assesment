const express=require('express')
const producer=require('../controller/producer')
const history=require('../controller/history')
const markreader=require('../controller/markReader')
const router=express.Router()



router.post('/messages',producer.sendMessage)
router.get('/message',history.history)
router.patch("/messages/:message_id/read",markreader)

module.exports=router
const messageDB=require('../model/chatModel')

const history=async (req,res)=>{
  const { user1, user2, page = 1, limit = 20 } = req.query;
    if (!user1 || !user2) {
      return res.status(400).json({ error: "User IDs required" });
    }
    const messages = await messageDB.find({
        $or: [
          { sender_id: user1, receiver_id: user2 },
          { sender_id: user2, receiver_id: user1 },
        ],
      }).sort({ createdAt: -1 }) 
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();
    
      res.json(messages);
}

module.exports={history}
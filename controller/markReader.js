const messageDB=require('../model/chatModel')

const markreader=async(req,res)=>{
    const { message_id } = req.params;
    const message = await messageDB.findByIdAndUpdate(message_id, { read: true }, { new: true });
  
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
  
    res.json({ status: "read" });
}
module.exports=markreader
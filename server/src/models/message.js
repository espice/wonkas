const mongoose = require("mongoose")


const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: [true, "Message is missing"],

    },
    author: {
            type: mongoose.Types.ObjectId,
            required: [true, "Author is missing"],
          },
    time: {
        type: Date,
        default: Date.now,
        required: [true, "Time is missing"]
    }
    
})
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;


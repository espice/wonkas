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
    location: {
            type: String,
            required: [true, "Location is missing"],
          },
    time: {
        type: Date,
        default: Date.now,
        required: [true, "Time is missing"]
    }
    
})
const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;


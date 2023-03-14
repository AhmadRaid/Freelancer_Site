const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    fullName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    idRecipientNumber:{
        type: Number,
        required: true
    }

});
const Recipient = mongoose.model('recipient', recipientSchema);
module.exports = Recipient;

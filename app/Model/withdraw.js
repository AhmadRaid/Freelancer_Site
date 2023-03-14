const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  Amount:{
    type: Number
  },
  method: {
    type: String,
    enum: ["Cash", "Bank"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Sent", "Completed", "Ready", "Canceled"],
    default:"Pending"

  },
  cashDetails: {
    type: Object,
    office:{
      type: String,
      required: true
    } ,
    Recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipients",
      required: true
    },
    required: function () {
      return this.method === "Cash";
    },
  },
  bankDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bank",
    required: function () {
      return this.method === "Bank";
    },
  },
  verifiedMobile: {
    type: Boolean,
    default: false,
  },
});
const withdraw = mongoose.model("withdraw", withdrawSchema);
module.exports = withdraw;

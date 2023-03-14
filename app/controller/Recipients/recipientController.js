const { Recipient } = require("../../Model");
const bcrypt = require("bcrypt");

module.exports.getAllRecipient = async (userId) => {
  try {
    let recipients = await Recipient.find({_id : userId});
    if (!recipients) {
      return { code: 1, message: "We dont have recipients", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { recipients } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.addRecipient = async (data) => {
  const { userId , fullName, phoneNumber, idRecipientNumber } = data;
  try {

    const recipient = await Recipient.create({
      userId,fullName, phoneNumber, idRecipientNumber
    });


    return { code: 0, message: "commonSuccess.message", data: { recipient } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.editRecipient = async (data) => {
  const { userId , RecipientId , fullName, phoneNumber, idRecipientNumber } = data;
  try {
    const recipient = await Recipient.findOne({
      _id : RecipientId,
      userId
    });

    if (!recipient) {
      return { code: 1, message: "recipient.notFoundRecipient", data: null };
    }

    recipient.fullName = fullName;
    recipient.phoneNumber = phoneNumber;
    recipient.idRecipientNumber = idRecipientNumber;

    await recipient.save();

    return { code: 0, message: "commonSuccess.message", data: recipient };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.deleteRecipient = async (data) => {
  const { userId , RecipientId , fullName, phoneNumber, idRecipientNumber } = data;
  try {
    const recipient = await Recipient.findOne({
      _id : RecipientId,
      userId
    });

    if (!recipient) {
      return { code: 1, message: "recipient.notFoundRecipient", data: null };
    }

    recipient.deleteOne({
      _id : RecipientId,
      userId
        });

    return { code: 0, message: "commonSuccess.message", data: recipient };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


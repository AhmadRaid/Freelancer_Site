const { Withdraw, User } = require("../../Model");

module.exports.getAllWithdraw = async (userId) => {
  try {
    let withdraw = await Withdraw.find({ _id: userId });
    if (!withdraw) {
      return { code: 1, message: "We dont have Withdraw", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { withdraw } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.addWithdraw = async (data) => {
  const {
    userId,
    method,
    status,
    Recipient,
    office,
    bankId,
    verifiedMobile,
    amount,
  } = data;
  try {
    const user = await User.findOne({
      userId,
    });

    if (user.balance < amount) {
      return {
        code: 1,
        message: "this amount is over than your balance check your balance",
        data: null,
      };
    }

    let cashDetails;

    if (office && Recipient) {
      cashDetails = {
        office,
        Recipient,
      };
    }

    let withdraw = await Withdraw.create({
      userId,
      method,
      status,
      cashDetails: cashDetails,
      bankDetails: bankId,
      verifiedMobile,
      amount,
    });
    if (!withdraw) {
      return { code: 1, message: "We dont have Withdraw", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { withdraw } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.editWithdraw = async (data) => {
  const {
    method,
    status,
    Recipient,
    office,
    bankId,
    verifiedMobile,
    amount,
    withdrawId,
    UserId,
  } = data;
  let cashDetails;

  try {
    const withdraw = await Withdraw.findOne({
      _id: withdrawId,
      userId: UserId,
    });

    if (!withdraw) {
      return {
        code: 1,
        message: "withdraw.notFoundWithdraw Or this not for you",
        data: null,
      };
    }

    if (office && Recipient) {
      cashDetails = {
        office,
        Recipient,
      };
    }

    withdraw.method = method;
    withdraw.status = status;
    withdraw.Amount = amount;
    withdraw.cashDetails = cashDetails;
    withdraw.bankDetails = bankId;
    withdraw.verifiedMobile = verifiedMobile;

    await withdraw.save();

    return { code: 0, message: "commonSuccess.message", data: withdraw };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.deleteWithdraw = async (data) => {
  const { withdrawId, UserId } = data;
  try {
    const withdraw = await Withdraw.findOne({
      _id: withdrawId,
      userId: UserId,
    });

    if (!withdraw) {
      return {
        code: 1,
        message: "withdraw.notFoundWithdraw Or this not for you",
        data: null,
      };
    }

    withdraw.deleteOne({
      _id: withdrawId,
      userId: UserId,
    });

    return { code: 0, message: "commonSuccess.message", data: withdraw };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.getWithdrawDetails = async (withdrawId, userId) => {
  try {
    let withdraw = await Withdraw.find({ _id: withdrawId, userId: userId });
    if (!withdraw) {
      return {
        code: 1,
        message: "We dont have Withdraw Or this withdraw not for you",
        data: null,
      };
    }
    return { code: 0, message: "commonSuccess.message", data: { withdraw } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

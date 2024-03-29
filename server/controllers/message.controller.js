const Message = require('../models/message');

module.exports.getMessages = async (req, res, next) => {
  try {
    const foundMessages = await Message.find()
      .limit(20)
      .sort({ createdAt: -1 });
    res.status(200).send({ data: foundMessages });
  } catch (err) {
    next(err);
  }
};

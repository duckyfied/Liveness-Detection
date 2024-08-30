const User = require("../models/userModels.js");

exports.getDetails = async (req, res) => {
  try {
    console.log(req.body);
    const { aadhar } = req.body;
    if (!aadhar) {
        return res.status(400).send('Aadhar number is required');
    }
    const user = await User.findOne({aadhar: parseInt(aadhar,10)})
    // const detail = await User.find(req.body);
    res.status(201).json({
      status: "success",
        data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

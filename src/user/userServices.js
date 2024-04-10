const userModel = require("./userModel");
const encryptor = require("simple-encryptor")("123456789trytryrtyr");

module.exports.createUserDBService = async (userDetails) => {
  try {
    const encryptedPassword = encryptor.encrypt(userDetails.password);

    const newUser = new userModel({
      fullName: userDetails.fullName,
      email: userDetails.email,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    });

    const result = await newUser.save();
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

module.exports.loginuserDBService = async (userDetails) => {
  try {
    const user = await userModel.findOne({ email: userDetails.email });

    if (!user) {
      throw { status: false, msg: "Invalid User Details!!" };
    }

    const decryptedPassword = encryptor.decrypt(user.password);

    if (decryptedPassword !== userDetails.password) {
      throw { status: false, msg: "User validation failed" };
    }

    return { status: true, msg: "User Validated Successfully" };
  } catch (error) {
    console.error("Error validating user:", error);
    return { status: false, msg: "Invalid Data" };
  }
};

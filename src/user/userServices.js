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

    return { status: true, msg: "User Validated Successfully", user: user }; // Return the user object
  } catch (error) {
    console.error("Error validating user:", error);
    return { status: false, msg: "Invalid Data" };
  }
};

exports.updateUserInDB = async (userId, userData) => {
  try {
    // console.log(updateWorkoutIdInDB);
    return await user.findByIdAndUpdate(userId, userData);
  } catch (error) {
    throw Error("Error to create  workoutplan by ID");
  }
};

module.exports.getUserById = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    return user;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};
exports.getUserWithWorkoutPlan = async (userId) => {
  try {
    // Implement the logic to retrieve user data along with workout plan
    // For example, you could query the database to fetch user details and workout plan
    const user = await userModel.findById(userId).populate('Workout');
    return user;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching user with workout plan:", error);
    throw error;
  }
};

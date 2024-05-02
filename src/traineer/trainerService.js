const Trainer = require("./traineerModel");
const encryptor = require("simple-encryptor")("123456789trytryrtyr");

module.exports.createTrainerDBService = async (trainerDetails) => {
  try {
    const encryptedPassword = encryptor.encrypt(trainerDetails.password);

    const newTrainer = new Trainer({
      fullName: trainerDetails.fullName,
      email: trainerDetails.email,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
      // Set any additional fields specific to trainers
    });

    const result = await newTrainer.save();
    return true;
  } catch (error) {
    console.error("Error creating trainer:", error);
    return false;
  }
};

module.exports.loginTrainerDBService = async (trainerDetails) => {
  try {
    const trainer = await Trainer.findOne({ email: trainerDetails.email });

    if (!trainer) {
      throw { status: false, msg: "Invalid Trainer Details!!" };
    }

    const decryptedPassword = encryptor.decrypt(trainer.password);

    if (decryptedPassword !== trainerDetails.password) {
      throw { status: false, msg: "Trainer validation failed" };
    }

    return {
      status: true,
      msg: "Trainer Validated Successfully",
      trainer: trainer,
    }; // Return the trainer object
  } catch (error) {
    console.error("Error validating trainer:", error);
    return { status: false, msg: "Invalid Data" };
  }
};

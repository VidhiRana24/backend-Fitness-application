const ProfileService = require("./profileService");
const verifyToken = require("../../middleware/authMiddleware");

const { Request, Response } = require("express");
const createProfileControllerFn = async (req, res) => {
  try {
    // Verify user token
    verifyToken(req, res, async () => {
      // Extract user ID from decoded token
      const userId = req.userId;

      if (!userId) {
        return res
          .status(401)
          .json({ status: false, message: "User ID not provided in token" });
      }

      // Call the createProfile method from the ProfileService
      const profile = await new ProfileService().createProfile({
        ...req.body,
        createdBy: userId, // Associate profile with the user
      });

      // Send success response
      res.status(201).json({
        status: true,
        message: "Profile created successfully",
        profile: profile,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const getProfileByUserIdControllerFn = async (req, res) => {
  try {
    // Extract user ID from decoded token
    const userId = req.userId;

    // Call the getProfileByUserId method from the ProfileService
    const profile = await new ProfileService().getProfileByUserId(userId);

    if (!profile) {
      return res
        .status(404)
        .json({ status: false, message: "Profile not found" });
    }

    // Send success response with profile data
    res.status(200).json({ status: true, profile: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const updateProfileControllerFn = async (req, res) => {
  try {
    const { userId } = req.params; // Use userId instead of profileId
    const newData = req.body;

    // Verify user token
    verifyToken(req, res, async () => {
      // Call the updateProfile method from the ProfileService
      const updatedProfile = await new ProfileService().updateProfile(
        userId, // Pass userId instead of profileId
        newData
      );

      // Send success response with updated profile data
      res.status(200).json({ status: true, profile: updatedProfile });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
const deleteProfileControllerFn = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user token
    verifyToken(req, res, async () => {
      try {
        // Call the deleteProfile method from the ProfileService
        const deletedProfile = await new ProfileService().deleteProfile(userId);

        // Send success response with deleted profile data
        res.status(200).json({
          status: true,
          message: "Profile deleted successfully",
          profile: deletedProfile,
        });
      } catch (error) {
        // Handle the "Profile not found" error
        if (error.message === "Profile not found") {
          return res
            .status(404)
            .json({ status: false, message: "Profile not found" });
        }

        // Handle other errors
        console.error(error);
        res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createProfileControllerFn,
  getProfileByUserIdControllerFn,
  updateProfileControllerFn,
  deleteProfileControllerFn,
};

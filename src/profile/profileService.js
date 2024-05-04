// profileService.js

const Profile = require("./profileModel");

class ProfileService {
  async createProfile(profileData) {
    try {
      // Create a new profile instance using the provided data
      const newProfile = new Profile(profileData);
      // Save the new profile to the database
      const savedProfile = await newProfile.save();
      return savedProfile;
    } catch (error) {
      // Handle errors
      throw new Error("Error creating profile");
    }
  }

  async getProfileByUserId(userId) {
    try {
      // Find the profile by user ID in the database
      const profile = await Profile.findOne({ user: userId });
      return profile;
    } catch (error) {
      // Handle errors
      throw new Error("Error retrieving profile by user ID");
    }
  }

  async updateProfile(userId, newData) {
    // Change profileId to userId
    try {
      // Find the profile by user ID and update it with the new data
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: userId }, // Update based on user ID
        newData,
        { new: true }
      );

      if (!updatedProfile) {
        throw new Error("Profile not found");
      }

      return updatedProfile;
    } catch (error) {
      // Handle errors
      throw new Error("Error updating profile: " + error.message);
    }
  }
  async deleteProfile(userId) {
    try {
      // Find the profile by user ID and delete it
      const deletedProfile = await Profile.findOneAndDelete({ user: userId });

      if (!deletedProfile) {
        // If no profile is found, return null
        return null;
      }

      return deletedProfile;
    } catch (error) {
      // Handle errors
      throw new Error("Error deleting profile: " + error.message);
    }
  }
}

module.exports = ProfileService;

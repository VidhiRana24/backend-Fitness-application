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

  async getProfileById(profileId) {
    try {
      // Find the profile by its ID in the database
      const profile = await Profile.findById(profileId);
      return profile;
    } catch (error) {
      // Handle errors
      throw new Error("Error retrieving profile by ID");
    }
  }

  async updateProfile(profileId, newData) {
    try {
      // Trim leading and trailing whitespace from the profileId
      profileId = profileId.trim();

      // Find the profile by its ID and update it with the new data
      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
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

  async deleteProfile(profileId) {
    try {
      // Trim leading and trailing whitespace from the profileId
      profileId = profileId.trim();

      // Find the profile by its ID and delete it
      const deletedProfile = await Profile.findByIdAndDelete(profileId);

      if (!deletedProfile) {
        throw new Error("Profile not found");
      }

      return deletedProfile;
    } catch (error) {
      // Handle errors
      throw new Error("Error deleting profile: " + error.message);
    }
  }
}

module.exports = ProfileService;

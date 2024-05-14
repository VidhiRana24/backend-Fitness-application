const Package = require("./packageModel");

class PackageService {
  async getAllPackages() {
    try {
      const packages = await Package.find();
      return packages;
    } catch (error) {
      throw new Error("Error retrieving all packages");
    }
  }

  async getPackageById(packageId) {
    try {
      const packages = await Package.findById(packageId);
      return packages;
    } catch (error) {
      throw new Error("Error retrieving package by ID");
    }
  }

  async createPackage(packageData) {
    try {
      const newPackage = new Package(packageData);
      const savedPackage = await newPackage.save();
      return savedPackage;
    } catch (error) {
      throw new Error("Error creating package");
    }
  }

  async updatePackageById(packageId, updatedData) {
    try {
      const updatedPackage = await Package.findByIdAndUpdate(
        packageId,
        updatedData,
        { new: true }
      );

      if (!updatedPackage) {
        // If the package is not found, throw an error
        throw new Error("Package not found");
      }

      return updatedPackage;
    } catch (error) {
      // If any error occurs during the update process, throw an error
      throw new Error(`Error updating package by ID: ${error.message}`);
    }
  }

  async deletePackageById(packageId) {
    try {
      const deletedPackage = await Package.findByIdAndDelete(packageId);
      return deletedPackage;
    } catch (error) {
      throw new Error("Error deleting package by ID");
    }
  }
}

module.exports = PackageService;

const PackageService = require("./packageService");
const verifyToken = require("../../middleware/authMiddleware");

const { Request, Response } = require("express");

const createPackageControllerFn = async (req, res) => {
  try {
    // Verify user token
    verifyToken(req, res, async () => {
      // Extract user ID from decoded token
      const userId = req.userId;

      // Call the createPackage method from the PackageService
      const package = await new PackageService().createPackage({
        ...req.body,
        createdBy: userId, // Associate package with the user
      });

      // Send success response
      res.status(201).json({
        status: true,
        message: "Package created successfully",
        package: package,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const getPackageByIdControllerFn = async (req, res) => {
  try {
    const { packageId } = req.params;

    // Call the getPackageById method from the PackageService
    const package = await new PackageService().getPackageById(packageId);

    if (!package) {
      return res
        .status(404)
        .json({ status: false, message: "Package not found" });
    }

    // Send success response with package data
    res.status(200).json({ status: true, package: package });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const updatePackageStatusControllerFn = async (req, res) => {
  try {
    const packageId = req.params.id; // Assuming the package ID is stored under the key "id"
    // console.log(packageId);
    // Check if packageId is undefined or empty
    if (!packageId) {
      return res.status(400).json({
        status: false,
        message: "Package ID is missing in the request parameters",
      });
    }

    const newStatus = req.body; // Extract new status from request body

    // Verify user token
    verifyToken(req, res, async () => {
      try {
        // Create an instance of PackageService
        const packageService = new PackageService();

        // Call the updatePackageById method from the PackageService instance
        const updatedPackage = await packageService.updatePackageById(
          packageId,
          newStatus
        );

        // If the package is not found, throw an error
        if (!updatedPackage) {
          throw new Error("Package not found");
        }

        // Send success response with updated package data
        res.status(200).json({ status: true, package: updatedPackage });
      } catch (error) {
        console.error(error);
        res.status(404).json({ status: false, message: error.message }); // Return 404 if package not found
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const deletePackageControllerFn = async (req, res) => {
  try {
    const { packageId } = req.params;

    // Verify user token
    verifyToken(req, res, async () => {
      // Call the deletePackageById method from the PackageService
      await new PackageService().deletePackageById(packageId);

      // Send success response
      res
        .status(200)
        .json({ status: true, message: "Package deleted successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createPackageControllerFn,
  getPackageByIdControllerFn,
  updatePackageStatusControllerFn,
  deletePackageControllerFn,
};

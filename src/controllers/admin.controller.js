const adminService = require("../services/admin.service.js");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res
      .status(200)
      .json({ message: "All users have been retrieved", users: users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
};

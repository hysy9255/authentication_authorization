const adminDao = require("./../models/admin.dao.js");

const getAllUsers = async () => {
  try {
    const users = await adminDao.getAllUsers();
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
};

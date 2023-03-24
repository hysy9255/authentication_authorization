const adminDao = require("./../models/admin.dao.js");
const userDao = require("./../models/user.dao.js");

const getAllUsers = async () => {
  try {
    const users = await adminDao.getAllUsers();
    return users;
  } catch (error) {
    throw error;
  }
};

const blockAccount = async (token, emailToBlock, adminPassword) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
    const isAdmin = decodedToken.isAdmin;
    if (!isAdmin) {
      throw new Error("Only admin account can block other users");
    }

    const adminEmail = decodedToken.email;
    const adminUser = await userDao.findAnAccount(adminEmail);
    if (!adminUser) {
      throw new Error(
        "해당 토큰을 발급한 어드민 계정이 더이상 유효하지 않습니다"
      );
    }
    const hashedPassword = adminUser.password;
    const passwordMatches = await bcrypt.compare(adminPassword, hashedPassword);
    if (!passwordMatches) {
      throw new Error("The password passed in to verify the user is incorrect");
    }

    const user = await userDao.findAnAccount(emailToBlock);
    if (!user) {
      throw new Error("차단하고자 하는 계정이 존재하지 않습니다");
    }

    const blocked = await adminDao.blockAccount(emailToBlock);
    const blockedUser = {
      _id: blocked._id,
      name: blocked.name,
      email: blocked.email,
      isAdmin: blocked.isAdmin,
      isBlocked: blocked.isBlocked,
    };
    return blockedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  blockAccount,
};

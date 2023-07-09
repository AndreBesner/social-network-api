const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  // delete user to be added later
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller.js");

router.route("/").get(getAllUser).post(createUser);

router.route("/:id").get(getUserById).put(updateUser)
//delete user to be added once finished everything else

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
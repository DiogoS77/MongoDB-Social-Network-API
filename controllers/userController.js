const {User, Thought} = require("../models");

const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId).select("-__v");
      if (!user) {
        return res.status(404).json({message: "No user with that ID"});
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndRemove(req.params.userId);
      if (!user) {
        return res.status(404).json({message: "No such user with that ID!"});
      }
      await Thought.deleteMany({_id: {$in: user.thoughts}});
      res.json({message: "User successfully deleted"});
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {$addToSet: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      );
      if (!user) {
        return res.status(404).json({message: "No user found with that ID :("});
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {$pull: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      );
      if (!user) {
        return res.status(404).json({message: "No user found with that ID :("});
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;

const {Thought, User} = require("../models");

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().sort({createdAT: -1});
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({message: "No thought with that ID"});
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        {$push: {thoughts: thought._id}},
        {new: true}
      );
      if (!user) {
        return res
          .status(404)
          .json({message: "Thought created but no user with this id!"});
      }
      res.json({message: "Thought successfully created!"});
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndRemove(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({message: "No thought with that ID"});
      }
      const user = await User.findByIdAndUpdate(
        {thoughts: req.params.thoughtId},
        {$pull: {thoughts: req.params.thoughtId}},
        {new: true}
      );
      if (!user) {
        return res
          .status(404)
          .json({message: "Thought created but no user with that ID"});
      }
      res.json({message: "Thought deleted!"});
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        {runValidators: true, new: true}
      );
      if (!thought) {
        return res.status(404).json({message: "No thought with this id!"});
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;

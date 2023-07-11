const { Thought, User } = require("../models");

const thoughtController = {
  //return all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //getThoughtById
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No user exists  with this ID! Try again!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //createThought
  /* createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user exists with this ID! Try again!" });
        }

        res.json({ message: "Congrats! Thought was created!" });
      })
      .catch((err) => res.json(err));
  }, */

  createThought({ params, body }, res) {
    //check for user first
    User.findOne({ username: body.username })
      .then((dbUser) => {
        if (!dbUser) {
          return res
            .status(404)
            .json({ message: "Username does not exist! Try again!" });
        }

        return Thought.create(body);
      })
      .then((thought) => {
        // Update the user's thoughts array
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        res.json({ message: "Congrats! Thought was created!" });
      })
      .catch((err) => res.json(err));
  },

  //update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought exists with this id! Try again!" });
        }
        res.json({ message: "Congrats! Thought was updated!", dbThoughtData });
      })
      .catch((err) => {
        res.json(err);
      });
  },

  //delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought exists with this id! Try again!" });
        }

        //if thought is found we will now remove from associated user
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({
            message:
              "No user exists with this id to delete their thought! Try again!",
          });
        }
        res.json({ message: "Congrats! Thought was updated!" });
      })
      .catch((err) => {
        res.json(err);
      });
  },

  //add reation
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({
            message:
              "No thought exists with this id to delete the reaction! Try again!",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;

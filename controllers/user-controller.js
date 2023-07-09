const { User, Thought } = require('../models'); // ENSURE PATH IS CORRECT ON LOCAL MACHINE

const userController = {

    //get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'friends',
            select: '-__v',
        })
        .select('-__v')
        .sort({ _id: -1})
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //get user by id
    getUserById({ params}, res) {
        User.findOne({ _id: params.id})
        .populate({
            path: 'friends',
            select: '-__v',
        })
        .select('-__v')
        .then((dbUserData) => {
            if(!dbUserData){
                return res.status(404).json({ message: 'No user exists with that ID! Try again!'});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //create user
    createuser({ body}, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },

    //update user
    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.id}, body, {
            new: true,
            runValidators: true,
        })
        .then((dbUserData) => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user exists with this ID! Try again!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    //delete user

    // *************************to be done as includes bonus marks

    //add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true },
        )
        .then((dbUserData) => {
            if(!dbUserData){
                res.status(404).json({ message: "No user exists with this ID! Try again!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    //remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: {friends: params.friendId }},
            { new: true },
        )
        .then((dbUserData) => {
            if(!dbUserData){
                res.status(404).json({ message: "No user exists with this ID! Try again!" });
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err)) ;
    }


}

module.exports = userController ;
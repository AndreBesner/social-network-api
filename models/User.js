const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: "Please enter valid Username",
        },
        email: {
            type: String,
            unique: true,
            required: "Please enter valid email address",
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thought: [
            {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        
        },
        ],
        friends:[ {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);
module.exports = User;
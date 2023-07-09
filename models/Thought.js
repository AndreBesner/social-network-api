const { Schema, model, Types } = require('mongoose');

// ADD CODE HERE FOR DATE FORMATTING

const ReactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
            
        },
        createdAt: {
            // FILL THIS IN ONCE WE KNOW HOW WE ARE FORMATTING DATE
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Please enter a valid thought",
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            // FILL THIS IN ONCE WE KNOW WE ARE FORMATTING DATE
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
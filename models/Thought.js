const { Schema, model, Types } = require("mongoose");

const dayjs = require("dayjs");

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
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
      },
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
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
      },
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
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;

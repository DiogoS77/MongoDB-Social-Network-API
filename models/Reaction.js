const mongoose = require("mongoose");
const dateFormat = require("../utils/date");

const {Schema, Types} = mongoose;

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, "Reaction body is required."],
      maxlength: 280,
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;

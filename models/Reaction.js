// This file will hold the reaction's schema
const { Schema, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
// assign the value of the Schema constructor to reactionSchema and create a new ReactionSchema object by using the new keyword with the Schema constructor and passing in the fields as objects as follows:
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: "Please enter your reaction",
            maxLength: 280
        },
        username: {
            type: String,
            required: "You need a username!",
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        }
    }
);

module.exports = ReactionSchema;
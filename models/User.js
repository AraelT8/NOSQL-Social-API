// create a new schema for a user and add the following fields to it: username, email, thoughts, friends 
const Thought = require("./Thought");
// this is the model for the user data that will be used in the application (username, email, thoughts, friends, etc.) and exported for use in the routes and controllers folders.
const { Schema, model } = require('mongoose');
// create the schema for the User model and add the ThoughtSchema to the userSchema as the thoughts field's data and the UserSchema to the userSchema as the friends field's data 
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// BONUS
userSchema.pre("findOneAndDelete", { document: false, query: true }, async function() {
    console.log("User pre-delete");
    const doc = await this.model.findOne(this.getFilter());
    console.log(doc.username);
    await Thought.deleteMany({ username: doc.username });
});

const User = model('User', userSchema);
module.exports = User;
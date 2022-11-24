const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    // TODO: Il faut ajouter les prefs ici
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    books: {
      type: Schema.Types.ObjectId,
      ref: "Book"
  },
  likes: {
    type: Array
  },
  readList: {
    type: Array
  }
},
  {
        timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  Ratings: [Number],
});

// Middleware to hash passwords
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = model("User", UserSchema);

export default User;

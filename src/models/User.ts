import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS || "", 10) || 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);

    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

export const User = mongoose.model<UserDoc>("User", userSchema);

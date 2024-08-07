import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,

    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImage: String,
    password: {
      type: String,
      required: [true, "password requird"],
      minlength: [6, "too short password"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    // child refrence (one to many ) relation
    wishlist: [
      {
        type: Schema.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        id: { type: Schema.Types.ObjectId }, // to create unique id to every address
        alias: String, // to specify work or home or office
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    //? Embedded document
    // addreses: [{ title: String, postalCode: Number, street: String }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.post(["init", "save"], (doc) => {
  // return image base url + image name in the response
  if (doc.profileImage) {
    const imageUrl = `${process.env.BASE_URL}/users/${doc.profileImage}`;
    doc.profileImage = imageUrl;
  }
});

const UserModel = model("User", userSchema);

export default UserModel;

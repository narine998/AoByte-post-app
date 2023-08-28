import mongoose from "mongoose";

const Schema = mongoose.Schema;

const emailTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("emailToken", emailTokenSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: false },
    sessionToken: { type: String, required: false },
  },
});

export const USerModal = mongoose.model("User", UserSchema);

export const getUsers = () => USerModal.find();
export const getUserByEmail = (email: string) => USerModal.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  USerModal.findOne({
    "authentication.sessionToken": sessionToken,
  });
export const getUserById = (id: string) => USerModal.findById(id);
export const createUser = (values: Record<string, any>) =>
  new USerModal(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  USerModal.findOneAndDelete({ _id: id });
export const uploadUserBYId = (id: string, values: Record<string, any>) =>
  USerModal.findByIdAndUpdate(id, values);

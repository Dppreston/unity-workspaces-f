const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  password: { type: String },
  email: { type: String },
  bio: { type: String },
  headline: { type: String },
  birthday: { type: String },
  employer: { type: String },
  employerPhone: { type: String },
  companyType: { type: String },
  notes: [
    {
      id: { type: ObjectId },
      noteTitle: { type: String },
      noteContent: { type: String },
    },
  ],
  appointments: [
    {
      id: { type: ObjectId },
      appointTitle: { type: String },
      appointDate: { type: String },
      appointNotes: { type: String },
    },
  ],
  customers: [
    {
      id: { type: ObjectId },
      customerFirst: { type: String },
      customerLast: { type: String },
      customerEmail: { type: String },
      customerPhone: { type: String },
      customerAddress: { type: String },
      customerCity: { type: String },
      customerState: { type: String },
      customerZip: { type: String },
    },
  ],
});

const Users = mongoose.model("Users", userShema, "users");

const mySchemas = { "Users": Users };

module.exports = mySchemas;

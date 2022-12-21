const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
   pid : {
    type :  String,
  },
    dob : {
      type :  Date,
    },
    visit_no: {
      type :  String,
    },
    name : {
      type : String,
    },
    address: {
      type :  String,
    },
    age: {
      type :  String,
    },
    sex: {
      type :  String,
    },
    mobile_no : {
      type :   String,
    },
    diagnosis : {
      type :  String,
    },
    goal_for_next_month : {
      type :  String,
    },
    prescription : {
      type :   [String],
    },
    payment_receipt : {
      type :  String,
    },
    description : {
      type :  String,
    },
});

const Prescription = mongoose.model('Prescription',PrescriptionSchema)

module.exports = Prescription;
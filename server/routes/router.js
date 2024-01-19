const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");
const axios = require("axios");

router.get("/users", async (req, res) => {
  const users = schemas.Users;
  const loginUsername = req.query.loginUsername;
  const loginPassword = req.query.loginPassword;
  const token = req.query.token;
  const settings = req.query.settings;
  const profile = req.query.profile;
  const notes = req.query.notes;
  const appointments = req.query.appointments;
  const customers = req.query.customers;
  const home = req.query.home;
  // const initial = req.query.initialFetch;

  //Login

  if (loginUsername && loginPassword) {
    const accountCheck = await users
      .find({ userName: loginUsername, password: loginPassword })
      .exec();
    if (accountCheck != "") {
      let accountData = accountCheck;
      res.send(JSON.stringify(accountData));
    } else {
      res.send(JSON.stringify("No Account Found. Please Try Again"));
    }
    res.end();
  }

  if (settings) {
    const accountCheck = await users.find({ _id: token }).exec();
    res.send(JSON.stringify(accountCheck));
    res.end();
  }

  if (profile) {
    const accountCheck = await users.find({ _id: token }).exec();
    res.send(JSON.stringify(accountCheck));
    res.end();
  }

  if (notes) {
    const accountCheck = await users.find({ _id: token }).exec();
    res.send(JSON.stringify(accountCheck));
    res.end();
  }

  if (appointments) {
    const accountCheck = await users.find({ _id: token }).exec();
    res.send(JSON.stringify(accountCheck));
    res.end();
  }

  if (customers) {
    const accountCheck = await users.find({ _id: token }).exec();
    res.send(JSON.stringify(accountCheck));
    res.end();
  }

  if (home) {
    const accountCheck = await users.find({ _id: token }).exec();
    res.send(JSON.stringify(accountCheck));
    res.end();
  }

  //seachbar query
});

router.post("/users", async (req, res) => {
  //Registration and Sign Up

  const {
    email,
    password,
    userName,
    firstName,
    lastName,
    birthday,
    compName,
    compType,
    compPhone,
  } = req.body;
  const userData = {
    email: email,
    password: password,
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    employer: compName,
    employerPhone: compPhone,
    companyType: compType,
  };
  const newUser = new schemas.Users(userData);
  const saveUser = await newUser.save();
  if (saveUser) {
    return res.send("Thank you for signing up! You will be redirected shortly");
  }
});

router.put("/users", async (req, res) => {
  const users = schemas.Users;

  //Update Personal Settings

  const { personalSave, personalId } = req.query;
  const { updateFirstName, updateLastName, updateBirthday } = req.body;

  if (personalSave) {
    const updatePersonalSettings = await users.updateOne(
      { _id: personalId },
      {
        firstName: updateFirstName,
        lastName: updateLastName,
        birthday: updateBirthday,
      }
    );

    if (updatePersonalSettings) {
      return res.send("Personal Settings Updated");
    }
  }

  //Update Account Settings

  const { accountSave, accountId } = req.query;
  const { updateUsername, updateEmail, updatePassword } = req.body;

  if (accountSave) {
    const updateAccountSettings = await users.updateOne(
      {
        _id: accountId,
      },
      {
        userName: updateUsername,
        email: updateEmail,
        password: updatePassword,
      }
    );

    if (updateAccountSettings) {
      return res.send("Account Settings Updated");
    }
  }

  //Update Profile Settings

  const { profileSave, profileId } = req.query;
  const { updateHeadline, updateBio } = req.body;

  if (profileSave) {
    const updateProfileSettings = await users.updateOne(
      {
        _id: profileId,
      },
      {
        headline: updateHeadline,
        bio: updateBio,
      }
    );

    if (updateProfileSettings) {
      return res.send("Profile Settings Updated");
    }
  }

  //Update Employment Settings

  const { employerSave, employerId } = req.query;
  const { updateEmployer, updateEmployerPhone, updateEmployerType } = req.body;

  if (employerSave) {
    const employerSettingsUpdate = await users.updateOne(
      {
        _id: employerId,
      },
      {
        employer: updateEmployer,
        employerPhone: updateEmployerPhone,
        companyType: updateEmployerType,
      }
    );

    if (employerSettingsUpdate) {
      return res.send("Employer Settings Updated");
    }
  }

  //Note Handling

  const noteAdd = ({ noteTitle, newNoteContent, _id } = req.body);
  const noteDelete = ({ noteId, userId } = req.body);

  const updateNote = await users.updateOne(
    { _id: _id },
    {
      $push: { "notes": { noteTitle: noteTitle, noteContent: newNoteContent } },
    }
  );

  const deleteNote = await users.updateOne(
    {
      _id: userId,
    },
    {
      $pull: { "notes": { _id: noteId } },
    }
  );

  //customer handling

  const { newCustomer } = req.query;
  const {
    newCustomerUserId,
    cFirst,
    cLast,
    cEmail,
    cPhone,
    cAddress,
    cCity,
    cState,
    cZip,
  } = req.body;

  const { customerDelete } = req.query;
  const { customerDeleteUserId, deleteCustomerId } = req.body;

  if (newCustomer) {
    const addCustomer = await users.updateOne(
      {
        _id: newCustomerUserId,
      },
      {
        $push: {
          "customers": {
            customerFirst: cFirst,
            customerLast: cLast,
            customerEmail: cEmail,
            customerPhone: cPhone,
            customerAddress: cAddress,
            customerCity: cCity,
            customerState: cState,
            customerZip: cZip,
          },
        },
      }
    );

    if (addCustomer) {
      return res.send("Customer Created");
    }
  }

  //customer delete handing

  if (customerDelete) {
    const deleteCustomer = await users.updateOne(
      {
        _id: customerDeleteUserId,
      },
      {
        $pull: {
          "customers": {
            _id: deleteCustomerId,
          },
        },
      }
    );
    if (deleteCustomer) {
      return res.send("Customer Deleted");
    }
  }

  //appointment handling

  const appointmentData = ({
    appointmentTitle,
    appointmentDate,
    appointmentNotes,
    noteAddID,
  } = req.body);

  const appointmentDeleteData = ({ appointmentId, appointUserId } = req.body);

  const { appointment } = req.query;
  const { appointDeleteConfirm } = req.query;

  if (appointment) {
    const addAppoint = await users.updateOne(
      { _id: noteAddID },
      {
        $push: {
          "appointments": {
            appointTitle: appointmentTitle,
            appointDate: appointmentDate,
            appointNotes: appointmentNotes,
          },
        },
      }
    );

    if (addAppoint) {
      return res.send("appointment updated");
    }
  }

  if (appointDeleteConfirm) {
    const deleteAppoint = await users.updateOne(
      { _id: appointUserId },
      {
        $pull: {
          "appointments": { _id: appointmentId },
        },
      }
    );

    if (deleteAppoint) {
      return res.send("appointment deleted");
    }
  }

  //send

  if (deleteNote) {
    return res.send("Note Updated");
  }

  if (updateNote) {
    return res.send("Note Updated");
  }
});

module.exports = router;

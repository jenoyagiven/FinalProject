const db = require("../database/api");
require("dotenv").config();
const nodemailer = require("nodemailer");
import swal from "sweetalert2";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jenoyagivenjoy@gmail.com",
    pass: "joowqmfmbxnjdmdy"
  },
});

module.exports = {
  register: (req, res) => {
    db.query(
      `insert into list_user (name, password, email) values ('${req.body.username}',  '${req.body.password}', '${req.body.email}')`,
      (err, result) => {
        try {
          if (err) throw err;
          res.send(result);
        } catch (err) {
          console.log(err);
        }
      }
    );
  },

  login: (req, res) => {
    db.query(
      `select * from list_user where name = "${req.query.username}"`,
      (err, result) => {
        try {
          if (err) throw err;
          res.send(result);
        } catch (err) {
          console.log(err);
        }
      }
    );
  },

  sendEmail: (req, res) => {
    let to = req.query.email;

    let mailOption = {
      from: "FollowAdmin",
      to,
      subject: "verify Email",
      html: `<p>klik <a href="http://localhost:2004/authRouter/verify?username=${req.query.username}">ini</a> untuk verify</p>`,
    };
    //negesend ke email users
    if (to) {
      transporter.sendMail(mailOption, (err, info) => {
        if (err) throw err;
        res.send("email ada isi");
        swal.fire(to);
      });
    } else {
      // kalau email tidak berhasil terkirim
      res.send("email kosong");
    }
  },
};

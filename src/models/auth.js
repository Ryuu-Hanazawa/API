const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otp = require("otp-generator");
const nodemailer = require("nodemailer");
const db = require("../configs/db");

module.exports = {
  postNewUser: (body) => {
    return new Promise((resolve, reject) => {
      // * Generate a salt and hash on separate function calls
      /*
      * Generate a salt, a random string that makes the hash unpredictable. 
      */
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(body.password, salt, (err, result) => {
          // TODO: Store hash in password DB
          if (err) {
            reject(err);
          }
          const newBody = {
            ...body,
            password: result,
          };
          const qs = "INSERT INTO users SET ?";

          db.query(qs, newBody, (err, data) => {
            console.log(data);
            if (!err) {
              resolve(data);
            } else {
              reject(err);
            }
          });
        });
      });
    });
  },
  postLogin: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      const qs =
        "SELECT users.id, users.name, users.email, users.password, types.type FROM users JOIN types ON types.id = users.user_type WHERE email = ?";

      db.query(qs, email, (err, data) => {
        // * Handle error SQL
        if (err) {
          reject({
            msg: "Error SQL",
            status: 500,
            err,
          });
        }

        // * Handle email not found
        if (!data[0]) {
          reject({
            msg: "Email not registered yet",
            status: 500,
            err,
          });
        } else {
          // Comparing password
          bcrypt.compare(password, data[0].password, (err, result) => {
            if (err) {
              reject({
                msg: "Hash error",
                status: 500,
                err,
              });
            }
            if (!result) {
              reject({
                msg: "Wrong password",
                status: 401,
              });
            } else {
              const payload = {
                user_id: data[0].id,
                email,
              };
              const secret = process.env.SECRET_KEY;
              const token = jwt.sign(payload, secret);
              resolve({ token, id: data[0].id, user_id: data[0].id, type: data[0].type, email: data[0].email, name: data[0].name});
            }
          });
        }
      });
    });
  },
  postLogout: (blacklistToken) => {
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO blacklist_tokens SET ?";
      db.query(qs, blacklistToken, (err, data) => {
       if (!err) {
         resolve({
           data,
           msg: "Successfully Logout.",
         });
       } else {
         reject({
           err,
           msg: "Logout failed",
         });
       }
      });
    });
  },
  postForgot: (email) => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT email FROM users WHERE email = ?";
      console.log(email);
      db.query(qs, email, (err, data) => {
        if (!err) {
          if (data[0]) {
            const delOtp = "DELETE FROM otp WHERE email = ?";
            db.query(delOtp, email, (err, data) => {
              if (!err) {
                const otpCode = otp.generate(6, {alphabets: true, upperCase: true, specialChars: false})
                const dataResend = {
                  email: email,
                  otp: otpCode
                }
                const queryStr = "INSERT INTO otp SET ?";
                db.query(queryStr, dataResend, (err, data) => {
                  if (!err) {
                    let transporter = nodemailer.createTransport({
                      service: "gmail",
                      host: "smtp.gmail.com",
                      port: 578,
                      secure: false,
                      auth: {
                        user: process.env.USER_EMAIL,
                        pass: process.env.PASS_EMAIL
                      }
                    })

                    let mailOptions = {
                      from: "Blanja Team <blanja@gmail.com>",
                      to: email,
                      subject: "Reset Password",
                      html: `
                        <h1> Reset Password </h1>
                        <p> Your OTP code is ${otpCode} </p> 
                        <p> Use it to reset your password, remember DO NOT share your OTP codes with other people, even with Blanja Team itself. </p>
                        `,
                    }

                    transporter.sendMail(mailOptions, (err, data) => {
                      if (err) {
                        console.log("Error:", err);
                      } else {
                        console.log("Successfully send OTP.");
                        resolve({
                          status: 200,
                          message: "OTP codes was sended to your email."
                        })
                      }
                    })
                  } else {
                    reject({
                      status: 500,
                      message: "Internal server error.",
                      error: err
                    })
                  }
                })
              } else {
                reject({
                  status: 500,
                  message: "Internal server error.",
                  error: err,
                });
              }
            })
          } else {
            reject({
              status: 404,
              message: "Email not found.",
            });
          }
        } else {
          reject({
            status: 500,
            message: `Internal server error.`,
            error: err,
          });
        }
      })
    })
  },
  getOtp: (email, otp) => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM otp WHERE email = ? AND otp = ?";
      db.query(qs, [email, otp], (err, data) => {
        if (!err) {
          if (data[0]) {
            const qs = "DELETE FROM otp WHERE email = ? AND otp = ?";
            db.query(qs, [email, otp], (err, data) => {
              if (!err) {
                resolve({
                  status: 200,
                  message: "Set your new password.",
                  email: email,
                })
              } else {
                reject({
                  status: 500,
                  message: "Internal server error.",
                  error: err,
                })
              }
            })
          } else {
            reject({
              status: 404,
              message: "Invalid OTP code",
            })
          }
        } else {
          reject({
            status: 500,
            message: "Internal server error.",
          })          
        }
      })
    })
  },
  resetPassword: (email, newPassword) => {
    return new Promise((resolve, reject) => {
      const saltRounds = Math.floor(Math.random() * 10) + 1;
      bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
        if (!err) {
          newPassword = hashedPassword;
          const qs = "UPDATE users SET password = ? WHERE email = ?";
          db.query(qs, [newPassword, email], (err, data) => {
            if (!err) {
              console.log("Success");
              resolve({
                status: 200,
                message: "Change password success.",
              })
            } else {
              reject({
                status: 500,
                message: "Internal server error",
                error: err,
              })
            }
          })
        } else {
          reject({
            status: 500,
            message: "Internal server error",
            error: err,
          })
        }
      })
    })
  }
};

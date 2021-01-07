import React from "react";
import axios from "axios";
import swal from "sweetalert2";
import { json } from "body-parser";
const url_api = "http://localhost:2004/";

// membikin function login
export const onLoginClick = (Datausername, Datapassword) => {
  return (dispatch) => {
    let Username = Datausername;
    let Password = Datapassword;

    axios
      .get(url_api + "authRouter/login", {
        params: {
          username: Username,
          password: Password
        }
      })
      .then((res) => {
        if (res.data.length === 0) {
          swal.fire("error", "", "error");
        }else{
          let { idlist_user, username} = res.data[0];
          console.log(res.data);

          //mengirim data ke localstorage
          localStorage.setItem("userData", JSON.stringify({ idlist_user, username }));

          console.log(idlist_user, username);
          //    mengirim data ke reducer
          dispatch({
            type: "login_success",
            data: { idlist_user, username },
          });
          swal.fire("Logged In", "click the button to continue", "success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onRegisterClick = (username, password, email) => {
  return (dispatch) => {
    let dataPassword = password;
    let dataUsername = username;
    let dataEmail = email;

    axios
      .get(url_api + `authRouter/login`, {
        params: {
          username: dataUsername,
          email: dataEmail,
        },
      })
      .then((res) => {
        console.log(res.data);

        // kalau ada username yang sama
        if (res.data.length > 0) {
          swal.fire("username taken", "make a new one", "error");
        } else {
          axios
            .get(url_api + "authRouter/sendEmail", {
              params: {
                email: dataEmail,
                username: dataUsername,
              },
            })
            .then((res) => {
              axios
                .post(url_api + "authRouter/register", {
                  username: dataUsername,
                  password: dataPassword,
                  email: dataEmail,
                })
                .then((res) => {
                  //    memgsimpulkan variqable
                  let name = dataUsername;
                  let idlist_user = res.data.insertId;
                  //mengirim data ke localstorage
                  localStorage.setItem(
                    "userData",
                    JSON.stringify({ idlist_user, name })
                  );

                
                  swal.fire(
                    "user made",
                    "click the button to continue",
                    "success"
                  );
                })
                .catch((err) => {
                  console.log("fail");
                  console.log(err);
                });
            });
        }
      });
  };
};

export const verifiedRegister = (user) => {
  return(dispatch) => {
    let username = user.name;
    let id = user.idlist_user;

    localStorage.setItem(
      "userData",
      JSON.stringify({ id, username })
    );

    dispatch({
      type:"login_success",
      data:{
        username:username,
        id:id
      }
    })
  }
}

export const Logout = () => {
  // menghapus data di local storage
  localStorage.removeItem("userData");

  return {
    type: "logout_success",
  };
};

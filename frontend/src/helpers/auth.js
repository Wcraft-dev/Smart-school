import axions from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { NotificationsContext } from "../App";

import SocketClient from "socket.io-client";
import {
  setCookie,
  removeCookie,
  getCookie,
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage,
} from "./clientSave";

const access = [
  { student: ["/student", "/ruta"] },
  { teacher: ["/teacher", "/ruta"] },
  { parents: ["/parents", "/ruta"] },
  { director: ["/director", "/ruta"] },
  { God: ["/God", "/ruta"] },
];

let puedo = null;
let change;
const login = (state) => {
  const socket = SocketClient(process.env.REACT_APP_API_URL.split("api")[0], {
    extraHeaders: {
      token: getCookie("token"),
    },
  });

  socket.emit("Are you connected", getCookie("token"));

  socket.on("new notification", (res) => {
    if (change) {
      change(res);
    }
  });

  socket.on("Are you connected", (booleanx) => {
    try {
      state(booleanx);
    } catch (e) {
      console.log("mmm... state");
    }
  });
  return { socket, state };
};

export default function Dispatchx(props) {
  let [notification, setNotification] = useContext(NotificationsContext);
  const manager = (res) => {
    setNotification(notification + 1);
    props.handle(res);
  };
  change = manager;

  return <div></div>;
}

//Auth user after login
export const authenticate = (response, state, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  puedo = login(state);
  next();
};

export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
  puedo.socket.disconnect();
  puedo.state(false);
};

export const isAuth = async (pathRequest, state) => {
  const cookieUser = getCookie("token");
  const data = getLocalStorage("user");

  if (cookieUser === undefined || data === undefined) {
    removeCookie("token");
    removeLocalStorage("user");
  }
  if (window !== "undefined") {
    if (cookieUser && data) {
      try {
        const { data } = await axions.post(
          `${process.env.REACT_APP_API_URL}/auth/`,
          {
            data: "",
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "x-access-token": cookieUser,
            },
          }
        );
        const permission = data.roleIs;

        const valor = access
          .map((ruta) => {
            return ruta[permission];
          })
          .filter(Boolean)[0];
        if (pathRequest === "/user/singup" || pathRequest === "/user/singin") {
          return [true, valor[0]];
        } else {
          const found = valor.indexOf(pathRequest);
          if (found !== -1) {
            if (puedo) {
              puedo.socket.disconnect();
            }
            puedo = login(state);
            return [true, valor[0]];
          } else {
            return [false, valor[0]];
          }
        }
      } catch (error) {
        return [false, "/user/singin"];
      }
    } else {
      if (pathRequest === "/user/singup" || pathRequest === "/user/singin") {
        return [false, null];
      }
    }
  }
};

//update user data in localstorage
export const updateUser = (response, next) => {
  if (window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};

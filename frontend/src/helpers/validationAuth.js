import React, { useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { isAuth } from "./auth";
import { toast } from "react-toastify";
import { LoginContext } from "../App";

export default function ValidationAux(props) {
  const [login, setLogin] = useContext(LoginContext);
  const [redirect, setRedirect] = useState(null);
  const path = useLocation().pathname;

  const { authAux } = props;

  useEffect(() => {
    async function tryAsync() {
      try {
        const x = await isAuth(path, setLogin);
        if (x[0]) {
          authAux(login);
        } else {
          toast.error("Unauthorized");
          setRedirect(<Redirect to={x[1]} />);
        }
      } catch (error) {
        setRedirect(<Redirect to="/user/singin" />);
      }
    }
    console.log(`hola jhair este es el valor de login : ${login}`)
    if (login === true) {
      authAux(login);
    }
    if(login === false){
      tryAsync();
    }
  }, [setLogin, login, path, setRedirect, authAux]);
  return <div>{redirect}</div>;
}

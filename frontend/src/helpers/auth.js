import cookie from "js-cookie";
import axions from "axios";
const access = [
  { admin: ["dfsdfs", "dfsaf"] },
  { student: ["/student", "/ruta"] },
  { teach: ["sss", "ff"] },
  { god: ["sss", "ff"] },
];
//set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      //1 Day
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get from cookie like token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//Remove from localStorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

//Auth user after login
export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

//SingOut
export const signout = (next) => {
  removeCookie("token");
  removeCookie("user");
};

//Get user info from localstorage
export const isAuth =  async (pathRequest) => {
  if (window !== "undefined") {
    const cookieUser = getCookie("token");
    const data = localStorage.getItem("user");
    if (cookieUser && data) {
    try{
      const role = await axions.post(
        `${process.env.REACT_APP_API_URL}/auth/`,
        { undex: null },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "x-access-token": cookieUser,
          },
        }
      )
      const valor = access
        .map((a) => {
          return a[role.data.roleIs];
        })
        .filter(Boolean);
        if(!valor[0].includes(pathRequest)){
          return [false,valor[0][0]]
        }else{
          return [true]
        }
      
    }catch(error){
      return [false,"/user/singin"]
    }
        
    }else{
      return [false,'/user/singin'] 
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

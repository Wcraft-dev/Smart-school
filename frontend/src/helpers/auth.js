import cookie from 'js-cookie'

//set in cookie
export const setCookie = (key, value) =>{
    if (window !== 'undefined'){
        cookie.set(key, value,{
            //1 Day
            expires: 1
        })
    }
}

export const removeCookie = key =>{
    if(window !== 'undefined'){
        cookie.remove(key, {
            expires: 1
        })
    }
}

// get from cookie like token
export const getCookie = key => {
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}

// set in localstorage
export const setLocalStorage = (key, value)=>{
    if (window !== 'undefined'){
        localStorage.setItem(key,JSON.stringify(value))
    }
}

//Remove from localStorage
export const removeLocalStorage = key =>{
    if (window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

//Auth user after login 
export const authenticate = (response,next) =>{
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

//SingOut
export const signout = next =>{
    removeCookie('token')
    removeCookie('user')
}
//Get user info from localstorage 
export const isAuth = ()=>{
    if(window !== 'undefined'){
        const cookieCheked = getCookie('token')
        if (cookieCheked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            }else {
                return false
            }
        }
    }
}

//update user data in localstorage
export const updateUser = (response,next)=>{
    if (window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
}
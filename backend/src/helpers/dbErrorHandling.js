"use strict"

/*
    Get Unique error field name
*/

const uniqueMessage = error =>{
    let output;
    try{
        let fieldName = error.message.split('.$');
        field = field.split(" dub key")[0]
        field = field.substring(0, field.lastIndexOf("_"))
        req.flash("error",[{
            message: "An account with this "+ field + "already exist"
        }])
        output = fieldName.charAt(0).toUpperCase + fieldName.slice(1) + "already exist";
    }catch (e){
        output = "already exist"
    }
    return output;
}

/*
    Get the error message from error object
*/
exports.errorHandler = error =>{
    let message = "";
    if (error.code){
        switch (error.code){
            case 11000:
            case 11001:
                message = uniqueMessage(error)
                break;
            default:
                message = "Something went worng"
        }
    }else{
        for (let errorName in error.errors) {
            if (error.errors[errorName].message){
                message = error.errors[errorName].message
            }            
        }
    }
    return message
}

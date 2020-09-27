import userModel from '../models/auth.model'

export const loginUser = async (req, res) => {
    res.json({msg: 'funcionando la base y autentuficacin de datos del usuario'});
}

export const getUsersData = async (req, res) => {
    const u = await userModel.find()
    res.json(u);
} 

export const newUser = async (req, res) => {
    const {username,name,lastName,email,password} = req.body
    const user = new userModel ({
        username,
        name,
        lastName,
        email,
        password
    })
    try {
        await user.save();
        res.json({msg: 'añadimos un nuevo usuario'});
    } catch (error) {
        res.json({msg: 'No se pudo agregar el usuaro'});
    }
}

export const deleteUser = async (req, res)=> {
    
    const datau = await userModel.findById(req.params.id);
    if (req.body["password"] == datau["password"]) {
        await userModel.findByIdAndDelete(req.params.id)
        res.json({msg: 'eliminamos un usuario por la id recivida'});
    }else{
         res.json({msg: 'password incorrect'})
    }
}
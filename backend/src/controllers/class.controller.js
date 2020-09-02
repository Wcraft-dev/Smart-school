const classCtrl = {};

const classModel = require('../models/Class_');

classCtrl.addClas = async (req, res) => {
    const {author, text, start_date, end_date} = req.body
    try {
        const clase = new classModel ({
            author,
            text,
            start_date,
            end_date
        })
        await clase.save();
        res.json({msg:'Guardado'});
    }catch (err){
        res.json({msg:'No se guardado'});
    }
}
classCtrl.deleteClass = async (req, res)=> {
    await classModel.findByIdAndDelete(req.params.id)
    res.json({msg: 'eliminamos una clase por la id recivida'})
};
function vamos(arr) {
    let result =[];
    arr.forEach(sd =>{
        result.push({
            id: sd._id,
            text: sd.text,
            author: sd.author,
            start_date: sd.start_date,
            end_date: sd.end_date
        });
    })
    return result;
}
classCtrl.getClases = async (req, res)=> {
    const b = await classModel.find();
    const reurns = vamos(b)
    res.json(reurns)
};

classCtrl.getClas = async (req, res)=> {
    const cl = await classModel.findById(req.params.id)
    res.json(cl);
}

classCtrl.updateClas = async (req, res)=> {
    const {  text , start_date , end_date }= req.body;
    if((text ,start_date ,end_date) != null)
    {
        try {
            await classModel.updateOne({ 
                _id :  req.params.id
            }, { 
                text,
                start_date,
                end_date 
            } 
            );
            res.send("Se actualiza");
    
        } catch (e) {
            res.send("No se pudo actualizar"+ e);
    
        }
    }else{
        res.send("Los datos no son completos");
    }
   
    
}


module.exports = classCtrl;
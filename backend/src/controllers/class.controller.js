import classModel from '../models/class.model'

export const addClas = async (req, res) => {
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
        let cx = err.message.split("Class_ validation failed:")
        let vc = cx.filter(Boolean)
        res.status(400).json({error:  vc});
    }
}
export const deleteClass = async (req, res)=> {
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
export const getClases = async (req, res)=> {
    const b = await classModel.find();
    const reurns = vamos(b)
    res.json(reurns)
};

export const getClas = async (req, res)=> {
    const cl = await classModel.findById(req.params.id)
    res.json(cl);
}

export const updateClas = async (req, res)=> {
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
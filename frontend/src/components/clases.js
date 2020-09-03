import React, { Component } from 'react'
import Horario from './horario'
import axios from 'axios'
import Flip from 'react-reveal/Flip.js'; 
import Shake from 'react-reveal/Shake.js'; 



export default class clases extends Component {
    state ={
        eventos: null,
        deleteId:null,
        tex_title:"Agregar nueva clase",
        up:false,
        tempdate:null,
        temphour:null,
        tempdate_:null,
        text: null,
        author:"Jhair",
        start_date:null,
        end_date:null

    }
    minewfunction = async()=>{
        await axios.get('http://localhost:3000/class').then(res =>{
            this.setState({
                eventos: res.data
            })
            return res.data
        }).catch(err =>{
            let loading_events = document.getElementById("loading_events");
            switch (err.message) {
                case "Network Error":
                    loading_events.innerHTML=""
                    loading_events.innerHTML='<div class="p-3 mb-2 rounded-lg bg-warning text-dark">No se pudo cargar el calendario <kbd>Network OFF</kbd></div>'
                    break;
                case "Request failed with status code 404":
                    loading_events.innerHTML=""
                    loading_events.innerHTML='<div class="p-3 mb-2 rounded-lg bg-warning text-dark">No se pudo cargar el calendario <kbd>404</kbd></div>'
                    break;
            
                default:
                    break;
            }
        })
    }
    async componentDidMount(){
       this.minewfunction();
    }
    encambio =(xs)=>{
        this.validacionHoras(xs,"remove")
        this.validacionHoras(this.state.temphour,"remove")
        this.setState({
            start_date: this.state.tempdate + " " + this.state.temphour,
            end_date: this.state.tempdate_  + " " + xs
        })
    }
    onSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:3000/class",{
            author:this.state.author,
            text:this.state.text,
            start_date: this.state.start_date,
            end_date:this.state.end_date
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err);
        })
        const res = this.minewfunction();
        this.setState({
            eventos:res,
            up:true,
            tempdate:"",
            temphour:"",
            tempdate_:"",
            text: "",
            start_date:"",
            end_date:""
        })
        document.getElementById('form').reset();  
    }
    validacionHoras = (str,type)=>{
        if (type === "remove") {
            if (str !== undefined & str !== null) {
                let cv = str.split(/^[0]/)
            console.log(cv);
            }
            
        }else{
            if(!(/^[0]/.test(str))){
                if (/^[1]/.test(str)){
                    return str
                }else{
                    return "0"+str
                }            
            }else{
                return str
            }
        }
    }
    devolverAgregar = ()=>{
        document.getElementById('add').innerHTML = "Añadir";
        document.getElementById('title').value = "";

        document.getElementById('start-date').value = " ";
        document.getElementById('end-date').value  = "";

        document.getElementById('start-hour').value = " ";
        document.getElementById('end-hour').value = " ";

        this.setState({
            tex_title: "Agregar nueva clase"
        });
    }
    actualixar = async(c)=>{
        const edit = await axios.get('http://localhost:3000/class/'+c+'/');
        this.setState({
            tex_title:"Editar Clase"
        })

        const h = edit.data.start_date.split(" "),
        g = edit.data.end_date.split(" ");

        document.getElementById('title').value = edit.data.text;
        document.getElementById('add').innerHTML = "Modificar";        

        document.getElementById('start-date').valueAsDate  = new Date(h[0]);
        document.getElementById('end-date').valueAsDate  = new Date(g[0]);

        document.getElementById('start-hour').value = this.validacionHoras(h[1]);
        document.getElementById('end-hour').value = this.validacionHoras(g[1]);

        document.getElementById('delete').value = c;
        return "Todo va bien"
    }
    ondelete = async (e)=>{
        let t= e.target.value
        await axios.delete('http://localhost:3000/class/'+t+'/').then(res =>{
            console.log(res,"se borro")
            this.setState({
                deleteId: t
            })
            //const tag = this.minewfunction();
        })
    }
    handleChangetext=e =>{

    }
    handleChangeStartDate=e =>{

    }
    handleChangeStartHour=e =>{

    }
    handleChangetext=e =>{

    }
    handleChangetext=e =>{
        
    }
    render() {
        let templete = 
        <div className="col-md-5">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center">{this.state.tex_title}</h3>
                    <form onSubmit={this.onSubmit} id="form">
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text"   onChange={e =>{this.setState({text:e.target.value})}} className="form-control" id="title" placeholder="Matematicas"/>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="start-date">Fecha de inicio:</label>
                                <input type="date"  onChange={e =>{this.setState({tempdate : e.target.value});this.encambio()}} id="start-date" className="form-control"/>
                            </div>
                            <div className="col">
                                <label htmlFor="start-hour">Hora de comienzo:</label>
                                <input type="time"  onChange={e =>{this.setState({temphour : e.target.value});this.encambio()}}  id="start-hour" className="form-control"/>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="end-date">Fecha de Terminacion:</label>
                                <input type="date" onChange={e =>{this.setState({tempdate_: e.target.value});this.encambio()}}  id="end-date" className="form-control"/>
                            </div>
                            <div className="col">
                            <label htmlFor="end-hour">Hora de Finalizacion:</label>
                            <input type="time" onChange={e =>{this.encambio(e.target.value)}} id="end-hour" className="form-control"/>
                            </div>
                        
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeticion">Repetir</label>
                            <select className="form-control" id="repeticion" disabled>
                            <option>1</option>
                            <option>2</option>
                            </select>
                        </div>
                        <div className={(this.state.tex_title === "Editar Clase") ? "form-group btn-group":"form-group"}>
                            <button type="submit" className="btn btn-primary w-100" id="add">Añadir</button>
                            {(this.state.tex_title === "Editar Clase") ? <button type="reset" className="btn btn-warning" onClick={this.devolverAgregar}>Cancelar</button>: ""}
                            {(this.state.tex_title === "Editar Clase") ? <button type="reset" className="btn btn-danger" id="delete" onClick={this.ondelete}>Eliminar</button>: ""}
                        </div>
                    </form>
                </div>
            </div>
        </div>;
        
        if (this.state.eventos) {
            return (
                <div className="row mt-5">
                    <Shake>
                        {templete}
                    </Shake>
                    <div className="col-md-7 mt-4">
                        <Flip top>
                            <Horario updata={this.state.up} cos={this.actualixar} events={this.state.eventos} deleteEvent={this.state.deleteId}/>
                        </Flip>
                    </div>
                </div>
            );
            
        }else{
            return (
                <div className="row mt-5">
                    <Shake>
                        {templete}
                    </Shake>
                    <div className="col-md-7 mt-4" id="loading_events">
                    <div className="d-flex align-items-center p-3 mb-2 rounded-lg bg-warning text-dark ">
                        <strong className="text-primary">Cargando...</strong>
                        <div className="spinner-border text-primary ml-auto" role="status" aria-hidden="true"/>
                    </div>
                    </div>
                </div>
            );
        }
    }}
import React, { Component } from 'react'
import Horario from './horario'
import axios from 'axios'
import Flip from 'react-reveal/Flip.js'; 
import Shake from 'react-reveal/Shake.js'; 



export default class clases extends Component {
    state = {
        eventos: null,
        deleteId:" ",
        tex_title:"Agregar nueva clase",
        up:false,
        tempdate:" ",
        temphour:" ",
        tempdate_:" ",
        temphour_:" ",
        text: "",
        author:"Jhair"
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
    componentDidMount(){
       this.minewfunction();
    }
    validacionHoras = (str)=>{
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
    onSubmit= async (e)=>{
        e.preventDefault();
        
        await axios.post("http://localhost:3000/class",{
            author:     this.state.author,
            text:       this.state.text,
            start_date: this.state.tempdate + " " + this.state.temphour,
            end_date:   this.state.tempdate_  + " " + this.state.temphour_
        }).then(res =>{

        }).catch(err => {
            console.log("."+err+".",err.response.data)
        })
        
        
        const res = this.minewfunction();
        this.setState({
            eventos:res,
            tempdate:"",
            temphour:"",
            temphour_:"",
            tempdate_:"",
            text: "",
        })
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
        let t= document.getElementById('delete').value
        await axios.delete('http://localhost:3000/class/'+t+'/')
        this.setState({
            deleteId: t,
            tex_title: "Agregar nueva clase"
        })         
    }
    handleChangetext = e =>{
        this.setState({
            text: e.target.value
        })
    }
    handleChangeStartDate = e =>{    
        this.setState({
            tempdate : e.target.value
        })
    }
    handleChangeStartHour = e =>{
        this.setState({
            temphour : e.target.value
        })
    }
    handleChangeEndDate = e =>{
        this.setState({
            tempdate_: e.target.value
        })
    }
    handleChangeendHour = e =>{
        this.setState({
            temphour_: e.target.value
        })
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
                            <input type="text"   onChange={this.handleChangetext} value={this.state.text} className="form-control" id="title" placeholder="Matematicas"/>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="start-date">Fecha de inicio:</label>
                                <input type="date"  onChange={this.handleChangeStartDate} value={this.state.tempdate} id="start-date" className="form-control"/>
                            </div>
                            <div className="col">
                                <label htmlFor="start-hour">Hora de comienzo:</label>
                                <input type="time"  onChange={this.handleChangeStartHour} value={this.state.temphour} id="start-hour" className="form-control"/>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="end-date">Fecha de Terminacion:</label>
                                <input type="date" onChange={this.handleChangeEndDate} value={this.state.tempdate_} id="end-date" className="form-control"/>
                            </div>
                            <div className="col">
                            <label htmlFor="end-hour">Hora de Finalizacion:</label>
                            <input type="time" onChange={this.handleChangeendHour} value={this.state.temphour_} id="end-hour" className="form-control"/>
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
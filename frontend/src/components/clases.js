import React, { Component } from 'react'
import Horario from './horario'
import axios from 'axios'
import Flip from 'react-reveal/Flip.js'; 
import Shake from 'react-reveal/Shake.js';   
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class clases extends Component {
    state = {
        eventos: null,
        deleteId:" ",
        tex_title:"Agregar nueva clase",
        tempdate:" ",
        temphour:" ",
        tempdate_:" ",
        temphour_:" ",
        text: "",
        author:"Jhair",
        stilo: "btn btn-primary w-100",
        btn_tx:"Añadir",
        btn_icon:"",
        modify:false,
        id__:" "
    }
    minewfunction = async()=>{
        try{
            const res = await axios.get('http://localhost:3000/class')
            this.setState({
                eventos: res.data
            })
            return res.data
        }catch(err){
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
        }
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
    validacionFecha =(str)=>{
        if (/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(str)) {
            return str
        }else{
            let c = str.split("-")
            if(!/^[0-9]{2}/.test(c[2])){
                c[2] = "0"+c[2]
                return c.join("-") 
            }
        }
    }
    onWait = ()=>{
        this.setState({
            stilo:"btn btn-info w-100",
            btn_tx:"Cargando...",
            btn_icon: <span className="spinner-border spinner-border-sm" role="status"></span>
        })
    }
    onBad = ()=>{
        this.setState({
            stilo:"btn btn-danger w-100",
            btn_tx:"Algo salio mal",
            btn_icon: <FontAwesomeIcon icon={"times"} />
        })
    }
    onGood = ()=>{
        this.setState({
            stilo:"btn btn-success w-100",
            btn_tx: "Ok",
            btn_icon: <FontAwesomeIcon icon={"check"} />
        })
    }
    onReturn =()=>{
        this.setState({
            stilo:"btn btn-primary w-100",
            btn_tx:"Añadir",
            btn_icon:"",
            id__:" ",
            modify:false
        })
    }
    onTimer = ()=>{
        setTimeout(() => {
          this.onReturn()
        }, 1500);
    }
    onModify = ()=>{
        this.setState({
            stilo:"btn btn-primary w-100",
            btn_tx:"Modificar",
            modify: true
        })
    }
    onSubmit= async (e)=>{
        e.preventDefault();
        this.onWait()
        if(this.state.modify){
            try{
                await axios.put("http://localhost:3000/class/"+this.state.id__+"",{
                    author:     this.state.author,
                    text:       this.state.text,
                    start_date: this.state.tempdate + " " + this.state.temphour,
                    end_date:   this.state.tempdate_  + " " + this.state.temphour_
                })
                this.onGood()
                this.onTimer() 
            }catch(err){
                console.log(err.response.data.error[0])
                this.onBad()
                this.onTimer()
            }
        }else{
            try{
                await axios.post("http://localhost:3000/class",{
                    author:     this.state.author,
                    text:       this.state.text,
                    start_date: this.state.tempdate + " " + this.state.temphour,
                    end_date:   this.state.tempdate_  + " " + this.state.temphour_
                })
                this.onGood()
                this.onTimer() 
            }catch (err) {
                console.log(err.response.data.error[0])
                this.onBad()
                this.onTimer()
            }
        }
        const res = this.minewfunction();
        this.setState({
            eventos:res,
            text: "",
            tempdate:"",
            temphour:"",
            temphour_:"",
            tempdate_:"",
            submit: false,
            tex_title: "Agregar nueva clase"
        })
    }

    devolverAgregar = ()=>{
        this.onReturn()
        this.setState({
            text: "",
            tempdate: "",
            temphour: "",
            tempdate_: "",
            temphour_: "",
            tex_title: "Agregar nueva clase"
        });
    }
    updateCard = async(c)=>{
        const edit = await axios.get('http://localhost:3000/class/'+c+'/');
        this.setState({
            tex_title:"Editar Clase"
        })

        const h = edit.data.start_date.split(" "),
            g = edit.data.end_date.split(" ");

        this.setState({
            text: edit.data.text,
            tempdate: this.validacionFecha(h[0]),
            temphour: this.validacionHoras(h[1]),
            tempdate_: this.validacionFecha(g[0]),
            temphour_: this.validacionHoras(g[1]),
            id__: c
        })
        this.onModify()
    }
    ondelete = async (e)=>{
        try{
            await axios.delete('http://localhost:3000/class/'+this.state.id__+'/')
            this.setState({
                deleteId:this.state.id__
            }) 
            this.onGood()
            this.onTimer()    
        }catch(err){
            console.log(err.response.data.error[0])
            this.onBad()
            this.onTimer()
        }
        this.setState({
            text:"",
            tempdate:"", 
            temphour: "",
            tempdate_: "",
            temphour_: "",
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
                            <input 
                                type="text"   
                                onChange={this.handleChangetext} 
                                value={this.state.text} 
                                className="form-control" 
                                id="title" 
                                placeholder="Matematicas"
                                required/>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="start-date">Fecha de inicio:</label>
                                <input 
                                    type="date"  
                                    onChange={this.handleChangeStartDate} 
                                    value={this.state.tempdate} 
                                    id="start-date" 
                                    className="form-control"
                                    required/>
                            </div>
                            <div className="col">
                                <label htmlFor="start-hour">Hora de comienzo:</label>
                                <input 
                                    type="time"
                                    onChange={this.handleChangeStartHour} 
                                    value={this.state.temphour} 
                                    id="start-hour" 
                                    className="form-control"
                                    required/>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="end-date">Fecha de Terminacion:</label>
                                <input 
                                    type="date" 
                                    onChange={this.handleChangeEndDate} 
                                    value={this.state.tempdate_} 
                                    id="end-date" 
                                    className="form-control"
                                    required/>
                            </div>
                            <div className="col">
                            <label htmlFor="end-hour">Hora de Finalizacion:</label>
                            <input 
                                type="time" 
                                onChange={this.handleChangeendHour} 
                                value={this.state.temphour_} 
                                id="end-hour" 
                                className="form-control"
                                required/>
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
                        <button 
                            type="submit" 
                            className={this.state.stilo}
                            style={{transition: "all linear .5s"}}
                            id="add">
                          {this.state.btn_tx} 
                          {this.state.btn_icon} 
                        </button>
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
                            <Horario updata={this.state.up} onClicking={this.updateCard} events={this.state.eventos} deleteEvent={this.state.deleteId}/>
                        </Flip>
                    </div>
                </div>
            );
            
        }else{
            return (
                <div className="container">
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
                </div>
                
            );
        }
    }}
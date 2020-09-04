import React, { Component } from 'react'
import 'dhtmlx-scheduler'
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_recurring'
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css'

const scheduler = window.scheduler;


export default class horario extends Component { 
    componentDidMount() {
        scheduler.skin = 'material';
        scheduler.config.header = [
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];

        scheduler.config.hour_date = '%g:%i %A';
        let f = this.props.cos;
        scheduler.attachEvent("onClick", function (id, e){
            f(id);
            return false;
        });
        
        scheduler.config.first_hour = 7;
        scheduler.config.last_hour = 14;
        scheduler.config.start_on_monday = true;
        scheduler.config.readonly = true;
        scheduler.init(this.schedulerContainer, new Date(),"week");      
        scheduler.clearAll();  
        scheduler.parse(this.props.events);
    }
   
    
    componentDidUpdate(prevProps){
        if (this.props.events !== prevProps.events) {
            scheduler.parse(this.props.events)
        }
        if(this.props.deleteEvent !== prevProps.deleteEvent){
            scheduler.deleteEvent(this.props.deleteEvent)
        } 
    }
    render() {
        return (
          <div
          ref={ (input) => { this.schedulerContainer = input } }
          style={ { width:'100%', height:'400px' } }/> 
        )
    }
}






/*
       //clic en vacio
       scheduler.attachEvent("onEmptyClick", function (date, e){
            console.log(date,"un click vacio",e)
        });

        

        scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
            console.log(id,"antes de arrastrar",e)
            return false;
        });
        
        scheduler.attachEvent("onDragEnd", function(id, mode, e){
            console.log(id,"despues de arrastrar",e)
        });
        //lo deteecta pero no lo evita
        scheduler.attachEvent("onEventCreated", function(id,e){
            e.targe = {}
            console.log(id,"Evento que crea",e)
            return false;
        });
        scheduler.attachEvent("onBeforeEventCreated", function (e){
            console.log("antes de crear",e)
            return false;
        });
        scheduler.attachEvent("onMouseDown", function(className){
            console.log("mause abajo",className)
        });

        scheduler.config.details_on_create=true;
        scheduler.config.details_on_dblclick=true;
        scheduler.config.occurrence_timestamp_in_utc = true;
        */
       
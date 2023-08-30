import './styles/Selector.css'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import data_ubi from './ubicaciones'
import { useFetch } from '../hooks/useFetch'
const Selector=({todos,opt_de,titulo,data,loading,props,origen})=>{
    const customStyles = {
        // Estilos para el contenedor del react-select
        control: (provided, state) => ({
          ...provided,
          color:'#003757',
          borderColor: state.isFocused ? '#80bdff' : '#ccc',
          boxShadow: state.isFocused ? '0 0 0 1px #80bdff' : null,
          '&:hover': {
            borderColor: state.isFocused ? '#80bdff' : '#999',
          },
        }),
        // Estilos para las opciones en el menú desplegable
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? '#80bdff' : null,
        }),
      };
    const opt_default=(todos)?[{ dispId: 0, name: "Todos" }]:[]
    const data_aux=opt_default.concat(data)
//    console.log(props.ubicacion)
    
    const options=loading?{filter:titulo, value: 0, label: 'cargando...' }:data_aux.map(datas=>{
        let op;
        switch(titulo){
            case 'Municipio': op={ filter:titulo,value: datas.groupid === undefined?0:datas.groupid , label: datas.name };
                                break;
            case 'Tecnologia': op={ filter:titulo,value: datas.dispId=== undefined?0:datas.dispId, label: datas.name };
                                break; 
            case 'Subtipo': op={ filter:titulo,value: datas.templateId=== undefined?0:datas.templateId, label: datas.name };
                                break;  
            case 'Agencia': op={ filter:titulo,value: datas.exception_agency_id=== undefined?0:datas.exception_agency_id, label: datas.name };
                                break;                   
            default:
                op={ value: '', label: '' };
                    break;                        
        }
        return op                           // <option key={datas.uuid}> {datas.name} </option>
})
    // console.log(options)
    // console.log(opt_de)
    // console.log(options[opt_de].label)
    const [value,setValue]=useState([])
    
    // console.log(value,'value') 
    const HandleChange=(selected,name)=>{
        console.log(selected)
        // setValue((state)=>({
        //     ...state,[name]:selected.label
        // }))
        setValue(selected)
        if(origen==='mapa'){
            switch(selected.filter){
                case 'Municipio': props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:selected.value,dispId:props.ubicacion.dispId,templateId:props.ubicacion.templateId})
                                    break;
                case 'Tecnologia': props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:props.ubicacion.groupid,dispId:selected.value,templateId:props.ubicacion.templateId})
                                    break; 
                case 'Subtipo': props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId:selected.value})
                                    break;                    
                default:
                        break;                        
            }
        }else if(origen==='admin'){
                console.log("admin",selected.value)
        }
        
        
    }
   
    return(
        <div className='menuSearchOption'>
            <div className={origen==='mapa'?'compactSelector':'compactSelectorAdmin'}>
                <label htmlFor='selector' className='labelSelector'>{titulo}:</label>
                {
                    origen==='mapa'?
                        <Select
                        options={options}
                        value={(value.length===0)?options[opt_de]:value}
                        // options={{filter:titulo, value: 0, label: 'cargando...' }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        onChange={(selected)=>HandleChange(selected,titulo)}
                        placeholder={loading?'cargando..':options[0].label}
                        noOptionsMessage={() => "No existe"}
                        isDisabled={loading}
                    />
                    :
                    <Select
                        options={options}
                        
                        // options={{filter:titulo, value: 0, label: 'cargando...' }}
                        className="react-select-container-admin"
                        classNamePrefix="react-select-admin"
                        onChange={(selected)=>HandleChange(selected,titulo)}
                        placeholder={loading?'cargando..':titulo}
                        noOptionsMessage={() => "No existe"}
                        isDisabled={loading}
                    />
                }
                
                
            </div>
        </div>
    )
}

export default Selector
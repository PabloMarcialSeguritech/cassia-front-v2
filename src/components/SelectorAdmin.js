import './styles/Selector.css'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import data_ubi from './ubicaciones'
import { useFetch } from '../hooks/useFetch'
const SelectorAdmin=({index,opGeneral,placeholder,txtOpGen,opt_de,titulo,data,loading,selectFunction,origen})=>{
    
    
    const customStyles = {
        menuPortal: base => ({
            ...base,
            maxHeight: '50px',
            zIndex: 9999 // Ajusta el z-index según sea necesario
          }),
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
        placeholder: (provided) => ({
            ...provided,
            color: '#aa9c9c', // Color deseado para el placeholder
          }),
      };
    const opt_default=(opGeneral)?[{ dispId: 0, name: txtOpGen ,id:0}]:[]
    const data_aux=opt_default.concat(data)
//    console.log(data_aux)
    let cont_i=0;
    let opcion_default=0
    const options=loading?{filter:titulo, value: 0, label: 'cargando...' ,id:0}:data_aux.map(datas=>{
        // console.log(datas.name)
        if(opt_de==0){
            // console.log("es 0")
            opcion_default=0
        }else{
            // console.log(datas)
            if(datas.id==opt_de){
                // console.log(" el valor es" ,cont_i)
                opcion_default=cont_i
            }
        }
        
        cont_i++
        let op;
        switch(titulo){
            case 'Municipio': op={ filter:titulo,value: datas.groupid === undefined?0:datas.groupid , label: datas.name ,id:datas.id};
                                break;
            case 'Tecnología': op={ filter:titulo,value: datas.dispId=== undefined?0:datas.dispId, label: datas.name ,id:datas.id};
                                break; 
            case 'Marca': op={ filter:titulo,value: datas.brand_id=== undefined?0:datas.brand_id, label:datas.value,id:datas.id};
                                break;  
            case 'Modelo': op={ filter:titulo,value: datas.id=== undefined?0:datas.id, label: datas.value ,id:datas.id};
                                break;  
            case 'CIS': op={ filter:titulo,value: datas.element_id=== undefined?0:datas.element_id, label: datas.folio ,id:datas.element_id};
                                break; 
            case 'statusConf': op={ filter:titulo,value: datas.id=== undefined?0:datas.id, label: datas.name ,id:datas.id};
                                break;           
            case 'CisTec': op={ filter:titulo,value: datas.id=== undefined?0:datas.id, label: datas.value ,id:datas.id};
                                break;     
            case 'Proxys': op={ filter:titulo,value: datas.proxyid=== undefined?0:datas.proxyid, label: datas.host ,id:datas.proxyid};
                                break; 
            case 'Estados': op={ filter:titulo,value: datas.id, label: datas.name ,id:datas.id};
                                break;                           
            default:
                op={ value: '', label: '' };
                    break;                        
        }
        return op                           // <option key={datas.uuid}> {datas.name} </option>
})
// console.log(options[opcion_default])
// console.log(options[opcion_default].label)
//console.log(options)
//console.log(opt_de)
    
    
    
    const [value,setValue]=useState([])
    
    // //console.log(value,'value') 
    const HandleChange=(selected,name)=>{
        // console.log(selected)
        // setValue((state)=>({
        //     ...state,[name]:selected.label
        // }))
        setValue(selected)
        selectFunction(selected,index)
        // if(origen==='mapa'){
        //     switch(selected.filter){
        //         case 'Municipio': props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:selected.value,dispId:props.ubicacion.dispId,templateId:props.ubicacion.templateId})
        //                             break;
        //         case 'Tecnología': props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:props.ubicacion.groupid,dispId:selected.value,templateId:props.ubicacion.templateId})
        //                             break; 
        //         case 'Métrica': props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId:selected.value})
        //                             break;                    
        //         default:
        //                 break;                        
        //     }
        // }else if(origen==='admin'){
        //         //console.log("admin",selected.value)
        // }
        
        
    }
    // const targetElement = document.getElementById('content-menu-search');
    return(
        <div className='menuSearchOption' style={{padding:'unset'}}>
            <div className={origen==='mapa'?'compactSelector':'compactSelectorAdmin'}>
                {/* <label htmlFor='selector' className={origen==='mapa'?'labelSelector':'labelSelectorAdmin'}>{titulo}:</label> */}
                {
                    
                        origen==='mapa'?
                            <Select
                            options={options}
                            value={(value.length===0)?options[opcion_default]:value}
                            // options={{filter:titulo, value: 0, label: 'cargando...' }}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            onChange={(selected)=>HandleChange(selected,titulo)}
                            // placeholder={loading?'cargando..':placeholder}
                            // placeholder={'hola'}
                            noOptionsMessage={() => "No existe"}
                            isDisabled={loading}
                        />
                        :
                        <Select
                            options={options}
                            styles={customStyles}
                            // menuPortalTarget={targetElement}
                            // options={{filter:titulo, value: 0, label: 'cargando...' }}
                            value={(value.length===0)?options[opcion_default]:value}
                            className="react-select-container-admin"
                            classNamePrefix="react-select-admin"
                            onChange={(selected)=>HandleChange(selected,titulo)}
                            placeholder={(placeholder=="" || placeholder==undefined)?(loading?'cargando..':titulo):placeholder}
                            // placeholder="hola"
                            noOptionsMessage={() => "No existe"}
                            isDisabled={loading}
                        />
                        
                }
                
                
            </div>
        </div>
    )
}

export default SelectorAdmin
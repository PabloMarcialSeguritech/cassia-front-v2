import './styles/HostSelector.css'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import data_ubi from './ubicaciones'
import { useFetch } from '../hooks/useFetch'
const HostSelector=({setListSelected,setHostId,opGeneral,txtOpGen,opt_de,titulo,data,loading,origen})=>{
    console.log(titulo)
    // console.log(opt_de)
    console.log(data)
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
    const opt_default=(opGeneral)?[{ dispId: 0, name: txtOpGen ,id:0}]:[]
    const data_aux=opt_default.concat(data)
//    //console.log(props.ubicacion)
    let cont_i=0;
    let opcion_default=0
    // const options={filter:titulo, value: 0, label: 'cargando...' ,id:0}
    const options=data.map(datas=>{
        if(opt_de==0){
            // console.log("es 0")
            opcion_default=0
        }else{
            // console.log("no es 0")
            if(datas.hostid==opt_de){
                // console.log(" el valor es" ,cont_i)
                opcion_default=cont_i
            }
        }
        
        cont_i++
        let op;
        
        op={ filter:titulo,value: datas.hostid, label: datas.Host ,id:datas.hostid};
            
        return op                           // <option key={datas.uuid}> {datas.name} </option>
})
// console.log(options[opcion_default].label)
//console.log(options)
//console.log(opt_de)
    
    
    
    const [value,setValue]=useState([])
    
    // //console.log(value,'value') 
    const HandleChange=(selected,name)=>{
        //console.log(selected)
        // setValue((state)=>({
        //     ...state,[name]:selected.label
        // }))
        setValue(selected)
        setHostId(selected.value)
        setListSelected(1)
        
        
    }
   
    return(
        <div className='hostSearchOption'>
            <div className='compactHostSelector'>
                {/* <label htmlFor='selector' className='labelHostSelector'>{titulo}:</label> */}
                
                    
                       
                            <Select
                            options={options}
                            value={(value.length===0)?options[opcion_default]:value}
                            // options={{filter:titulo, value: 0, label: 'cargando...' }}
                            className="react-host-select-container"
                            classNamePrefix="react-host-select"
                            onChange={(selected)=>HandleChange(selected,titulo)}
                            // placeholder={loading?'cargando..':options[0].label}
                            noOptionsMessage={() => "No existe"}
                            isDisabled={loading}
                            isSearchable={false} 
                            menuPortalTarget={document.body} 
                        />
                        
                        
                        
                
                
                
            </div>
        </div>
    )
}

export default HostSelector
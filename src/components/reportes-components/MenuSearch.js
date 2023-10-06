
import { useState,useEffect } from 'react'
import './styles/disponibilidad.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import { useFetchPost } from '../../hooks/useFetchPost'
import SelectorAdmin from '../SelectorAdmin'
import LoadAdding from '../LoadAdding'
import LoadSimple from '../LoadSimple'
import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import { LineChart, Line,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MenuSearch=({server,setOpciones,opciones,action1,action2,completo})=>{
   
    const dataLocations=useFetch('zabbix/groups/municipios','','token','GET',server)
    const [dataTec,setDataTec]=useState({data:[],loading:true,error:null})
    const [dataMarca,setDataMarca]=useState({data:[],loading:true,error:null})
    const [dataModelo,setDataModelo]=useState({data:[],loading:true,error:null})
    const token_item=localStorage.getItem('access_token')
    const changeOption=(option)=>{
        
        switch(option.filter){
            case 'Municipio': setOpciones({municipio:option.value,tecnologia:opciones.tecnologia,marca:opciones.marca,modelo:opciones.modelo,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
                                break;
            case 'Tecnología': setOpciones({municipio:opciones.municipio,tecnologia:option.value,marca:opciones.marca,modelo:opciones.modelo,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
                                break; 
            case 'Marca': setOpciones({municipio:opciones.municipio,tecnologia:opciones.tecnologia,marca:option.value,modelo:opciones.modelo,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
                                break;  
            case 'Marca': setOpciones({municipio:opciones.municipio,tecnologia:opciones.tecnologia,marca:opciones.marca,modelo:option.value,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
                                break;                    
            default:
                    break;                        
        }
}
useEffect(()=>{
    console.log("cambio la ubicacion")
    setOpciones({municipio:opciones.municipio,tecnologia:11,marca:opciones.marca,modelo:opciones.modelo,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
    search_tecnologias()
},[opciones.municipio])
function search_tecnologias(){
    
    setDataTec({data:dataTec.data,loading:true,error:dataTec.error})
      const fetchData = async () => {
        try {
       const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/groups/devices/'+opciones.municipio, {                 
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token_item}`,
                              },
                            });
                            // console.log(response)
          if (response.ok) {
            const response_data = await response.json();
            setDataTec({data:response_data.data,loading:false,error:dataTec.error})
           
            // //console.log(response_data)
            
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          // Manejo de errores
          setDataTec({data:dataTec.data,loading:dataTec.loading,error:error})
          //console.error(error);
        }
      };
      fetchData();
  }

  useEffect(()=>{
    console.log("cambio la ubicacion")
    setOpciones({municipio:opciones.municipio,tecnologia:opciones.tecnologia,marca:0,modelo:opciones.modelo,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
    search_marca()
    
},[opciones.tecnologia])
function search_marca(){
    
  setDataMarca({data:dataTec.data,loading:true,error:dataTec.error})
      const fetchData = async () => {
        try {
       const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/groups/brands/'+opciones.tecnologia, {                 
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token_item}`,
                              },
                            });
                            // console.log(response)
          if (response.ok) {
            const response_data = await response.json();
            setDataMarca({data:response_data.data,loading:false,error:dataTec.error})
           
            // //console.log(response_data)
            
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          // Manejo de errores
          setDataMarca({data:dataTec.data,loading:dataTec.loading,error:error})
          //console.error(error);
        }
      };
      fetchData();
  }
  useEffect(()=>{
    console.log("cambio la ubicacion")
    setOpciones({municipio:opciones.municipio,tecnologia:opciones.tecnologia,marca:opciones.marca,modelo:0,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
    search_modelo()
},[opciones.marca])
function search_modelo(){
    
  setDataModelo({data:dataTec.data,loading:true,error:dataTec.error})
      const fetchData = async () => {
        try {
          console.log()
       const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/groups/models/'+opciones.marca, {                 
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token_item}`,
                              },
                            });
                            // console.log(response)
          if (response.ok) {
            const response_data = await response.json();
            setDataModelo({data:response_data.data,loading:false,error:dataTec.error})
           
            // //console.log(response_data)
            
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          // Manejo de errores
          setDataModelo({data:dataTec.data,loading:dataTec.loading,error:error})
          //console.error(error);
        }
      };
      fetchData();
  }









  const handleChange=(e)=>{
    console.log(e.target)
    const {name,value}=e.target
    
        setOpciones((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
        })
  }

    return(
        <>
        <div className='compact-menu-disp'>
                  <div className={(completo)?'compact-option':'compact-option-large'}>
                      <div className="user-box-disp">
                                      <SelectorAdmin opGeneral={true} txtOpGen={'TODOS'}  opt_de={'0'}origen={'Admin'} data={dataLocations.data.data} loading={dataLocations.loading}  titulo='Municipio' selectFunction={changeOption}></SelectorAdmin>
                      </div>
                  </div>
                  <div className={(completo)?'compact-option':'compact-option-large'}>
                  <div className="user-box-disp">
                      {(!dataTec.loading)?
                            <SelectorAdmin  opGeneral={false} txtOpGen={''} opt_de={'11'} origen={'Admin'}  data={dataTec.data} loading={dataTec.loading}  selectFunction={changeOption} titulo='Tecnología' ></SelectorAdmin>
                          :<p className='loadSelect'  style={{color:'#003757'}}>cargando...</p>
                      }
                      </div>
                  </div>
                  <div className={(completo)?'compact-option':'compact-option-large'}>
                      <div className="user-box-disp">
                      {(!dataMarca.loading)?
                    <SelectorAdmin opGeneral={false} txtOpGen={''} origen={'Admin'} data={dataMarca.data} loading={dataMarca.loading}  titulo='Marca' selectFunction={changeOption}></SelectorAdmin>
                    :<p className='loadSelect'  style={{color:'#003757'}}>cargando...</p>
                      }
                                      
                      </div>
                  </div>
                  <div className={(completo)?'compact-option':'compact-option-large'}>
                      <div className="user-box-disp">
                      {(!dataModelo.loading)?
                          <SelectorAdmin opGeneral={false} txtOpGen={''} origen={'Admin'} data={dataModelo.data} loading={dataModelo.loading}  titulo='Modelo' selectFunction={changeOption}></SelectorAdmin>
                          :<p className='loadSelect' style={{color:'#003757'}}>cargando...</p>
                      }
                      </div>
                  </div>
                  {(completo)?
                  <>
                  <div className='compact-option'>
                      <div className="user-box-disp">
                          <input required name="fecha_ini"  type="datetime-local" value={opciones.fecha_ini}
                          onChange={handleChange} />
                                          <label className='label-disp active' >Desde:</label>
                      </div>
                  </div>
                  <div className='compact-option'>
                    <div className="user-box-disp">
                          <input required name="fecha_fin"  type="datetime-local" value={opciones.fecha_fin}
                          onChange={handleChange} />
                                          <label className='label-disp active' >Hasta:</label>
                      </div>
                  </div>
                  <div className='compact-option' style={{justifyContent:'unset'}}>
                  <Action disabled={false} origen='Blanco' titulo='Multi Grafica'  action={action2}/>
                  <Action disabled={false} origen='Login' titulo='Buscar'  action={action1}/>
                  </div>
                  </>:''
                  }
                </div>
        </>
    )
}

export default MenuSearch
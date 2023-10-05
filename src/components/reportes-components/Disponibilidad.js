
import { useState,useEffect } from 'react'
import './styles/disponibilidad.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import { useFetchPost } from '../../hooks/useFetchPost'
import SelectorAdmin from '../SelectorAdmin'
import LoadAdding from '../LoadAdding'
import LoadSimple from '../LoadSimple'
import React, { PureComponent } from 'react';

import { LineChart, Line,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// import UserList from './UserList'

const Disponibilidad=({server})=>{
  const obtenerPrimerDiaDelMes = () => {
    const hoy = new Date();
    const primerDiaDelMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    
    const anio = primerDiaDelMes.getFullYear();
    const mes = String(primerDiaDelMes.getMonth() + 1).padStart(2, '0');
    const dia = String(primerDiaDelMes.getDate()).padStart(2, '0');
    const horas = String(primerDiaDelMes.getHours()).padStart(2, '0');
    const minutos = String(primerDiaDelMes.getMinutes()).padStart(2, '0');
  
    return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
  };
  const obtenerFechaActualLocal = () => {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // El mes se cuenta desde 0
    const dia = String(ahora.getDate()).padStart(2, '0');
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
  
    return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
  };
  console.log(obtenerFechaActualLocal(),obtenerPrimerDiaDelMes ())
    const dataLocations=useFetch('zabbix/groups/municipios','','token','GET',server)
    const [dataTec,setDataTec]=useState({data:[],loading:true,error:null})
    const [dataMarca,setDataMarca]=useState({data:[],loading:true,error:null})
    const [dataModelo,setDataModelo]=useState({data:[],loading:true,error:null})
    const [dataInfo,setDataInfo]=useState({data:[],loading:true,error:null})
    const [opciones,setOpciones]=useState({municipio:0,tecnologia:11,marca:0,modelo:0,fecha_ini:''+obtenerPrimerDiaDelMes(),fecha_fin:''+obtenerFechaActualLocal()})
    const token_item=localStorage.getItem('access_token')
    console.log(opciones)
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
  search_reporte_disponibilidad()
},[])
const Buscar=()=>{
  search_reporte_disponibilidad()
}
function search_reporte_disponibilidad(){
        console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability?municipality_id='+opciones.municipio+'&tech_id='+opciones.tecnologia+'&brand_id='+opciones.marca+'&model_id='+opciones.modelo+'&init_date='+opciones.fecha_ini+'&end_date='+opciones.fecha_fin)
  setDataInfo({data:dataTec.data,loading:true,error:dataTec.error})
    const fetchData = async () => {
      try {
     const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability?municipality_id='+opciones.municipio+'&tech_id='+opciones.tecnologia+'&brand_id='+opciones.marca+'&model_id='+opciones.modelo+'&init_date='+opciones.fecha_ini+'&end_date='+opciones.fecha_fin, {                 
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token_item}`,
                            },
                          });
                          console.log(response)
        if (response.ok) {
          const response_data = await response.json();
          setDataInfo({data:response_data.data,loading:false,error:dataTec.error})
        console.log(dataInfo)
        } else {
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
        // Manejo de errores
        setDataInfo({data:dataTec.data,loading:dataTec.loading,error:error})
        //console.error(error);
      }
    };
    fetchData();
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

      const handleChangeOption=()=>{}
      const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

    return (
        <div className="main-reporte-disp">
            <div className='cont-reporte-disp'>
            <div className='cont-menu-disp'>
                <div className='compact-option'>
                    <div className="user-box-disp">
                                    <SelectorAdmin opGeneral={true} txtOpGen={'TODOS'}  opt_de={'0'}origen={'Admin'} data={dataLocations.data.data} loading={dataLocations.loading}  titulo='Municipio' selectFunction={changeOption}></SelectorAdmin>
                    </div>
                </div>
                <div className='compact-option'>
                <div className="user-box-disp">
                    {(!dataTec.loading)?
                          <SelectorAdmin  opGeneral={false} txtOpGen={''} opt_de={'11'} origen={'Admin'}  data={dataTec.data} loading={dataTec.loading}  selectFunction={changeOption} titulo='Tecnología' ></SelectorAdmin>
                        :<p className='loadSelect'  style={{color:'#003757'}}>cargando...</p>
                    }
                    </div>
                </div>
                <div className='compact-option'>
                    <div className="user-box-disp">
                    {(!dataMarca.loading)?
                   <SelectorAdmin opGeneral={false} txtOpGen={''} origen={'Admin'} data={dataMarca.data} loading={dataMarca.loading}  titulo='Marca' selectFunction={changeOption}></SelectorAdmin>
                   :<p className='loadSelect'  style={{color:'#003757'}}>cargando...</p>
                    }
                                    
                    </div>
                </div>
                <div className='compact-option'>
                    <div className="user-box-disp">
                    {(!dataModelo.loading)?
                        <SelectorAdmin opGeneral={false} txtOpGen={''} origen={'Admin'} data={dataModelo.data} loading={dataModelo.loading}  titulo='Modelo' selectFunction={changeOption}></SelectorAdmin>
                        :<p className='loadSelect' style={{color:'#003757'}}>cargando...</p>
                    }
                    </div>
                </div>
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
                <div className='compact-option'>
                <Action disabled={false} origen='Login' titulo='Buscar'  action={Buscar}/>
                </div>
            </div>
            <div className='cont-graf-disp'>
                <div className='cont-info-graf'>
                    {/* <div className='cont-info-top'>

                    </div> */}
                    <div className='cont-info-center'>
{
  (dataInfo.loading)?<div style={{width:'100%',height:'95%',display:'flex',justifyContent:'center'}}><LoadSimple></LoadSimple></div>:
  <ResponsiveContainer width="100%" height="95%">
        <LineChart
          width={500}
          height={300}
          data={dataInfo.data.metrics[0].dataset}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Tiempo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Disponibilidad" stroke="#8884d8" strokeWidth={2}  />
          {/* <Area type="monotone" dataKey="Disponibilidad" fill="#8884d8" fillOpacity={0.3} /> */}
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>}
                    </div>
                    <div className='cont-info-bottom'>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Funcionalidad Promedio:    </div>
                            <div className='txt-info-dinamic' style={{color:'red'}}> &nbsp; {typeof dataInfo.data.general_funcionality_average === 'undefined'?'---':(dataInfo.data.general_funcionality_average.toFixed(2))}%</div>
                        </div>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Lapso de tiempo:    </div>
                            <div className='txt-info-dinamic' style={{color:'red'}}>&nbsp; {typeof dataInfo.data.days === 'undefined'?'---': (''+dataInfo.data.days.toFixed(2)+' dias')}</div>
                        </div>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Dispositivos:    </div>
                            <div className='txt-info-dinamic' style={{color:'red'}}>&nbsp; {dataInfo.data.device_count}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cont-table-disp'>
            <div className='bodyInfoTable'>
                  <div className='contTableDisp'>
                    {/* <div className='contCheckDisp'>
                    <div className='space' style={{height:'20%'}}> </div>
                    <div style={{height:'24%'}}>
                        <input name="radio" type="radio" className="checkTableDisp" defaultChecked onClick={()=>handleChangeOption(2)} />
                    </div>
                    <div style={{height:'24%'}}>
                        <input name="radio" type="radio" className="checkTableDisp" defaultChecked onClick={()=>handleChangeOption(2)} />
                    </div>
                    <div style={{height:'24%'}}>
                        
                    </div>
                     </div> */}
                    <div className='contInfoDisp'>
                      <div className='infoDisp'>
                        <div className='titlesInfoDisp'>
                        <div className='headerCellDisp' style={{width:'5%'}}>
                            <div className='txtHeaderCellDisp'>
                                {/* IP */}
                                
                            </div>
                          </div>
                          <div className='headerCellDisp' style={{width:'25%'}}>
                            <div className='txtHeaderCellDisp' >
                                Métrica
                            </div>
                          </div>
                          <div className='headerCellDisp' style={{width:'25%'}}>
                            <div className='txtHeaderCellDisp'>
                                Disponibilidad promedio
                            </div>
                          </div>
                          <div className='headerCellDisp' style={{width:'20%'}}>
                            <div className='txtHeaderCellDisp'>
                                {/* IP */}
                                Días
                            </div>
                          </div>
                          <div className='headerCellDisp' style={{width:'25%'}}>
                            <div className='txtHeaderCellDisp'>
                                Dispositivos
                            </div>
                          </div>
                          
                        </div>
                        <div className='rowInfoDisp'>
                            <div className='DispInfoCell' style={{width:'5%'}}>
                              <input name="radio" type="radio" className="checkTableDisp" defaultChecked onClick={()=>handleChangeOption(2)} />
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                
                                <div className='txtDispInfoCell' >
                                Conectividad
                                
                                </div> 
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                {typeof dataInfo.data.general_funcionality_average === 'undefined'?'---':(dataInfo.data.general_funcionality_average.toFixed(2))}%
                                </div>
                            </div>
                            <div className='DispInfoCell' style={{width:'20%'}}>
                                <div className='txtDispInfoCell'>
                                {typeof dataInfo.data.days === 'undefined'?'---': (''+dataInfo.data.days.toFixed(2)+' dias')}
                                </div>
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                {dataInfo.data.device_count}
                                </div>
                            </div>
                  
                        </div>
                        {(opciones.tecnologia===110)?
                          <div className='rowInfoDisp'>
                        <div className='DispInfoCell' style={{width:'5%'}}>
                              <input name="radio" type="radio" className="checkTableDisp"  onClick={()=>handleChangeOption(2)} />
                            </div>
                          <div className='DispInfoCell' style={{width:'25%'}}>
                              
                              <div className='txtDispInfoCell' >
                              Alineacion
                              
                              </div> 
                          </div>
                          <div className='DispInfoCell' style={{width:'25%'}}>
                              <div className='txtDispInfoCell'>
                              98%
                              </div>
                          </div>
                          <div className='DispInfoCell' style={{width:'25%'}}>
                              <div className='txtDispInfoCell'>
                              {typeof dataInfo.data.days === 'undefined'?'---': (''+dataInfo.data.days.toFixed(2)+' dias')}
                              </div>
                          </div>
                          <div className='DispInfoCell' style={{width:'25%'}}>
                              <div className='txtDispInfoCell'>
                              {dataInfo.data.device_count}
                              </div>
                          </div>
                
                      </div>
                      :''
                        }
                        
                        {/* <div className='rowInfoDisp'>
                        
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                
                                <div className='txtDispInfoCell' >
                                Velocidad
                                
                                </div> 
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                98%
                                </div>
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                6
                                </div>
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                356
                                </div>
                            </div>
                  
                        </div> */}
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
            </div>
        </div>
    )
}

export default Disponibilidad
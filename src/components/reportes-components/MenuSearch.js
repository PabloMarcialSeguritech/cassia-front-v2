
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



const MenuSearch=({dataTec,dataLocations,setElementos,eliminarElemento,setDataTec,dataMarca,setDataMarca,dataModelo,setDataModelo,index,server,prevOpcionesArray,setPrevOpcionesArray,opcionesArray,opcionesTxtArray,setOpciones,setOpcionesArray,setOpcionesTxtArray,opciones,action1,action2,completo})=>{
  
    // const dataLocations=useFetch('zabbix/groups/municipios','','token','GET',server)


    // const [dataTec,setDataTec]=useState({data:[[]],loading:[true],error:null})
    // const [dataMarca,setDataMarca]=useState({data:[[]],loading:[true],error:null})
    // const [dataModelo,setDataModelo]=useState({data:[[]],loading:[true],error:null})
    const token_item=localStorage.getItem('access_token')
    const [indiceActived,setindiceActived]=useState(0);
    
    const [indexSelected,setIndexSelected]=useState(0)


// useEffect(()=>{
  // console.log(opcionesArray)

// },[dataTec])


    // console.log('indice activo ',indiceActived,index)
    const changeOption=(option,index)=>{
      console.log("changeOption")
        switch(option.filter){
          
            case 'Municipio':
              setOpcionesArray((prevState)=>{
                        const nuevoArreglo = [...prevState.municipio];
                      nuevoArreglo[index] = option.value;
                        return {
                            ...prevState,
                            ['municipio']:nuevoArreglo
                        }
                    })
                    setOpcionesTxtArray((prevState)=>{
                      const nuevoArreglo = [...prevState.municipio];
                    nuevoArreglo[index] = option.label;
                      return {
                          ...prevState,
                          ['municipio']:nuevoArreglo
                      }
                  })
                                break;
            case 'Tecnología': setOpcionesArray((prevState)=>{
                                const nuevoArreglo = [...prevState.tecnologia];
                              nuevoArreglo[index] = option.value;
                                return {
                                    ...prevState,
                                    ['tecnologia']:nuevoArreglo
                                }
                            })
                            setOpcionesTxtArray((prevState)=>{
                              const nuevoArreglo = [...prevState.tecnologia];
                            nuevoArreglo[index] = option.label;
                              return {
                                  ...prevState,
                                  ['tecnologia']:nuevoArreglo
                              }
                          })
                                break; 
            case 'Marca': setOpcionesArray((prevState)=>{
                            const nuevoArreglo = [...prevState.marca];
                          nuevoArreglo[index] = option.value;
                            return {
                                ...prevState,
                                ['marca']:nuevoArreglo
                            }
                        })
                        setOpcionesTxtArray((prevState)=>{
                          const nuevoArreglo = [...prevState.marca];
                        nuevoArreglo[index] = option.label;
                          return {
                              ...prevState,
                              ['marca']:nuevoArreglo
                          }
                      })
                                break;  
            case 'Modelo': setOpcionesArray((prevState)=>{
              const nuevoArreglo = [...prevState.modelo];
            nuevoArreglo[index] = option.value;
              return {
                  ...prevState,
                  ['modelo']:nuevoArreglo
              }
          })
          setOpcionesTxtArray((prevState)=>{
            const nuevoArreglo = [...prevState.modelo];
          nuevoArreglo[index] = option.label;
            return {
                ...prevState,
                ['modelo']:nuevoArreglo
            }
        })
           break;                    
            default:
                    break;                        
        }
}
useEffect(()=>{
    console.log("cambio la ubicacion")
    setOpciones({municipio:opciones.municipio,tecnologia:11,marca:opciones.marca,modelo:opciones.modelo,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
    
},[opciones.municipio])
useEffect(() => {
  console.log(`Se actualizó el elemento municipio`,index, opcionesArray.municipio[index]);
  console.log(index,opcionesArray.municipio[0],opcionesArray.municipio.length)
  if(index==0 && opcionesArray.municipio[0]==0 && opcionesArray.municipio.length>1){
    
    setElementos(['Serie 1'])
    setOpcionesArray({municipio:[0],tecnologia:[11],marca:[0],modelo:[0]})
    setOpcionesTxtArray({municipio:['TODOS'],tecnologia:['SUSCRIPTORES'],marca:['TODAS'],modelo:['TODOS']})
    // setOpcionesTxtArrayFijo({municipio:['TODOS'],tecnologia:['SUSCRIPTORES'],marca:['TODAS'],modelo:['TODOS']})
    setPrevOpcionesArray({municipio:[-1],tecnologia:[-1],marca:[-1],modelo:[-1]})
    
    
  }
  // Función que será ejecutada cada vez que el municipio se actualice
  const handleMunicipioUpdate = (prevMunicipio, nuevoMunicipio) => {
    // console.log(prevMunicipio, nuevoMunicipio)
    const indiceActualizado = nuevoMunicipio.findIndex((valor, indice) => valor !== prevMunicipio[indice]);
    
    if (indiceActualizado !== -1) {
      setindiceActived(indiceActualizado)
      // console.log(`Se actualizó el elemento en el índice ${indiceActualizado}`);
      
      search_tecnologias(indiceActualizado)
      setPrevOpcionesArray(opcionesArray)
    }
  }

  handleMunicipioUpdate(prevOpcionesArray.municipio, opcionesArray.municipio);

  // Limpieza del efecto (puede o no ser necesario dependiendo de tu lógica)
  return () => {
    // Haz algo si es necesario cuando el componente se desmonta o cuando el municipio cambia
  };
}, [opcionesArray.municipio]);
function search_tecnologias(indiceActualizado){
  
  if(index==indiceActualizado){
    setDataTec(prevState => {
      const auxArray = [...prevState.loading];
      auxArray[index] = true;
  
      return {
        ...prevState,
        loading: auxArray
      };
    });
      const fetchData = async () => {
        try {
          console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/groups/devices/'+opcionesArray.municipio[index])
       const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/groups/devices/'+opcionesArray.municipio[index], {                 
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token_item}`,
                              },
                            });
                           
          if (response.ok) {
            const response_data = await response.json();
            // setDataTec({data:response_data.data,loading:false,error:dataTec.error})
           console.log("response tecnologias ",index)
           console.log(response_data.data)
           let op=response_data.data.find(obj => obj.dispId === 11)
  console.log(op)
  let dispId=11;
  let txtDisp='SUSCRIPTORES'
  if(typeof(op)=="undefined" ){
    console.log('no tiene suscriptores')
    // console.log(dataTec.data[0])
    dispId=response_data.data[0].dispId
    txtDisp=response_data.data[0].name
  }else{
    dispId=11
    txtDisp='SUSCRIPTORES'
  }
  let txtTec=opcionesTxtArray.tecnologia
    txtTec[index]=txtDisp
    let txtMarca=opcionesTxtArray.marca
    txtMarca[index]='TODAS'
    let txtModelo=opcionesTxtArray.modelo
    txtModelo[index]='TODOS'
    setOpcionesTxtArray({municipio:opcionesTxtArray.municipio,tecnologia:txtTec,marca:txtMarca,modelo:txtModelo})
  
    let tec=opcionesArray.tecnologia
    tec[index]=dispId
    let marca=opcionesArray.marca
    marca[index]=0
    let modelo=opcionesArray.modelo
    modelo[index]=0
    setOpcionesArray({municipio:opcionesArray.municipio,tecnologia:tec,marca:marca,modelo:modelo})
  
            setDataTec(prevState => {
              // console.log([...prevState.loading])
              const auxArray = [...prevState.data];
              // console.log(auxArray)
              const prevLoading = [...prevState.loading];
              auxArray[index] = response_data.data;
              prevLoading[index]=false
              // console.log(auxArray)
              return {
                ...prevState,
                data: auxArray,
                loading: prevLoading
              };
            });
            
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          // Manejo de errores
          // setDataTec({data:dataTec.data,loading:dataTec.loading,error:error})
          //console.error(error);
        }
      };
      fetchData();
    }
  }

  useEffect(()=>{
    
    setOpciones({municipio:opciones.municipio,tecnologia:opciones.tecnologia,marca:0,modelo:opciones.modelo,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
    // search_marca()
    
},[opciones.tecnologia])
useEffect(() => {


  // console.log(`Se actualizó el elemento tecnologia`,index, opcionesArray.tecnologia);



  // Función que será ejecutada cada vez que el municipio se actualice
  const handleMunicipioUpdate = (prevMunicipio, nuevoMunicipio) => {
    // console.log(prevMunicipio, nuevoMunicipio)
    const indiceActualizado = nuevoMunicipio.findIndex((valor, indice) => valor !== prevMunicipio[indice]);
    console.log(indiceActualizado)
    if (indiceActualizado !== -1) {
      setindiceActived(indiceActualizado)
      // console.log(`Se actualizó el elemento en el índice ${indiceActualizado}`);
      search_marca(indiceActualizado)
      setPrevOpcionesArray(opcionesArray)
    }else{
      search_marca(index)
    }
  }

  handleMunicipioUpdate(prevOpcionesArray.tecnologia, opcionesArray.tecnologia);

  // Limpieza del efecto (puede o no ser necesario dependiendo de tu lógica)
  return () => {
    // Haz algo si es necesario cuando el componente se desmonta o cuando el municipio cambia
  };
}, [opcionesArray.tecnologia[index],opcionesArray.municipio[index]]);
function search_marca(indiceActualizado){
  if(index==indiceActualizado){
  // setDataMarca({data:dataTec.data,loading:true,error:dataTec.error})
  setDataMarca(prevState => {
    const auxArray = [...prevState.loading];
    auxArray[index] = true;
    return {
      ...prevState,
      loading: auxArray
    };
  });
      const fetchData = async () => {
        try {
          // console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/groups/brands/'+opcionesArray.tecnologia[indiceActived])
       const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/groups/brands/'+opcionesArray.tecnologia[index], {                 
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token_item}`,
                              },
                            });
                            // console.log(response)
          if (response.ok) {
            const response_data = await response.json();
            // setDataMarca({data:response_data.data,loading:false,error:dataTec.error})
           console.log("set datamarca",index)
            setDataMarca(prevState => {
              // console.log([...prevState.loading])
              const auxArray = [...prevState.data];
              // console.log(auxArray)
              const prevLoading = [...prevState.loading];
              auxArray[index] = response_data.data;
              prevLoading[index]=false
              // console.log(auxArray)
              return {
                ...prevState,
                data: auxArray,
                loading: prevLoading
              };
            });
            
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          // Manejo de errores
          // setDataMarca({data:dataTec.data,loading:dataTec.loading,error:error})
          //console.error(error);
        }
      };
      fetchData();
    }
  }
  useEffect(()=>{
    // console.log("cambio la ubicacion")
    setOpciones({municipio:opciones.municipio,tecnologia:opciones.tecnologia,marca:opciones.marca,modelo:0,fecha_ini:opciones.fecha_ini,fecha_fin:opciones.fecha_fin})
    // search_modelo()
},[opciones.marca])
useEffect(() => {
  
  console.log(`Se actualizó el elemento marca`);
  // Función que será ejecutada cada vez que el municipio se actualice
  const handleMunicipioUpdate = (prevMunicipio, nuevoMunicipio) => {
    // console.log(prevMunicipio, nuevoMunicipio)
    const indiceActualizado = nuevoMunicipio.findIndex((valor, indice) => valor !== prevMunicipio[indice]);
    
    if (indiceActualizado !== -1) {
      setindiceActived(indiceActualizado)
      // console.log(`Se actualizó el elemento en el índice ${indiceActualizado}`);
      search_modelo(indiceActualizado)
      setPrevOpcionesArray(opcionesArray)
    }else{
      search_modelo(index)
    }
  }

  handleMunicipioUpdate(prevOpcionesArray.marca, opcionesArray.marca);

  // Limpieza del efecto (puede o no ser necesario dependiendo de tu lógica)
  return () => {
    // Haz algo si es necesario cuando el componente se desmonta o cuando el municipio cambia
  };
}, [opcionesArray.marca[index],opcionesArray.tecnologia[index],opcionesArray.municipio[index]]);
function search_modelo(indiceActualizado){
  if(index==indiceActualizado){
  // setDataModelo({data:dataTec.data,loading:true,error:dataTec.error})
  setDataModelo(prevState => {
    const auxArray = [...prevState.loading];
    auxArray[index] = true;

    return {
      ...prevState,
      loading: auxArray
    };
  });
      const fetchData = async () => {
        try {
          
       const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/groups/models/'+opcionesArray.marca[index], {                 
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token_item}`,
                              },
                            });
                            // console.log(response)
          if (response.ok) {
            const response_data = await response.json();
            // setDataModelo({data:response_data.data,loading:false,error:dataTec.error})
           
            setDataModelo(prevState => {
              // console.log([...prevState.loading])
              const auxArray = [...prevState.data];
              // console.log(auxArray)
              const prevLoading = [...prevState.loading];
              auxArray[index] = response_data.data;
              prevLoading[index]=false
              // console.log(auxArray)
              return {
                ...prevState,
                data: auxArray,
                loading: prevLoading
              };
            });
            
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
  // console.log("Marca")
  // console.log(dataMarca,index,dataMarca.loading[index])
  // console.log("tec")
  // console.log(dataTec,index,dataTec.loading[index])
    return(
        <>
        <div className='compact-menu-disp'>
                  <div className={(completo)?'compact-option':'compact-option-large'}>
                      <div className="user-box-disp">
                                      <SelectorAdmin opGeneral={(index==0)?true:false} txtOpGen={'TODOS'}  opt_de={'0'}origen={'Admin'} data={dataLocations.data.data} loading={dataLocations.loading}  titulo='Municipio' selectFunction={changeOption} index={index}></SelectorAdmin>
                      </div>
                  </div>
                  <div className={(completo)?'compact-option':'compact-option-large'}>
                  <div className="user-box-disp">
                      {
                       
                      // (!dataTec.loading && indiceActived===index)?
                      (!dataTec.loading[index] && typeof(dataTec.data[index])!='undefined' )?
                            <SelectorAdmin opGeneral={false} txtOpGen={''} opt_de={'11'} origen={'Admin'}  data={dataTec.data[index]} loading={dataTec.loading[index]}  selectFunction={changeOption} titulo='Tecnología' index={index}></SelectorAdmin>
                          :<p className='loadSelect'  style={{color:'#003757'}}>cargando...</p>
                      }
                      </div>
                  </div>
                  <div className={(completo)?'compact-option':'compact-option-large'}>
                      <div className="user-box-disp">
                      
                      {(!dataMarca.loading[index] && typeof(dataMarca.data[index])!='undefined' )?
                  <SelectorAdmin opGeneral={false} txtOpGen={''} origen={'Admin'} data={dataMarca.data[index]} loading={dataMarca.loading[index]}  titulo='Marca' selectFunction={changeOption} index={index}></SelectorAdmin>
                          :<p className='loadSelect'  style={{color:'#003757'}}>cargando...</p>
                      }
                                      
                      </div>
                  </div>
                  <div className={(completo)?'compact-option':'compact-option-large'}>
                      <div className="user-box-disp">
                      {(!dataModelo.loading[index] && typeof(dataModelo.data[index])!='undefined')?
                       <SelectorAdmin  opGeneral={false} txtOpGen={''} origen={'Admin'} data={dataModelo.data[index]} loading={dataModelo.loading[index]}  titulo='Modelo' selectFunction={changeOption} index={index}></SelectorAdmin>
                          :<p className='loadSelect' style={{color:'#003757'}}>cargando...</p>
                      }
                      </div>
                  </div>
                  {/* {(completo)?
                  <>
                  <div>

                  
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
                  </div>
                  <div className='compact-option' style={{justifyContent:'unset'}}>
                  <Action disabled={false} origen='Blanco' titulo='Multi Grafica'  action={action2}/>
                  <Action disabled={false} origen='Login' titulo='Buscar'  action={action1}/>
                  </div>
                  </>:''
                  } */}
                </div>
        </>
    )
}

export default MenuSearch
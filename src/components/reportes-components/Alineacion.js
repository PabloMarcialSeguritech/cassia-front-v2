
import { useState,useEffect,useRef } from 'react'
import './styles/alineacion.css'
import Action from '../Action'
import SearchHost from '../SearchHost'
import { useFetch } from '../../hooks/useFetch'
import { useFetchPost } from '../../hooks/useFetchPost'
import SelectorAdmin from '../SelectorAdmin'
import LoadAdding from '../LoadAdding'
import LoadSimple from '../LoadSimple'
import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import { LineChart, Line,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MenuSearch from './MenuSearch'
import ModalAddMultiGraph from './ModalAddMultiGraph'
import Search from '../generales/Search'
// import UserList from './UserList'
const AddMultiGraphModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#ffffff !important',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'90%',
    height:'70%',
    padding:'20px',
   
  },
};
const CustomTooltip = ({ active, payload, label }) => {
  
  
  try{
    const objetoOrdenado = payload.sort((a, b) => a.value - b.value)
    
    if (active && payload) {
      return (
        <div className="custom-tooltip-alineacion">
          <div className="cont-tooltip-alineacion">
          <div className='row-tooltip'><p className='title-tooltip' style={{color:'#505050',fontSize:'small'}}>Fecha:&nbsp;</p><p style={{color:'#505050',fontSize:'small'}}>{label}</p></div>
          {objetoOrdenado.slice(0, 15).map((element, index) => (
            <div className='row-tooltip'><p style={{color:element.stroke,fontSize:'x-small'}} >{`  ${element.name}: `}&nbsp;</p><p style={{color:'#505050',fontSize:'x-small',fontWeight:'bold'}}>{element.value.toFixed(2)}</p></div>
          
            
          ))}
          {
            (objetoOrdenado.length>15)?<div className='row-tooltip' style={{fontSize:'x-small',color:'#505050'}}>Mostrando 15 de {objetoOrdenado.length} elementos . . .</div>:''
          }
          </div>
          
        </div>
      );
    }
  
    return null;
  }catch(error){
    console.log("sin datos")
  }
  
};
const Alineacion=({server})=>{
  const color_graf={
    1:"#c680ff",2:"#80cfff",3:"#56e1ad",4:"#3b83bd",5:"#6285aa",
    6:"#7a8697",7:"#8c8884",8:"#9a8a71",9:"#a68d5d",10:"#b18f47",
    11:"#3b83bd",12:"#346c9b",13:"#2d567a",14:"#25415a",15:"#1d2c3d",
    16:"#131a21",17:"#7f4a83",18:"#86518a",19:"#8e5892",20:"#955f99",
    21:"#9d66a0",22:"#a46da8",23:"#ac74b0",24:"#614064",25:"#49314a",    
    26:"#b4031c",27:"#bc1521",28:"#c52127",29:"#cd2b2d",30:"#d53433",
    31:"#de3d39",32:"#e6453f",33:"#cd2b2d",34:"#dc574c",35:"#e87b6d",
    36:"#f29c90",37:"#fabdb4",38:"#00a87f",39:"#00b48a",40:"#00c096",
    41:"#00cca1",42:"#27d8ac",43:"#3ce5b8",44:"#4df1c4",45:"#80debf",
    46:"#a3e7cf",47:"#393939",48:"#5c5c5c",49:"#828282",50:"#aaaaaa",
  }
  const generateColorOptions = () => {
    const colorOptions = {};
  
    for (let i = 1; i <= 100; i++) {
      const red = Math.floor((255 * i) / 100);
      const green = Math.floor((255 * (100 - i)) / 100);
      const blue = Math.floor((255 * (i % 50)) / 50);
  
      const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
      
      colorOptions[i] = color;
    }
  
    return colorOptions[Math.floor(Math.random() * 100) + 1];
  };
 
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
      const haceNHoras = new Date(ahora.getTime() - (0 * 60 * 60 * 1000));
      const anio = haceNHoras.getFullYear();
    const mes = String(haceNHoras.getMonth() + 1).padStart(2, '0');
    const dia = String(haceNHoras.getDate()).padStart(2, '0');
    const horas = String(haceNHoras.getHours()).padStart(2, '0');
    const minutos = String(haceNHoras.getMinutes()).padStart(2, '0');
  
    return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
  };


 
    const dataLocations=useFetch('zabbix/groups/municipios','','token','GET',server)
    const [dataInfo,setDataInfo]=useState({data:[],loading:true,error:null})
    const [opciones,setOpciones]=useState({municipio:0,tecnologia:11,marca:0,modelo:0,fecha_ini:''+obtenerPrimerDiaDelMes(),fecha_fin:''+obtenerFechaActualLocal()})
    const [opcionesArray,setOpcionesArray]=useState({municipio:[0],tecnologia:[11],marca:[0],modelo:[0]})
    const [opcionesTxtArray,setOpcionesTxtArray]=useState({municipio:['TODOS'],tecnologia:['SUSCRIPTORES'],marca:['TODAS'],modelo:['TODOS']})
    const [opcionesTxtArrayFijo,setOpcionesTxtArrayFijo]=useState({municipio:['TODOS'],tecnologia:['SUSCRIPTORES'],marca:['TODAS'],modelo:['TODOS']})
    const [prevOpcionesArray,setPrevOpcionesArray]=useState({municipio:[-1],tecnologia:[-1],marca:[-1],modelo:[-1]})
    const token_item=localStorage.getItem('access_token')
    const [addMultiGraphModalOpen, setAddMultiGraphModalOpen]=useState(false);
    const [totalLienas,setTotalLineas] =useState(1)
    const [seriesKeys,setSeriesKeys]=useState([])
    const [seriesToRender,setSeriesToRender]=useState([])
    const [dataTec,setDataTec]=useState({data:[[]],loading:[true],error:[null]})
    const [dataMarca,setDataMarca]=useState({data:[[]],loading:[true],error:[null]})
    const [dataModelo,setDataModelo]=useState({data:[[]],loading:[true],error:[null]})
    const [indexSelected,setIndexSelected] =useState(1)
    const [flagTodos,setFlagTodos]=useState(true)
    const [flagGeneral,setFlagGeneral]=useState(false)
   
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);
    const [devices,setDevices]=useState({data:[],loading:true,error:null});
    const [arrayHost,setArrayHost]=useState([])
    const [viewArrayHost,setViewArrayHost]=useState(true)
    const [reportbyHost,setReportByHost]=useState(false)
    const [databyHost,setDataByHost]=useState([])
    const [msgError,setMsgError]=useState("Ingrese un host para buscar datos")
    console.log(reportbyHost)
    // console.log(arrayHost)
    // console.log(dataInfo)
    // console.log(opcionesTxtArray)
    // console.log(opcionesArray.municipio[0])
    // console.log("total.metr ",totalLienas)
    // console.log('flag general',viewArrayHost)
    // console.log('flag todos',flagTodos)
    const Ampliar = () => {
      // Aquí puedes realizar la búsqueda usando el valor de 'query'
      // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
      setAddMultiGraphModalOpen(true)
    }
    function closAddMultiGraphModal() {
      
      setAddMultiGraphModalOpen(false);
      
    }
    useEffect(()=>{
      // setSeriesToRender(seriesKeys.filter(key => data.some(item => item[key])));
      // console.log(seriesKeys.filter(key => data.some(item => item[key]))) // Filtra solo las series que tienen valores
      
    },[seriesKeys])

    const ultimasNHoras = (n) => {
      
      const ahora = new Date();
      const haceNHoras = new Date(ahora.getTime() - (n * 60 * 60 * 1000));
      const anio = haceNHoras.getFullYear();
    const mes = String(haceNHoras.getMonth() + 1).padStart(2, '0');
    const dia = String(haceNHoras.getDate()).padStart(2, '0');
    const horas = String(haceNHoras.getHours()).padStart(2, '0');
    const minutos = String(haceNHoras.getMinutes()).padStart(2, '0');
  
    // return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
      console.log(haceNHoras)
      // setFechaInicio(haceTresHoras.toISOString().slice(0, 16));
      setOpciones((prevState)=>{
        return {
            ...prevState,
            ['fecha_ini']:`${anio}-${mes}-${dia}T${horas}:${minutos}`,
            ['fecha_fin']:formatDate(ahora)
        }
       
    })
    // console.log(opciones)
      // setFechaFin(ahora.toISOString().slice(0, 16));
    };
const formatDate=(date)=>{
  const anio = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
  // console.log(`${anio}-${mes}-${dia}T${horas}:${minutos}`)
  return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
}
    const ultimoPeriodo = (n) => {
      
      const fechaActual = new Date();
      const anioActual = new Date().getFullYear();
  // Calcula la fecha de inicio de la semana actual
  const inicioSemanaActual = new Date(fechaActual);
  inicioSemanaActual.setDate(fechaActual.getDate() - fechaActual.getDay());
  // Calcula la fecha de fin de la semana actual
  const finSemanaActual = new Date(fechaActual);
  finSemanaActual.setDate(fechaActual.getDate() + (6 - fechaActual.getDay()));
  // Resta 7 días para obtener la fecha de inicio de la semana pasada
  const inicioSemanaPasada = new Date(inicioSemanaActual);
  inicioSemanaPasada.setDate(inicioSemanaActual.getDate() - 7);
  // Resta 7 días para obtener la fecha de fin de la semana pasada
  const finSemanaPasada = new Date(finSemanaActual);
  finSemanaPasada.setDate(finSemanaActual.getDate() - 7);


  const primerDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
  // const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
  const ultimoDiaMesPasado = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);

  // Calcula el primer día del mes pasado
  const primerDiaMesPasado = new Date(ultimoDiaMesPasado.getFullYear(), ultimoDiaMesPasado.getMonth(), 1);

  const primerDiaAnioPasado = new Date(fechaActual.getFullYear() - 1, 0, 1);

  // Calcula el último día del año pasado
  const ultimoDiaAnioPasado = new Date(fechaActual.getFullYear() - 1, 11, 31);
  const primerDiaAnoActual = new Date(anioActual, 0, 1);
    // return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
      // console.log(formatDate(inicioSemanaPasada))
      switch(n){
        case 1:
          setOpciones((prevState)=>{
                return {
                    ...prevState,
                    ['fecha_ini']:formatDate(inicioSemanaActual),
                    ['fecha_fin']:formatDate(fechaActual)
                }
            })
          break;
          case 2:
          setOpciones((prevState)=>{
                return {
                    ...prevState,
                    ['fecha_ini']:formatDate(inicioSemanaPasada),
                    ['fecha_fin']:formatDate(finSemanaPasada)
                }
            })
          break;
          case 3:
          setOpciones((prevState)=>{
                return {
                    ...prevState,
                    ['fecha_ini']:formatDate(primerDiaMesActual),
                    ['fecha_fin']:formatDate(fechaActual)
                }
            })
          break;
          case 4:
          setOpciones((prevState)=>{
                return {
                    ...prevState,
                    ['fecha_ini']:formatDate(primerDiaMesPasado),
                    ['fecha_fin']:formatDate(ultimoDiaMesPasado)
                }
            })
          break;
          case 5:
          setOpciones((prevState)=>{
                return {
                    ...prevState,
                    ['fecha_ini']:formatDate(primerDiaAnoActual),
                    ['fecha_fin']:formatDate(fechaActual)
                }
            })
          break;
          case 6:
          setOpciones((prevState)=>{
                return {
                    ...prevState,
                    ['fecha_ini']:formatDate(primerDiaAnioPasado),
                    ['fecha_fin']:formatDate(ultimoDiaAnioPasado)
                }
            })
          break;
      }
      // setFechaInicio(haceTresHoras.toISOString().slice(0, 16));
    //   
    
    };
 
useEffect(()=>{
  // setSeriesKeys(countArray[elementos.length]) 
  search_reporte_alineacion()
  search_devices()
},[])
const Buscar=()=>{
  
  search_reporte_alineacion()
}
const accionar_reporte=()=>{
    if(reportbyHost){

      search_reporte_host()
    }else{
      search_reporte_alineacion()
    }
}
function search_reporte_alineacion(){
 opcionesTxtArrayFijo.municipio=[...opcionesTxtArray.municipio]
 opcionesTxtArrayFijo.tecnologia=[...opcionesTxtArray.tecnologia]
 opcionesTxtArrayFijo.modelo=[...opcionesTxtArray.modelo]
 opcionesTxtArrayFijo.marca=[...opcionesTxtArray.marca]
  let baseURL
  // setSeriesKeys(countArray[elementos.length])
  // if(elementos.length==1){
  //   baseURL = 'http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability';
  // }else{
    baseURL = 'http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability/multiple';
  // }
  if(opcionesArray.municipio[0]==0){
    setFlagTodos(true)
    console.log('#1')
    setFlagGeneral(false)
  }else{
    setFlagTodos(false)
    setFlagGeneral(true)
  }
  const municipioParam = opcionesArray.municipio.map(id => `municipality_id=${id}`).join('&');
  const tecParam = opcionesArray.tecnologia.map(id => `tech_id=${id}`).join('&');
  const marcaParam = opcionesArray.marca.map(id => `brand_id=${id}`).join('&');
  const modeloParam = opcionesArray.modelo.map(id => `model_id=${id}`).join('&');
  
  const url=`${baseURL}?${municipioParam}&${tecParam}&${marcaParam}&${modeloParam}&init_date=${opciones.fecha_ini}&end_date=${opciones.fecha_fin}`
  // console.log(url)  
  // console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability?municipality_id='+opciones.municipio+'&tech_id='+opciones.tecnologia+'&brand_id='+opciones.marca+'&model_id='+opciones.modelo+'&init_date='+opciones.fecha_ini+'&end_date='+opciones.fecha_fin)
  setDataInfo({data:dataInfo.data,loading:true,error:dataInfo.error})
    const fetchData = async () => {
      try {
        const response = await fetch(url,{
     headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token_item}`,
                            },
                          });
                          // console.log(response)
        if (response.ok) {
          const response_data = await response.json();
          console.log(response_data.data)
         
          setTotalLineas(1)
          setDataByHost([])
          // setSeriesKeys(countArray[totalLienas]) 
          // setDataInfo({data:response_data.data,loading:false,error:dataInfo.error})
          setDataInfo({data:response_data.data,loading:false,error:dataInfo.error})
          // console.log(dataInfo)
          // setOpcionesTxtArrayFijo([...opcionesTxtArray])
        } else {
          setMsgError("Ocurrio un error favor de intentar nuevamente...")
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
        // Manejo de errores
        setMsgError("Ocurrio un error favor de intentar nuevamente...")
        setDataInfo({data:dataInfo.data,loading:dataInfo.loading,error:error})
        //console.error(error);
      }
    };
    fetchData();
}

function search_reporte_host(hostID){

   let baseURL
   setDataByHost([0])
     baseURL = 'http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability/devices/multiple';
  
  const hostParam =arrayHost.map(objeto => `device_ids=${objeto.hostid}`).join('&');
  const url=`${baseURL}?${hostParam}&init_date=${opciones.fecha_ini}&end_date=${opciones.fecha_fin}` 
//  const url='http://172.18.200.14:8002/api/v1/cassia/reports/error-test'
  setDataInfo({data:dataInfo.data,loading:true,error:dataInfo.error})
     const fetchData = async () => {
       try {
         const response = await fetch(url,{
                   headers: {
                               'Content-Type': 'application/json',
                               Authorization: `Bearer ${token_item}`,
                             },
                           });
                           // console.log(response)
         if (response.ok) {
           const response_data = await response.json();
           console.log(response_data.data)
           setDataByHost(response_data.data)
          //  setTotalLineas(1)
           setDataInfo({data:response_data.data,loading:false,error:dataInfo.error})
           
         } else {
          setDataByHost([])
           setMsgError("Ocurrio un error favor de intentar nuevamente...")
           throw new Error('Error en la solicitud');
           
         }
       } catch (error) {
         // Manejo de errores
         setDataInfo({data:dataInfo.data,loading:dataInfo.loading,error:error})
         console.error(error);
         setDataByHost([])
         setMsgError("Ocurrio un error favor de intentar nuevamente...")
       }
     };
     fetchData();
 }
 function download_reporte_host(){
  let baseURL
  // setSeriesKeys(countArray[elementos.length])
  // if(elementos.length==1){
  //   baseURL = 'http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability';
  // }else{
    baseURL = 'http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability/devices/multiple/download';
  // }
  

  const hostParam =arrayHost.map(objeto => `device_ids=${objeto.hostid}`).join('&');
  const url=`${baseURL}?${hostParam}&init_date=${opciones.fecha_ini}&end_date=${opciones.fecha_fin}`
  // console.log(url)  
  // console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability?municipality_id='+opciones.municipio+'&tech_id='+opciones.tecnologia+'&brand_id='+opciones.marca+'&model_id='+opciones.modelo+'&init_date='+opciones.fecha_ini+'&end_date='+opciones.fecha_fin)
  // setDataInfo({data:dataInfo.data,loading:true,error:dataInfo.error})
    const fetchData = async () => {
      try {
    //  const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability?municipality_id='+opciones.municipio+'&tech_id='+opciones.tecnologia+'&brand_id='+opciones.marca+'&model_id='+opciones.modelo+'&init_date='+opciones.fecha_ini+'&end_date='+opciones.fecha_fin, {     
      const response = await fetch(url,{
        // const response = await fetch('http://172.18.200.14:8002/api/v1/cassia/reports/availability/multiple?municipality_id=0&tech_id=11&brand_id=0&model_id=0&init_date=2023-10-01T00:00&end_date=2023-10-16T03:41', {
      // const response = await fetch('http://172.18.200.14:8002/api/v1/cassia/reports/availability/multiple?municipality_id=81&municipality_id=68&tech_id=11&tech_id=9&brand_id=0&brand_id=0&model_id=0&model_id=0&init_date=2023-09-15%2012%3A15%3A00&end_date=2023-09-15%2022%3A16%3A00', {          
    headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token_item}`,
                            },
                          });
                          console.log(response)
        if (response.ok) {
          try {
            const response_data = await response.blob();
            // console.log(response_data)
      
            // Crear un enlace para descargar el archivo
            const url = window.URL.createObjectURL(response_data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data_report.xlsx'); // Cambia el nombre y la extensión del archivo
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          } catch (error) {
            console.error('Error al descargar el archivo', error);
          }
      
        } else {
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
      }
    };
    fetchData();
}
function download_reporte_alineacion(){
  let baseURL
  // setSeriesKeys(countArray[elementos.length])
  // if(elementos.length==1){
  //   baseURL = 'http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability';
  // }else{
    baseURL = 'http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability/multiple/download';
  // }
  
  const municipioParam = opcionesArray.municipio.map(id => `municipality_id=${id}`).join('&');
  const tecParam = opcionesArray.tecnologia.map(id => `tech_id=${id}`).join('&');
  const marcaParam = opcionesArray.marca.map(id => `brand_id=${id}`).join('&');
  const modeloParam = opcionesArray.modelo.map(id => `model_id=${id}`).join('&');
  
  const url=`${baseURL}?${municipioParam}&${tecParam}&${marcaParam}&${modeloParam}&init_date=${opciones.fecha_ini}&end_date=${opciones.fecha_fin}`
  // console.log(url)  
  // console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability?municipality_id='+opciones.municipio+'&tech_id='+opciones.tecnologia+'&brand_id='+opciones.marca+'&model_id='+opciones.modelo+'&init_date='+opciones.fecha_ini+'&end_date='+opciones.fecha_fin)
  // setDataInfo({data:dataInfo.data,loading:true,error:dataInfo.error})
    const fetchData = async () => {
      try {
    //  const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability?municipality_id='+opciones.municipio+'&tech_id='+opciones.tecnologia+'&brand_id='+opciones.marca+'&model_id='+opciones.modelo+'&init_date='+opciones.fecha_ini+'&end_date='+opciones.fecha_fin, {     
      const response = await fetch(url,{
        // const response = await fetch('http://172.18.200.14:8002/api/v1/cassia/reports/availability/multiple?municipality_id=0&tech_id=11&brand_id=0&model_id=0&init_date=2023-10-01T00:00&end_date=2023-10-16T03:41', {
      // const response = await fetch('http://172.18.200.14:8002/api/v1/cassia/reports/availability/multiple?municipality_id=81&municipality_id=68&tech_id=11&tech_id=9&brand_id=0&brand_id=0&model_id=0&model_id=0&init_date=2023-09-15%2012%3A15%3A00&end_date=2023-09-15%2022%3A16%3A00', {          
    headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token_item}`,
                            },
                          });
                          console.log(response)
        if (response.ok) {
          try {
            const response_data = await response.blob();
            // console.log(response_data)
      
            // Crear un enlace para descargar el archivo
            const url = window.URL.createObjectURL(response_data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data_report.xlsx'); // Cambia el nombre y la extensión del archivo
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          } catch (error) {
            console.error('Error al descargar el archivo', error);
          }
      
        } else {
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
      }
    };
    fetchData();
}
const download=()=>{
  if(reportbyHost){
    download_reporte_host()
  }else{
    download_reporte_alineacion()
  }
}
      const handleChangeOption=(index)=>{
        console.log("indice seleccionado "+index)
        setIndexSelected(index)
      }
      
      const generateColor = (progress) => {
        const purple = [128, 0, 128]; // Morado
        const blue = [0, 0, 255]; // Azul
        const green = [0, 128, 0]; // Verde
      
        let color;
      
        if (progress <= 0.5) {
          // En la primera mitad de la escala, interpolamos de morado a azul
          const factor = progress / 0.5;
          color = [
            Math.round(purple[0] + (blue[0] - purple[0]) * factor),
            Math.round(purple[1] + (blue[1] - purple[1]) * factor),
            Math.round(purple[2] + (blue[2] - purple[2]) * factor),
          ];
        } else {
          // En la segunda mitad de la escala, interpolamos de azul a verde
          const factor = (progress - 0.5) / 0.5;
          color = [
            Math.round(blue[0] + (green[0] - blue[0]) * factor),
            Math.round(blue[1] + (green[1] - blue[1]) * factor),
            Math.round(blue[2] + (green[2] - blue[2]) * factor),
          ];
        }
      
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      };
      
      // Uso
      const progress = 0.5;
      const [elementos, setElementos] = useState(['Serie 1']);
      
      const [elementosToRender,setElementosToRender]=useState(['num_1']);
      const [disabled,setDisabled]=useState(true)
      // console.log(elementos)
      // console.log(elementosToRender)
  const handleClickAdd = () => {
    // console.log(dataLocations.data.data[0].id,dataLocations.data.data[0].name)
    
    setElementos([...elementos, 'Serie '+(parseInt(elementos.length,10) +1)]);
    setElementosToRender([...elementosToRender, 'num_'+(parseInt(elementosToRender.length,10) +1)]);
    setOpcionesArray(prevState => {
      return {
        ...prevState,
        municipio: [...prevState.municipio, dataLocations.data.data[0].id],
        tecnologia:[...prevState.tecnologia, 11],
        marca:[...prevState.marca, 0],
        modelo:[...prevState.modelo, 0]
      };
    });
    setOpcionesTxtArray(prevState => {
      return {
        ...prevState,
        municipio: [...prevState.municipio, dataLocations.data.data[0].name],
        tecnologia:[...prevState.tecnologia, 'SUSCRIPTORES'],
        marca:[...prevState.marca, 'TODAS'],
        modelo:[...prevState.modelo, 'TODOS']
      };
    });
    setDataTec(prevState => {
      return {
        ...prevState,
        data: [...prevState.data, []],
        loading:[...prevState.loading, true],
        error:[...prevState.error, null],
      };
    });
    setDataMarca(prevState => {
      return {
        ...prevState,
        data: [...prevState.data, []],
        loading:[...prevState.loading, true],
        error:[...prevState.error, null],
      };
    });
    setDataModelo(prevState => {
      return {
        ...prevState,
        data: [...prevState.data, []],
        loading:[...prevState.loading, true],
        error:[...prevState.error, null],
      };
    });
    setTotalLineas(elementos.length+1)
    
    if(elementos.length+1>=1){
        setDisabled(false)
    }else{
        setDisabled(true)
    }
  };
useEffect(()=>{
 setViewArrayHost(true)
 console.log('cambio array host ')
 console.log(arrayHost.map(objeto => objeto.hostid))
 const hostParam =arrayHost.map(objeto => `model_id=${objeto.hostid}`).join('&');
 console.log(hostParam)
},[arrayHost])
  const eliminarElementoHost = (indice) => {
    setViewArrayHost(false)
    console.log('elimina la posicion '+indice)
    if(arrayHost.length==1 && indice===0){
      setMsgError("Ingrese un host para buscar datos")
      setDataByHost([])
      setDataInfo({data:[],loading:false,error:null})
    }
    const nuevoArreglo = [...arrayHost];
    // Usar splice para eliminar el objeto en la posición "indice"
    nuevoArreglo.splice(indice, 1);
    // Actualizar el estado con la nueva copia del arreglo
    setArrayHost(nuevoArreglo);
   
  //  setArrayHost(...arrayHost.splice(indice,1))
  
  //  setViewArrayHost(true)
  
  };
  const eliminarElemento = (indice) => {
    const nuevosElementos = elementos.filter((elemento, index) => index !== indice);
    const nuevosElementosTR = elementosToRender.filter((elemento, index) => index !== indice);
    // const newOpcionesArray=opcionesArray.filter((elemento, index) => index !== indice);
    // const newPrevOpcionesArray=prevOpcionesArray.filter((elemento, index) => index !== indice);
    setElementos(nuevosElementos);
    setElementosToRender(nuevosElementosTR);
    const newOpcionesArray = { ...opcionesArray };
    const newOpcionesTxtArray = { ...opcionesTxtArray };
    for (let propiedad in newOpcionesArray) {
      if (Array.isArray(newOpcionesArray[propiedad])) {
        newOpcionesArray[propiedad].splice(indice, 1);
      }
    }
    for (let propiedad in newOpcionesTxtArray) {
      if (Array.isArray(newOpcionesTxtArray[propiedad])) {
        newOpcionesTxtArray[propiedad].splice(indice, 1);
      }
    }
    setOpcionesArray(newOpcionesArray);
    setOpcionesTxtArray(newOpcionesTxtArray);
    
    const newPrevOpcionesArray = { ...prevOpcionesArray };

    for (let propiedad in newPrevOpcionesArray) {
      if (Array.isArray(newPrevOpcionesArray[propiedad])) {
        newPrevOpcionesArray[propiedad].splice(indice, 1);
      }
    }

    setPrevOpcionesArray(newPrevOpcionesArray);
    console.log(elementos.length)
    if(elementos.length-1>=1){
        setDisabled(false)
    }else{
        setDisabled(true)
    }
  };
  const containerRef = useRef();
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      container.scrollTop += e.deltaY;
    });
  }, []);
  const handleChangeGraf=(e)=>{
    // console.log(e.target)
    const {name,value}=e.target
    
        setOpciones((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
        })
  }

  const [flagSearch,setFlagSearch]=useState(true)
  const [resultList,setResultList]=useState([])
    const [inputIp,setInputIP]=useState("")
    const [chekedSearch,setChekedSearch]=useState(true)
    const closeFindHost=()=>{
      const popups = document.querySelectorAll('.custom-popup-findHost');
    
    popups.forEach(popup => {
  //    console.log(popups)
    popup.remove();
    });
    setResultList([])
    setInputIP("")
  }

  const handleChangeSeacrhHost=(e)=>{
        
    const term = e.target.value;
    const {name,value}=e.target
    // console.log(value)
    setInputIP(value)
    validateIp(value)
  
    const hostArray=devices.data.hosts
    const filteredResults = hostArray.filter((item) => {
      // Convierte todos los valores a cadenas para realizar una búsqueda sin distinción entre mayúsculas y minúsculas
      return Object.entries(item).some(([key, value]) => {
        if (key === 'ip' || key=== 'Host' || key=== 'name') {
          return String(value).toLowerCase().includes(term.toLowerCase());
        }
        return false; // Si no es el atributo 'ip', retorna falso para continuar buscando en otros atributos
      });
    });
      setResultList(filteredResults)
      
  }
  const validateIp= (ip) => {
    // console.log("validando correo: ",ip )
    const ipRegex = /^$/;
    // const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    let result = ipRegex.test(ip);
    setFlagSearch(result)
    return result;
  };
  // console.log((typeof(dataInfo.data.metrics)!=='undefined')?dataInfo.data.metrics[0]:'') 
  // console.log(elementosToRender)
  // console.log(dataInfo.data.metrics[indexSelected].metric_name+"_"+(parseInt(0)+parseInt(1)))

  function search_devices(){
      
       
    setDevices({data:devices.data,loading:true,error:devices.error})
    
    
    const fetchData = async () => {
      try {
        //console.log(`Bearer ${token_item}`)
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY'; // Reemplaza con tu token de autenticación
        // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/db/hosts/relations/'+ubicacion.groupid, {
          const devicefilter=''
    const subtypefilter=''
    let andAux=(devicefilter!=='' )?'&':'?'
          andAux=(subtypefilter!=='')?andAux:''
    // console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter)
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/'+'0'+''+devicefilter+andAux+subtypefilter, {                 
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                            },
                          });
                          
        if (response.ok) {
          const response_data = await response.json();
          setDevices({data:response_data.data,loading:false,error:devices.error})
          // console.log(response_data)
         
        } else {
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
        // Manejo de errores
        setDevices({data:devices.data,loading:devices.loading,error:error})
        //console.error(error);
      }
    };
    fetchData();
}
const handleSelected=(element)=>{
  setResultList([])
  setChekedSearch(true)
  setFlagSearch(true)
setInputIP("")
// setInputIP([])
  console.log(element)
  // setViewArrayHost(false)
  if(!arrayHost.includes(element)){
    setArrayHost(prevArreglo => [...prevArreglo, element]);
    
  }
 

}
const porHost=()=>{
  setOpcionesArray({municipio:[0],tecnologia:[11],marca:[0],modelo:[0]})
  setOpcionesTxtArray({municipio:['TODOS'],tecnologia:['SUSCRIPTORES'],marca:['TODAS'],modelo:['TODOS']})
  setOpcionesTxtArrayFijo({municipio:['TODOS'],tecnologia:['SUSCRIPTORES'],marca:['TODAS'],modelo:['TODOS']})
  setDataInfo({data:[],loading:false,error:null})
  console.log('#2')
  setFlagGeneral(!flagGeneral)
  if(reportbyHost){
    setArrayHost([])
    setDataByHost([])
    search_reporte_alineacion()
  }
  setReportByHost(!reportbyHost);
 
}
    return (
      <>
        <div className="main-reporte-alineacion">
        
              
            
         
        
        <div className='cont-download-graf' style={{zIndex:'3'}}>
        {<img
                        className='img-field-download-graf'
                        src='/iconos/download.png'
                        title='Descargar'
                        name='Descargar'
                        onClick={download}
                      />}
        </div>
        <div className='cont-expand-graf' style={{zIndex:'3'}}>
        {<img
                        className='img-field-expand-graf'
                        src='/iconos/full-screen.png'
                        title='Expandir'
                        name='Expandir'
                        onClick={Ampliar}
                      />}
        </div>
        {(!flagTodos)?
          <div className='cont-list-graf' style={{width:'14%'}}>
            <div className='compact-list-graf'>

            
          {(dataInfo.loading || typeof(dataInfo.data.metrics)=='undefined' )?'':dataInfo.data.metrics[indexSelected].indices.map((key, index) => (
                                  <>
                                  <div className='cont-row-graf'>
              <div className='cont-color-graf'>
                  <div className='square-color-graf' style={{background:color_graf[key]}}></div>
              </div>
              <div className='cont-name-graf'> {opcionesTxtArrayFijo.municipio[key-1]+' / '+opcionesTxtArrayFijo.tecnologia[key-1]+' / '+opcionesTxtArrayFijo.marca[key-1]+' / '+opcionesTxtArrayFijo.modelo[key-1]}</div>
              
            </div>
            <hr className='separate-rof-graf'></hr>
                                  </>
                                  ))}
          </div>
          
          </div>:<>
          {
            (!reportbyHost)?
            <div className='cont-list-graf' style={{width:'14%'}}>
             <div className='compact-list-graf'>
                <div className='cont-option-todos'>
              <input    value={1} name="ce" type="checkbox" id={`show-general`} onClick={()=>setFlagGeneral(!flagGeneral)}  style={{width:'20px',height:'20px',zIndex:'2'}}/>
              <label htmlFor={`close-event`}>Promedio</label>
            </div>
                      
            </div>
              
           </div>:''
          }
          </>

             
        }
            <div className='cont-reporte-alineacion'>
            <div className='cont-menu-alineacion'>
              <div className='cont-controls'>
                        <div className='row-controls '>
                  {(elementos.length<3 && (opcionesArray.municipio[0]!=0))?<img
                                  className='img-field-add-graf'
                                  src='/iconos/add.png'
                                  title='Agregar'
                                  name='Agregar'
                                  onClick={handleClickAdd}
                                />:''}
                  </div>
                  <div className='row-controls '>
                  <Action disabled={false} origen='Green' titulo='Buscar'  action={()=>accionar_reporte()}/>  
                  </div>
                  <div className='row-controls ' >
                              {
                                (!dataInfo.loading)?<div className='cont-option-todos' >
                                <input  defaultChecked={reportbyHost}  value={1} name="ce" type="checkbox" id={`show-general`} onClick={()=>{porHost()}}  style={{width:'20px',height:'20px',zIndex:'2'}}/>
                                  <label htmlFor={`close-event`}>Por Host</label>
                                </div>:''
                              }
                              
                      </div>
              </div>
            {
                (reportbyHost )?<>
              <div className='cont-selectores'>
              <div className='cont-title-selectores'>
                {(devices.loading==false)?
              <>
        <div className='contSearchHostReporte'>
                <div className="container-searchHost" style={{height: '100%'}}>
                    <input defaultChecked={false} disabled={true} className="checkbox-searchHost" type="checkbox" onClick={closeFindHost}/> 
                    <div className="mainbox-searchHostReporte">
                        <div className="iconcontainer-searchHost" style={{zIndex: '-1'}}>
                            <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="search_icon-searchHost "><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                        </div>
                    <input className="search_input-searchHost" placeholder="Buscar IP ..." type="text" value={inputIp}onChange={handleChangeSeacrhHost}/>
                    </div>
                    <div className={`container-searchHost-list ${!flagSearch ? 'large' : 'small'}`} >
                <div className={`compact-searchHost-list ${!flagSearch ? 'large' : 'small'}`}  style={{border: '1px solid rgba(70, 70, 70, 0.58) !important'}}>
                    {
                        (inputIp==="" )?'':(resultList.length==0)?<div className='row-searchHost-list' >
                        Sin Resultados
                    </div>:
                        
                        resultList.map((element, index) => (
                            <div className='row-searchHost-list' id={index} onClick={()=>handleSelected(element)}>
                                <div className='cont-row-searchHost-txt'>
                                    <div className='ip-row-searchHost' >{element.ip+" / "}</div>
                                    <div> &nbsp; {element.Host}</div>
                                    {(element.latitude.replace(",", ".")<-90 || element.latitude.replace(",", ".")>90)?
                                    <div style={{color:'red'}}> &nbsp; coordenadas erroneas</div>:''
                                    }
                                    
                                </div>
                                
                            </div>
                        ))
                       
                            
                    }
                    
                     
                </div>
               
            </div>
            </div>
            
        </div>
        </>:<div className='contSearchHostReporte' style={{color:'aliceblue'}}>Cargando lista de dispositivos...</div>}
              </div> 
              <div className='cont-list-selectoresHost' ref={containerRef} >
              {(viewArrayHost)?
              <>
                {
                  
                  arrayHost.map((elemento, index) => (
                    <div key={index} className='content-menu-search'id='content-menu-search'>
                      <div className='cont-hostid-menu' style={{color:color_graf[index+1],fontSize:'small'}}>
                        {elemento.hostid}
                      </div>
                      <div className='cont-ip-menu' style={{fontSize:'x-small'}}> 
                        {elemento.ip}
                      </div>
                      <div className='cont-host-menu' style={{fontSize:'x-small'}}> 
                        {elemento.Host}
                      </div>
                      <div className='cont-action-menu'>
                        <div className='cont-img-field-delete-graf'>
                          {
                            
                               <img
                              className='img-field-delete-graf ' 
                              src='/iconos/delete.png'
                              title={'Eliminar'+index+'|'+elementos.length}
                              name='Eliminar'
                              onClick={() => eliminarElementoHost(index)}
                            />
                          }
                      </div>
                      </div>
                    </div>
                  ))
                  }
                  </>:''
                  }
                </div>
                  {/* <MenuSearch completo={true} server={server} opciones={opciones} setOpciones={setOpciones} action1={Buscar} action2={add}></MenuSearch> */}
              </div>
                </>:
                <>
              <div className='cont-selectores'>
              <div className='cont-title-selectores'>
              <div className='cont-title-numeric-menu'>
                    #
                  </div>
                  <div className='cont-title-options-menu'>
                    Municipio
                  </div>
                  <div className='cont-title-options-menu'>
                    Técnologia
                  </div>
                  <div className='cont-title-options-menu'>
                    Marca
                  </div>
                  <div className='cont-title-options-menu'>
                    Modelo
                  </div>
                  <div style={{width:'5%'}}>
                   
                  </div>
              </div> 
              <div className='cont-list-selectores' ref={containerRef} >

              
                {
                  elementos.map((elemento, index) => (
                    <div key={index} className='content-menu-search'id='content-menu-search'>
                      <div className='cont-numeric-menu' style={{color:color_graf[index+1]}}>
                        {elemento}
                      </div>
                      <div className='cont-options-menu'>
                        <MenuSearch  dataLocations={dataLocations} eliminarElemento={eliminarElemento}  setElementos={setElementos} dataTec={dataTec} setDataTec={setDataTec} dataModelo={dataModelo} setDataModelo={setDataModelo} dataMarca={dataMarca} setDataMarca={setDataMarca} index={index} prevOpcionesArray={prevOpcionesArray}  setPrevOpcionesArray={setPrevOpcionesArray} opcionesArray={opcionesArray}    opcionesTxtArray={opcionesTxtArray} setOpcionesTxtArray={setOpcionesTxtArray} setOpcionesArray={setOpcionesArray} server={server} opciones={opciones} setOpciones={setOpciones} completo={false}></MenuSearch>
                      </div>
                      <div className='cont-action-menu'>
                        <div className='cont-img-field-delete-graf'>
                          {
                            
                              (index!==0 && index==elementos.length-1 )? <img
                              className='img-field-delete-graf ' 
                              src='/iconos/delete.png'
                              title={'Eliminar'+index+'|'+elementos.length}
                              name='Eliminar'
                              onClick={() => eliminarElemento(index)}
                            />:''
                          }
                      </div>
                      </div>
                    </div>
                  ))
                  }
                  
                </div>
                  {/* <MenuSearch completo={true} server={server} opciones={opciones} setOpciones={setOpciones} action1={Buscar} action2={add}></MenuSearch> */}
              </div>
              </>
              }
              <div className='cont-periodos'> 
                  <div className='cont-periodo-manual'> 
                  <>
                  <div className='compact-periodo-manual'>

                  <div className='menuSearchOption' style={{height:'unset'}}>
                  <div className='compact-option-date'>
                      <div className="user-box-alineacion">
                          <input required name="fecha_ini"  type="datetime-local" value={opciones.fecha_ini}
                          onChange={handleChangeGraf} />
                                          <label className=' active lbl-option-date' >Desde:</label>
                      </div>
                  </div>
                  </div>
                  <div className='compact-option-date'>
                    <div className="user-box-alineacion">
                          <input required name="fecha_fin"  type="datetime-local" value={opciones.fecha_fin}
                          onChange={handleChangeGraf} />
                                          <label className=' active lbl-option-date ' >Hasta:</label>
                      </div>
                  </div>
                  </div>
                  
                  </>
                  </div>
                  <div className='cont-periodo-opciones'> 
                    <div className='cont-list-periodo'>
                      <div className='row-option-periodo' onClick={()=>ultimasNHoras(1)}>
                          Ultima hora
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimasNHoras(3)}>
                          Ultimas 3 horas
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimasNHoras(6)}>
                          Ultimas 6 horas
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimasNHoras(12)}>
                          Ultimas 12 horas
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimasNHoras(24)}>
                          Ultimas 24 horas
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimasNHoras(48)}>
                          Ultimas 48 horas
                      </div>
                    </div>
                    <div className='cont-list-periodo'>
                      <div className='row-option-periodo' onClick={()=>ultimoPeriodo(1)}>
                          Esta semana
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimoPeriodo(2)}>
                          Semana pasada
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimoPeriodo(3)}>
                          Este mes
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimoPeriodo(4)}>
                          Mes pasado
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimoPeriodo(5)}>
                          Este año
                      </div>
                      <div className='row-option-periodo' onClick={()=>ultimoPeriodo(6)}>
                          Año pasado
                      </div>
                    </div>
                  </div>
              </div>
                
            </div>
             
            <div className='cont-graf-alineacion' style={{zIndex:'1'}}>
                <div className='cont-info-graf'>
                    {/* <div className='cont-info-top'>

                    </div> */}
                    <div className='cont-info-center'>
                      
                      {
                            (dataInfo.loading || typeof(dataInfo.data.metrics)=='undefined' || typeof(dataInfo.data.metrics[indexSelected])=='undefined')?<div style={{width:'100%',height:'95%',display:'flex',justifyContent:'center',alignItems:'center',color:'gray'}}>{((reportbyHost && databyHost.length==0) || (typeof(dataInfo.data.metrics)!='undefined' && dataInfo.data.metrics.length==1 ))?(typeof(dataInfo.data.metrics)!='undefined' && dataInfo.data.metrics.length==1 )?'Sin metrica para mostrar':msgError:<LoadSimple></LoadSimple>}</div>:
                              (!reportbyHost || (reportbyHost && arrayHost.length>0))?
                              <>
                                {
                                  (dataInfo.data.metrics[indexSelected].dataset.length>0 )?'':<h1 style={{position: 'absolute',top: '30%',left: '50%',transform: 'translate(-50%, -50%)',color: '#cecece'}}>Sin Datos</h1>
                                }
                                <ResponsiveContainer width="100%" height="95%">
                                <LineChart
                                  width={400}
                                  height={200}
                                  // data={dataInfo.data.metrics[0].dataset}
                                  data={(flagGeneral)?dataInfo.data.metrics[indexSelected].dataset:dataInfo.data.metrics[indexSelected].dataset2}
                                  // data={dataInfo.data.metrics[indexSelected].dataset}
                                  margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  {/* <XAxis dataKey="Tiempo" /> */}
                                  <XAxis dataKey="Tiempo" />
                                  <YAxis />
                                  <Tooltip content={<CustomTooltip />} />
                                  
                                  <Legend />

                                  {/* <Line type="monotone" dataKey="Alineacion_1" stroke="#8884d8" strokeWidth={2}  /> */}
                                  {/* <Area type="monotone" dataKey="Alineacion" fill="#8884d8" fillOpacity={0.3} /> */}
                                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                  <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
                                  
                                  {
                                    (flagGeneral)?
                                    dataInfo.data.metrics[indexSelected].indices.map((key, index) => (
                                      <Line
                                      key={index}
                                        type="monotone"
                                        dataKey={"num_"+key}
                                        // dataKey={((reportbyHost)?dataInfo.data.metrics[indexSelected].hostids[index]:"num_"+key)}
                                        // stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Color aleatorio
                                      // stroke={color_graf[index+1]}
                                      name={'metrica'}
                                      stroke={'#a0015a'}
                                      strokeWidth={2}
                                      activeDot={{ onClick: (e)=>{console.log(e)}, r: 8 }}
                                      />
                                    ))
                                    :
                                    dataInfo.data.metrics[indexSelected].municipality.map((key, index) => (
                                      <Line
                                      key={index}
                                        type="monotone"
                                        // dataKey={elementosToRender[index]}
                                        dataKey={"num_"+key}
                                        
                                        // stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Color aleatorio
                                      stroke={color_graf[((index+1)>50)?(index+1)-50:(index+1)]}
                                      name={key}
                                      // stroke={generateColorOptions()}
                                      />
                                    ))
                                    
                                  }
                                </LineChart>
                                </ResponsiveContainer>
                              </>:''
                        }
                    </div>
                    {/* <div className='cont-info-bottom'>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Funcionalidad Promedio:    </div>
                            {
                              (typeof dataInfo.data.metrics !== 'undefined' && dataInfo.loading==false)?
                                dataInfo.data.general_funcionality_average.map((key, index) => (
                                  
                                  <div className='txt-info-dinamic' id={'fp'+index} style={{color:color_graf[index+1]}}> &nbsp; {typeof dataInfo.data.general_funcionality_average === 'undefined' ?'---':((dataInfo.data.general_funcionality_average[index]==="" ?0:dataInfo.data.general_funcionality_average[index].toFixed(2)))}%</div>
                                )):''}
                              
                        </div>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Lapso de tiempo:    </div>
                            {
                              (typeof dataInfo.data.metrics !== 'undefined'  && dataInfo.loading==false)?
                              dataInfo.data.metrics[0].days.map((key, index) => (
                                // console.log(dataInfo.data.metrics[0].availability_average.length,index)
                                <div className='txt-info-dinamic' id={'lt'+index} style={{color:color_graf[index+1]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined' ?'---':((dataInfo.data.metrics[0].days[index]==="" ?0:dataInfo.data.metrics[0].days[index].toFixed(2)))}dias</div>
                              )):''}
                           </div>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Dispositivos:    </div>
                            {
                              (typeof dataInfo.data.metrics !== 'undefined'  && dataInfo.loading==false)?
                              dataInfo.data.metrics[0].device_count.map((key, index) => (
                                // console.log(dataInfo.data.metrics[0].availability_average.length,index)
                                <div className='txt-info-dinamic' id={'dis'+index} style={{color:color_graf[index+1]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined' ?'---':((dataInfo.data.metrics[0].device_count[index]==="" ?0:dataInfo.data.metrics[0].device_count[index]))}</div>
                              )):''}
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='cont-table-alineacion'>
            <div className='bodyInfoTable'>
                  <div className='contTableDisp'>
                    
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
                                 Promedio
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
                        { (dataInfo.data.length==0 || dataInfo.loading )?'':
                        dataInfo.data.metrics.map((key, index) => (
                         (index>0)? <>
                         <div className='rowInfoDisp'>
                         <div className='DispInfoCell' style={{width:'5%'}}>
                           <input name="radio" type="radio" className="checkTableDisp" defaultChecked={(index===1)?true:false} onClick={()=>handleChangeOption(index)} />
                         </div>
                         <div className='DispInfoCell' style={{width:'25%'}}>
                             
                             <div className='txtDispInfoCell' >
                             {dataInfo.data.metrics[index].metric_name  }
                             </div> 
                         </div>
                         <div className='DispInfoCell' style={{width:'25%'}}>
                             <div className='txtDispInfoCell'>
                             {
                           (typeof dataInfo.data.metrics !== 'undefined')?
                           dataInfo.data.metrics[index].availability_average.map((key, index2) => (
                             <div className='txt-info-dinamic' id={'avail'+index2} style={{color:color_graf[dataInfo.data.metrics[index].indices[index2]]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined' ?'---':((dataInfo.data.metrics[index].availability_average[index2]==="" ?0:dataInfo.data.metrics[index].availability_average[index2].toFixed(2)))}%</div>
                           )):''}
                             {/* {typeof dataInfo.data.general_funcionality_average === 'undefined'?'---':(dataInfo.data.general_funcionality_average.toFixed(2))}% */}
                             </div>
                         </div>
                         <div className='DispInfoCell' style={{width:'20%'}}>
                             <div className='txtDispInfoCell'>
                             {
                           (typeof dataInfo.data.metrics !== 'undefined')?
                           dataInfo.data.metrics[index].days.map((key, index2) => (
                             // console.log(dataInfo.data.metrics[0].availability_average.length,index)
                             <div className='txt-info-dinamic' id={'dias'+key} style={{color:color_graf[dataInfo.data.metrics[index].indices[index2]]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined' ?'---':((dataInfo.data.metrics[index].days[index2]==="" ?0:dataInfo.data.metrics[index].days[index2].toFixed(2)))}dias</div>
                           )):''}
                             {/* {typeof dataInfo.data.days === 'undefined'?'---': (''+(dataInfo.data.days===""?0:dataInfo.data.days.toFixed(2))+' dias')} */}
                             </div>
                         </div>
                         <div className='DispInfoCell' style={{width:'25%'}}>
                             <div className='txtDispInfoCell'>
                             {
                           (typeof dataInfo.data.metrics !== 'undefined')?
                           dataInfo.data.metrics[index].device_count.map((key, index2) => (
                             // console.log(dataInfo.data.metrics[0].availability_average.length,index)
                             <div className='txt-info-dinamic' id={'dev'+index2} style={{color:color_graf[dataInfo.data.metrics[index].indices[index2]]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined' ?'---':((dataInfo.data.metrics[index].device_count[index2]==="" ?0:dataInfo.data.metrics[index].device_count[index2]))} </div>
                           )):''}
                             {/* {dataInfo.data.device_count} */}
                             </div>
                         </div>
                     </div>
                         </>:''
                          ))
                        
                        }
                        
                        
                        
                        
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
            </div>
        </div>
        <Modal
        isOpen={addMultiGraphModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closAddMultiGraphModal}
        style={AddMultiGraphModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalAddMultiGraph flagTodos={flagTodos} flagGeneral={flagGeneral} setFlagGeneral={setFlagGeneral} generateColorOptions={generateColorOptions} indexSelected={indexSelected} dataInfo={dataInfo} elementosToRender={elementosToRender}closAddMultiGraphModal={closAddMultiGraphModal} setTotalLineas={setTotalLineas} color_graf={color_graf} opcionesTxtArrayFijo={opcionesTxtArrayFijo} ></ModalAddMultiGraph>
    </Modal>
        </>
    )
}

export default Alineacion
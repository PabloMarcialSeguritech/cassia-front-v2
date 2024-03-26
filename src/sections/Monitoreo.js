
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Container from '../components/Container'
import RightQuadrant from '../components/RightQuadrant'
import SearchHost from '../components/SearchHost'
import Notifications from '../components/Notifications'
import LeftQuadrant from '../components/LeftQuadrant'
import {  useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import mapboxgl from 'mapbox-gl'
import MapBox from '../components/mapbox_gl'
import MapComponent from '../components/Map'
import LoadData from '../components/LoadData'
import Modal from 'react-modal';
import InfoMarker from '../components/InfoMarker'
import '../components/styles/MapBox.css'
import arcos_list from '../components/arcos'
import data_switches from '../components/switches'
import ShowLayers from '../components/ShowLayers'
import { render } from '@testing-library/react'
const Monitoreo=({token_item,userPermissions,dataGlobals,server,handleShowPopup,estados_list,estadoSelected,setEstadoSelected})=>{
  const dispId_default=-1
  const [capas,setCapas]=useState({})
  const global_longitud=dataGlobals.find(obj => obj.name === 'state_longitude')
  const global_latitude=dataGlobals.find(obj => obj.name === 'state_latitude')
  const global_zoom=dataGlobals.find(obj => obj.name === 'zoom')
  token_item=localStorage.getItem('access_token')
  
    // const [ubicacion,setUbicacion]=useState({latitud:'20.01808757489169',longitud:'-101.21789252823293',groupid:0,dispId:11,templateId:0})
    const [ubicacion,setUbicacion]=useState({latitud:global_latitude.value,longitud:global_longitud.value,groupid:0,dispId:dispId_default,templateId:0})
    const [ubiActual,setUbiActual]=useState({municipio:'TODOS',groupid:0,dispId:dispId_default,templateId:0})
    // const [severityProblms,setSeverityProblms]=useState(["6"])
    const [severityProblms,setSeverityProblms]=useState([((ubiActual.dispId==-1)?"6":"6")])
    const [metricaSelected,setMetricaSelected]=useState("")
    const [zoom,setZoom]=useState(11)
    const [latitudes,setLatitudes]=useState([])
    const [longitudes,setLongitudes]=useState([])
    const [locations,setLocations]=useState([])

    // console.log(ubicacion)

    const [markers,setMarkers]=useState([])
    const [markers1, setMarkers1] = useState([]);
    const [markers2, setMarkers2] = useState([]);
    const [switchesFO, setSwitchesFO] = useState([]);
    const [switchesMO, setSwitchesMO] = useState([]);
    const [switchesDownFO, setSwitchesDownFO] = useState([]);
    const [switchesDownMO, setSwitchesDownMO] = useState([]);
// //console.log(switchesFO,switchesFO,markers)
    const [markersWOR,setMarkersWOR]=useState([])
    const [lines,setLines]=useState([])
    const [downs,setDowns]=useState([])
    const [towers,setTowers]=useState([])
    const [rfid,setRfid]=useState([])
    const [lpr,setLpr]=useState([])
    const [switches,setSwitches]=useState([])
    //  //console.log(switches)
    const [token,setToken]=useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY")
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [devices,setDevices]=useState({data:[],loading:true,error:null});
    console.log(devices)
    const [dataProblems,setDataProblems]=useState({data:[],loading:true,error:null})
    // const downs_list=useFetch('zabbix/layers/downs',0,token_item,'GET')
    const[downs_list,setDownsList]=useState({data:[],loading:true,error:null});
    const tower_list=useFetch('zabbix/layers/towers','',token_item,'GET',server)
    const[rfid_list,setRfidList]=useState({data:[],loading:true,error:null});
    const [rfidData,setRfidData]=useState({map:{},getSource:{},popup:null});
    const[lpr_list,setLprList]=useState({data:[],loading:true,error:null});
    const [lprData,setLprData]=useState({map:{},getSource:{},popup:null});
    const[switch_list,setSwitchList]=useState({data:[],loading:true,error:null});
    console.log(tower_list)
    const [mapAux,setmapAux]=useState({});
    const [rfidInterval,setRfidInterval]=useState(0)

    const [lprInterval,setLprInterval]=useState(0)
    const [renderCapas,setRenderCapas]=useState({downs:false,markersWOR:true,markers:true,rfid:true,switches:true,lpr:true,towers:false})
    // //console.log(renderCapas)

   const [renderMap,setRenderMap]=useState(false)
   const allTrue = Object.values(renderCapas).every(value => value === true);
   const [loaderMap,setLoaderMap]=useState(true)
  // const loaderMap=(ubicacion.dispId==-1)?downs_list.loading:devices.loading
console.log('alltrue '+loaderMap)
useEffect(()=>{
  if (allTrue) {
    console.log('Todos los atributos están en true');
    // setLoaderMap(true)
    // setRenderMap(true)
  } else {
    console.log('Al menos uno de los atributos está en false');
    console.log(renderCapas)
  }
},[renderCapas])
useEffect(()=>{
  //console.log("actualiza markers")
  if(ubicacion.templateId!=0){
    setMarkers([markers1,markers2,switchesDownFO,switchesDownMO])
  }
 
},[markers1,markers2])
useEffect(()=>{
  //console.log("actualiza markers")
 //console.log(switchesFO,switchesMO)
 if(switchesFO.length>0 && switchesMO.length>0){
    setSwitches([switchesFO,switchesMO,switchesDownFO,switchesDownMO])
 }
 
},[switchesFO,switchesMO])
   useEffect(() => {
    // //console.log(renderCapas.markersWOR)
    if(markersWOR.length!==0){
      //console.log('El proceso de markersWOR ha terminado',markersWOR.length);
      setRenderCapas(prevState => ({
        ...prevState,
        markersWOR: true 
      }));
    }
    
    
  }, [markersWOR]); 
  useEffect(() => {
    console.log(renderCapas.towers)
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(towers)
    if(towers.length!==0){
      //console.log('El proceso de markersWOR ha terminado',markersWOR.length);
      setRenderCapas(prevState => ({
        ...prevState,
        towers: true 
      }));
    }
    
    
  }, [towers]); 
  useEffect(() => {
    //console.log('El proceso de downs ha terminado');
    // //console.log(downs)
    setRenderCapas(prevState => ({
      ...prevState,
      downs: true 
    }));
  }, [downs]);
  useEffect(() => {
    if(rfid.length>0){
      //console.log('El proceso de rfid ha terminado');
      // //console.log(rfid)
      setRenderCapas(prevState => ({
        ...prevState,
        rfid: true 
      }));
    }
    
  }, [rfid]);
  useEffect(() => {
    if(lpr.length>0){
      //console.log('El proceso de lpr ha terminado');
      // //console.log(rfid)
      setRenderCapas(prevState => ({
        ...prevState,
        lpr: true 
      }));
    }
    
  }, [lpr]);
  useEffect(() => {
  //console.log("switches")
  //console.log(switches.length+" | "+switch_list.data.length)
    if(switchesFO.length>0  || switchesMO.length>0){
      //console.log('El proceso de switches ha terminado');
      //console.log(switches)
      setRenderCapas(prevState => ({
        ...prevState,
        switches: true 
      }));
    }
    
  }, [switches]);
  useEffect(() => {
    //console.log('El proceso de markers ha terminado',markers);
    setRenderCapas(prevState => ({
      ...prevState,
      markers: true 
    }));
  }, [markers]);
    useEffect(()=>{
      
      search_problems()
      // objeto_towers(aps)
      
    },[])
    
    useEffect(()=>{
      if(downs_list.data.length!==0){
        ////console.log("pinta")
        objeto_downs(downs_list.data.downs)
        }
    },[downs_list.data])
    useEffect(()=>{
      if(rfid_list.data.length!==0){
        objeto_rfid(rfid_list.data)
        // setTimeout(search_rfid, 10000); 
        }

    },[rfid_list.data])
    useEffect(()=>{
      if(rfid.length!==0){
        // //console.log('actualizo rfid')
        // //console.log(rfid)
        actualizar_layer_rfid(rfid)
        }

    },[rfid])
    useEffect(()=>{
      if(lpr_list.data.length!==0){
        objeto_lpr(lpr_list.data)
        }

    },[lpr_list.data])
    useEffect(()=>{
      if(lpr.length!==0){
        //console.log('actualizo lpr')
        //console.log(lpr)
        actualizar_layer_lpr(lpr)
        }

    },[lpr])
    useEffect(()=>{
      if(tower_list.data.length!==0){
        console.log("pinta")
        objeto_towers(tower_list.data.data)
        }
    },[tower_list.data])
    useEffect(()=>{
      if(switch_list.data.length!==0){
        //console.log(switch_list.data)
        
        objeto_switches(switch_list.data)
        }
    },[switch_list.data])
    function objeto_towers(aps){
      aps.map((host, index, array)=>
          {
            if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
              
              setTowers(towers=>[...towers,{
                type: 'Feature',
                properties:{
                  Name: host.name,
                  latitude: host.latitude,
                  longitude: host.longitude,
                  
                },
                geometry: {
                  type: 'Point',
                  coordinates: [host.longitude, host.latitude],
                },
              }])
              
            }else{
              ////console.log(host)
            }
        }
        )
    }
    
     /****************************************************************** */
     function objeto_downs(downs_list){
      // //console.log(devices)
      let flag_ubicacion=false
      downs_list.map((host, index, array)=>
          {
            
            if (ubicacion.dispId==-1 && !flag_ubicacion) {
              if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90){
                setUbicacion({latitud:host.latitude,longitud:host.longitude,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
                // //console.log(host);
                flag_ubicacion=true
              }
            }
            if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
              // //console.log(host.hostid)
              
              // const hostidC = devices.data.hosts.find(obj => obj.hostid === host.hostid)
              // //console.log(hostidC)
              // //console.log(hostidC.hostidC)
              setDowns(downs=>[...downs,{
                type: 'Feature',
                properties:{
                  Name: host.name,
                  latitude: host.latitude.replace(",", "."),
                  longitude: host.longitude.replace(",", "."),
                  hostid: host.hostid,
                  descripcion:host.description,
                  value:host.value,
                  hostidC: host.hostid,
                  hostidP: '',
                  end_lat: host.latitude.replace(",", "."),
                  end_lon: host.longitude.replace(",", "."),
                  name_hostC:host.name,
                  name_hostipC:host.ip,
                  origen:host.origen
                },
                geometry: {
                  type: 'Point',
                  coordinates: [host.longitude.replace(",", "."), host.latitude.replace(",", ".")],
                },
              }])
              
            }else{
              ////console.log(host)
            }
        }
        )
    }
    /****************************************************************** */
    function objeto_rfid(rfid_list){
      // //console.log("objeto rfid")
      // //console.log(rfid_list)
      setRfid([])
      rfid_list.map((host, index, array)=>
          {
            
            // if(host.length!==0 && host.Latitud>=-90 && host.Latitud<=90 ){
              
            //   setRfid(rfid=>[...rfid,{
            //     type: 'Feature',
            //     properties:{
            //       latitude: host.Latitud,
            //       longitude: host.Longitud,
            //       lecturas:host.Lecturas
            //     },
            //     geometry: {
            //       type: 'Point',
            //       coordinates: [host.Longitud, host.Latitud],
            //     },
            //   }])
              
            // }else{
            //   ////console.log(host)
            // }
            if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
            
              setRfid(rfid=>[...rfid,{
                type: 'Feature',
                properties:{
                  latitude: host.latitude,
                  longitude: host.longitude,
                  lecturas:host.Lecturas,
                  severidad:host.max_severity
                },
                geometry: {
                  type: 'Point',
                  coordinates: [host.longitude, host.latitude],
                },
              }])
              
            }else{
              // //console.log(host)
            }
        }
        )
        // setTimeout(search_rfid, 10000); 
    }
    /****************************************************************** */
    function objeto_lpr(lpr_list){
      // //console.log("objeto rfid")
      console.log(lpr_list)
      setLpr([])
      lpr_list.map((host, index, array)=>
          {
            
            if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
            
              setLpr(lpr=>[...lpr,{
                type: 'Feature',
                properties:{
                  latitude: host.latitude,
                  longitude: host.longitude,
                  lecturas:host.Lecturas,
                  severidad:host.max_severity,
                  activo:host.activo
                },
                geometry: {
                  type: 'Point',
                  coordinates: [host.longitude, host.latitude],
                },
              }])
              
            }else{
              // //console.log(host)
            }
        }
        )
        // setTimeout(search_rfid, 10000); 
    }
     /****************************************************************** */
    
    function search_problems(){
      
    setDataProblems({data:dataProblems.data,loading:true,error:dataProblems.error})
      const fetchData = async () => {
        try {
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY'; // Reemplaza con tu token de autenticación
          const devicefilter=(ubicacion.dispId!==0 && ubicacion.dispId!==-1)?'?tech_host_type='+ubicacion.dispId:''
      const subtypefilter=ubicacion.templateId!==0?'subtype='+ubicacion.templateId:''
      const severityfilter=(ubiActual.dispId==-1)?'severities=6':(severityProblms.length>0?'severities='+severityProblms.join(', '):'')
      let andAux=(devicefilter!=='' )?'&':'?'
            andAux=(subtypefilter!=='')?andAux:''
            
      console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/problems/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter+(((ubicacion.dispId==0 && ubicacion.templateId==0) || ubicacion.dispId==-1)?'?':'&')+severityfilter)
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/problems/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter+(((ubicacion.dispId==0 && ubicacion.templateId==0) || ubicacion.dispId==-1)?'?':'&')+severityfilter, {                 
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token_item}`,
                              },
                            });
          if (response.ok) {
            const response_data = await response.json();
            console.log(response_data)
            setDataProblems({data:response_data.data,loading:false,error:dataProblems.error})
            
            
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          // Manejo de errores
          setDataProblems({data:dataProblems.data,loading:dataProblems.loading,error:error})
          //console.error(error);
        }
      };
      fetchData();
    }
    
    
    
    
    
    
    useEffect(()=>{
      // search_devices()
      search_downs()
      // search_rfid()
    },[])
    function search_switches(){
      setSwitches([])
      setSwitchesFO([])
      setSwitchesMO([])
      // //console.log()
      // //console.log("borra rfid")
      setSwitchList({data:[],loading:true,error:rfid_list.error})
        const fetchData = async () => {
          try {
            // //console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/switches_connectivity')
        //  const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/switches_connectivity/'+ubicacion.groupid, {  
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/0?dispId=12&subtype_id=Interface Bridge-Aggregation_: Bits', {                
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token_item}`,
                                },
                              });
                              //console.log(response)
            if (response.ok) {
              const response_data = await response.json();
              //console.log(response_data.data)
              // //console.log("arcos")
              // //console.log(arcos_list)
              setSwitchList({data:response_data.data,loading:false,error:rfid_list.error})
              // setSwitchList({data:data_switches,loading:false,error:'rfid_list.error'})
              
            } else {
              throw new Error('Error en la solicitud');
            }
          } catch (error) {
            // Manejo de errores
            setSwitchList({data:rfid_list.data,loading:rfid_list.loading,error:error})
            //console.error(error);
          }
        };
        fetchData();
        // setSwitchList({data:data_switches,loading:false,error:'rfid_list.error'})
    }
    function search_rfid(){
      setRfid([])
      // //console.log()
      // //console.log("borra rfid")
      setRfidList({data:[],loading:true,error:rfid_list.error})
        const fetchData = async () => {
          try {
            //console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/carreteros/'+ubicacion.groupid)
         const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/carreteros/'+ubicacion.groupid, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token_item}`,
                                },
                              });
            if (response.ok) {
              const response_data = await response.json();
              // //console.log(response_data.data)
              // //console.log("arcos")
              // //console.log(arcos_list)
              setRfidList({data:response_data.data,loading:false,error:rfid_list.error})
              // setRfidList({data:arcos_list,loading:false,error:rfid_list.error})
              
            } else {
              throw new Error('Error en la solicitud');
            }
          } catch (error) {
            // Manejo de errores
            setRfidList({data:rfid_list.data,loading:rfid_list.loading,error:error})
            //console.error(error);
          }
        };
        fetchData();
    }
    function search_lpr(){
      setLpr([])
      // //console.log()
      // //console.log("borra rfid")
      setLprList({data:[],loading:true,error:lpr_list.error})
        const fetchData = async () => {
          try {
            //console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/lpr/'+ubicacion.groupid)
         const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/lpr/'+ubicacion.groupid, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token_item}`,
                                },
                              });
            if (response.ok) {
              const response_data = await response.json();
              //console.log(response_data.data)
              // //console.log("arcos")
              // //console.log(arcos_list)
              setLprList({data:response_data.data,loading:false,error:lpr_list.error})
              // setRfidList({data:arcos_list,loading:false,error:rfid_list.error})
              
            } else {
              throw new Error('Error en la solicitud');
            }
          } catch (error) {
            // Manejo de errores
            setLprList({data:lpr_list.data,loading:lpr_list.loading,error:error})
            //console.error(error);
          }
        };
        fetchData();
    }
    function search_devices(){
      setRenderMap(false)
      // //console.log("search device ",rfidInterval)
      if(rfidInterval!==0){
        clearInterval(rfidInterval);
        setRfid([])
      }
      setRenderCapas(prevState => ({
        ...prevState,
        downs:false,
        markersWOR:(ubicacion.dispId!==-1)?false:true,
        markers: (ubicacion.templateId!==0)?false:true ,
        rfid:(ubicacion.dispId===9)?false:true,
        lpr:(ubicacion.dispId===1)?false:true,
        switches:(ubicacion.dispId===12)?false:true,
        towers:true
      }));
        setMarkers([])
        setMarkers1([])
        setMarkers2([])
        setMarkersWOR([])
        setLines([])
        setSwitches([])
        setLocations([])
        setLoaderMap(true)
        setDevices({data:devices.data,loading:true,error:devices.error})
        
        
        const fetchData = async () => {
          try {
            console.log(`Bearer ${token_item}`)
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY'; // Reemplaza con tu token de autenticación
            // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/db/hosts/relations/'+ubicacion.groupid, {
              const devicefilter=ubicacion.dispId!==0?'?dispId='+ubicacion.dispId:''
        const subtypefilter=ubicacion.templateId!==0?'subtype_id='+ubicacion.templateId:''
        let andAux=(devicefilter!=='' )?'&':'?'
              andAux=(subtypefilter!=='')?andAux:''
        console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter)
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token_item}`,
                                },
                              });
                              
            if (response.ok) {
              const response_data = await response.json();
              setDevices({data:response_data.data,loading:false,error:devices.error})
              console.log(response_data)
              setLoaderMap(false)
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
    useEffect(()=>{
      ////console.log("entra devices")
      if(devices.data.length!=0){
        // search_downs()
        // //console.log("*************************************  UP  ************************************")
        // //console.log(devices.data.hosts.length)
        // //console.log("con severidad: ",devices.data.problems_by_severity)
        setLatitudes([]) 
        setLongitudes([])
        if(devices.data.hosts.length!=0){
          objeto_markers_wor(devices.data)
          
        }
        if(devices.data.relations.length!=0){
          ////console.log("entra a relaciones!!!!!!!!")
          objeto_relaciones(devices.data)
        }
        if(devices.data.subgroup_info.length!=0){
          objeto_subgroup_info(devices.data)
        }else if(devices.data.hosts.length!=0 && ubicacion.dispId===2){
          objeto_antenas(devices.data)
        }
        
        
      }
      
    },[devices.data])
    function search_downs(){
      setDowns([])
      // //console.log("use downs",ubicacion)
      const odd=(ubicacion.dispId===-1)?'/origen':''
      if(ubicacion.dispId===-1){
        setLoaderMap(true)
      }
        setDownsList({data:downs_list.data,loading:true,error:downs_list.error})
        const fetchData = async () => {
          try {
            
            let body = (ubicacion.dispId===0 || ubicacion.dispId===-1)?'':'?dispId='+ubicacion.dispId
            console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/downs'+odd+'/'+ubicacion.groupid+''+body)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/downs'+odd+'/'+ubicacion.groupid+''+body, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token_item}`,
                                },
                              });
            if (response.ok) {
              const response_data = await response.json();
              setDownsList({data:response_data.data,loading:false,error:downs_list.error})
              console.log(response_data)
              if(ubicacion.dispId===-1){
                setLoaderMap(false)
              }
            } else {
              throw new Error('Error en la solicitud');
            }
          } catch (error) {
            // Manejo de errores
            setDownsList({data:downs_list.data,loading:downs_list.loading,error:error})
            //console.error(error);
          }
        };
        fetchData();
    }
    function objeto_subgroup_info(devices_data){
      //console.log(devices_data.subgroup_info)
      devices_data.subgroup_info.map((host, index, array)=>
          {
            if(ubicacion.dispId===12){
              if(host.length!==0 && host.latitudeP.replace(",", ".")>=-90 && host.latitudeP.replace(",", ".")<=90 && host.latitudeC.replace(",", ".")>=-90 && host.latitudeC.replace(",", ".")<=90){
              
                
                // //console.log("indice"+index+" | tipo:"+host.type_connection)
                // //console.log(hostSub   )
                let alineacion=0
                let severity=0
                
                
                  let colorSG='#00ff70'
                  
                
                  if(host.severity==1){
                    colorSG='#ffee00'
                    // severity=1
                  }else if(host.severity==2){
                    colorSG='#ee9d08'
                    // severity=2
                  }else if(host.severity==3){
                    colorSG='#ee5c08'
                    // severity=3
                  }else if(host.severity==4){
                    colorSG='#ee0808'
                    // severity=4
                  }
                //azul #4fb7f3
                // verde "#1fee08"
                
                if(host.type_connection==1 && host.connectivity==1){
                  // //console.log("fibra optica")
                  setMarkers1(markers1 =>[...markers1,{
                    type: 'Feature',
                    properties:{
                      correlarionid: host.relationid,
                      init_lat: host.latitudeP.replace(",", "."),
                      init_lon: host.longitudeP.replace(",", "."),
                      end_lat: host.latitudeC.replace(",", "."),
                      end_lon: host.longitudeC.replace(",", "."),
                      Metric:host.Metric,
                      name:host.name,
                      hostidC: host.hostidC,
                      hostidP: host.hostidP,
                      BitsSent: host.BitsSent,
                      color_alineacion:colorSG,
                      severity:(host.connectivity==0)?host.connectivity:host.severity,
                      type_connection: host.type_connection,
                      // severity:Math.floor(Math.random() * 4) + 1,
                      metrica:metricaSelected,
                    },
                    geometry: {
                      type: 'LineString',
                      coordinates: [[host.longitudeP.replace(",", "."), host.latitudeP.replace(",", ".")], [host.longitudeC.replace(",", "."), host.latitudeC.replace(",", ".")]],
                    },
                  }])
                }else  if(host.type_connection==1 && host.connectivity==0){
                  // //console.log("fibra optica")
                  setSwitchesDownFO(switchesDownFO =>[...switchesDownFO,{
                    type: 'Feature',
                    properties:{
                      correlarionid: host.relationid,
                      init_lat: host.latitudeP.replace(",", "."),
                      init_lon: host.longitudeP.replace(",", "."),
                      end_lat: host.latitudeC.replace(",", "."),
                      end_lon: host.longitudeC.replace(",", "."),
                      Metric:host.Metric,
                      name:host.name,
                      hostidC: host.hostidC,
                      hostidP: host.hostidP,
                      BitsSent: host.BitsSent,
                      color_alineacion:colorSG,
                      severity:0,
                      type_connection: host.type_connection,
                      // severity:Math.floor(Math.random() * 4) + 1,
                      metrica:metricaSelected,
                    },
                    geometry: {
                      type: 'LineString',
                      coordinates: [[host.longitudeP.replace(",", "."), host.latitudeP.replace(",", ".")], [host.longitudeC.replace(",", "."), host.latitudeC.replace(",", ".")]],
                    },
                  }])
                }else  if(host.type_connection==2  && host.connectivity==1){
                  // //console.log("microonda")
                  setMarkers2(markers2 =>[...markers2,{
                    type: 'Feature',
                    properties:{
                      correlarionid: host.relationid,
                      init_lat: host.latitudeP.replace(",", "."),
                      init_lon: host.longitudeP.replace(",", "."),
                      end_lat: host.latitudeC.replace(",", "."),
                      end_lon: host.longitudeC.replace(",", "."),
                      Metric:host.Metric,
                      name:host.name,
                      hostidC: host.hostidC,
                      hostidP: host.hostidP,
                      BitsSent: host.BitsSent,
                      color_alineacion:colorSG,
                      severity:(host.connectivity==0)?host.connectivity:host.severity,
                      type_connection: host.type_connection,
                      // severity:Math.floor(Math.random() * 4) + 1,
                      metrica:metricaSelected,
                    },
                    geometry: {
                      type: 'LineString',
                      coordinates: [[host.longitudeP.replace(",", "."), host.latitudeP.replace(",", ".")], [host.longitudeC.replace(",", "."), host.latitudeC.replace(",", ".")]],
                    },
                  }])
                }else  if(host.type_connection==2 && host.connectivity==0){
                  // //console.log("fibra optica")
                  setSwitchesDownMO(switchesDownMO =>[...switchesDownMO,{
                    type: 'Feature',
                    properties:{
                      correlarionid: host.relationid,
                      init_lat: host.latitudeP.replace(",", "."),
                      init_lon: host.longitudeP.replace(",", "."),
                      end_lat: host.latitudeC.replace(",", "."),
                      end_lon: host.longitudeC.replace(",", "."),
                      Metric:host.Metric,
                      name:host.name,
                      hostidC: host.hostidC,
                      hostidP: host.hostidP,
                      BitsSent: host.BitsSent,
                      color_alineacion:colorSG,
                      severity:0,
                      type_connection: host.type_connection,
                      // severity:Math.floor(Math.random() * 4) + 1,
                      metrica:metricaSelected,
                    },
                    geometry: {
                      type: 'LineString',
                      coordinates: [[host.longitudeP.replace(",", "."), host.latitudeP.replace(",", ".")], [host.longitudeC.replace(",", "."), host.latitudeC.replace(",", ".")]],
                    },
                  }])
                }
                
                // setMarkers([markers1,markers2])
              //   //console.log(markers1)
              //  //console.log(markers2) 
                /****************************************************************** */
                
              }
            }else{
              if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
                let colorSG='#4fb7f3'
                // let colorSG='#ffffff'
                // const hostidC = devices_data.hosts.find(obj => obj.hostid === host.hostid)
                const relation = devices_data.relations.find(obj => obj.hostid === host.hostid)
                
                let hostidP={}
                if(relation!==undefined){
                 hostidP = devices_data.hosts.find(obj => obj.hostid === relation.hostidP)
                // ////console.log(hostidP)
                }
                  let severity=0
                if(host.value===0){
                    colorSG='#1fee08'
                    severity=-1
                }else
               
                if(host.severity==1){
                  colorSG='#ffee00'
                  // severity=1
                }else if(host.severity==2){
                  colorSG='#ee9d08'
                  // severity=2
                }else if(host.severity==3){
                  colorSG='#ee5c08'
                  // severity=3
                }else if(host.severity==4){
                  colorSG='#ee0808'
                  // severity=4
                }
                //azul #4fb7f3
                // verde "#1fee08"
                setMarkers(markers=>[...markers,{
                  type: 'Feature',
                  properties:{
                    correlarionid: host.correlarionid,
                    hostidP: hostidP.hostid,
                    hostidC: host.hostid,
                    init_lat: hostidP.latitude,
                    init_lon: hostidP.longitude,
                    end_lat: host.latitude.replace(",", "."),
                    end_lon: host.longitude.replace(",", "."),
                    hostid: host.hostid,
                    name_hostP:hostidP.Host,
                    name_hostC:host.name,
                    name_hostipP:hostidP.ip,
                    name_hostipC:host.ip,
                    Alineacion: host.value,
                    color_alineacion:colorSG,
                    severity:host.severity,
                    metrica:metricaSelected,
                    lg:'lg'
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [host.longitude, host.latitude],
                  },
                }]) 
               
              }
            }
            
        }
        )
    }
    
    function objeto_relaciones(devices_data){
      ////console.log(devices_data.hosts)
      ////console.log(devices_data.relations)
      devices_data.relations.map((host, index, array)=>
          {
            // if (index === 1) {
            //   setUbicacion({latitud:host.init_lat,longitud:host.init_lon,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
            //   //console.log(host);
            // }
            if(host.length!==0 && host.init_lat.replace(",", ".")>=-90 && host.init_lat.replace(",", ".")<=90 && host.end_lat.replace(",", ".")>=-90 && host.end_lat.replace(",", ".")<=90){
              
              const hostidC = devices_data.hosts.find(obj => obj.hostid === host.hostidC)
              const hostidP = devices_data.hosts.find(obj => obj.hostid === host.hostidP)
              let hostSub=devices_data.subgroup_info.find(obj => obj.hostid === host.hostidC)
              ////console.log(host.hostidC)
              // //console.log(hostSub   )
              let alineacion=0
              let severity=0
              if(hostSub!==undefined){
                alineacion=hostSub.value
                severity=hostSub.severity
              }
              
                let colorSG='#00ff70'
                
              // if(alineacion>-60 && alineacion<=-50){
              //   colorSG='#ffee00'
              //   // severity=1
              // }else if(alineacion>-70 && alineacion<=-60){
              //   colorSG='#ee9d08'
              //   // severity=2
              // }else if(alineacion>-80 && alineacion<=-70){
              //   colorSG='#ee5c08'
              //   // severity=3
              // }else if(alineacion<=-80){
              //   colorSG='#ee0808'
              //   // severity=4
              // }
              if(severity==1){
                colorSG='#ffee00'
                // severity=1
              }else if(severity==2){
                colorSG='#ee9d08'
                // severity=2
              }else if(severity==3){
                colorSG='#ee5c08'
                // severity=3
              }else if(severity==4){
                colorSG='#ee0808'
                // severity=4
              }
              //azul #4fb7f3
              // verde "#1fee08"
              
              
              setLines(lines=>[...lines,{
                type: 'Feature',
                properties:{
                  correlarionid: host.correlarionid,
                  hostidP: hostidP.hostid,
                  hostidC: hostidC.hostid,
                  init_lat: host.init_lat,
                  init_lon: host.init_lon,
                  end_lat: host.end_lat,
                  end_lon: host.end_lon,
                  hostid: host.id,
                  name_hostP:hostidP.Host,
                  name_hostC:hostidC.Host,
                  Alineacion: alineacion,
                  color_alineacion:colorSG,
                  severity:severity,
                  metrica:metricaSelected,
                },
                geometry: {
                  type: 'LineString',
                  coordinates: [[host.init_lon, host.init_lat], [host.end_lon, host.end_lat]],
                },
              }])
              /****************************************************************** */
              
            }else{
              ////console.log(host)
            }
        }
        )
    }
    function objeto_switches(devices_data){
      //console.log("entra al objeto switches -----------------------------")
      //console.log(devices_data.subgroup_info.length)
      devices_data.subgroup_info.map((host, index, array)=>
          {
            if(ubicacion.dispId===12){
              if(host.length!==0 && host.latitudeP.replace(",", ".")>=-90 && host.latitudeP.replace(",", ".")<=90 && host.latitudeC.replace(",", ".")>=-90 && host.latitudeC.replace(",", ".")<=90){
              
                
                // //console.log("indice"+index+" | tipo:"+host.type_connection)
                // //console.log(hostSub   )
                let alineacion=0
                let severity=0
                
                
                  let colorSG='#00ff70'
                  
                
                  if(host.connectivity==1){
                    colorSG='lime'
                    // severity=1
                  }else if(host.severity==0){
                    colorSG='red'
                    // severity=2
                  }
                //azul #4fb7f3
                // verde "#1fee08"
                if(host.type_connection==1 && host.connectivity==1){
                  // //console.log("fibra optica")
                  setSwitchesFO(switchesFO =>[...switchesFO,{
                    type: 'Feature',
                    properties:{
                      correlarionid: host.relationid,
                      init_lat: host.latitudeP.replace(",", "."),
                      init_lon: host.longitudeP.replace(",", "."),
                      end_lat: host.latitudeC.replace(",", "."),
                      end_lon: host.longitudeC.replace(",", "."),
                      Metric:host.Metric,
                      name:host.name,
                      hostidC: host.hostidC,
                      hostidP: host.hostidP,
                      BitsSent: host.BitsSent,
                      color_alineacion:colorSG,
                      severity:host.severity,
                      type_connection: host.type_connection,
                      connectivity:host.connectivity,
                      // severity:Math.floor(Math.random() * 4) + 1,
                      metrica:metricaSelected,
                    },
                    geometry: {
                      type: 'LineString',
                      coordinates: [[host.longitudeP.replace(",", "."), host.latitudeP.replace(",", ".")], [host.longitudeC.replace(",", "."), host.latitudeC.replace(",", ".")]],
                    },
                  }])
                }else if(host.type_connection==1 && host.connectivity==0){
                  // //console.log("fibra optica")
                  setSwitchesDownFO(switchesDownFO =>[...switchesDownFO,{
                    type: 'Feature',
                    properties:{
                      correlarionid: host.relationid,
                      init_lat: host.latitudeP.replace(",", "."),
                      init_lon: host.longitudeP.replace(",", "."),
                      end_lat: host.latitudeC.replace(",", "."),
                      end_lon: host.longitudeC.replace(",", "."),
                      Metric:host.Metric,
                      name:host.name,
                      hostidC: host.hostidC,
                      hostidP: host.hostidP,
                      BitsSent: host.BitsSent,
                      color_alineacion:colorSG,
                      severity:host.severity,
                      type_connection: host.type_connection,
                      connectivity:host.connectivity,
                      // severity:Math.floor(Math.random() * 4) + 1,
                      metrica:metricaSelected,
                    },
                    geometry: {
                      type: 'LineString',
                      coordinates: [[host.longitudeP.replace(",", "."), host.latitudeP.replace(",", ".")], [host.longitudeC.replace(",", "."), host.latitudeC.replace(",", ".")]],
                    },
                  }])
                } else if(host.type_connection==2 && host.connectivity==1){
                  // //console.log("microonda")
                  setSwitchesMO(switchesMO =>[...switchesMO,{
                    type: 'Feature',
                    properties:{
                      correlarionid: host.relationid,
                      init_lat: host.latitudeP.replace(",", "."),
                      init_lon: host.longitudeP.replace(",", "."),
                      end_lat: host.latitudeC.replace(",", "."),
                      end_lon: host.longitudeC.replace(",", "."),
                      Metric:host.Metric,
                      name:host.name,
                      hostidC: host.hostidC,
                      hostidP: host.hostidP,
                      BitsSent: host.BitsSent,
                      color_alineacion:colorSG,
                      severity:host.severity,
                      type_connection: host.type_connection,
                      connectivity:host.connectivity,
                      // severity:Math.floor(Math.random() * 4) + 1,
                      metrica:metricaSelected,
                    },
                    geometry: {
                      type: 'LineString',
                      coordinates: [[host.longitudeP.replace(",", "."), host.latitudeP.replace(",", ".")], [host.longitudeC.replace(",", "."), host.latitudeC.replace(",", ".")]],
                    },
                  }])
                }else if(host.type_connection==2 && host.connectivity==0){
                  // //console.log("fibra optica")
                  setSwitchesDownMO(switchesDownMO =>[...switchesDownMO,{
                    type: 'Feature',
                    properties:{
                      correlarionid: host.relationid,
                      init_lat: host.latitudeP.replace(",", "."),
                      init_lon: host.longitudeP.replace(",", "."),
                      end_lat: host.latitudeC.replace(",", "."),
                      end_lon: host.longitudeC.replace(",", "."),
                      Metric:host.Metric,
                      name:host.name,
                      hostidC: host.hostidC,
                      hostidP: host.hostidP,
                      BitsSent: host.BitsSent,
                      color_alineacion:colorSG,
                      severity:host.severity,
                      type_connection: host.type_connection,
                      connectivity:host.connectivity,
                      // severity:Math.floor(Math.random() * 4) + 1,
                      metrica:metricaSelected,
                    },
                    geometry: {
                      type: 'LineString',
                      coordinates: [[host.longitudeP.replace(",", "."), host.latitudeP.replace(",", ".")], [host.longitudeC.replace(",", "."), host.latitudeC.replace(",", ".")]],
                    },
                  }])
                }
                
                // setMarkers([markers1,markers2])
              //   //console.log(markers1)
              //  //console.log(markers2) 
                /****************************************************************** */
                
              }
            }else{
             
            }
            
        }
        )
    }
    // function objeto_switches(switch_list){
    //   //console.log(switch_list)
    //   ////console.log(devices_data.relations)
    //   switch_list.map((host, index, array)=>
    //       {
    //         // if (index === 1) {
    //         //   setUbicacion({latitud:host.init_lat,longitud:host.init_lon,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
    //         //   ////console.log('Recorrido completo');
    //         // }
    //         if(host.length!==0 && host.latitude_p.replace(",", ".")>=-90 && host.latitude_p.replace(",", ".")<=90 && host.latitude_c.replace(",", ".")>=-90 && host.latitude_c.replace(",", ".")<=90){
              
             
    //             let colorSG='#00ff70'
                
              
    //           if(host.Metric==1){
    //             colorSG='#4fb7f3'
    //             // severity=1
    //           }else{
    //             colorSG='#ee0808'
    //           }
              
    //           //azul #4fb7f3
    //           // verde "#1fee08"
              
              
    //           setSwitches(lines=>[...lines,{
    //             type: 'Feature',
    //             properties:{
    //               name:host.name,
    //               date:host.Date,
    //               hostidP: host.hostidP,
    //               hostidC: host.hostidC,
    //               init_lat: host.latitude_p,
    //               init_lon: host.longitude_p,
    //               end_lat: host.latitude_c,
    //               end_lon: host.longitude_c,
    //               color_alineacion:colorSG,
    //               severity:host.Metric,
    //               metrica:metricaSelected,
    //             },
    //             geometry: {
    //               type: 'LineString',
    //               coordinates: [[host.longitude_p, host.latitude_p], [host.longitude_c, host.latitude_c]],
    //             },
    //           }])
    //           /****************************************************************** */
              
    //         }else{
    //           ////console.log(host)
    //         }
    //     }
    //     )
    // }
    /************************************************************************************ */
    function objeto_markers_wor(devices_data){
      // //console.log("WOR")
      let flag_ubicacion=false
      devices_data.hosts.map((host, index, array)=>
          {
            if (!flag_ubicacion) {
              if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90){
                setUbicacion({latitud:host.latitude,longitud:host.longitude,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
                // //console.log(host);
                flag_ubicacion=true
              }
            }
            // //console.log(host.ip,host.latitude)
            if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90){
              
              // const hostidC = devices_data.relations.find(obj => obj.hostidC === host.hostid)
              // const hostidP = devices_data.relations.find(obj => obj.hostidCP === host.hostid)
              
              // const lon = devices_data.relations.find(obj => obj.end_lon === host.longitude)
              // const lat = devices_data.relations.find(obj => obj.end_lat === host.latitude)
              const lon = devices_data.subgroup_info.find(obj => obj.longitude === host.longitude)
              const lat = devices_data.subgroup_info.find(obj => obj.latitude === host.latitude)
               
               let colorSG='#00ff70'
               let severity=0
               let tooltip=false;
               if(lon===undefined && lon===undefined){
                tooltip=true
               
               }
               else{
                tooltip=false
               }
              //azul #4fb7f3
              // verde "#1fee08"
              
              setMarkersWOR(markersWOR=>[...markersWOR,{
                type: 'Feature',
                properties:{
                  hostidC: host.hostid,
                  hostidP: '',
                  end_lat: host.latitude.replace(",", "."),
                  end_lon: host.longitude.replace(",", "."),
                  name_hostC:host.Host,
                  name_hostipC:host.ip,
                  color_alineacion:colorSG,
                  tooltip:tooltip,
                  device_id:host.device_id
                },
                geometry: {
                  type: 'Point',
                  coordinates: [host.longitude, host.latitude],
                },
              }]) 
              
              
              /****************************************************************** */
              
            }else{
              // ////console.log(host)
            }
        }
        )
    }
    function objeto_antenas(devices_data){
      devices_data.hosts.map((host, index, array)=>
          {
            // if (index === 1) {
            //   setUbicacion({latitud:host.latitude,longitud:host.longitude,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
            //   //console.log(host);
            // }
            if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
              
              
              setLatitudes(latitudes=>[...latitudes,{
                  type: 'scattermapbox',
                  lat: [host.latitude],
                  lon: [host.longitude],
                  text: [host.Host],
                  mode: 'markers',
                  hovertext:[host.Host],
                  marker: {size:[14],color:['#ffffff'],symbol:'marker'},
                  name: '',
                  hovertemplate:
                "<b>%{customdata.short_name}...</b><br><br>",
                
                hoverlabel: { bgcolor: "#181818",bordercolor:"#1fee08",namelength:20,font:{color:"#FFF"} },
                  customdata: [
                    {
                      nivel:1,
                      name:host.Host,
                      ip:host.ip,
                      id:host.hostid,
                      short_name:host.Host.slice(0, 30),
                      alineacion:0
                    }
                    ],
                    buffer: 512,
                  
              }])
              /****************************************************************** */
              
            }else{
              ////console.log(host)
            }
        }
        )
    }
    const infoMarkerStyles = {
      content: {
        top: '50%',
        left: '50%',
        background: '#363636',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'70%',
        height:'60%',
        padding:'20px'
      },
    };
    const [infoMarkerOpen, setInfoMarkerOpen] =useState(false);
      const  [infoMarker, setInfoMarker]=useState([])
      function openInfoMarker() {
        setInfoMarkerOpen(true);
      }
    
      function closeInfoMarker() {
        setInfoMarkerOpen(false);
      }
      useEffect(()=>{
        //console.log("se inicia el monitoreo")
      },[])
      const handleMarkerClick = (data) => {
        console.log(data)
        setInfoMarker(data)
        openInfoMarker()
        // Realiza las acciones deseadas al hacer clic en el marcador
      };
      function actualizar_rfi(map,popup2,rfidI){
        // //console.log(map.getSource('host-rfid'))
        try {
        //   //console.log("actualizar_rfi rfidInterval")
        // //console.log(rfidI)
        setRfidInterval(rfidI)
          setRfidData({map:map,getSource:map.getSource('host-rfid'),popup:popup2})
        
          setRfid([])
          search_rfid()
        } catch (error) {
          clearInterval(rfidI);
        }
        
        
      }

      function actualizar_layer_rfid(rfid){
        
        const popups = document.querySelectorAll('.custom-popup-rfid');
      
      popups.forEach(popup => {
       
      popup.remove();
      });
      
      // var popup;
      if(Object.keys(rfidData.map).length!==0){
        rfid.forEach((feature) => {
        const coordinates = feature.geometry.coordinates.slice();
        // //console.log(coordinates)
        const val = feature.properties.lecturas; // Asegúrate de tener esta propiedad en tus datos
        const severity = feature.properties.severidad; 
          const severity_colors={
            1:'#ffee00',
            2:'#ee9d08',
            3:'#ee5c08',
            4:'#ff0808',
          }
        let popup = new mapboxgl.Popup({
          className: 'custom-popup-rfid',
          closeButton: false,
          closeOnClick: false
          })
          .setLngLat(coordinates)
          .setHTML(`<div class='cont-rfid' style='border: 1px solid #ffffff;'>
            <div class='titleRFID'><div class='txtTitleRfid'>Trafico</div><br></div>
            <div class='valRFID' style='background: ${severity_colors[severity]}'><div class='txtRfid' style='color: ${((severity!=0)?'black !important':'lime')}'>${val}</div><br><br></div>
                
                </div>`)
                .addTo(rfidData.map);
        });
    }
        
        

      }
      function actualizar_lpr(map,popup2,lprI){
        // //console.log(map.getSource('host-rfid'))
        try {
        //   //console.log("actualizar_rfi rfidInterval")
        // //console.log(rfidI)
        setLprInterval(lprI)
          setLprData({map:map,getSource:map.getSource('host-lpr'),popup:popup2})
        
          setLpr([])
          search_lpr()
        } catch (error) {
          //console.log("error:",lprI)
          clearInterval(lprI);
          // //console.log(error)
        }
        
        
      }
      function actualizar_layer_lpr(lpr){
        
        const popups = document.querySelectorAll('.custom-popup-lpr');
      
      popups.forEach(popup => {
       
      popup.remove();
      });
      
      // var popup;
      if(Object.keys(lprData.map).length!==0){
        lpr.forEach((feature) => {
        const coordinates = feature.geometry.coordinates.slice();
        // //console.log(coordinates)
        const val = feature.properties.lecturas; // Asegúrate de tener esta propiedad en tus datos
        const severity = feature.properties.severidad; 
        const activo=feature.properties.activo;
          const severity_colors={
            1:'#ffee00',
            2:'#ee9d08',
            3:'#ee5c08',
            4:'#ff0808',
          }
        let popup = new mapboxgl.Popup({
          className: 'custom-popup-lpr',
          closeButton: false,
          closeOnClick: false
          })
          .setLngLat(coordinates)
          .setHTML(`<div class='cont-lpr' style='border: 1px solid #ffffff;'>
            <div class='titleLPR'><div class='txtTitleLpr'>Lecturas</div><br></div>
            <div class='valLPR' style='background: ${(activo==1)?severity_colors[severity]:'rgba(20, 20, 20, 0.904)'}'><div class='txtLpr' style='color: ${((severity!=0)?'black !important':'lime')}' >${(activo==1)?val:''}</div><br><br></div>
                </div>`)
                .addTo(lprData.map);
        });
    }
        
        

      }
    return (
        <>


          {
            loaderMap ?'':
            <>
            <SearchHost mapAux={mapAux} setmapAux={setmapAux} ubiActual={ubiActual} downs_list={downs_list} devices={devices} markersWOR={markersWOR}></SearchHost>
          <Notifications estadoSelected={estadoSelected} setEstadoSelected={setEstadoSelected} estados_list={estados_list} dataGlobals={dataGlobals} server={server} handleShowPopup={handleShowPopup} mapAux={mapAux} setmapAux={setmapAux} search_problems={search_problems} devices={devices}  ubiActual={ubiActual}/>

          
            </>
          }
          <RightQuadrant userPermissions={userPermissions} capas={capas} setCapas={setCapas} metricaSelected={metricaSelected} setMetricaSelected={setMetricaSelected} ubiActual={ubiActual} setUbiActual={setUbiActual}  server={server} setRfid={setRfid} search_rfid={search_rfid} setLpr={setLpr} search_lpr={search_lpr} search_switches={search_switches} search_devices={search_devices} markersWOR={markersWOR}  search_downs={search_downs} downs={downs} search_problems={search_problems} token={token_item} ubicacion={ubicacion} markers={markers}  dataHosts={devices} setUbicacion={setUbicacion} />
          {
            loaderMap?<LoadData/>:
              <>
                <ShowLayers capas={capas} setCapas={setCapas} mapAux={mapAux} setmapAux={setmapAux}  ></ShowLayers>
                {
                  allTrue?<MapBox capas={capas} setCapas={setCapas} mapAux={mapAux} setmapAux={setmapAux} search_rfid={search_rfid} search_lpr={search_lpr} actualizar_lpr={actualizar_lpr} actualizar_rfi={actualizar_rfi} global_latitude={global_latitude} global_longitud={global_longitud} global_zoom={global_zoom} devices={devices} markers={markers} markersWOR={markersWOR} lines={lines} downs={downs}towers={towers} rfid={rfid} lpr={lpr} ubicacion={ubicacion} switches={switches} switchesFO={switchesFO} switchesMO={switchesMO} handleMarkerClick={handleMarkerClick}/>:''
                }
                
                <LeftQuadrant userPermissions={userPermissions} ubiActual={ubiActual} mapAux={mapAux} setmapAux={setmapAux} server={server} zoom={zoom} setZoom={setZoom}   markersWOR={markersWOR} markers={markers} token ={token_item} setLatitudes={setLatitudes} setLongitudes={setLongitudes} setLocations={setLocations}
                  longitudes={longitudes} locations={locations} search_problems={search_problems}
                  ubicacion={ubicacion} dataHosts={devices} setUbicacion={setUbicacion} dataProblems={dataProblems} setDataProblems={setDataProblems} severityProblms={severityProblms} setSeverityProblms={setSeverityProblms}/>
                <Modal
                  isOpen={infoMarkerOpen}
                  // onAfterOpen={afterOpenExeption}
                  onRequestClose={closeInfoMarker}
                  style={infoMarkerStyles}
                  contentLabel="Example Modal2"
                  // shouldCloseOnOverlayClick={false}
                  >
                    <InfoMarker downs_list={downs_list} userPermissions={userPermissions} source={'Monitoreo'} handleShowPopup={handleShowPopup} mapAux={mapAux} setmapAux={setmapAux} search_problems={search_problems} devices={devices} server={server} isOpen={infoMarkerOpen} data={infoMarker} closeInfoMarker={closeInfoMarker} ubiActual={ubiActual}></InfoMarker>
                </Modal>
              </>
          }


        </>

        
    )
}

export default Monitoreo
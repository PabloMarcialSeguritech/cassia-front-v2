
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Container from '../components/Container'
import RightQuadrant from '../components/RightQuadrant'
import LeftQuadrant from '../components/LeftQuadrant'
import {  useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import mapboxgl from 'mapbox-gl'
import MapBox from '../components/mapbox_gl'
import LoadData from '../components/LoadData'
import aps from '../components/aps'
// import downs_list from './downs'
import Modal from 'react-modal';
import InfoMarker from '../components/InfoMarker'
import '../components/styles/MapBox.css'
import { act } from 'react-dom/test-utils'
import arcos_list from '../components/arcos'
const Monitoreo=({token_item,dataGlobals,server})=>{
  // console.log(dataGlobals)
  const global_longitud=dataGlobals.find(obj => obj.name === 'state_longitude')
  const global_latitude=dataGlobals.find(obj => obj.name === 'state_latitude')
  const global_zoom=dataGlobals.find(obj => obj.name === 'zoom')
  // console.log(arcos_list)
  token_item=localStorage.getItem('access_token')

    // const [ubicacion,setUbicacion]=useState({latitud:'20.01808757489169',longitud:'-101.21789252823293',groupid:0,dispId:11,templateId:0})
    const [ubicacion,setUbicacion]=useState({latitud:global_latitude.value,longitud:global_longitud.value,groupid:0,dispId:11,templateId:0})
    const [ubiActual,setUbiActual]=useState({municipio:'todos',groupid:0,dispId:11,templateId:0})
    const [zoom,setZoom]=useState(11)
    const [latitudes,setLatitudes]=useState([])
    const [longitudes,setLongitudes]=useState([])
    const [locations,setLocations]=useState([])
    // console.log(ubicacion)
    const [markers,setMarkers]=useState([])
    const [markersWOR,setMarkersWOR]=useState([])
    const [lines,setLines]=useState([])
    const [downs,setDowns]=useState([])
    const [towers,setTowers]=useState([])
    const [rfid,setRfid]=useState([])
     
    const [token,setToken]=useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY")
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [devices,setDevices]=useState({data:[],loading:true,error:null});
    
    const [dataProblems,setDataProblems]=useState({data:[],loading:true,error:null})
    // const downs_list=useFetch('zabbix/layers/downs',0,token_item,'GET')
    const[downs_list,setDownsList]=useState({data:[],loading:true,error:null});
    const tower_list=useFetch('zabbix/layers/aps',0,token_item,'GET',server)
    const[rfid_list,setRfidList]=useState({data:[],loading:true,error:null});
    const [rfidData,setRfidData]=useState({map:{},getSource:{},popup:null});
    const [rfidInterval,setRfidInterval]=useState(0)

    const [renderCapas,setRenderCapas]=useState({downs:false,markersWOR:false,markers:true,rfid:true})
    // console.log(renderCapas)
   const [renderMap,setRenderMap]=useState(false)
   const allTrue = Object.values(renderCapas).every(value => value === true);
// console.log(markersWOR)
useEffect(()=>{
  if (allTrue) {
    console.log('Todos los atributos están en true');
    // setRenderMap(true)
  } else {
    console.log('Al menos uno de los atributos está en false');
    console.log(renderCapas)
  }
},[renderCapas])
   useEffect(() => {
    // console.log(renderCapas.markersWOR)
    if(markersWOR.length!==0){
      console.log('El proceso de markersWOR ha terminado',markersWOR.length);
      setRenderCapas(prevState => ({
        ...prevState,
        markersWOR: true 
      }));
    }
    
    
  }, [markersWOR]); 
  useEffect(() => {
    console.log('El proceso de downs ha terminado');
    setRenderCapas(prevState => ({
      ...prevState,
      downs: true 
    }));
  }, [downs]);
  useEffect(() => {
    if(rfid.length>0){
      console.log('El proceso de rfid ha terminado');
      console.log(rfid)
      setRenderCapas(prevState => ({
        ...prevState,
        rfid: true 
      }));
    }
    
  }, [rfid]);
  useEffect(() => {
    console.log('El proceso de markers ha terminado');
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
        //console.log("pinta")
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
        console.log('actualizo rfid')
        console.log(rfid)
        actualizar_layer_rfid(rfid)
        }

    },[rfid])
    useEffect(()=>{
      if(tower_list.data.length!==0){
        //console.log("pinta")
        objeto_towers(tower_list.data.data.aps)
        }
    },[tower_list.data])
    function objeto_towers(aps){
      aps.map((host, index, array)=>
          {
            if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
              
              setTowers(towers=>[...towers,{
                type: 'Feature',
                properties:{
                  Name: host.Host,
                  latitude: host.latitude,
                  longitude: host.longitude,
                  hostid: host.hostid,
                  ip:host.ip
                },
                geometry: {
                  type: 'Point',
                  coordinates: [host.longitude, host.latitude],
                },
              }])
              
            }else{
              //console.log(host)
            }
        }
        )
    }
    
     /****************************************************************** */
     function objeto_downs(downs_list){
      downs_list.map((host, index, array)=>
          {
            if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
              
              setDowns(downs=>[...downs,{
                type: 'Feature',
                properties:{
                  Name: host.name,
                  latitude: host.latitude.replace(",", "."),
                  longitude: host.longitude.replace(",", "."),
                  hostid: host.hostid,
                  descripcion:host.description,
                  value:host.value
                },
                geometry: {
                  type: 'Point',
                  coordinates: [host.longitude.replace(",", "."), host.latitude.replace(",", ".")],
                },
              }])
              
            }else{
              //console.log(host)
            }
        }
        )
    }
    /****************************************************************** */
    function objeto_rfid(rfid_list){
      console.log("objeto rfid")
      console.log(rfid_list)
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
            //   //console.log(host)
            // }
            if(host.length!==0 && host.latitude>=-90 && host.latitude<=90 ){
            
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
              console.log(host)
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
          const devicefilter=ubicacion.dispId!==0?'?tech_host_type='+ubicacion.dispId:''
      const subtypefilter=ubicacion.templateId!==0?'subtype='+ubicacion.templateId:''
      let andAux=(devicefilter!=='' )?'&':'?'
            andAux=(subtypefilter!=='')?andAux:''
      //console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/problems/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter)
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/problems/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter, {                 
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token_item}`,
                              },
                            });
          if (response.ok) {
            const response_data = await response.json();
            setDataProblems({data:response_data.data,loading:false,error:dataProblems.error})
            // //console.log(response_data)
            
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
      search_devices()
      search_downs()
      // search_rfid()
    },[])
    function search_rfid(){
      setRfid([])
      console.log()
      console.log("borra rfid")
      setRfidList({data:[],loading:true,error:rfid_list.error})
        const fetchData = async () => {
          try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/carreteros/'+ubicacion.groupid)
         const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/carreteros/'+ubicacion.groupid, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token_item}`,
                                },
                              });
            if (response.ok) {
              const response_data = await response.json();
              console.log(response_data.data)
              console.log("arcos")
              console.log(arcos_list)
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
    function search_downs(){
      setDowns([])
      console.log("use downs",ubicacion)
        setDownsList({data:downs_list.data,loading:true,error:downs_list.error})
        const fetchData = async () => {
          try {
            
            let body = (ubicacion.dispId===0)?'':'?dispId='+ubicacion.dispId
            console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/downs/'+ubicacion.groupid+''+body)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/layers/downs/'+ubicacion.groupid+''+body, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token_item}`,
                                },
                              });
            if (response.ok) {
              const response_data = await response.json();
              setDownsList({data:response_data.data,loading:false,error:downs_list.error})
              // //console.log(response_data)
              
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
    function search_devices(){
      setRenderMap(false)
      console.log("search device ",rfidInterval)
      if(rfidInterval!==0){
        clearInterval(rfidInterval);
        setRfid([])
      }
      setRenderCapas(prevState => ({
        ...prevState,
        downs:false,
        markersWOR:false,
        markers: (ubicacion.templateId!==0)?false:true ,
        rfid:(ubicacion.dispId===9)?false:true
      }));
        setMarkers([])
        setMarkersWOR([])
        setLines([])
        setLocations([])
        setDevices({data:devices.data,loading:true,error:devices.error})
        
        
        const fetchData = async () => {
          try {
            //console.log(`Bearer ${token_item}`)
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY'; // Reemplaza con tu token de autenticación
            // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/db/hosts/relations/'+ubicacion.groupid, {
              const devicefilter=ubicacion.dispId!==0?'?dispId='+ubicacion.dispId:''
        const subtypefilter=ubicacion.templateId!==0?'subtype_id='+ubicacion.templateId:''
        let andAux=(devicefilter!=='' )?'&':'?'
              andAux=(subtypefilter!=='')?andAux:''
        // console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter)
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token_item}`,
                                },
                              });
            if (response.ok) {
              const response_data = await response.json();
              setDevices({data:response_data.data,loading:false,error:devices.error})
              // //console.log(response_data)
              
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
      //console.log("entra devices")
      if(devices.data.length!=0){
        // console.log("*************************************  UP  ************************************")
        // console.log(devices.data.hosts.length)
        // console.log("con severidad: ",devices.data.problems_by_severity)
        setLatitudes([]) 
        setLongitudes([])
        if(devices.data.hosts.length!=0){
          objeto_markers_wor(devices.data)
          
        }
        if(devices.data.relations.length!=0){
          //console.log("entra a relaciones!!!!!!!!")
          objeto_relaciones(devices.data)
        }
        if(devices.data.subgroup_info.length!=0){
          objeto_subgroup_info(devices.data)
        }else if(devices.data.hosts.length!=0 && ubicacion.dispId===2){
          objeto_antenas(devices.data)
        }
        
        
      }
      
    },[devices.data])
    function objeto_subgroup_info(devices_data){
      devices_data.subgroup_info.map((host, index, array)=>
          {
            if (index === 1) {
              setUbicacion({latitud:host.latitude,longitud:host.longitude,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
              //console.log('Recorrido completo');
            }
            if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
              let colorSG='#4fb7f3'
              // let colorSG='#ffffff'
              // const hostidC = devices_data.hosts.find(obj => obj.hostid === host.hostid)
              const relation = devices_data.relations.find(obj => obj.hostid === host.hostid)
              
              let hostidP={}
              if(relation!==undefined){
               hostidP = devices_data.hosts.find(obj => obj.hostid === relation.hostidP)
              // //console.log(hostidP)
              }
                let severity=0
              if(host.Alineacion===0){
                  colorSG='#1fee08'
                  severity=-1
              }else
              if(host.Alineacion>-60 && host.Alineacion<=-50){
                colorSG='#ffee00'
                severity=1
              }else if(host.Alineacion>-70 && host.Alineacion<=-60){
                colorSG='#ee9d08'
                severity=2
              }else if(host.Alineacion>-80 && host.Alineacion<=-70){
                colorSG='#ee5c08'
                severity=3
              }else if(host.Alineacion<=-80){
                colorSG='#ee0808'
                severity=4
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
                  Alineacion: host.Alineacion,
                  color_alineacion:colorSG,
                  severity:severity,
                  lg:'lg'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [host.longitude, host.latitude],
                },
              }]) 
             
            }else{
              //console.log(host)
            }
        }
        )
    }
    
    function objeto_relaciones(devices_data){
      //console.log(devices_data.hosts)
      //console.log(devices_data.relations)
      devices_data.relations.map((host, index, array)=>
          {
            if (index === 1) {
              setUbicacion({latitud:host.init_lat,longitud:host.init_lon,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
              //console.log('Recorrido completo');
            }
            if(host.length!==0 && host.init_lat.replace(",", ".")>=-90 && host.init_lat.replace(",", ".")<=90 && host.end_lat.replace(",", ".")>=-90 && host.end_lat.replace(",", ".")<=90){
              
              const hostidC = devices_data.hosts.find(obj => obj.hostid === host.hostidC)
              const hostidP = devices_data.hosts.find(obj => obj.hostid === host.hostidP)
              let hostSub=devices_data.subgroup_info.find(obj => obj.hostid === host.hostidC)
              //console.log(host.hostidC)
              // //console.log(hostidP)
              let alineacion=0
              if(hostSub!==undefined){
                alineacion=hostSub.Alineacion
              }
              
                let colorSG='#00ff70'
                let severity=0
              if(alineacion>-60 && alineacion<=-50){
                colorSG='#ffee00'
                severity=1
              }else if(alineacion>-70 && alineacion<=-60){
                colorSG='#ee9d08'
                severity=2
              }else if(alineacion>-80 && alineacion<=-70){
                colorSG='#ee5c08'
                severity=3
              }else if(alineacion<=-80){
                colorSG='#ee0808'
                severity=4
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
                },
                geometry: {
                  type: 'LineString',
                  coordinates: [[host.init_lon, host.init_lat], [host.end_lon, host.end_lat]],
                },
              }])
              /****************************************************************** */
              
            }else{
              //console.log(host)
            }
        }
        )
    }
    /************************************************************************************ */
    function objeto_markers_wor(devices_data){
      //console.log("WOR")
      devices_data.hosts.map((host, index, array)=>
          {
            if (index === 1) {
              setUbicacion({latitud:host.latitude,longitud:host.longitude,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
              //console.log('Recorrido completo WOR');
            }
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
                },
                geometry: {
                  type: 'Point',
                  coordinates: [host.longitude, host.latitude],
                },
              }]) 
              
              
              /****************************************************************** */
              
            }else{
              // //console.log(host)
            }
        }
        )
    }
    function objeto_antenas(devices_data){
      devices_data.hosts.map((host, index, array)=>
          {
            if (index === 1) {
              setUbicacion({latitud:host.latitude,longitud:host.longitude,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
              //console.log('Recorrido completo');
            }
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
              //console.log(host)
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
      const handleMarkerClick = (data) => {
        //console.log(data)
        setInfoMarker(data)
        openInfoMarker()
        // Realiza las acciones deseadas al hacer clic en el marcador
      };
      function actualizar_rfi(map,popup2,rfidI){
        // console.log(map.getSource('host-rfid'))
        try {
          console.log("actualizar_rfi rfidInterval")
        console.log(rfidI)
        setRfidInterval(rfidI)
          setRfidData({map:map,getSource:map.getSource('host-rfid'),popup:popup2})
        
          setRfid([])
          search_rfid()
        } catch (error) {
          console.log(error)
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
          <div class='valRFID' style='background: ${severity_colors[severity]}'><div class='txtRfid'>${val}</div><br><br></div></div>`)
              .addTo(rfidData.map);
        });
    }
        // console.log(map.getSource('host-rfid'))
        // rfidData.map.setData({
        //   type: 'FeatureCollection',
        //   features: rfid
        // })
        

      }
    
    return (
        <>
        <RightQuadrant ubiActual={ubiActual} setUbiActual={setUbiActual}  server={server} setRfid={setRfid} search_rfid={search_rfid} search_devices={search_devices} markersWOR={markersWOR}  search_downs={search_downs} downs={downs} search_problems={search_problems} token={token_item} ubicacion={ubicacion} markers={markers}  dataHosts={devices} setUbicacion={setUbicacion} />
        {
        devices.loading ?<LoadData/>:
        <>
        {
          
          allTrue?<MapBox search_rfid={search_rfid}actualizar_rfi={actualizar_rfi} global_latitude={global_latitude} global_longitud={global_longitud} global_zoom={global_zoom} devices={devices} markers={markers} markersWOR={markersWOR} lines={lines} downs={downs}towers={towers} rfid={rfid} ubicacion={ubicacion} handleMarkerClick={handleMarkerClick}/>:''
        }
        
        
        <LeftQuadrant server={server} zoom={zoom} setZoom={setZoom}   markersWOR={markersWOR} markers={markers} token ={token_item} setLatitudes={setLatitudes} setLongitudes={setLongitudes} setLocations={setLocations}
           longitudes={longitudes} locations={locations}
          ubicacion={ubicacion} dataHosts={devices} setUbicacion={setUbicacion} dataProblems={dataProblems} setDataProblems={setDataProblems}/>
        <Modal
          isOpen={infoMarkerOpen}
          // onAfterOpen={afterOpenExeption}
          onRequestClose={closeInfoMarker}
          style={infoMarkerStyles}
          contentLabel="Example Modal2"
          // shouldCloseOnOverlayClick={false}
          >
            <InfoMarker  devices={devices} server={server} isOpen={infoMarkerOpen} data={infoMarker} closeInfoMarker={closeInfoMarker} ubiActual={ubiActual}></InfoMarker>
        </Modal>
        </>
        }
        
          </>
        
    )
}

export default Monitoreo
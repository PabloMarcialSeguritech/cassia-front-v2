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


const Dashboard=({ onLogin })=>{
    const [ubicacion,setUbicacion]=useState({latitud:'21.01808757489169',longitud:'-101.25789252823293',groupid:81,dispId:0,templateId:0})
const [zoom,setZoom]=useState(6)
const [latitudes,setLatitudes]=useState([])
const [longitudes,setLongitudes]=useState([])
const [locations,setLocations]=useState([])

const [markers,setMarkers]=useState([])
const [lines,setLines]=useState([])
const [downs,setDowns]=useState([])
const [towers,setTowers]=useState([])
 
const [token,setToken]=useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY")
const [data,setData]=useState([]);
const [loading,setLoading]=useState(true);
const [error,setError]=useState(null);
const [devices,setDevices]=useState({data:[],loading:true,error:null});
console.log("aps")
console.log(aps)
console.log(towers)
console.log(devices)
console.log(ubicacion)

const [dataProblems,setDataProblems]=useState({data:[],loading:true,error:null})
const downs_list=useFetch('zabbix/layers/downs',0,token,'GET')
console.log("down list",ubicacion.groupid)
console.log(downs_list.data)

useEffect(()=>{
  
  search_problems()
  objeto_towers(aps)
  
},[])

useEffect(()=>{
  if(downs_list.data.length!==0){
    console.log("pinta")
    objeto_downs(downs_list.data.data.downs)
    }
},[downs_list.data])

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
          console.log(host)
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
              latitude: host.latitude,
              longitude: host.longitude,
              hostid: host.hostid,
              descripcion:host.description,
              value:host.value
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
  console.log('http://172.18.200.14:8002/api/v1/zabbix/problems/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter)
      const response = await fetch('http://172.18.200.14:8002/api/v1/zabbix/problems/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter, {                 
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                        });
      if (response.ok) {
        const response_data = await response.json();
        setDataProblems({data:response_data.data,loading:false,error:dataProblems.error})
        // console.log(response_data)
        
      } else {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      // Manejo de errores
      setDataProblems({data:dataProblems.data,loading:dataProblems.loading,error:error})
      console.error(error);
    }
  };
  fetchData();
}






useEffect(()=>{
  search_devices()

},[])
function search_devices(){
  console.log("use efect",ubicacion)
    setMarkers([])
    setLines([])
    setLocations([])
    setDevices({data:devices.data,loading:true,error:devices.error})
    
    
    const fetchData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY'; // Reemplaza con tu token de autenticación
        // const response = await fetch('http://172.18.200.14:8002/api/v1/zabbix/db/hosts/relations/'+ubicacion.groupid, {
          const devicefilter=ubicacion.dispId!==0?'?dispId='+ubicacion.dispId:''
    const subtypefilter=ubicacion.templateId!==0?'subtype_id='+ubicacion.templateId:''
    let andAux=(devicefilter!=='' )?'&':'?'
          andAux=(subtypefilter!=='')?andAux:''
    console.log('http://172.18.200.14:8002/api/v1/zabbix/hosts/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter)
          const response = await fetch('http://172.18.200.14:8002/api/v1/zabbix/hosts/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter, {                 
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
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
        console.error(error);
      }
    };
    fetchData();
}
useEffect(()=>{
  console.log(ubicacion.dispId)
  if(devices.data.length!=0){
    
    setLatitudes([]) 
    setLongitudes([])
    if(devices.data.relations.length!=0){
      objeto_relaciones(devices.data)
    }else if(devices.data.subgroup_info.length!=0){
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
          console.log('Recorrido completo');
        }
        if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
          let colorSG='#00ff70'
          const hostidC = devices_data.hosts.find(obj => obj.hostid === host.hostid)
          // const hostidP = devices_data.hosts.find(obj => obj.hostid === host.hostidP)
          // if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
           
            let severity=0
          if(host.Alineacion>=-59 && host.Alineacion<=-50){
            colorSG='#ffee00'
            severity=1
          }else if(host.Alineacion>=-69 && host.Alineacion<=-60){
            colorSG='#ee9d08'
            severity=2
          }else if(host.Alineacion>=-79 && host.Alineacion<=-70){
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
              hostidP: 0,
              hostidC: hostidC.hostid,
              init_lat: 0,
              init_lon: 0,
              end_lat: host.latitude,
              end_lon: host.longitude,
              hostid: host.hostid,
              name_hostP:0,
              name_hostC:hostidC.Host,
              name_hostipP:0,
              name_hostipC:hostidC.ip,
              Alineacion: host.Alineacion,
              color_alineacion:colorSG,
              severity:severity,
            },
            geometry: {
              type: 'Point',
              coordinates: [host.longitude, host.latitude],
            },
          }]) 
          console.log("setLatitu2")
          // setLatitudes(latitudes=>[...latitudes,{
          //     type: 'scattermapbox',
          //     lat: [host.latitude],
          //     lon: [host.longitude],
          //     text: [host.host],
          //     mode: 'markers',
          //     // hovertext:[host.hostid],
          //     hovertemplate:
          //   "<b>%{customdata.short_name}...</b><br><br>" +
          //   "<b>ID: </b> %{customdata.id}<br>" +
          //   "<b>IP: </b> %{customdata.ip}<br><br>" +
          //   "<b>Alineacion:  </b> <span  style='background: #fff;font-family: Arial; font-size: 14px;color:"+colorSG+"'>%{customdata.alineacion}</span><br>" +
          //   "<extra></extra>",
          //   customdata: [{
          //           nivel:2,
          //           name: host.host,
          //           alineacion:host.Alineacion,
          //           id:host.hostid,
          //           ip:host.ip,
          //           short_name: host.host.slice(0, 20)
          //         }
          //         ],
          //     // customdata: [[host.Alineacion,host.hostid,host.ip,host.host.slice(0, 20)]],
          //       opacity: 0.8,
          //       hoverlabel: { bgcolor: "#181818",bordercolor:colorSG,namelength:20,font:{color:"#FFF"} },
          //     marker: {size:8,color:[colorSG],sizeref: 4000, sizemode: "area" },
          //     name: '',
          //     buffer: 512,
          // }])
        }else{
          console.log(host)
        }
    }
    )
}

function objeto_relaciones(devices_data){
  devices_data.relations.map((host, index, array)=>
      {
        if (index === 1) {
          setUbicacion({latitud:host.init_lat,longitud:host.init_lon,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
          console.log('Recorrido completo');
        }
        if(host.length!==0 && host.init_lat.replace(",", ".")>=-90 && host.init_lat.replace(",", ".")<=90 && host.end_lat.replace(",", ".")>=-90 && host.end_lat.replace(",", ".")<=90){
          
          const hostidC = devices_data.hosts.find(obj => obj.hostid === host.hostidC)
          const hostidP = devices_data.hosts.find(obj => obj.hostid === host.hostidP)
          // if(host.length!==0 && host.latitude.replace(",", ".")>=-90 && host.latitude.replace(",", ".")<=90 ){
            let colorSG='#00ff70'
            let severity=0
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
              hostidC: hostidC.hostid,
              init_lat: host.init_lat,
              init_lon: host.init_lon,
              end_lat: host.end_lat,
              end_lon: host.end_lon,
              hostid: host.id,
              name_hostP:hostidP.Host,
              name_hostC:hostidC.Host,
              name_hostipP:hostidP.ip,
              name_hostipC:hostidC.ip,
              Alineacion: host.Alineacion,
              color_alineacion:colorSG,
              severity:severity,
            },
            geometry: {
              type: 'Point',
              coordinates: [host.end_lon, host.end_lat],
            },
          }]) 
          
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
              Alineacion: host.Alineacion,
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
          console.log(host)
        }
    }
    )
}
function objeto_antenas(devices_data){
  devices_data.hosts.map((host, index, array)=>
      {
        if (index === 1) {
          setUbicacion({latitud:host.latitude,longitud:host.longitude,groupid:ubicacion.groupid,dispId:ubicacion.dispId,templateId:ubicacion.templateId})
          console.log('Recorrido completo');
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
          console.log(host)
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
    height:'40%',
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
    console.log(data)
    setInfoMarker(data)
    openInfoMarker()
    // Realiza las acciones deseadas al hacer clic en el marcador
  };
    return(
        <div className='main' style={{height:'100%',width:'100%',position: 'absolute'}}>
      <NavBar/>
      <SideBar onLogin={onLogin}/>
      <Container>
        { 
        <>
        <RightQuadrant  search_devices={search_devices} search_problems={search_problems} token={token} ubicacion={ubicacion} markers={markers}  dataHosts={devices} setUbicacion={setUbicacion} />
        {devices.loading?<LoadData/>:
        // false?<LoadData/>:
        <>
        <MapBox devices={devices} markers={markers} lines={lines} downs={downs}towers={towers} ubicacion={ubicacion} handleMarkerClick={handleMarkerClick}/>
        
        <LeftQuadrant zoom={zoom} setZoom={setZoom} token ={token} setLatitudes={setLatitudes} setLongitudes={setLongitudes} setLocations={setLocations}
          latitudes={markers} longitudes={longitudes} locations={locations}
          ubicacion={ubicacion} dataHosts={devices} setUbicacion={setUbicacion} dataProblems={dataProblems} setDataProblems={setDataProblems}/>
        <Modal
          isOpen={infoMarkerOpen}
          // onAfterOpen={afterOpenExeption}
          onRequestClose={closeInfoMarker}
          style={infoMarkerStyles}
          contentLabel="Example Modal2"
          // shouldCloseOnOverlayClick={false}
          >
            <InfoMarker isOpen={infoMarkerOpen} data={infoMarker} closeInfoMarker={closeInfoMarker}></InfoMarker>
        </Modal>
        </>
        }
        
          </>
        


          // <>
          //   <RightQuadrant  search_devices={search_devices} search_problems={search_problems} token={token} ubicacion={ubicacion} latitudes={latitudes}  dataHosts={devices} setUbicacion={setUbicacion} />
          //   <LeftQuadrant zoom={zoom} setZoom={setZoom} token ={token} setLatitudes={setLatitudes} setLongitudes={setLongitudes} setLocations={setLocations}
          //   latitudes={latitudes} longitudes={longitudes} locations={locations}
          //   ubicacion={ubicacion} dataHosts={devices} setUbicacion={setUbicacion} dataProblems={dataProblems} setDataProblems={setDataProblems}/>
          // </>


        }
      </Container>
    </div>
    )
}

export default Dashboard
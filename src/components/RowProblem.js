import './styles/RowProblem.css'
import { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MenuAlert from './MenuAlert';

const RowProblem=(props)=>{
  // console.log(props)
  // const [infoShow,setInfoShow]=useState({severity:0,host:"",problem:"",ip:"",ack:"",ack_message:"",time:""})
  const [menuAlertOpen, setMenuAlertOpen] = useState(false);
  const [color, setColor] = useState('#43434d');
  const [ackMessage, setAckMessage] = useState('');
  // console.log(props.data)
  const openMenuAlert = () => {
// buscar_info(props.data.eventid)
    console.log(props.data)
    handleSelected(props.data)
    // console.log(props.data.longitude)
    // console.log(props.ubicacion.groupid)
    // props.setUbicacion({latitud:props.data.latitude.replace(",", "."),longitud:props.data.longitude.replace(",", "."),zoom:16,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId: props.ubicacion.templateId})
    setMenuAlertOpen(true);
  };
  const handleSelected=(element)=>{
    
    console.log(element)
    if( element.latitude.replace(",", ".")>=-90 && element.latitude.replace(",", ".")<=90){
const coordinates=[element.longitude.replace(",", "."),element.latitude.replace(",", ".")]
// console.log(coordinates)
const popups = document.querySelectorAll('.custom-popup-findHost');
  
  popups.forEach(popup => {
//    console.log(popups)
  popup.remove();
  });
  props.mapAux.setZoom(12);
  props.mapAux.setCenter(coordinates);
    let popup = new mapboxgl.Popup({
        className: 'custom-popup-findHost',
        closeButton: true,
        closeOnClick: false
        })
        .setLngLat(coordinates)
        .setHTML(`<div class='cont-findHost' style='border: 1px solid #ffffff;'>
            <div class='findHost-txt'>${element.ip}</div>
            <div class='findHost-close' > </div>
            </div>`)
        .addTo(props.mapAux);
      }
}
  const closeMenuAlert = () => {
    const popups = document.querySelectorAll('.custom-popup-findHost');
    popups.forEach(popup => {
      //    console.log(popups)
        popup.remove();
        });
    // if(props.ubicacion.groupid===0){
    //   // props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,zoom:6,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId: props.ubicacion.templateId})
    // }else{
    //   // props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,zoom:11,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId: props.ubicacion.templateId})
    // }
    setMenuAlertOpen(false);
  };
  function cambiarFormatoFecha(fechaEnFormatoMMDDYYYY) {
    const partes = fechaEnFormatoMMDDYYYY.split('/');
    const fechaEnFormatoYYYYMMDD = `${partes[2]}-${partes[1]}-${partes[0]}`;
    return fechaEnFormatoYYYYMMDD;
  }
  const calcularDiferenciaTiempo = (fechaDada, horaDada) => {
    // Convertir la fecha y hora dadas a objetos Date
    // const fechaHoraDadas = new Date(`${cambiarFormatoFecha(fechaDada)}T${horaDada}`);
    const fechaHoraDadas = new Date(`${fechaDada}T${horaDada}`)
    // Obtener la fecha y hora actuales
    const fechaHoraActual = new Date();
    // Calcular la diferencia en milisegundos
    const diferenciaEnMilisegundos = fechaHoraDadas - fechaHoraActual;
    // Calcular la diferencia en minutos y horas
    const minutos = Math.floor(Math.abs(diferenciaEnMilisegundos) / (1000 * 60));
    const horas = Math.floor(minutos / 60);
    const dias =Math.floor(horas / 24);
    const txtHrs=horas-(dias*24)
    const txtMin=minutos-(horas*60)
    const response=((dias>=1)?dias+' dias ':'')+((txtHrs>=1)?txtHrs+' hrs ':'')+((txtMin>=1)?txtMin+' min':'')
    return response;
  };
  const fechaDada = '2023-17-11';//2023-05-09
    const horaDada = '12:30:20';
    return(
      <>
      {
      (props.data.tipo==1 || (props.data.tipo==0 & props.filtraOrigen==false))?
      // (true)?
      
        <div className={'rowProblem '/*+props.data.Estatus*/} style={{background:menuAlertOpen?'#82829160':'#43434d60'}} onClick={menuAlertOpen?closeMenuAlert:openMenuAlert}>
        <span className="rowProblem-hover"> </span>
                  <div className='problemCell ' style={{width:'6%'}}>
                    {/* <div className='txtProblemCell' >
                        {props.severity}
                    </div> */}
                    {/* <div className={'sphere s'+props.data.severity}></div> */}
                    <img  src={'/iconos/alerts'+props.data.severity+'.svg'} className={' s'+props.data.severity} alt="Logo"></img>
                    <p className='txtSeverity'>{'S-'+props.data.severity}</p>
                  </div>
                  <div className='problemCell' style={{width:'26%'}}>
                    <div className='txtProblemCell' >
                    {/* {props.data.Host.length > 35 ? `${props.data.Host.slice(0, 35)}...` : props.data.Host} */}
                    { props.data.Host}
                    
                    </div>
                  </div>
                  <div className='problemCell' style={{width:'15%'}}>
                    <div className='txtProblemCell'>
                      {/* Diagnosta:<br/> */}
                      {props.data.Problem.length > 25 ? `${props.data.Problem.slice(0, 25)}...` : props.data.Problem}
                    
                    </div>
                  </div>
                  <div className='problemCell' style={{width:'10%'}}>
                    <div className='txtProblemCell'>
                    {/* {props.data.ip} */}
                    {props.data.Estatus}
                    </div>
                  </div>
                  <div className='problemCell' style={{width:'5%'}}>
                    <div className='txtProblemCell'>
                    {props.data.tipo}
                    </div>
                  </div>
                  <div className='problemCell' style={{width:'15%'}}>
                    <div className='txtProblemCell'>
                    {props.data.Ack_message.length > 20 ? `${props.data.Ack_message.slice(0, 20)}...` : props.data.Ack_message}
                       {/* {props.data.Ack_message} */}
                    </div>
                  </div>
                  <div className='problemCell'style={{width:'12%'}}>
                    <div className='txtProblemCell'>
                    {/* {calcularDiferenciaTiempo(fechaDada,horaDada)} */}
                    {calcularDiferenciaTiempo(cambiarFormatoFecha(props.data.Time.slice(0,10)), props.data.Time.slice(-8))}
                    </div>
                  </div>
                  <div className='problemCell'style={{width:'7%'}}>
                    <div className='txtProblemCell'>
                    {props.data.Time.slice(0,10)}
                    </div>
                  </div>
                  <div className='problemCell'style={{width:'7%'}}>
                    <div className='txtProblemCell'>
                    {props.data.Time.slice(-9)}
                    </div>
                  </div>
                  
      </div>:''}
    
      <MenuAlert ubiActual={props.ubiActual} search_problems={props.search_problems} server={props.server} ackMessage={ackMessage} setAckMessage={setAckMessage}isOpen={menuAlertOpen} props={props} onClose={closeMenuAlert} />
      
      </>
    )
}
export default RowProblem
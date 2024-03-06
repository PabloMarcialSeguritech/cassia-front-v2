import { useEffect, useState } from 'react'
import './styles/AnalisisModal.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import LoadSimple from '../LoadSimple'
const AnalisisModal = ({ eventId ,props}) => {
    const token_item=localStorage.getItem('access_token')
   const [dataAnalisis,setDataAnalisis]=useState({data:[],loading:true,error:null})
   console.log(dataAnalisis.data.history)
   console.log(props.data)
//    eventId=34990088

    useEffect(()=>{
        console.log('data')
        search_event()
    },[])
    function search_event(){
        setDataAnalisis({data:{},loading:true,error:dataAnalisis.error})
          const fetchData = async () => {
            // console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/cassia/diagnosta/'+props.data.ip)
            try {
              console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/cassia/diagnosta/'+props.data.ip)
           const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/cassia/diagnosta/'+props.data.ip, {                 
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token_item}`,
                                  },
                                });
              if (response.ok) {
                const response_data = await response.json();
                console.log(response_data.data)
                
                setDataAnalisis({data:response_data.data,loading:false,error:dataAnalisis.error})
                
                // setDataAnalisis(response_data.data)
              } else {
                console.log('Error en la solicitud')
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              
            }
          };
          fetchData();
      }
      const obtenerFechaActualLocal = () => {
        const ahora = new Date();
        const anio = ahora.getFullYear();
        const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // El mes se cuenta desde 0
        const dia = String(ahora.getDate()).padStart(2, '0');
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
      
        return `${anio}-${mes}-${dia}_${horas}-${minutos}`;
      };
      const generatePDF = () => {
      
        const input = document.getElementById('bodyContAnalisisModal');
  
      // Guardar el estado actual de visibilidad de los elementos que deseas ocultar
      const originalDisplay = [];
      const elementsToHide = input.querySelectorAll('.contRowTableAnalisis');
      elementsToHide.forEach(element => {
        originalDisplay.push(element.style.color);
        element.style.color = 'black';
      });
  
      html2canvas(input)
        .then((canvas) => {
          // Restaurar el estado original de visibilidad
          elementsToHide.forEach((element, index) => {
            element.style.color = originalDisplay[index];
          });
  
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG',10, 10, 190, 100);
          pdf.save('diagnosta-'+eventId+'-'+obtenerFechaActualLocal()+'.pdf');
        });
      }
    return(
        <div className='contAnalisisModal'>
            <div className='headContAnalisisModal'>
                Diagnostico del evento: {eventId}
                <div className='imgCardTitleMin' style={{left:'90%'}}>
                              <div className='imgContent' onClick={()=>{ generatePDF()}}>
                              <img  style={{top:'15%',height:'100%'}}src={"/iconos/download.png"}  className="expandLogo expandLogoD" alt="Logo" />
                              </div>
                            </div>
            </div>
            
            <div className='bodyContAnalisisModal'  id='bodyContAnalisisModal'>
            {
                (dataAnalisis.loading)?<div className='contflujoload'><LoadSimple/></div>:
                <>
                
                    <div className='contTableAnalisis'>
                    <div className='contInfoHostAnalisis'>
                    <div className='contRowTableAnalisis' style={{background:'transparent',color:'aliceblue',fontSize:'large',fontWeight:'bold'}}>
                     Datos del host diagnosticado
                            </div>
                    <div className='contRowTableAnalisis' style={{background:'transparent',color:'aliceblue',fontSize:'small'}}>
                    <p style={{fontWeight:'Bold',color:'#e8044f'}}>Host:</p> {props.data.Host}  <p style={{color:'lime',fontSize:'large'}}>&nbsp;&nbsp;{(props.data.tipo==1)?'ODD':''}</p>
                            </div>
                            <div className='contRowTableAnalisis' style={{background:'transparent',color:'aliceblue',fontSize:'small'}}>
                                <div className='controwCellTableanalisis' style={{width:'50%'}}>
                                <p style={{fontWeight:'Bold',color:'#e8044f'}}>Problem:</p> {props.data.Problem}
                                </div>
                                <div className='controwCellTableanalisis' style={{width:'50%'}}>
                                <p style={{fontWeight:'Bold',color:'#e8044f'}}>IP:</p> {props.data.ip}
                                </div>
                            
                            </div>
                            <div className='contRowTableAnalisis' style={{background:'transparent',color:'aliceblue',fontSize:'small'}}>
                                Arrastre de host dependientes:
                            </div>
                    </div>
                        <div className='contHeadTableAnalisis'>
                            <div className='contCellHeadTableAnalisis' style={{width:'15%'}}>
                                Tecnologia      
                            </div>
                            <div className='contCellHeadTableAnalisis' style={{width:'15%'}}>
                                IP
                            </div>
                            <div className='contCellHeadTableAnalisis' style={{width:'55%'}}>
                                Nombre
                            </div>
                            <div className='contCellHeadTableAnalisis' style={{width:'15%'}}>
                                Conectado
                            </div>
                        </div>
                        <div className='contBodyTableAnalisis'>
                            {
                            (dataAnalisis.loading)?<LoadSimple/>:
                            dataAnalisis.data.map((element,index)=>(
                                <div id={'contRowTableAnalisis'+index} style={{background:(element.origen==1)?'#f006':''}} className='contRowTableAnalisis'>
                                <div className='controwCellTableanalisis' style={{width:'15%'}}>
                                    {element.tech_name}
                                </div>
                                <div className='controwCellTableanalisis'style={{width:'15%'}}>
                                    {element.ip}
                                </div>
                                <div className='controwCellTableanalisis' style={{width:'55%'}}>
                                    {element.host}
                                </div>
                                <div className='controwCellTableanalisis ' style={{width:'15%',color:(element.conectado)?'lime':'red'}}>
                                    {(element.conectado)?'Conectado':'Desconectado'}
                                </div>
                            </div>
                            ))}
                            
                            
                        </div>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

export default AnalisisModal

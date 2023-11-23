import './styles/MenuAlert.css'
import { useState,useEffect } from 'react';
import Action from './Action'
import Modal from 'react-modal';
import Selector from './Selector'
import InputForm from './InputForm';
import LoadAdding from './LoadAdding';
import FlujoModal from './modals-monitoreo/FlujoModal';
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      background: 'transparent',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'30%',
      height:'50%',
      padding:'20px',
      border:'unset'
    },
  };
  const customStylesFlujo = {
    content: {
      top: '50%',
      left: '50%',
      background: 'transparent',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'50%',
      height:'90%',
      padding:'20px',
      border:'unset'
    },
  };
const MenuAlert = ({ isOpen, onClose,props }) => {
  
    const [exeptionOpen, setExeptionOpen] = useState(false);
    const [ackOpen, setAckOpen] = useState(false);
    const [ticketOpen, setTicketOpen] = useState(false);
    const [flujoOpen, setFlujoOpen] = useState(false);
    const [addingException, setAddingException] = useState(false);
    const [addingTicket, setAddingTicket] = useState(false);
    const [validaBtn, setValidaBtn] = useState(true);
    const [validaBtnTicket, setValidaBtnTicket] = useState(true);
    const [textAreaValue, setTextAreaValue] = useState('');
    const [closeEvent, setCloseEvent] = useState(false);
    const [traker, setTracker] = useState('');
    const [clock, setClock] = useState('');
    const [ResponseDetail,setResponseDetail]=useState('')
    const [dataTicket,setDataticket]=useState({event_id:props.data.eventid,tracker_id:'',clock:''})
//console.log(closeEvent)
    const handleTextAreaChange = (event) => {
      if(event.target.value.length === 0){
          setValidaBtn(true)
      }else{
          setValidaBtn(false)
      }
      
      setTextAreaValue(event.target.value);
    };
    const addException=()=>{
      //console.log("exepcio" )
      //console.log(props)
      setAddingException(true)
      
    }
    const addAck=async(e)=>{
      setAddingException(true)
      //console.log(textAreaValue,props.data.eventid)
      // //console.log("element_id:"+cisSelected.element_id+" | ci-relation:"+cisRelation)
        
        const formData = new URLSearchParams();
        formData.append("message", textAreaValue);
        formData.append("close", closeEvent);
        console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/acknowledge/'+props.data.eventid)
      
        try {
          const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/acknowledge/'+props.data.eventid, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: formData
          });
          //console.log(response)
          if (response.ok) {
            
            const data = await response.json();
            //console.log(data)
            setCloseEvent(false)
            setAckOpen(false);
            setAddingException(false)
            props.search_problems()
          } else {
            const data = await response.json();
            console.log(data.detail)
            setCloseEvent(false)
            setResponseDetail(data.detail)
            throw new Error('Error en la solicitud');
          }
        
        } catch (error) {
            
           console.log(error)
          
        }
    }
    const addTicket=async(e)=>{
      setAddingException(true)
        // setDataticket({event_id:props.data.eventid,tracker_id:traker,clock:clock})
        //console.log(dataTicket)
        try {
          const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/tickets/link', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({event_id:props.data.eventid,tracker_id:traker,clock:clock})
          });
          //console.log(response)
          if (response.ok) {
            
            const data = await response.json();
            //console.log(data)
            setTicketOpen(false);
            setAddingException(false)
            setClock('')
            setTracker('')
          } else {
            // const data = await response.json();
            // //console.log(data.detail)
            // setResponseDetail({text:data.detail,value:false})
            throw new Error('Error en la solicitud');
          }
        
        } catch (error) {
            
           //console.log(error)
          
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            closeExeption()
            
        }, 3000);
    
        // Limpiar el temporizador cuando el componente se desmonte o se actualice
        return () => clearTimeout(timer);
      }, [addingException]); 
    function openExeption() {
      setExeptionOpen(true);
      //console.log(props)
    }
  
    function afterOpenExeption() {
      // references are now sync'd and can be accessed.
      // subtitle.style.color = '#f00';
    }
  
    function closeExeption() {
      setExeptionOpen(false);
      setAddingException(false)
    }
    function closeAck() {
      setAckOpen(false);
      setResponseDetail('')
    }
    function openAck() {
      setAckOpen(true);
      //console.log(props)
    }

    function closeTicket() {
      setTicketOpen(false);
      setResponseDetail('')
    }
    function openTicket() {
      setTicketOpen(true);
      //console.log(props)
    }
  
    useEffect(()=>{
      // buscar_info()
    },[])
    const openFlujo=()=>{
      setFlujoOpen(true)
    }
    function closeFlujo() {
      setFlujoOpen(false)
    }
    const handleChangeDate=(e)=>{
      // //console.log(e.target)
      const {name,value}=e.target
      // //console.log(value)
         setClock(value)
         
    }
    useEffect(()=>{
      if(!isEmpty(traker) && !isEmpty(clock)){
        setValidaBtnTicket(false)
      }else{
        setValidaBtnTicket(true)
      }
    },[clock,traker])
    function isEmpty(value) {
      return value === null || value === undefined || value === '';
    }
    return (
      <>
        {isOpen && (
          <>
          <div className="expandInfo">
            <div className="contExpandInfo">
              <div className='rowExpand' style={{width: '75%'}}>
                <div className='infoCont'>
                    <div className='headContent'>
                      <div className='rowHeadExpand'>
                        <div className='textRowHeadExpand'> 
                          host
                        </div>
                      </div>
                      <div className='rowHeadExpand'>
                        <div className='textRowHeadExpand'> 
                          ip
                        </div>
                      </div>
                      <div className='rowHeadExpand'>
                        <div className='textRowHeadExpand'> 
                          problema
                        </div>
                      </div>
                      <div className='rowHeadExpand'>
                        <div className='textRowHeadExpand'> 
                        Last Ack Message
                        </div>
                      </div>
                      <div className='rowHeadExpand'>
                        <div className='textRowHeadExpand'> 
                        Excepción
                        </div>
                      </div>
                    </div>
                    <div className='detailContent'>
                      <div className='rowDetailExpand'>
                        <div className='textRowDetailExpand'> 
                          {props.data.Host}
                        </div>
                      </div>
                      <div className='rowDetailExpand'>
                        <div className='textRowDetailExpand'> 
                          {props.data.ip}
                        </div>
                      </div>
                      <div className='rowDetailExpand'>
                        <div className='textRowDetailExpand'> 
                          {props.data.Problem}
                        </div>
                      </div>
                      <div className='rowDetailExpand'>
                        <div className='textRowDetailExpand'> 
                          {props.data.Ack_message}
                          {/* {props.data.latitude},{props.data.longitude} */}
                        </div>
                      </div>
                      <div className='rowDetailExpand'>
                        <div className='textRowDetailExpand'> 
                          {/* {props.data.Ack_message} */}
                          {/* {props.data.latitude},{props.data.longitude} */}
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div className='rowExpand' style={{width: '25%'}}>
                <div className='rowcontActions'>
                  <div className='menuActiontitle' style={{width: "100%"}}>
                    <div className='actionsTitle'>
                    <div className='textCardTitle'>
                              ACCIONES:
                              </div>
                              
                    </div>
                    <hr className='lineTitle'></hr>
                  </div>
                  <div className='menuActionData'>
                          <div className='menuActionCell' style={{border: 'unset'}}>
                              <Action origen='General' disabled={true} titulo='excepcion' action={openExeption}/>
                          </div>
                          <div className='menuActionCell' style={{border: 'unset'}}>
                              <Action origen='General' disabled={false} titulo='Ack...' action={openAck}/>
                          </div>
                          <div className='menuActionCell' style={{border: 'unset'}}>
                              <Action origen='General' disabled={false} titulo='Flujo' action={openFlujo}/>
                          </div>
                          <div className='menuActionCell' style={{border: 'unset'}}>
                              <Action origen='General' disabled={false} titulo='Link ticket' action ={openTicket}/>
                          </div>
                      </div>
                </div>
              </div>
              
              {/* <button onClick={onClose}>Close</button> */}
            </div>
          </div>
          <Modal
          isOpen={exeptionOpen}
          onAfterOpen={afterOpenExeption}
          onRequestClose={closeExeption}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
            >
                <div className='exceptCont card'>
                <div className='menuActiontitle' style={{width: "100%"}}>
                <div className='cardTitle cardTitleAlert' style={{background:'aliceblue'}} >
                            <div className='textCardTitle' tyle={{color:'#003757',fontsize:'medium'}}>
                            CREAR EXCEPCION:
                            </div>
                        </div>
                    </div>
                    <div className='formCont'>
                        <div className='formCompact'> 
                        {addingException?<LoadAdding/>:
                        <>
                        <div className='formColumn'>
                            <InputForm   titulo='Event ID' text={props.data.eventid} disabled={true} ></InputForm>
                            </div>
                            <div className='formColumn'>
                            <Selector opGeneral={false}   txtOpGen={''}origen={'mapa'} data={props.dataAgencies.data.data} loading={props.dataAgencies.loading}  titulo='Agencia' props={props}></Selector>
                            </div>
                            <div className='formColumn'>
                            <InputForm data={[]} loading={false} text='' setValidaBtn={setValidaBtn} titulo='Notas' disabled={false}></InputForm>
                            </div>
                            <div className='formColumn'>
                            {/* <InputForm data={[]} loading={false} text='' titulo='Notas' disabled={false}></InputForm> */}
                            </div>
                            <div className='formColumn' style={{height:'50px'}}>
                            <Action origen='General' titulo='EJECUTAR' action={addException} disabled={validaBtn}/>
                            <Action origen='Alert' titulo='CANCELAR' action={closeExeption} disabled={false} />
                            </div>
                        
                        </>
                        }  
                        </div> 
                    </div>
                </div>
            </Modal>
            <Modal
          isOpen={ackOpen}
          onAfterOpen={afterOpenExeption}
          onRequestClose={closeAck}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
            >
                <div className='exceptCont card'>
                <div className='menuActiontitle' style={{width: "100%"}}>
                <div className='cardTitle cardTitleAlert' style={{background:'aliceblue'}} >
                            <div className='textCardTitle' style={{color:'#003757',fontsize:'medium'}}>

                            CREAR ACKNOWLEDGE:

                            </div>
                        </div>
                    </div>
                    <div className='formCont'>
                      <div style={{position:'absolute',width:'100%',height:'auto',display:'flex',justifyContent:'center', color:'red'}}>{ResponseDetail}</div>
                        <div className='formCompact'> 
                        {addingException?<LoadAdding/>:
                        <>
                        <div className='formColumn' >
                            <InputForm   titulo='Event ID' text={props.data.eventid} disabled={true} ></InputForm>
                            </div>
                            
                            <div className='formColumn' style={{height:'90px'}}>
                            <div className='menuSearchOption'>
            <div className='compactInputForm'>
                <label htmlFor='InputForm' className='labelInputForm'>Notas:</label>
                
                {/* <input type="text" className="InputForm" value={text==''?inputValue:text}  disabled={disabled} onChange={handleInputChange} /> */}
                <textarea id="nota" name="nota" className="InputForm" rows="4" cols="25" style={{resize: 'none'}} onChange={handleTextAreaChange}></textarea>
                
            </div>
        </div>
                            
            

                            {/* <InputForm data={[]} loading={false} text={''} setValidaBtn={setValidaBtn} titulo='Notas' disabled={false}></InputForm> */}
                            </div>
                            <div className='formColumn input-column'>

                            {
                              (props.data.r_eventid=="" || props.data.r_eventid==null)?
                              <>
                              
                            <input   value={1} name="ce" type="checkbox" id={`close-event`} onClick={()=>setCloseEvent(!closeEvent)} />
                                        <label htmlFor={`close-event`}>CERRAR EVENTO</label>
                                        
                            
                              </>:''
                            }

                            </div>
                            <div className='formColumn' style={{height:'50px'}}>
                            <Action origen='General' titulo='GUARDAR' action={addAck} disabled={validaBtn}/>
                            <Action origen='Alert' titulo='CANCELAR' action={closeAck} disabled={false} />
                            </div>
                        
                        </>
                        }  
                        </div> 
                    </div>
                </div>
            </Modal>
            <Modal
          isOpen={ticketOpen}
          onAfterOpen={afterOpenExeption}
          onRequestClose={closeTicket}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
            >
                <div className='exceptCont card'>
                <div className='menuActiontitle' style={{width: "100%"}}>
                <div className='cardTitle cardTitleAlert' style={{background:'aliceblue'}} >
                            <div className='textCardTitle' style={{color:'#003757',fontsize:'medium'}}>
                            LINK TICKET:
                            </div>
                        </div>
                    </div>
                    <div className='formCont'>
                        <div className='formCompact'> 
                        {addingException?<LoadAdding/>:
                        <>
                        <div className='formColumn' >
                            <InputForm   titulo='Event ID' text={props.data.eventid} disabled={true} ></InputForm>
                            </div>
                            <div className='formColumn' >
                            <InputForm  titulo='Tracker ID' text={traker} setText={setTracker} setValidaBtn={setValidaBtn} disabled={false} ></InputForm>
                            </div>
                            <div className='formColumn' style={{height:'50px'}}>
                            <div className='menuSearchOption'>
            <div className='compactInputForm'>
                <label htmlFor='InputForm' className='labelInputForm'>Notas:</label>
                
                <input required name="fecha_ini" className='InputForm' text={clock}  setText={setClock}  type="datetime-local" value={clock}
                          onChange={handleChangeDate} />
                {/* <textarea id="nota" name="nota" className="InputForm" rows="4" cols="25" style={{resize: 'none'}} onChange={handleTextAreaChange}></textarea> */}
                
            </div>
        </div>
                            
            

                            {/* <InputForm data={[]} loading={false} text={''} setValidaBtn={setValidaBtn} titulo='Notas' disabled={false}></InputForm> */}
                            </div>
                            
                            <div className='formColumn' style={{height:'50px',marginTop:'10%'}}>
                            <Action origen='General' titulo='GUARDAR' action={addTicket} disabled={validaBtnTicket}/>
                            <Action origen='Alert' titulo='CANCELAR' action={closeTicket} disabled={false} />
                            </div>
                        
                        </>
                        }  
                        </div> 
                    </div>
                </div>
            </Modal>
            <Modal
          isOpen={flujoOpen}
          // onAfterOpen={afterOpenExeption}
          onRequestClose={closeFlujo}
          style={customStylesFlujo}
          contentLabel="Example Modal"
          // shouldCloseOnOverlayClick={true}
            >
                <FlujoModal eventId={props.data.eventid} props={props}></FlujoModal>
            </Modal>
        </>
        )}
      </>
    );
  };

  export default MenuAlert
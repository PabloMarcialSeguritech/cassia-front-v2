import './styles/MenuAlert.css'
import { useState,useEffect } from 'react';
import Action from './Action'
import Modal from 'react-modal';
import Selector from './Selector'
import InputForm from './InputForm';
import LoadAdding from './LoadAdding';

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
const MenuAlert = ({ isOpen, onClose,props }) => {
  
    const [exeptionOpen, setExeptionOpen] = useState(false);
    const [ackOpen, setAckOpen] = useState(false);
    const [addingException, setAddingException] = useState(false);
    const [validaBtn, setValidaBtn] = useState(true);
    const [textAreaValue, setTextAreaValue] = useState('');
    
    const handleTextAreaChange = (event) => {
      if(event.target.value.length === 0){
          setValidaBtn(true)
      }else{
          setValidaBtn(false)
      }
      
      setTextAreaValue(event.target.value);
    };
    const addException=()=>{
      console.log("exepcio" )
      console.log(props)
      setAddingException(true)
      
    }
    const addAck=async(e)=>{
      setAddingException(true)
      console.log(textAreaValue,props.data.eventid)
      // console.log("element_id:"+cisSelected.element_id+" | ci-relation:"+cisRelation)
        
        const formData = new URLSearchParams();
        formData.append("message", textAreaValue);
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
          console.log(response)
          if (response.ok) {
            
            const data = await response.json();
            console.log(data)
            setAckOpen(false);
            setAddingException(false)
            
          } else {
            // const data = await response.json();
            // console.log(data.detail)
            // setResponseDetail({text:data.detail,value:false})
            throw new Error('Error en la solicitud');
          }
        
        } catch (error) {
            
           console.log(error)
          
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
      console.log(props)
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
    }
    function openAck() {
      setAckOpen(true);
      console.log(props)
    }
  
    useEffect(()=>{
      // buscar_info()
    },[])
    
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
                          problema
                        </div>
                      </div>
                      <div className='rowHeadExpand'>
                        <div className='textRowHeadExpand'> 
                        Ack message
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
                              <Action origen='Alert' disabled={true} titulo='excepcion' action={openExeption}/>
                          </div>
                          <div className='menuActionCell' style={{border: 'unset'}}>
                              <Action origen='Alert' disabled={false} titulo='Ack...' action={openAck}/>
                          </div>
                          <div className='menuActionCell' style={{border: 'unset'}}>
                              <Action origen='Alert' disabled={true} titulo='Accion 3'/>
                          </div>
                          <div className='menuActionCell' style={{border: 'unset'}}>
                              <Action origen='Alert' disabled={true} titulo='Accion 4'/>
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
                <div className='cardTitle cardTitleAlert' >
                            <div className='textCardTitle'>
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
                            <div className='formColumn'>
                            <Action origen='Alert' titulo='EJECUTAR' action={addException} disabled={validaBtn}/>
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
                <div className='cardTitle cardTitleAlert' >
                            <div className='textCardTitle'>
                            CREAR EXCEPCION:
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
                            <div className='formColumn'>
                            {/* <InputForm data={[]} loading={false} text='' titulo='Notas' disabled={false}></InputForm> */}
                            </div>
                            <div className='formColumn'>
                            <Action origen='Alert' titulo='EJECUTAR' action={addAck} disabled={validaBtn}/>
                            <Action origen='Alert' titulo='CANCELAR' action={closeAck} disabled={false} />
                            </div>
                        
                        </>
                        }  
                        </div> 
                    </div>
                </div>
            </Modal>
        </>
        )}
      </>
    );
  };

  export default MenuAlert
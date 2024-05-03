import './styles/ActionModal.css'
import { useState,useEffect } from 'react';
import Action from './Action'
import Modal from 'react-modal';
import Selector from './Selector'
import InputForm from './InputForm';
import LoadAdding from './LoadAdding';
import { useFetch } from '../hooks/useFetch'
const ActionModal = ({mode,isOpen,ip,handleShowPopup, data,actionSelected,statusPing,closeActionModal ,server}) => {
    console.log(actionSelected)
    const host=data.length===1?data[0]:data[1]
    console.log("host")
    console.log(host)
    const [dataPing,setDataPing]=useState({data:[],loading:false,error:null})
    const [ejecuta,setEjecuta]=useState(false)
    // const dataPing=useFetch('zabbix/hosts/action',actionSelected.ip+'/'+actionSelected.action_id,'','POST',server)
    console.log(dataPing)
    console.log(typeof(dataPing.data))
    const Ejecutar=()=>{
        setEjecuta(true)
        console.log("registra")
        let method='POST'
        // setLoading(true)
        setDataPing({data:dataPing.data,loading:true,error:null})
          const fetchDataPost = async () => {
            
         try {
            console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/action/',ip+'/'+actionSelected.action_id)
          
            // console.log(localStorage.getItem('access_token'))
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/action/'+ip+'/'+actionSelected.action_id, {
                // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/actionz/'+ip+'/-1', {
                method: method,  
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  },
               
              });
             console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setDataPing(data1)
                console.log(data1)
                // if(!isOpen){
                  handleShowPopup(((data1.success)?'Completado':data1.message),data1.data.action==="true"?'Acción "'+actionSelected.name+'" al dispositivo "'+ip+'" ejecutada correctamente':'Acción  "'+actionSelected.name+'" al dispositivo "'+ip+'" ejecutada sin exitó',((data1.success)?'':data1.recommendation), data1.data.action==="true"?true:false)
                // }
                setDataPing({data:data1,loading:false,error:null})
             
            
              } else {
                setDataPing({data:dataPing.data.data.action=false,loading:false,error:null})
                throw new Error('Error en la solicitud');
                
              }
            } catch (error) {
              setDataPing({data:dataPing.data,loading:false,error:null})
              handleShowPopup('Error!!!','Acción  "'+actionSelected.name+'" al dispositivo "'+ip+'" ejecutada sin exitó','Favor de reportar el error', false)
              console.error(error);
            }
          };
      
          fetchDataPost();
          
    }
    return (
      <>
        <div className={'contActionModal'+mode}>
            <div className='titlePinglModal'>
            <div className='actionsTitle'>
                    <div className='textCardTitle' style={{color:(mode==''?'#fff':'#003757')}}>
                             Ejecutar Accion:
                              </div>
                              
                    </div>
                    <hr className={'lineTitlePing'+mode}></hr>
            </div>
            <div className='contAnimationActionModal'>
               
                <div className='contAnimation' style={{width:'60%',textAlign:'center'}}>

                    {
                        (ejecuta==false)?<p className={'msgErrorPing '} >
                        {/* (false)?<p className={'msgErrorPing '} > */}
                        {'Desea ejecutar la accion "'+actionSelected.name+'" ?'}
                   </p>:
                       <>
                       { dataPing.loading===true?<section className="dots-container-action">
                       {/* { true?<section className="dots-container"> */}
                        <div className="dots-action" style={{height:'15px'}}></div>
                        <div className="dots-action" style={{height:'15px'}}></div>
                        <div className="dots-action" style={{height:'15px'}}></div>
                        <div className="dots-action" style={{height:'15px'}}></div>
                        <div className="dots-action" style={{height:'15px'}}></div>
                        <div className="dots-action" style={{height:'15px'}}></div>
                        <div className="dots-action" style={{height:'15px'}}></div>
                        <div className="dots-action" style={{height:'15px'}}></div>
                    </section>:(dataPing.data.length!=0)?
                    <p className={( dataPing.data.data.action==="true" )?'msgPing':'msgErrorPing '} >
                         {(dataPing.data.data.action==="true" )?'Acción "'+actionSelected.name+'" al dispositivo "'+ip+'" ejecutada correctamente':'Acción  "'+actionSelected.name+'" ejecutada sin exitó'}
                    </p>:<p className={'msgErrorPing '} >
                         {'Ocurrio un error y no pudo ejecutarce la accion!!!'}
                    </p>}
                       </>
                    }
                
                
                </div>
                {/* <div className=' constImg contSecondImg'>
                <div className='divImgPing'>
                    <img src="router_1.png"  className='icon-ping' alt="Logo"/>
                    </div>
                    <div className='divtextPing'>
                    {data.name_hostipC}
                    </div>
                </div> */}
            </div>
            <div className='contActionsActionModal'>
            <div className='menuActionData' style={{display:'flex'}}>
                          {(ejecuta==false)?<div className='menuActionCell' style={{border: 'unset',width:'25%'}}>
                              <Action origen='General' disabled={false} titulo={'Ejecutar'} action={Ejecutar} />
                          </div>:''}
                          <div className='menuActionCell' style={{border: 'unset',width:'25%'}}>
                              <Action origen='Alert' disabled={false} titulo={'Salir'} action={closeActionModal} />
                          </div>
                          </div>
            </div>
        </div>
             
</>
    );
  };

  export default ActionModal
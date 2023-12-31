import './styles/PingModal.css'
import { useState,useEffect } from 'react';
import Action from './Action'
import Modal from 'react-modal';
import Selector from './Selector'
import InputForm from './InputForm';
import LoadAdding from './LoadAdding';
import { useFetch } from '../hooks/useFetch'
const PingModal = ({isOpen, ip,data,actionSelected,statusPing,closePingModal ,server}) => {
    console.log(actionSelected)
    const host=data.length===1?data[0]:data[1]
    console.log("host")
    console.log('zabbix/hosts/action',ip+'/'+actionSelected.action_id)
    const dataPing=useFetch('zabbix/hosts/action',ip+'/'+actionSelected.action_id,'','POST',server)
    console.log(data)
    return (
      <>
        <div className='contPingModal'>
            <div className='titlePinglModal'>
            <div className='actionsTitle'>
                    <div className='textCardTitle'>
                             Estableciendo conexión:
                              </div>
                              
                    </div>
                    <hr className='lineTitlePing'></hr>
            </div>
            <div className='contAnimationPingModal'>
                <div className=' constImg contFirstImg'>
                    <div className='divImgPing'>
                    <img src="antena_1.png"  className='icon-ping' alt="Logo"/>
                    </div>
                    <div className='divtextPing'>
                        { dataPing.loading===true?'Buscando servidor':dataPing.data.data.ip}
                    </div>
                </div>
                <div className='contAnimation'>
                    {
                        dataPing.loading===true?<section className="dots-container">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </section>:
                    <p className={dataPing.data.data.action==="true"?'msgPing':'msgErrorPing '} >
                         {dataPing.data.data.action==="true"?'Conexión correcta':'Sin conexión'}
                    </p>
                    }
                
                
                </div>
                <div className=' constImg contSecondImg'>
                <div className='divImgPing'>
                    <img src="router_1.png"  className='icon-ping' alt="Logo"/>
                    </div>
                    <div className='divtextPing'>
                    {data.name_hostipC}
                    </div>
                </div>
            </div>
            <div className='contActionsPingModal'>
            <div className='menuActionData' style={{display:'flex'}}>
                          <div className='menuActionCell' style={{border: 'unset',width:'25%'}}>
                              <Action origen='Alert' disabled={false} titulo={dataPing.loading===true?'Cancelar':'Salir'} action={closePingModal} />
                          </div>
                          </div>
            </div>
        </div>
             
</>
    );
  };

  export default PingModal
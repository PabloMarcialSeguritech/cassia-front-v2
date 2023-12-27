import './styles/InfoMarker.css'
import { useState,useEffect } from 'react';
import Action from './Action'
import Modal from 'react-modal';
import InputForm from './InputForm';
import LoadAdding from './LoadAdding';
import PingModal from './PingModal';
import ActionModal from './ActionModal';
import HostSelector from './HostSelector'
import AlertsByHost from './AlertsByHost'
import HealthByHost from './HealthByHost';
import CarrilesArco from './CarrilesArco';
import { useFetch } from '../hooks/useFetch';
import LoadSimple from './LoadSimple';
const pingModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#363636',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'40%',
    height:'30%',
    padding:'20px'
  },
};
const InfoMarker = ({isOpen,devices,mapAux,setmapAux, data,closeInfoMarker,server,ubiActual,search_problems }) => {
  
  const ubicacion_mix=devices.data.hosts.filter(obj => obj.latitude === data.end_lat )
  // const ubicacion_mix=devices.data.hosts.filter(obj => (obj.latitude === data.end_lat && obj.longitude === data.end_lon ))
  let relation = devices.data.relations.find(obj => obj.hostidC === data.hostidC)

  const [pingModalOpen, setPingModalOpen] =useState(false);
  const [statusPing, setStatusPing] =useState(false);
  const [infoHostC,setInfoHostC]=useState([])
  const [infoHostP,setInfoHostP]=useState([])
  const [hostId,setHostId]=useState(data.hostidC)
  const [hostIdP,setHostIdP]=useState(0)
  const [listSelected,setListSelected]=useState(1)
  const [hostSelected,setHostSelected]=useState(2)
  const [actionSelected,setActionSelected]=useState({})
  console.log("infomarkerP:"+data.name_hostipC)
  const response_acciones=useFetch('zabbix/hosts/actions',data.name_hostipC,'','GET',server)
  console.log((response_acciones.loading)?'cargando acciones':response_acciones.data.data.actions)
  console.log(infoHostC)
    const hadleChangeList=(e)=>{
        setListSelected(e)
        
    }
  useEffect(() => {
    if (relation !== undefined) {
      console.log("el aps es el ", relation.hostidP);
      setHostIdP(relation.hostidP);
    }
  }, [relation]);
  
  useEffect(()=>{
    let hostidC = ubicacion_mix.find(obj => obj.hostid === hostId)
    setInfoHostC(hostidC)
    
  },[hostId])

  useEffect(()=>{
    let hostidPa = devices.data.hosts.find(obj => obj.hostid === hostIdP)
    console.log("relation P:",hostIdP)
    setInfoHostP(hostidPa)
  },[hostIdP])
  
  function openPingModal() {
    setPingModalOpen(true);
  }

  function closePingModal() {
    setPingModalOpen(false);
  }
  const handlePingClick = (data) => {
    console.log(data)
    setActionSelected(data)
    setStatusPing(true)
    openPingModal()
    // Realiza las acciones deseadas al hacer clic en el marcador
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusPing(false)
        
    }, 5000);

    // Limpiar el temporizador cuando el componente se desmonte o se actualice
    return () => clearTimeout(timer);
  }, [statusPing]); 
  const handleChangeOption=(e)=>{
setHostSelected(e)
setListSelected(1)
  }
    return (
      <>
        <div className='mainInfoMarker'>
            <div className='contInfoMarker'>
                <div className='titleInfoMarker'>
                  <div className='txtTitleInfoMarker'>Informacion general de dispositivo</div>
                </div>
                <div className='bodyInfoMarker'>
                  <div className='contHost'>
                    <div className='contCheck'>
                      <input name="radio" type="radio" className="checkHost" defaultChecked onClick={()=>handleChangeOption(2)} />
                    </div>
                    <div className='contInfoHost'>
                      <label className='lblInfoHost'>Host</label>
                      <div className='infoHost'>
                        <div className='titlesInfo'>
                          
                          <div className='headerCell' style={{width:'42%'}}>
                            <div className='txtHeaderCell' >
                                Host{ubicacion_mix.length===1?'':' ('+ubicacion_mix.length+')'}
                            </div>
                          </div>
                          <div className='headerCell' style={{width:'18%'}}>
                            <div className='txtHeaderCell'>
                                IP
                            </div>
                          </div>
                          <div className='headerCell' style={{width:'10%'}}>
                            <div className='txtHeaderCell'>
                                {/* IP */}
                                ID
                            </div>
                          </div>
                          <div className='headerCell' style={{width:'10%'}}>
                            <div className='txtHeaderCell'>
                                Nivel
                            </div>
                          </div>
                          <div className='headerCell' style={{width:'15%'}}>
                            <div className='txtHeaderCell'>
                            Tecnologia
                            </div>
                          </div>
                          {/* <div className='headerCell'style={{width:'9%'}}>
                            <div className='txtHeaderCell'>
                                Hora
                            </div>
                          </div> */}
                        </div>
                        <div className='rowInfo'>
                        {/* <div className='hostInfoCell ' style={{width:'6%'}}>
                   </div> */}
                  <div className='hostInfoCell' style={{width:'42%'}}>
                    {ubicacion_mix.length===1?
                    <div className='txtHostInfoCell' >
                    {data.name_hostC}
                  </div>
                  :
                  <HostSelector setListSelected={setListSelected} setHostId={setHostId} opGeneral={false}   txtOpGen={'N/A'} opt_de={data.hostidC} origen={'mapa'}  data={ubicacion_mix}  loading={false}  titulo='hosts' />
                  
                  }
                    
                  </div>
                  <div className='hostInfoCell' style={{width:'18%'}}>
                    <div className='txtHostInfoCell'>
                      {/* {data.name_hostipC} */}
                    {infoHostC.ip}
                    </div>
                  </div>
                  <div className='hostInfoCell' style={{width:'10%'}}>
                    <div className='txtHostInfoCell'>
                      {/* {data.hostidC} */}
                    {infoHostC.hostid}
                    </div>
                  </div>
                  <div className='hostInfoCell' style={{width:'10%'}}>
                    <div className='txtHostInfoCell'>
                      {2}
                    
                    </div>
                  </div>
                  <div className='hostInfoCell' style={{width:'15%'}}>
                    <div className='txtHostInfoCell'>
                    {/* { data.Alineacion===0?'':data.Alineacion} */}
                    
                    </div>
                  </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='contHost'>
                    {
                      infoHostP===undefined || infoHostP.length===0?<h1 className='textWOA'>Sin relacion con algun APS</h1>:
                    
                      <>
                      <div className='contCheck'>
                        <input name="radio" type="radio" className="checkHost" onClick={()=>handleChangeOption(1)} />
                      </div>
                      <div className='contInfoHost'>
                      <label className='lblInfoHost'>Host padre</label>
                        <div className='infoHost'>
                        <div className='titlesInfo'>
                          
                          <div className='headerCell' style={{width:'42%'}}>
                            <div className='txtHeaderCell' >
                              Host{ubicacion_mix.length===1?'':' ('+ubicacion_mix.length+')'}
                            </div>
                          </div>
                          <div className='headerCell' style={{width:'18%'}}>
                            <div className='txtHeaderCell'>
                                IP
                            </div>
                          </div>
                          <div className='headerCell' style={{width:'10%'}}>
                            <div className='txtHeaderCell'>
                                {/* IP */}
                                ID
                            </div>
                          </div>
                          <div className='headerCell' style={{width:'10%'}}>
                            <div className='txtHeaderCell'>
                                Nivel
                            </div>
                          </div>
                          <div className='headerCell' style={{width:'15%'}}>
                            <div className='txtHeaderCell'>
                            Tecnologia
                            </div>
                          </div>
                          {/* <div className='headerCell'style={{width:'9%'}}>
                            <div className='txtHeaderCell'>
                                Hora
                            </div>
                          </div> */}
                        </div>
                        <div className='rowInfo'>
                        {/* <div className='hostInfoCell ' style={{width:'6%'}}>
                   </div> */}
                  <div className='hostInfoCell' style={{width:'42%'}}>
                    <div className='txtHostInfoCell' >
                      {/* {data.name_hostC} */}
                      {infoHostP.Host}
                    </div>
                   </div>
                  <div className='hostInfoCell' style={{width:'18%'}}>
                    <div className='txtHostInfoCell'>
                      {/* {data.name_hostipC} */}
                    {infoHostP.ip}
                    </div>
                  </div>
                  <div className='hostInfoCell' style={{width:'10%'}}>
                    <div className='txtHostInfoCell'>
                      {/* {data.hostidC} */}
                    {infoHostP.hostid}
                    </div>
                  </div>
                  <div className='hostInfoCell' style={{width:'10%'}}>
                    <div className='txtHostInfoCell'>
                      {1}
                    
                    </div>
                  </div>
                  <div className='hostInfoCell' style={{width:'15%'}}>
                    <div className='txtHostInfoCell'>
                    {/* { data.Alineacion===0?'':data.Alineacion} */}
                    
                    </div>
                  </div>
                        </div>
                        </div>
                      </div>
                      </>
                    }
                  </div>
                </div>
                <div className='actionsInfoMarker'>
                  <div className='contActionsInfoMarker'>
                  <div className='txtHostSelected'>Dispositivo seleccionado (ID): {hostSelected===1?hostIdP:hostId}</div>
                  <div className='menu-actions'>
                     <ol className='compactactions-list' >
                        <li className={listSelected===1?'action-selected':''} onClick={() =>hadleChangeList(1)}>Acciones</li>
                        <li className={listSelected===2?'action-selected':''}  onClick={() =>hadleChangeList(2)} >Alarmas</li>
                        <li className={listSelected===3?'action-selected':''} onClick={() =>hadleChangeList(3)}>Salud</li>
                        {(ubiActual.dispId===9)?
                          <li className={listSelected===9?'action-selected':''} onClick={() =>hadleChangeList(9)}>Carriles</li>:''}
                    </ol>
                    
                  </div>
                  <div className='contActions'>
                  
                  {listSelected === 1 ? (
                    <div className='contAcciones'>
                    <div className='menuActionData' style={{display:'flex'}}>
                      {
                        (response_acciones.loading)?<LoadSimple></LoadSimple>:
                        
                        response_acciones.data.data.actions.map((elemento, indice)=>(
                          <div className='menuActionCell' style={{border: 'unset',width:'25%'}}>
                          <Action origen='General' disabled={false} titulo={elemento.name} action={()=>handlePingClick(elemento)}/>
                      </div>
                        ))
                      }
                        
                    </div>
                  </div>
                ) : listSelected === 2 ? (
                    <AlertsByHost mapAux={mapAux} setmapAux={setmapAux} search_problems={search_problems} hostId={hostSelected===1?hostIdP:hostId} server={server}></AlertsByHost>
                ) : listSelected === 3 ? (
                  <HealthByHost hostId={hostSelected===1?hostIdP:hostId} server={server}></HealthByHost>
                ) : listSelected === 9 ? (
                  <CarrilesArco hostId={hostSelected===1?hostIdP:hostId} server={server}></CarrilesArco>
                ) :''
                    }
                    
                  
                  </div>
                  </div>
                </div>
            </div>
        </div>
        <Modal
          isOpen={pingModalOpen}
          // onAfterOpen={afterOpenExeption}
          onRequestClose={closePingModal}
          style={pingModalStyles}
          contentLabel="Example Modal2"
          // shouldCloseOnOverlayClick={false}
          >
            <ActionModal actionSelected={actionSelected} server={server}isOpen={pingModalOpen} data={data} statusPing={statusPing} closeActionModal={closePingModal}></ActionModal>
            {/* <PingModal actionSelected={actionSelected} server={server}isOpen={pingModalOpen} data={data} statusPing={statusPing} closePingModal={closePingModal}></PingModal> */}
        </Modal>
      </>
    );
  };

  export default InfoMarker
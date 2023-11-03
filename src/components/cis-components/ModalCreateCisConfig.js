import Action from '../Action'
import './styles/ModalCreateCisConfig.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
import SelectorAdmin from '../SelectorAdmin'
const ModalCreateCisConfig =({server,buscar_cis_history,ci_id,setRegisterIsValid,dataCisConfig,setData,loading,setLoading,setError,setEditActiveConfig,editActiveConfig,closCreateCisModal})=>{
    console.log(dataCisConfig)
    const obtenerFechaActualLocal = () => {
        const ahora = new Date();
        const anio = ahora.getFullYear();
        const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // El mes se cuenta desde 0
        const dia = String(ahora.getDate()).padStart(2, '0');
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
      
        return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
      };
    const [loadingM,setLoadingM]=useState(false);
    const [IpValid,setIpValid]=useState(true)
    const [matchPassword,setMatchPassword]=useState(false)
    const [disabled,setDisabled]=useState(true)
    const [host,sethost]=useState([])
    // const [cisDataConf,setCisDataConf]=useState({ip:(editActiveConfig)?dataCisConfig.ip:"",host_id:(editActiveConfig)?dataCisConfig.host_id:0,date:(editActiveConfig)?dataCisConfig.date:"",responsible_name:(editActiveConfig)?dataCisConfig.responsible_name:"",auth_name:(editActiveConfig)?dataCisConfig.auth_name:"",device_description:(editActiveConfig)?dataCisConfig.device_description:"",justification:(editActiveConfig)?dataCisConfig.justification:"",previous_state:(editActiveConfig)?dataCisConfig.previous_state:"",new_state:(editActiveConfig)?dataCisConfig.new_state:"",impact:(editActiveConfig)?dataCisConfig.impact:"",result:(editActiveConfig)?dataCisConfig.result:"",observations:(editActiveConfig)?dataCisConfig.observations:"",files:(editActiveConfig)?dataCisConfig.files:[],status:(editActiveConfig)?dataCisConfig.status:'Activo'})
    const [cisDataConf,setCisDataConf]=useState({element_id:ci_id,change_type:(editActiveConfig)?dataCisConfig.change_type:"",description:(editActiveConfig)?dataCisConfig.description:"",justification:(editActiveConfig)?dataCisConfig.justification:"",hardware_no_serie:(editActiveConfig)?dataCisConfig.hardware_no_serie:"",hardware_brand:(editActiveConfig)?dataCisConfig.hardware_brand:"",hardware_model:(editActiveConfig)?dataCisConfig.hardware_model:"",software_version:(editActiveConfig)?dataCisConfig.software_version:"",responsible_name:(editActiveConfig)?dataCisConfig.responsible_name:"",auth_name:(editActiveConfig)?dataCisConfig.auth_name:"",created_at:(editActiveConfig)?dataCisConfig.created_at:obtenerFechaActualLocal(),closed_at:(editActiveConfig)?dataCisConfig.closed_at:null,status:(editActiveConfig)?dataCisConfig.status:'Iniciada'})
    const [hostName,setHostName]=useState("") 
    console.log(cisDataConf)
    const dataStatus=[
        {
          "id": 1,
          "name": "Iniciada",
        },
        {
            "id": 2,
            "name": "Cerrada",
          },
          {
            "id": 3,
            "name": "Cancelada",
          },
        
      ]
      var defOp=1;
      function buscarIdPorNombre(nombre) {
        const status = dataStatus.find(item => item.name === nombre);
        return status ? status.id : null;
      }
if(editActiveConfig){
    defOp=buscarIdPorNombre(dataCisConfig.status)
}
    console.log(defOp)
    const changeOption=(option,index)=>{
        
        console.log(option)
        let status=""
        if(option.value==1){
            status="Iniciada"
        }else if(option.value==2){
            status="Cerrada"
        }else{
            status="Cancelada"
        }
        setCisDataConf((prevState)=>{
            return {
                ...prevState,
                ['status']:status
            }
            
        })
            
    }
    const handleChange=(e)=>{
        console.log(e.target.name)
        const {name,value}=e.target
        if(e.target.name==="criticality"){
            setCisDataConf((prevState)=>{
                return {
                    ...prevState,
                    [name]:value===""?0:(parseInt(value))
                }
                
            })
        }else{
            setCisDataConf((prevState)=>{
                return {
                    ...prevState,
                    [name]:value
                }
                
            })
        }
            
          
       

        
        
      }

      useEffect(()=>{
       
            if(cisDataConf.change_type==="" || cisDataConf.description===""  || cisDataConf.justification==="" || cisDataConf.hardware_no_serie==="" || cisDataConf.hardware_brand==="" || cisDataConf.hardware_model==="" || cisDataConf.software_version==="" || cisDataConf.responsible_name==="" || cisDataConf.auth_name==="" || cisDataConf.created_at==="" ){
                console.log('disabled')
                setDisabled(true)
            }else{
                console.log('no disabled')
                setDisabled(false)
            }
      },[cisDataConf])

      const formatFecha=(fechaOriginal)=>{
        const fecha = new Date(fechaOriginal);

// Paso 2: Obtener la nueva fecha sumando el tiempo que desees
fecha.setHours(fecha.getHours() + 5);
fecha.setMinutes(fecha.getMinutes() + 47);
fecha.setSeconds(36);
fecha.setMilliseconds(26);

// Paso 3: Convertir la nueva fecha a una cadena en formato ISO 8601
const nuevaFechaISO = fecha.toISOString()
return nuevaFechaISO
      }
      const Registrar=()=>{
        console.log("registra")
        let method='POST'
        let url_add=''
        if(editActiveConfig){
            method='PUT'
            url_add=dataCisConfig.conf_id
        }
        
        console.log(method)
        console.log(JSON.stringify(cisDataConf))
        setCisDataConf((prevState)=>{
            return {
                ...prevState,
                ['created_at']:formatFecha(cisDataConf.created_at)
            }
            
        })
        console.log(JSON.stringify(cisDataConf))
        console.log(cisDataConf)
        if(cisDataConf.closed_at==""){
            setCisDataConf((prevState)=>{
                return {
                    ...prevState,
                    ['closed_at']:null
                }
                
            })
        }else{
            setCisDataConf((prevState)=>{
                return {
                    ...prevState,
                    ['closed_at']:formatFecha(cisDataConf.closed_at)
                }
                
            })
        }
        
      
        // setLoading(true)
          const fetchDataPost = async () => {
            
         try {
            console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/'+url_add)
            
            // console.log(localStorage.getItem('access_token'))
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/'+url_add, {
                method: method,  
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  },
                body: JSON.stringify(cisDataConf),
              });
             console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                // setLoading(false)
                // Manejo de la respuesta
                // setData(data1)
                // console.log(data1);
                closCreateCisModal()
            //   setRegisterIsValid(true)
              
              const timer = setTimeout(() => {
                // setRegisterIsValid(false)
                setEditActiveConfig(false)
                closCreateCisModal()
              }, 3000);
            
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
                setHostName("")
                // setCisDataConf({ip:"",host_id:0,date:"",responsible_name:"",auth_name:"",device_description:"",justification:"",previous_state:"",new_state:"",impact:"",result:"",observations:"",files:[],status:'Activo'})
                
            // setLoading(false)
              // Manejo de errores
            //   setError(error)
              closCreateCisModal()
            //   setRegisterIsValid(true)
              
              const timer = setTimeout(() => {
                // setRegisterIsValid(false)
                setEditActiveConfig(false)
                closCreateCisModal()
              }, 3000);
              console.error(error);
            }
          };
      
          fetchDataPost();
          
    }
    useEffect(()=>{
        if(editActiveConfig){
            buscar_host(dataCisConfig.ip)
        }
    },[])
    const buscar_host=(ip)=>{
        console.log("buscar_host")
        
        setLoadingM(true)
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci/search_host/'+ip)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/search_host/'+ip, {
                method: 'GET',  
                headers: {
                  'Content-Type': 'application/json',
                  'accept': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
              });
            //   console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setLoadingM(false)
                console.log(data1)
                sethost(data1.data)
                setDisabled(true)
              } else {
                const data1 = await response.json();
                console.log(data1)
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchDataPost();
        
    }

    const [fecha, setDate] = useState('2023-09-28')
    const validateIp= (ip) => {
        console.log("validando correo: ",ip )
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        let result = ipRegex.test(ip);
        if(result){
            buscar_host(ip)
        }else{
            
        }
        return result;
      };
    const {element_id,change_type,description,justification,hardware_no_serie,hardware_brand,hardware_model,software_version,responsible_name,auth_name,created_at,closed_at,status}=cisDataConf;
    return(
        <div className="modal-user-content">
            <div className='card-users modal-verificate'>
                <div className='head-card-cis'>
                    <div className='title-head-card-users'>
                        {((editActiveConfig)?'EDITAR':'CREAR')+' REGISTRO DE CONFIGURACION'}
                    </div>
                </div>
                <div className='content-card-users' style={{overflowY: 'scroll',scrollbarWidth: 'thin'}}>
                
                                    <div className="form-cis-box"> 
                                    
                                    <div className="user-box-cis">
                                    <input required name="change_type"  type="text" value={change_type}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Tipo de cambio</label>
                                        {/* {
                                            IpValid?'':<span className='form-msg-error'> Direccion ip no valida</span>
                                        } */}
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="description"  type="text" value={description}
                                    onChange={handleChange}  />
                                        <label className='label-cis  '>Descripción</label>
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    
                                        <input required name="justification"  type="text" value={justification}
                                    onChange={handleChange}  />
                                        <label className='label-cis  '>Justificación</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="hardware_no_serie"  type="text" value={hardware_no_serie}
                                    onChange={handleChange} />
                                        <label className='label-cis'>No. Serie</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="hardware_brand"  type="text" value={hardware_brand}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Marca</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="hardware_model"  type="text" value={hardware_model}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Modelo</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="software_version"  type="text" value={software_version}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Versión</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="responsible_name"  type="text" value={responsible_name}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Responsable</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="auth_name"  type="text" value={auth_name}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Autoriza</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                        <input required name="created_at"  type="datetime-local" value={created_at}
                                    onChange={handleChange} />
                                        <label className='label-cis active' >Fecha de inicio</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                     <input required name="closed_at"  type="datetime-local" value={closed_at}
                                    onChange={handleChange} />
                                        <label className='label-cis active'>Fecha fin</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    {/* <input required name="status"  type="text" value={status}
                                    onChange={handleChange} /> */}
                                    <SelectorAdmin opGeneral={false} txtOpGen={'TODOS'}  opt_de={''+defOp}origen={'Admin'} data={dataStatus} loading={false}  titulo='statusConf' selectFunction={changeOption} index={0}></SelectorAdmin>
                                        <label className='label-cis'>Status</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    
                                    <div className="user-box-cis">
                                        {
                                            (loading)?<LoadSimple></LoadSimple>
                                            :
                                            <Action disabled={disabled} origen='Login' titulo='Guardar'  action={Registrar}/>
                                        }
                                            
                                    {
                                        // (registerIsValid && data.message!=="User deleted successfully")?<span className='form-msg-ok'>Usuario registrado correctamente</span>:''
                                    }
                                        
                                    </div>
                                </div>
                </div>
                </div>
        </div>
    )
}

export default ModalCreateCisConfig
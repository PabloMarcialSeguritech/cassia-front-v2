import Action from '../Action'
import './styles/ModalCreateCis.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
const ModalCreateCis =({user,server,setRegisterIsValid,dataCis,setData,loading,setLoading,setError,setEditActive,editActive,closCreateCisModal})=>{
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
    // const [cisData,setCisData]=useState({ip:(editActive)?dataCis.ip:"",host_id:(editActive)?dataCis.host_id:0,date:(editActive)?dataCis.date:"",responsible_name:(editActive)?dataCis.responsible_name:"",auth_name:(editActive)?dataCis.auth_name:"",device_description:(editActive)?dataCis.device_description:"",justification:(editActive)?dataCis.justification:"",previous_state:(editActive)?dataCis.previous_state:"",new_state:(editActive)?dataCis.new_state:"",impact:(editActive)?dataCis.impact:"",result:(editActive)?dataCis.result:"",observations:(editActive)?dataCis.observations:"",files:(editActive)?dataCis.files:[],status:(editActive)?dataCis.status:'Activo'})
    const [cisData,setCisData]=useState({ip:(editActive)?dataCis.ip:"",host_id:0,date:(editActive)?dataCis.date:obtenerFechaActualLocal(),responsible_name:(editActive)?dataCis.responsible_name:"",auth_name:(editActive)?dataCis.auth_name:"",device_description:(editActive)?dataCis.device_description:"",justification:(editActive)?dataCis.justification:"",previous_state:(editActive)?dataCis.previous_state:"",new_state:(editActive)?dataCis.new_state:"",impact:(editActive)?dataCis.impact:"",result:(editActive)?dataCis.result:"",observations:(editActive)?dataCis.observations:"",files:[],status:(editActive)?dataCis.status:'Activo'})
    // const [cisData,setCisData]=useState({ip:"",host_id:0,date:"",responsible_name:"",auth_name:"",device_description:"",justification:"",previous_state:"",new_state:"",impact:"",result:"",observations:"",files:[],status:'Activo'})
    const [hostName,setHostName]=useState("") 
    // const [data,setData]=useState([]);
    // const [loading,setLoading]=useState(false);
    // const [error,setError]=useState(null); 
    
    // console.log(cisData)
    //     console.log(host)
        useEffect(()=>{
        //    console.log("cambio host")
           if(host.length===1){
            setHostName(host[0].name)
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    ['host_id']:host[0].hostid
                }
                
            })
           }
      },[host])
    const handleChange=(e)=>{
        console.log(e.target.name)
        const {name,value}=e.target
        
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    [name]:value
                }
                
            })
          
       
        if(e.target.name==="ip"){
            
            setIpValid(validateIp(value))
           
          }

        
        
      }

      useEffect(()=>{
       
            if(cisData.responsible_name==="" || cisData.auth_name==="" || IpValid===false || cisData.device_description==="" || cisData.justification==="" || cisData.previous_state==="" || cisData.new_state==="" || cisData.impact==="" || cisData.result==="" ){
                console.log('disabled')
                setDisabled(true)
            }else{
                console.log('no disabled')
                setDisabled(false)
            }
      },[cisData])

      
      const Registrar=()=>{
        console.log("registra")
        let method='POST'
        let url_add=''
        if(editActive){
            method='PUT'
            url_add=dataCis.ci_id
        }
        
        console.log(method)
        console.log(cisData)
        console.log(JSON.stringify(cisData))
        setLoading(true)
          const fetchDataPost = async () => {
            const formData = new FormData();

            for (const key in cisData) {
                console.log(key,cisData[key])
                if(key==='files' && cisData[key].length===0 ){
                        console.log("sin archivos")
                }else{
                    // if(key==='date'){
                    //     cisData[key]=''+cisData[key]+"T00:00:00.0"
                    // }
                    formData.append(key, cisData[key]);
                }
                
            }
            console.log(formData)
         try {
            console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/cassia/ci/'+url_add)
            console.log(JSON.stringify(cisData))
            console.log(localStorage.getItem('access_token'))
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci/'+url_add, {
                method: method,  
                headers: {
                    "Accept": "application/json",
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: formData,
              });
             console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setLoading(false)
                // Manejo de la respuesta
                setData(data1)
                // console.log(data1);
                closCreateCisModal()
              setRegisterIsValid(true)
              
              const timer = setTimeout(() => {
                setRegisterIsValid(false)
                setEditActive(false)
                closCreateCisModal()
              }, 3000);
            
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
                setHostName("")
                setCisData({ip:"",host_id:0,date:"",responsible_name:"",auth_name:"",device_description:"",justification:"",previous_state:"",new_state:"",impact:"",result:"",observations:"",files:[],status:'Activo'})
                
            setLoading(false)
              // Manejo de errores
              setError(error)
              closCreateCisModal()
              setRegisterIsValid(true)
              
              const timer = setTimeout(() => {
                setRegisterIsValid(false)
                setEditActive(false)
                closCreateCisModal()
              }, 3000);
              console.error(error);
            }
          };
      
          fetchDataPost();
          
    }
    useEffect(()=>{
        if(editActive){
            buscar_host(dataCis.ip)
        }
    },[])
    const buscar_host=(ip)=>{
        console.log("buscar_host")
        
        setLoadingM(true)
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci/search_host/'+ip)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci/search_host/'+ip, {
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
        }
        return result;
      };
    const {ip,host_id,date,responsible_name,auth_name,device_description,justification,previous_state,new_state,impact,result,observations,files}=cisData;
    return(
        <div className="modal-user-content">
            <div className='card-users modal-verificate'>
                <div className='head-card-cis'>
                    <div className='title-head-card-users'>
                        {((editActive)?'EDITAR':'CREAR')+' REGISTRO DE CONFIGURACION'}
                    </div>
                </div>
                <div className='content-card-users' style={{overflowY: 'scroll',scrollbarWidth: 'thin'}}>
                
                                    <div className="form-cis-box"> 
                                    
                                    <div className="user-box-cis">
                                    <input required name="ip"  type="text" value={ip}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Host IP</label>
                                        {
                                            IpValid?'':<span className='form-msg-error'> Direccion ip no valida</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="host_id" placeholder='Ingrese una direccion IP' type="text" value={hostName}
                                    onChange={handleChange} disabled />
                                        <label className='label-cis active '>Host name</label>
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="date"  type="datetime-local" value={date}
                                    onChange={handleChange} />
                                        <label className='label-cis active' >Fecha de ejecución</label>
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
                                        <label className='label-cis'>Autorizado por:</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="device_description"  type="text" value={device_description}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Descripción</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="justification"  type="text" value={justification}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Justificación</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="previous_state"  type="text" value={previous_state}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Estado previo</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="new_state"  type="text" value={new_state}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Estado Nuevo</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="impact"  type="text" value={impact}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Impacto</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                        <input required name="result"  type="text" value={result}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Resultado</label>
                                       
                                        
                                    </div>
                                    <div className="user-box-cis">
                                        <input required name="observations"  type="text" value={observations}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Observaciones</label>
                                        {
                                            // (new_password_confirmation==="" || matchPassword)?'':<span className='form-msg-error'>Las contraseñas no coinciden</span>
                                        }
                                        
                                    </div>
                                    {/* <div className="user-box-cis">
                                        <input required name="files"  type="file" value={files}
                                    onChange={handleChange} />
                                        <label className='label-cis active'>Anexar archivos</label>
                                        {
                                            // (new_password_confirmation==="" || matchPassword)?'':<span className='form-msg-error'>Las contraseñas no coinciden</span>
                                        }
                                        
                                    </div> */}
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

export default ModalCreateCis
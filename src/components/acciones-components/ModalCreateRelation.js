import Action from '../Action'
import './styles/ModalCreateRelation.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
const ModalCreateRelation =({user,server,registerIsValid,setRegisterIsValid,actionSelectedAux,closCreateRelationModal})=>{
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
    const [loading,setLoading]=useState(false);
    // const [registerIsValid,setRegisterIsValid]=useState(false)
    const [IpValid,setIpValid]=useState(true)
    const [matchPassword,setMatchPassword]=useState(false)
    const [disabled,setDisabled]=useState(true)
    const [host,sethost]=useState([])
    // console.log(host.length)
    // const [cisData,setCisData]=useState({ip:(editActive)?dataCis.ip:"",host_id:(editActive)?dataCis.host_id:0,date:(editActive)?dataCis.date:"",responsible_name:(editActive)?dataCis.responsible_name:"",auth_name:(editActive)?dataCis.auth_name:"",device_description:(editActive)?dataCis.device_description:"",justification:(editActive)?dataCis.justification:"",previous_state:(editActive)?dataCis.previous_state:"",new_state:(editActive)?dataCis.new_state:"",impact:(editActive)?dataCis.impact:"",result:(editActive)?dataCis.result:"",observations:(editActive)?dataCis.observations:"",files:(editActive)?dataCis.files:[],status:(editActive)?dataCis.status:'Activo'})
    // const [cisData,setCisData]=useState({ip:(editActive)?dataCis.ip:"",host_id:0,folio:(editActive)?dataCis.folio:"",technology:(editActive)?dataCis.technology:"",device_name:(editActive)?dataCis.device_name:"",description:(editActive)?dataCis.description:"",location:(editActive)?dataCis.location:"",criticality:(editActive)?dataCis.criticality:0,status:(editActive)?dataCis.status:"Inactivo"})
    // const [cisData,setCisData]=useState({ip:(editActive)?dataCis.ip:"",host_id:0,date:(editActive)?dataCis.date:obtenerFechaActualLocal(),responsible_name:(editActive)?dataCis.responsible_name:"",auth_name:(editActive)?dataCis.auth_name:"",device_description:(editActive)?dataCis.device_description:"",justification:(editActive)?dataCis.justification:"",previous_state:(editActive)?dataCis.previous_state:"",new_state:(editActive)?dataCis.new_state:"",impact:(editActive)?dataCis.impact:"",result:(editActive)?dataCis.result:"",observations:(editActive)?dataCis.observations:"",files:[],status:(editActive)?dataCis.status:'Activo'})
    // const [cisData,setCisData]=useState({ip:"",host_id:0,date:"",responsible_name:"",auth_name:"",device_description:"",justification:"",previous_state:"",new_state:"",impact:"",result:"",observations:"",files:[],status:'Activo'})
    
    const [hostName,setHostName]=useState("") 
    const [ip,setIp]=useState("")
    const handleChange=(e)=>{
        console.log(e.target.name)
        const {name,value}=e.target
        
            
        setIp(value)
       
        if(e.target.name==="ip"){
            
            setIpValid(validateIp(value))
           
          }

        
        
      }
      useEffect(()=>{
       sethost([])
  },[IpValid])
      useEffect(()=>{
       
            if((IpValid==false && host.length===0)|| ip==""){
                console.log('disabled')
                setDisabled(true)
            }else{
                console.log('no disabled')
                setDisabled(false)
            }
      },[host])

      useEffect(()=>{
       
        if(registerIsValid){
            closCreateRelationModal()
        }
  },[registerIsValid])
      const Registrar=()=>{
        console.log("registra")
        let method='POST'
        let url_add=''
       
        
        const formData = new URLSearchParams();
        formData.append("affected_interface_id", host.interfaceid);
        
        setLoading(true)
          const fetchDataPost = async () => {
            
         try {
            console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/relations/'+actionSelectedAux.action_id)
          
            // console.log(localStorage.getItem('access_token'))
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/relations/'+actionSelectedAux.action_id, {
                method: method,  
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                  },
                  body: formData
              });
             console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setLoading(false)
                // Manejo de la respuesta
                // setData(data1)
                // console.log(data1);
                
              setRegisterIsValid(true)
              
              
            
              } else {
                const data = await response.json();
            console.log(data.detail)
            setRegisterIsValid(false)
            // setResponseDetail({text:data.detail,value:false})
            throw new Error('Error en la solicitud');
              }
            } catch (error) {
                setHostName("")
                // setCisData({ip:"",host_id:0,date:"",responsible_name:"",auth_name:"",device_description:"",justification:"",previous_state:"",new_state:"",impact:"",result:"",observations:"",files:[],status:'Activo'})
                setRegisterIsValid(false)
            setLoading(false)
             
            }
          };
      
          fetchDataPost();
          
    }
    
    const buscar_host=(ip)=>{
        console.log("buscar_host")
        
        setLoadingM(true)
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/search_host/'+ip)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/search_host/'+ip, {
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
                if(data1.data.length>0){
                    setLoadingM(false)
                    console.log(data1)
                    sethost(data1.data[0])
                    setDisabled(true)
                }else{
                    console.log("no existe")
                    setIpValid(false)
                }
                
              } else {
                // const data1 = await response.json();
                // console.log(data1)
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
    // const {ip,host_id,folio,technology,device_name,description,location,criticality,status}=cisData;
    return(
        <div className="modal-user-content">
            <div className='card-users modal-verificate'>
                <div className='head-card-accManage-modal-create'>
                    <div className='title-head-card-users'>
                        {'Crear relacion con la acción id: '+actionSelectedAux.action_id}
                    </div>
                </div>
                <div className='content-card-users' style={{overflowY: 'scroll',scrollbarWidth: 'thin'}}>
                
                                    <div className="form-accManage-box"> 
                                    
                                    <div className="user-box-accManage">
                                    <input required name="ip"  type="text" value={ip}
                                    onChange={handleChange} />
                                        <label className='label-accManage'>Host IP</label>
                                        {
                                            IpValid?'':<span className='form-msg-error'> Direccion ip no valida</span>
                                        }
                                        
                                    </div>
                                    <div className='cont-accManage-info' style={{height:'60%'}}>
                    <div className='row-accManage-info'>
                        <div className='cont-title-accManage-info'>
                            <div className='title-accManage-info'>
                                Host ID
                            </div>
                        </div>
                        <div className='cont-box-accManage-info'>
                            <div className='box-accManage-info'>
                                {(loadingM)?'...':host.hostid}
                            </div>
                        </div>
                    </div>
                    <div className='row-accManage-info'>
                        <div className='cont-title-accManage-info'>
                            <div className='title-accManage-info'>
                            Interface ID
                            </div>
                        </div>
                        <div className='cont-box-accManage-info'>
                            <div className='box-accManage-info'>
                                {(loadingM)?'...':host.interfaceid}
                            </div>
                        </div>
                    </div>
                    <div className='row-accManage-info'>
                        <div className='cont-title-accManage-info' style={{width:'20%'}}>
                            <div className='title-accManage-info'>
                                Host
                            </div>
                        </div>
                        <div className='cont-box-accManage-info' style={{width:'80%'}}>
                            <div className='box-accManage-info' style={{fontSize:'x-small'}}>
                                {(loadingM)?'...':host.name}
                            </div>
                        </div>
                    </div>
                </div>
                                    
                                    <div className="user-box-accManage">
                                        {
                                            (loading)?<LoadSimple></LoadSimple>
                                            :
                                            <>
                                            <Action disabled={disabled} origen='Login' titulo='Guardar'  action={Registrar}/>
                                            <Action disabled={false} origen='Cancelar' titulo='Cancelar'  action={closCreateRelationModal}/>
                                            </>
                                           
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

export default ModalCreateRelation
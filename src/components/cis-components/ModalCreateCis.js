import Action from '../Action'
import './styles/ModalCreateCis.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
import SelectorAdmin from '../SelectorAdmin';
const ModalCreateCis =({user,devices,server,setRegisterIsValid,dataCis,setData,loading,setLoading,setError,setEditActive,editActive,closCreateCisModal})=>{
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
    const [cisData,setCisData]=useState({ip:(editActive)?dataCis.ip:"",host_id:0,tech_id:(editActive)?dataCis.tech_id:"",device_name:(editActive)?dataCis.device_name:"",description:(editActive)?dataCis.description:"",location:(editActive)?dataCis.location:"",criticality:(editActive)?dataCis.criticality:0,status:(editActive)?dataCis.status:"Inactivo",referencia:(editActive)?dataCis.referencia:""})
    const [hostName,setHostName]=useState("") 
    const [hostLocation,setHostLocation]=useState("") 
    const [hostActivate,setHostActivate]=useState(0)
    console.log(hostActivate)
    const tec_list=useFetch('cassia/ci_elements/technologies','','','GET',server)
    const [msgError,setMsgError]=useState("")
    const [listSearchIP,setListSearchIP]=useState(false)
    console.log(cisData)
    //     console.log(host)
        useEffect(()=>{
        //    console.log("cambio host")
           if(host.length>=1){
            console.log("escribe")
            setHostName(host[0].name)
            setHostLocation(host[0].location)
            setHostActivate(host[0].status)
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    ['location']:host[0].location
                }
                
            })
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    ['host_id']:host[0].hostid
                }
                
            })
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    ['status']:(host[0].status!=0)?"Activo":"Inactivo"
                }
                
            })
           }else{
            console.log("borra")
            setHostName("")
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    ['host_id']:0
                }
                
            })
            // setCisData((prevState)=>{
            //     return {
            //         ...prevState,
            //         ['device_name']:""
            //     }
                
            // })
           }
      },[host])
      
    const handleChange=(e)=>{
        console.log(e.target.name)
        const {name,value}=e.target
        if(e.target.name==="criticality"){
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    [name]:value===""?0:(parseInt(value))
                }
                
            })
        }  else if(e.target.name==="status"){
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    [name]:(value=="Inactivo")?"Activo":"Inactivo"
                }
                
            })
        }else{
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    [name]:value
                }
                
            })
        }
            
          
       
        if(e.target.name==="ip"){
            if(value==""){
                setHostLocation("")
                setHostActivate(0)
                setIpValid(true)
                sethost([])
                setHostName("")
                setHostLocation("")
            }else{
                setIpValid(validateIp(value))
            }
           
           
          }

        
        
      }

      useEffect(()=>{
       
            if( (cisData.tech_id===0 || cisData.tech_id==="") || IpValid===false  || cisData.location==="" || cisData.new_state==="" || cisData.criticality==="" || cisData.status==="" ){
                console.log('disabled')
                setDisabled(true)
            }else{
                console.log('no disabled')
                setDisabled(false)
            }
      },[cisData])

      
      const Registrar=()=>{
        console.log("registra dataCis ----------------------------------------------------------")
        console.log(dataCis)
        let method='POST'
        let url_add=''
        if(editActive){
            method='PUT'
            url_add=dataCis.element_id
        }
        
        console.log(method)
        console.log(cisData)
        
        console.log(JSON.stringify(cisData))
        
        setLoading(true)
          const fetchDataPost = async () => {
            
         try {
            console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+url_add)
          
            // console.log(localStorage.getItem('access_token'))
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+url_add, {
                method: method,  
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  },
                body: JSON.stringify(cisData),
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
                if(data1.data.length==0){
                    sethost([])
                setHostName("")
                setHostLocation("")
                setHostActivate(0)
                    setMsgError("La IP no existe o no esta dada de alta")
                    setIpValid(false)
                }else{
                    setIpValid(true)

                }
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
    const changeOption=(option,index)=>{
        
        console.log(option)
        setCisData((prevState)=>{
            return {
                ...prevState,
                ['tech_id']:option.value===""?0:(parseInt(option.value))
            }
            
        })
        // setCisRelation(option.value)
            
    }
    const [fecha, setDate] = useState('2023-09-28')
    const validateIp= (ip) => {
        console.log("validando correo: ",ip )
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        let result = ipRegex.test(ip);
        if(result){
            buscar_host(ip)
        }else{
            setHostLocation("")
            setMsgError("Direccion ip no valida")
            sethost([])
                setHostName("")
                setHostLocation("")
                setHostActivate(0)
        }
        return result;
      };
      const [resultList,setResultList]=useState([])
      const handleSearchHost=(e)=>{
        
        const term = e.target.value;
        const {name,value}=e.target
        if(name=="ip"){
            setCisData((prevState)=>{
                return {
                    ...prevState,
                    ['ip']:value
                }
                
            })
        }
        // console.log(value)
        // setInputIP(value)
        setIpValid(validateIp(value))
        
        const filteredResults = devices.data.hosts.filter((item) => {
            
            return Object.entries(item).some(([key, value]) => {
              if (key === 'ip' || key=== 'Host') {
                return String(value).toLowerCase().includes(term.toLowerCase());
              }
              return false; // Si no es el atributo 'ip', retorna falso para continuar buscando en otros atributos
            });
          });
       
          setResultList(filteredResults)
      }
      
    //   console.log(resultList)
    const handleSelected=(element)=>{
        console.log(element)
        setIpValid(validateIp(element.ip))
        setCisData((prevState)=>{
            return {
                ...prevState,
                ['ip']:element.ip
            }
            
        })
        setListSearchIP(false)
    }
    const closeListSearch=()=>{
        setListSearchIP(false)
    }
    const {ip,host_id,tech_id,referencia,device_name,description,criticality,status}=cisData;
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
                                        {
                                            (listSearchIP)?<div className='closeListSearch' onClick={closeListSearch}>X</div>:''
                                        }
                                    
                                    <input required name="ip"  placeholder='Buscar por IP/Host' type="text" value={ip}
                                    onChange={handleSearchHost} onFocus={()=>{setListSearchIP(true)}} onBlur={()=>{setListSearchIP(true)}} />
                                    <div className={`container-searchHostCis-list ${!true ? 'large' : 'small'}`}>
                
                   
                    {(listSearchIP)?
                    
                    <div className={`compact-searchHostCis-list ${!true ? 'large' : 'small'}`}>
                    {
                        (2==="" )?'':(resultList.length==0)?<div className='row-searchHostCis-list' >
                        Sin Resultados
                    </div>:
                        
                        resultList.map((element, index) => (
                            <div className='row-searchHostCis-list' id={index} onClick={()=>handleSelected(element)}>
                                <div className='cont-row-searchHostCis-txt'>
                                    <div className='ip-row-searchHostCis' >{element.ip+" / "}</div>
                                    <div> &nbsp; {element.Host}</div>
                                    {(element.latitude.replace(",", ".")<-90 || element.latitude.replace(",", ".")>90)?
                                    <div style={{color:'red'}}> &nbsp; coordenadas erroneas</div>:''
                                    }
                                    
                                </div>
                                {/* {(flagSearch)?element.ip:element.Host} */}
                            </div>
                        ))
                       
                            
                    }
                    
                     
                </div>:''}
                
               
            </div>
                                        <label className='label-cis active'>Host IP</label>
                                        {
                                            IpValid?'':<span className='form-msg-error'> {msgError}</span>
                                        }
                                        
                                    </div>
                                    
                                    <div className="user-box-cis">
                                    <input required name="host_id" style={{background: "#ddd"}} placeholder='Realize una busqueda de dispositivo' type="text" value={hostName}
                                    onChange={handleChange} disabled />
                                        <label className='label-cis active '>Host name</label>
                                        
                                    </div>
                                   
                                    <div className="user-box-cis">
                                        {
                                            (tec_list.loading)?'. . .':
                                            <SelectorAdmin placeholder={'Seleccionar tecnología...'} opGeneral={true} txtOpGen={'TODOS'}  opt_de={tech_id} origen={'Admin'} data={tec_list.data.data} loading={tec_list.loading}  titulo='CisTec' selectFunction={changeOption} index={0}></SelectorAdmin>

                                        }
                                    {/* <input required name="technology"  type="text" value={technology}
                                    onChange={handleChange} />*/}
                                        <label className='label-cis'>Tecnologia</label> 
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input disabled required name="device_name" style={{background: "#ddd"}}   className='read' type="text" value={device_name}
                                    onChange={handleChange} />
                                        <label className='label-cis active'>Nombre Dispositivo</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="description"  type="text" value={description}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Descripción</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    {/* <input required name="date"  type="datetime-local" value={date}
                                    onChange={handleChange} />
                                        <label className='label-cis active' >Fecha de ejecución</label> */}
                                        <input required name="referencia"  type="text" value={referencia}
                                    onChange={handleChange}  />
                                        <label className='label-cis  '>Referencia</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input disabled name="location"  style={{background: "#ddd"}}  placeholder='Realize una busqueda de dispositivo' type="text" value={hostLocation}
                                    onChange={handleChange} />
                                        <label className='label-cis active '>Ubicación</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
                                    <input required name="criticality"  type="text" value={criticality}
                                    onChange={handleChange} />
                                        <label className='label-cis'>Criticidad</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-cis">
      {hostActivate === 1 ? (
        <input
          required
          name="status"
          disabled
          defaultChecked={true}
          className='checkbox-cis'
          type="checkbox"
          value={status}
          onChange={handleChange}
        />
      ) : (
        <></>
      )}
      <label className='label-checkbox-cis'>{(hostActivate==1)?'Activo':'Desactivado'}</label>
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

export default ModalCreateCis
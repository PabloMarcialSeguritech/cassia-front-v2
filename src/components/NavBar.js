import './styles/NavBar.css'
import SelectorAdmin from './SelectorAdmin'
import { useFetch } from '../hooks/useFetch'
import { useState,useEffect } from 'react'
import LoadSimple from './LoadSimple'
import Action from './Action'
const NavBar =({login_state,setServer,statusLoginState,setStatusLoginState,msgCharge,loadGlobals,dataGlobals,estados_list,server,nameState,estadoActivo,setEstadoActivo,estadoSelected,setEstadoSelected,dataPingEstado,object_state_sessions,set_object_state_sessions,statusChangeState,setStatusChangeState})=>{
  
  console.log(loadGlobals,estadoActivo.id)
  var object_state=''
    var [aux_user_cassia,set_aux_user_cassia]=useState({aux_user_cassia:'',aux_pass_cassia:''})

const [disabled,setDisabled]=useState(true)
const [disabled2,setDisabled2]=useState(false)
    const handleChange=(e)=>{
        console.log(e.target.name)
        
        const {name,value}=e.target
        set_aux_user_cassia((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
            
        })
      
    }
    useEffect(()=>{
    
        if(aux_user_cassia.aux_user_cassia==="" || aux_user_cassia.aux_pass_cassia===""){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
  },[aux_user_cassia])
    if(estados_list.data.data!==undefined && dataGlobals!=undefined ){
        if(!localStorage.getItem('aux_change_state')){
            console.log('no existe la variable')
            const multi_state=dataGlobals.find(obj => obj.name === 'change_state')
        console.log(multi_state)
        localStorage.setItem('aux_change_state',multi_state.value)
        }
        
        const state_id=dataGlobals.find(obj => obj.name === 'state_id')
       console.log(state_id)
    //    object_state=estados_list.data.data.find(obj => obj.name === (nameState.charAt(0).toUpperCase()+nameState.slice(1)))
       object_state=estados_list.data.data.find(obj => obj.id == state_id.value)
        setEstadoActivo(object_state)
        console.log('validacion del navbar')
         if(Object.values(object_state_sessions).length==0){
            console.log("hara validacion de local storage ", localStorage.getItem('object_state_sessions'))
            console.log()
            if(!localStorage.getItem('object_state_sessions')){
                console.log('no existe localstorage')
                console.log(" creara un nuevo objeto +++++++++++++++++++")
                set_object_state_sessions((prevObj) => ({
                    ...prevObj,
                    [Object.keys(prevObj).length ]: { id:object_state.id,name:object_state.name,server:server.ip,port:server.port,user:'juan.marcial@seguritech.com',pass:'12345678',access_token:localStorage.getItem('access_token')},
            
                }))
                localStorage.setItem('object_state_sessions',1)
            }else{
                console.log('no existe localstorage')
                console.log(" obtendra el objeto de local storage -------------------------")
                set_object_state_sessions(JSON.parse(localStorage.getItem('object_state_sessions')))
                localStorage.setItem('object_state_sessions',1)
            }
         }else{

         }
    }

    const manual_login_state=()=>{
        console.log('manual_login_state' ,localStorage.getItem('aux_server_ip'))
        localStorage.setItem('aux_user_cassia',aux_user_cassia.aux_user_cassia)
        localStorage.setItem('aux_pass_cassia',aux_user_cassia.aux_pass_cassia)
        setDisabled(true)
        setDisabled2(true)
        setServer({ip:localStorage.getItem('aux_server_ip'),port:server.port})

    }
    const accionar_estado=(e)=>{
        
        const object_selected=estados_list.data.data.find(obj => obj.name === e.label)
        
        setEstadoSelected(object_selected)
    }
    return(
        <nav className="NavBar">
            <div className="logo">
                <img src="SeguriTech-logo-blanco.png" alt="Logo"/>
            </div>
            <div className='spacing'>

            </div>
            <div className='ContSelectState'>
                {
                    (!statusChangeState && localStorage.getItem('aux_change_state')==1)?
                   ((loadGlobals)?'': <SelectorAdmin opGeneral={false} txtOpGen={'TODOS'}  opt_de={estadoActivo.id} origen={'Admin'} data={estados_list.data.data} loading={estados_list.loading}  titulo='Estados' selectFunction={accionar_estado} index={1}></SelectorAdmin>):''
                    // (dataPingEstado.data.available)?
                    // <SelectorAdmin opGeneral={false} txtOpGen={'TODOS'}  opt_de={estadoActivo.id} origen={'Admin'} data={estados_list.data.data} loading={estados_list.loading}  titulo='Estados' selectFunction={'accionar_estado'} index={1}></SelectorAdmin>:
                    // <>{dataPingEstado.error}</>
                    
                }
            </div>
            <div className='Title'>
                <img src="logo_cassia.png"  style={{height: '50%'}} alt="Logo"/>
                {/* <h1 className='textTitle'>CASSIA</h1> */}

            </div>
            
            {
                (statusChangeState)?
                <div className='contConection '>
                <div className='contLoadConection'>
                    {
                        (dataPingEstado.loading)?<LoadSimple></LoadSimple>:
                         <img
                        className='img-field-close-graf-modal'
                        src='/iconos/close.png'
                        title='Agregar'
                        name='Agregar'
                        onClick={()=>{setStatusChangeState(false);setStatusLoginState(true)}}
                      />
                    }
                </div>
                <div className='contTextConection'>
                {(dataPingEstado.loading)?msgCharge:(dataPingEstado.data!=0 && !dataPingEstado.data.available)?dataPingEstado.error:msgCharge}
                </div>
            </div>:''
            }
            {
                (!statusLoginState)?
                <div className='contLoginState'>
                <div className='contTextInfo'>
                    Ingrese las credenciales correctas para este estado.
                </div>
                <div className='contLoginForm'>
                    <div className='compactLoginForm'>
                    <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Name" name='aux_user_cassia' onChange={handleChange} required=""/>
                    <label for="name" className="form__label">Usuario</label>
                </div>
                <div className="form__group field">
                    <input type="password" className="form__field" placeholder="Name" name='aux_pass_cassia' onChange={handleChange} required=""/>
                    <label for="name" className="form__label">Contraseña</label>
                </div>
                    </div>
                </div>
                <div className='contSubmit'>
                <Action origen='General' disabled={disabled} titulo={'Ingresar'} action={()=>{manual_login_state()}} />
                <Action origen='Alert' disabled={disabled2} titulo={'Cancelar'} action={()=>{setStatusLoginState(true);setStatusChangeState(false)}} />
                </div>
            </div>:''
            }
        </nav>
    )
}

export default NavBar
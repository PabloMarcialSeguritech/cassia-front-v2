import './styles/NavBar.css'
import SelectorAdmin from './SelectorAdmin'
import { useFetch } from '../hooks/useFetch'
import { useState } from 'react'
import LoadSimple from './LoadSimple'
import Action from './Action'
const NavBar =({statusLoginState,msgCharge,dataGlobals,estados_list,server,nameState,estadoActivo,setEstadoActivo,estadoSelected,setEstadoSelected,dataPingEstado,object_state_sessions,set_object_state_sessions,statusChangeState,setStatusChangeState})=>{
//   console.log(dataPingEstado)
//   console.log(estadoActivo)
//   console.log(estadoSelected)
  var object_state=''
    if(estados_list.data.data!==undefined && dataGlobals!=undefined ){
        
        const state_id=dataGlobals.find(obj => obj.name === 'state_id')
       
    //    object_state=estados_list.data.data.find(obj => obj.name === (nameState.charAt(0).toUpperCase()+nameState.slice(1)))
       object_state=estados_list.data.data.find(obj => obj.id == state_id.value)
        setEstadoActivo(object_state)
         if(Object.values(object_state_sessions).length==0){
            set_object_state_sessions((prevObj) => ({
                ...prevObj,
                [Object.keys(prevObj).length ]: { id:object_state.id,name:object_state.name,server:server.ip,port:server.port,user:'juan.marcial@seguritech.com',pass:'12345678',access_token:localStorage.getItem('access_token')},
        
              }))
         }else{

         }
    }

    
    const accionar_estado=(e)=>{
        
        const object_selected=estados_list.data.data.find(obj => obj.name === e.label)
        // console.log(object_selected)
        setEstadoSelected(object_selected)
    }
    return(
        <nav className="NavBar">
            <div className="logo">
                <img src="SeguriTech-logo-blanco.png" alt="Logo"/>
            </div>
            <div className='spacing'>

            </div>
            <div className='Title'>
                <img src="logo_cassia.png"  style={{height: '50%'}} alt="Logo"/>
                {/* <h1 className='textTitle'>CASSIA</h1> */}

            </div>
            <div className='ContSelectState'>
                {
                    (!statusChangeState)?
                    <SelectorAdmin opGeneral={false} txtOpGen={'TODOS'}  opt_de={estadoActivo.id} origen={'Admin'} data={estados_list.data.data} loading={estados_list.loading}  titulo='Estados' selectFunction={accionar_estado} index={1}></SelectorAdmin>:''
                    // (dataPingEstado.data.available)?
                    // <SelectorAdmin opGeneral={false} txtOpGen={'TODOS'}  opt_de={estadoActivo.id} origen={'Admin'} data={estados_list.data.data} loading={estados_list.loading}  titulo='Estados' selectFunction={'accionar_estado'} index={1}></SelectorAdmin>:
                    // <>{dataPingEstado.error}</>
                    
                }
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
                        onClick={()=>setStatusChangeState(false)}
                      />
                    }
                </div>
                <div className='contTextConection'>
                {(dataPingEstado.loading)?msgCharge:(dataPingEstado.data!=0 && !dataPingEstado.data.available)?dataPingEstado.error:msgCharge}
                </div>
            </div>:''
            }
            {
                (false)?
                <div className='contLoginState'>
                <div className='contTextInfo'>
                    Ingrese las credenciales correctas para este estado.
                </div>
                <div className='contLoginForm'>
                    <div className='compactLoginForm'>
                    <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Name" required=""/>
                    <label for="name" class="form__label">Usuario</label>
                </div>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Name" required=""/>
                    <label for="name" class="form__label">Contraseña</label>
                </div>
                    </div>
                </div>
                <div className='contSubmit'>
                <Action origen='General' disabled={false} titulo={'Ejecutar'} action={()=>{}} />
                <Action origen='Alert' disabled={false} titulo={'Cancelar'} action={()=>{}} />
                </div>
            </div>:''
            }
        </nav>
    )
}

export default NavBar
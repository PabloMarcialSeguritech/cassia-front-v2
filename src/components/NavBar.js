import './styles/NavBar.css'
import SelectorAdmin from './SelectorAdmin'
import { useFetch } from '../hooks/useFetch'
import { useState } from 'react'
const NavBar =({estados_list,nameState,estadoActivo,setEstadoActivo,estadoSelected,setEstadoSelected,dataPingEstado,object_state_sessions,set_object_state_sessions})=>{
//   console.log(dataPingEstado)
//   console.log(dataPingEstado.data)
  var object_state=''
    // if(estados_list.data.data!==undefined){
        
    // //    object_state=estados_list.data.data.find(obj => obj.name === (nameState.charAt(0).toUpperCase()+nameState.slice(1)))
    //    object_state=estados_list.data.data.find(obj => obj.name === 'Edo. Mex')
    // setEstadoActivo(object_state)
    // }

    
    const accionar_estado=(e)=>{
        
        const object_selected=estados_list.data.data.find(obj => obj.name === e.label)
        console.log(object_selected)
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
            {/* <div className='ContSelectState'>
                {
                    (dataPingEstado.loading)?
                    'Estableciendo ping con el servidor ...':
                    (dataPingEstado.data==0)?
                    <SelectorAdmin opGeneral={false} txtOpGen={'TODOS'}  opt_de={9} origen={'Admin'} data={estados_list.data.data} loading={estados_list.loading}  titulo='Estados' selectFunction={accionar_estado} index={1}></SelectorAdmin>:
                    (dataPingEstado.data.available)?
                    <SelectorAdmin opGeneral={false} txtOpGen={'TODOS'}  opt_de={9} origen={'Admin'} data={estados_list.data.data} loading={estados_list.loading}  titulo='Estados' selectFunction={accionar_estado} index={1}></SelectorAdmin>:
                    <>{dataPingEstado.error}</>
                    
                }
            

            </div> */}
        
        </nav>
    )
}

export default NavBar
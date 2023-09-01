import { useState } from 'react'
import './styles/SideBar.css'
const SideBar =({rolId,onLogin,pageSelected,setPageSelected})=>{
    const handleSection=(e)=>{
       
        console.log(e.target.attributes.name.value)
        setPageSelected(e.target.attributes.name.value)
    }
    return(
        <div className="sidebar">
            
            <div className={'sidebarRow '+(pageSelected==="perfil"?'sideRowSelected':'')} >
                <div className={'sidebarCont '+(pageSelected==="perfil"?'sideSelected':'')} name="perfil" onClick={handleSection} >
                    <div className='imgSideCont' name="perfil" >
                        <img src={'/iconos/perfil'+(pageSelected==="perfil"?'-blanco.png':'.png')} name="perfil"/>
                    </div>
                    <div className='textSideCont' name="perfil" >
                        PERFIL
                    </div>
                </div>
            </div>
            <div className={'sidebarRow '+(pageSelected==="monitoreo"?'sideRowSelected':'')}>
                <div className={'sidebarCont '+(pageSelected==="monitoreo"?'sideSelected':'')} name="monitoreo" onClick={handleSection}>
                
                <div className='imgSideCont' name="monitoreo" >
                <img src={'/iconos/monitoreo'+(pageSelected==="monitoreo"?'-blanco.png':'.png')} name="monitoreo" />
                {/* <img src="/iconos/monitoreo-blanco.png"/> */}
                    </div>
                    <div className='textSideCont ' name="monitoreo" >
                        MONITOREO
                    </div>
                </div>
            </div>
            {
                (rolId===1)?
            
             <div className={'sidebarRow '+(pageSelected==="panel-admin"?'sideRowSelected':'')}>
                <div className={'sidebarCont '+(pageSelected==="panel-admin"?'sideSelected':'')} name="panel-admin" onClick={handleSection}>
                
                <div className='imgSideCont' name="panel-admin" >
                <img src={'/iconos/panel-admin'+(pageSelected==="panel-admin"?'-blanco.png':'.png')} name="panel-admin" />
                
                    </div>
                    <div className='textSideCont ' name="panel-admin" >
                        ADMIN.
                    </div>
                </div>
            </div> 
            :
            ''
            }
            <div className="sidebarRow">
                <div className='sidebarCont ' onClick={onLogin} >
                    <div className='imgSideCont'>
                    <img src="/iconos/log-out-red.svg"/>
                    </div>
                    <div className='textSideCont'>
                        SALIR
                    </div>
                </div>
            </div>
       <div className='sideLogo'> 
       <img src="logo-spin.png"  className='icon-seguritech' alt="Logo"/>
       </div>
      </div>
    )
}

export default SideBar
import { useState } from 'react'
import './styles/SideBar.css'
const SideBar =({rolId,onLogin,pageSelected,setPageSelected,dataGlobals})=>{
    const handleSection=(e)=>{
       
        console.log(e.target.attributes.name.value)
        setPageSelected(e.target.attributes.name.value)
    }
    var estado=''
    var reportes=0
    var cis=0
    if(dataGlobals!==undefined){
        estado=dataGlobals.find(obj => obj.name === 'estado')
        reportes=dataGlobals.find(obj => obj.name === 'report_module')
        cis=dataGlobals.find(obj => obj.name === 'ci_module')
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
            {
                (cis.value==1)?
                <div className={'sidebarRow '+(pageSelected==="cis"?'sideRowSelected':'')}>
                    <div className={'sidebarCont '+(pageSelected==="cis"?'sideSelected':'')} name="cis" onClick={handleSection}>
                    
                    <div className='imgSideCont' name="cis" >
                    <img src={'/iconos/cis'+(pageSelected==="cis"?'-blanco.png':'.png')} name="cis" />
                    
                        </div>
                        <div className='textSideCont ' name="cis" >
                        CI's
                        </div>
                    </div>
                </div>:''
            }
            {
                (reportes.value==1)?
                <div className={'sidebarRow '+(pageSelected==="reportes"?'sideRowSelected':'')}>
                    <div className={'sidebarCont '+(pageSelected==="reportes"?'sideSelected':'')} name="cireportess" onClick={handleSection}>
                    
                    <div className='imgSideCont' name="reportes" >
                    <img src={'/iconos/reportes'+(pageSelected==="reportes"?'-blanco.png':'.png')} name="reportes" />
                    
                        </div>
                        <div className='textSideCont ' name="reportes" >
                        REPORTES
                        </div>
                    </div>
                </div>:''
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
       {/* <img src="logo-spin.png"  className='icon-seguritech' alt="Logo"/> */}
       <img src={"/escudos/"+(typeof(estado.value)==='undefined'?estado.value:estado.value.toLowerCase().replaceAll(" ", ""))+".svg"}  className='icon-state' alt="Logo"/>
       {/* <label>Guanajuato</label> */}
       <div className='textSideCont ' style={{textTransform: 'capitalize'}} name="estado" >
                       {(estado==='')?'':estado.value}
                    </div>
       </div>
      </div>
    )
}

export default SideBar
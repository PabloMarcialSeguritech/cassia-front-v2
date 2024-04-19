import { useState } from 'react'
import './styles/SideBar.css'
import {permisos_codigo_id} from '../components/generales/GroupsId'
const SideBar =({userPermissions,rolId,onLogin,pageSelected,setPageSelected,dataGlobals})=>{
    console.log(userPermissions)
    // console.log(permisos_codigo_id)
    // const existePermiso = userPermissions.some(objeto => objeto.permission_id === permisos_codigo_id['cis']);
    // console.log(existePermiso);
    const handleSection=(e)=>{
       
        setPageSelected(e.target.attributes.name.value)
    }
    var estado=''
    var reportes=0
    var cis=0
    var acciones=0
    var hosts=0
    var buzon=0
    if(dataGlobals.data.data!==undefined){
        console.log(dataGlobals.data.data)
        estado=dataGlobals.data.data.find(obj => obj.name === 'estado')
        reportes=dataGlobals.data.data.find(obj => obj.name === 'report_module')
        cis=dataGlobals.data.data.find(obj => obj.name === 'ci_module')
        acciones=dataGlobals.data.data.find(obj => obj.name === 'action_module')
        hosts=0
        buzon=dataGlobals.data.data.find(obj => obj.name === 'mail_module')
        console.log(buzon)
    }
    
    return(
        <div className="sidebar">
            {
                (dataGlobals.loading || dataGlobals.error)?'':
            
            <>
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
{(userPermissions.some(objeto => objeto.permission_id === permisos_codigo_id['monitor']))?
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
            </div>:''
            }
            {
                (userPermissions.some(objeto => objeto.permission_id === permisos_codigo_id['admin']))?
            
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
                (cis.value==1 && userPermissions.some(objeto => objeto.permission_id === permisos_codigo_id['cis']))?
                <div className={'sidebarRow '+(pageSelected==="cis"?'sideRowSelected':'')}>
                    <div className={'sidebarCont '+(pageSelected==="cis"?'sideSelected':'')} name="cis" onClick={handleSection}>
                    
                    <div className='imgSideCont' name="cis" >
                    <img src={'/iconos/cis'+(pageSelected==="cis"?'-blanco.png':'.png')} name="cis" />
                    
                        </div>
                        <div className='textSideCont ' name="cis" >
                        CMDB
                        </div>
                    </div>
                </div>:''
            }
            {
                (reportes.value==1 && userPermissions.some(objeto => objeto.permission_id === permisos_codigo_id['reportes']))?
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
            {
                (acciones.value==1 && userPermissions.some(objeto => objeto.permission_id === permisos_codigo_id['acciones']))?
                <div className={'sidebarRow '+(pageSelected==="acciones"?'sideRowSelected':'')}>
                    <div className={'sidebarCont '+(pageSelected==="acciones"?'sideSelected':'')} name="acciones" onClick={handleSection}>
                    
                    <div className='imgSideCont' name="acciones" >
                    <img src={'/iconos/acciones'+(pageSelected==="acciones"?'-blanco.png':'.png')} name="acciones" />
                    
                        </div>
                        <div className='textSideCont ' name="acciones" >
                        ACCIONES
                        </div>
                    </div>
                </div>:''
            }
            {
                (hosts==1)?
                <div className={'sidebarRow '+(pageSelected==="host-manage"?'sideRowSelected':'')}>
                    <div className={'sidebarCont '+(pageSelected==="host-manage"?'sideSelected':'')} name="host-manage" onClick={handleSection}>
                    
                    <div className='imgSideCont' name="host-manage" >
                    <img src={'/iconos/host-manage'+(pageSelected==="host-manage"?'-blanco.png':'.png')} name="host-manage" />
                    
                        </div>
                        <div className='textSideCont ' name="host-manage" >
                        HOSTS
                        </div>
                    </div>
                </div>:''
            }
            {
                (buzon.value==1 && userPermissions.some(objeto => objeto.permission_id === permisos_codigo_id['buzon']))?
                <div className={'sidebarRow '+(pageSelected==="buzon"?'sideRowSelected':'')}>
                    <div className={'sidebarCont '+(pageSelected==="buzon"?'sideSelected':'')} name="buzon" onClick={handleSection}>
                    
                    <div className='imgSideCont' name="buzon" >
                    <img src={'/iconos/buzon'+(pageSelected==="buzon"?'-blanco.png':'.png')} name="buzon" />
                    
                        </div>
                        <div className='textSideCont ' name="buzon" >
                        BUZÓN
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
       </>
}
      </div>
    )
}

export default SideBar
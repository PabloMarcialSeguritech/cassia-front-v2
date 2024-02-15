
import { useState } from 'react'
import './styles/admin.css'
import UsersAdmin from '../components/admin-components/UsersAdmin'
import Herramienta1 from '../components/admin-components/Herramienta1'
import RolesAdmin from '../components/admin-components/RolesAdmin'
import ArrastreHost from '../components/admin-components/ArrastreHost'
const Admin=({server,dataGlobals})=>{
    const [listSelected,setListSelected]=useState(1)
    const hadleChangeList=(e)=>{
        setListSelected(e)
    }
    return (
        <div className="main-admin">
            <div className='head-admin'>
                <div className='title-admin'>
                    <div className='txt-title-admin'>
                    Panel de Administrador
                    </div>
                </div>
                <div className='menu-admin'>
                     <ol className='compact-menu-list' >
                        <li className={listSelected===1?'list-selected':''} onClick={() =>hadleChangeList(1)}>Usuarios</li>
                        {/* <li className={listSelected===2?'list-selected':''} onClick={() =>hadleChangeList(2)}>Roles</li> */}
                        {/* <li className={listSelected===3?'list-selected':''} onClick={() =>hadleChangeList(3)}>Arrastre Hosts</li>
                        <li className={listSelected===4?'list-selected':''} onClick={() =>hadleChangeList(4)}>Herramienta 3</li> */}
                    </ol>
                </div>
                <hr className='head-line'></hr>
            </div>
            <div className='cont-admin'>
            {listSelected === 1 ? (
                    <UsersAdmin server={server}/>
                ) : listSelected === 2 ? (
                    <RolesAdmin server={server}/>
                ) : listSelected === 3 ? (
                    <ArrastreHost server={server}/>
                ) : (
                    <Herramienta1 server={server}/>
                )}
                
            </div>
        </div>
    )
}

export default Admin
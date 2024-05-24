
import { useState } from 'react'
import './styles/reportes.css'
import Disponibilidad from '../components/reportes-components/Disponibilidad'
import Alineacion from '../components/reportes-components/Alineacion'
import Herramienta1 from '../components/admin-components/Herramienta1'
import RolesAdmin from '../components/admin-components/RolesAdmin'
import ArrastreHost from '../components/admin-components/ArrastreHost'
const Reportes=({server,dataGlobals})=>{
    const [listSelected,setListSelected]=useState(1)
    const hadleChangeList=(e)=>{
        setListSelected(e)
    }
    return (
        <div className="main-reportes">
            <div className='head-reportes'>
                <div className='title-reportes'>
                    <div className='txt-title-reportes'>
                    REPORTES
                    </div>
                </div>
                <div className='menu-reportes'>
                     <ol className='compact-menu-list' style={{justifyContent:'start'}} >
                        <li className={listSelected===1?'list-selected':''} onClick={() =>hadleChangeList(1)}>Disponibilidad</li>
                        <li className={listSelected===2?'list-selected':''} onClick={() =>hadleChangeList(2)}>Metrica</li>
                        {/* <li className={listSelected===2?'list-selected':''} onClick={() =>hadleChangeList(2)}>Roles</li>
                        <li className={listSelected===3?'list-selected':''} onClick={() =>hadleChangeList(3)}>Arrastre Hosts</li>
                        <li className={listSelected===4?'list-selected':''} onClick={() =>hadleChangeList(4)}>Herramienta 3</li> */}
                    </ol>
                </div>
                <hr className='head-line'></hr>
            </div>
            <div className='cont-reportes'>
            {listSelected === 1 ? (
                    <Disponibilidad server={server}/>
                ) : listSelected === 2 ? (
                    <Alineacion server={server}/>
                ) : listSelected === 3 ? (
                    <></>
                    // <ArrastreHost server={server}/>
                ) : (
                    <></>
                    // <Herramienta1 server={server}/>
                )}
                
            </div>
        </div>
    )
}

export default Reportes
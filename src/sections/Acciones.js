
import { useState } from 'react'
import './styles/acciones.css'

import PanelAcciones from '../components/acciones-components/PanelAcciones'
const Acciones=({server,dataGlobals})=>{
    const [listSelected,setListSelected]=useState(1)
    const hadleChangeList=(e)=>{
        setListSelected(e)
    }
    return (
        <div className="main-accManage">
            <div className='head-accManage'>
                <div className='title-accManage'>
                    <div className='txt-title-accManage'>
                    ACCIONES
                    </div>
                </div>
                
                
            </div>
            <div className='cont-accManage'>
            {listSelected === 1 ? (
                    <PanelAcciones server={server}/>
                ) :''
                }
                
            </div>
        </div>
    )
}

export default Acciones

import { useState } from 'react'
import './styles/hosts.css'
import PanelHost from '../components/hostManage-components/PanelHost'
const Hosts=({server,dataGlobals})=>{
    const [listSelected,setListSelected]=useState(1)
    const hadleChangeList=(e)=>{
        setListSelected(e)
    }
    return (
        <div className="main-Host">
            <div className='head-Host'>
                <div className='title-Host'>
                    <div className='txt-title-Host'>
                    HOSTS
                    </div>
                </div>
                
                
            </div>
            <div className='cont-Host'>
            {listSelected === 1 ? (
                    <PanelHost server={server}/>
                ) :''
                }
                
            </div>
        </div>
    )
}

export default Hosts

import { useState } from 'react'
import './styles/cis.css'
import PanelCis from '../components/cis-components/PanelCis'
const Cis=({server,dataGlobals})=>{
    const [listSelected,setListSelected]=useState(1)
    const hadleChangeList=(e)=>{
        setListSelected(e)
    }
    return (
        <div className="main-cis">
            <div className='head-cis'>
                <div className='title-cis'>
                    <div className='txt-title-cis'>
                    CI´s
                    </div>
                </div>
                
                
            </div>
            <div className='cont-cis'>
            {listSelected === 1 ? (
                    <PanelCis server={server}/>
                ) :''
                }
                
            </div>
        </div>
    )
}

export default Cis
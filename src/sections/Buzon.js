
import { useState } from 'react'
import './styles/buzon.css'
import PanelBuzon from '../components/buzon-components/PanelBuzon'
const Buzon=({server,dataGlobals})=>{
    const [listSelected,setListSelected]=useState(1)
    const hadleChangeList=(e)=>{
        setListSelected(e)
    }
    return (
        <div className="main-Buzon">
            <div className='head-Buzon'>
                <div className='title-Buzon'>
                    <div className='txt-title-Buzon'>
                    Buzon
                    </div>
                </div>
                
                
            </div>
            <div className='cont-Buzon'>
            {listSelected === 1 ? (
                    <PanelBuzon server={server}/>
                ) :''
                }
                
            </div>
        </div>
    )
}

export default Buzon
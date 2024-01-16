
import Search from '../../generales/Search';
import './styles/UbicacionSection.css'
import { useState ,useEffect} from 'react';
import Action from '../../Action';
import SelectorAdmin from '../../SelectorAdmin';
const UbicacionSection =({dataHost,Proxy_list})=>{
   console.log(dataHost)
  console.log(dataHost)
  console.log(Proxy_list)

  const changeOption=(option,index)=>{
        
    console.log(option.value)
    // setCisData((prevState)=>{
    //     return {
    //         ...prevState,
    //         ['tech_id']:option.value===""?0:(parseInt(option.value))
    //     }
        
    // })
}
    // setCisRelation(option.value)
     const handleChange=()=>{

     }
    return(
        <div className="ubicacion-section-content">
             <div className='content-card-users' style={{overflowY: 'scroll',scrollbarWidth: 'thin'}}>
           <div className="form-cis-box"> 
           <div className="user-box-cis">
                                    <input required name="host_id"  placeholder='Realize una busqueda de dispositivo' type="text" value={dataHost.inventory.location_lat}
                                    onChange={handleChange}  />
                                        <label className='label-cis active ' style={{top: '-30px !important'}}>Latitud:</label>
                                        
                                    </div>
                                    <div style={{height:'10%'}}></div>
                                    <div className="user-box-cis">
                                    <input required name="host_id"  placeholder='Realize una busqueda de dispositivo' type="text" value={dataHost.inventory.location_lon}
                                    onChange={handleChange}  />
                                        <label className='label-cis active ' style={{top: '-30px !important'}}>Longitud</label>
                                        
                                    </div>
                                    </div>
                                    </div>
        </div>
    )
}

export default UbicacionSection
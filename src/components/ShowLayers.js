import './styles/ShowLayers.css'
import Selector from './Selector'
import InfoStatus from './InfoStatus'
import Action from './Action'
import {fetchData} from '../hooks/fetchData'
import { useFetch } from '../hooks/useFetch'
import { Suspense, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';


const ShowLayers =(props)=>{
    // console.log(props.capas)
    // console.log(Object.keys(props.capas))
   
    
    const [resultList,setResultList]=useState([])
    const [inputIp,setInputIP]=useState("")
    // console.log(resultList)
    const closeFindHost=()=>{
        const popups = document.querySelectorAll('.custom-popup-findHost'); 
        popups.forEach(popup => {
    //    console.log(popups)
      popup.remove();
      });
      setResultList([])
      setInputIP("")
    }
    
    const handleClick=(element,index)=>{

        // console.log('ocultar la capa ',props.capas[index].id)

       
        if(props.capas[index].show){
            props.mapAux.removeLayer(props.capas[index].id);
            props.mapAux.removeSource(props.capas[index].id);
        }else{
            if(index<Object.keys(props.capas).length-1){
                let i=index+1;
                let flag=true
                do{
                    // console.log(i,flag)
                    if(props.capas[i].show){
                        if(props.capas[index].source!=null){
                            props.mapAux.addSource(props.capas[index].id,props.capas[index].source)
                        }
                        props.mapAux.addLayer(props.capas[index].layer,props.capas[i].id)
                        flag=false
                    }else{
                        i++;
                    }
                }while(flag && i<Object.keys(props.capas).length)
                if(flag && i==Object.keys(props.capas).length){
                    if(props.capas[index].source!=null){
                        props.mapAux.addSource(props.capas[index].id,props.capas[index].source)
                    }
                    props.mapAux.addLayer(props.capas[index].layer)
                }
            }else{
                // console.log('muestra la capa ',props.capas[index].id)
                if(props.capas[index].source!=null){
                    props.mapAux.addSource(props.capas[index].id,props.capas[index].source)
                }
                props.mapAux.addLayer(props.capas[index].layer)
            }
            


        
        
        }
        props.setCapas((prevCapas) => ({
            ...prevCapas,
            [index]: {
              ...prevCapas[index],
              show: !prevCapas[index].show,
            },
          }));
        
      }
    return(
        <>
        <div className='contShowLayers'>
                <div className="container-ShowLayers">
                    <input defaultChecked className="checkbox-ShowLayers" type="checkbox" onClick={closeFindHost}/> 
                  
                    <div className="mainbox-ShowLayers">
                        <div className='txtTitle--ShowLayers'>
                        CAPAS
                       </div>
                       <div className='container-ShowLayers-list'>
                            {/* <div className='compact-ShowLayers-list'> */}
                            <div id="compact-ShowLayers-list">
                            {
                                Object.keys(props.capas).length === 0 ? 'cargando' : (
                                    <>
                                    {Object.values(props.capas).map((element, index) => (
                                        <>

                                        <input defaultChecked={element.show}  value={index} name="r" type="checkbox" id={`checkbox-${index + 1}`} onClick={()=>handleClick(element,index)} />

                                        <label htmlFor={`checkbox-${index + 1}`}>{element.name}</label>
                                        </>
                                    ))}
                                    </>
                                )
                                }
                                {/* <input defaultChecked value="1" name="r" type="checkbox" id="01"/>
                                <label for="01">Bread</label> */}
                                {/* <input value="2" name="r" type="checkbox" id="02"/>
                                <label for="02">Cheese</label>
                                <input value="3" name="r" type="checkbox" id="03"/>
                                <label for="03">Coffee</label>
                                <input value="04" name="r" type="checkbox" id="04"/>
                                <label for="04">Coffee</label>
                                <input value="05" name="r" type="checkbox" id="05"/>
                                <label for="05">Coffee</label> */}
                            </div>
                                {/* <div className='row-ShowLayers-list' onClick={()=>{}}>
                                
                                    <div className='cont-check-ShowLayers-list'>
                                        <input type='checkbox' className='row-checkbox-ShowLayers'></input>
                                    </div>
                                    <div className='cont-text-ShowLayers-list'>
                                    'capa 1'
                                    </div>
                                
                                </div> */}
                    
                     
                {/* </div> */}
               
            </div>
                    </div>
                    
            </div>
            
        </div>
        </>
    )
}

export default ShowLayers
import './styles/SearchHost.css'
import Selector from './Selector'
import InfoStatus from './InfoStatus'
import Action from './Action'
import {fetchData} from '../hooks/fetchData'
import { useFetch } from '../hooks/useFetch'
import { Suspense, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';


const SearchHost =(props)=>{
    // console.log(props.devices.data.hosts)
    const [resultList,setResultList]=useState([])
    const [inputIp,setInputIP]=useState("")
    const [chekedSearch,setChekedSearch]=useState(true)
    // console.log(resultList)
    const closeFindedHost=()=>{
        console.log("cerar poppup")
    }
    const closeFindHost=()=>{
        const popups = document.querySelectorAll('.custom-popup-findHost');
      
      popups.forEach(popup => {
    //    console.log(popups)
      popup.remove();
      });
      setResultList([])
      setInputIP("")
    }
    function closePopup() {
        console.log('closepopip')
      }
    const handleSelected=(element)=>{
        setResultList([])
        setChekedSearch(true)
        setFlagSearch(true)
      setInputIP("")
        console.log(element)
        if( element.latitude.replace(",", ".")>=-90 && element.latitude.replace(",", ".")<=90){

        
const coordinates=[element.longitude.replace(",", "."),element.latitude.replace(",", ".")]
// console.log(coordinates)
const popups = document.querySelectorAll('.custom-popup-findHost');
      
      popups.forEach(popup => {
    //    console.log(popups)
      popup.remove();
      });
      props.mapAux.setZoom(12);
      props.mapAux.setCenter(coordinates);
        let popup = new mapboxgl.Popup({
            className: 'custom-popup-findHost',
            closeButton: true,
            closeOnClick: false
            })
            .setLngLat(coordinates)
            .setHTML(`<div class='cont-findHost' style='border: 1px solid #ffffff;'>
                <div class='findHost-txt'>${element.ip}</div>
                <div class='findHost-close' > </div>
                </div>`)
            .addTo(props.mapAux);
          }
        
    }
    
    const [flagSearch,setFlagSearch]=useState(true)
    
    const handleChange=(e)=>{
        
        const term = e.target.value;
        const {name,value}=e.target
        // console.log(value)
        setInputIP(value)
        validateIp(value)
        const filteredResults = props.devices.data.hosts.filter((item) => {
            // Convierte todos los valores a cadenas para realizar una búsqueda sin distinción entre mayúsculas y minúsculas
            return Object.entries(item).some(([key, value]) => {
              if (key === 'ip' || key=== 'Host') {
                return String(value).toLowerCase().includes(term.toLowerCase());
              }
              return false; // Si no es el atributo 'ip', retorna falso para continuar buscando en otros atributos
            });
          });
        //   console.log(filteredResults)
          setResultList(filteredResults)
          
      }

      const validateIp= (ip) => {
        // console.log("validando correo: ",ip )
        const ipRegex = /^$/;
        // const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        let result = ipRegex.test(ip);
        setFlagSearch(result)
        return result;
      };
    return(
        <>
        <div className='contSearchHost'>
                <div className="container-searchHost">
                    <input defaultChecked={chekedSearch} className="checkbox-searchHost" type="checkbox" onClick={closeFindHost}/> 
                    <div className="mainbox-searchHost">
                        <div className="iconcontainer-searchHost">
                            <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="search_icon-searchHost "><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                        </div>
                    <input className="search_input-searchHost" placeholder="Buscar IP ..." type="text" value={inputIp}onChange={handleChange}/>
                    </div>
                    <div className={`container-searchHost-list ${!flagSearch ? 'large' : 'small'}`}>
                <div className={`compact-searchHost-list ${!flagSearch ? 'large' : 'small'}`}>
                    {
                        (inputIp==="" )?'':(resultList.length==0)?<div className='row-searchHost-list' >
                        Sin Resultados
                    </div>:
                        
                        resultList.map((element, index) => (
                            <div className='row-searchHost-list' id={index} onClick={()=>handleSelected(element)}>
                                <div className='cont-row-searchHost-txt'>
                                    <div className='ip-row-searchHost' >{element.ip+" / "}</div>
                                    <div> &nbsp; {element.Host}</div>
                                    {(element.latitude.replace(",", ".")<-90 || element.latitude.replace(",", ".")>90)?
                                    <div style={{color:'red'}}> &nbsp; coordenadas erroneas</div>:''
                                    }
                                    
                                </div>
                                {/* {(flagSearch)?element.ip:element.Host} */}
                            </div>
                        ))
                       
                            
                    }
                    
                     
                </div>
               
            </div>
            </div>
            
        </div>
        </>
    )
}

export default SearchHost
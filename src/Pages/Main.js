import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Container from '../components/Container'
import RightQuadrant from '../components/RightQuadrant'
import LeftQuadrant from '../components/LeftQuadrant'
import {  useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import mapboxgl from 'mapbox-gl'
import MapBox from '../components/mapbox_gl'
import LoadData from '../components/LoadData'
import aps from '../components/aps'
// import downs_list from './downs'
import Modal from 'react-modal';
import InfoMarker from '../components/InfoMarker'
import '../components/styles/MapBox.css'
import Perfil from '../sections/Perfil'
import Monitoreo from '../sections/Monitoreo'

const Main=({ onLogin,token,setToken })=>{
   console.log(token)
    const [pageSelected,setPageSelected]=useState("perfil")


    return(
        <div className='main' style={{height:'100%',width:'100%',position: 'absolute'}}>
      <NavBar/>
      <SideBar onLogin={onLogin} pageSelected={pageSelected} setPageSelected={setPageSelected}/>
      <Container>
      {(() => {
        if (pageSelected === "perfil") {
            return <Perfil />;
        } else  if (pageSelected === "monitoreo"){
            return <Monitoreo token={token}/>;
        }
    })()}
        
      </Container>
    </div>
    )
}

export default Main
import './styles/LeftQuadrant.css'
// import Map from './Map'
import Map from './Map'
import {fetchData} from '../hooks/fetchData'
import hosts from './devices'
import { Suspense, useEffect, useState,useRef } from 'react'
import ReactDOM from 'react-dom';
import React from 'react';
import Modal from 'react-modal';
import LoadData from './LoadData'
import InfoMarker from './InfoMarker'
import InfoStatus from './InfoStatus'
import RowProblem from './RowProblem'
import TableAlerts from './TableAlerts'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#36363650',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'80%',
    height:'80%',
    padding:'20px'
  },
};
const infoMarkerStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#363636',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'70%',
    height:'40%',
    padding:'20px'
  },
};
const LeftQuadrant =(props)=>{
 
// console.log(props)

  const mapContainerRef = useRef(null);
  
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [alertsIsOpen, setAlertsIsOpen] = React.useState(false);
  // console.log("alret oper: ",alertsIsOpen)
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [optionsSelectList, setOptionsSelectList] = useState([
    // { value: '7', label: 'Down Origen', status: true },
    { value: '6', label: 'Down', status: true},
    // { value: '7', label: 'Down Origen', status: false},
    { value: '5', label: 'Severidad 5', status: false },
    { value: '4', label: 'Severidad 4', status: false },
    { value: '3', label: 'Severidad 3', status: false },
    { value: '2', label: 'Severidad 2', status: false },
    { value: '1', label: 'Severidad 1', status: false },
  ]);
  const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  // const [infoMarkerOpen, setInfoMarkerOpen] = React.useState(false);
  // const  [infoMarker, setInfoMarker]=useState([])
  // function openInfoMarker() {
  //   setInfoMarkerOpen(true);
  // }

  // function closeInfoMarker() {
  //   setInfoMarkerOpen(false);
  // }
  // const handleMarkerClick = (data) => {
    
  //   setInfoMarker(data)
  //   openInfoMarker()
  //   // Realiza las acciones deseadas al hacer clic en el marcador
  // };
  const [s5,setS5]=useState(0)
  const [s4,setS4]=useState(0)
  const [s3,setS3]=useState(0)
  const [s2,setS2]=useState(0)
  const [s1,setS1]=useState(0)
  // let s5= undefined
  // let s4= undefined
  // let s3= undefined
  // let s2= undefined
  // let s1=undefined
  // console.log(props.dataHosts.data)
  useEffect(()=>{
    if(props.dataHosts.data.length!=0){
      // s5= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 5)
      // s4= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 4)
      // s3= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 3)
      // s2= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 2)
     //  s1= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 1)
     setS5(props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 5))
     setS4(props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 4))
     setS3(props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 3))
     setS2(props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 2))
     setS1(props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 1))
    }
  },[props.dataHosts.data])
  useEffect(()=>{
    props.setSeverityProblms([((props.ubiActual.dispId==-1)?"7":"6")])
    // props.setSeverityProblms(["6"])
  },[])
    return(
      <>
      
        <div className='rowQuadrant leftQuadrant'>
          {/* <div className='columnLeft columnMap'>
            <div className='card' style={{width:'95%',border: 'solid #004d79'}} ref={mapContainerRef} >
              {props.dataHosts.loading?<LoadData/>:<Map mapContainerRef={mapContainerRef} markers={props.markers} longitudes={props.longitudes} locations={props.locations} handleMarkerClick={handleMarkerClick} props={props}/>}
              
            </div>
          </div> */}
          <div className='column columnEstatusProblem' style={{height:'30%'}}>
                <div className='card menuAction'>
                    <div className='menuActiontitle'>
                        <div className='cardTitle'>
                            <div className='textCardTitle'>
                            
                            Estatus de Incidencias
                            </div>
                        </div>
                    </div>
                   <div className='menuActionData'>
                   
                        <div className='menuActionCell'>
                            <InfoStatus titulo={'S5 - Desastre'} tipo={'DOWN'} size='min' value={props.markersWOR.length==0?'...':(s5===undefined ?0:s5.Severities)}/>
                        </div>
                        <div className='menuActionCell'>
                            <InfoStatus titulo={'S4 - Riesgo'} tipo={'DOWN4'} size='min' value={props.markersWOR.length==0?'...':(s4===undefined ?0:s4.Severities)}/>
                        </div>
                        <div className='menuActionCell'>
                        <InfoStatus titulo={'S3 - Moderado'} tipo={'DOWN3'} size='min' value={props.markersWOR.length==0?'...':(s3===undefined ?0:s3.Severities)}/>
                           </div>
                        <div className='menuActionCell' style={{borderRadius:' 0px 0px 0px 10px'}}>
                        <InfoStatus titulo={'S2 - Advertencia'} tipo={'DOWN2'} size='min' value={props.markersWOR.length==0?'...':(s2===undefined ?0:s2.Severities)}/>
                            </div>
                        <div className='menuActionCell' style={{borderRadius:' 0px 0px 10px 0px'}}>
                        <InfoStatus titulo={'S1 - Informativo'} tipo={'DOWN1'} size='min' value={props.markersWOR.length==0?'...':(s1===undefined ?0:s1.Severities)}/>
                          
                        </div>
                        <div className='menuActionCell' >
                            {/* <InfoStatus titulo={'Sin Incidencias'} tipo={'UP'} size='min' value={props.markersWOR.length==0?'...':(props.markersWOR.length===undefined ?0:(props.markersWOR.length-((s1===undefined ?0:s1.Severities)+(s2===undefined ?0:s2.Severities)+(s3===undefined ?0:s3.Severities)+(s4===undefined ?0:s4.Severities)+(s5===undefined ?0:s5.Severities))))}/> */}
                        </div>
                    </div> 
                </div>
            </div>
          <div className={`columnLeft ${alertsIsOpen ? 'columnAlert' : 'columnAlertMin'}`}>
            <div className='card' style={{width:'95%'}}>
              <TableAlerts userPermissions={props.userPermissions} ubiActual={props.ubiActual} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchResults={searchResults} setSearchResults={setSearchResults} optionsSelectList={optionsSelectList} setOptionsSelectList={setOptionsSelectList} severityProblms={props.severityProblms} setSeverityProblms={props.setSeverityProblms} mapAux={props.mapAux} setmapAux={props.setmapAux} server={props.server} action={openModal} modalIsOpen={false}  alertsIsOpen={alertsIsOpen} setAlertsIsOpen={setAlertsIsOpen} dataProblems={props.dataProblems} ubicacion={props.ubicacion} setUbicacion={props.setUbicacion} search_problems={props.search_problems}></TableAlerts>
            
            </div>
          </div>
        </div>
        <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <TableAlerts userPermissions={props.userPermissions} ubiActual={props.ubiActual} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchResults={searchResults} setSearchResults={setSearchResults}  optionsSelectList={optionsSelectList} setOptionsSelectList={setOptionsSelectList} severityProblms={props.severityProblms} setSeverityProblms={props.setSeverityProblms} mapAux={props.mapAux} setmapAux={props.setmapAux} server={props.server} action={closeModal}  modalIsOpen={true} alertsIsOpen={alertsIsOpen} setAlertsIsOpen={setAlertsIsOpen} dataProblems={props.dataProblems} ubicacion={props.ubicacion} setUbicacion={props.setUbicacion}  search_problems={props.search_problems}></TableAlerts>
      </Modal>

      </>
    )
}

export default LeftQuadrant
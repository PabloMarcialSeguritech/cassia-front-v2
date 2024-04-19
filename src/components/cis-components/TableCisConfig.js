import React, { useState } from 'react';
import CisList from './CisList';
import LoadSimple from '../LoadSimple';
import Modal from 'react-modal';
import ModalDeleteCis from "./ModalDeleteCis";
import ModalReqAuth from './ModalReqAuth';
const deleteCisModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#ffffff !important',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'40%',
    height:'30%',
    padding:'20px'
  },
};
const deleteBuzonModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#ffffff !important',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'40%',
    height:'30%',
    padding:'20px'
  },
};
const TableCisConfig = ({ buscar_cis_history,handleChangEdit,cisSelected,setCisSelected,searchResults, setSearchResults,onSearch,dataUsers,setDataUsers,searchTerm, setSearchTerm,server,dataCisConf }) => {
  const [deleteCisModalOpen, setdeleteCisModalOpen] =useState(false);
  const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null); 
    const [registerIsValid, setRegisterIsValid] = useState(false);
    const [cisConfSelected,setCisConfSelected]=useState({})
    const [deleteBuzonModalOpen, setdeleteBuzonModalOpen] =useState(false);
    const [userSelected,setUserSelected]=useState({})
    function openDeleteUserModalauth() {
      setdeleteBuzonModalOpen(true);
    }
  
    function closDeleteBuzonModal() {
      setdeleteBuzonModalOpen(false);
    }
    const handleActionResponse = (data) => {
      
      setUserSelected(data)
      openDeleteUserModalauth()
      // Realiza las acciones deseadas al hacer clic en el marcador
    };
    console.log(dataCisConf)
    var dataList=(searchTerm==='')?dataCisConf.data.data.history:searchResults;
    console.log(dataList)
  const handledeleteUserClick = (data) => {
    setCisConfSelected(data)
    openDeleteUserModal()
    
  };
  function openDeleteUserModal() {
    setdeleteCisModalOpen(true);
  }

  function closDeleteCisModal() {
    setdeleteCisModalOpen(false);
    buscar_cis_history()
  }
  const handleChangReqAuth =(element)=>{
    console.log(element)
    if(element.status=='No iniciado'){
      // requests_auth(element)
      handleActionResponse(element)
    }else{
      cancel_auth(element)
    }
    
     
  }
  function requests_auth(element,txtarea){
    console.log("autorizar")
    const data={
      process_id: 1,
      comments: txtarea
    }
    setLoading(true)
    setRegisterIsValid(true)
      const fetchDataPost = async () => {
        let url='http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/authorization/create/'+element.conf_id
     try {
          // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+cis.element_id, {
          console.log(url)  
          const response = await fetch(url, {
            method: 'POST',  
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(data),
          });
         console.log(response)
          if (response.ok) {
            
            const data1 = await response.json();
            setLoading(false)
            setRegisterIsValid(false)
            // Manejo de la respuesta
            setData(data1)
            closDeleteCisModal()
            // console.log(data1);
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          // Manejo de errores
          setError(error)
          console.error(error);
        }
      };
  
      fetchDataPost();
      

  }
  function cancel_auth(element){
    console.log( " cancela autorizar")
    const data={
      process_id: 1,
      comments: "comentario de prueba"
    }
    setLoading(true)
    setRegisterIsValid(true)
      const fetchDataPost = async () => {
        let url='http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/authorization/cancel/'+element.conf_id
     try {
          // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+cis.element_id, {
          console.log(url)  
          const response = await fetch(url, {
            method: 'POST',  
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
         console.log(response)
          if (response.ok) {
            
            const data1 = await response.json();
            setLoading(false)
            setRegisterIsValid(false)
            // Manejo de la respuesta
            setData(data1)
            closDeleteCisModal()
            // console.log(data1);
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          // Manejo de errores
          setError(error)
          console.error(error);
        }
      };
  
      fetchDataPost();
      

  }
  return (
    <div className='cont-table-cis-config'>
                                    <div className='head-table-cis-config'>
                                        <div className='field-head-table-cis-config field-small'>
                                            No.
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Tipo
                                        </div>
                                        <div className='field-head-table-cis-config field-larger'>
                                            Descripción
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Justificacion
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            No. Serie
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Marca
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Modelo
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Versión
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Ticket
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Responsable
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Quien Autoriza
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Fecha inicio
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Fecha fin
                                        </div>
                                        <div className='field-head-table-cis-config field-medium '  >
                                            Status
                                        </div>
                                        <div className='field-head-table-cis field-larger '>
                                            Acciones
                                        </div>
                                        {/* <div className='field-head-table-cis-config field-medium'>
                                            CI´s afecta
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Documentos
                                        </div> */}
                                        
                                    </div>
                                    <div className='body-table-cis-config'>
                                    <>
        <div className='cont-row-user-list'>
        {(dataCisConf.loading ) ?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
          // console.log(elemento)
        //    (dataCisConf.data.length>0)?
        // dataCisConf.data.data.history.map((elemento, indice) => (
          dataList.map((elemento, indice) => (
            <div className='row-table-cis' key={indice}   >
              <div className='field-body-table-cis field-small'>
                {elemento.conf_id}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.change_type}
              </div>
              <div className='field-body-table-cis field-larger'>
                {elemento.description}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.justification}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.hardware_no_serie}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.hardware_brand}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.hardware_model}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.software_version}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.ticket}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.responsible_name}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.auth_name}
              </div>
              <div className='field-body-table-cis field-medium'>
               
                {(elemento.created_at=="NaT")?'':elemento.created_at.slice(0,10)}
              </div>
              <div className='field-body-table-cis field-medium'>
                {(elemento.closed_at=="NaT")?'':elemento.closed_at.slice(0,10)}
              </div>
              <div className={'field-body-table-cis field-medium field-status txtCis'+elemento.status}>
                <p className='Tooltip-coment' >{elemento.authorization_comments}</p>
                {elemento.status}
              </div>
              
              <div className='field-body-table-cis field-larger '>
                <div className='cont-img-field-acciones'>
                  {
                    (elemento.status=='No iniciado'  )?
                 
                  <img className='img-field-acciones' src={((elemento.status=='No iniciado')?'/iconos/peticion.png':(elemento.status=='Pendiente de autorizacion')?'/iconos/cancel.png':'')} title='Peticion' name='Peticion' ci_id={elemento.ci_id} onClick={(e) =>{e.stopPropagation(); handleChangReqAuth(elemento)}} />:''
                }
                  </div>
                <div className='cont-img-field-acciones'>
                  {
                  (elemento.status!='Cerrada' && elemento.status!='Cancelada'   && elemento.status!='Rechazada')?
                  <img className='img-field-acciones' src='/iconos/edit.png' title='Editar' name='Editar' ci_id={elemento.ci_id} onClick={(e) =>{e.stopPropagation(); handleChangEdit(elemento)}} />:''
                  }
                  </div>
                <div className='cont-img-field-acciones' >
                {
                  (elemento.status=='No iniciado' )?
                  <img className='img-field-acciones' src='/iconos/delete.png' title='Eliminar'name='Eliminar' ci_id={elemento.ci_id} onClick={(e)=> {e.stopPropagation(); handledeleteUserClick(elemento)}} />:''
                
                }
                  </div>
              </div>
              {
          (dataList.length==0)?<div className="no-results">SIN RESULTADOS.</div>:''
        }
            </div>
          ))
        }
        {
        //   (dataList.length==0)?<div className="no-results">SIN RESULTADOS.</div>:''
        }
      </div>
      <Modal
        isOpen={deleteCisModalOpen}
        // isOpen={true}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closDeleteCisModal}
        style={deleteCisModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          {/* <ModalDeleteCis server={server}      closDeleteCisModal={closDeleteCisModal}></ModalDeleteCis> */}
          <ModalDeleteCis server={server} setRegisterIsValid ={setRegisterIsValid } setData={setData} setLoading={setLoading} setError={setError} cis={cisConfSelected} closDeleteCisModal={closDeleteCisModal}></ModalDeleteCis>
    </Modal>
    <Modal
        isOpen={deleteBuzonModalOpen}
        // isOpen={true}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closDeleteBuzonModal}
        style={deleteBuzonModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalReqAuth server={server}  requests_auth={ requests_auth}  setRegisterIsValid ={setRegisterIsValid } setData={setData} setLoading={setLoading} setError={setError} Buzon={userSelected} closDeleteBuzonModal={closDeleteBuzonModal}></ModalReqAuth>
    </Modal>
    </>
                                        
                                    </div>
                                </div>
  );
}

export default TableCisConfig;


import { useState,useEffect } from 'react'
import './styles/PanelCis.css'
import Search from './Search';
import Action from '../Action';
import Modal from 'react-modal';
import ModalCreateCis from './ModalCreateCis';
import CisList from './CisList';
import LoadSimple from '../LoadSimple';
import TableCis from './TableCis';
import InfoCis from './InfoCis';
// import { jsPDF } from "jspdf";
const CreateCisModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      background: '#ffffff !important',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'40%',
      height:'90%',
      padding:'20px'
    },
  };
const PanelCis=({server})=>{
    const [CreateCisModalOpen, setCreateCisModalOpen] =useState(false);
    const [dataUsers,setDataUsers]=useState({data:[],loading:true,error:null})
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(dataUsers)
    const [searchResult, setSearchResult] = useState(null);
    const [registerIsValid, setRegisterIsValid] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null); 
    const [dataCis,setDataCis]=useState([]);
    const [loadingCis,setLoadingCis]=useState(false);
    const [errorCis,setErrorCis]=useState(null); 
    const [cisSelected,setCisSelected]=useState([])
    console.log(loading)
    const handleSearch = (query) => {
        // Aquí puedes realizar la búsqueda usando el valor de 'query'
        // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
        setSearchResult(`Resultados para: ${query}`);
      }
      const crear = () => {
        // Aquí puedes realizar la búsqueda usando el valor de 'query'
        // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
        setCreateCisModalOpen(true)
      }
      function closCreateCisModal() {
        setEditActive(false)
        setCreateCisModalOpen(false);
      }
      const handleChangEdit=(cis)=>{
        console.log("handle edit")
        setEditActive(true)
        console.log(cis)
        buscar_cis(cis.ci_id)
        
        
    }

    const buscar_cis=(ci_id)=>{
        console.log("buscar_cis",ci_id)
        
        setLoadingCis(true)
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci/'+ci_id)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci/'+ci_id, {
                method: 'GET',  
                headers: {
                  'Content-Type': 'application/json',
                  'accept': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
              });
              console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setLoadingCis(false)
                console.log(data1)
                setDataCis(data1.data)
                setCreateCisModalOpen(true)
              } else {
                const data1 = await response.json();
                console.log(data1)
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchDataPost();
        
    }
    const regresar_cis=()=>{
        setCisSelected([])
    }
    // const generarPDF = () => {
    //   const { contenedor } = this.refs;
    //   const pdf = new jsPDF();
      
    //   // Obtén el contenido del contenedor
    //   const contenido = contenedor.innerHTML;
  
    //   // Agrega el contenido al documento PDF
    //   pdf.fromHTML(contenido, 15, 15);
  
    //   // Guarda el PDF
    //   pdf.save('archivo.pdf');
    // }
  
    return (
        <>
        <div className='main-panel-cis'>
            <div className='content-cis'>
                <div className='cont-cis-search'>
              {(cisSelected.length===0)?
              <>
              <div className='cont-search'>
                    
                    <Search  searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}  dataUsers={dataUsers} setDataUsers={setDataUsers} />
                </div>
                <div className='cont-search-space'>

                </div>
                <div className='cont-search-buttons'>
                <Action disabled={false} origen='Blanco' titulo='+ Crear Registro'  action={crear}/>
                </div>
              </>
              :
              <>
<div className='cont-btn-back-users'  style={{width:'10%'}} onClick={regresar_cis}>
                            <div className='cont-img-back-users'>
                                <img  className='img-back-users' src={'/iconos/back-blanco.png'} name="regresar" />
                            </div>
                            <div className='cont-txt-back-users'>
                            <div className='txt-back-users'>
                                                    Regresar
                            </div>
                        </div>
                    </div>
                    <div className='pdf-download'>
                       <img  className='img-down-pdf' src={'/iconos/pdf.png'} name="PDF" />
                    </div>
                    </>
              }
              
                
                    
                    
                </div>
               
                <div className='cont-cis-table'>
                <div className='content-card-cis' ref="contenedor">
                              {(cisSelected.length===0)?
                              <TableCis  cisSelected={cisSelected} setCisSelected={setCisSelected} registerIsValid={registerIsValid} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} dataUsers={dataUsers} setDataUsers={setDataUsers} server={server} setRegisterIsValid={setRegisterIsValid} setData={setData} setLoading={setLoading} setError={setError}  handleChangEdit={handleChangEdit}></TableCis>:
                              <InfoCis server={server} cisSelected={cisSelected} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}  dataUsers={dataUsers} setDataUsers={setDataUsers} setCisSelected={setCisSelected} registerIsValid={registerIsValid}  ></InfoCis>
                            }
                                
                            </div>
                </div>
            </div>
        </div>
        <Modal
        isOpen={CreateCisModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closCreateCisModal}
        style={CreateCisModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalCreateCis server={server} editActive={editActive} setEditActive={setEditActive} dataCis={dataCis} setData={setData} loading={loading} setLoading={setLoading} setError={setError} setRegisterIsValid={setRegisterIsValid} closCreateCisModal={closCreateCisModal}></ModalCreateCis>
    </Modal>
    </>
    )
}

export default PanelCis
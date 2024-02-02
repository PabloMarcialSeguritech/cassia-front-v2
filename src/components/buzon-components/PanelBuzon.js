
import { useState,useEffect } from 'react'
import './styles/PanelBuzon.css'
import Search from '../generales/Search';
import Action from '../Action';
import Modal from 'react-modal';
import BuzonList from './BuzonList';
import LoadSimple from '../LoadSimple';
import TableBuzon from './TableBuzon';
import InfoBuzon from './InfoBuzon';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const CreateBuzonModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      background: '#ffffff !important',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'50%',
      height:'70%',
      padding:'20px'
    },
  };
const PanelBuzon=({server})=>{
    const [CreateBuzonModalOpen, setCreateBuzonModalOpen] =useState(false);
    const [dataUsers,setDataUsers]=useState({data:[],loading:true,error:null})
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
   
    const [devices,setDevices]=useState({data:[],loading:true,error:null});
    console.log(devices)
    const [searchResult, setSearchResult] = useState(null);
    const [registerIsValid, setRegisterIsValid] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null); 
    const [dataBuzon,setDataBuzon]=useState([]);
    const [loadingBuzon,setLoadingBuzon]=useState(false);
    const [errorBuzon,setErrorBuzon]=useState(null); 
    const [Buzonelected,setBuzonelected]=useState([])
    console.log(loading)
    const obtenerFechaActualLocal = () => {
      const ahora = new Date();
      const anio = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // El mes se cuenta desde 0
      const dia = String(ahora.getDate()).padStart(2, '0');
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
    
      return `${anio}-${mes}-${dia}_${horas}-${minutos}`;
    };
    const handleSearch = (query) => {
        // Aquí puedes realizar la búsqueda usando el valor de 'query'
        // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
        setSearchResult(`Resultados para: ${query}`);
      }
      const crear = () => {
        // Aquí puedes realizar la búsqueda usando el valor de 'query'
        // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
        setCreateBuzonModalOpen(true)
      }
      function closCreateBuzonModal() {
        setEditActive(false)
        setCreateBuzonModalOpen(false);
      }
      const handleChangEdit=(Buzon)=>{
        console.log("handle edit")
        setEditActive(true)
        console.log(Buzon)
        buscar_Buzon(Buzon.Buzonid)
        
        
    }
      
    const buscar_Buzon=(Buzon_id)=>{
        console.log("buscar_Buzon",Buzon_id)
        setCreateBuzonModalOpen(true)
        setLoadingBuzon(true)
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/Buzon_management/'+Buzon_id)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/Buzon_management/'+Buzon_id, {
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
                setLoadingBuzon(false)
                console.log(data1)
                setDataBuzon(data1.data)
                setCreateBuzonModalOpen(true)
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
    const regresar_Buzon=()=>{
        setBuzonelected([])
    }
    
    const generatePDF = () => {
      
      const input = document.getElementById('content');

    // Guardar el estado actual de visibilidad de los elementos que deseas ocultar
    const originalDisplay = [];
    const elementsToHide = input.querySelectorAll('.hiddenPDF');
    elementsToHide.forEach(element => {
      originalDisplay.push(element.style.display);
      element.style.display = 'none';
    });

    html2canvas(input)
      .then((canvas) => {
        // Restaurar el estado original de visibilidad
        elementsToHide.forEach((element, index) => {
          element.style.display = originalDisplay[index];
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG',10, 10, 190, 100);
        pdf.save('Buzon-'+obtenerFechaActualLocal()+'.pdf');
      });
    }

   
    return (
        <>
        <div className='main-panel-Buzon'>
            <div className='content-Buzon'>
                <div className='cont-Buzon-search'>
              {(Buzonelected.length===0)?
              <>
              <div className='cont-search'>
                    
                    <Search  searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}  dataObject={dataUsers.data} setDataObject={setDataUsers} />
                <div className="txtResults">
                  {
                    (searchTerm!='')?
                    <>
                    {"("+searchResults.length+") Resultados"}
                    </>:''
                  }
                
                </div>
                </div>
                <div className='cont-search-space'>
                  
                </div>
                <div className='cont-search-buttons'>
                
                </div>
              </>
              :
              <>
<div className='cont-btn-back-users'  style={{width:'10%'}} onClick={regresar_Buzon}>
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
                       <img  className='img-down-pdf' src={'/iconos/pdf.png'} name="PDF" onClick={generatePDF} />
                    </div>
                    </>
              }
              
                
                    
                    
                </div>
               
                <div className='cont-Buzon-table'>
                <div className='content-card-Buzon' id='content'>
                  {
                    
                    <>
                    
                              <TableBuzon dataBuzon={dataBuzon} setDataBuzon={setDataBuzon} editActive={editActive} Buzonelected={Buzonelected} setBuzonelected={setBuzonelected} registerIsValid={registerIsValid} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} dataUsers={dataUsers} setDataUsers={setDataUsers} server={server} setRegisterIsValid={setRegisterIsValid} setData={setData} setLoading={setLoading} setError={setError}  handleChangEdit={handleChangEdit} devices={devices}></TableBuzon>
                              
                            
                    </>
                  }
                              
                                
                            </div>
                </div>
            </div>
        </div>
       
    </>
    )
}

export default PanelBuzon
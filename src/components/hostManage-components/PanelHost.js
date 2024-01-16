
import { useState,useEffect } from 'react'
import './styles/PanelHost.css'
import Search from '../generales/Search';
import Action from '../Action';
import Modal from 'react-modal';
import ModalCreateHost from './ModalCreateHost';
import HostsList from './HostsList';
import LoadSimple from '../LoadSimple';
import TableHost from './TableHost';
import InfoHost from './InfoHost';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const CreateHostModalStyles = {
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
const PanelHost=({server})=>{
    const [CreateHostModalOpen, setCreateHostModalOpen] =useState(false);
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
    const [dataHost,setDataHost]=useState([]);
    const [loadingHost,setLoadingHost]=useState(false);
    const [errorHost,setErrorHost]=useState(null); 
    const [HostSelected,setHostSelected]=useState([])
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
        setCreateHostModalOpen(true)
      }
      function closCreateHostModal() {
        setEditActive(false)
        setCreateHostModalOpen(false);
      }
      const handleChangEdit=(Host)=>{
        console.log("handle edit")
        setEditActive(true)
        console.log(Host)
        buscar_Host(Host.hostid)
        
        
    }
      // useEffect(()=>{
      //   search_devices()
      // },[])
    const buscar_Host=(Host_id)=>{
        console.log("buscar_Host",Host_id)
        setCreateHostModalOpen(true)
        setLoadingHost(true)
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts_management/'+Host_id)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts_management/'+Host_id, {
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
                setLoadingHost(false)
                console.log(data1)
                setDataHost(data1.data)
                setCreateHostModalOpen(true)
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
    const regresar_Host=()=>{
        setHostSelected([])
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
        pdf.save('Host-'+obtenerFechaActualLocal()+'.pdf');
      });
    }

    function search_devices(){
      
       
        setDevices({data:devices.data,loading:true,error:devices.error})
        
        
        const fetchData = async () => {
          try {
            //console.log(`Bearer ${token_item}`)
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY'; // Reemplaza con tu token de autenticación
            // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/db/hosts/relations/'+ubicacion.groupid, {
              const devicefilter=''
        const subtypefilter=''
        let andAux=(devicefilter!=='' )?'&':'?'
              andAux=(subtypefilter!=='')?andAux:''
        // console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter)
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/'+'0'+''+devicefilter+andAux+subtypefilter, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                },
                              });
                              
            if (response.ok) {
              const response_data = await response.json();
              setDevices({data:response_data.data,loading:false,error:devices.error})
              // console.log(response_data)
             
            } else {
              throw new Error('Error en la solicitud');
            }
          } catch (error) {
            // Manejo de errores
            setDevices({data:devices.data,loading:devices.loading,error:error})
            //console.error(error);
          }
        };
        fetchData();
    }
    return (
        <>
        <div className='main-panel-Host'>
            <div className='content-Host'>
                <div className='cont-Host-search'>
              {(HostSelected.length===0)?
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
                <Action disabled={false} origen='Blanco' titulo='+ Crear Registro'  action={crear}/>
                </div>
              </>
              :
              <>
<div className='cont-btn-back-users'  style={{width:'10%'}} onClick={regresar_Host}>
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
               
                <div className='cont-Host-table'>
                <div className='content-card-Host' id='content'>
                  {
                    
                    <>
                    
                              <TableHost dataHost={dataHost} setDataHost={setDataHost} editActive={editActive} HostSelected={HostSelected} setHostSelected={setHostSelected} registerIsValid={registerIsValid} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} dataUsers={dataUsers} setDataUsers={setDataUsers} server={server} setRegisterIsValid={setRegisterIsValid} setData={setData} setLoading={setLoading} setError={setError}  handleChangEdit={handleChangEdit} devices={devices}></TableHost>
                              
                            
                    </>
                  }
                              
                                
                            </div>
                </div>
            </div>
        </div>
        <Modal
        isOpen={CreateHostModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closCreateHostModal}
        style={CreateHostModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalCreateHost  loadingHost={loadingHost} server={server} editActive={editActive} dataHost={dataHost} setDataHost={setDataHost} ></ModalCreateHost>
    </Modal>
    </>
    )
}

export default PanelHost
import Action from '../Action'
import './styles/ModalCisDocs.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
import Search from './Search';
import SelectorAdmin from '../SelectorAdmin'
const ModalCisDocs =({server,closeCisAfectaModal,cisSelected})=>{
    
    const [dataCisDocs,setdataCisDocs]=useState({data:[],loading:true,error:null})
    const [dataCis,setDataCis]=useState({data:[],loading:true,error:null})
    const [cisRelation,setCisRelation]=useState(0)
    const [relationResponse,setRelationResponse]=useState([])
    const [responseDetail,setResponseDetail]=useState({text:'',value:true})
    const [files,setFiles]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        buscar_cis_docss()
        buscar_cis()
      },[])
    const buscar_cis_docss=()=>{
        
        
        // setLoadingCis(true)
        setdataCisDocs({data:dataCisDocs.data,loading:true,error:dataCisDocs.error})
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/'+cisSelected.element_id)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/'+cisSelected.element_id, {
                method: 'GET',  
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
              });
              console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                // setLoadingCis(false)
                console.log(data1)
                setdataCisDocs({data:data1.data,loading:false,error:dataCisDocs.error})
                // setCreateCisModalOpen(true)
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
    const buscar_cis=()=>{
        
        
        setDataCis({data:dataCis.data,loading:true,error:null})
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/')
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/', {
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
                // setLoadingCis(false)
                console.log(data1)
                setDataCis({data:data1.data,loading:false,error:null})
                // setCreateCisModalOpen(true)
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
    const handledeleteDocClick=(elemento)=>{
        
            console.log("eliminar")
            
            
              const fetchDataPost = async () => {
                console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/'+elemento.doc_id)
             try {
                  const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/'+elemento.doc_id, {
                 
                    method: 'DELETE',  
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                  });
                 console.log(response)
                  if (response.ok) {
                    
                    const data1 = await response.json();
                   
                    console.log(data1)
                    setResponseDetail({text:data1.message,value:true})
                    const timer = setTimeout(() => {
                        setResponseDetail({text:'',value:true})
                      }, 2000);
                      buscar_cis_docss()
                  } else {
                    throw new Error('Error en la solicitud');
                  }
                } catch (error) {
                  
                  console.error(error);
                }
              };
          
              fetchDataPost();
              
        
    }
   const handledownloadDocClick=(elemento)=>{
    console.log("eliminar")
            
            
    const fetchDataPost = async () => {
      console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/download/'+elemento.doc_id)
   try {
        const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/download/'+elemento.doc_id, {
       
          method: 'GET',  
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
       console.log(response)
        if (response.ok) {
            try {
                const response_data = await response.blob();
                console.log(response_data)
          
                // Crear un enlace para descargar el archivo
                const url = window.URL.createObjectURL(response_data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', elemento.filename); // Cambia el nombre y la extensión del archivo
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
              } catch (error) {
                console.error('Error al descargar el archivo', error);
              }
          
        //   setResponseDetail({text:data1.message,value:true})
        //   const timer = setTimeout(() => {
        //       setResponseDetail({text:'',value:true})
        //     }, 2000);
            
        } else {
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
        
        console.error(error);
      }
    };

    fetchDataPost();
   }

    
      const handleFileChange = (event) => {
        const nombreArchivo = event.target.value.split('\\').pop();
        document.getElementById('nombre-archivo').textContent =  (nombreArchivo.length>25)?nombreArchivo.slice(25)+'...':nombreArchivo;
     
        const file = event.target.files[0];
         console.log(file)
         setFiles(file)
    }
    const addFile=()=>{
        setLoading(true)
        uploadFile(files);  
    }
    const uploadFile = (file) => {
        const formData = new FormData();
        formData.append('files', file, file.name);
    
        fetch('http://172.18.200.14:8002/api/v1/cassia/ci_elements/docs/'+cisSelected.element_id, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Reemplaza tu_token con tu token de autorización
          },
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta de la API:', data);
          document.getElementById('nombre-archivo').textContent =''
          setFiles([])
          setLoading(false)
          buscar_cis_docss()
          setResponseDetail({text:data.message,value:true})
            const timer = setTimeout(() => {
                setResponseDetail({text:'',value:true})
              }, 2000);
        })
        .catch(error => {
          console.error('Error al enviar el archivo:', error);
        });
      }
   return(
       <>
       <div className="modal-user-content">
            <div className='card-users modal-verificate'>
                <div className='head-card-cis'>
                    <div className='title-head-card-users' style={{display:'flex',justifyContent:'space-around'}}>
                       <p>Documentos de : &nbsp;</p><p>  {'   '+cisSelected.folio}</p>
                    </div>
                </div>
                <div className='content-card-users' >
                <div className='body_info_cis_docs'>
        <div className='content-cis_docs' style={{border: 'px solid #607582',boxShadow:'unset'}}>
                
                <div className='cont-cis-search' style={{background:'transparent '}}>
              
              <>
                <div className='cont-search-docs hiddenPDF'>
                    <div class="custom-file-input">
                        <input type="file" id="archivo" class="input-file"  onChange={handleFileChange} />
                        <label for="archivo" class="btn">Examinar</label>
                        <span id="nombre-archivo"></span>
                    </div>

                </div>
                {/* <div className='cont-search-space'>
                        <div className='msgErrorRelation' style={{color:(responseDetail.value)?'gree':'red'}}>
                            {responseDetail.text}
                        </div>
                </div> */}
                <div className='cont-search-buttons hiddenPDF'>
                <Action disabled={(files.length===0)?true:false} origen='Blanco' titulo='+ Agregar ' action={addFile}  />
                </div>
              </>
                </div>
                <div className='cont-cis-table-docs'>
                    <div className='content-card-cis-docs ' style={{overflowY: 'scroll',scrollbarWidth: 'thin'}}>
                    
                    {
                        (dataCisDocs.loading || loading)?<LoadSimple></LoadSimple>:
                        
                        dataCisDocs.data.map((elemento, indice) => (
                        <div className='cont-elemen-docs' >
                            <div className='elemen-docs'>
                               <div className='con-elemen-docs-info'>
                                {elemento.filename}
                                </div>
                                <div className='con-elemen-docs-img'>
                                    <div className='cont-img-field-acciones' >
                                        <img className='img-field-acciones img-docs' src='/iconos/pdf.png' title='Descargar'name='Descargar' ci_id={elemento.ci_id} onClick={(e)=> {e.stopPropagation(); handledownloadDocClick(elemento)}} />
                                    </div>
                                </div>
                                <div className='con-elemen-docs-img'>
                                    <div className='cont-img-field-acciones' >
                                        <img className='img-field-acciones img-docs' src='/iconos/delete.png' title='Eliminar'name='Eliminar' ci_id={elemento.ci_id} onClick={(e)=> {e.stopPropagation(); handledeleteDocClick(elemento)}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))

                    }
                                    
                    </div>
                </div>
            </div>
        </div>
                                   
                </div>
                <div className='msgErrorDocs' style={{color:(responseDetail.value)?'gree':'red'}}>
                           {responseDetail.text}
                        </div>
                </div>
        </div>
       </>
    )
}

export default ModalCisDocs
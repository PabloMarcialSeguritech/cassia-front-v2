import Action from '../Action'
import './styles/ModalCisDocs.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
import Search from '../generales/Search';
import SelectorAdmin from '../SelectorAdmin'
const ModalCisDocs =({server,closeCisAfectaModal,cisSelected})=>{
    
    const [dataCisDocs,setdataCisDocs]=useState({data:[],loading:true,error:null})
    const [dataCis,setDataCis]=useState({data:[],loading:true,error:null})
    const [cisRelation,setCisRelation]=useState(0)
    const [relationResponse,setRelationResponse]=useState([])
    const [responseDetail,setResponseDetail]=useState({text:'',value:true})
    const [files,setFiles]=useState([])
    const [loading,setLoading]=useState(false)
    const [docMode,setDocMode]=useState(true)
    const [dataUrl,setDataUrl]=useState('')
    const [nameUrl,setNameUrl]=useState('')
    const [urlValid,setUrlValid]=useState(false)
    const [btnDisables,setBtnDisabled]=useState(false)
    console.log(dataUrl,nameUrl)
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
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/v2/'+cisSelected.element_id, {
              // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/'+cisSelected.element_id, {    
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
            setLoading(true)
            
              const fetchDataPost = async () => {
                console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/'+elemento.doc_id)
             try {
                  const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/docs/v2/'+elemento.doc_id, {
                 
                    method: 'DELETE',  
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                  });
                 console.log(response)
                  if (response.ok) {
                    
                    const data1 = await response.json();
                    setLoading(false)
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
        document.getElementById('nombre-archivo').textContent =  (nombreArchivo.length>40)?nombreArchivo.slice(40)+'...':nombreArchivo;
     
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
        // console.log(file.name)
        formData.append('files', file, file.name);
        formData.append('file_names', file.name);
        fetch('http://172.18.200.14:8002/api/v1/cassia/ci_elements/docs/v2/'+cisSelected.element_id, {
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
      const addUrl=()=>{
        setLoading(true)
        uploadUrl();  
    }
    const uploadUrl = () => {
        const formData = new FormData();
        formData.append('files', dataUrl);
        formData.append('file_names', nameUrl);
        // formData.append('files', file, file.name);
        fetch('http://172.18.200.14:8002/api/v1/cassia/ci_elements/docs/v2/'+cisSelected.element_id, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Reemplaza tu_token con tu token de autorización
          },
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta de la API:', data);
          // document.getElementById('nombre-archivo').textContent =''
          setFiles([])
          setLoading(false)
          buscar_cis_docss()
          setDataUrl("")
          setBtnDisabled(true)
          setNameUrl("")
          setResponseDetail({text:data.message,value:true})
            const timer = setTimeout(() => {
                setResponseDetail({text:'',value:true})
              }, 2000);
        })
        .catch(error => {
          console.error('Error al enviar el archivo:', error);
        });
      }
      const handleChange=(e)=>{
        console.log(e.target.name)
        const {name,value}=e.target
        if(name=='URL'){
          setDataUrl(value)
        }else{
          setNameUrl(value)
        }
        
        // setUrlValid(validateurl(value))
        setUrlValid(true)
      }
      useEffect(()=>{
          if(dataUrl=="" || nameUrl==""){
            setBtnDisabled(true)
          }else{
            setBtnDisabled(false)
          }
      },[dataUrl,nameUrl])
      const validateurl= (url) => {
        
        const ipRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/;
        let result = ipRegex.test(url);
        console.log("validando url: ",url ,result)
        
        return result;
      };
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
                  <div className='cont-docs-menu'>
                    <div className='compact-switch-docs-menu'>
                    <div class="container-switch-docs-menu">
        <input type="checkbox" name="check" onClick={()=>setDocMode(!docMode)} defaultChecked={true} id="check" hidden="" style={{position: "relative",left: "15%"}}/>
        <label for="check" class="toggle">
            <div class="toggle__circle"></div>
        </label>
        <div class="toggle-text">
            <span style={{height:'50%',display:'flex',alignItems:'center'}}>PDF</span>
            <span style={{height:'50%',display:'flex',alignItems:'center'}}>URL</span>
        </div>
    </div>
                    </div>
                    <div className='form-docs-cis'>
                      {
                        (docMode)?<>
                        <div className='cont-search-docs hiddenPDF'>
                            <div className="custom-file-input">
                                <input type="file" id="archivo" className="input-file"  onChange={handleFileChange} />
                                <label for="archivo" className="btn">Examinar</label>
                                <span id="nombre-archivo"></span>
                            </div>
        
                        </div>
                        <div className='cont-search-buttons hiddenPDF'>
                        <Action disabled={(files.length===0)?true:false} origen='Blanco' titulo='Agregar' action={addFile}  />
                        </div>
                      </>:
                      <>
                      <div className='cont-inpt-url-doc'>
                      <label className='lbl-doc-url ' style={{color:'#003757'}}>{'URL  '}</label>
                                        <input className='inp-doc-url' required name="URL"  placeholder='URL' type="text" value={dataUrl}
                                    onChange={handleChange}  />   
                      </div>
                      <div className='cont-inpt-url-doc'>
                      <label className='lbl-doc-url '>Nombre</label>
                                        <input className='inp-doc-url' required name="Nombre"  placeholder='Nombre' type="text" value={nameUrl}
                                    onChange={handleChange}  />
                      </div>
                      <div className='cont-search-buttons hiddenPDF'>
                      <Action disabled={btnDisables} origen='Blanco' titulo='Agregar' action={addUrl}  />
                      </div>
                    </>
                      }
                  
                    </div>
                  
                  </div>

              


                </div>
                <div className='cont-cis-table-docs'>
                    <div className='content-card-cis-docs ' style={{overflowY: 'scroll',scrollbarWidth: 'thin'}}>
                    
                    {
                        (dataCisDocs.loading || loading)?<div style={{display:'flex',position:'relative',width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}><LoadSimple></LoadSimple></div>:
                        
                        dataCisDocs.data.map((elemento, indice) => (
                        <div className='cont-elemen-docs' >
                            <div className='elemen-docs'>
                               <div className='con-elemen-docs-info'>
                                {elemento.filename.slice(0,40)+" "+(elemento.filename.length>40?'...':'')}
                                </div>
                                <div className='con-elemen-docs-img'>
                                    <div className='cont-img-field-acciones' >
                                      {
                                        (elemento.is_link=='1')?
                                        <a  target="_blank" href={"https://"+elemento.path}>
                                          <img className='img-field-acciones img-docs' src={'/iconos/web.png'} title='IR'name='IR' ci_id={elemento.ci_id}  />
                                        </a>:
                                        <img className='img-field-acciones img-docs' src={'/iconos/pdf.png'} title='Descargar'name='Descargar' ci_id={elemento.ci_id} onClick={(e)=> {e.stopPropagation(); handledownloadDocClick(elemento)}} />
                                      }
                                        
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
import Action from '../Action'
import './styles/ModalAcciones.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
import Search from '../generales/Search';
import SelectorAdmin from '../SelectorAdmin'
import Modal from 'react-modal';
import ModalCreateRelation from './ModalCreateRelation';
const CreateCisModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      background: '#ffffff !important',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'50%',
      height:'40%',
      padding:'20px'
    },
  };
const ModalAcciones =({server,actionSelectedAux,registerIsValid,setRegisterIsValid})=>{
    const [CreateActionModalOpen, setCreateActionModalOpen] =useState(false);
    const [dataActionRel,setDataActionRel]=useState({data:[],loading:true,error:null})
    const [dataAction,setDataAction]=useState({data:[],loading:true,error:null})
    const [cisRelation,setCisRelation]=useState(0)
    const [relationResponse,setRelationResponse]=useState([])
    const [responseDetail,setResponseDetail]=useState({text:'',value:true})
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    var dataList=(searchTerm==='')?dataAction.data.relations:searchResults;
    console.log(dataAction)
    useEffect(()=>{
        // buscar_action_relations()
        buscar_action()
      },[])
      const crear = () => {
        // Aquí puedes realizar la búsqueda usando el valor de 'query'
        // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
        setCreateActionModalOpen(true)
      }
      function closCreateRelationModal() {
  
        setCreateActionModalOpen(false);
      }
      useEffect(()=>{
       
        if(registerIsValid){
            buscar_action()
        }
  },[registerIsValid])
    // const buscar_action_relations=()=>{
        
        
    //     // setLoadingCis(true)
    //     setDataActionRel({data:dataActionRel.data,loading:true,error:dataActionRel.error})
    //       const fetchDataPost = async () => {
            
    //      try {
    //         console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/relations/'+actionSelectedAux.element_id)
    //         const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/relations/'+actionSelectedAux.element_id, {
    //             method: 'GET',  
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    //             },
    //           });
    //           console.log(response)
    //           if (response.ok) {
                
    //             const data1 = await response.json();
    //             // setLoadingCis(false)
    //             console.log(data1)
    //             setDataActionRel({data:data1.data,loading:false,error:dataActionRel.error})
    //             // setCreateActionModalOpen(true)
    //           } else {
    //             const data1 = await response.json();
    //             console.log(data1)
    //             throw new Error('Error en la solicitud');
    //           }
    //         } catch (error) {
    //           console.error(error);
    //         }
    //       };
      
    //       fetchDataPost();
        
    // }
    const buscar_action=()=>{
        
        
        setDataAction({data:dataAction.data,loading:true,error:null})
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/relations/'+actionSelectedAux.action_id)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/relations/'+actionSelectedAux.action_id, {
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
                setDataAction({data:data1.data,loading:false,error:null})
                // setCreateActionModalOpen(true)
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
    const handledeleteRelationClick=(elemento)=>{
        
            console.log("eliminar")
            console.log(elemento)
            
              const fetchDataPost = async () => {
                console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/relations/'+elemento.int_act_id)
             try {
                  const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/relations/'+elemento.int_act_id, {
                 
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
                    // setResponseDetail({text:data1.message,value:true})
                    // const timer = setTimeout(() => {
                    //     setResponseDetail({text:'',value:true})
                    //   }, 2000);
                      buscar_action()
                  } else {
                    throw new Error('Error en la solicitud');
                  }
                } catch (error) {
                  
                  console.error(error);
                }
              };
          
              fetchDataPost();
              
        
    }
    const changeOption=(option,index)=>{
        
        console.log(option)
        setCisRelation(option.value)
            
    }

    const addRelation=async(e)=>{
        console.log("element_id:"+actionSelectedAux.element_id+" | ci-relation:"+cisRelation)
        
        const formData = new URLSearchParams();
        formData.append("affected_ci_element_id", cisRelation);
        
      
        try {
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/relations/'+actionSelectedAux.element_id, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: formData
          });
          console.log(response)
          if (response.ok) {
            
            const data = await response.json();
            setRelationResponse(data)
            setResponseDetail({text:'',value:true})
            const timer = setTimeout(() => {
                setResponseDetail({text:'',value:true})
              }, 2000);
            // buscar_action_relations()
          } else {
            const data = await response.json();
            console.log(data.detail)
            setResponseDetail({text:data.detail,value:false})
            throw new Error('Error en la solicitud');
          }
        
        } catch (error) {
            
           console.log(error)
          
        }
    }
   return(
       <>
       <div className="modal-user-content">
            <div className='card-users modal-verificate'>
                <div className='head-card-accManage'>
                    <div className='title-head-card-users' style={{display:'flex',justifyContent:'space-around'}}>
                       <p>Editar Acción  &nbsp;</p><p>  {'   '+actionSelectedAux.action_id}</p>
                    </div>
                </div>
                <div className='content-card-users' >
                <div className='body_info_cis_relation'>
        <div className='content-accManage_relation' style={{border: 'px solid #607582',boxShadow:'unset'}}>
                
                <div className='cont-accManage-info'>
                    <div className='row-accManage-info'>
                        <div className='cont-title-accManage-info'>
                            <div className='title-accManage-info'>
                                Nombre de la acción
                            </div>
                        </div>
                        <div className='cont-box-accManage-info'>
                            <div className='box-accManage-info'>
                                {(dataAction.loading)?'...':dataAction.data.name}
                            </div>
                        </div>
                    </div>
                    <div className='row-accManage-info'>
                        <div className='cont-title-accManage-info'>
                            <div className='title-accManage-info'>
                            Descripción:
                            </div>
                        </div>
                        <div className='cont-box-accManage-info'>
                            <div className='box-accManage-info'>
                                {(dataAction.loading)?'...':''}
                            </div>
                        </div>
                    </div>
                    <div className='row-accManage-info'>
                        <div className='cont-title-accManage-info'>
                            <div className='title-accManage-info'>
                                Tipo:
                            </div>
                        </div>
                        <div className='cont-box-accManage-info'>
                            <div className='box-accManage-info'>
                                {(dataAction.loading)?'...':dataAction.data.protocol}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='cont-accManage-search' style={{background:'transparent '}}>
              
              <>
                <div className='cont-search-relation-accManage hiddenPDF'>
                    
                <Search searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={()=>{}}  dataObject={dataAction.data.relations} setDataObject={setDataAction}/>
                </div>
                <div className='cont-search-space'>
                        <div className='msgErrorRelation' style={{color:(responseDetail.value)?'gree':'red'}}>
                            {responseDetail.text}
                        </div>
                </div>
                <div className='cont-search-buttons hiddenPDF'>
                <Action disabled={false} origen='Blanco' titulo='+ Agregar ' action={crear}  />
                </div>
              </>
                </div>
                <div className='cont-accManage-table-relation' style={{height:'65%'}}>
                    <div className='content-card-accManage-relation ' style={{overflowY: 'scroll',scrollbarWidth: 'thin'}}>
                    
                    {
                        (dataAction.loading)?<LoadSimple></LoadSimple>:
                        
                        dataList.map((elemento, indice) => (
                        <div className='cont-elemen-relation' >
                            <div className='elemen-relation' style={{width:'95%'}}>
                               <div className='con-elemen-relation-info'>
                                <p style={{color:'#003757',fontSize:'x-small'}}>{elemento.ip+' / '}</p>&nbsp;<p style={{color:'#505050',fontSize:'x-small'}}>{elemento.name}</p>
                                </div>
                                <div className='con-elemen-relation-img'>
                                    <div className='cont-img-field-acciones' >
                                        <img className='img-field-acciones img-relation' src='/iconos/delete.png' title='Eliminar'name='Eliminar' ci_id={elemento.ci_id} onClick={(e)=> {e.stopPropagation(); handledeleteRelationClick(elemento)}} />
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
                </div>
        </div>
        <Modal
        isOpen={CreateActionModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        // onRequestClose={closCreateRelationModal}
        style={CreateCisModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalCreateRelation server={server} registerIsValid={registerIsValid} setRegisterIsValid={setRegisterIsValid} actionSelectedAux={actionSelectedAux}  closCreateRelationModal={closCreateRelationModal}/>
    </Modal>
       </>
       
    )
}

export default ModalAcciones
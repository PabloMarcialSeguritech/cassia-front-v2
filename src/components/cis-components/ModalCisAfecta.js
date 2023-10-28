import Action from '../Action'
import './styles/ModalCisAfecta.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
import Search from './Search';
import SelectorAdmin from '../SelectorAdmin'
const ModalCisAfecta =({server,closeCisAfectaModal,cisSelected})=>{
    
    const [dataCisRel,setDataCisRel]=useState({data:[],loading:true,error:null})
    const [dataCis,setDataCis]=useState({data:[],loading:true,error:null})
    const [cisRelation,setCisRelation]=useState(0)
    const [relationResponse,setRelationResponse]=useState([])
    const [responseDetail,setResponseDetail]=useState({text:'',value:true})
    useEffect(()=>{
        buscar_cis_relations()
        buscar_cis()
      },[])
    const buscar_cis_relations=()=>{
        
        
        // setLoadingCis(true)
        setDataCisRel({data:dataCisRel.data,loading:true,error:dataCisRel.error})
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/relations/'+cisSelected.element_id)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/relations/'+cisSelected.element_id, {
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
                setDataCisRel({data:data1.data,loading:false,error:dataCisRel.error})
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
    const handledeleteRelationClick=(elemento)=>{
        
            console.log("eliminar")
            
            
              const fetchDataPost = async () => {
                console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/relations/'+elemento.cassia_ci_relation_id)
             try {
                  const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/relations/'+elemento.cassia_ci_relation_id, {
                 
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
                      buscar_cis_relations()
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
        console.log("element_id:"+cisSelected.element_id+" | ci-relation:"+cisRelation)
        
        const formData = new URLSearchParams();
        formData.append("affected_ci_element_id", cisRelation);
        
      
        try {
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/relations/'+cisSelected.element_id, {
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
            buscar_cis_relations()
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
                <div className='head-card-cis'>
                    <div className='title-head-card-users' style={{display:'flex',justifyContent:'space-around'}}>
                       <p>CI´s afectador por: &nbsp;</p><p>  {'   '+cisSelected.folio}</p>
                    </div>
                </div>
                <div className='content-card-users' >
                <div className='body_info_cis_relation'>
        <div className='content-cis_relation' style={{border: 'px solid #607582',boxShadow:'unset'}}>
                {/* <div className='cont-cis-search' style={{background:'transparent '}}>
              
              <>
                <div className='cont-search-relation hiddenPDF'>
                    <Search  dataUsers={[]}  />
                </div>
                <div className='cont-search-space'>

                </div>
                <div className='cont-search-buttons hiddenPDF'>
                </div>
              </>
                </div> */}
                <div className='cont-cis-search' style={{background:'transparent '}}>
              
              <>
                <div className='cont-search-relation hiddenPDF'>
                    
                <SelectorAdmin opGeneral={false} txtOpGen={'TODOS'}  opt_de={'0'}origen={'Admin'} data={dataCis.data} loading={dataCis.loading}  titulo='CIS' selectFunction={changeOption} index={0}></SelectorAdmin>
                </div>
                <div className='cont-search-space'>
                        <div className='msgErrorRelation' style={{color:(responseDetail.value)?'gree':'red'}}>
                            {responseDetail.text}
                        </div>
                </div>
                <div className='cont-search-buttons hiddenPDF'>
                <Action disabled={false} origen='Blanco' titulo='+ Agregar ' action={addRelation}  />
                </div>
              </>
                </div>
                <div className='cont-cis-table-relation'>
                    <div className='content-card-cis-relation ' style={{overflowY: 'scroll',scrollbarWidth: 'thin'}}>
                    
                    {
                        (dataCisRel.loading)?<LoadSimple></LoadSimple>:
                        
                        dataCisRel.data.map((elemento, indice) => (
                        <div className='cont-elemen-relation' >
                            <div className='elemen-relation'>
                               <div className='con-elemen-relation-info'>
                                {elemento.folio}
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
       </>
    )
}

export default ModalCisAfecta
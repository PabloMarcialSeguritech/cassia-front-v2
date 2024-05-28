
import { useState,useEffect } from 'react'
import './styles/NotifiAdmin.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import Selector from '../Selector'
import LoadSimple from '../LoadSimple'
import {roles}  from '../generales/GroupsId';
const NotifiAdmin=({server})=>{
    console.log('entra roles')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [editActive, setEditActive] = useState(false);
    const [nivelForm,setNivelForm]=useState(1)
    const [userData,setUserData]=useState({name:"",description:"",permissions:""})
    const [disabled,setDisabled]=useState(true)
    const [permisos,setPermisos]=useState([])
    const [loading,setLoading]=useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rolSelected,setRolSelected]=useState(0)
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
      });
      const [infoPermission,setInfoPermission]=useState('')
    const [dataPermisos,setDataPermisos]=useState({data:[],loading:true,error:''})
    const [dataRoles,setDataRoles]=useState({data:[],loading:true,error:''})
    const [dataReports,setDataReports]=useState({data:[],loading:true,error:''})
    const [RolData,setRolData]=useState({data:[],loading:true,error:''})
    // const dataPermisos=useFetch('cassia/users/roles/permissions/get','',localStorage.getItem('access_token'),'GET',server)
    // const dataRoles=useFetch('cassia/users/roles','',localStorage.getItem('access_token'),'GET',server)
    console.log(userData)
    console.log(RolData)
    console.log(permisos)
    console.log(permisos.join(','))
    const addPermiso=(e)=>{
        console.log('addPermiso')
        
        if (permisos.includes(e)) {
            // Eliminar el valor si ya existe
            const nuevoArreglo = permisos.filter(valor => valor !== e);
            setPermisos(nuevoArreglo);
          } else {
            // Agregar el valor si no existe
            const nuevoArreglo = [...permisos, e];
            setPermisos(nuevoArreglo);
          }
        // const nuevoArreglo = [...permisos, e]
        
        
    }

    useEffect(()=>{
        console.log(permisos.length)
        if(permisos.length!==0  && userData.name!==""){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
        setUserData((prevState)=>{
            return {
                ...prevState,
                ['permissions']:permisos.join(',')
            }
            
        })
    },[permisos])
    useEffect(()=>{
      if(editActive){
        console.log()
        // const permissionIds = RolData.data.data.permissions.map(item => item.permission_id);
        // setPermisos(permissionIds)
        // console.log(permissionIds);
      }
      
  },[RolData.data])
    const handleChange=(e)=>{
        console.log(e)
        const {name,value}=e.target
        setUserData((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
            
        })
        if(permisos.length!==0  && value!==""){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
      }
      const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
      const [idUsers,setIdUsers]=useState([])
      console.log(idUsers)
  const getRoles=()=>{
    console.log('solicita permisos')
    setDataRoles({data:dataRoles.data,loading:true,error:''})
      const fetchDataPost = async () => {
        
     try {
        console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/users')
      
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/notifications/user_reports', {
            method: 'GET',  
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
         
          if (response.ok) {
            
            const data1 = await response.json();
            console.log(data1)
            setIdUsers(data1.data.map(obj => obj.user_id))
            setDataRoles({data:data1,loading:false,error:''})
            setSelectedCheckboxes(data1.data.filter(obj => obj["1"] === 1).map(obj => obj.user_id))
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
            setDataRoles({data:dataRoles.data,loading:false,error:''})
          console.error(error);
        }
      };
  
      fetchDataPost();
      

}

const getReportesInfo=()=>{
  console.log('solicita permisos')
  setDataReports({data:dataReports.data,loading:true,error:''})
    const fetchDataPost = async () => {
      
   try {
      console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/users')
    
        const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/notifications/report_names', {
          method: 'GET',  
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
       
        if (response.ok) {
          
          const data1 = await response.json();
          console.log(data1)
        
          setDataReports({data:data1,loading:false,error:''})
          
        } else {
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
        setDataReports({data:dataReports.data,loading:false,error:''})
        console.error(error);
      }
    };

    fetchDataPost();
    

}
  useEffect(()=>{
    console.log('inicia roles')
    // getPermisos()
    getReportesInfo()
    getRoles()
},[])
 

console.log(selectedCheckboxes)
const handleSelectAll = (event) => {
    console.log(event)
    if (event.target.checked ) {
      const allCheckboxes = dataRoles.data.data.map((element) => element.user_id);
      setSelectedCheckboxes(allCheckboxes);
    } else {
      setSelectedCheckboxes([]);
    }
  };

  // Maneja la selección individual de cada checkbox
  const handleCheckboxChange = (rol_id) => {
    setSelectedCheckboxes((prevSelected) =>
      prevSelected.includes(rol_id)
        ? prevSelected.filter((id) => id !== rol_id)
        : [...prevSelected, rol_id]
    );
  };
  const [arraySave,setArraySet]=useState({users_ids:[],cassia_report_frequency_schedule_ids:[]})
  const guardar=()=>{
    const  result = {
      user_ids: idUsers,
      cassia_report_frequency_schedule_ids: idUsers.map(user_id => selectedCheckboxes.includes(user_id) ? [1] : [])
    }
    console.log(result)

    
    console.log("registra")
    let method='POST'
    
    setDataRoles({data:dataRoles.data,loading:true,error:''})
   
      const fetchDataPost = async () => {
        
     try {
        console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/notifications/user_reports')
        console.log(JSON.stringify(result))
        console.log(localStorage.getItem('access_token'))
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/notifications/user_reports', {
            method: method,  
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(result),
          });
         console.log(response)
          if (response.ok) {
            
            const data1 = await response.json();
            // setLoading(false)
            // setUserData({name:"",description:"",permissions:""})
            // setPermisos([])
           
            getRoles()
           
            setDataRoles({data:dataRoles.data,loading:false,error:''})
           
            console.log(data1);
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
            // setUserData({name:"",description:"",permissions:""})
            // setPermisos([])
            // setDataPermisos({data:dataPermisos.data,loading:false,error:''})
    setLoading(false)
          console.error(error);
        }
      };
  
      fetchDataPost();
      
  }
      const {name,description,permissions}=userData
    return (
        <div className="main-users-admin">
            <div className='content-users-admin'>
                
                <div className='left-users-admin block-users-admin NotifiAdminCont' >
                    <div className='card-users'>
                        <div className='head-card-users'>
                                <div className='title-head-card-users'>
                                    Notificaciones por Usuario
                                </div>
                                <div className='cont-search-buttons' style={{position: 'absolute',right: '0%'}}>
                <Action disabled={false} origen='Blanco' titulo='Guardar'  action={guardar}/>
                </div>
                            </div>
                            <div className='content-card-users' style={{height: '90%'}}>
                            <div className='cont-table-users-main NotifiAdmin'>
                                <div className='cont-table-users cont-table-roles ' >
                                    <div className='head-table-users'>
                                        {/* <div className='field-head-table-users field-acciones'>
                                            Acciones
                                        </div> */}
                                        <div className='field-head-table-users field-nombre' style={{width:'30%'}}>
                                            Usuarios
                                        </div>
                                       
                                        {(dataReports.loading)?'':
                                        dataReports.data.data.map((element,index)=>(
                                          <div className='field-head-table-users field-nombre' style={{width:'15%'}}>
                                          <div className='headNotifiAdmi '>
                                          <div class="tooltiptextNotifi" >{element.description}</div>
                                          {element.name}
                                          </div>
                                          <div className='contCheckNotifiAdmi'>
                                              <div className='title'>
                                                  TODOS
                                              </div>
                                              <div className='input'>
                                              {
                                                 (dataRoles.loading)?<></>:
                                                  <input type='checkbox' className='NotifiCheckBox' onClick={handleSelectAll} checked={selectedCheckboxes.length === dataRoles.data.data.length}></input>
                                              }
                                              </div>
                                         
                                          </div>
                                      </div>))
                                        }
                                         
                                        

                                    </div>
                                    <div className='body-table-users'>
                                    <div className='cont-row-user-list'>
                                    { (dataRoles.loading)?<div style={{width:'100%',height:'95%',display:'flex',justifyContent:'center'}}><LoadSimple></LoadSimple></div>:
                                                dataRoles.data.data.map((element,index)=>(
                                                    <div className='row-table-users' key={index} >
                                                    <div className='field-body-table-users field-nombre' style={{width:'30%'}}>
                                                      {element.name}
                                                    </div>
                                                    
                                            <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
                                                   <input    type='checkbox' className='NotifiCheckBox noti1' checked={selectedCheckboxes.includes(element.user_id)} defaultChecked={true} 
                  onChange={() => handleCheckboxChange(element.user_id)}></input>
                                                    </div>
                                            
                                                    
                                                  </div>   
                                            ))}
        
            
           
        
        
      </div>
                                        
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotifiAdmin
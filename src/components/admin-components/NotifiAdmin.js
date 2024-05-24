
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
      
      
  const getRoles=()=>{
    console.log('solicita permisos')
    setDataRoles({data:dataRoles.data,loading:true,error:''})
      const fetchDataPost = async () => {
        
     try {
        console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/users')
      
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/users', {
            method: 'GET',  
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
         
          if (response.ok) {
            
            const data1 = await response.json();
            console.log(data1)
            setDataRoles({data:data1,loading:false,error:''})
           
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
  useEffect(()=>{
    console.log('inicia roles')
    // getPermisos()
    getRoles()
},[])
 
const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
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
  const selectAll=(id)=>{

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
                            </div>
                            <div className='content-card-users' style={{height: '90%'}}>
                            <div className='cont-table-users-main NotifiAdmin'>
                                <div className='cont-table-users cont-table-roles ' >
                                    <div className='head-table-users'>
                                        {/* <div className='field-head-table-users field-acciones'>
                                            Acciones
                                        </div> */}
                                        <div className='field-head-table-users field-nombre' style={{width:'30%'}}>
                                            Rol
                                        </div>
                                        {/* { (dataPermisos.loading)?<div style={{width:'100%',height:'95%',display:'flex',justifyContent:'center'}}><LoadSimple></LoadSimple></div>:
                                                dataPermisos.data.data.map((element,index)=>(
                                                    <div className='field-head-table-users field-nombre' style={{width:'20%',fontSize:'small', display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                                            {element.module_name}
                                        </div>
                                            ))} */}
                                             {/* <div className='field-head-table-users field-nombre' style={{width:'20%'}}>
                                            
                                        </div> */}
                                        <div className='field-head-table-users field-nombre' style={{width:'15%'}}>
                                            <div className='headNotifiAdmi'>
                                            Permiso 1
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
                                        </div>
                                         
                                        

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
                                                   <input type='checkbox' className='NotifiCheckBox noti1' checked={selectedCheckboxes.includes(element.user_id)}
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
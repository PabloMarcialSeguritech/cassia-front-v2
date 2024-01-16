import React,{useEffect, useState} from 'react';
import '../components/styles/Login.css'
import Action from '../components/Action'
import LoadSimple from '../components/LoadSimple';
const Login = ({ onLogin,token,setToken,userData,setUserData,server}) => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
const [loginData,setLoginData]=useState({email:"",password:""})
const [disabled,setDisabled]=useState(true)
const [userVal,setUserVal]=useState(true)
const [msgError,setMsgError]=useState('')
  const handleChange=(e)=>{
    
    const {name,value}=e.target
    setLoginData((prevState)=>{
        return {
            ...prevState,
            [name]:value
        }
        
    })
    
  }

  useEffect(()=>{
    
        if(loginData.email==="" || loginData.password===""){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
  },[loginData])
  
   
  const handleSubmit = async (e) => {
    
    setLoading(true)
        const formData = new URLSearchParams();
        formData.append("username", loginData.email);
        formData.append("password", loginData.password);
        formData.append("grant_type", "");
        formData.append("scope", "");
        formData.append("client_id", "");
        formData.append("client_secret", "");
      
        try {
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/auth/login', {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
          });
         
          if (response.ok) {
            
            const data = await response.json();
            setLoading(false)
            setData(data)
            localStorage.setItem('user_cassia',loginData.email)
            localStorage.setItem('password_cassia_'+data.data.access_token,loginData.password)
            setUserVal(true)
            onLogin(data);
            
          } else {
            setMsgError('Correo o Contraseña incorrectos, favor de intentar de nuevo.')
            setUserVal(false)
            throw new Error('Error en la solicitud');
          }
        
        } catch (error) {
          setLoading(false)
            setError(error)
            setMsgError('Error de conexion con el server')
            setUserVal(false)
           console.log(error)
          
        }
      
  };
  
  const {email,password}=loginData
    return (
        <div className='main-login'> 
        <div className='cont-login rigth-login'>
        
        <div className='cont-img-back'>
          <div className='cont-img'>
            <img src="ciberseguridad-seguritech.png"  className='img-show' alt="Logo"/>
          </div>
          <div className='cont-img'>
            <img src="monitoreo-2.jpeg"  className='img-show' alt="Logo"/>
          </div>
            
        </div>
        <div className='cont-shadow'>
            <img src="SeguriTech-logo-blanco.png"  className='logo-login' alt="Logo"/>
             
              </div>
        </div>
        
             
        
        <div className='cont-login left-login'>
        <img src="user_login.png"  className='img-top' alt="Logo"/>
        <div className="card_login">
          <div className="bg">
          <div className="login-box">
        <p>INGRESAR USUARIO</p>
        {/* <form> */}
          <div className="user-box">
            <input required name="email" type="text" value={email}
        onChange={handleChange} />
            <label>Correo</label>
          </div>
          <div className="user-box">
            <input required name="password" type="password"  value={password}
        onChange={handleChange} />
            <label>Contraseña</label>
          </div>
          <div className="user-box">
            {
              (loading)?<LoadSimple></LoadSimple>:
              <Action disabled={disabled} origen='Login' titulo='INGRESAR'  action={handleSubmit}/>
            }
            
          
          {/* <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Ingresar
          </a> */}
          </div>
         
        {/* </form> */}
        {/* <p>Don't have an account? <a href="" className="a2">Sign up!</a></p> */}
      </div>
      <div className='MessageErrorCont'>
        {
          userVal===false?<div className='MessageError'>
          <div className='txtMessageError'>
          {msgError}
          </div>
      </div>:''
        }
        
      </div>
          </div>
          
        </div>
        </div>
      </div>
    );
  };
  
  export default Login;
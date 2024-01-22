
import {  useEffect, useState } from 'react'
import { useFetch } from './hooks/useFetch'
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Main from './Pages/Main'
import { Route, Switch, Routes ,Link,Navigate } from 'react-router-dom';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData,setUserData]=useState({})
  const [token,setToken] = useState(localStorage.getItem('access_token'));
  const [object_state_sessions,set_object_state_sessions]=useState({})
  
  // const [server,setServer]=useState({ip:'10.60.20.250',port:8002})
  // const [server,setServer]=useState({ip:'172.16.4.249',port:8000})//EDOMEX
  const [server,setServer]=useState({ip:'172.18.200.14',port:8004})//Guanajuato
  // const [server,setServer]=useState({ip:'10.21.14.219',port:8002})
  // const [server,setServer]=useState({ip:'172.16.10.50',port:8000})
   
  
  useEffect(()=>{
    
    // set_object_state_sessions(JSON.parse(localStorage.getItem('object_state_sessions')))
    localStorage.setItem('main_server_ip',server.ip );
    localStorage.setItem('main_server_port',server.port);
    // console.log('reinicio la pagina')
    if(token===null){
         console.log("es null")
    }else{
      if(localStorage.getItem('access_token') !== localStorage.getItem('main_access_token')){
        localStorage.setItem('access_token',localStorage.getItem('main_access_token'))
      }
      setLoggedIn(true)
    }
  },[])
  const handleLogin = (e) => {
    // console.log(e)
    // setLoggedIn((loggedIn?false:true));
    if(loggedIn){
      setServer({ip:localStorage.getItem('main_server_ip'),port:localStorage.getItem('main_server_port')})
      set_object_state_sessions({})
      localStorage.removeItem('aux_change_state')
      localStorage.removeItem('password_cassia_'+ localStorage.getItem('main_access_token'))
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_session');
      localStorage.removeItem('user_cassia');
      localStorage.removeItem('main_access_token');
      localStorage.removeItem('object_state_sessions');
      localStorage.removeItem('aux_server_ip')
  localStorage.removeItem('aux_server_port')
      setLoggedIn(false)
    }else{
      setUserData(e)
      
      localStorage.setItem('user_session', JSON.stringify(e.data))
      localStorage.setItem('access_token', e.data.access_token);
      localStorage.setItem('main_access_token', e.data.access_token);
      setLoggedIn(true)
    }
    
  };
  return (
  //  <Dashboard></Dashboard>
    // <Login></Login>
    <Routes>
      <Route path="/" element={loggedIn ? <Navigate to="/main" /> : <Login onLogin={handleLogin} server={server} token={token} setToken={setToken} userData={userData} setUserData={setUserData}  />}>
        
      </Route>
      <Route path="/main" element={loggedIn ? <Main object_state_sessions={object_state_sessions} set_object_state_sessions={set_object_state_sessions} setServer={setServer} onLogin={handleLogin} token={token}  server={server} setToken={setToken} userData={userData} setUserData={setUserData}/> : <Navigate to="/" />}>
        
      </Route>
    </Routes>
  );
}

export default App;

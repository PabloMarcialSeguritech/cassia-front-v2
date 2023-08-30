
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

  console.log(token)

  useEffect(()=>{
    if(token===null){
         console.log("es null")
    }else{
      setLoggedIn(true)
    }
  },[])
  const handleLogin = (e) => {
    console.log(e)
    // setLoggedIn((loggedIn?false:true));
    if(loggedIn){
      localStorage.removeItem('access_token');
      setLoggedIn(false)
    }else{
      setUserData(e)
      console.log(e.data)
      console.log(JSON.stringify(e.data))
      localStorage.setItem('user_session', JSON.stringify(e.data))
      localStorage.setItem('access_token', e.data.refresh_token);
      setLoggedIn(true)
    }
    
  };
  return (
  //  <Dashboard></Dashboard>
    // <Login></Login>
    <Routes>
      <Route path="/" element={loggedIn ? <Navigate to="/main" /> : <Login onLogin={handleLogin}  token={token} setToken={setToken} userData={userData} setUserData={setUserData}/>}>
        
      </Route>
      <Route path="/main" element={loggedIn ? <Main  onLogin={handleLogin} token={token}  setToken={setToken} userData={userData} setUserData={setUserData}/> : <Navigate to="/" />}>
        
      </Route>
    </Routes>
  );
}

export default App;

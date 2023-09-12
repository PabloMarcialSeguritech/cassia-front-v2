import { useEffect,useState } from "react"
import axios from 'axios';
export function useFetch(url,body,token,method,server){
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    token=localStorage.getItem('access_token')
   
    useEffect(() => {
      
      setLoading(true)
      const fetchData = async () => {
        
      // console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/db/'+url+"/"+body)
        try {
          // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTE4NDI5MTd9.-qw7OFS4QYkgtglBByECAoEsHE2tiCwjkeaZLUyZMBw'; // Reemplaza con tu token de autenticación
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/'+url+"/"+body, {
            method: method,  
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(`Bearer ${token}`)
          if (response.ok) {
            
            const data1 = await response.json();
            setLoading(false)
            // Manejo de la respuesta
            setData(data1)
            // console.log(data1);
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          // Manejo de errores
          setError(error)
          console.error(error);
        }
      };
  
      fetchData();
    },[]);
return {data,loading,error}


  }


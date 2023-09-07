// import { useEffect,useState } from "react"
// import axios from 'axios';
// export function UseLogin(){
//     const [data,setData]=useState([]);
//     const [loading,setLoading]=useState(true);
//     const [error,setError]=useState(null);
//     useEffect(() => {
       
//     const handleSubmit = async () => {
//         setLoading(true)
//         const formData = new URLSearchParams();
//         formData.append("username", "juan.marcial");
//         formData.append("password", "12345678");
//         formData.append("grant_type", "");
//         formData.append("scope", "");
//         formData.append("client_id", "");
//         formData.append("client_secret", "");
      
//         try {
//           const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/auth/login', {
//             method: "POST",
//             headers: {
//               "Accept": "application/json",
//               "Content-Type": "application/x-www-form-urlencoded"
//             },
//             body: formData
//           });
//           if (response.ok) {
            
//             const data = await response.json();
//             setLoading(false)
//             setData(data)
//             // return {data,loading,error}
//           } else {
//             throw new Error('Error en la solicitud');
//           }
//         //   const data = await response.json();
//         //   console.log(data);
//         } catch (error) {
//             setError(error)
//             return {data,loading,error}
          
//         }
//       };


//       handleSubmit()
    
// },[]);
// // return handleSubmit();
// return {data,loading,error}
//   }


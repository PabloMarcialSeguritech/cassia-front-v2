import 'xterm/css/xterm.css';
import './styles/ConsolaHost.css'
import React, { useEffect, useRef, useState } from 'react';
import LoadSimple from './LoadSimple';
import { Terminal } from 'xterm';



const ConsolaHost =(props)=>{
    const ws = useRef(null);
    const consola = useRef(null);

    const terminalRef = useRef(null);
    const commandBufferRef = useRef('');

    // console.log(consola.current)
    const [conectionActive,setConectionActive]=useState(false) 
    const [msgConection,setMsgConection]=useState('Estableciendo conexíon. . .')
    console.log(conectionActive)
    const contenedorRef = useRef(null);

    // useEffect(() => {
    //   scrollAbajo();
    // }, []);
  
    // function scrollAbajo() {
    //   if (terminalRef.current) {
    //     terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    //   }
    // }
    const formatearTexto = (objeto) => {
        if (!objeto) return '';
        // Dividir el texto en líneas
        const lineas = objeto.split('\n');
console.log(lineas)
        return lineas;
    };
    useEffect(() => {
        const xterm = new Terminal({
            cursorBlink: true,
            theme: {
              background: '#1e1e1e',
              foreground: '#ffffff',
            },
          });
      
      xterm.open(terminalRef.current);
        // ws.current = new WebSocket('ws://localhost:8000/ws');
        ws.current = new WebSocket('ws://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/hosts/ws_terminal');
        // ws.onopen = function(event) {
        //     console.log("Conexión WebSocket abierta.");
        //     ws.send('hosttarget:172.16.115.253'); // Solicitar información inicial del sistema
        // };
        ws.current.onopen = function(event) {
            console.log("Conexión WebSocket abierta.");
            //const messageDiv = document.createElement('div');
            //messageDiv.textContent = msgConection;
            //messageDiv.className='startDiv'
            //consola.current.appendChild(messageDiv);
            // consola.log('hosttarget:'+props.ip)
            // ws.current.send('hosttarget:172.19.16.24'); // Solicitar información inicial del sistema
            ws.current.send('hosttarget:'+props.ip);
            xterm.writeln('Conexión WebSocket abierta.');
        };
        
        ws.current.onmessage = function(event) {
            console.log("Mensaje entrante: ", event.data);
            console.log('conect active',conectionActive);
            xterm.write(event.data);
           
            
            // Separar la respuesta usando los identificadores
            //const parts = event.data.split('<part>');
            //console.log(parts)
            //const userHost = parts[1].split('user@host:')[1].trim();
            //const message = parts[2].split('message:')[1].trim();
            // Agregar el mensaje y el prompt a la consola
            //console.log(userHost)
            //appendMessageAndPrompt(userHost, message);
        };

        ws.current.onclose = function(event) {
            console.log("Conexión WebSocket cerrada:", event);
            xterm.writeln('Conexión WebSocket cerrada.');
            props.actionConsole()
        };

        // xterm.onData((data) => {
        //     if (data === '\r') {
        //         ws.current.send(commandBufferRef.current);
        //         commandBufferRef.current = '';
        //         xterm.write('\r\n');
        //     } else if (data === '\x7f') { // Carácter de retroceso
        //         if (commandBufferRef.current.length > 0) {
        //             commandBufferRef.current = commandBufferRef.current.slice(0, -1); // Eliminar el último carácter
        //             xterm.write('\b \b'); // Retroceder y borrar el carácter en la interfaz
        //         }
        //     } else {
        //         commandBufferRef.current += data;
        //         xterm.write(data);
        //     }
        // });
        xterm.onData((data) => {
            // Intercepta Ctrl+C
                if (data === '\x03') {
                    ws.current.send('\x03');
                  commandBufferRef.current = ''; // Optionally clear command buffer
                  xterm.write('^C\r\n');
                  console.log("command buffer:acumulado: ", commandBufferRef.current)
                } else if (data === '\r') {
                  // Enter key
                  console.log("comando enviado: ", commandBufferRef.current)
                  ws.current.send(commandBufferRef.current);
                  commandBufferRef.current = '';
                  xterm.write('\r\n');
                } else if (data === 'OA') {
                  // Flecha arriba
                  // Enviar alguna operación o comando de tu backend para manejar esto
                  console.log("fa detectada")
                  ws.current.send('OA');
                  commandBufferRef.current = '';
                  xterm.write('\r\n');
                  console.log("command buffer:acumulado: ", commandBufferRef.current)
                } else if (data === 'OB') {
                  // Flecha abajo
                  // Enviar alguna operación o comando de tu backend para manejar esto
                  ws.current.send('OB');
                  xterm.write('\r\n');
                  commandBufferRef.current = '';
                  console.log("command buffer:acumulado: ", commandBufferRef.current)
                }else if(data === '[A'){
                  commandBufferRef.current = '';
                } 
                else if(data === '[B'){
                  commandBufferRef.current = '';
                } else if (data === '\x7f') { // Carácter de retroceso
                        if (commandBufferRef.current.length > 0) {
                            commandBufferRef.current = commandBufferRef.current.slice(0, -1); // Eliminar el último carácter
                            xterm.write('\b \b'); // Retroceder y borrar el carácter en la interfaz
                        }
                    }
                    
                else 
                {
                  commandBufferRef.current += data;
                  xterm.write(data); // Eco local del carácter ingresado
                  console.log("command buffer:acumulado: ", commandBufferRef.current)
                }
              });

        return () => {
            // const commandContainer = document.createElement('span');
            //     commandContainer.textContent = `Ocurrio un error, Cerrando Conexíon...`;
            //     commandContainer.classList.add('cancelDiv');
            //     // consola.current.innerHTML = '';
            // consola.current.append(commandContainer);
            ws.current.close();
        };
    }, []);
    function appendMessageAndPrompt(userHost, message) {
        // Si hay un mensaje, mostrarlo
        console.log(conectionActive)
        console.log(message)
        setConectionActive(true)
        
        if (message) {
            var lineas=formatearTexto(message)
            const messageDiv = document.createElement('div');
            // messageDiv.textContent = formatearTexto(message);
            messageDiv.className='responseDiv'
            lineas.map((linea, index) => {
                const lineDiv = document.createElement('p');
                lineDiv.textContent = linea;
                lineDiv.className='contResponseDiv'
                lineDiv.id=index
                messageDiv.append(lineDiv)
            });
            
            consola.current.appendChild(messageDiv);

        } else {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = ' ';
            consola.current.appendChild(messageDiv);
        }
        // Mostrar el prompt de user@host
        const promptSpan = document.createElement('span');
        promptSpan.classList.add('prompt');
        promptSpan.textContent = `${userHost}> `;
        consola.current.appendChild(promptSpan);
        // Crear el input para el nuevo comando
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('command-input');

        input.addEventListener('keydown', async function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = input.value;
                console.log('se envia: ',command)
                ws.current.send(command); // Enviar el comando al servidor
                // Crear un contenedor para el prompt y el comando
                const commandContainer = document.createElement('span');
                commandContainer.textContent = `${userHost}> `;
                commandContainer.classList.add('command-container');
                const messageDiv = document.createElement('div');
            messageDiv.textContent = ` ${command}`;
            messageDiv.className='commandReq'
            promptSpan.appendChild(messageDiv);
            commandContainer.appendChild(messageDiv);
                // Reemplazar el input y el prompt por el contenedor del comando en la consola
                promptSpan.removeChild(input);
                consola.current.replaceChild(commandContainer, promptSpan);
                // Añadir nueva línea después del comando enviado
                const newLine = document.createElement('div');
            }
        });

        // Añadir el input al DOM y enfocarlo
        promptSpan.appendChild(input);
        input.focus();
        // Asegurar que la consola se desplace hacia abajo automáticamente
        consola.current.scrollTop = consola.current.scrollHeight;
    }
    function closeSSH(){
        // const commandContainer = document.createElement('span');
        //         commandContainer.textContent = `Cerrando Conexíon...`;
        //         commandContainer.classList.add('cancelDiv');
        //         consola.current.innerHTML = '';
        //     consola.current.append(commandContainer);
            ws.current.close();
    }
    return(
        // <>
        // <div id="terminal" ref={terminalRef}></div>
        // </>
        <>
        <div className='contConsolTitle' >
        
        <div className='cont-btn-back-users' style={{width:'10%'}}>
                                            <div className='cont-img-back-users' onClick={()=>{ closeSSH()}}>
                                                <img  className='img-back-users' src={'/iconos/back-blanco.png'} name="regresar" />
                                                </div>
                                                {/* <div className='cont-txt-back-users'>
                                                <div className='txt-back-users'>
                                                    Regresar
                                                </div>
                                            </div> */}
        </div>
           {'Consola SSH del distpsitivo: '+props.ip}
        </div>  
        <div className='contConsolaHost'>
        
                
            <div className='contConsolText'  id="terminal" ref={terminalRef}>
                
            </div>

            {/* <div className='contConsoloptions'>
                <div className='contInputConsole'>
                    <div className='lblConsole'> {'>>'} </div>
                    <div className='inptConsole'>
                        <input  type="text"/>
                    </div>
                </div>
                <div className='contActionsConsole'>
                        
                </div>
            </div> */}
        </div>
        </>
    )
}

export default ConsolaHost
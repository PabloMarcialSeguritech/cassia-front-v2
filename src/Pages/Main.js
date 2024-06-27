import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Container from "../components/Container";
import "../components/styles/MapBox.css";
import Perfil from "../sections/Perfil";
import Admin from "../sections/Admin";
import Cis from "../sections/Cis";
import Hosts from "../sections/Hosts";
import Buzon from "../sections/Buzon";
import Reportes from "../sections/Reportes";
import Monitoreo from "../sections/Monitoreo";
import Modal from "react-modal";
import ModalVerificateUser from "../components/main-components/ModalVerificateUser";
import Portafolio from "../sections/Portafolio";
import { useState, useEffect, Component } from "react";
import { useFetch } from "../hooks/useFetch";
import Acciones from "../sections/Acciones";
import { Redirect } from "react-router-dom";
import Popup from "../components/generales/Popup";
import "../sections/styles/perfil.css";
const verificateUserModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    background: "#ffffff !important",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "70%",
    padding: "20px",
  },
};
const Main = ({
  onLogin,
  setMsgErrorLogin,
  token,
  setToken,
  server,
  setServer,
  object_state_sessions,
  set_object_state_sessions,
}) => {
  console.log(JSON.parse(localStorage.getItem("user_session")));
  const [pageSelected, setPageSelected] = useState("perfil");
  const [rol_id, setRolID] = useState("");
  const [dataPermisos, setDataPermisos] = useState({
    data: [],
    loading: true,
    error: "",
  });
  const [userPermissions, setUserPermissions] = useState([]);
  const [mode, setMode] = useState("");
  const getPermisos = (rol_id) => {
    console.log("solicita permisos");
    setDataPermisos({ data: dataPermisos.data, loading: true, error: "" });
    const fetchDataPost = async () => {
      try {
        console.log(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/users/roles/" +
            rol_id
        );
        // console.log(JSON.stringify(userData))
        console.log(localStorage.getItem("access_token"));
        const response = await fetch(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/users/roles/" +
            rol_id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(response);
        if (response.ok) {
          const data1 = await response.json();
          //  console.log(data1.data.permissions)
          setUserPermissions(data1.data.permissions);
          setDataPermisos({ data: data1, loading: false, error: "" });
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        setDataPermisos({ data: dataPermisos.data, loading: false, error: "" });
        console.error(error);
      }
    };

    fetchDataPost();
  };
  //   const [userPermissions,setUserPermissions]=useState([
  //     {
  //     "permission_id": 3,
  //     "module_name": "reportes",
  //     "name": "reportes"
  //   },{
  //     "permission_id": 4,
  //     "module_name": "cis",
  //     "name": "cis"
  //   },{
  //     "permission_id": 5,
  //     "module_name": "acciones",
  //     "name": "acciones"
  //   },
  //   {
  //     "permission_id": 6,
  //     "module_name": "buzon",
  //     "name": "buzon"
  //   },{
  //     "permission_id": 7,
  //     "module_name": "admin",
  //     "name": "admin"
  //   },{
  //     "permission_id": 8,
  //     "module_name": "monitoreo",
  //     "name": "monitoreo"
  //   },
  //   ,{
  //     "permission_id": 11,
  //     "module_name": "acknownledge",
  //     "name": "monitoreo"
  //   },{
  //     "permission_id": 16,
  //     "module_name": "link ticket",
  //     "name": "monitoreo"
  //   },{
  //     "permission_id": 9,
  //     "module_name": "consola",
  //     "name": "monitoreo"
  //   },{
  //     "permission_id": 10,
  //     "module_name": "acciones host",
  //     "name": "monitoreo"
  //   },{
  //     "permission_id": 12,
  //     "module_name": "servidores genetec",
  //     "name": "monitoreo"
  //   }
  // ])
  const [verificateUserModalOpen, setVerificateUserModalOpen] = useState(false);
  const [nameState, setNameState] = useState("");
  const [estadoActivo, setEstadoActivo] = useState({});
  const [estadoSelected, setEstadoSelected] = useState({});
  const [dataPingEstado, setDataPingEstado] = useState({
    data: [],
    loading: false,
    error: "",
  });
  // console.log(dataPingEstado)
  const [globals, setGlobals] = useState({
    data: [],
    loading: false,
    error: "",
  });
  // const dataGlobals=useFetch('cassia/configuration','','','GET',server)
  const estados_list = useFetch(
    "cassia/configuration/estados",
    "",
    "",
    "GET",
    server
  );
  const [newLogin, setNewLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState({
    message: "",
    title: "",
    submsg: "",
    type: false,
  });
  const [serverStatus, setServerStatus] = useState(false);
  const [statusChangeState, setStatusChangeState] = useState(false);
  const [statusLoginState, setStatusLoginState] = useState(true);
  const [statusObjectStates, setStatusObjectStates] = useState(false);
  const [msgCharge, setMsgCharge] = useState("");
  const handleShowPopup = (title, message, submsg, type) => {
    setInfoPopup({
      message: message,
      title: title,
      submsg: submsg,
      type: type,
    });
    setShowPopup(true);
  };
  const idEstadoExistente = (id) => {
    return Object.values(object_state_sessions).some(
      (estado) => estado.id === id
    );
  };

  useEffect(() => {
    if (serverStatus) {
      if (!idEstadoExistente(estadoSelected.id)) {
        console.log("cambio de server 2");
        login_state();
      } else {
        console.log("func 1 ");
        getDataGlobals();
      }
    } else {
      setServerStatus(true);
    }
  }, [server]);

  useEffect(() => {
    if (localStorage.getItem("object_state_sessions") != 1) {
      getDataGlobals();
    }

    if (Object.values(object_state_sessions).length != 0) {
      console.log("primer escritura de localstorage");
      localStorage.setItem(
        "object_state_sessions",
        JSON.stringify(object_state_sessions)
      );
    }
  }, [object_state_sessions]);
  function getDataGlobals() {
    var object_state = "";
    var token_state = "";

    if (
      Object.values(object_state_sessions).length != 0 &&
      Object.values(estadoActivo).length != 0
    ) {
      if (Object.values(object_state_sessions).length > 0) {
        var id_state = 0;
        if (Object.values(estadoSelected) == 0) {
          id_state = estadoActivo.id;
        } else {
          id_state = estadoSelected.id;
        }
        object_state = Object.values(object_state_sessions).find(
          (obj) => obj.id === id_state
        );
        token_state = object_state.access_token;
      }
    } else {
      token_state = localStorage.getItem("access_token");
    }

    setGlobals({ data: globals.data, loading: true, error: globals.error });
    const fetchData = async () => {
      try {
        console.log(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/configuration"
        );
        // console.log(object_state_sessions)
        // console.log(object_state)
        // const response = await fetch('http://172.18.200.14:8002/api/v1/cassia/configuration/', {
        const response = await fetch(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/configuration",
          {
            // const response = await fetch('http://172.18.200.14:8002/api/v1/cassia/configuration/', {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token_state}`,
              // Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        );
        console.log(response);
        if (response.ok) {
          const response_data = await response.json();

          setGlobals({ data: response_data, loading: false, error: false });
          localStorage.setItem("access_token", token_state);

          setEstadoActivo(estadoSelected);
          setEstadoSelected({});
          // if(Object.values.)
        } else {
          console.log("error de configuracion");
          setGlobals({ data: globals.data, loading: false, error: true });
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.log("catch error de configuracion");
        setGlobals({ data: globals.data, loading: false, error: true });
        // Manejo de errores
        // setDataPingEstado({data:dataPingEstado.data,loading:dataPingEstado.loading,error:error})
        //console.error(error);
      }
    };
    fetchData();
  }
  useEffect(() => {
    if (estadoSelected.id != estadoActivo.id) {
      if (!idEstadoExistente(estadoSelected.id)) {
        console.log("no hay credenciales hara ping " + estadoSelected.id);
        if (Object.keys(estadoSelected).length !== 0) {
          ping_estado(estadoSelected.id);
        }
      } else {
        const object_state = Object.values(object_state_sessions).find(
          (obj) => obj.id == estadoSelected.id
        );

        setServer({ ip: object_state.server, port: object_state.port });
        localStorage.setItem("access_token", object_state.access_token);
      }
    }
  }, [estadoSelected]);

  useEffect(() => {
    console.log("acaba de resivir datos de ping");
    // console.log(dataPingEstado.data)
    if (dataPingEstado.data != undefined) {
      if (dataPingEstado.data.available) {
        const ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
        const match = estadoSelected.url.match(ipPattern);

        if (match) {
          const ipAddress = match[0];
          setServer({ ip: ipAddress, port: server.port });
        }
        // window.open(estadoSelected.url_front, '_blank');
      } else {
        console.log("no hizo ping");
        // console.log(dataPingEstado.error)
      }
    }
    // ping_estado(estadoSelected.id)
  }, [dataPingEstado.data]);

  const login_state = async (e) => {
    setMsgCharge("Iniciando session ...");

    setDataPingEstado({
      data: dataPingEstado.data,
      loading: true,
      error: dataPingEstado.error,
    });
    const formData = new URLSearchParams();
    var server_url = "";
    var port_url = "";
    var user_log = "";
    var pass_log = "";
    if (!localStorage.getItem("aux_server_ip")) {
      user_log = localStorage.getItem("user_cassia");
      pass_log = localStorage.getItem(
        "password_cassia_" + localStorage.getItem("main_access_token")
      );
      server_url = server.ip;
      port_url = server.port;
      formData.append("username", localStorage.getItem("user_cassia"));
      formData.append(
        "password",
        localStorage.getItem(
          "password_cassia_" + localStorage.getItem("main_access_token")
        )
      );
    } else {
      server_url = localStorage.getItem("aux_server_ip");
      port_url = 8000; //localStorage.getItem('aux_server_port')
      user_log = localStorage.getItem("aux_user_cassia");
      pass_log = localStorage.getItem("aux_pass_cassia");
      formData.append("username", user_log);
      formData.append("password", pass_log);
      // formData.append("username", 'pruebagio@seguritech.com');
      // formData.append("password", '12345678');
      // setServer({ip:localStorage.getItem('aux_server_ip'),port:8000})
    }
    formData.append("grant_type", "");
    formData.append("scope", "");
    formData.append("client_id", "");
    formData.append("client_secret", "");
    localStorage.removeItem("aux_server_ip");
    localStorage.removeItem("aux_server_ip");
    console.log(formData);
    try {
      console.log(
        "http://" + server.ip + ":" + server.port + "/api/v1/auth/login"
      );
      const response = await fetch(
        "http://" + server.ip + ":" + server.port + "/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );
      // console.log(response)
      if (response.ok) {
        const data = await response.json();

        setNewLogin(true);
        setStatusChangeState(false);
        setStatusLoginState(true);
        if (!idEstadoExistente(estadoSelected.id)) {
          set_object_state_sessions((prevObj) => ({
            ...prevObj,
            [Object.keys(prevObj).length]: {
              id: estadoSelected.id,
              name: estadoSelected.name,
              server: server_url,
              port: port_url,
              user: user_log,
              pass: pass_log,
              access_token: data.data.access_token,
            },
          }));
        }
      } else {
        setEstadoSelected({});
        // setUserVal(false)
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      setEstadoSelected({});
      // setError(error)
      setServerStatus(false);
      localStorage.setItem("aux_server_ip", server.ip);
      localStorage.setItem("aux_server_port", server.port);
      setServer({
        ip: localStorage.getItem("main_server_ip"),
        port: localStorage.getItem("main_server_port"),
      });
      setMsgCharge("Credenciales no aceptadas");

      setStatusLoginState(false);
      setDataPingEstado({
        data: dataPingEstado.data,
        loading: false,
        error: dataPingEstado.error,
      });
    }
  };
  useEffect(() => {
    try {
      let userSession = JSON.parse(localStorage.getItem("user_session"));

      const expirationDate = new Date(userSession.refresh_token_expires);
      const currentDate = new Date();

      // setUserPermissions(userSession.permissions)
      getPermisos(userSession.roles[0].rol_id);
      setRolID(userSession.roles[0].rol_id);
      if (userSession.verified_at === null) {
        setVerificateUserModalOpen(true);
      } else {
        setVerificateUserModalOpen(false);
        if (expirationDate < currentDate) {
          onLogin(false);
        }
      }
    } catch (error) {
      console.log(error);
      onLogin(false);
      localStorage.setItem(
        "MsgErrorLogin",
        "Su usuario cuenta con errores o esta incompleto, favor de reportar con su administrador"
      );
      localStorage.setItem("ErrorLogin", true);
      setMsgErrorLogin(
        "Su usuario cuenta con errores o esta incompleto, favor de reportar con su administrador"
      );
    }
  }, []);

  function closVerificateUserModal() {
    setVerificateUserModalOpen(false);
  }

  function ping_estado(id_estado) {
    console.log("haciendo ping");
    setNewLogin(false);
    setMsgCharge("Estableciendo ping con el servidor ...");
    setStatusChangeState(true);

    setDataPingEstado({
      data: dataPingEstado.data,
      loading: true,
      error: dataPingEstado.error,
    });
    const fetchData = async () => {
      try {
        console.log(
          "http://" +
            localStorage.getItem("main_server_ip") +
            ":" +
            localStorage.getItem("main_server_port") +
            "/api/v1/cassia/configuration/estados/ping/" +
            id_estado
        );
        const response = await fetch(
          "http://" +
            localStorage.getItem("main_server_ip") +
            ":" +
            localStorage.getItem("main_server_port") +
            "/api/v1/cassia/configuration/estados/ping/" +
            id_estado,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(
                "main_access_token"
              )}`,
            },
          }
        );

        if (response.ok) {
          const response_data = await response.json();

          setDataPingEstado({
            data: response_data.data,
            loading: false,
            error: response_data.message,
          });
        } else {
          setEstadoSelected({});
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        setEstadoSelected({});
        // Manejo de errores
        // setDataPingEstado({data:dataPingEstado.data,loading:dataPingEstado.loading,error:error})
        //console.error(error);
      }
    };
    fetchData();
  }
  return (
    <div
      className="main"
      style={{ height: "100%", width: "100%", position: "absolute" }}
    >
      {/* <div className='load-main' style={{height:'100%',width:'100%',position: 'absolute'}}>

      </div> */}
      <>
        <NavBar
          setServer={setServer}
          login_state={login_state}
          setStatusLoginState={setStatusLoginState}
          statusLoginState={statusLoginState}
          dataGlobals={globals.data.data}
          loadGlobals={globals.loading}
          msgCharge={msgCharge}
          statusChangeState={statusChangeState}
          setStatusChangeState={setStatusChangeState}
          server={server}
          object_state_sessions={object_state_sessions}
          set_object_state_sessions={set_object_state_sessions}
          estadoActivo={estadoActivo}
          setEstadoActivo={setEstadoActivo}
          estados_list={estados_list}
          nameState={nameState}
          estadoSelected={estadoSelected}
          setEstadoSelected={setEstadoSelected}
          dataPingEstado={dataPingEstado}
        />
        <SideBar
          mode={mode}
          dataGlobals={globals}
          userPermissions={userPermissions}
          rolId={rol_id}
          onLogin={onLogin}
          pageSelected={pageSelected}
          setPageSelected={setPageSelected}
        />
        <Container mode={mode}>
          {(() => {
            if (globals.loading) {
              return (
                <>
                  <div className="top-welcome">
                    <div className="Title">
                      <img
                        src="logo_cassia.png"
                        style={{ height: "50%" }}
                        alt="Logo"
                      />
                    </div>
                  </div>
                  <div className="mid-welcome">
                    {
                      <div className="cont-load-main">
                        <div className="txt-load-main">
                          Cargando datos, por favor espere...
                        </div>
                        <section className="dots-container-main">
                          <div className="dots-main"></div>
                          <div className="dots-main"></div>
                          <div className="dots-main"></div>
                          <div className="dots-main"></div>
                          <div className="dots-main"></div>
                        </section>
                      </div>
                    }
                  </div>
                </>
              );
            } else {
              if (globals.error) {
                return (
                  <>
                    <div className="top-welcome">
                      <div className="Title">
                        <img
                          src="logo_cassia.png"
                          style={{ height: "50%" }}
                          alt="Logo"
                        />
                      </div>
                    </div>
                    <div className="mid-welcome" style={{ display: "block" }}>
                      {
                        <>
                          <div
                            className="cont-load-main"
                            style={{ height: "50%" }}
                          >
                            <div
                              className="txt-load-main"
                              style={{ animation: "unset", color: "red" }}
                            >
                              Error al cargar datos de configuración!!!
                            </div>
                          </div>
                          <div
                            className="cont-load-main"
                            style={{ height: "50%" }}
                          >
                            <div
                              className="txt-load-main"
                              style={{ animation: "unset" }}
                            >
                              Cierre sesion y vuelva a intenar.
                            </div>
                          </div>
                          <div
                            className="cont-load-main"
                            style={{ justifyContent: "center" }}
                          >
                            <div
                              className="sidebarCont "
                              style={{
                                width: "20%",
                                border: "2px solid red",
                                borderRadius: "10px",
                              }}
                              onClick={onLogin}
                            >
                              <div className="imgSideCont">
                                <img src="/iconos/log-out-red.svg" />
                              </div>
                              <div className="" style={{ color: "aliceblue" }}>
                                SALIR
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    </div>
                  </>
                );
              } else {
                if (pageSelected === "perfil") {
                  return (
                    <Perfil
                      mode={mode}
                      setMode={setMode}
                      server={server}
                      userPermissions={userPermissions}
                      dataGlobals={globals}
                      setNameState={setNameState}
                    />
                  );
                } else if (pageSelected === "monitoreo") {
                  return (
                    <Monitoreo
                      mode={mode}
                      estados_list={estados_list}
                      userPermissions={userPermissions}
                      handleShowPopup={handleShowPopup}
                      server={server}
                      token={token}
                      dataGlobals={globals.data.data}
                      estadoSelected={estadoSelected}
                      setEstadoSelected={setEstadoSelected}
                    />
                  );
                } else if (pageSelected === "panel-admin") {
                  return (
                    <Admin
                      server={server}
                      userPermissions={userPermissions}
                      dataGlobals={globals.data.data}
                    />
                  );
                } else if (pageSelected === "cis") {
                  return (
                    <Cis
                      server={server}
                      userPermissions={userPermissions}
                      dataGlobals={globals.data.data}
                    />
                  );
                } else if (pageSelected === "portafolio") {
                  return (
                    <Portafolio
                      server={server}
                      userPermissions={userPermissions}
                      dataGlobals={globals.data.data}
                    />
                  );
                } else if (pageSelected === "reportes") {
                  return (
                    <Reportes
                      server={server}
                      userPermissions={userPermissions}
                      dataGlobals={globals.data.data}
                    />
                  );
                } else if (pageSelected === "acciones") {
                  return (
                    <Acciones
                      server={server}
                      userPermissions={userPermissions}
                      dataGlobals={globals.data.data}
                    />
                  );
                } else if (pageSelected === "host-manage") {
                  return (
                    <Hosts
                      server={server}
                      userPermissions={userPermissions}
                      dataGlobals={globals.data.data}
                    />
                  );
                } else if (pageSelected === "buzon") {
                  return (
                    <Buzon
                      server={server}
                      userPermissions={userPermissions}
                      dataGlobals={globals.data.data}
                    />
                  );
                }
              }
            }
          })()}
          <Popup
            infoPopup={infoPopup}
            isVisible={showPopup}
            setShowPopup={setShowPopup}
            setInfoPopup={setInfoPopup}
          ></Popup>
        </Container>
      </>
      <Modal
        isOpen={verificateUserModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closVerificateUserModal}
        style={verificateUserModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
      >
        <ModalVerificateUser
          server={server}
          onLogin={onLogin}
          closVerificateUserModal={closVerificateUserModal}
        ></ModalVerificateUser>
      </Modal>
    </div>
  );
};

export default Main;

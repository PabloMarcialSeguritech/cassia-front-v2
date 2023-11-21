
import './styles/perfil.css'
const Perfil=({server,dataGlobals})=>{
    
    var estado=''
    if(dataGlobals.data.data!==undefined){
        estado=dataGlobals.data.data.find(obj => obj.name === 'estado')
    }
    
    return (
        <div className="main-perfil">
            <div className='welcome-card'>
                <div className='top-welcome'>
                    <div className='Title'>
                    <img src="logo_cassia.png"  style={{height: '50%'}} alt="Logo"/>
                    </div>
                </div>
                <div className='mid-welcome'>
                    
                    {
                        (dataGlobals.loading)?
                        <div className='cont-load-main'>
                        <div className='txt-load-main'>
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
                        :
                    <div className='Title' style={{width:'100%'}}>
                        <h1 className='textTitle' >{estado.value}</h1>
                    </div>
                    }
                    
                </div>
                <div className='bottom-welcome'>
                <img src="logo-spin.png"  className='icon-seguritech icon-perfil' alt="Logo"/>
                </div>
            </div>
            <div className='footer-version'>
                   Version 1.3
            </div>
        </div>
    )
}

export default Perfil
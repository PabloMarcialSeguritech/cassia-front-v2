import './styles/LoadData.css'

const LoadData=({mode})=>{
    return(
        <div className='LoadContent'>
            <div className='compactLoadItems'>
                
                <div className='loadCont iconLoadCont'>
                    {/* <span className='loader'></span> */}
                    <div className={"loader"+mode}>
                        <span></span>
                    </div>
                </div>
                <div className=' loadCont textLoadCont'>
                    <div className={'txtLoader'+mode}>Obteniendo datos. . .
                    {/* <span className="blink_me" id="rotate">
                        <span>.</span>
                        <span>..</span>
                        <span>...</span>
                    </span>  */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadData
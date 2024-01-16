import React, { useState } from 'react';
import './styles/Popup.css';

const Popup = ({ infoPopup,isVisible,setShowPopup,setInfoPopup }) => {
//   const [isVisible, setIsVisible] = useState(true);
// console.log(infoPopup)
  const handleClose = () => {
    setShowPopup(false);
    setInfoPopup({message:'',title:'',submsg:'',type:false})
  };

  return (
    isVisible && (
      <div className="popup-container">
        <div className={"popup-content popup-"+((infoPopup.type)?'ok':'error')}>
        <div className='popup-cont-img'>
        <img src={"iconos/popup_"+((infoPopup.type)?'ok':'error')+".png"} className='popup-img'alt="Logo"/>
        </div>
          <div className='popup-cont-info'>
            <div className='popup-title'> {infoPopup.title} </div>
            <div className='popup-text'>{infoPopup.message}</div>
            <div className='popup-text-min'>{infoPopup.submsg}</div>
          </div>
          <span className="close-btn" onClick={handleClose}>
            &times;
          </span>
        </div>
      </div>
    )
  );
};

export default Popup;

import React from 'react';


function InputComponent(props) {
    return (
        <div>
            <span className="m-0 mt-2 pl-2 d-block" for={props.info.name}><b><i> {props.info.name==="text"?"Name (With initials at end)":props.info.name}</i></b></span>
            <input className="auth-input p-2 rounded-pill" onChange={props.valueUpdater} placeholder={props.info.name} value={props.info.value} name={props.info.name} type={props.info.name}/>
            {props.info.error?<h6 className="text-danger pl-2 pb-0 pt-1"><i>{props.info.error}</i></h6>:<React.Fragment/>}
        </div>
    );
}

export default InputComponent;
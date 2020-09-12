import React from 'react';


function Input(props) {
    return (
        <div key={props.name}>
            {!props.inline?
            <span className="m-0 mt-2 pl-2 d-block bold-italic" htmlFor={props.name}>{props.name}
              {
                  props.type==="range"?
                 <span className="bg-light ml-2 pl-2 pr-2 rounded-pill">{props.value}</span>:
                 <React.Fragment/>
              }
            </span>:<React.Fragment/>}
            {
            props.textarea?

            <textarea className="auth-input p-2 rounded" style={{height:"150px"}}
            onChange={(event)=>{props.valueUpdater(props.unique,event)}} 
            placeholder={props.name}
            name={props.name}
            value={props.value}
            type={props.type} /> :

            <input className={props.inline?"d-inline auth-input rounded-pill d-inline w-auto":"auth-input p-2 rounded-pill"}
            onChange={(e)=>{props.valueUpdater(props.unique,e)}} 
            placeholder={props.name} 
            name={props.name}
            value={props.value}
            type={props.type}
            {...props.step?{step:props.step}:null}
            { ...props.min?{min:props.min}:null }
            { ...props.max?{max:props.max}:null }
            {...props.type==="file" ? {accept:"image/*"}: null}
            readOnly={props.readonly}/>
            
            }
            {
                props.error && props.error!==""?
                <p className="text-danger bold-italic pl-2">{props.error}</p>:
                <React.Fragment/>
            }
        </div>
    );
}

export default Input;
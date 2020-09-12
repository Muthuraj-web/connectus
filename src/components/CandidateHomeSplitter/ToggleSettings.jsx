import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function ToggleSettings(props) {
        return (
            <div className="container box-shadow w-100 h-auto pt-2 pl-2  mt-2 mb-2">
                <p className="bold-italic">Works
                    <FontAwesomeIcon onClick={()=>{props.hideSection("works")}}  style={{position:"relative",float:"right",cursor:"pointer"}} icon={props.works?faToggleOn:faToggleOff}/>
                </p>
                <p className="bold-italic">Educations
                    <FontAwesomeIcon  onClick={()=>{props.hideSection("educations")}} style={{position:"relative",float:"right",cursor:"pointer"}} icon={props.educations?faToggleOn:faToggleOff}/>
                </p>
                <p className="bold-italic">Projects
                    <FontAwesomeIcon onClick={()=>{props.hideSection("projects")}}  style={{position:"relative",float:"right",cursor:"pointer"}} icon={props.projects?faToggleOn:faToggleOff}/>
                </p>
            </div>
        );
}

export default ToggleSettings;
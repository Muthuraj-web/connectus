import React from 'react';
import EditButton from '../CandidateHomeSplitter/EditButton'
import {isAuthToEdit} from "../../data"

function AboutUsSection(props) {
    if(isAuthToEdit("company")){
        return (
            <div className="container box-shadow w-100 pt-4 pl-3 pr-3 pb-4 mt-2 mb-2" style={{backgroundColor:"white",position:"relative"}}>
                <h5 className="pl-3 pt-3 m-0" style={{fontWeight:"300"}} >WHAT WE DO?</h5>
                <div className="ml-3 mr-4 mb-4 mt-2 p-2 bg-light rounded">
                    <p>
                        <i>
                            {props.aboutus}
                        </i>
                    </p>  
                </div>
                {props.editable?<EditButton push="/company/add/aboutus" {...props}/>:<React.Fragment/>}
            </div>
        );
    }
    else props.history.push("/unauthorized")
}

export default AboutUsSection;
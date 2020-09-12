import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLink} from '@fortawesome/free-solid-svg-icons'
import EditButton from './EditButton'

function ProjectsSection(props) {
    return (
        <div className="container box-shadow w-100 p-0 mt-2 mb-2" style={{backgroundColor:"inherit",position:"relative"}}>
            <h3 className="pl-3 pt-3 pb-2 m-0" style={{fontWeight:"300"}}>PROJECTS</h3>
            {
                 props.projects.map(each=>
                    <div className="p-3  m-0 " key={each._id} style={{width:"100%"}}>
                        <h5 className="d-inline pr-4"><i>{each.title}</i></h5><span className="pr-2">{each.timeline.month}</span><span>{each.timeline.year}</span>
                        <div className="mt-3" style={{paddingLeft:"10px",borderLeft:"3px solid green",fontStyle:"italic"}}>
                            <p className="d-block">{each.description}</p>
                            <p>Tools : <b>{each.tools.join(", ")}</b></p>
                            <a href={each.link}><p><FontAwesomeIcon icon={faLink} className="mr-2"/>{each.link}</p></a>
                        </div>
                    </div>
                        )
            }
            {props.editable?<EditButton push="/add/project" {...props}/>:<React.Fragment/>}
        </div>
    );
}

export default ProjectsSection;
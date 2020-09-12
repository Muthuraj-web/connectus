import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import EditButton from './EditButton'

function WorksSection(props) {
    return (
        <div className="container box-shadow w-100 h-auto pt-2 pl-2  mt-2 mb-2" style={{backgroundColor:"inherit"}}>
            <h3 className="pl-2 pt-3 pb-2 m-0" style={{fontWeight:"300"}}>EXPERIENCE</h3>
            {
                props.works.map(each=>
                    <div className="pl-3 pr-3 pb-4 border-bottom pt-3 m-0" key={each._id} style={{width:"100%",display:"flex"}}>
                        <div>
                            <img src={each.logo==="default"?process.env.PUBLIC_URL+'/company-logo.jpeg':each.logo}  style={{width:"50px",height:"50px"}} />
                        </div>
                        <div className="pl-3 pb-4 work_n_education-info">
                            <h5 className="m-0">{each.role}</h5>
                            <p className="m-0"><b>{each.company}</b></p>
                            <p>
                                <small className="d-inline pr-3">{each.timeline.start.month} {each.timeline.start.year}</small>-
                                <small className="d-inline pl-3">{each.timeline.end.month} {each.timeline.end.year}</small>
                            </p>
                            <p className="m-0">{each.description}</p>

                        </div>
                    </div>)
            }
            {props.editable?<EditButton {...props}/>:<React.Fragment/>}
        </div>
    );
}

export default WorksSection;
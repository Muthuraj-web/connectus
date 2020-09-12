import React, { Component } from 'react';
import EditButton from './EditButton'

function EducationSection(props) {
        return (
            <div className="container box-shadow w-100 p-0 mt-2 mb-2" style={{backgroundColor:"inherit",position:"relative"}}>
                <h3 className="pl-3 pt-3 pb-2 m-0" style={{fontWeight:"300"}}>EDUCATION</h3>
                {
                props.educations.map(each=>
                    <div className="p-3 m-0" key={each._id} style={{width:"100%",display:"flex"}}>
                        <div>
                            <img src={process.env.PUBLIC_URL+'/company-logo.jpeg'}  style={{width:"50px",height:"50px"}} />
                        </div>
                        <div className="pl-3 pb-4 work_n_education-info">
                            <h6 className="m-0">{each.institute}</h6>
                            <p className="m-0">
                                <small className="d-inline pr-2">{each.timeline.start.month} {each.timeline.start.year}</small>-
                                <small className="d-inline pl-2">{each.timeline.end.month} {each.timeline.end.year}</small>
                            </p>
                            <p className="m-0" style={{fontSize:"14px"}}>{each.course}</p>
                        </div>
                    </div>)
            }            
                {props.editable?<EditButton push="/add/education" {...props}/>:<React.Fragment/>}
            </div>
        );

}

export default EducationSection;
import React from 'react';
import EditButton from './EditButton'

function AreasOfInterest(props) {
    return (
        <div className="container box-shadow w-100 h-auto pt-2 pl-3  mt-2 mb-2" style={{backgroundColor:"inherit",position:"relative"}}>
            <h3 className="pl-2 pt-3 pb-2 m-0" style={{fontWeight:"300"}}>AREAS OF INTEREST</h3>
            <ul className="pb-3 m-0">
                {
                    props.interests.map(each=>
                    <li><h6><i>{each}</i></h6></li>)
                }
            </ul>
            {props.editable?<EditButton push="/add/interest" {...props}/>:<React.Fragment/>}
        </div>
    );
}

export default AreasOfInterest;
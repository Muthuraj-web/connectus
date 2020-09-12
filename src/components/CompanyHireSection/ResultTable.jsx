import React from 'react';
import {Link} from "react-router-dom"

function ResultTable(props) {

    return (
                props.result.map(each=>
                    <tr>
                        <td><img style={{width:"50px",height:"50px"}} src={each.profile} /></td>
                        <td><Link to={`/candidate/${each._id}`} target="_blank"><h5><i>{each.name}</i></h5></Link></td>
                        <td><i>{each.skills.join(", ")}</i></td>
                        <td><i><b>{parseFloat(each.experience).toPrecision(2)}</b></i></td>
                        <td><i><b>{each.email}</b></i></td>
                    </tr>)
    );
}

export default ResultTable;
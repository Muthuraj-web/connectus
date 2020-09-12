import React from 'react';
import {yearArr,monthArr} from '../../data' 

function Select(props) {
    console.log(props)
    return (
        <div className="d-block">
        <span className="m-0 mt-2 pl-2" htmlFor={props.name}><b><i>{props.name}</i></b></span>
            <select className="m-2 mt-3" onChange={e=>{props.valueUpdater(props.unique,e)}} name={props.name}  defaultValue={props.month.value}>
                {
                    monthArr().map(each=><option  value={each}>{each}</option>)
                }
            </select>
            <select className="m-2 mt-3" onChange={e=>{props.valueUpdater(props.unique,e)}}  name={props.name}  defaultValue={props.year.value}>
                    {
                        yearArr().map(each=><option value={Number(each)}>{each}</option>)
                    }
            </select>
        </div>
    );
}

export default Select;
import React from 'react';

function Suggestion(props) {
    console.log(props)
    if(props.suggestions&&props.suggestions.length){
        return(
        <div className="p-2 rounded" style={{position:"absolute",float:"bottom",backgroundColor:"white",zIndex:"1",maxHeight:"150px",overflowY:"scroll",width:"100%"}}>
            {
                props.suggestions.map(each=>
                    <div key={each._id||each.uuid} className="border" onClick={(e)=>{props.handleSuggestions(props.unique,props.name,each.skill||each.name||each.suggestion,e)}} >
                        {each.logo&&<img className="p-2 m-0" alt={each.name} src={each.logo} style={{width:"50px",height:"50px",}} />}
                        <i><span className="p-0 m-l-2">{each.skill||each.name||each.suggestion}</span></i>
                    </div>
                    )
            }
        </div>
        )}
    else return <React.Fragment/>

}

export default Suggestion;
import React,{Component} from 'react';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class EditButton extends Component {

    state={
        display:false
    }
    displayToggle=()=>{
        this.setState({
            display:!this.state.display
        })
    }

    render() {
        console.log(`${localStorage.getItem("type")}/save/${this.props.target}`)
        return (
            <div style={{position:"absolute",top:"20px",right:"20px"}}>
                <div>
                <FontAwesomeIcon 
                className="m-1 rounded"
                style={{position:"relative",float:"right",cursor:"pointer",backgroundColor:"white"}} 
                onClick={this.displayToggle} icon={faEllipsisH}/>
                </div>
                <br/>
                {
                    this.state.display?
                    <div className="bg-light shadow ">
                        <p className="pt-1 pl-2 pr-2 border mb-0" onClick={()=>{this.props.history.replace(`/${localStorage.getItem("type")}/save/${this.props.target}`)}}><i>Add or Edit</i></p>
                        {this.props.hide?<p className="pt-1 pl-2 pr-2 border mb-0" onClick={()=>{this.props.hideSection(this.props.target)}} ><i>Hide Section</i></p>:<React.Fragment/>}
                    </div>:
                    <React.Fragment/>
                }
            </div>
    );
    }
}

export default EditButton;
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Topnav extends Component {

    logout=()=>{
        localStorage.removeItem("jwt")
        localStorage.removeItem("type")
        window.location.replace("/")
    }

    render() {
        return (
            <nav className="sticky-top m-0 p-1 border-bottom" style={{backgroundColor:"white"}}>
                <Link to="/"><img alt={'l'} style={{width:"200px",height:"auto"}} src={process.env.PUBLIC_URL+"/connectus.png"}></img></Link>
                {
                    localStorage.getItem("jwt")&&(localStorage.getItem("type")==="candidate"||localStorage.getItem("type")==="company")?
                    <React.Fragment>
                    <span className="d-relative float-right pt-3 bold-italic pl-2 pr-4" onClick={this.logout}><u>Logout</u></span>
                    </React.Fragment>:
                    <React.Fragment/>
                }
            </nav>
        );
    }
}

export default Topnav;
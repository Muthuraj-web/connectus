import React from 'react';
import {Link} from 'react-router-dom'
import {decode} from 'jsonwebtoken'
import Topnav from './Topnav'

function HomePage(props) {
    if(localStorage.getItem('jwt') && localStorage.getItem("type")){
        const jwt = localStorage.getItem('jwt')
        const type = localStorage.getItem('type')
        const _id = decode(jwt)._id
        console.log(_id,type)
        props.history.replace(`/${type}/${_id}`)
        return null
    }
    else{
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 p-5">
                    <div className="w-75">
                        <h4 className="bold-italic">For Candidates</h4>
                        <p className="font-italic">For inteligent and elegant students in universities and hardworking Working 
                        individuals here is the Platform gor you to show up the Skills, Projects and your Working experience
                        to Companies and the workld so that they can hire you
                        </p>
                        <Link to="/candidate/auth/signup"><button className="button mr-3 bold-italic rounded" >Sign Up</button></Link>
                        <Link to="/candidate/auth/login"><button className="button bold-italic rounded">Login</button></Link>
                    </div>
                </div>
                <div className="col-sm-6 p-5">
                    <div className="w-75">
                        <h4 className="bold-italic">For Companies</h4>
                        <p className="font-italic">Here is the platform for Companies and Hiring Managers to Select the candidate with the specific industrial
                            Skills for a Specific Role with expected experience. We reduce your time and money by narrowing the search and showing up you the bright
                            graduates and working experience
                        </p>
                        <Link to="/company/auth/signup"><button className="button mr-3 bold-italic rounded">Sign Up</button></Link>
                        <Link to="/company/auth/login"><button className="button bold-italic rounded" >Login</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );}
}

export default HomePage;
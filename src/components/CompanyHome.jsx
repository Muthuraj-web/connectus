import React, { Component } from 'react';
import ProfilePhotoSection from './CandidateHomeSplitter/ProfilePhotoSection';
import Axios from 'axios'
import {decode} from 'jsonwebtoken'
import AboutUsSection from './CompanyHomeSplitter/AboutUsSection';

class CompanyHome extends Component {
    state={
        company:{},
        editable:false,
        loading:true
    }

    async componentDidMount(){
        const result = await Axios.get(`https://connectus-backend.herokuapp.com/company/${decode(localStorage.getItem("jwt"))._id}`)
        this.setState({
            company:result.data,
            editable:this.props.match.params.id===decode(localStorage.getItem("jwt"))._id,
            loading:false
        })
    }
    render() {
        const editable = this.state.editable
        if(Object.keys(this.state.company).length!==0)
        {
            return (
            <div className="container">
                {
                    this.state.loading?
                    <div className="spinner-border d-block m-auto text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>:
                    <React.Fragment>
                        <ProfilePhotoSection type={"company"} {...this.props} target="mains" editable={editable} email={this.state.company.email} company={this.state.company['company']} mains={this.state.company.mains} />
                        <AboutUsSection type={"company"} {...this.props} target="aboutus" editable={editable} aboutus={this.state.company.aboutus}/>
                    </React.Fragment>
                    
                }
            </div>
            );
        }
        else return <React.Fragment/>
    }
}

export default CompanyHome;
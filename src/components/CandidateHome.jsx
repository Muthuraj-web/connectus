import React, { Component } from 'react';
import Axios from 'axios'
import ProfilePhotoSection from './CandidateHomeSplitter/ProfilePhotoSection';
import SkillsSection from './CandidateHomeSplitter/SkillsSection';
import WorksSection from './CandidateHomeSplitter/WorksSection';
import EducationSection from './CandidateHomeSplitter/EducationSection'
import ProjectsSection from './CandidateHomeSplitter/ProjectsSection';
import AreasOfInterest from './CandidateHomeSplitter/AreasOfInterest'
import {decode} from 'jsonwebtoken'
import ToggleSettings from './CandidateHomeSplitter/ToggleSettings';

class CandidateHome extends Component {
    state={
        candidate:{},
        editable:false,
        loading:true
    }

    async componentDidMount(){
        this.setState({
            loading:true
        })
        const {data} = await Axios.get(`https://connectus-backend.herokuapp.com/candidate/${this.props.match.params.id}`)
        const editable = decode(localStorage.getItem("jwt")) && decode(localStorage.getItem("jwt"))._id===this.props.match.params.id && (localStorage.getItem("type")==="candidate")
        this.setState({
            candidate:data,
            editable,
            loading:false
        })
    }

    hideSection=async(section)=>{
        const candidate = this.state.candidate
        candidate[section].display=!candidate[section].display
        this.setState({
            candidate
        })
        await Axios.post(`https://connectus-backend.herokuapp.com/candidate/toggle/${section}`,{jwt:localStorage.getItem("jwt")})
    }
    render() {
        const editable = this.state.editable
            if(this.state.loading){
                return(
                    <div className="spinner-border d-block m-auto text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                )
            }
            else{
                return(
                    <div className="container w-100 d-relative">
                        <ProfilePhotoSection {...this.props} target="mains" editable={editable} email={this.state.candidate.email} name={this.state.candidate.name} mains={this.state.candidate.mains}/>
                        <div className="row p-0 m-0">
                            <div className="col-sm-3 p-0 pr-sm-1">
                                <SkillsSection {...this.props} target="skills" editable={editable} takeskilltestToggler={this.takeskilltestToggler} skills={this.state.candidate.skills}/>
                                {
                                    this.state.editable?
                                    <ToggleSettings 
                                    hideSection={this.hideSection}
                                    educations={this.state.candidate.educations.display}
                                    works={this.state.candidate.works.display}
                                    projects={this.state.candidate.projects.display} />:
                                    <React.Fragment/>
                                }
                            </div>
                            <div className="col p-0 pl-sm-1 ">
                                {
                                    this.state.candidate.works.display?
                                    <WorksSection {...this.props} hide hideSection={this.hideSection} target="works" editable={editable} works={this.state.candidate.works.data}/>:
                                    <React.Fragment/>
                                }
                                {
                                    this.state.candidate.projects.display?
                                    <ProjectsSection {...this.props} hide hideSection={this.hideSection} target="projects" editable={editable} projects={this.state.candidate.projects.data}/>:
                                    <React.Fragment/>   
                                }
                                <AreasOfInterest {...this.props} target="interests" editable={editable} interests={this.state.candidate.interests} />
                                {
                                    this.state.candidate.educations.display?
                                    <EducationSection {...this.props} hide hideSection={this.hideSection} target="educations" editable={editable} educations={this.state.candidate.educations.data}/>:
                                    <React.Fragment/>   
                                }
                            </div>
                        </div>
                </div>               
                )
            }
    }            
}

export default CandidateHome;
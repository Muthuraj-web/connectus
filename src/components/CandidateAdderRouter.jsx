import { Route,Switch } from 'react-router-dom';
import MainsAdder from './CandidateAdder/MainsAdder'
import WorksAdder from './CandidateAdder/WorksAdder'
import SkillsAdder from './CandidateAdder/SkillsAdder'
import EducationsAdder from './CandidateAdder/EducationsAdder'
import ProjectsAdder from './CandidateAdder/ProjectsAdder'
import InterestAdder from './CandidateAdder/InterestAdder'
import React, { Component } from 'react';

class CandidateAdderRouter extends Component {
    render() {
        return (
            <Switch>
            <Route path={this.props.match.url+"/mains"} render={()=><MainsAdder {...this.props} />}/>
            <Route path={this.props.match.url+"/skills"} render={()=><SkillsAdder {...this.props} />}/>
            <Route path={this.props.match.url+"/works"} render={()=><WorksAdder {...this.props} />}/>
            <Route path={this.props.match.url+"/projects"} render={()=><ProjectsAdder {...this.props} />}/>
            <Route path={this.props.match.url+"/educations"} render={()=><EducationsAdder {...this.props} />}/>
            <Route path={this.props.match.url+"/interests"} render={()=><InterestAdder {...this.props} />}/>
            </Switch>
        );
    }
}

export default CandidateAdderRouter;
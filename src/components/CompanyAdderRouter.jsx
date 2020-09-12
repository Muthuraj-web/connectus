import React, { Component } from 'react';
import MainsAdder from './CandidateAdder/MainsAdder'
import {Switch,Route} from 'react-router-dom'
import AboutUs from './CompanyAdder/Aboutus'

class CompanyAdderRouter extends Component {
    render() {
        console.log(this.props)
        return (
            <Switch>
            <Route path={this.props.match.url+"/mains"} render={()=><MainsAdder {...this.props} company={true} />}/>
            <Route path={this.props.match.url+"/aboutus"} render={()=><AboutUs {...this.props} company={true} />}/>

            </Switch>
        );
    }
}

export default CompanyAdderRouter;
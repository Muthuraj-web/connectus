import React, { Component } from 'react';
import Homepage from './components/HomePage'
import CandidateHome from './components/CandidateHome';
import Auth from './components/Auth'
import "bootstrap/dist/css/bootstrap.css"
import { Switch, Route, Redirect } from 'react-router-dom';
import {candidateLogin,candidateSignup,companyAuth} from './data'
import CandidateAdderRouter from './components/CandidateAdderRouter';
import Topnav from './components/Topnav';
import CompanyHome from './components/CompanyHome';
import HireSection from './components/CompanyHireSection/HireSection';
import CompanyAdderRouter from './components/CompanyAdderRouter';
import Skilltest from './components/Skilltest'
import Unauthorized from './components/Unauthorized';
import Notfound from './components/Notfound'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
        <Route path="/candidate/auth/signup" render={(props)=>{return(<React.Fragment><Topnav {...props}/><Auth info={candidateSignup} type={"signup"} {...props}/></React.Fragment>)}}/>
        <Route path="/candidate/auth/login" render={(props)=>{return(<React.Fragment><Topnav {...props}/><Auth info={candidateLogin} type={"login"} {...props}/></React.Fragment>)}}/>
        <Route path="/candidate/add" render={(props)=>{return(<React.Fragment><Topnav {...props}/><CandidateAdderRouter {...props}/></React.Fragment>)}}/>
        <Route path="/candidate/save" render={(props)=>{return(<React.Fragment><Topnav {...props}/><CandidateAdderRouter save {...props}/></React.Fragment>)}}/>
        <Route path="/candidate/:id" render={(props)=>{return(<React.Fragment><Topnav {...props}/><CandidateHome {...props} /></React.Fragment>)}}/>

        <Route path="/company/auth/signup" render={(props)=>{return(<React.Fragment><Topnav {...props}/><Auth info={companyAuth} type={"signup"} {...props}/></React.Fragment>)}}/>
        <Route path="/company/auth/login" render={(props)=>{return(<React.Fragment><Topnav {...props}/><Auth info={companyAuth} type={"login"} {...props}/></React.Fragment>)}}/>
        <Route path="/company/hire" render={props=>{return<React.Fragment><Topnav {...props}/><HireSection {...props} /></React.Fragment>}} />
        <Route path="/company/add" render={(props)=>{return(<React.Fragment><Topnav {...props}/><CompanyAdderRouter {...props}/></React.Fragment>)}}/>
        <Route path="/company/save" render={(props)=>{return(<React.Fragment><Topnav {...props}/><CompanyAdderRouter save {...props}/></React.Fragment>)}}/>
        <Route path="/company/:id" render={props=>{return<React.Fragment><Topnav {...props}/><CompanyHome {...props} /></React.Fragment>}}/>
          
        <Route path="/skilltest/:skill" render={props=>{return<React.Fragment><Topnav {...props}/><Skilltest {...props}/><CompanyHome {...props} /></React.Fragment>}} />
        <Route path="/unauthorized" render={()=><Unauthorized/>}/>
        <Route path="/404" component={Notfound}/>
        <Route exact path="/" render={(props)=>{return(<React.Fragment><Topnav {...props}/><Homepage {...props}/></React.Fragment>)}}/>
        <Redirect to="/404"/>
       </Switch>
      </React.Fragment>
    );
  }
}

export default App;
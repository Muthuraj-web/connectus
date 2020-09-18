import React, { Component } from 'react';
import {hire, giveRoles} from "../../data"
import Input from "../AuthInput/Input";
import FakeDiv from '../AuthInput/FakeDiv';
import Suggestion from '../CandidateAdder/Suggestion'
import { giveSkills} from '../../data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import ResultTable from './ResultTable';

class HireSection extends Component {
    state={
        result:[],
        error:undefined,
        info:[],
        suggestions:[],
        skills:true,
        role:true,
        submit:true,
        loading:false
    }
    componentDidMount(){
        this.setState({
            info:[hire()],
            suggestions:[{skills:[],role:[]}],
            skills:true
        })
    }
    valueUpdater=(unique,e)=>{
        const name = e.currentTarget.name
        let suggestions = this.state.suggestions
        let info=this.state.info
        let obj = info[0]
        if(name==="skills"){
            console.log("yes")
            obj[name].value[obj[name].value.length - 1] = e.currentTarget.value
        }
        else obj[name].value = e.currentTarget.value
        let {skills,role} = this.state
        
        if(obj[name].name==="skills"){
            
            if(obj[name].value[obj[name].value.length - 1]!==""){
                giveSkills(obj[name].value[obj[name].value.length - 1]).then(result=>{ 
                    suggestions[0]['skills'] = result.data
                    this.setState({suggestions,skills:true})
                })
                delete obj[name]['error']
            }
            else if(obj[name].value.length===0){
                obj[name]['error'] = "Enter a valid company name"
                skills=false
                suggestions[0].skills=[]
            }
        }
        else if(obj[name].name==="role"){
            if(obj[name].value.length!==0){
                giveRoles(obj[name].value).then(result=>{
                    suggestions[0]['role'] = result.data
                    this.setState({suggestions,role:true})
                    delete obj[name]['error']
                })
            }
            else if(obj[name].value.length===0){
                console.log("yes")
                obj[name]['error'] = "Enter a valid company name"
                role=false
                suggestions[0].role=[]
            }

        }
        info[0] = obj
        this.setState({
            info,
            suggestions,
            role,
            skills
        })

    }
    handleSuggestions=(unique,name,value,e)=>{
        let {info,suggestions} = this.state
        if(name==="skills"){
            info[0][name].value[info[0][name].value.length - 1] = value
            info[0][name].value = [...info[0][name].value,""]
        }
        else if(name==="role"){
            info[0][name].value = value
        }
        suggestions[0][name] = []
        let start = 0
        let submit = false
        info.forEach(each=>{
            Object.keys(each).forEach(element=>{
                submit = submit || Object.keys(info[start][element]).includes('error')
            })
            start+=1
        })
        this.setState({
            info,
            suggestions,
            [name]:false,
            submit
        })
    
    }

    submit=async(e)=>{
        e.preventDefault()
        const minExp = this.state.info[0].minimum_experience.value
        const maxExp = this.state.info[0].maximum_experience.value
        const role = this.state.info[0].role.value
        let skills = [...this.state.info[0].skills.value]
        skills.pop()
        skills = skills.join(", ")
        this.setState({
            loading:true
        })
        const result = await Axios.get(`https://connectus-backend.herokuapp.com/company/hire?role=${role}&&skills=${skills}&&minExp=${minExp}&&maxExp=${maxExp}&&sortByExp=1`)
        if(result.data.length){
            this.setState({
                error:undefined,
                result:result.data,
                loading:false
            })
        }
        else{
            this.setState({
                error:"Sorry No candidates in our Portal match Your requirements",
                result:[],
                loading:false
            })
        }
    }
    render() {
        return (
            <React.Fragment>
            <div className="container pl-5 pr-5 pt-2 pb-2 rounded" style={{backgroundColor:"lightgrey"}}>
            {this.state.info.map(each=>
                <div style={{position:"relative"}}>
                    <Input unique={0} {...each.role} valueUpdater={this.valueUpdater}/>
                    {
                        this.state.role?
                        <Suggestion unique={0}
                        name="role"
                        suggestions={this.state.suggestions[0].role}
                        handleSuggestions={this.handleSuggestions}/>:
                        <React.Fragment/>
                    }
                    <Input unique={0} {...each.minimum_experience} step="0.5" max={10} valueUpdater={this.valueUpdater}/>
                    <Input unique={0} {...each.maximum_experience} step="0.5" max={20} valueUpdater={this.valueUpdater}/>
                    <FakeDiv {...each.skills} unique={0} valueUpdater={this.valueUpdater}/>
                    {
                        this.state.skills?
                        <Suggestion unique={0}
                        name="skills"
                        suggestions={this.state.suggestions[0].skills}
                        handleSuggestions={this.handleSuggestions}/>:
                        <React.Fragment/>
                    }
                </div>
            )}
            <button className="button rounded pl-2 pr-3 pt-1 mb-3 mt-3" onClick={this.submit} disabled={this.state.submit}><b><FontAwesomeIcon icon={faSearch} /><i> Search</i></b></button>
            </div>
            {
                this.state.error?
                <p className="text-danger d-block text-center bold-italic">{this.state.error}</p>:
                <React.Fragment/>
            }
            <div className="container">
                <table className="w-100 table table-striped" style={{overflowX:"scroll"}}>
                    <thead>
                        <th style={{width:"20%"}}><i>Profile</i></th>
                        <th style={{width:"20%"}}><i>Name</i></th>
                        <th style={{width:"20%"}}><i>Skills</i></th>
                        <th style={{width:"20%"}}><i>Experience</i></th>
                        <th style={{width:"20%"}}><i>E-mail</i></th>
                    </thead>
                    {
                        this.state.loading?
                            <div className="spinner-border d-block m-auto text-info" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>:
                            !this.state.error?
                                <ResultTable result={this.state.result} />:
                                    <React.Fragment/>
                    }
                </table>
            </div>
            </React.Fragment>
            
        );
    }
}

export default HireSection;
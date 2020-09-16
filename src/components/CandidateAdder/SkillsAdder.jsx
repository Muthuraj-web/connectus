import React, { Component } from 'react';
import FakeDiv from '../AuthInput/FakeDiv'
import Suggestion from './Suggestion'
import {skills,giveSkills, isAuthToEdit,_id} from '../../data'
import Axios from 'axios';

class SkillsAdder extends Component {

    state={
        info:[],
        suggestions:[],
        unique:0,
        skills:false,
        submit:true
    }

    componentDidMount(){
        let {info,suggestions} = this.state
        info.push({...skills(),unique:this.state.unique})
        suggestions.push({skills:[],unique:this.state.unique})
        this.setState({
            info,
            suggestions,
            unique:this.state.unique+1
        })
    }

    valueUpdater=async(unique,e)=>{
        const index = this.state.info.findIndex((each)=>each.unique===unique)
        const name = e.currentTarget.name
        let suggestions = this.state.suggestions
        let info=this.state.info
        let obj = info[index]
        obj[name].value[obj[name].value.length - 1] = e.currentTarget.value
        let {skills} = this.state
        if(obj[name].value[obj[name].value.length - 1]!==""){
                giveSkills(obj[name].value[obj[name].value.length - 1]).then(result=>{ 
                    suggestions[index]['skills'] = result.data
                    this.setState({suggestions,skills:true})
                })
                delete obj[name]['error']
            }
        else if(obj[name].value.length===0){
                obj[name]['error'] = "Enter a Skill Name"
                skills=false
                suggestions[index].skills=[]
            }
        let submit = false
        let start = 0
        info[index] = obj
        info.forEach(each=>{
            Object.keys(each).forEach(element=>{
                submit = submit || Object.keys(info[start][element]).includes('error')
            })
            start+=1
        })
        this.setState({
            info,
            skills,
            submit
        })
    }

    handleSuggestions=(unique,name,value,e)=>{
        let {info,suggestions} = this.state
        const index = info.findIndex(each=>each.unique===unique)
        info[index][name].value[info[index][name].value.length - 1] = value
        info[index][name].value = [...info[index][name].value,""]
        suggestions[index][name] = []
        let submit = false
        let start = 0
        console.log(info)
        info.forEach(each=>{
            Object.keys(each).forEach(element=>{
                console.log(element,Object.keys(info[start][element]).includes('error'))
                submit = submit || Object.keys(info[start][element]).includes('error')
            })
            start+=1
        })
        this.setState({
            info,
            suggestions,
            skills:false,
            submit
        })
    
    }

    submit=async(e)=>{
        try{
            e.preventDefault()
            let skills = []
            this.state.info[0].skills.value.forEach(each=>{
                skills.push({name:each})
            })
            skills.pop()
            console.log(skills)
            const result = await Axios.put("https://connectus-backend.herokuapp.com/candidate/add/skills",{requestData:skills,jwt:localStorage.getItem('jwt')})
            if (result.status===200){
                if (this.props.save){
                    this.props.history.replace(`/candidate/${_id()}`)
                }
                else{
                    this.props.history.push('/candidate/add/works')
                }
            }

        }
        catch(err){
            console.log("unauthorized")
        }
    }

    render() {
        console.log(this.state)
        if(isAuthToEdit("candidate")){
        return (
            <div className="adder-container">
                <form>
                <h5 className="bold-italic pl-2 pt-5 pb-5">Add the given details Below</h5>
                    <div className="p-2" style={{position:"relative"}}>
                    {
                        this.state.info.map(each=>
                            <React.Fragment>
                                <FakeDiv {...each.skills}  unique={each.unique} valueUpdater={this.valueUpdater}/>
                                {  
                                    this.state.skills?
                                    <Suggestion unique={each.unique} 
                                    name="skills" 
                                    suggestions={this.state.suggestions[each.unique].skills} 
                                    handleSuggestions={this.handleSuggestions}/>:
                                    <React.Fragment/>
                                }
                            </React.Fragment>
                        )}
                    </div>
                    <button type="submit" onClick={this.submit} disabled={this.props.save?false:this.state.submit}className="button rounded pl-3 pr-3 pt-1 pb-1 ml-2 mt-5" ><b><i>{this.props.save?"Save":"Next"}</i></b></button>
                </form>
            </div>
        );}
        else{
            this.props.history.push("/unauthorized")
        }
    }
}

export default SkillsAdder;
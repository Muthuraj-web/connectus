import React, { Component } from 'react';
import Input from '../AuthInput/Input'
import Suggestion from './Suggestion'
import {educations,giveUniversities,giveCourses, _id, isAuthToEdit} from '../../data'
import Select from "../AuthInput/Select"
import Axios from 'axios'

class EducationsAdder extends Component {

    state={
        info:[],
        suggestions:[],
        institute:false,
        course:false,
        unique:0
    }

    componentDidMount(){
        this.setState({
            info:[{...educations(),unique:this.state.unique}],
            suggestions:[{institute:[],course:[],unique:this.state.unique}],
            unique:this.state.unique+1,
            submit:true
        })
    }
    addEducations=()=>{
        const info = this.state.info
        info.push({...educations(),unique:this.state.unique})
        const suggestions = this.state.suggestions
        suggestions.push({institute:[],course:[],unique:this.state.unique})
        this.setState({
            info,
            suggestions,
            unique:this.state.unique+1,
            submit:true
        })
    }
    valueUpdater=(unique,e)=>{
        const index = this.state.info.findIndex((each)=>each.unique===unique)
        const name = e.currentTarget.name
        let suggestions = this.state.suggestions
        let info=this.state.info
        if(name==="start"||name==="end"){
            const type = Boolean(Number(e.currentTarget.value))?"year":"month"
            info[index][name][type].value = e.currentTarget.value
            this.setState({
                info
            })
            return 
        }
        let obj = info[index]
        obj[name].value = e.currentTarget.value
        let {institute,course} = this.state

        if(obj[name].name==="institute"){
            
            if(obj[name].value!==""){
                giveUniversities(obj[name].value).then(result=>{ 
                    suggestions[index]['institute'] = result.data
                    this.setState({suggestions,institute:true,course:false})
                })
                delete obj[name]['error']
            }
            else{
                obj[name]['error'] = "Enter a valid Institute Name"
                institute=false
                suggestions[index].institute=[]
            }
        }

        else if(obj[name].name==="course"){

            if(obj[name].value!=="") {
                giveCourses(obj[name].value).then(result=>{ 
                    let suggestions = this.state.suggestions
                    suggestions[index]['course'] = result.data
                    this.setState({suggestions,institute:false,course:true})
                })
                delete obj[name]['error']
            }
            else{
                obj[name]['error'] = "Enter a valid graduation Course"
                course=false
                suggestions[index].course=[]
            }
        }

        let submit = false
        let start = 0
        info.forEach(each=>{
            Object.keys(each).forEach(element=>{
                console.log(element,Object.keys(info[start][element]).includes('error'))
                submit = submit || Object.keys(info[start][element]).includes('error')
            })
            start+=1
        })

        info[index] = obj
        this.setState({
            info,
            institute,
            course,
            submit
        })
    }
    handleSuggestions=(unique,name,value,e)=>{
        let {info,suggestions} = this.state
        const index = info.findIndex(each=>each.unique===unique)
        info[index][name].value = value
        suggestions[index][name] = []
        let submit = false
        let start = 0
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
            [name]:false,
            submit
        })
    }

    skip=async(section,e)=>{
        e.preventDefault()
        await Axios.post(`https://connectus-backend.herokuapp.com/candidate/toggle/${section}`,{jwt:localStorage.getItem('jwt')})
        this.props.history.push('/candidate/add/interests')
    }

    submit=async(e)=>{
        e.preventDefault()
        let requestData = []
        this.state.info.forEach(each=>{
            requestData.push({
                institute:each.institute.value,
                course:each.course.value,
                logo:each.logo,
                timeline:{start:{month:each.start.month.value,year:Number(each.start.year.value)},end:{month:each.end.month.value,year:Number(each.end.year.value)}}
            })
        })
        await Axios.put(`https://connectus-backend.herokuapp.com/candidate/add/educations`,{requestData,jwt:localStorage.getItem('jwt')})
        if(this.props.save) this.props.history.replace(`/candidate/${_id()}`)
        else this.props.history.push(`/candidate/add/interests`)
        
    }
    render() {
        if(isAuthToEdit("candidate")){
        return (
            <div className="adder-container">
                <h5 className="bold-italic pl-2 pt-5 pb-5">Add your Graduation Courses</h5>
                <form>
                    {
                        this.state.info.map(each=>
                        <div className="container">
                            <div style={{position:"relative"}}>
                                <Input {...each.institute}  unique={each.unique} valueUpdater={this.valueUpdater} />
                                {  
                                    this.state.institute?
                                    <Suggestion unique={each.unique} 
                                    name="institute" 
                                    suggestions={this.state.suggestions[each.unique].institute} 
                                    handleSuggestions={this.handleSuggestions}/>:
                                    <React.Fragment/>
                                }
                            </div>
                            <div style={{position:"relative"}}>
                                <Input {...each.course}  unique={each.unique} valueUpdater={this.valueUpdater} />
                                {  
                                    this.state.course?
                                    <Suggestion unique={each.unique} 
                                    name="course" 
                                    suggestions={this.state.suggestions[each.unique].course} 
                                    handleSuggestions={this.handleSuggestions}/>:
                                    <React.Fragment/>
                                }
                            </div>
                            <Select {...each.start} name="start" unique={each.unique} valueUpdater={this.valueUpdater}/>
                            <Select {...each.end} name="end" unique={each.unique} valueUpdater={this.valueUpdater}/>
                        </div>
                    )}
                </form>
                <button className="button rounded pl-3 pr-3 pt-1 pb-1 mb-4 ml-2 mt-5 bold-italic" onClick={this.addEducations}>Add Educations</button>
                {
                    this.props.save?
                    <React.Fragment/>:
                    <button type="submit" 
                    onClick={(e)=>{this.skip("educations",e)}} 
                    className="button rounded pl-3 pr-3 pt-1 pb-1 mb-4 ml-2 mt-5 bold-italic" >Skip</button>

                }
                <button type="submit" 
                onClick={this.submit} 
                disabled={this.props.save?false:this.state.submit} 
                className="button rounded pl-3 pr-3 pt-1 pb-1 mb-4 ml-2 mt-5 bold-italic" >{this.props.save?"Save":"Next"}
                </button>
            </div>
        );}
        else{
            this.props.history.push("/unauthorized")
            return null
        }
    }
}

export default EducationsAdder;
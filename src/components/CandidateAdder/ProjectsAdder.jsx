import React, { Component } from 'react';
import Input from '../AuthInput/Input'
import Suggestion from './Suggestion'
import {projects,giveSkills, isAuthToEdit,_id} from '../../data'
import Select from '../AuthInput/Select'
import Axios from 'axios'
import FakeDiv from '../AuthInput/FakeDiv';

class ProjectsAdder extends Component {

    state={
        info:[],
        suggestions:[],
        tools:false,
        submit:true,
        unique:0
    }

    componentDidMount(){
        this.setState({
            info:[{...projects(),unique:this.state.unique}],
            suggestions:[{tools:[],unique:this.state.unique}],
            unique:this.state.unique+1
        })
    }

    addProjects=()=>{
        const info = this.state.info
        info.push({...projects(),unique:this.state.unique})
        const suggestions = this.state.suggestions
        suggestions.push({tools:[],unique:this.state.unique})
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
            console.log(e.currentTarget.value,type)
            info[index][name][type].value = e.currentTarget.value
            this.setState({
                info
            })
            return 
        }
        let obj = info[index]
        if(name==="tools")  obj[name].value[obj[name].value.length - 1] = e.currentTarget.value
        else obj[name].value = e.currentTarget.value
        let {tools} = this.state

        if(obj[name].name==="tools"){
            
            if(obj[name].value[obj[name].value.length - 1]!==""){
                giveSkills(obj[name].value[obj[name].value.length - 1]).then(result=>{ 
                    suggestions[index]['tools'] = result.data
                    this.setState({suggestions,tools:true})
                })
                delete obj[name]['error']
            }
            else if(obj[name].value.length===0){
                obj[name]['error'] = "Enter the tools you used"
                tools=false
                suggestions[index].tools=[]
            }
        }

        else if(obj[name].name==="title"){

            if(obj[name].value!=="") delete obj[name]['error']
            else obj[name]['error'] = "Give your Project title"

        }
        else if(obj[name].name==="link"){

            if(obj[name].value!=="") delete obj[name]['error']
            else obj[name]['error'] = "Please provide the link for your project"

        }
        else if(obj[name].name==="description"){

            if(obj[name].value!=="") delete obj[name]['error']
            else obj[name]['error'] = "Describe about your project"

        }
        let submit = false
        let start = 0
        console.log(info)
        info.forEach(each=>{
            Object.keys(each).forEach(element=>{
                submit = submit || Object.keys(info[start][element]).includes('error')
            })
            start+=1
        })
        console.log(submit)
        info[index] = obj
        this.setState({
            info,
            tools,
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
            [name]:false,
            submit
        })
    }
    
    skip=async(section,e)=>{
        e.preventDefault()
        await Axios.post(`http://localhost:8080/candidate/toggle/${section}`,{jwt:localStorage.getItem('jwt')})
        this.props.history.push('/candidate/add/educations')
    }

    submit=async(e)=>{
        e.preventDefault()
        let requestData = []
        this.state.info.forEach(each=>{
            requestData.push({
                title:each.title.value,
                tools:each.tools.value.slice(0,each.tools.value.length - 1),
                description:each.description.value,
                timeline:{start:{month:each.start.month.value,year:Number(each.start.year.value)}},
                link:each.link.value
            })
        })
       
        const result = await Axios.put("http://localhost:8080/candidate/add/projects",{requestData,jwt:localStorage.getItem('jwt')})
        console.log(result)
        if (result.status===200){
            if (this.props.save){
                this.props.history.replace(`/candidate/${_id()}`)
            }
            else{
                this.props.history.push('/candidate/add/educations')
            }
        }
    }
    render() {
        console.log(this.state)
        if(isAuthToEdit("candidate")){
        return (
            <div className="adder-container">
                <form>
                    {
                        this.state.info.map(each=>
                        <div className="container">
                            <h5 className="bold-italic pl-2 pt-5 pb-5">Add your Projects and Prototype</h5>
                            <div style={{position:"relative"}}>
                                <Input {...each.title}  unique={each.unique} valueUpdater={this.valueUpdater} />
                                <Select {...each.start} name="start" unique={each.unique} valueUpdater={this.valueUpdater}/>
                                <Input {...each.description}  unique={each.unique} valueUpdater={this.valueUpdater} />
                                <FakeDiv {...each.tools}  unique={each.unique} valueUpdater={this.valueUpdater}/>
                                {  
                                    this.state.tools?
                                    <Suggestion unique={each.unique} 
                                    name="tools" 
                                    suggestions={this.state.suggestions[each.unique].tools} 
                                    handleSuggestions={this.handleSuggestions}/>:
                                    <React.Fragment/>
                                }
                            </div>
                                <Input {...each.link}  unique={each.unique} valueUpdater={this.valueUpdater} />
                        </div>
                    )}
                </form>
                <button className="button rounded pl-3 pr-3 pt-1 pb-1 mb-4 ml-2 mt-5 bold-italic" onClick={this.addProjects}>Add more</button>
                {
                    this.props.save?
                    <React.Fragment/>:
                    <button type="submit" 
                    onClick={(e)=>{this.skip("projects",e)}} 
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
        }
    }
}

export default ProjectsAdder;
import React, { Component } from 'react';
import Input from '../AuthInput/Input'
import {works,giveCompanies, giveRoles, isAuthToEdit,_id} from '../../data'
import Suggestion from './Suggestion';
import Select from '../AuthInput/Select';
import Axios from 'axios';

class WorksAdder extends Component {

    state={
        info:[],
        suggestions:[],
        unique:0,
        company:false,
        role:false,
        submit:true
    }

    componentDidMount(){
        const newworks = works()
        this.setState({
            info:[{...newworks,logo:"default",unique:this.state.unique}],
            suggestions:[{company:[],role:[],unique:this.state.unique}],
            unique:this.state.unique+1
        })
    }

    addWorks=()=>{
        const newworks = works()
        const info = this.state.info
        info.push({...newworks,unique:this.state.unique})
        const suggestions = this.state.suggestions
        suggestions.push({current:[],role:[],unique:this.state.unique})
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
        let suggestions = this.state.suggestions
        let obj = info[index]
        obj[name].value = e.currentTarget.value
        let {company,role} = this.state

        if(obj[name].name==="company"){
            
            if(obj[name].value.trim().length!==0){
                delete obj[name]['error']
                giveCompanies(obj[name].value).then(result=>{ 
                    suggestions[index]['company'] = result.data
                    this.setState({suggestions,company:true,role:false})
                })
            }
            else{
                obj[name]['error'] = "Enter a valid company name"
                company=false
                suggestions[index].company=[]
            }
        }

        else if(obj[name].name==="role"){

            if(obj[name].value.trim().length!==0) {
                delete obj[name]['error']
                giveRoles(obj[name].value).then(result=>{ 
                    let suggestions = this.state.suggestions
                    suggestions[index]['role'] = result.data
                    this.setState({suggestions,company:false,role:true})
                })
            }
            else{
                obj[name]['error'] = "Enter the role designated to you"
                role=false
                suggestions[index].role=[]
            }
        }
        else if(obj[name].name==="description"){
            if(obj[name].value.trim().length!==0) delete obj[name]['error']
            else obj[name]['error'] = "describe about your experience here"
        }
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
        console.log(submit)
        info[index] = obj

        this.setState({
            info,
            company,
            role,
            submit
        })
    }

    handleSuggestions=(unique,name,value,e)=>{
        let {info,suggestions} = this.state
        const index = info.findIndex(each=>each.unique===unique)
        info[index][name].value = value
        if(name==="company"){
            const logoIndex = suggestions[index][name].findIndex(each=>each.name===value)
            info[index].logo = suggestions[index][name][logoIndex].logo
        } 
        delete info[index][name].error
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
        console.log(submit)
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
        this.props.history.push('/candidate/add/projects')
    }
    submit=async(e)=>{
        e.preventDefault()
        let requestData = []
        this.state.info.forEach(each=>{
            requestData.push({
                company:each.company.value,
                role:each.role.value,
                description:each.description.value,
                logo:each.logo,
                timeline:{start:{month:each.start.month.value,year:Number(each.start.year.value)},end:{month:each.end.month.value,year:Number(each.end.year.value)}}
            })
        })
        const result = await Axios.put("https://connectus-backend.herokuapp.com/candidate/add/works",{requestData,jwt:localStorage.getItem('jwt')})
        if (result.status===200){
            if (this.props.save){
                this.props.history.replace(`/candidate/${_id()}`)
            }
            else{
                this.props.history.push('/candidate/add/projects')
            }
        }
    }
    render() {
        if(isAuthToEdit("candidate")){
        return (
            <div className="adder-container">
                <form>
                    {
                        this.state.info.map(each=>
                            <div key={each.unique} className=" container pt-5 pb-5">
                                <h5 className="bold-italic pl-2 pt-5 pb-5">Add Your Previous Work Experience</h5>
                                <div style={{position:"relative"}}>
                                    <Input {...each.company}  unique={each.unique} valueUpdater={this.valueUpdater} />
                                    {  
                                        this.state.company?
                                        <Suggestion unique={each.unique} 
                                        name="company" 
                                        suggestions={this.state.suggestions[each.unique].company} 
                                        handleSuggestions={this.handleSuggestions}/>:
                                        <React.Fragment/>
                                    }
                                </div>
                                <div style={{position:"relative"}}>
                                    <Input {...each.role} unique={each.unique} valueUpdater={this.valueUpdater}/>
                                    {  
                                        this.state.role?
                                        <Suggestion unique={each.unique} 
                                        name="role" 
                                        suggestions={this.state.suggestions[each.unique].role} 
                                        handleSuggestions={this.handleSuggestions}/>:
                                        <React.Fragment/>
                                    }
                                </div>
                                <Select {...each.start} name="start" unique={each.unique} valueUpdater={this.valueUpdater}/>
                                <Select {...each.end} name="end" unique={each.unique} valueUpdater={this.valueUpdater}/>
                                <Input {...each.description} unique={each.unique}  valueUpdater={this.valueUpdater}/>
                            </div>
                            )
                    }
                </form>
                <button className="button rounded pl-3 pr-3 pt-1 pb-1 mb-4 ml-2 mt-5 bold-italic" onClick={this.addWorks}>Add Works</button>
                {
                    this.props.save?
                    <React.Fragment/>:
                    <button type="submit" 
                    onClick={(e)=>{this.skip("works",e)}} 
                    className="button rounded pl-3 pr-3 pt-1 pb-1 mb-4 ml-2 mt-5 bold-italic" >Skip</button>

                }
                <button type="submit" 
                onClick={this.submit} 
                disabled={this.props.save?false:this.state.submit} 
                className="button rounded pl-3 pr-3 pt-1 pb-1 mb-4 ml-2 mt-5 bold-italic" >{this.props.save?"Save":"Next"}                </button>
            </div>
            
        );}
        else{
            this.props.history.push("/unauthorized")
        }
    }
}

export default WorksAdder;
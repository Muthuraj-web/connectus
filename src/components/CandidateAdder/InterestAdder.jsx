import React, { Component } from 'react';
import Input from '../AuthInput/Input'
import Suggestion from './Suggestion'
import {interests,giveRoles,isAuthToEdit,_id} from '../../data'
import Axios from 'axios';

class SkillsAdder extends Component {

    state={
        info:[],
        suggestions:[],
        unique:0,
        interest:false,
        submit:true
    }

    componentDidMount(){
        let {info,suggestions} = this.state
        info.push({...interests(),unique:this.state.unique})
        suggestions.push({interests:[],unique:this.state.unique})
        this.setState({
            info,
            suggestions,
            unique:this.state.unique+1
        })
    }

    valueUpdater=async(unique,e)=>{
        let {info,suggestions,interest} = this.state
        const index = info.findIndex((each)=>each.unique===unique)
        info[index].value = e.currentTarget.value
        if(info[index].value!==""){
            delete info[index].error
            giveRoles(info[index].value).then(result=>{
                suggestions[index].interests = result.data
                this.setState({
                    info,
                    suggestions,
                    skills:true
                })
            })
        }
        else{
            info[index].error = "Enter the Field you are interested"
            suggestions[index].interests=[]
            interest=false
        }
        let submit = info.filter(each=>Object.keys(each).includes('error'))

        this.setState({
            info,
            suggestions,
            interest,
            submit:Boolean(submit.length)
        })
    }

    addInterests=(e)=>{
        e.preventDefault()
        let {info,suggestions,unique} = this.state
        info.push({...interests(),unique})
        suggestions.push({interests:[],unique})
        this.setState({
            info,
            suggestions,
            unique:unique+1,
            submit:true
        })
    }

    handleSuggestions=(unique,name,value,e)=>{
        let {info,suggestions} = this.state
        const index = info.findIndex((each)=>each.unique===unique)
        info[index].value = value
        delete info[index].error
        suggestions[index].interests=[]
        let submit = info.filter(each=>Object.keys(each).includes('error'))
        this.setState({
            info,suggestions,interest:false,submit:Boolean(submit.length)
        })
    }

    submit=async(e)=>{
        try{
            e.preventDefault()
            let interests = []
            this.state.info.forEach(each=>{
                interests.push(each.value)
            })
            const result = await Axios.put(`https://connectus-backend.herokuapp.com/candidate/add/interests`,{requestData:interests,jwt:localStorage.getItem('jwt')})
            if (result.status===200) this.props.history.replace(`/candidate/${_id()}`)
        }
        catch(err){
            console.log("unauthorized")
        }
    }

    render() {
        if(isAuthToEdit("candidate")){
        return (
            <div className="container">
                <form>
                <h5 className="bold-italic pl-2 pt-5 pb-5">Add your Field of Interests here</h5>
                    <div className="p-2" style={{position:"relative"}}>
                    {
                        this.state.info.map(each=>
                            <React.Fragment>
                                <Input {...each} valueUpdater={this.valueUpdater} unique={each.unique}/>
                                {
                                    this.state.skills?
                                    <Suggestion unique={each.unique} 
                                    name="interests" 
                                    suggestions={this.state.suggestions[each.unique].interests} 
                                    handleSuggestions={this.handleSuggestions}/>:
                                    <React.Fragment/>
                                }
                            </React.Fragment>
                        )}
                    </div>
                    <button className="button rounded pl-3 pr-3 pt-1 pb-1 ml-2 mt-5" onClick={this.addInterests}><b><i>Add more</i></b></button>
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
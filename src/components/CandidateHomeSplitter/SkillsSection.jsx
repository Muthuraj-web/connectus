import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import EditButton from './EditButton'
import Axios from 'axios'
import React, { Component } from 'react';

class SkillsSection extends Component {
    state={
        value:"",
        serverError:undefined
    }
    componentDidMount(){
        for(let i=0;i<this.props.skills.length;i++){
            if(!this.props.skills[i].verified){
                this.setState({
                    value:this.props.skills[i].name
                })
                break
            }
        }
    }
    valueChanger=(e)=>{
        this.setState({
            value:e.currentTarget.value
        })
    }
    submit=async(e)=>{
        e.preventDefault()
        const {data} = await Axios.post(`http://localhost:8080/skilltest/checkskill/${this.state.value}`,{jwt:localStorage.getItem('jwt')})
        if(data.error){
            this.setState({
                serverError:data.error
            })
            setTimeout(()=>this.setState({serverError:undefined}),1500)
            return
        }
        else this.props.history.push(`/skilltest/${this.state.value}`)
    }
    render() {
        return (
            <div className="container box-shadow w-100 h-auto pt-2 pl-2  mt-2 mb-2" style={{backgroundColor:"inherit"}}>
                <h3 className="pl-2 pt-3 pb-2 m-0" style={{fontWeight:"300"}}>SKILLS</h3>
                <ul className="pl-2 pt-3 pb-3 pr-3 m-0" style={{listStyleType:"none"}}>
                    {this.props.skills.map(each=>
                        <li>
                            <h6 className="font-italic">
                                {each.name}
                                {each.verified?<FontAwesomeIcon className="text-success float-right" icon={faCheckCircle} />:<React.Fragment/>}
                            </h6>
                        </li>)}
                </ul>
                {this.props.editable?<EditButton push="/add/skill" {...this.props}/>:<React.Fragment/>}
                {
                    this.props.editable?
                    <div className="row pb-4" >
                        <div className="col-6">
                        <select onChange={this.valueChanger}  value={this.state.value} style={{fontStyle:"italic"}}>
                            {    
                                this.props.skills.map(each=>{
                                    if(!each.verified) return <option style={{fontStyle:"italic"}} value={each.name}>{each.name}</option>
                                    return <React.Fragment/>
                                })
                            }
                        </select>
                        </div>
                        <div className="col-6">
                            <button onClick={this.submit} className="button rounded w-100"><b><i>Take Test</i></b></button>
                        </div>
                    </div>
                    :
                    <React.Fragment/>
                }
                {   
                    this.state.serverError && this.props.editable?
                    <p>
                        <i className="text-danger">
                            {this.state.serverError}
                        </i>
                    </p>:
                    <React.Fragment/>
                }
            </div>
        );
    }
}

export default SkillsSection;
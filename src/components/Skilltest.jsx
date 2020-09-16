import React, { Component } from 'react';
import {isAuthToEdit} from '../data'
import Axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
class Skilltest extends Component {
    state={
        result:null,
        test:[],
        answers:[],
        submit:true,
        loading:false
    }
    async componentDidMount(){
        this.setState({
            loading:true
        })
        const {data} = await Axios.post(`https://connectus-backend.herokuapp.com/skilltest/${this.props.match.params.skill}`,{jwt:localStorage.getItem('jwt')})
        let answers=[]
        for(let i=0;i<data.test.length;i++){
            answers.push(null)
        }
        this.setState({
            test:data.test,
            answers,
            loading:false
        })
    }
    valueUpdater=(index,value,e)=>{
        let answers = this.state.answers
        answers[Number(e.currentTarget.name)] = value
        let submit=true
        console.log(answers)
        if(answers.indexOf(null)===-1) submit=false
        this.setState({
            answers,
            submit
        })
    }
    goBack=()=>{
        this.props.history.goBack()
    }
    submit=async(e)=>{
        e.preventDefault()
        this.setState({
            loading:true
        })
        const {data} = await Axios.post(`https://connectus-backend.herokuapp.com/skilltest/givegrade/${this.props.match.params.skill}`,{jwt:localStorage.getItem('jwt'),answers:this.state.answers})
        console.log(data)
        this.setState({result:data.result,loading:false})
    }

    render() {
        console.log(this.state)
        let index = -1
        if(isAuthToEdit("candidate")){
            return(
                <div className="container">
                    <p className="pt-2"><b>Score 80% or above to pass and earn a verified badge</b></p>
                    <p className="bg-success rounded-pill d-inline-block p-1 pl-3 pr-3 "><i>{this.props.match.params.skill}</i></p>
                    {
                        this.state.loading?
                            <div className="spinner-border d-block m-auto text-info" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>:
                            this.state.result==="pass"?
                                <div>
                                <FontAwesomeIcon className="bg-success text-light d-block mt-3 mb-3 rounded-circle m-auto" icon={faCheckCircle}/>
                                <div style={{backgroundColor:"lightgreen"}}>
                                    <p>You have passed the skill test enjoy earning the skill badge</p>
                                </div>
                                <button onClick={this.goBack} className="button rounded">Go Back</button>
                                </div>:
                                this.state.result==="fail"?
                                    <div>
                                    <FontAwesomeIcon className="bg-danger text-light mt-3 mb-3 d-block rounded-circle m-auto" icon={faTimesCircle}/>                                        
                                    <div style={{backgroundColor:"lightcoral"}}>
                                        <p>Sorry you have scored below 80%</p>
                                    </div>
                                    <button onClick={this.goBack} className="button rounded">Go Back</button>
                                    </div>:
                                        <form>
                                        {
                                            this.state.test.map(each=>{
                                                index++
                                                return(
                                                    <div className="container rounded box-shadow p-2 mt-2 mb-2">
                                                        <p className="mb-2"><b><i>{each.question}</i></b></p>
                                                        <div className="bg-light p-2 rounded">
                                                        {
                                                            each.options.map(element=>
                                                                    <React.Fragment>
                                                                    <div>
                                                                    <input type="radio" name={index} onChange={(e)=>{this.valueUpdater(index,element,e)}} value={element} /><label htmlFor={element}>{element}</label>
                                                                    </div>
                                                                    </React.Fragment>
                                                                )
                                                        }
                                                        </div>
                                                    </div>
                                                );
                                            })
                    
                    
                                        }
                                        <button type="submit" className="button rounded" onClick={this.submit} disabled={this.state.submit}><b><i>Submit</i></b></button>
                                        </form>
                    }
                </div>
            );
        }
        else return this.props.history.replace("/unauthorized")
    }
}

export default Skilltest;
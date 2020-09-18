import React, { Component } from 'react';
import {isAuthToEdit,aboutus} from '../../data'
import Input from '../AuthInput/Input';
import Axios from 'axios'
import {decode} from 'jsonwebtoken'
class Aboutus extends Component {
    state={
        info:[],
        submit:true
    }
    componentDidMount(){
        this.setState({
            info:[aboutus()]
        })
    }
    valueUpdater=(unique,e)=>{
        let {info,submit} = this.state
        const name = e.currentTarget.name
        let obj = info[0]
        obj[name].value = e.currentTarget.value
        if(name === "aboutus"){
            if(obj[name].value===''){
                obj[name]['error'] = "Give a brief about what your company do"
                submit=true
            }
            else {
                delete obj[name]['error']
                submit=false
            }
        }
        info[0] = obj
        this.setState({
            info,submit
        })
    }
    submit=async(e)=>{
        e.preventDefault()
        const requestData = {aboutus:this.state.info[0].aboutus.value}
        const result = await Axios.put("https://connectus-backend.herokuapp.com/add/aboutus",{requestData,jwt:localStorage.getItem('jwt')})  
        if(result.status===200){
            this.props.history.replace(`/company/${decode(localStorage.getItem("jwt"))._id}`)
        }
    }
    render() {
        if(isAuthToEdit("company")){
            return(
                <div className="container">
                    <h5 className="bold-italic pl-2 pt-5 pb-5">Share about your company culture and what you do</h5>
                <form>
                {
                    this.state.info.map(each=>
                        <Input {...each.aboutus} unique={0} valueUpdater={this.valueUpdater} />)
                    
                }
    
                </form>
                <button type="submit" 
                onClick={this.submit} 
                disabled={this.props.save?false:this.state.submit} 
                className="button rounded pl-3 pr-3 pt-1 pb-1 ml-2 mt-5" ><b><i>{this.props.save?"Save":"Next"}</i></b>
                </button>
                </div>
            )
        }
        else{
            this.props.history.replace("/unauthorized")
        }
    }
}

export default Aboutus;
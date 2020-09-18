import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Input from './AuthInput/InputComponent';
import Joi from "joi";
import Axios from 'axios';
import {decode} from 'jsonwebtoken'
class Auth extends Component {
 
    state={
        credentialError:undefined,
        type:"",
        info:[],
        submit:true,
    }

    componentDidMount(){
    
        this.setState({
            type:this.props.type,
            info:this.props.info
        })
    }
    credentialErrorUpdater=(credentialError)=>{
        this.setState({
            credentialError
        })
    }
    valueUpdater=(e)=>{
        let info = this.state.info
        info = info.map(each=>{
            if(each.name!==e.currentTarget.name) return each
            else
            {
                each.value = e.currentTarget.value
                if(each.name==="name"){
                    if(each.value.length===0) each['error'] = "Enter a valid Name"
                    else delete each['error']       
                }
                if(each.name === "company"){
                    if(each.value.length===0) each['error'] = "Enter a valid Company Name"
                    else delete each['error']
                }
                else if(each.name === "password"){
                    if(each.value.length<8) each['error'] = "Password must Contain more than 8 digits"
                    else delete each['error']
                }
                else if(each.name === "email"){
                    const JoiSchema = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in'] } })
                    const result = JoiSchema.validate(each.value)
                    if(result.error)  each['error'] = "Invalid email format accepts only .com, .in ,.net extensions"
                    else delete each['error']
                }
            }
            return each

        })
        let submit = info.filter(each=>Object.keys(each).includes('error'))

        this.setState({
            info,
            submit:Boolean(submit.length)
        })
    }

    submit = async(e)=>{
        e.preventDefault()
        this.setState({
            credentialError:undefined
        })
        let send={}
        this.state.info.forEach(each=>{
            send[each.name]=each.value
        })
        if(this.props.location.pathname==="/company/auth/login"){
            const {data} = await Axios.post('https://connectus-backend.herokuapp.com/company/login',{...send})
            if(data.error) this.credentialErrorUpdater(data.error)
            else{
                localStorage.setItem('jwt',data.jwt)
                localStorage.setItem('type','company')
                const {_id} = decode(data.jwt)
                this.props.history.replace(`/company/${_id}`)
            }
            return
        }
        else if(this.props.location.pathname==="/company/auth/signup"){
            const {data} = await Axios.post('https://connectus-backend.herokuapp.com/company/signup',{...send})
            if(data.error) this.credentialErrorUpdater(data.error)
            else{
                localStorage.setItem('jwt',data.jwt)
                localStorage.setItem('type','company')
                this.props.history.replace(`/company/add/mains`)
            }
            return
        }
        else if(this.props.location.pathname==="/candidate/auth/login"){
            const {data} = await Axios.post('https://connectus-backend.herokuapp.com/candidate/login',{...send})
            if(data.error) this.credentialErrorUpdater(data.error)
            else{
                localStorage.setItem('jwt',data.jwt)
                localStorage.setItem('type','candidate')
                const {_id} = decode(data.jwt)
                this.props.history.replace(`/candidate/${_id}`)
            }
        }
        else if(this.props.location.pathname==="/candidate/auth/signup"){
            const {data} = await Axios.post('https://connectus-backend.herokuapp.com/candidate/signup',{...send})
            if(data.error) this.credentialErrorUpdater(data.error)
            else{
                localStorage.setItem('jwt',data.jwt)
                localStorage.setItem('type','candidate')
                this.props.history.replace(`/candidate/add/mains`)
            }
            return
        }
    }

    render() {
        return(
            <div className="container p-5">
                <div className="row">
                <div className="col-sm-6 p-0 m-0 mobile-hider">
                    <img alt={'design'} className="h-100 p-0 m-0 w-100 rounded" style={{objectFit:"cover"}} src={`${process.env.PUBLIC_URL}/authimg.jpg`}/>
                </div>
                <div className="col-sm-6 p-0 m-0">
                    <div className="auth-right-container w-100 m-sm-4">
                        <img alt={'logo'} style={{width:"100%"}} src={process.env.PUBLIC_URL+"/connectus.png"}></img>
                        {this.state.credentialError?<h6 className="text-danger pb-2 pt-2 border rounded border-danger text-center"><i>{this.state.credentialError}</i></h6>:<React.Fragment/>}
                    <form>
                        {   
                            this.state.info.map(each=><Input info={each} valueUpdater={this.valueUpdater}/>)
                        }
                        <button type="submit" onClick={this.submit} disabled={this.state.submit} className="button rounded pl-3 pr-3 pt-1 pb-1 ml-2 mt-5" ><b><i>submit</i></b></button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Auth;

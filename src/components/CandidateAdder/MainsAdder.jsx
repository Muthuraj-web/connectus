import React, { Component } from 'react';
import {mainsAdder, isAuthToEdit,_id} from '../../data'
import Input from '../AuthInput/Input'
import Axios from 'axios';
import {decode} from 'jsonwebtoken'
import {saveImage} from '../saveImage'

class MainsAdder extends Component {
    state={
        info:[],
        submit:true
    }

    async componentDidMount(){
        const obj = mainsAdder()
        if(this.props.company){
            obj['websiteLink']={
                name:"websiteLink",
                type:"text",
                value:"",
                error:""
            }
            delete obj['githubLink']
            delete obj['twitterLink']
            delete obj['instagramLink']
        }
        if(this.props.save){
            if(this.props.company) {
                const mains = await (await Axios.get(`https://connectus-backend.herokuapp.com/company/mains/${decode(localStorage.getItem("jwt"))._id}`)).data.mains
                obj.coverphoto['uploaded'] = mains.coverphoto
                obj.shortdescription.value = mains.shortdescription
                obj.profile['uploaded'] = mains.profile
                if(this.props.company){
                    obj.websiteLink.value = mains.social_media.website
                }
            }
            else {
                const mains = await (await Axios.get(`https://connectus-backend.herokuapp.com/candidate/mains/${decode(localStorage.getItem("jwt"))._id}`)).data.mains
                obj.coverphoto['uploaded'] = mains.coverphoto
                obj.shortdescription.value = mains.shortdescription
                obj.profile['uploaded'] = mains.profile
                obj.githubLink.value = mains.social_media.github
                obj.twitterLink.value = mains.social_media.twitter
                obj.instagramLink.value = mains.social_media.instagram
            }
        }
        this.setState({
            info:[obj]
        })
        
    }

    valueUpdater=(unique,e)=>{
        let info = this.state.info
        const name = e.currentTarget.name
        let obj = info[0]
        obj[name].value = e.currentTarget.value
        if(name === "profile"){
            if(obj[name].value==='') obj[name]['error'] = "Upload a profile photo"
            else{
                obj[name]['file'] = e.currentTarget.files[0]
                delete obj[name]['error']
            }
        }
        else if(name === "coverphoto"){
            if(obj[name].value==='') obj[name]['error'] = "Upload Cover photo"
            else{
                obj[name]['file'] = e.currentTarget.files[0]
                delete obj[name]['error']
            }
        }
        else if(name === "shortdescription"){
            if(obj[name].value==='') obj[name]['error'] = "Describe a short about you"
            else delete obj[name]['error']
        }
        else if(name === "githubLink"){
            if(obj[name].value==='') obj[name]['error'] = "Link Your github profile"
            else delete obj[name]['error']
        }
        else if(name === "twitterLink"){
            if(obj[name].value==='') obj[name]['error'] = "Link Your twitter profile"
            else delete obj[name]['error']
        }
        else if(name === "instagramLink"){
            if(obj[name].value==='') obj[name]['error'] = "Link your Instagram profile"
            else delete obj[name]['error']
        }
        else if(name === "websiteLink"){
            if(obj[name].value==='') obj[name]['error'] = "Upload your website URL"
            else delete obj[name]['error']
        }
        info[name] = obj
        let submit = Object.keys(info[0]).filter(each=>Object.keys(info[0][each]).includes('error'))

        this.setState({
            info,
            submit:Boolean(submit.length)
        })
    }
    submit=async(e)=>{
        e.preventDefault()
        let {profile,coverphoto} = this.state.info[0]

        if(!this.props.save){
            profile = await saveImage(profile.file)
            coverphoto = await saveImage(coverphoto.file)
        }
        else{
            profile = profile.uploaded
            coverphoto = coverphoto.uploaded
            if(this.state.info[0].profile.file){
                profile = await saveImage(this.state.info[0].profile.file)
            }
            if(this.state.info[0].coverphoto.file){
                
                coverphoto = await saveImage(this.state.info[0].coverphoto.file)
            }
        }
        let {shortdescription,githubLink,instagramLink,twitterLink,websiteLink} = this.state.info[0]
        let requestData={
            profile:profile,
            coverphoto:coverphoto,
            shortdescription:shortdescription.value,
        }


        if(this.props.company){
            requestData['social_media']={
                website:websiteLink.value
            }
        }
        else{
            requestData['social_media']={
                github:githubLink.value,
                instagram:instagramLink.value,
                twitter:twitterLink.value
            }
        }

        let result = {}
        if(this.props.company){
            result = await Axios.put("https://connectus-backend.herokuapp.com/company/add/mains",{requestData,jwt:localStorage.getItem('jwt')})  
        }
        else{
            result = await Axios.put("https://connectus-backend.herokuapp.com/candidate/add/mains",{requestData,jwt:localStorage.getItem('jwt')})

        } 
        if (result.status===200){
            if (this.props.save){
                this.props.history.replace(`/${localStorage.getItem("type")}/${_id()}`)
            }
            else if(localStorage.getItem("type")==="candidate"){
                this.props.history.push('/candidate/add/skills')
            }
            else{
                this.props.history.push('/company/add/aboutus')
            }
        }
    }
    render() {
        if(isAuthToEdit(this.props.company?"company":"candidate")){
        return (
            <div className="adder-container p-2">
                <h5 className="bold-italic pl-2 pt-5 pb-5">Add the given details Below</h5>
                <form>
                    {
                        this.state.info.map(each=>
                            <React.Fragment>
                                <Input {...each.email} unique={0}  valueUpdater={this.valueUpdater} />
                                <Input {...each.profile} unique={0}  valueUpdater={this.valueUpdater} />
                                    {this.props.save?<p><i>current : <a href={each.profile.uploaded}>{each.profile.uploaded}</a></i></p>:<React.Fragment/>}
                                <Input {...each.coverphoto}  unique={0} valueUpdater={this.valueUpdater} />
                                    {this.props.save?<p className="pl-2"><i>current : <a href={each.profile.uploaded}>{each.coverphoto.uploaded}</a></i></p>:<React.Fragment/>}
                                <Input {...each.shortdescription} unique={0}  valueUpdater={this.valueUpdater} />
                                {
                                    this.props.company?
                                    <Input {...each.websiteLink} unique={0}  valueUpdater={this.valueUpdater}/>:
                                    <React.Fragment>
                                    <Input {...each.githubLink} unique={0}  valueUpdater={this.valueUpdater} />
                                    <Input {...each.twitterLink} unique={0}  valueUpdater={this.valueUpdater} />
                                    <Input {...each.instagramLink} unique={0}  valueUpdater={this.valueUpdater} />
                                    </React.Fragment>
                                }
                            </React.Fragment>
                    )}
                    <button type="submit" 
                    onClick={this.submit} 
                    disabled={this.props.save?false:this.state.submit} 
                    className="button rounded pl-3 pr-3 pt-1 pb-1 mb-4 ml-2 mt-5" ><b><i>{this.props.save?"Save":"Next"}</i></b>
                    </button>
                </form>
            </div>
        );}
        else{
            this.props.history.push("/unauthorized")
        }
    }
}

export default MainsAdder;
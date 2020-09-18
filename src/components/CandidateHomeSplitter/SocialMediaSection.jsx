import React, { Component } from 'react';
import copy from 'copy-to-clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';

class SocialMediaSection extends Component {

    state={
        show:false,
        value:"",
        showCopied:false
    }
    valueChanger=(value)=>{
        this.setState({
            value,
            show:true,
        })
    }

    copyText=()=>{
        copy(this.state.value)
        this.setState({
            showCopied:true
        })
        setTimeout(()=>this.setState({
            showCopied:false
        }),1000)
    }

    render() {
        const {social_media} = this.props
        return (
            <React.Fragment>
                {
                    social_media.website?
                    <div>
                        <img alt={"email"} onClick={()=>{this.valueChanger(this.props.email)}} src="https://img.icons8.com/doodle/48/000000/email--v1.png"/>
                        <img alt={"wesite"} onClick={()=>{this.valueChanger(social_media.website)}} src="https://img.icons8.com/color/48/000000/domain--v1.png"/>
                    </div>:
                    <div>
                        <img alt={"twitter"} onClick={()=>{this.valueChanger(social_media.twitter)}} src="https://img.icons8.com/color/48/000000/twitter-squared.png"/>
                        <img alt={"git"} onClick={()=>{this.valueChanger(social_media.github)}} src="https://img.icons8.com/fluent/48/000000/github.png"/>
                        <img alt={"email"} onClick={()=>{this.valueChanger(this.props.email)}} src="https://img.icons8.com/doodle/48/000000/email--v1.png"/>
                        <img alt={"insta"} onClick={()=>{this.valueChanger(social_media.instagram)}} src="https://img.icons8.com/fluent/48/000000/instagram-new.png"/>
                    </div>
                }
                {
                    this.state.value?
                    <div className="row ml-2">
                        <div className="shadow col-6 rounded  p-2 mt-1 mb-1" style={{backgroundColor:"lightgray"}}>
                            <FontAwesomeIcon onClick={this.copyText} className="ml-1" icon={faPaste} style={{float:"right"}}/>
                            <p className="bg-light rounded p-0 pl-2  m-0 " style={{overflowX:"hidden",fontFamily:"monospace"}}>{this.state.value}</p>
                        </div>
                        {
                            this.state.showCopied?
                            <p className="pt-2 mb-2 pl-2 shadow mt-1 ml-1 rounded bg-dark text-light pr-2" style={{fontFamily:"monospace"}}>copied !</p>:
                            <React.Fragment/>
                        }
                    </div>:
                    <React.Fragment/>
                }
            </React.Fragment>
        );
    }
}

export default SocialMediaSection;
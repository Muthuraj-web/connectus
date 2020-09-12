import React from 'react';
import SocialMediaSection from './SocialMediaSection';
import EditButton from './EditButton'

function ProfilePhotoSection(props) {
    console.log(props)
    const RedirectToHire=(e)=>{
        e.preventDefault()
        props.history.push("/company/hire")
    }
    return (
        <div className="container box-shadow w-100 p-0 m-0" style={{backgroundColor:"inherit",position:"relative"}}>
            <img className="p-0 m-0" src={props.mains.coverphoto} style={{width:"100%",height:"30vh",objectFit:"cover"}} />
            <img src={props.mains.profile} style={{objectFit:"cover"}} className="profile-photo"/>
            <div className="row profile-inner-div">
                <div className="col-sm-6">
                    <h4 className="candidate-name" >{props.name||props.company}</h4>
                    <p className="candidate-short_des">{props.mains.shortdescription}</p>
                </div>
                <div className="col-sm-6">
                    <SocialMediaSection email={props.email} social_media={props.mains.social_media}/>
                    {props.company?<button className="button rounded mt-2 ml-2" onClick={RedirectToHire}><i>Hire Candidates</i></button>:<React.Fragment/>}
                </div>
            </div>
            {props.editable?<EditButton push={"mains"} {...props}/>:<React.Fragment/>}
        </div>
    );
}

export default ProfilePhotoSection;
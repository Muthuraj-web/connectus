import Axios from 'axios'
import {decode} from 'jsonwebtoken'

function createfield(name,type,readonly=false){
    if(readonly) return { name,type,value:"",readonly}
    return { name,type,value:"",error:""}
}
function createImageField(name){
    return { name,type:"file",value:"",error:"",accept:"image/*"}
}
function createfieldReadonly(name,type,value){
    return { name,type,value,readonly:true,}
}
function createRangeField(name,value) {
    return {name,value,type:"range"}
}
function createSelectField(name,value){
    return { name,value}
}
export const yearArr=()=>{
    let arr=[]
    for(let i=2030;i>=1970;i=i-1){
        arr.push(i)
    }
    return arr
}
export const monthArr=()=>{
    return [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ]
}

const createTextArea=(name,textarea=true) =>{return{ name,value:"",error:"",textarea}}

export const candidateSignup = [createfield("name","text"),createfield("email","email"),createfield("password","password")]
export const candidateLogin = [createfield("email","email"),createfield("password","password")]
export const companyAuth= [createfield("company","text"),createfield("email","email"),createfield("password","password")]

export const giveCompanies=async(value)=>{
    return await Axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`)
}
export const giveRoles=async(value)=>{
    return await Axios.get(`http://api.dataatwork.org/v1/jobs/autocomplete?begins_with="${value}"`)
}
export const giveSkills=async(value)=>{
    return await Axios.get(`http://localhost:8080/skills/${value}`)
}
export const giveUniversities=async(value)=>{
    return await Axios.get(`http://universities.hipolabs.com/search?name=${value}`)
}
export const giveCourses = async(value)=>{
    return await Axios.get(`http://localhost:8080/university/${value}`)
  
}

export function mainsAdder(){
    return {   
        email:createfieldReadonly("email","email",decode(localStorage.getItem("jwt")).email),
        profile:createImageField("profile"),
        coverphoto:createImageField("coverphoto"),
        shortdescription:createTextArea("shortdescription"),
        githubLink:createfield("githubLink","text"),
        twitterLink:createfield("twitterLink","text"),
        instagramLink:createfield("instagramLink","text")
    }
}

export function educations(){
    return {   
        institute:createfield("institute","text"),
        course:createfield("course","text"),
        start:{month:createSelectField("month","January"),year:createSelectField("year",1989)},
        end:{month:createSelectField("month","March"),year:createSelectField("year",1999)}
    }
}
export function projects(){
    return {
        title:createfield("title","text"),
        tools:{...createfield("tools","text"),value:[""]},
        start:{month:createSelectField("month","January"),year:createSelectField("year",1989)},
        description:createTextArea("description"),
        link:createfield("link","text")
    }
}

export function skills(){
    return {
        skills:{...createfield("skills","text"),value:[""]}
    }
}

export function works(){    
    return {   
         company:createfield("company","text"),
         role:createfield("role","text"),
         description:createTextArea("description"),
         start:{month:createSelectField("month","January"),year:createSelectField("year",1989)},
         end:{month:createSelectField("month","March"),year:createSelectField("year",1999)}
     }
}

export const interests=()=>createfield("interest","text")
export const isAuthToEdit=(name)=>{
    return Boolean(decode(localStorage.getItem("jwt"))) && Boolean(decode(localStorage.getItem("jwt"))._id) && Boolean(localStorage.getItem("type")===name)
}

export function hire(){
    return{
        role:createfield("role","text"),
        skills: {...createfield("skills","text"),value:[""]},
        minimum_experience:createRangeField("minimum_experience","2"),
        maximum_experience:createRangeField("maximum_experience","5")
    }
}
export function aboutus(){
    return{
        aboutus:createTextArea("aboutus")
    }
}
export const _id=()=>{
    return decode(localStorage.getItem("jwt"))._id
}
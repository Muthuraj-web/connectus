import Axios from 'axios'
export async function saveImage(file){
    try{
        const {data} = await Axios.post('https://connectus-backend.herokuapp.com/signedurl',{jwt:localStorage.getItem("jwt"),name:file.name,type:file.type})
        await Axios.put(data,file,{
            headers:{
                'Content-Type':file.type
            }
        })
        return `https://connectus-bucket.s3.ap-south-1.amazonaws.com/${file.name}`
    }
    catch(err){
        console.log(err.message)
    }
}
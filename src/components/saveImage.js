import Axios from 'axios'
export async function saveImage(file){
    try{
        const {data} = await Axios.post("https://connectus-backend.herokuapp.com/getSignedURL/URL",{jwt:localStorage.getItem('jwt'),type:file.type,name:file.name})
        console.log(data)
        await Axios.put(data.url,file,{
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
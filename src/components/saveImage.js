import {S3} from 'aws-sdk'
import Axios from 'axios'

const s3 = new S3({
    accessKeyId:'AKIA4WMFRU4RZEMAJBV5',
    secretAccessKey:'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',
    region:'ap-south-1'
})

export async function saveImage(file,type){
    try{
        const res = await s3.getSignedUrl("putObject",{
            Bucket:"connectus-bucket",
            ContentType:file.type,
            Key:file.name
        })
        console.log(res)
        const res2 = await Axios.put(res,file,{
            headers:{
                'Content-Type':file.type
            }
        })
        console.log(`https://connectus-bucket.s3.ap-south-1.amazonaws.com/${file.name}`)
        return `https://connectus-bucket.s3.ap-south-1.amazonaws.com/${file.name}`
    }
    catch(err){
        console.log(err.message)
    }
}
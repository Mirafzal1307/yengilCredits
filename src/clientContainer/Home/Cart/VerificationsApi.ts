import axios from "axios"

export const postPhone = (phone:any) => {
    // console.log(phone)
    const phones = {number:phone.phone,
    name:phone.fullName}
    console.log(phones)
    const res = axios.post("https://test.api.yengilcredit.uz/sms/generate", phones )
    // console.log(res);
}


export const PostCode = async (mass:any) => {
    const phone = mass[0]
    const code = mass[1]
    console.log(phone, code);
    console.log(mass);
    axios({
        url:`https://test.api.yengilcredit.uz/sms/validation/${code}`,
        method:"GET",
        headers:{
            "number":`${phone}`
        }
    })
    .then((res) =>{ 
        // dispatch({type:"VER_RESPONSE", payload:res})
    console.log(res.status);})
    .catch((err) => err)
    
    
}
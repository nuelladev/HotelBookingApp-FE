import axios from "axios";

export const api = axios.create({
baseURL: "http://localhost:9192"
})

export async function addRoom(roomPhoto, roomType, roomPrice){
const formData = new formData()
formData.append("roomPhoto", roomPhoto)
formData.append("roomType", roomType)
formData.append("roomPrice", roomPrice)

const response = await api.post("/rooms/add/new-room", formData)
if (response.status == 201){
    return true
}else{ return false;
}
}
export async function getRoomTypes(){
    try{


    }catch(){

    }
}
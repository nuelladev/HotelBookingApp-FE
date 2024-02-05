import axios from "axios";

export const api = axios.create({
baseURL: "http://localhost:9192"
})

export async function addRoom(roomPhoto, roomType, roomPrice){
const formData = new formData()
formData.append("roomPhoto", roomPhoto)
formData.append("roomType", roomType)
formData.append("roomPrice", roomPrice)

// adds a new room

const response = await api.post("/rooms/add/new-room", formData)
if (response.status == 201){
    return true
}else{ return false;
}
}

//retrieves the room types that have been created from the database
export async function getRoomTypes(){
    try{
   const response = await api.get("/rooms/room-types") 
    return response.data

    }catch(error){
    throw new Error("Error fetching room types!")
    }
}
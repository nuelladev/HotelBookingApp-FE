import  { useState } from 'react'
import addRoom from '../utils'

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        roomPhoto: null, 
        roomType: " ",
        roomPrice: " "

    })
    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleRoomInputChange = (e) => {
		const name = e.target.name
		let value = e.target.value
		if (name === "roomPrice") {
			if (!isNaN(value)) {
				value = parseInt(value)
			} else {
				value = ""
			}
		}
		setNewRoom({ ...newRoom, [name]: value })
	}
    const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewRoom({ ...newRoom, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const success = await addRoom(newRoom.roomPhoto, newRoom.roomType, newRoom.roomPrice)
			if (success !== undefined) {
				setSuccessMessage("A new room was  added successfully !")
				setNewRoom({ photo: null, roomType: "", roomPrice: "" })
				setImagePreview("")
				setErrorMessage("")
			} else {
				setErrorMessage("Error adding new room")
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}
  return (
    <div>
      
    </div>
  )


export default AddRoom
 
import  { useState } from 'react'

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
    const handle handleImageChange = (e) => {
     const selectedImage = e.target.files[0]
     setNewRoom({...})

    }
}
  return (
    <div>
      
    </div>
  )
}

export default AddRoom
 
import { useState } from 'react';
import { addRoom } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';
import RoomTypeSelector from '../commons/RoomTypeSelector';

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        roomPhoto: null,
        roomType: '', // Initialize with an empty string instead of a space
        roomPrice: '' // Keep as string for controlled input, convert later
    });
    const [imagePreview, setImagePreview] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRoomInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'roomPrice') {
            if (!isNaN(value) && value.trim() !== '') {
                setNewRoom({ ...newRoom, [name]: parseFloat(value).toFixed(2) }); // Convert to float and keep as string
            } else {
                setNewRoom({ ...newRoom, [name]: '' });
            }
        } else {
            setNewRoom({ ...newRoom, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newRoom, roomPhoto: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('roomPhoto', newRoom.roomPhoto);
        formData.append('roomType', newRoom.roomType);
        formData.append('roomPrice', newRoom.roomPrice); // Convert to string in API function if necessary

        try {
            const success = await addRoom(formData); // Updated to send formData directly
            if (success) {
                setSuccessMessage('A new room was added successfully!');
                setNewRoom({ roomPhoto: null, roomType: '', roomPrice: '' });
                setImagePreview('');
                setErrorMessage('');
            } else {
                setErrorMessage('Error adding new room');
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 3000);
    };

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Room</h2>
                        {successMessage && <div className="alert alert-success fade show">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger fade show">{errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} />

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                                <input
                                    required
                                    type="text" // Changed to text to allow for .toFixed(2)
                                    className="form-control"
                                    id="roomPrice"
                                    name="roomPrice"
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">Room Photo</label>
                                <input
                                    required
                                    name="photo"
                                    id="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && <img src={imagePreview} alt="Preview room" style={{ maxWidth: '400px', maxHeight: '400px' }} className="mb-3" />}
                            </div>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to={"/existing-rooms"} className="btn btn-outline-info">Existing rooms</Link>
                                <button type="submit" className="btn btn-outline-primary ml-2">Save Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddRoom;

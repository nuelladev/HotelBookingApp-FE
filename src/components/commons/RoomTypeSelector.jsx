import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([]); // Initialized as empty array
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        });
    }, []);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    };

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    };

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        required
                        className="form-select"
                        name="roomType"
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewRoomTypeInput(true);
                            } else {
                                handleRoomInputChange(e);
                            }
                        }}
                        value={newRoom.roomType || ''}> {/* Ensure controlled component */}
                        <option value="">Select a room type</option>
                        <option value="Add New">Add New</option>
                        {roomTypes.map(type => ( // Removed index parameter
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className="mt-2">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter New Room Type"
                                    value={newRoomType}
                                    onChange={handleNewRoomTypeInputChange}
                                />
                                <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

RoomTypeSelector.propTypes = {
    handleRoomInputChange: PropTypes.func.isRequired,
    newRoom: PropTypes.shape({
        roomType: PropTypes.string // This assumes roomType is a string. Adjust if it's another type.
    }).isRequired
};

export default RoomTypeSelector;

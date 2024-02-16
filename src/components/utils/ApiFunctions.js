import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9192',
});

export async function addRoom(roomPhoto, roomType, roomPrice) {
    const formData = new FormData();
    formData.append('roomPhoto', roomPhoto);
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);

    const response = await api.post('/rooms/add/new-room', formData);
    return response.status === 201;
}

export async function getRoomTypes() {
    try {
        const response = await api.get('/rooms/room-types');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching room types!');
    }
}

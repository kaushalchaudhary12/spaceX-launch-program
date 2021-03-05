import axios from 'axios';
const URL = `https://api.spaceXdata.com/v3/launches`;

export const getSpaceXPrograms = async (query) => {
    const { data } = await axios.get(`${URL}${query}`);
    return data;
};
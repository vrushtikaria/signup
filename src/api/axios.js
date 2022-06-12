import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.shilpimultiplex.com/api/Auth/CreateUser'
});

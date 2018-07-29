import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://accademy-af6bc.firebaseio.com/'
});

export default instance;
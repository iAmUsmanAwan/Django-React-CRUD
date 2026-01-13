import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000/'; // API base URL

const axios_instance = axios.create({
    baseURL: baseurl,
    timeout: 5000, // request timeout {Request fails if it takes more than 5 seconds}
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export default axios_instance;
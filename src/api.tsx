import axios from 'axios';


console.log(window.location, "<<")
export default axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    url: '/rental'
});
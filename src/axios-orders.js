import axios from 'axios';
const instance = axios.create({
    baseURL :'https://meysam-burger.firebaseio.com/'
});
export default instance;

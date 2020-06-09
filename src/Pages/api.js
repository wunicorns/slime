import {requestCommon} from '../Utility/request'

const BASE = 'http://localhost:10000';
const DIAGRAM = BASE + "/diagram/";

const apis = {};

apis.get = (url) => {
    return requestCommon.get(DIAGRAM + url)
}

apis.post = (url, data) =>{
    return requestCommon.post(DIAGRAM + url, data)
}


export default apis;
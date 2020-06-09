export const requestCommon = {
    parseResponse: (response)=>{
        console.log(response);
        return response.json();
    }
    , catchCallback: (error)=>{
        throw error;
    }
};

requestCommon.request = (url, option) => (data) => {
    return fetch(url, Object.assign({
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }, option))
    .then(requestCommon.parseResponse)
    .catch(requestCommon.catchCallback);
}

requestCommon.get = (url) => {
    return requestCommon.request(url)();
}

requestCommon.post = (url, data) => {
    return requestCommon.request(url, {
        method: 'post'
    })(data);
}

requestCommon.put = (url, data) => {
    return requestCommon.request(url)(data);
}

requestCommon.delete = (url, data) => {
    return requestCommon.request(url)(data);
}

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://vue-blog-1769a-default-rtdb.europe-west1.firebasedatabase.app/'
});

const [get, post, put, del] = ['get', 'post', 'put', 'del']

export const responseExample = {
    data: {},
    status: 200,
}

instance.interceptors.request.use(response => response,
    error => {
        if (error.response.data.message) {
            console.log('warning', error.response.data.message);
        } else {
            typeof error.response.data === 'object' ? Object.values(
                    error.response.data).map(i => {
                    const message = Array.isArray(i) ? i.join('\n') : i;
                    console.log('warning', message);
                })
                : console.log('warning', 'При обработке запроса произошла ошибка');
        }
        throw  error.response.data;
    });

export let request = (type, url, data) => {
    switch (type) {
        case get:
            return instance.get(url, {
                params: data ? data : null,
            });
        case post:
            return instance.post(url, data);
        case put:
            return instance.put(url, data);
        case del:
            return instance.delete(url, data);
        default:
            return instance.get(url);
    }
};

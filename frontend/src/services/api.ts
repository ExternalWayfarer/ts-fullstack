import axios, { InternalAxiosRequestConfig, AxiosError  } from 'axios';


const api = axios.create({
baseURL: 'http://localhost:3000/',
    timeout: 1000,
})


const NO_AUTH_HEADER_PATHS: string[] = [
    'auth/login/',
    'auth/refresh/',
    'auth/register/',

];


// ------- request interceptor -------
//axios.interceptors.request.use((config)=>{ return config })

api.interceptors.request.use((config) => {
        //1. get token from localStorage
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        let isAuthPath: boolean = false;
        if (config.url) {
            isAuthPath = NO_AUTH_HEADER_PATHS.some(pathPrefix => config.url!.startsWith(pathPrefix));
        }
        // 2. if token exists => add it to the  header
        if (accessToken  && !isAuthPath) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else if (refreshToken && !isAuthPath) {
            config.headers.Authorization = `Bearer ${refreshToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// ------ request interceptor ends here-----



interface QueueArrayPromise {
    resolve: (value: any) => void;
    reject: (reason?: any) => void
}

// ----- response interceptor -------
let isRefreshing: boolean = false;
let failedQueue: Array<QueueArrayPromise> = [];

const processFailedQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry && originalRequest.url !== '/auth/refresh/') {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        if (originalRequest.headers) {
                            originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        }

                        return api(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {

                console.error("No refresh token available, logging out.");
                window.dispatchEvent(new Event('forceLogout'));
                isRefreshing = false;
                processFailedQueue(new Error("No refresh token"), null);
                return Promise.reject(error);
            }

            try {

                const response = await api.post('/auth/refresh/', {
                    refreshToken: refreshToken,
                });

                const newAccessToken = response.data.accessToken;

                localStorage.setItem('accessToken', newAccessToken);
                console.log('new accessToken successfully saved');
                // update header
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                }


                isRefreshing = false;
                processFailedQueue(null, newAccessToken);
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                isRefreshing = false;
                processFailedQueue(refreshError as Error, null);
                // if update doesn't succeed  => logout
                window.dispatchEvent(new Event('forceLogout'));
                return Promise.reject(refreshError);
            }
        }

        // other errors just return

        return Promise.reject(error);
    }
);
// ------ response interceptor ends here -------



export default api;
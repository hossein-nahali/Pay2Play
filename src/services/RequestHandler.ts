import axios, {AxiosError} from "axios";

export default class RequestHandler {

    static init() {
        // set token in login
        // if (UserRepository.isLogin())
        //     axios.defaults.headers.common['auth-token'] = UserRepository.token();

        axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL as string
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    static async get(url: string, params: object = {}) {
        this.init()
        try {
            const response = await axios.get(url, params);
            return response.data
        } catch (error: AxiosError | any) {
            // Load Error Handler
            return this.errorHandler(error);
        }
    }

    static async post(url: string, data: object = {}, header?: object) {
        this.init()
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...header,
                }
            });
            return response.data
        } catch (error: AxiosError | any) {
            // Load Error Handler
            return this.errorHandler(error);
        }
    }

    static async delete(url: string, params: object = {}) {
        this.init()
        try {
            const response = await axios.delete(url, params);
            return response.data
        } catch (error: AxiosError | any) {
            // Load Error Handler
            return this.errorHandler(error);
        }
    }

    private static errorHandler(error: AxiosError | any): ErrorModel {
        // // Check auth
        // if (error.response && error.response.hasOwnProperty('status') && error.response.status === 401) {
        //     if (UserRepository.isLogin()) {
        //         Toast.error("نشست منقضی شده.")
        //         UserRepository.logout().then(() => setTimeout(() => GoTo("/"), 2000))
        //     }
        // }

        switch (error.code) {
            case "ERR_NETWORK":
                return {
                    status: false,
                    message: "خطای ارتباط شبکه رخ داده است. لطفاً اتصال اینترنت خود را بررسی کنید یا مجدداً تلاش کنید."
                }
            default:
                return error.response.data
        }
    }
}
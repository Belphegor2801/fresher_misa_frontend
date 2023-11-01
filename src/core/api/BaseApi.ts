import axios from "axios";
import { MResource } from "@/resources//resources";

const baseDomain = "https://localhost:7025";
const baseUrl = `${baseDomain}/api/v1`;

const baseApi = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
});


/**
     * Xử lý response chung của api
     * @param {itemId}: string
     * @return không
     * createdBy: NXHinh (28/09/2023)
     */
baseApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("Error: ", error)
        let errResource =  MResource["VN"].ErrorMsg;

        if (error.code == "ERR_NETWORK") {
            return Promise.reject({
                data: errResource.ERR_NETWORK
            });
        }

        let {status} = error.response

        let userMessage = error.response.data.UserMessage;


        if (!userMessage) {
            console.log("??", userMessage)
            switch (status) {
                case 400:
                    userMessage = errResource.BadRequest;
                    break;
                case 401:
                    userMessage = errResource.Unauthorized;
                    break;
                case 403:
                    userMessage = errResource.Forbidden;
                    break;
                case 404:
                    userMessage = errResource.NotFound;
                    break;
                case 500:
                    userMessage = errResource.InternalServerError;
                    break;        
            }
        }
        
        return Promise.reject({
            data: userMessage
        });
    }
);

export default baseApi;
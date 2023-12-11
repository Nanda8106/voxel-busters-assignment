import axios from "axios";
import { API } from "../../backend";

// instance of axios created
export const instance =
    axios.create({
        baseURL: API,
        headers: {
            common: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        },
        withCredentials: false
    })




/**
 * Module to make a get request.
 * @param {*} url post url
 * @param {*} header 
 * @param {*} params 
 */
export const httpGET = (url) => {
    return new Promise((resolve, reject) => {
        instance.get(url)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    if (err?.code === "ERR_NETWORK") {
                        err.response.data = {
                            message: "Sorry for the inconvenience, the server is currently not responding. Please try again later."
                        }
                    }
                    reject(err)

                } else {
                    reject(err)
                }
            })
    })
}

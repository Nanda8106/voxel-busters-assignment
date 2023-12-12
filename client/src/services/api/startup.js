import { httpGET } from "../axios/axiosInstance";



export const getStartupsData = async ({currentIndustryType, page, limit}) => {
    let url = `/startup/type/${currentIndustryType}/${page}/${limit}`;
    return await httpGET(url)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};

export const getStartupFullInfo = async ({startupNo}) => {
    let url = `/startup/details/${startupNo}`;
    return await httpGET(url)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};


export const getIndustryTypes = async () => {
    let url = `/startup/industry-types`;
    return await httpGET(url)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch(async (err) => {
            return Promise.reject(err?.response);
        });
};
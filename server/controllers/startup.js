import fs from "fs"
import csvParser from "csv-parser";


/**
 * To fetch startups data
 * Based on client industry type it will return response
 * We are keeping limits for data transferring to perform high
 */
export const getStartupData = async (req, res) => {
    try {
        const { industryType, page, limit } = req?.params


        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;


        const filePath = './data/startup_funding.csv';
        const startupData = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                if(industryType === row?.IndustryVertical){
                    const { CityLocation, StartupName, Date, AmountInUSD, SNo } = row;
                    startupData.push({ CityLocation, StartupName, Date, AmountInUSD, SNo });
                }else if(industryType === "all"){
                    const { CityLocation, StartupName, Date, AmountInUSD, SNo } = row;
                    startupData.push({ CityLocation, StartupName, Date, AmountInUSD, SNo });
                }
            })
            .on('end', () => {
                // only requested amount of data will splice
                const paginatedData = startupData.slice(startIndex, endIndex);
                return res.status(200).json({ startupData: paginatedData, message: "Successfully fetched startup data" });
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/**
 * To fetch all the industry types to display in the drop down
 */
export const getIndustryTypes = async (req, res) => {
    try {
        const filePath = './data/startup_funding.csv';
        let industryTypes = []
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                if (!industryTypes?.includes(row?.IndustryVertical)) {
                    industryTypes.push(row?.IndustryVertical)
                }
            })
            .on('end', () => {
                // only requested amount of data will splice
                return res.status(200).json({ industryTypes, message: "Successfully fetched industry types" });
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

/**
 * To fetch startup complete details
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getStartupFullDetails = async (req, res) => {
    try {
        const { startupNo } = req?.params
        if (!startupNo) {
            return res.status(400).json({ message: "Internal Server Error. Startup number is undefined." })
        }

        const filePath = './data/startup_funding.csv';
        let startupDetails = {};
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                if (row.SNo && row.SNo === startupNo) {
                    // Stop reading the file once a match is found
                    startupDetails = row
                }
            })
            .on('end', () => {
                return res.status(200).json({ startupDetails, message: "Successfully fetched startup full details" });
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}




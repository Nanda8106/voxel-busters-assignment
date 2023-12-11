import React, { useEffect, useState } from 'react'
import Filters from './components/Filters'
import StartupData from './components/StartupData'
import { getIndustryTypes, getStartupsData } from '../../services/api/startup';
import Modal from './components/Modal';
import { CircularProgress } from '@mui/material';


const Startups = () => {
    const [openModal, setOpenModal] = useState(false);
    const [startupData, setStartupData] = useState([]);
    const [industryTypes, setIndustryTypes] = useState([]);
    const [page, setPage] = useState(1);
    const [currentStartup, setCurrentStartup] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentIndustryType, setCurrentIndustryType] = useState("all");

    const fetchStartupDataHandler = (industry, page) => {
        // setLoading(true)
        getStartupsData({ currentIndustryType: industry, page, limit: 20 })
            .then((res) => {
                if (page !== 1) {
                    setStartupData([...startupData, ...res?.data?.startupData])
                } else {
                    setStartupData(res?.data?.startupData)
                }
            }).finally(() => {
                setLoading(false)
            })
    }

    const changeIndustryTypeHandler = (selectedType) => {
        if (currentIndustryType !== selectedType) {
            setCurrentIndustryType(selectedType)
            setPage(1)
            fetchStartupDataHandler(selectedType, 1)
        }
    }

    const fetchIndustryTypesHandler = () => {
        getIndustryTypes()
            .then((res) => {
                setIndustryTypes(res?.data?.industryTypes)
            }).catch((err) => {
                console.log("error", err)
            })
    }

    useEffect(() => {
        fetchStartupDataHandler("all", 1)
        fetchIndustryTypesHandler()
    }, [])
    return (
        <>
            <div className='startups-wrapper'>
                <Filters industryTypes={industryTypes} changeIndustryTypeHandler={changeIndustryTypeHandler} currentIndustryType={currentIndustryType} />
                <div className="loading-startup-wrapper">
                    {loading ? <div className='loading-wrapper'><CircularProgress size={25} /></div> :
                        <>
                            <StartupData setOpenModal={setOpenModal} startupData={startupData} setCurrentStartup={setCurrentStartup} />
                            {(startupData?.length / page) === 20 && (

                                <div className="see-more">
                                    <button onClick={() => { setPage(page + 1); fetchStartupDataHandler(currentIndustryType, page + 1) }} className="see-more-button">SEE MORE</button>
                                </div>
                            )}
                        </>
                    }
                </div>
            </div>
            {openModal && (

                <div className="modal-wrapper">
                    <Modal currentStartup={currentStartup} setOpenModal={setOpenModal} />
                </div>
            )}
        </>
    )
}

export default Startups
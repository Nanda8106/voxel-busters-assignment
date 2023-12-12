import { Close, LocationOn } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { getStartupFullInfo } from '../../../services/api/startup'
import { CircularProgress } from '@mui/material'

const Modal = ({ currentStartup, setOpenModal }) => {
  const [currentStartupFullInfo, setCurrentStartupFullInfo] = useState({})
  const [loading, setLoading] = useState(true)

  // fetching particular startup details
  const fetchCurrentStartupInfoHandler = () => {
    setLoading(true)
    getStartupFullInfo({ startupNo: currentStartup })
      .then((res) => {
        setCurrentStartupFullInfo(res?.data?.startupDetails)
      }).catch((err) => {
        alert(err?.data?.message)
        setOpenModal(false)
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    
      fetchCurrentStartupInfoHandler()
  }, [])
  return (
    <div className='startup-info-modal'>
      <span onClick={() => { setOpenModal(false) }} className="close-button"><Close /></span>

      {loading ? <div className='loading-wrapper'><CircularProgress size={25} /></div> :

        Object.keys(currentStartupFullInfo)?.length > 0 && (
          <>

            <div className="company-name-location">
              <span className="company-name">{currentStartupFullInfo?.StartupName}</span>
              <span className="location"><LocationOn /> {currentStartupFullInfo?.CityLocation}</span>
            </div>

            <div className="startup-personal-info">
              <div className="each-info">
                <span className="info-header">Founded</span>
                <span className="info-result">:&nbsp;&nbsp;{currentStartupFullInfo?.Date ? currentStartupFullInfo?.Date : "---"} </span>
              </div>
              <div className="each-info">
                <span className="info-header">Industry</span>
                <span className="info-result">:&nbsp;&nbsp;{currentStartupFullInfo?.IndustryVertical ? currentStartupFullInfo?.IndustryVertical : "---"} </span>
              </div>
              <div className="each-info">
                <span className="info-header">Subvetical</span>
                <span className="info-result">:&nbsp;&nbsp;{currentStartupFullInfo?.SubVertical ? currentStartupFullInfo?.SubVertical : "---"} </span>
              </div>
              <div className="each-info">
                <span className="info-header">Investors</span>
                <span className="info-result">:&nbsp;&nbsp;{currentStartupFullInfo?.InvestorsName ? currentStartupFullInfo?.InvestorsName : "---"} </span>
              </div>
              <div className="each-info">
                <span className="info-header">Investment Type</span>
                <span className="info-result">:&nbsp;&nbsp;{currentStartupFullInfo?.InvestmentType ? currentStartupFullInfo?.InvestmentType : "---"} </span>
              </div>
              <div className="each-info">
                <span className="info-header">Amount</span>
                <span className="info-result">:&nbsp;&nbsp; {currentStartupFullInfo?.AmountInUSD ? `$${currentStartupFullInfo?.AmountInUSD}` : "---"} </span>
              </div>

            </div>
          </>
        )

      }

    </div>
  )
}

export default Modal
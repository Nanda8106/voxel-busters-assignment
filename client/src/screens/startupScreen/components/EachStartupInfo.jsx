import React from 'react'

const EachStartupInfo = ({ eachStartup, setOpenModal, setCurrentStartup }) => {
    return (
        <div onClick={() => {setOpenModal(true); setCurrentStartup(eachStartup?.StartupName)}} className='each-startup'>
            <span className="startup-name">{eachStartup?.StartupName}</span>
            <div className="startup-info">
                <div className="location-founded">
                    <div className="each-startup-info">
                        <span className="each-startup-header">Location</span>
                        <span className="each-startup-result">{eachStartup?.CityLocation}</span>
                    </div>
                    <div className="each-startup-info">
                        <span className="each-startup-header">Founded</span>
                        <span className="each-startup-result">{eachStartup?.Date ? eachStartup?.Date : "Unknown"}</span>
                    </div>
                </div>
                <div className="startup-investment">
                    <span className="investment-header">Investment</span>
                    <span className="investment-result">{eachStartup?.AmountInUSD ? `$${eachStartup?.AmountInUSD}` : "---"}</span>
                </div>
            </div>
        </div>
    )
}

export default EachStartupInfo
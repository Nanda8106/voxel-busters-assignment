import React from 'react'
import EachStartupInfo from './EachStartupInfo'

const StartupData = ({ startupData, setOpenModal, setCurrentStartup }) => {
  return (
    <div className='startup-data-wrapper'>
      {startupData?.map((eachStartup) => (
        <EachStartupInfo key={eachStartup?.SNo} setOpenModal={setOpenModal} eachStartup={eachStartup} setCurrentStartup={setCurrentStartup} />

      ))}
    </div>
  )
}

export default StartupData
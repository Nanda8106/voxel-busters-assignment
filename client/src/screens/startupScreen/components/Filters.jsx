import React from 'react';
import { Search } from '@mui/icons-material'

const Filters = ({ industryTypes, changeIndustryTypeHandler, currentIndustryType}) => {
    return (
        <div className='filter-wrapper'>
            {/* <span className="search-wrapper">
                <input value={searchQuery} onChange={(event) => {setSearchQuery(event?.target?.value)}} placeholder='Search here' type="text" className='search-input' />
                <span className="search-button"><Search /></span>
            </span> */}
            <select onChange={(event) => changeIndustryTypeHandler(event?.target?.value)} value={currentIndustryType}  className='code-quack-main-input'>
                <option value="all">All</option>
                {industryTypes?.map( (eachIndustry) => (
                    <option value={eachIndustry}>{eachIndustry}</option>
                ))}
            </select>

        </div>
    )
}

export default Filters
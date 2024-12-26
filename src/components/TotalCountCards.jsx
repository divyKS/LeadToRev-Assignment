import React, { useEffect, useState } from 'react'

const TotalCountCards = ({ totalCases, totalDeaths, totalRecovered }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl'>
            <Card type="Total Cases" count={totalCases} bgc="bg-blue-500"/>
            <Card type="Recoveries" count={totalRecovered} bgc="bg-green-500"/>
            <Card type="Deaths" count={totalDeaths} bgc="bg-red-500"/>
        </div>
    )
}

const Card = ({ type, count, bgc }) => {

    const countInMillions = (count / 1000000).toFixed(1); 

    return (
        <>
            <div className="flex flex-1 min-w-[4rem] h-18 shadow-sm">
                <div className={`py-2 px-4 ${bgc} bg-opacity-80 h-full flex items-center text-md font-medium rounded-l-2xl`}>
                    <div>{type}</div>
                </div>
                <div className="flex justify-center items-center text-xl font-semibold px-2 bg-white rounded-r-2xl">
                    <div>{countInMillions}M</div>
                </div>
            </div>
        </>
    )
}

export default TotalCountCards
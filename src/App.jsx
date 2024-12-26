import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import SearchCountry from './components/SearchCountry'
import TotalCountCards from './components/TotalCountCards'
import MyLineChart from './components/MyLineChart'
import MyPieChart from './components/MyPieChart'
import { fetchCovidHistoricalData } from './api'

function App() {
    const [currentCountryCode, setCurrentCountryCode] = useState('USA')
    const [currentCountryData, setCurrentCountryData] = useState([{}])

    const [lineChartData, setLineChartData] = useState([{}])
    const [dateFilterLineChartData, setDateFilterLineChartData] = useState([{}])

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [totalCases, setTotalCases] = useState(0)
    const [totalDeaths, setTotalDeaths] = useState(0)
    const [totalRecovered, setTotalRecovered] = useState(0)

    const fetchCovidData = async (countryCode) => {
        try {
            const { currentCountryData, transformedData } = await fetchCovidHistoricalData(countryCode);
            setLineChartData(transformedData)
            setDateFilterLineChartData(transformedData)
        } catch (error) {
            console.error('Error fetching COVID-19 data:', error);
            throw error;
        }
    };
    
    useEffect(() => {
        fetchCovidData(currentCountryCode)
    }, [currentCountryCode])

    useEffect(()=>{
        const calculateTotals = (data) => {
            const totalCases = data.reduce((sum, entry) => sum + entry.cases, 0);
            const totalDeaths = data.reduce((sum, entry) => sum + entry.deaths, 0);
            const totalRecovered = data.reduce((sum, entry) => sum + entry.recovered, 0);
        
            setTotalCases(totalCases);
            setTotalDeaths(totalDeaths);
            setTotalRecovered(totalRecovered);
          };

          calculateTotals(dateFilterLineChartData)
    }, [dateFilterLineChartData])

    useEffect(() => {
        if (!startDate && !endDate) {
            setDateFilterLineChartData(lineChartData); 
            return;
        }
        else {
            const filtered = lineChartData.filter((entry) => {
                const entryDate = new Date(entry.date);
                const startCondition = startDate ? entryDate >= new Date(startDate) : true;
                const endCondition = endDate ? entryDate <= new Date(endDate) : true;
                return startCondition && endCondition;
              });        
              setDateFilterLineChartData(filtered);
        }
    }, [startDate, endDate, lineChartData]);    

    const pieData = [
        { name: "Total Cases", value: totalCases },
        { name: "Total Deaths", value: totalDeaths },
        { name: "Total Recovered", value:totalRecovered },
    ];


    return (
        <>
             <div className='m-6 p-6'>
                <h1 className='font-bold lg:text-2xl md:text-xl'>COVID-19 and Population Dashboard</h1>
                
                <div className='flex flex-col-reverse tablet:flex-row mb-12 gap-8 items-center px-4'>
                    <SearchCountry setCurrentCountryCode={setCurrentCountryCode}/>
                    <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by date range</h3>
                        
                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col">
                            <label className="block text-xs text-gray-500 mb-1">From</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                            </div>

                            <div className="flex flex-col">
                            <label className="block text-xs text-gray-500 mb-1">To</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                            </div>
                        </div>
                    </div>
                </div>

                <TotalCountCards totalCases={totalCases} totalDeaths={totalDeaths} totalRecovered={totalRecovered} /> 

                <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center">
                    <div className="flex-[4] w-full lg:w-4/5">
                        <MyLineChart dateFilterLineChartData={dateFilterLineChartData} />
                    </div>
                    <div className="flex-[1] w-full lg:w-1/5">
                        <MyPieChart pieData={pieData} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default App

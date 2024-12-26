import React from 'react'
import './App.css'
import { useState } from 'react'
import SearchCountry from './components/SearchCountry'

function App() {
    const [currentCountry, setCurrentCountry] = useState('USA')

    return (
        <>
            <div className='m-12'>
                <h1>COVID-19 and Population Dashboard</h1>
                <div className='flex mt-12 mb-12'>
                    <SearchCountry setCurrentCountry={setCurrentCountry}/>
                    <div>
                        Date Filters
                    </div>
                </div>
            </div>
        </>
    )
}

export default App

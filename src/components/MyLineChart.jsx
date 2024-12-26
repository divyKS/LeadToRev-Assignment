import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const MyLineChart = ({ dateFilterLineChartData }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dateFilterLineChartData} margin={{ top: 20, left:20, right:20 }}>

                <CartesianGrid strokeDasharray="" />
                
                <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
                
                <YAxis />
                
                <Tooltip/>
                
                <Legend />

                <Line type="monotone" dataKey="cases" stroke="#8884d8" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />

                <Line type="monotone" dataKey="deaths" stroke="#FF0000" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />

                <Line type="monotone" dataKey="recovered" stroke="#00FF00" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />

            </LineChart>
        </ResponsiveContainer>

    )
}

export default MyLineChart
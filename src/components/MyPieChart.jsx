import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'


const MyPieChart = ({ pieData }) => {
    const COLORS = ["#3B82F6", "#22C55E", "#EF4444"];

    return (
        <>
            <div className="flex flex-col items-center relative">
                <ResponsiveContainer width="100%" height={600}>
                    <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center text-lg font-semibold">Total Distribution</div>
            </div>
        </>
    )
}

export default MyPieChart
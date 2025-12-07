import { LineChart, Line, ResponsiveContainer } from 'recharts'


export const ChartLine = ({ data }: { data: number[] }) => {
    const chartData = data.map((v, i) => ({ x: i, y: v }))
    return (
        <ResponsiveContainer width="100%" height={48}>
            <LineChart data={chartData}>
                <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}
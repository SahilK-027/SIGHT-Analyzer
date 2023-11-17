import React from 'react'
import './Dashboard.scss'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='main-dashboard'>
            <h3>Main Dashboard</h3>
            <div className="dashboard-navigation">
                <ul className='main-dashboard-items'>
                    <div className='dashboard-nav-list'>
                        <NavLink to='/home/analyze'><li>Analyzer</li></NavLink>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Dashboard

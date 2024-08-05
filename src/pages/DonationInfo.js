import React, { useContext } from 'react'
import "./DonationInfo.css"
import { DonationRow } from '../components/DonationRow';
import { DataContext } from '../contexts/DataContext';
import { capitalizeFirstLetter } from '../helpers/Helpers';

export const DonationInfo = () => {

    const { donations, settings } = useContext(DataContext)


  return (
    <div className='point-info-container'>
        <h1 style={{ textAlign: 'center' }}>Manage {capitalizeFirstLetter(settings.donationType)}</h1>
        <div className='point-info-grid'>
            <div className='point-row'>
                <div className='point-header point-item'>Added</div>
                <div className='point-header point-item'>{capitalizeFirstLetter}</div>
                <div className='point-header point-item'>Grade</div>
                <div className='point-header point-item'>Student</div>
                <div className='point-header point-item'>Delete</div>
            </div>
            {donations && donations.sort((a,b) => {
                return b.timestamp - a.timestamp
            }).map(donation => {
                return (
                    <DonationRow donation={donation} key={donation.id}/>
                )
            })}
        </div>
    </div>
  )
}

// .sort((a,b) => {
//     return b.timestamp - a.timestamp
// })

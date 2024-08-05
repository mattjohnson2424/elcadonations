import React, { useContext, useState } from 'react'
import { doc, deleteDoc } from "@firebase/firestore"
import dayjs from 'dayjs'
import { db } from '../firebase'
import { DataContext } from '../contexts/DataContext'
import { capitalizeFirstLetter } from '../helpers/Helpers'

export const DonationRow = ({donation}) => {

  const { students, settings } = useContext(DataContext)
  const [expand, setExpand] = useState(false)

    const deleteDonation = async () => {
        await deleteDoc(doc(db, 'donationEntries', donation.id));
    }

    function getNameById(objects, idToFind) {
      
      // Iterate through the objects
      for (const obj of objects) {
        // Check if the object has an "id" key and if its value matches the idToFind
        if (obj.hasOwnProperty('id') && obj.id === idToFind) {
          // Return the "name" value associated with the matching ID
          return obj.name;
        }
      }
      
      // If no match is found, return null or an appropriate value
      return null; // You can also return a custom message or handle the case differently
    }

  return (
    <div className='point-row-container' onClick={() => setExpand(!expand)}>
      <div className='point-row'>
        <div className='point-item'>{dayjs(donation.timestamp).format("MMMM D [at] h:mm A")}</div>
        <div className='point-item'>{donation.donations}</div>
        <div className='point-item'>{donation.grade}</div>
        <div className='point-item'>{getNameById(students, donation.student)}</div>
        <div className='point-item'><button onClick={deleteDonation}className='btn' style={{ backgroundColor: "red" }}>Delete {capitalizeFirstLetter(settings.donationType)}</button></div>
      </div>

        {expand &&
          <div className='point-row-expand'>
            <div>Added By {donation.addedBy}</div>
          </div>
        }
    </div>
    
  )
}

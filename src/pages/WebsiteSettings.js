import React, { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { updateDoc, doc } from "@firebase/firestore"
import { db } from '../firebase'

export const WebsiteSettings = () => {

    const { settings } = useContext(DataContext)

    const [newDonationType, setNewDonationType] = useState(settings.donationType)
    const [saveDisabled, setSaveDisabled] = useState(true)

    const handleSaveClick = async () => {
      await updateDoc(doc(db, 'settings', "settings"), {
        donationType: newDonationType.toLowerCase()
      });
    };

    useEffect(() => {
      setSaveDisabled((newDonationType.toLowerCase() === settings.donationType))
    }, [newDonationType, settings])

  return (
    <div className='website-settings'>
      <label>Donation Type (Plural) e.g. coats, shoeboxes, cans</label>
      <input placeholder="Event" type="text" value={newDonationType} onChange={e => setNewDonationType(e.target.value)} />
      <button className="btn" onClick={handleSaveClick} disabled={saveDisabled}>Save</button>
    </div>
  )
}

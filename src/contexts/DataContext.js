import React, { createContext, useState, useEffect } from "react";
import { collection, query, onSnapshot, getDocs } from "@firebase/firestore";
import { db } from "../firebase";

export const DataContext = createContext(null);

export const DataContextWrapper = props => {

    const [donations, setDonations] = useState([])
    const [students, setStudents] = useState([])
    const [settings, setSettings] = useState("")

    const fetchStudents = async () => {
        const q = query(collection(db, "students"));
        const querySnapshot = await getDocs(q);
        const dbStudents = [];
        querySnapshot.forEach((doc) => {
          dbStudents.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setStudents(dbStudents);
      };

      const fetchSettings = async () => {
        const q = query(collection(db, "settings"));
        onSnapshot(q, (querySnapshot) => {
          const dbSettings = []
          querySnapshot.forEach((doc) => {
              const setting = {
                  id: doc.id,
                  ...doc.data()
              }
              dbSettings.push(setting);
          });
          setSettings(dbSettings[0]);
      });
      };

    useEffect(() => {
        

        const r = query(collection(db, "donationEntries"));
        onSnapshot(r, (querySnapshot) => {
            const dbDonations = []
            querySnapshot.forEach((doc) => {
                const donation = {
                    id: doc.id,
                    ...doc.data()
                }
                if (!Number.isInteger(donation.donations)) {
                    donation.donations = 1
                }
                dbDonations.push(donation);
            });
            setDonations(dbDonations);
        });

        const unsubscribe = onSnapshot(collection(db, "students"), () => {
          fetchStudents();
          fetchSettings();
        });

        
      
          // Cleanup subscription on unmount
          return () => unsubscribe();

    }, [])

  return (
    <DataContext.Provider value={{donations, students, settings}}>
        {props.children}
    </DataContext.Provider>
  )
}

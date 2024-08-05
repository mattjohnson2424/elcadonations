import React, { useState }from 'react'
import { httpsCallable } from "@firebase/functions"
import { functions } from "../firebase";

export const AddRoles = () => {

    const [email, setEmail] = useState("");

    const addAdmin = async () => {
        
            const addAdminRole = httpsCallable(functions, 'addAdminRole');
            const result = await addAdminRole({
                email: email,
            })
            if (result.data.error) {
                console.log(result.data.error)
            }
            console.log(result.data)
        
        
        
    }
  return (
    <>
        <input value={email} onChange={e => setEmail(e.target.value)}/>
        <button onClick={addAdmin}>Add Admin</button>
    </>
  )
}

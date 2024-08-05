import React, { useContext, useEffect, useState } from 'react'
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";
import "./ManageStudents.css"
import StudentRow from '../components/StudentRow';
import { DataContext } from '../contexts/DataContext';

export const ManageStudents = () => {

    const [gradeFilter, setGradeFilter] = useState("")
    const [nameFilter, setNameFilter] = useState("")
    const [middleHigh, setMiddleHigh] = useState("middle")
    const students = useContext(DataContext).students

    const [newName, setNewName] = useState("")
    const [newGrade, setNewGrade] = useState("laboriosi")

    const [addDisabled, setAddDisabled] = useState(true)

    useEffect(() => {
        setAddDisabled(newName === "")
    }, [newName])

    const addNewStudent = async e => {
        e.preventDefault()
        await addDoc(collection(db, 'students'), {
            name: newName,
            grade: newGrade,
        });

        setNewName("")

    }

    useEffect(() => {
        if (middleHigh === "middle") {
            setNewGrade("laboriosi")
        } else {
            setNewGrade("9")
        }
    }, [middleHigh])

  return (
    
    <div className='manage-student-container'>
        <div className='inside-container'>
            <h2 style={{ textAlign: "center" }}>New Student</h2>
            <form className='add-new-student'>
                <input placeholder="Name" type="text" value={newName} onChange={e => setNewName(e.target.value)} />
                <select value={middleHigh} onChange={e => setMiddleHigh(e.target.value)}>
                    <option value="middle">Middle School</option>
                    <option value="high">High School</option>
                </select>
                <select value={newGrade} onChange={e => setNewGrade(e.target.value)}>
                    {middleHigh === "middle" ? 

                        <>
                            <option value="laboriosi">Laboriosi</option>
                            <option value="integritas">Integritas</option>
                            <option value="officium">Officium</option>
                            <option value="respectus">Respectus</option>
                        </>

                    :
                        <>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </>
                    }
                    
                    
                </select>
                <input type="submit" className="success btn" disabled={addDisabled} onClick={addNewStudent}/>
            
            </form>
            <h2 style={{ textAlign: "center" }}>Filter Students</h2>
            <div className='filters'> 
                <input placeholder="Filter Name" type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
                <select value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}>
                    <option value="">All Grades</option>
                    <option value="laboriosi">Laboriosi</option>
                    <option value="integritas">Integritas</option>
                    <option value="officium">Officium</option>
                    <option value="respectus">Respectus</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div className='edit-student-box'>
                <h2 style={{ textAlign: "center" }}>Student List</h2>
                {students.filter(student => {
                    if (gradeFilter === "") return true
                    return student.grade === gradeFilter
                }).filter(student => {
                    return (student.name).toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter === ""
                }).sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                }).sort((a,b) => {
                    return a.grade - b.grade
                }).map(student => (
                    <StudentRow student={student} key={student.id}/>
                ))}
            </div>
        </div>
    </div>
    
  )
}

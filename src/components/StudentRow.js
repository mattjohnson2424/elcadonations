import React, { useEffect, useState } from 'react';
import { doc, updateDoc, deleteDoc } from "@firebase/firestore"
import { db } from "../firebase"

function StudentRow({ student }) {
  
  const [name, setName] = useState(student.name);
  const [grade, setGrade] = useState(student.grade);
  const [saveDisabled, setSaveDisabled] = useState(true)

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleGradeChange = event => {
    setGrade(event.target.value);
  };

  const handleSaveClick = async () => {
    await updateDoc(doc(db, 'students', student.id), {
      name: name,
      grade: grade,
    });
  };

  const onDelete = async () => {
    await deleteDoc(doc(db, 'students', student.id));
  }

  useEffect(() => {
    setSaveDisabled((name === student.name && grade === student.grade))
  }, [name, grade, student.name, student.grade])

  return (
    <div className='student-row'>
      <input placeholder="Name" type="text" value={name} onChange={handleNameChange} />
      <select value={grade} onChange={handleGradeChange}>
          <option value="laboriosi">Laboriosi</option>
          <option value="integritas">Integritas</option>
          <option value="officium">Officium</option>
          <option value="respectus">Respectus</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
      </select>
      <button className="btn" onClick={handleSaveClick} disabled={saveDisabled}>Save</button>
      <button className='btn' style={{ backgroundColor: "red" }} onClick={onDelete}>Delete</button>
    </div>
  );
}

export default StudentRow;

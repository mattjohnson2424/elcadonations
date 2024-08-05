import React, { useState, useContext, useEffect } from "react";
import { collection, addDoc } from "@firebase/firestore";
import UserContext from "../contexts/UserContext"
import { db } from "../firebase";
import "./AddDonation.css";
import { DataContext } from "../contexts/DataContext";
import { capitalizeFirstLetter } from "../helpers/Helpers";

export default function AddDonation() {
  const [grade, setGrade] = useState("laboriosi");
  const [student, setStudent] = useState("");
  const [donations, setDonations] = useState(1);
  const [disabled, setDisabled] = useState(true)

  const { settings } = useContext(DataContext)

  const user = useContext(UserContext);
  
  const studentList = useContext(DataContext).students

  const onSubmit = async () => {
    let email;
    if (user) {
      email = user.email;
    } else {
      email = "";
    }

    await addDoc(collection(db, "donationEntries"), {
      grade: grade,
      student: student,
      donations: parseInt(donations),
      timestamp: Date.now(),
      addedBy: email,
    });

    setStudent("");
    setGrade("laboriosi");
    
    setDonations(1);

  };

  const onDonationsChange = e => {
    if (e.target.value < 0) {
      setDonations(0);
    } else {
      setDonations(e.target.value);
    }
  }

  const onStudentChange = e => {
    setStudent(e.target.value)
  }

  useEffect(() => {
    if (student === "") {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [student])

  return (
      
      <div class="wrapper-box">
        <div className="inside-wrapper">
                  <div className="inputContainer">
                    <label htmlFor="grade" className="textColor nameInput">Grade: </label>
                    <select value={grade} onChange={e => setGrade(e.target.value)}>
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
          
          

          
                  <select
                    id="name"
                    className="nameInput js-example-responsive"
                    style={{ width: "100%" }}
                    value={student}
                    onChange={onStudentChange}
                  >
                    
                    <option value="">Select a student...</option>
                    {studentList ? (
                      studentList
                        .filter((student) => {
                          return student.grade === grade;
                        })
                        .sort((studentA, studentB) => {
                          if (studentA.grade !== studentB.grade) {
                            return studentA.grade - studentB.grade;
                          }
                          return studentA.name.localeCompare(studentB.name);
                        })
                        .map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))
                    ) : (
                      <option value="">Loading...</option>
                    )}
                  </select>

            
      
      






          
              <div class="input-container">
                <label for="boxes" class="textColor">
                  Amount of {capitalizeFirstLetter(settings.donationType)}
                </label>
                <input value={donations}
                  onChange={onDonationsChange} type="number" id="boxes"/>
              </div>


          <div className="add-points-submit">
            <button onClick={onSubmit} className="btn" disabled={disabled}>Submit</button>
          </div>


          </div>
        </div>

        
      

      


      
  );
}

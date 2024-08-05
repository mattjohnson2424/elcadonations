import React, { useContext, useEffect, useState } from 'react'
import { capitalizeFirstLetter, processDonationsAndStudents } from '../helpers/Helpers';
import "./GradeInfo.css"
import { DataContext } from '../contexts/DataContext';

export default function TeamInfo() {

  const queryParameters = new URLSearchParams(window.location.search)
  const grade = queryParameters.get("grade")

  const { students, donations, settings } = useContext(DataContext)
  const [studentDonations, setStudentDonations] = useState([]);

  useEffect(() => {
    const calculatedDonations = processDonationsAndStudents(donations, students)
    setStudentDonations(calculatedDonations)
  }, [donations, students])

  return (

    <div class="page-content">
      <div className="inside-page-content">
        {/* <div class="header-image">
          <img src={logos[house]} alt="crest"/>
        </div> */}
        <h1>{grade.length > 2 ? `${grade.charAt(0).toUpperCase() + grade.slice(1)}` :  `${grade}th Grade`} Leaderboard</h1>
          <div class="team-info-name-list">
            {studentDonations
              .filter(student => {
                return student.grade === grade
              })
              .sort((a, b) => b.donations - a.donations)
              .map((student, index) => (
                <div key={student.id} className='student-rank-row'>{student.name} - {student.donations} {capitalizeFirstLetter(settings.donationType)}</div>
              ))}
          </div>
      </div>
        

    </div>
  )
}

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findLargestNumber, processDonationsAndStudents } from "../helpers/Helpers";
import "./Home.css";
import { DataContext } from "../contexts/DataContext";
// import {logos} from "../media"

const housesAndGrades = ["laboriosi", "integritas", "officium", "respectus", "9", "10", "11", "12"]

const houses = ["laboriosi", "integritas", "officium", "respectus"]
const grades = ["9", "10", "11", "12"]

export const Home = ({ showNav }) => {

  const { students, donations, settings } = useContext(DataContext)

  const [totalDonations, setTotalDonations] = useState({})
  const [leaders, setLeaders] = useState({})
  const [middleLead, setMiddleLead] = useState(0)
  const [highLead, setHighLead] = useState(0)

  const [displayHouses, setDisplayHouses] = useState(true);

  function keepFirstThreeElements(array) {
    if (array.length <= 3) {
      return array; // Return the original array as is
    } else {
      return array.slice(0, 3); // Keep the first 3 elements
    }
  }

  useEffect(() => {
    const totalAllDonations = () => {
      
        const gradeTotals = {}
        const middleTotals = {}
        const highTotals = {}

        housesAndGrades.forEach(grade => {
          gradeTotals[`grade${grade}`] = 0
        }) 
        houses.forEach(grade => {
          middleTotals[`grade${grade}`] = 0
        }) 
        grades.forEach(grade => {
          highTotals[`grade${grade}`] = 0
        }) 

        donations.forEach(donation => {
          gradeTotals[`grade${donation.grade}`] += donation.donations
          if (middleTotals.hasOwnProperty(`grade${donation.grade}`)) {
            
            middleTotals[`grade${donation.grade}`] += donation.donations
          }
          if (highTotals.hasOwnProperty(`grade${donation.grade}`)) {
            highTotals[`grade${donation.grade}`] += donation.donations
          }
        });


        setMiddleLead(findLargestNumber(middleTotals))
        setHighLead(findLargestNumber(highTotals))


        setTotalDonations(gradeTotals)
      
    };

    totalAllDonations();
  }, [donations]);

  useEffect(() => {
    const calculatedDonations = processDonationsAndStudents(donations, students);

    const tempLeaders = {}

    housesAndGrades.forEach(grade => {
      tempLeaders[`grade${grade}`] = keepFirstThreeElements(calculatedDonations.filter(student => grade === student.grade).sort((a, b) => b.donations - a.donations))
    })

    setLeaders(tempLeaders)

  }, [donations, students]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayHouses((prev) => !prev); // Toggle the state between displaying houses and grades
    }, 9000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="home-page" style={{ paddingTop: `${showNav ? "50px" : "0px"}`}}>

      <div class="grid">

      {displayHouses ? (
          // Display houses
          <>
            
            {houses.map((house, index) => {
              console.log(leaders)
          return (
            <Link to={`/gradeinfo?grade=${house}`}>
              <div className={`square ${totalDonations[`grade${house}`] === middleLead && "lead-team"}`} id={house}>
                  <div className="square-link">
                      
                        <img src={`./${house}.webp`} alt={house}/>
                        
                      
                  </div>
                  <div class="name-list">
                      <p class={`point-count ${totalDonations[`grade${house}`] === middleLead && "lead-team"}`}>{totalDonations[`grade${house}`]} {settings.donationType}</p>
                      
                      <ul style={{ width: "100%"}}>
                        {leaders[`grade${house}`] ? (
                          leaders[`grade${house}`].map((student) => (
                            <li key={student.id}>
                              <p className={`main-page-txt front-page-leaders ${totalDonations[`grade${house}`] === middleLead && "lead-team"}`}>{student.name} - {student.donations} {settings.donationType}</p>
                            </li>
                          ))
                        ) : (
                          <div className="main-page-txt front-page-leaders">Leaders Loading...</div>
                        )}
                      </ul>
                  </div>
              </div>
            </Link>
          )
        })}
          </>
        ) : (
          // Display grades
          <>
            {grades.map((grade, index) => {
          return (
            <Link to={`/gradeinfo?grade=${grade}`}>
              <div className={`square ${totalDonations[`grade${grade}`] === highLead && "lead-team"}`} id={grade}>
                  <div className="square-link">
                      
                        <p className="large-number">{grade}th</p> 
                      
                  </div>
                  <div class="name-list">
                      <p class={`point-count ${totalDonations[`grade${grade}`] === highLead && "lead-team"}`}>{totalDonations[`grade${grade}`]} {settings.donationType}</p>
                      
                      <ul style={{ width: "100%"}}>
                        {leaders[`grade${grade}`] ? (
                          leaders[`grade${grade}`].map((student) => (
                            <li key={student.id}>
                              <p className={`main-page-txt front-page-leaders ${totalDonations[`grade${grade}`] === highLead && "lead-team"}`}>{student.name} - {student.donations} {settings.donationType}</p>
                            </li>
                          ))
                        ) : (
                          <div className="main-page-txt front-page-leaders">Leaders Loading...</div>
                        )}
                      </ul>
                  </div>
              </div>
            </Link>
          )
        })}
          </>
        )}

        
        
        
        
        
        
      </div>     
    </div>
  );
};

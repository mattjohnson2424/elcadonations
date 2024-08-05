import React, { useContext, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../helpers/Helpers";
import "./Home.css";
import { DataContext } from "../contexts/DataContext";
import "./Results.css"
import Confetti from "../components/Confetti";

const housesAndGrades = ["laboriosi", "integritas", "officium", "respectus", "9", "10", "11", "12"]

const houses = ["laboriosi", "integritas", "officium", "respectus"]
const grades = ["9", "10", "11", "12"]

export const Results = () => {

  const { donations, settings } = useContext(DataContext)

  const [totalDonations, setTotalDonations] = useState({})
  const [finalNum, setFinalNum] = useState(0)


    useEffect(() => {
        const totalAllDonations = () => {
          
            const gradeTotals = {}
            let tempFinalNum = 0;
    
            housesAndGrades.forEach(grade => {
              gradeTotals[`grade${grade}`] = 0
            }) 
    
            donations.forEach(donation => {
              gradeTotals[`grade${donation.grade}`] += donation.donations
                tempFinalNum += donation.donations
            });
    
            setTotalDonations(gradeTotals)
            setFinalNum(tempFinalNum)

          
        };
    
        totalAllDonations();
      }, [donations]);

      console.log(totalDonations)

  return (
    <div>
        <div className="final-num">In total, middle and high school collected {finalNum} {settings.donationType}!</div>
        <div className="row">
            <div className="section-container">
                <h2>Middle School</h2>
                {houses.sort((a,b) => totalDonations[`grade${b}`] - totalDonations[`grade${a}`]).map(house => {
                    return (
                        <div>
                            {capitalizeFirstLetter(house)} - {totalDonations[`grade${house}`]}
                        </div>
                    )
                })}
            </div>
            <div className="section-container">
                <h2>High School</h2>
                {grades.sort((a,b) => totalDonations[`grade${b}`] - totalDonations[`grade${a}`]).map(grade => {
                    return (
                        <div>
                            {grade}th Grade - {totalDonations[`grade${grade}`]}
                        </div>
                    )
                })}
            </div>
        </div>
        <Confetti/>
    </div>
  )
}

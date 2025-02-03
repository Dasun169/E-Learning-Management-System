import React from 'react'
import "./css files/result_body.css";

function ResultBody() {
  return (
    <div className="inside">
        <div className="inside-inside">
            <div className="container">
                <div className="sidebar">
                    <a href="#">Registration - Year 1</a>
                    <a href="#">Registration - Year 2</a>
                    <a href="#">Registration - Year 3</a>
                    <a href="#">Registration - Year 4</a>
                    <a href="#">Exam Admission</a>
                    <a href="#">Registration - Repeat</a>
                </div>

                <div className="main-content">
                    <h2>First Year Registration</h2>

                    
                </div>

                <div className="student-info">
                    <p><strong>Student Name with Initial:</strong> Mr S.T.D. MADHUKSHA</p>
                    <p><strong>Student Full Name:</strong> Mr SOYSA THIRIMANNA DILSHAN MADHUKSHA</p>
                    <p><strong>Student University ID No:</strong> PS/2020/020</p>
                    <p><strong>Relevant Student Handbook - Academic Year:</strong> 2020/2021</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResultBody;

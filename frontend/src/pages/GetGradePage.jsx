import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function GetGradePage({ error, loading, onSubmit }) {

  const [grades, setGrades] = useState([]);
  const [studentNumber, setStudentNumber] = useState();

  const handleStundentNumber = (event) => {
    setStudentNumber(event.target.value);
  }


  useEffect(() => {
    axios.get(`http://localhost:8000/getgrades/${studentNumber}`).then((response) => {

      console.log(response.data)
      setGrades(response.data);
      

    }).catch((error) => {
      console.log(error);
    })
  }, [studentNumber]
  )


  return (
    <section className="form-card">
      <h2>Find Grades</h2>
      <p>Lookup student history using the backend endpoint <code>/getGrade</code>.</p>
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Student number
          <input
            type="text"
            value={studentNumber}
            onChange={handleStundentNumber}
            placeholder="1 - 5"
            maxLength={1}
          />
        </label>
        
      </form>

      {error && <div className="message error">{error}</div>}
      {loading && <p>Loading grades...</p>}

      {grades.length > 0 && (
        <div className="result-panel">
          <h1>Grades</h1>
          <h3>Student ID: {grades.at(1).id} <br/>
          Student Name: {grades.at(1).name}</h3>
          
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={index}>
                  <td>{grade["course code"]}</td>
                  <td>{grade.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {grades.length === 0 && !loading && !error && <p>No grades to show yet.</p>}
    
    </section>
  )
}

export default GetGradePage

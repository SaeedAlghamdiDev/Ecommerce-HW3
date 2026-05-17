import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function GetGradePage({ studentNumber, onStudentNumberChange, grades, error, loading, onSubmit }) {

  const [gradess, setGrades] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:8000/getgrades").then((response) => {

      setGrades(response.data);
      console.log(response.data);

    }).catch((error) => {
      console.log(error);
    })
  }, []
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
            onChange={(event) => onStudentNumberChange(event.target.value)}
            placeholder="1 - 5"
            maxLength={1}
          />
        </label>
        <button type="submit">Get Grades</button>
      </form>

      {error && <div className="message error">{error}</div>}
      {loading && <p>Loading grades...</p>}

      {grades.length > 0 && (
        <div className="result-panel">
          <h3>Student {studentNumber} Grades</h3>
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
                  <td>{grade.course}</td>
                  <td>{grade.mark}</td>
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

import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="welcome-card">
      <h2>Admin Master Page</h2>
      <p>Use the links to manage the student grade system.</p>
      <div className="card-grid">
        <article className="card">
          <h3>Find Student Grades</h3>
          <p>Enter a student number (1-5) to retrieve previous course grades from the backend.</p>
          <Link to="/getGrade" className="card-link">
            Go to Find Grades
          </Link>
        </article>
        <article className="card">
          <h3>Add New Grade</h3>
          <p>Submit a new student grade record using the add grade form.</p>
          <Link to="/addGrade" className="card-link">
            Go to Add Grade
          </Link>
        </article>
      </div>
    </section>
  )
}

export default HomePage

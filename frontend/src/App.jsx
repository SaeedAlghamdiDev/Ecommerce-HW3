import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import GetGradePage from './pages/GetGradePage.jsx'
import AddGradePage from './pages/AddGradePage.jsx'
import './App.css'

function App() {
  const [studentNumber, setStudentNumber] = useState('')
  const [grades, setGrades] = useState([])
  const [lookupError, setLookupError] = useState('')
  const [formData, setFormData] = useState({ studentNumber: '', course: '', mark: '' })
  const [formMessage, setFormMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLookupSubmit = async (event) => {
    event.preventDefault()
    setLookupError('')
    setGrades([])

    const id = studentNumber.trim()
    if (!['1', '2', '3', '4', '5'].includes(id)) {
      setLookupError('Please enter a student number between 1 and 5.')
      return
    }

    setLoading(true)
    const response = await fetch('/getGrade?studentNumber=' + id)
    if (!response.ok) {
      setLookupError('Could not load grades.')
    } else {
      const data = await response.json()
      setGrades(data.grades || [])
    }
    setLoading(false)
  }

  const handleAddGradeSubmit = async (event) => {
    event.preventDefault()
    setFormMessage('')

    const id = formData.studentNumber.trim()
    const course = formData.course.trim()
    const mark = formData.mark

    if (!['1', '2', '3', '4', '5'].includes(id)) {
      setFormMessage('Student number must be 1, 2, 3, 4, or 5.')
      return
    }
    if (!course) {
      setFormMessage('Please enter a course name.')
      return
    }
    if (!mark) {
      setFormMessage('Please select a grade.')
      return
    }

    setLoading(true)
    const response = await fetch('/addGrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentNumber: id, course, mark }),
    })

    if (response.ok) {
      setFormMessage('Grade added successfully.')
      setFormData({ studentNumber: '', course: '', mark: '' })
    } else {
      setFormMessage('Could not save the grade.')
    }
    setLoading(false)
  }

  const handleFormChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Student Grade Admin</h1>
          <p>Use the links below to view or add student grade data.</p>
        </div>
        <Navbar />
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/getGrade"
            element={
              <GetGradePage
                studentNumber={studentNumber}
                onStudentNumberChange={setStudentNumber}
                grades={grades}
                error={lookupError}
                loading={loading}
                onSubmit={handleLookupSubmit}
              />
            }
          />
          <Route
            path="/addGrade"
            element={
              <AddGradePage
                addData={formData}
                onInputChange={handleFormChange}
                onSubmit={handleAddGradeSubmit}
                loading={loading}
                message={formMessage}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App

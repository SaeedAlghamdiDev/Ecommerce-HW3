import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="page-nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
        Master Page
      </NavLink>
      <NavLink to="/getGrade" className={({ isActive }) => (isActive ? 'active' : '')}>
        Find Grades
      </NavLink>
      <NavLink to="/addGrade" className={({ isActive }) => (isActive ? 'active' : '')}>
        Add Grade
      </NavLink>
    </nav>
  )
}

export default Navbar

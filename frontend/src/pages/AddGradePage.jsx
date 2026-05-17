function AddGradePage({ addData, onInputChange, onSubmit, loading, message }) {
  return (
    <section className="form-card">
      <h2>Add Grade</h2>
      <p>Submit new grade data to the backend endpoint <code>/addGrade</code>.</p>
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Student number
          <input
            type="text"
            value={addData.studentNumber}
            onChange={(event) => onInputChange('studentNumber', event.target.value)}
            placeholder="1 - 5"
            maxLength={1}
          />
        </label>
        <label>
          Course name

          <select value={addData.course}
            onChange={(event) => onInputChange('course', event.target.value)}
          >
            <option value="" disabled hidden>
              Select course
            </option>
            <option value="CS 101">CS 101</option>
            <option value="ENG 101">ENG 101</option>
            <option value="MATH 202">MATH 202</option>
            <option value="PHIL 101">PHIL 101</option>
          </select>

        </label>


        <label>
          Grade
          <select
            value={addData.mark}
            onChange={(event) => onInputChange('mark', event.target.value)}
          >
            <option value="" disabled hidden>
              Select grade
            </option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Grade'}</button>
      </form>

      {message && <div className="message info">{message}</div>}
    </section>
  )
}

export default AddGradePage

import axios from "axios";
import { useEffect, useState } from "react";

function AddGradePage() {
  const [localAddData, setLocalAddData] = useState({
    studentNumber: '',
    course: '',
    mark: ''
  });
  const [localMessage, setLocalMessage] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setLocalAddData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!localAddData.studentNumber || !localAddData.course || !localAddData.mark) {
      setLocalMessage('Please fill in all fields');
      return;
    }

    setLocalLoading(true);
    setLocalMessage('');

    try {
      const response = await axios.post('http://localhost:8000/addgrade', {
        studentNumber: localAddData.studentNumber,
        courseCode: localAddData.course,
        grade: localAddData.mark
      });

      setLocalMessage(
        localAddData.mark === 'DELETE' 
          ? `Grade for ${localAddData.course} deleted successfully!`
          : `Grade for ${localAddData.course} updated to ${localAddData.mark}!`
      );
    } catch (error) {
      console.error(error);
      setLocalMessage(error.response?.data?.error || 'Error updating grade. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <section className="form-card">
      <h2>Add or Update Grade</h2>
      <p>Update or delete a student's grade using the backend endpoint <code>/addgrade</code>.</p>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Student number
          <input
            type="text"
            value={localAddData.studentNumber}
            onChange={(event) => handleInputChange('studentNumber', event.target.value)}
            placeholder="1 - 5"
            maxLength={1}
          />
        </label>
        <label>
          Course name
          <select 
            value={localAddData.course}
            onChange={(event) => handleInputChange('course', event.target.value)}
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
            value={localAddData.mark}
            onChange={(event) => handleInputChange('mark', event.target.value)}
          >
            <option value="" disabled hidden>
              Select grade
            </option>
            <option value="DELETE" style={{ color: 'red' }}>Delete Grade</option>
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
        <button type="submit" disabled={localLoading}>
          {localLoading ? 'Saving...' : 'Update Grade'}
        </button>
      </form>

      {localMessage && (
        <div className={`message ${localMessage.includes('Error') || localMessage.includes('deleted') ? 'error' : 'info'}`}>
          {localMessage}
        </div>
      )}
    </section>
  )
}

export default AddGradePage

import React from 'react'
import './ErrorBox.css'

class ErrorBox extends React.Component {
  render() {
    return (
      <div className="errors-box">
        <ul>
        {
          this.props.errors.map(error => {
            return (
              <li key={error}>
                {error}
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

export default ErrorBox
import React from 'react'
import './Results.css'

class Results extends React.Component {

  componentWillMount() {
    this.fetch(this.props.match.params.id)
  }

  fetch(id) {
    console.log('Fetching results for:', id)
  }

  render() {
    return (
      <div>
        <div className="results-title">
          Results
        </div>
      </div>
    )
  }
}

export default Results
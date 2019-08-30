import React from 'react'
import './PollCreate.css'

class PollCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="poll-create-form">
        <p>{this.state.question}</p>
        <input
          className="question"
          name="question"
          value={this.state.question}
          placeholder="What do you want to find out?"
          onChange={this.handleInputChange}
        />
        <div className="answers">
          <input name="answer_1" placeholder="Answer" onChange={this.handleInputChange} />
        </div>
      </div>
    )
  }
}

export default PollCreate
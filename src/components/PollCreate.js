import React from 'react'
import './PollCreate.css'

class PollCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answers: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target

    if(target.name.startsWith('answer_')) {
      const idx = parseInt(target.name.replace('answer_', ''))
      if(target.value === '' && this.state.answers[idx] !== undefined) {
        const arr = this.state.answers;
        arr.splice(idx, 1)
        this.setState({
          answers: arr
        })
      } else {
        const arr = this.state.answers
        arr[idx] = target.value
        this.setState({
          answers: arr
        })
      }
    } else {
      this.setState({
        [target.name]: target.value
      })
    }
  }

  render() {
    const answersInputs = []
    for(let i = 0; i < this.state.answers.length+1; i++) {
      answersInputs.push(
        <input
          type="text"
          key={i}
          name={'answer_' + i}
          placeholder="Answer"
          value={this.state.answers[i] !== undefined ? this.state.answers[i] : ''}
          onChange={this.handleInputChange}
        />
      )
    }
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
          {answersInputs}
        </div>
        <button className="create-poll-button">Create</button>
      </div>
    )
  }
}

export default PollCreate
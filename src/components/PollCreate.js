import React from 'react'
import './PollCreate.css'
import ErrorBox from './ErrorBox'
import PollService from '../services/PollService'
import { Redirect } from 'react-router-dom'

class PollCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answers: [],
      errors: [],
      redirectToPoll: 0
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.createPollClick = this.createPollClick.bind(this)
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

  validate() {
    this.setState({
      errors: []
    })
    const errors = []
    if (this.state.answers.length < 2) {
      errors.push('Poll must have at least 2 answers.')
    }
    if (this.state.question.length < 1) {
      errors.push('Poll must have a question.')
    }
    this.setState({
      errors
    })
    return !(errors.length > 0)
  }

  createPollClick() {
    // Validate
    if(this.validate()) {
      PollService.create({
        question: this.state.question,
        options: this.state.answers
      }).then(result => {
        const data = result.data
        if(data.success) {
          this.setState({
            redirectToPoll: data.id
          })
        }
      })
    }
  }

  render() {
    if(this.state.redirectToPoll > 0) return <Redirect to={'/' + this.state.redirectToPoll} />
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
        {this.state.errors.length > 0 && <ErrorBox errors={this.state.errors} />}
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
        <button className="create-poll-button" onClick={this.createPollClick}>Create</button>
      </div>
    )
  }
}

export default PollCreate
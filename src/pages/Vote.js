import React from 'react'
import { Redirect } from 'react-router-dom'

import './Vote.css'

import PollService from '../services/PollService'
import VoteOptionGroup from '../components/VoteOptionGroup'

class Vote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: {},
      selectedAnswer: 0,
      redirectToResults: false
    }
    this.onOptionSelect = this.onOptionSelect.bind(this)
    this.castVote = this.castVote.bind(this)
  }

  componentWillMount() {
    this.fetch(this.props.match.params.id)
  }

  fetch(id) {
    PollService.get(id).then(response => {
      const data = response.data
      if(data.success) {
        this.setState({
          poll: data.poll
        })
      } else {
        console.log('Error')
      }
    })
  }

  onOptionSelect(id) {
    console.log('Selected:', id)
    this.setState({
      selectedAnswer: id
    })
  }

  castVote() {
    console.log('Cast vote to option:', this.state.selectedAnswer)
    PollService.vote(this.state.selectedAnswer).then(response => {
      const data = response.data
      if(data.success) {
        this.setState({
          redirectToResults: true
        })
      }
    })
  }

  render() {
    if(this.state.redirectToResults) return <Redirect to={'/' + this.props.match.params.id + '/r'} />
    return (
      <div>
        <div className="vote-question">{this.state.poll.question}</div>
        {
          this.state.poll.options && (<VoteOptionGroup options={this.state.poll.options} onselect={this.onOptionSelect} />)
        }
        <button className="poll-button" onClick={this.castVote}>Vote</button>
      </div>
    )
  }
}

export default Vote
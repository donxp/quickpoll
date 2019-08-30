import React from 'react'
import axios from 'axios'
import PollService from '../services/PollService'

class Vote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: {}
    }
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

  render() {
    return (
      <div>
        {this.state.poll.question}
        {
          this.state.poll.options &&
          this.state.poll.options.map(o => {
            return (
              <p key={o.id}>{o.option}</p>
            )
          })
        }
      </div>
    )
  }
}

export default Vote
import React from 'react'
import './Results.css'
import PollService from '../services/PollService'
import PieChart from "react-minimal-pie-chart"
import { SocketConnect, SocketEvent } from 'react-socket-io-client'

class Results extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      votes: []
    }
  }

  componentWillMount() {
    this.fetch(this.props.match.params.id)
  }

  fetch(id) {
    console.log('Fetching results for:', id)
    PollService.getVotes(id).then(response => {
      const data = response.data
      if(data.success) {
        this.setState({
          votes: data.votes
        })
      }
    })
  }

  renderChart(votes) {
    const colors = [
      '#003f5c',
      '#444e86',
      '#955196',
      '#dd5182',
      '#ff6e54'
    ]
    const data = []
    for(let i = 0; i < votes.length; i++) {
      data.push({
        title: votes[i].option,
        value: votes[i].count,
        color: colors[i]
      })
    }
    return <PieChart data={data}/>
  }

  onNewVote(id) {
    const list = this.state.votes
    const idx = list.findIndex(p => p.answer_id === id)
    if (idx !== -1) {
      list[idx].count += 1
    }
    this.setState({
      votes: list
    })
  }

  render() {
    let totalVotes = 0
    for(let i = 0; i < this.state.votes.length; i++) {
      totalVotes += this.state.votes[i].count
    }
    return (
      <div>
        <div className="results-title">
          Results
        </div>
        <div className="results-group">
          {
            this.state.votes.map(p => {
              return (
                <div key={p.answer_id} className="result">
                  {p.option} - {p.count} ({Number(p.count / totalVotes).toFixed(2)}%)
                </div>
              )
            })
          }
        </div>
        <div className="results-chart">
          {this.renderChart(this.state.votes)}
        </div>
        <SocketConnect url={"http://localhost:3000/"} >
          <SocketEvent name={"vote"} callback={(args) => this.onNewVote(args) }/>
        </SocketConnect>
      </div>
    )
  }
}

export default Results
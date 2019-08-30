import React from 'react'

class Vote extends React.Component {
  render() {
    return (
      <p>Hey {this.props.match.params.id}</p>
    )
  }
}

export default Vote
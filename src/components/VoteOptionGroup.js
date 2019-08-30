import React from 'react'

import './VoteOptionGroup.css'

class VoteOptionGroup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      checkboxes: {}
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(id, e) {
    const checked = e.target.checked
    const checkboxes = this.state.checkboxes
    const keys = Object.keys(checkboxes)
    for(let i = 0; i < keys.length; i++) {
      checkboxes[keys[i]] = false
    }
    if(checked) checkboxes[id] = true
    this.props.onselect(checked ? id : 0)
    this.setState({
      checkboxes
    })
  }

  render() {
    return (
      <div className="vote-option-group">
        {
          this.props.options.map(o => {
            return (
              <div key={o.id} className="vote-option">
                <input id={'option_' + o.id} type="checkbox" checked={this.state.checkboxes[o.id] !== undefined ? this.state.checkboxes[o.id] : false} onChange={(e) => this.onChange(o.id, e)}/>
                <label htmlFor={'option_' + o.id}>{o.option}</label>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default VoteOptionGroup
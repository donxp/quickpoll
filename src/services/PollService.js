import axios from 'axios'

const root = 'http://localhost:3000/api/poll/'

class PollService {
  static get(id) {
    return axios.get(root + id)
  }

  static create(poll) {
    return axios.post(root + 'create', {
      question: poll.question,
      answers: poll.options
    })
  }

  static vote(answer_id) {
    return axios.post(root + 'vote', {
      answer_id
    })
  }
}

export default PollService
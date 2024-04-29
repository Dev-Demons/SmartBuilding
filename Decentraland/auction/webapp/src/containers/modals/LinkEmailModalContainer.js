import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { selectors } from '../../reducers'
import { subscribeEmail } from '../../actions'

import { stateData } from '../../lib/propTypes'

import { LinkEmailModal } from '../../components/modals'

class LinkEmailModalContainer extends React.Component {
  static propTypes = {
    email: stateData(PropTypes.bool),
    subscribeEmail: PropTypes.func
    // Here we should extend ...ModalContainer.propTypes but webpack is broken and doesn't understand the import
    // Try it yourself: import ModalContainer from "./ModalContainer"
  }

  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value })
  }

  onSign = () => {
    this.props.subscribeEmail(this.state.email)
  }

  render() {
    return (
      <LinkEmailModal
        {...this.props}
        currentEmail={this.props.email}
        email={this.state.email}
        onEmailChange={this.onEmailChange}
        onSign={this.onSign}
      />
    )
  }
}

export default connect(
  state => ({
    email: selectors.getEmail(state)
  }),
  { subscribeEmail }
)(LinkEmailModalContainer)

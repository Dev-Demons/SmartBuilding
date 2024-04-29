import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { selectors } from '../reducers'
import { fetchAddressStats, navigateTo } from '../actions'
import locations from '../locations'

import { stateData } from '../lib/propTypes'

import AddressStats from '../components/AddressStats'

class AddressStatsContainer extends React.Component {
  static propTypes = {
    address: PropTypes.string,
    addressStats: stateData(PropTypes.object),
    fetchAddressStats: PropTypes.func,
    navigateTo: PropTypes.func
  }

  componentWillMount() {
    const { address, fetchAddressStats, navigateTo } = this.props

    if (address) {
      fetchAddressStats(address)
    } else {
      navigateTo(locations.addressStats)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.addressStats.error ||
      this.neverLockedMana(nextProps.addressStats)
    ) {
      this.props.navigateTo(locations.root)
    }
  }

  neverLockedMana(addressStats) {
    return (
      !addressStats.loading &&
      addressStats.data &&
      !addressStats.data.lockedMana
    )
  }

  render() {
    const { address, addressStats } = this.props
    return <AddressStats address={address} addressStats={addressStats} />
  }
}

export default connect(
  (state, ownProps) => ({
    addressStats: selectors.getAddressStats(state),
    address: ownProps.match.params.address
  }),
  { fetchAddressStats, navigateTo }
)(AddressStatsContainer)

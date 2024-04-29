import React from 'react'
import PropTypes from 'prop-types'

import { preventDefault } from '../../lib/util'
import { ONE_LAND_IN_MANA } from '../../lib/land'
import { stateData } from '../../lib/propTypes'
import { minimumBid } from '../../lib/parcelUtils'
import * as pendingBidsUtils from '../../lib/pendingBidsUtils'

import Modal from './Modal'
import Button from '../Button'
import Loading from '../Loading'

import './BidParcelModal.css'

export default class BidParcelModal extends React.Component {
  static propTypes = {
    ...Modal.propTypes,
    parcel: PropTypes.object.isRequired,
    addressState: stateData(PropTypes.object).isRequired,
    pendingConfirmationBids: stateData(PropTypes.array).isRequired,
    onBid: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    const { pendingConfirmationBids, parcel } = props

    this.state = {
      bidValue: parcel.yourBid || this.getMinimumBidValue()
    }

    // Cache for later use
    this.pendingManaBalance = pendingBidsUtils.getTotalManaBidded(
      pendingConfirmationBids.data
    )
  }

  onBid = event => {
    const { bidValue } = this.state
    const { onBid } = this.props

    if (this.isValidBid(bidValue)) {
      onBid(bidValue)
    }
  }

  onBidValueChange = event => {
    const bidValue = parseFloat(event.currentTarget.value, 10)
    this.setState({ bidValue: bidValue || '' })
  }

  onBidValueReset = event => {
    const maxBid = this.getManaBalance()
    const minBid = this.getMinimumBidValue()
    let value = this.state.bidValue

    if (value < minBid) {
      value = minBid
    } else if (value > maxBid) {
      value = maxBid
    }
    this.setState({ bidValue: value })
  }

  isValidBid(bidValue) {
    // We don't use `getCurrentBidValue` here because if the parcel doesn't have a bid yet,
    // we want to be able to bid ONE_LAND_IN_MANA
    const parcelAmount = this.props.parcel.amount || 0
    const manaBalance = this.getManaBalance()

    return (
      bidValue >= ONE_LAND_IN_MANA &&
      bidValue > parcelAmount &&
      bidValue <= manaBalance
    )
  }

  getManaBalance() {
    const { addressState } = this.props

    if (!addressState.loading) {
      return addressState.data.balance
    }
  }

  renderBidForm() {
    const { onClose } = this.props
    const manaBalance = this.getManaBalance()

    return manaBalance >= ONE_LAND_IN_MANA ? (
      <BidForm
        currentBidValue={this.state.bidValue}
        minBidValue={this.getMinimumBidValue()}
        manaBalance={manaBalance}
        onBid={preventDefault(this.onBid)}
        onBidValueChange={this.onBidValueChange}
        onBidValueReset={this.onBidValueReset}
      />
    ) : (
      <div>
        <p className="text">You don&#39;t have enough balance to bid.</p>
        <Button type="default" className="go-back" onClick={onClose}>
          Go back
        </Button>
      </div>
    )
  }

  getMinimumBidValue() {
    const { parcel } = this.props
    return minimumBid(parcel.amount)
  }

  render() {
    const { parcel, addressState, onClose, ...props } = this.props

    return (
      <Modal
        className="BidParcelModal"
        title={`Land ${parcel.x},${parcel.y}`}
        onClose={onClose}
        {...props}
      >
        <div className="modal-body">
          <p className="text">
            Enter an amount of {this.getMinimumBidValue()} MANA or more
            <br />
            to bid on{' '}
            <span className="parcel-coords">
              {parcel.x},{parcel.y}
            </span>
            <br />
            {this.pendingManaBalance
              ? `You have ${this.pendingManaBalance} MANA pending.`
              : ''}
          </p>

          {addressState.loading ? <Loading /> : this.renderBidForm()}
        </div>
      </Modal>
    )
  }
}

function BidForm({
  currentBidValue,
  minBidValue,
  manaBalance,
  onBid,
  onBidValueChange,
  onBidValueReset
}) {
  return (
    <form action="POST" onSubmit={onBid}>
      <div className="manaInput">
        <span className="text">{minBidValue}</span>
        <input
          type="number"
          required="required"
          placeholder="Mana to bid"
          className="manaToBid"
          autoFocus={true}
          min={minBidValue}
          value={currentBidValue}
          max={manaBalance}
          onChange={onBidValueChange}
          onFocus={e => e.target.select()}
          onBlur={onBidValueReset}
        />
        <span className="text">{manaBalance}</span>
      </div>

      <Button type="default" className="confirm-bids" isSubmit={true}>
        Bid
      </Button>
    </form>
  )
}

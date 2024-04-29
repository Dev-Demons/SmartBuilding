import { Emitter } from 'mitt'
import { VoiceHandler } from '../types'
import * as rfc4 from '@dcl/protocol/out-ts/decentraland/kernel/comms/rfc4/comms.gen'

export interface MinimumCommunicationsAdapter {
  /**
   * The .send method is used to send information to all the peers
   * connected to this adapter. The hints can be used to tweak the
   * default behavior of the adapter.
   */
  send(data: Uint8Array, hints: SendHints): void
  /**
   * The .connect() method resolves when the connection with the
   * adapter was successful and it is ready to send and receive
   * messages.
   */
  connect(): Promise<void>
  /**
   * The .disconnect() method can optionally receive an error that will
   * be bubbled up in the DISCONNECTED event. It should be used to
   * notify the user about possible network errors and to help with the
   * UX of the explorer.
   */
  disconnect(error?: Error): Promise<void>

  /**
   * Event emitter (mitt) with all the events produced by the adapter.
   */
  events: Emitter<CommsAdapterEvents>

  getVoiceHandler(onDataFrame: (frame: rfc4.Voice) => void): Promise<VoiceHandler>
}

export type CommsAdapterEvents = {
  DISCONNECTION: AdapterDisconnectedEvent
  PEER_DISCONNECTED: PeerDisconnectedEvent
  message: AdapterMessageEvent
  PEER_CONNECTED: PeerConnectedEvent
  PEER_LINKED: PeerLinkEvent
  PEER_UNLINKED: PeerLinkEvent
  error: Error
}

export type SendHints = { reliable: boolean }

// DISCONNECTION
export type AdapterDisconnectedEvent = {
  // Whether or no the reason of disconnection was that we logged in on
  // a different session
  kicked: boolean
  // Optional error
  error?: Error
}

// PEER_DISCONNECTED
export type PeerDisconnectedEvent = {
  // The ethereum address of the disconnected peer
  address: string
}

// PEER_LINKED PEER_UNLINKED
export type PeerLinkEvent = {
  peerA: string
  peerB: string
}

// PEER_CONNECTED
export type PeerConnectedEvent = {
  // The ethereum address of the connected peer
  address: string
}

// message
export type AdapterMessageEvent = {
  // The ethereum address of the sender
  address: string
  data: Uint8Array
}

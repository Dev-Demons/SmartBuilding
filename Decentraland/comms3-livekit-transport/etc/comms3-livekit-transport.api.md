## API Report File for "@dcl/comms3-livekit-transport"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { RemoteTrack } from 'livekit-client';
import { Room } from 'livekit-client';

// @public
export type Config = {
    url: string;
    token: string;
    logger?: ILogger;
    handleTrackSubscribed?: (track: RemoteTrack) => void;
    handleTrackUnsubscribed?: (track: RemoteTrack) => void;
    handleDataReceived?: (peerId: string, payload: Uint8Array) => void;
    handleDisconnected?: () => void;
};

// @public
export type ILogger = {
    error(message: string | Error, ...args: any[]): void;
    log(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    trace(message: string, ...args: any[]): void;
};

// @public
export class LivekitTransport {
    constructor(config: Config);
    // (undocumented)
    connect(): Promise<void>;
    // (undocumented)
    disconnect(): Promise<void>;
    // (undocumented)
    localName(): string;
    // (undocumented)
    publishReliableData(data: Uint8Array): Promise<void>;
    // (undocumented)
    publishUnreliableData(data: Uint8Array): Promise<void>;
    // (undocumented)
    room: Room;
    // (undocumented)
    setMicrophoneEnabled(enabled: boolean): Promise<void>;
}

// (No @packageDocumentation comment for this package)

```

import { Vector3 } from '@dcl/sdk/math'

export type TakeAndCompareSnapshotRequest = {
  // unique id, the path is getting as `user://snapshot_${id.replace(" ", "_")}.png`
  id: string
  // relative to base scene
  cameraPosition: Vector3
  // relative to base scene
  cameraTarget: Vector3
  // width x height snapshot size
  snapshotFrameSize: { x: number; y: number }
  // similarity comparison, from 0 to 1
  tolerance: number
}

export type TakeAndCompareSnapshotResponse = {
  // true if the threshold was met, false otherwise or if it wasn't previously exist
  isMatch: boolean
  // from 0 to 1 how similar the snapshot taken is to the previous one
  similarity: number
  // true if the snapshot already exists in the snapshot folder, false otherwise
  wasExist: boolean
  // true if the snapshot was created and saved, false otherwise
  replaced: boolean
}

export const defaultParams: TakeAndCompareSnapshotRequest = {
  id: 'test-snapshot',
  cameraPosition: Vector3.create(1, 1, 1),
  cameraTarget: Vector3.create(1, 1, 2),
  snapshotFrameSize: Vector3.create(1024, 1024),
  tolerance: 0.8
}

// way to use:
// import * as Testing from '~system/Testing'
// const result: TakeAndCompareSnapshotResponse = (Testing as any).takeAndCompareSnapshot(defaultParams)

import { EngineInfo, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import * as Testing from '~system/Testing'
import { assertEquals } from '../../testing/assert'
import { customAddEntity } from '../../utils/entity'
import { assertMovePlayerTo } from '../../utils/helpers'
import type {
  TakeAndCompareSnapshotRequest,
  TakeAndCompareSnapshotResponse
} from '../../utils/snapshot-test'
import { waitTicksUntil } from '../../utils/waiters'
import { test } from './../../testing'

test('mesh-renderer box: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  yield* assertMovePlayerTo(Vector3.create(2, 2, 2), Vector3.create(8, 1, 8))

  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  const params: TakeAndCompareSnapshotRequest = {
    id: 'mesh renderer box',
    cameraPosition: Vector3.create(2, 2, 2),
    cameraTarget: Vector3.create(8, 1, 8),
    snapshotFrameSize: Vector3.create(1024, 1024),
    tolerance: 0.8
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('mesh-renderer sphere: if exist a reference snapshot should match with it', function* (context) {
  customAddEntity.clean()
  const sphere = customAddEntity.addEntity()
  Transform.create(sphere, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(sphere, {
    mesh: {
      $case: 'sphere',
      sphere: { uvs: [] }
    }
  })

  const params: TakeAndCompareSnapshotRequest = {
    id: 'mesh renderer sphere',
    cameraPosition: Vector3.create(2, 2, 2),
    cameraTarget: Vector3.create(8, 1, 8),
    snapshotFrameSize: Vector3.create(1024, 1024),
    tolerance: 0.8
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('mesh-renderer cylinder: if exist a reference snapshot should match with it', function* (context) {
  customAddEntity.clean()
  const cylinder = customAddEntity.addEntity()
  Transform.create(cylinder, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cylinder, {
    mesh: {
      $case: 'cylinder',
      cylinder: { radiusBottom: 1, radiusTop: 0.5 }
    }
  })

  const params: TakeAndCompareSnapshotRequest = {
    id: 'mesh renderer cylinder',
    cameraPosition: Vector3.create(2, 2, 2),
    cameraTarget: Vector3.create(8, 1, 8),
    snapshotFrameSize: Vector3.create(1024, 1024),
    tolerance: 0.8
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('mesh-renderer plane: if exist a reference snapshot should match with it', function* (context) {
  customAddEntity.clean()
  const plane = customAddEntity.addEntity()
  Transform.create(plane, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(plane, {
    mesh: {
      $case: 'plane',
      plane: { uvs: [] }
    }
  })

  const params: TakeAndCompareSnapshotRequest = {
    id: 'mesh renderer plane',
    cameraPosition: Vector3.create(2, 2, 2),
    cameraTarget: Vector3.create(8, 1, 8),
    snapshotFrameSize: Vector3.create(1024, 1024),
    tolerance: 0.8
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

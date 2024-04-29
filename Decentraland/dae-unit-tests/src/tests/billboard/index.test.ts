import {
  Billboard,
  BillboardMode,
  CameraModeArea,
  MeshCollider,
  MeshRenderer,
  Raycast,
  RaycastQueryType,
  RaycastResult,
  Transform,
  engine
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { assertEquals } from '../../testing/assert'
import { test } from './../../testing'
import { customAddEntity } from './../../utils/entity'
import { assertMovePlayerTo } from './../../utils/helpers'
import { waitTicks } from './../../utils/waiters'

// BM_NONE = 0,
// BM_X = 1,
// BM_Y = 2,
// BM_Z = 4,
// BM_ALL = 7

const sceneCenter = Vector3.create(8, 1, 8)

test('billboard: mode BM_NONE', function* (context) {
  customAddEntity.clean()
  const cameraModeAreaE = engine.addEntity()
  Transform.create(cameraModeAreaE, { position: sceneCenter })
  CameraModeArea.create(cameraModeAreaE, {
    area: Vector3.create(16, 5, 16),
    mode: 0
  })
  const colliderToRaycast = customAddEntity.addEntity()
  Transform.create(colliderToRaycast, {
    parent: engine.PlayerEntity,
    position: Vector3.create(0, 1, 0.45),
    scale: Vector3.create(3, 3, 0.1)
  })
  MeshCollider.create(colliderToRaycast, {
    collisionMask: 5,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  const billboardEntity = customAddEntity.addEntity()
  Transform.create(billboardEntity, { position: sceneCenter })
  Billboard.create(billboardEntity, { billboardMode: BillboardMode.BM_NONE })
  MeshRenderer.create(billboardEntity, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  yield* assertMovePlayerTo(Vector3.create(4, 0, 4), sceneCenter)

  Raycast.create(billboardEntity, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Backward()
    },
    maxDistance: 30,
    queryType: RaycastQueryType.RQT_QUERY_ALL,
    continuous: false,
    collisionMask: 5
  })

  yield* waitTicks(3)

  const rayResult = RaycastResult.get(billboardEntity)

  assertEquals(
    rayResult.hits.length,
    0,
    'raycast from entity should not hit the collider '
  )
})

test('billboard: mode BM_X', function* (context) {
  customAddEntity.clean()
  const cameraModeAreaE = engine.addEntity()
  Transform.create(cameraModeAreaE, { position: sceneCenter })
  CameraModeArea.create(cameraModeAreaE, {
    area: Vector3.create(16, 5, 16),
    mode: 0
  })
  const colliderToRaycast = customAddEntity.addEntity()
  Transform.create(colliderToRaycast, {
    parent: engine.PlayerEntity,
    position: Vector3.create(0, 1, 0.45),
    scale: Vector3.create(3, 3, 0.1)
  })
  MeshCollider.create(colliderToRaycast, {
    collisionMask: 5,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  const billboardEntity = customAddEntity.addEntity()
  Transform.create(billboardEntity, { position: sceneCenter })
  Billboard.create(billboardEntity, { billboardMode: BillboardMode.BM_X })
  MeshRenderer.create(billboardEntity, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  yield* assertMovePlayerTo(Vector3.create(4, 0, 4), sceneCenter)

  Raycast.create(billboardEntity, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Backward()
    },
    maxDistance: 30,
    queryType: RaycastQueryType.RQT_QUERY_ALL,
    continuous: false,
    collisionMask: 5
  })

  yield* waitTicks(3)

  const rayResult = RaycastResult.get(billboardEntity)

  assertEquals(
    rayResult.hits.length,
    0,
    'raycast from entity should not hit the collider '
  )
})

test('billboard: mode BM_Y', function* (context) {
  customAddEntity.clean()
  const cameraModeAreaE = engine.addEntity()
  Transform.create(cameraModeAreaE, { position: sceneCenter })
  CameraModeArea.create(cameraModeAreaE, {
    area: Vector3.create(16, 5, 16),
    mode: 0
  })
  const colliderToRaycast = customAddEntity.addEntity()
  Transform.create(colliderToRaycast, {
    parent: engine.PlayerEntity,
    position: Vector3.create(0, 1, 0.45),
    scale: Vector3.create(3, 3, 0.1)
  })
  MeshCollider.create(colliderToRaycast, {
    collisionMask: 5,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  const billboardEntity = customAddEntity.addEntity()
  Transform.create(billboardEntity, { position: sceneCenter })
  Billboard.create(billboardEntity, { billboardMode: BillboardMode.BM_Y })
  MeshRenderer.create(billboardEntity, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  yield* assertMovePlayerTo(Vector3.create(4, 0, 4), sceneCenter)

  Raycast.create(billboardEntity, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Backward()
    },
    maxDistance: 30,
    queryType: RaycastQueryType.RQT_QUERY_ALL,
    continuous: false,
    collisionMask: 5
  })

  yield* waitTicks(3)

  const rayResult = RaycastResult.get(billboardEntity)

  assertEquals(
    rayResult.hits.length,
    1,
    'raycast from entity should hit the collider'
  )
})

test('billboard: mode BM_Z', function* (context) {
  customAddEntity.clean()
  const cameraModeAreaE = engine.addEntity()
  Transform.create(cameraModeAreaE, { position: sceneCenter })
  CameraModeArea.create(cameraModeAreaE, {
    area: Vector3.create(16, 5, 16),
    mode: 0
  })
  const colliderToRaycast = customAddEntity.addEntity()
  Transform.create(colliderToRaycast, {
    parent: engine.PlayerEntity,
    position: Vector3.create(0, 1, 0.45),
    scale: Vector3.create(3, 3, 0.1)
  })
  MeshCollider.create(colliderToRaycast, {
    collisionMask: 5,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  const billboardEntity = customAddEntity.addEntity()
  Transform.create(billboardEntity, { position: sceneCenter })
  Billboard.create(billboardEntity, { billboardMode: BillboardMode.BM_Z })
  MeshRenderer.create(billboardEntity, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  yield* assertMovePlayerTo(Vector3.create(4, 0, 4), sceneCenter)

  Raycast.create(billboardEntity, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Backward()
    },
    maxDistance: 30,
    queryType: RaycastQueryType.RQT_QUERY_ALL,
    continuous: false,
    collisionMask: 5
  })

  yield* waitTicks(3)

  const rayResult = RaycastResult.get(billboardEntity)

  assertEquals(
    rayResult.hits.length,
    0,
    'raycast from entity should not hit the collider '
  )
})

test('billboard: mode BM_ALL', function* (context) {
  customAddEntity.clean()
  const cameraModeAreaE = engine.addEntity()
  Transform.create(cameraModeAreaE, { position: sceneCenter })
  CameraModeArea.create(cameraModeAreaE, {
    area: Vector3.create(16, 5, 16),
    mode: 0
  })
  const colliderToRaycast = customAddEntity.addEntity()
  Transform.create(colliderToRaycast, {
    parent: engine.PlayerEntity,
    position: Vector3.create(0, 1, 0.45),
    scale: Vector3.create(3, 3, 0.1)
  })
  MeshCollider.create(colliderToRaycast, {
    collisionMask: 5,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  const billboardEntity = customAddEntity.addEntity()
  Transform.create(billboardEntity, { position: sceneCenter })
  Billboard.create(billboardEntity, { billboardMode: BillboardMode.BM_ALL })
  MeshRenderer.create(billboardEntity, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  yield* assertMovePlayerTo(Vector3.create(4, 0, 4), sceneCenter)

  Raycast.create(billboardEntity, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Backward()
    },
    maxDistance: 30,
    queryType: RaycastQueryType.RQT_QUERY_ALL,
    continuous: false,
    collisionMask: 5
  })

  yield* waitTicks(3)

  const rayResult = RaycastResult.get(billboardEntity)

  assertEquals(
    rayResult.hits.length,
    1,
    'raycast from entity should hit the collider'
  )
})

import {
  EngineInfo,
  MeshCollider,
  Raycast,
  RaycastQueryType,
  RaycastResult,
  Transform,
  engine
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { assertComponentValue, assertEquals } from '../../testing/assert'
import { test } from './../../testing'
import { customAddEntity } from './../../utils/entity'
import { waitTicks } from './../../utils/waiters'
import { createChainedEntities } from './../../utils/helpers'

test('raycast: raycast should hits only entities with collisionMask 1', function* (context) {
  customAddEntity.clean()
  const [eA, eB, eC] = Array.from({ length: 3 }, () =>
    customAddEntity.addEntity()
  )
  // An entity A with Raycast hits B and no C (because it hits all but C is in another layer)
  Transform.create(eA, { position: Vector3.One() })

  Transform.create(eB, { position: Vector3.create(4, 1, 1) })
  MeshCollider.create(eB, {
    collisionMask: 1,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Transform.create(eC, { position: Vector3.create(6, 1, 1) })
  MeshCollider.create(eC, {
    collisionMask: 2,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Raycast.create(eA, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Right()
    },
    maxDistance: 15,
    queryType: RaycastQueryType.RQT_QUERY_ALL,
    continuous: false,
    collisionMask: 1
  })
  yield* waitTicks(3)

  let rayResult = RaycastResult.get(eA)

  assertEquals(
    rayResult.hits.length,
    1,
    'raycast should hits only the colliderMesh with CM 1.'
  )

  MeshCollider.createOrReplace(eC, {
    collisionMask: 1,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Raycast.createOrReplace(eA, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Right()
    },
    maxDistance: 15,
    queryType: RaycastQueryType.RQT_QUERY_ALL,
    continuous: false,
    collisionMask: 1
  })
  yield* waitTicks(3)

  rayResult = RaycastResult.get(eA)
  // console.log({ rayResult })

  assertEquals(
    rayResult.hits.length,
    2,
    'raycast should hits all the colliderMeshs with CM 1.'
  )
})

test('raycast: raycast should hits only the first one entity with collisionMask 1', function* (context) {
  customAddEntity.clean()
  const [eA, eB, eC] = Array.from({ length: 3 }, () =>
    customAddEntity.addEntity()
  )
  Transform.create(eA, { position: Vector3.One() })

  Transform.create(eB, { position: Vector3.create(4, 1, 1) })
  MeshCollider.create(eB, {
    collisionMask: 1,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Transform.create(eC, { position: Vector3.create(6, 1, 1) })
  MeshCollider.create(eC, {
    collisionMask: 1,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Raycast.create(eA, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Right()
    },
    maxDistance: 15,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    continuous: false,
    collisionMask: 1
  })
  yield* waitTicks(3)
  const rayResult = RaycastResult.get(eA)

  assertEquals(
    rayResult.hits.length,
    1,
    'raycast should hits only the first entity.'
  )
})

test('raycast: raycast should not hits any entity because has been rotated', function* (context) {
  customAddEntity.clean()
  const [eA, eB, eC] = Array.from({ length: 3 }, () =>
    customAddEntity.addEntity()
  )
  Transform.create(eA, {
    position: Vector3.One(),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0)
  })

  Transform.create(eB, { position: Vector3.create(4, 1, 1) })
  MeshCollider.create(eB, {
    collisionMask: 1,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Transform.create(eC, { position: Vector3.create(6, 1, 1) })
  MeshCollider.create(eC, {
    collisionMask: 1,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Raycast.create(eA, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Right()
    },
    maxDistance: 15,
    queryType: RaycastQueryType.RQT_QUERY_ALL,
    continuous: false,
    collisionMask: 1
  })
  yield* waitTicks(3)

  const rayResult = RaycastResult.get(eA)
  assertEquals(
    rayResult.hits.length,
    0,
    'raycast has been rotated, it should hits any entities.'
  )
})

test('raycast: rotated raycast should hits entities with any collisionMask', function* (context) {
  customAddEntity.clean()
  const [eA, eB, eC] = Array.from({ length: 3 }, () =>
    customAddEntity.addEntity()
  )
  Transform.create(eA, {
    position: Vector3.One(),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0)
  })

  Transform.create(eB, { position: Vector3.create(1, 1, 4) })
  MeshCollider.create(eB, {
    collisionMask: 1,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Transform.create(eC, { position: Vector3.create(1, 1, 6) })
  MeshCollider.create(eC, {
    collisionMask: 2,
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  // TODO: review this issue in godot, the raycast sent is not hitting the two cubes
  //  lean thinks that it's because the Physics Server doesn't apply the transform update
  //  until a new physic's tick comes. this '**yield *waitTicks(3)* *yield *waitTicks(3)' is relative at scene-tick rate
  //  in the godot case the scene has to wait as many ticks as physics tick fits in the scene-rate

  yield* waitTicks(3)

  Raycast.create(eA, {
    direction: {
      $case: 'localDirection',
      localDirection: Vector3.Right()
    },
    maxDistance: 15,
    queryType: RaycastQueryType.RQT_QUERY_ALL,
    continuous: false,
    collisionMask: 0xffffffff
  })
  yield* waitTicks(3)

  const rayResult = RaycastResult.get(eA)
  assertEquals(
    rayResult.hits.length,
    2,
    'raycast hits should be 2 when CollisionMask is 0xffffffff. '
  )
})

test('raycast: raycasting from an entity to global origin yields correct direction', function* (context) {
  const globalTarget = Vector3.create(0, 10, 0)
  const globalOrigin = Vector3.One()

  // 1. Create an entity with a transform component and a raycast component
  const entity = engine.addEntity()

  Transform.create(entity, { position: globalOrigin })
  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'globalTarget', globalTarget },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })
  // 2. Wait for the next frame to let the RaycastSystem to process the raycast
  yield* waitTicks(1)
  const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? -1
  yield* waitTicks(1)

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(Vector3.subtract(globalTarget, globalOrigin)),
    globalOrigin,
    hits: [],
    timestamp: 3,
    tickNumber
  })
})

test('raycast: raycasting from an entity to local direction origin yields correct direction without transform ', function* (context) {
  // create a new entity with a transform and a raycast component
  const globalOrigin = Vector3.create(0, 10, 0)
  const localDirection = Vector3.Down()

  const entity = engine.addEntity()

  Transform.create(entity, { position: globalOrigin })
  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'localDirection', localDirection },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 4
  })

  yield* waitTicks(1)
  const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? -1
  yield* waitTicks(1)

  // check that the raycast result component was added to the entity
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(Vector3.Down()),
    globalOrigin,
    hits: [],
    timestamp: 4,
    tickNumber
  })
})

test('raycast: raycasting from an entity to another entity works like globalTarget ', function* (context) {
  // create a new entity with a transform and a raycast component
  const globalOrigin = Vector3.create(0, 10, 0)
  const targetEntityGlobalOrigin = Vector3.create(0, 10, 10)

  const entity = engine.addEntity()
  const targetEntity = engine.addEntity()

  Transform.create(entity, { position: globalOrigin })
  Transform.create(targetEntity, { position: targetEntityGlobalOrigin })

  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'targetEntity', targetEntity },
    continuous: false,
    maxDistance: 100,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 5
  })
  // Wait for the next frame to let the RaycastSystem to process the raycast
  yield* waitTicks(1)
  const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? -1
  yield* waitTicks(1)

  // check that the raycast result component was added to the entity
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(
      Vector3.subtract(targetEntityGlobalOrigin, globalOrigin)
    ),
    globalOrigin,
    hits: [],
    timestamp: 5,
    tickNumber
  })
})

test('raycast: raycasting from an entity to local direction origin yields correct direction with last entity rotated', function* (context) {
  // create a new entity with a transform and a raycast component
  const globalOrigin = Vector3.create(0, 10, 0)
  const globalDirection = Vector3.Down()

  const entity = engine.addEntity()

  Transform.create(entity, {
    position: globalOrigin,
    rotation: Quaternion.fromEulerDegrees(45, 45, 45)
  })
  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'globalDirection', globalDirection },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 6
  })

  // Wait for the next frame to let the RaycastSystem to process the raycast
  yield* waitTicks(1)
  const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? -1
  yield* waitTicks(1)

  // check that the raycast result component was added to the entity
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(Vector3.Down()),
    globalOrigin,
    hits: [],
    timestamp: 6,
    tickNumber
  })
})

test('raycast: raycasting from a translated origin works', function* (context) {
  // this is the paremeter of the globalTarget
  const globalTarget = Vector3.create(0, 10, 0)

  // 1. Create an entity that is located in a transformed origin
  const entity = createChainedEntities([
    { position: Vector3.create(10, 0, 10) },
    { position: Vector3.create(10, 0, 10) }
  ])

  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'globalTarget', globalTarget },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })
  // Wait for the next frame to let the RaycastSystem to process the raycast
  yield* waitTicks(1)
  const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? -1
  yield* waitTicks(1)

  const globalOrigin = Vector3.create(20, 0, 20)

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(Vector3.subtract(globalTarget, globalOrigin)),
    globalOrigin,
    hits: [],
    timestamp: 3,
    tickNumber
  })
})

test('raycast: localDirection raycasting from a translated origin works', function* (context) {
  // 1. Create an entity that is located in a transformed origin
  const entity = createChainedEntities([
    {
      position: Vector3.create(10, 0, 10),
      scale: Vector3.create(0.5, 0.5, 0.5)
    },
    {
      position: Vector3.create(10, 0, 10),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0)
    }
  ])

  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'localDirection', localDirection: Vector3.Forward() },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })
  // Wait for the next frame to let the RaycastSystem to process the raycast
  yield* waitTicks(1)
  const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? -1
  yield* waitTicks(1)

  // this is the global origin of the raycast, result of the translation and scaling of the entity
  const globalOrigin = Vector3.create(15, 0, 15)

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    // the direction is now right because the transform was rotated 90 degrees
    direction: Vector3.Right(),
    globalOrigin,
    hits: [],
    timestamp: 3,
    tickNumber
  })
})

test('raycast: localDirection raycasting from a translated origin works, with rotated parent', function* (context) {
  // 1. Create an entity that is located in a transformed origin
  const entity = createChainedEntities([
    {
      position: Vector3.create(10, 0, 10),
      scale: Vector3.create(0.5, 0.5, 0.5)
    },
    {
      position: Vector3.create(10, 0, 10),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0)
    },
    {
      scale: Vector3.create(1, 1, 1)
    }
  ])

  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'localDirection', localDirection: Vector3.Forward() },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })
  // Wait for the next frame to let the RaycastSystem to process the raycast
  yield* waitTicks(1)
  const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? -1
  yield* waitTicks(1)

  // this is the global origin of the raycast, result of the translation and scaling of the entity
  const globalOrigin = Vector3.create(15, 0, 15)

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    // the direction is now right because the transform was rotated 90 degrees
    direction: Vector3.Right(),
    globalOrigin,
    hits: [],
    timestamp: 3,
    tickNumber
  })
})

test('raycast: localDirection raycasting from a translated origin works, with rotated parent and offsetOrigin', function* (context) {
  // 1. Create an entity that is located in a transformed origin
  const entity = createChainedEntities([
    {
      position: Vector3.create(10, 0, 10),
      scale: Vector3.create(0.5, 0.5, 0.5)
    },
    {
      position: Vector3.create(10, 0, 10),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0)
    },
    {
      scale: Vector3.create(1, 1, 1)
    }
  ])

  Raycast.create(entity, {
    // in this case, the originOffset is in the local space of the entity one unit forward
    originOffset: Vector3.Forward(),
    direction: { $case: 'localDirection', localDirection: Vector3.Forward() },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })
  yield* waitTicks(1)
  const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? -1
  yield* waitTicks(1)
  // this is the global origin of the raycast, result of the translation and scaling of the entity
  const globalOrigin = Vector3.create(15, 0, 15)
  const rotatedForwardOrigin = Vector3.add(
    Vector3.create(0.5, 0, 0),
    globalOrigin
  )

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    // the direction is now right because the transform was rotated 90 degrees
    direction: Vector3.Right(),
    // and the globalOrigin is offsetted by originOffset
    globalOrigin: rotatedForwardOrigin,
    hits: [],
    timestamp: 3,
    tickNumber
  })
})

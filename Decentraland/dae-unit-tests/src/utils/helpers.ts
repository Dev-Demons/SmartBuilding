import type { Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'
import { assert } from './../testing/assert'
import {
  engine,
  type Entity,
  Transform,
  type TransformTypeWithOptionals
} from '@dcl/sdk/ecs'

export function* assertMovePlayerTo(
  newRelativePosition: Vector3,
  cameraTarget: Vector3
): Generator<void> {
  let wasResolved: boolean = false
  movePlayerTo({
    newRelativePosition,
    cameraTarget
  })
    .then(() => {
      wasResolved = true
    })
    .catch((error) => {
      throw error
    })
  yield
  assert(wasResolved, 'Move player to was not resolved')
}

export function createChainedEntities(
  transforms: Array<Omit<TransformTypeWithOptionals, 'parent'>>,
  parent: Entity = engine.RootEntity
): Entity {
  return transforms.reduce((parent, transform) => {
    const entity = engine.addEntity()
    Transform.create(entity, { ...transform, parent })
    return entity
  }, parent)
}

import type { Entity } from '@dcl/sdk/ecs'
import { Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { onSceneReadyObservable } from '@dcl/sdk/observables'

let sceneIsReady = false
onSceneReadyObservable.add(() => {
  sceneIsReady = true
})

export const waitTicksSceneIsReady: () => Generator<void, void> = function* () {
  yield* waitTicksUntil(() => sceneIsReady)
}

export function* waitTicksUntil(fn: () => boolean): Generator<void> {
  while (true) {
    if (!fn()) {
      yield
    } else {
      return
    }
  }
}

export function* waitTriggerTest(entity: Entity): Generator<void> {
  Transform.create(entity, { position: Vector3.One() })
  yield* waitTicksUntil(() => Transform.getOrNull(entity) !== null)
}

// this function is only for wait n ticks
export function* waitTicks(n: number): Generator<void> {
  for (let i: number = 0; i < n; i++) {
    yield
  }
}

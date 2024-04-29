import {
  InputAction,
  PointerEventType,
  PointerEvents,
  engine,
  inputSystem
} from '@dcl/sdk/ecs'
import { BounceScaling } from '../components/components'
import { createCube } from '../factory'

/**
 * The spawner system is listening for entities with hover feedback, when a input is emitted
 * just spawn a new cube randomly and animate the spawner with a bounce.
 */
export function spawnerSystem() {
  const clickedCubes = engine.getEntitiesWith(PointerEvents)
  for (const [entity] of clickedCubes) {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
      createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8, false)
      BounceScaling.createOrReplace(entity)
    }
  }
}

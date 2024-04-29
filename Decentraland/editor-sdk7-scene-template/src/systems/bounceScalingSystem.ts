import {
  Transform,
  engine
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { BounceScaling } from '../components/components'

/**
 * Add this system and every entity with BounceScaling will bounce for 5 seconds
 * @param dt - detal time in seconds
 */
export function bounceScalingSystem(dt: number) {
  const clickedCubes = engine.getEntitiesWith(BounceScaling, Transform)
  for (const [entity] of clickedCubes) {
    const m = BounceScaling.getMutable(entity)
    m.t += dt

    if (m.t > 5) {
      Transform.getMutable(entity).scale = Vector3.One()
      BounceScaling.deleteFrom(entity)
    } else {
      const factor = 0.9 + 0.2 * Math.exp(-1.5 * m.t) * Math.sin(10 * m.t)
      Transform.getMutable(entity).scale = Vector3.scale(Vector3.One(), factor)
    }
  }
}

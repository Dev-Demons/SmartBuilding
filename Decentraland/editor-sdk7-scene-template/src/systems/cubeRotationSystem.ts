import {
    MeshRenderer,
    Transform,
    engine
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
  
/**
 * All cubes rotating behavior
 */
export function cubeRotationSystem(dt: number) {
    const entitiesWithMeshRenderer = engine.getEntitiesWith(MeshRenderer, Transform)
    for (const [entity, _meshRenderer, _transform] of entitiesWithMeshRenderer) {
        if (_meshRenderer.mesh?.$case === 'box') {
            const mutableTransform = Transform.getMutable(entity)

            mutableTransform.rotation = Quaternion.multiply(
            mutableTransform.rotation,
                Quaternion.fromAngleAxis(dt * 10, Vector3.Up())
            )
        }
    }
}
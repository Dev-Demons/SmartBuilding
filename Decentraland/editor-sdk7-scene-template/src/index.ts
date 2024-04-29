import { engine } from '@dcl/sdk/ecs'
import { setupUi } from './ui/main'
import { cubeRotationSystem } from './systems/cubeRotationSystem'
import { spawnerSystem } from './systems/spawnerSystem'
import { bounceScalingSystem } from './systems/bounceScalingSystem'

export function main() {
    engine.addSystem(cubeRotationSystem)
    engine.addSystem(spawnerSystem)
    engine.addSystem(bounceScalingSystem)
    setupUi()
}
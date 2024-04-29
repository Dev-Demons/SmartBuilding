import { createBlackRoom } from './utils/black-room'

import './tests/transform/index.test'
import './tests/camera-mode/index.test'
import './tests/raycast/index.test'
import './tests/pointer-lock/index.test'
import './tests/mesh-renderer/index.test'
import './tests/material/index.test'
import './tests/gltf-container/index.test'
import './tests/billboard/index.test'
import './tests/visibility/index.test'
import './tests/engine-info/index.test'

export function main(): void {
  createBlackRoom()
}

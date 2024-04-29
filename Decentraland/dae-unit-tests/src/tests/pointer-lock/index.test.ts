import { EngineInfo, PointerLock, engine } from '@dcl/sdk/ecs'
import { assertEquals } from '../../testing/assert'
import { waitTicks, waitTicksUntil } from '../../utils/waiters'
import { test } from './../../testing'

test('pointer-lock: check pointerLock.isLocked = false when scene initiate', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  const pointerLockValue = PointerLock.get(engine.CameraEntity)
  assertEquals(
    pointerLockValue.isPointerLocked,
    false,
    'isPointerLocked should be false without player interaction'
  )
})

test('pointer-lock: check pointerLock.isLocked = true after simulate a click on scene', function* (context) {
  yield* waitTicks(5)
  // TODO: simulate click on screen to force pointerLock.isLocked = true
  const pointerLockValue = PointerLock.get(engine.CameraEntity)
  assertEquals(
    pointerLockValue.isPointerLocked,
    true,
    'isPointerLocked should be true if player clicked the scene'
  )
})

test('pointer-lock: check pointerLock.isLocked = false after simulate pressing ESC key on scene', function* (context) {
  yield* waitTicks(5)
  // TODO: simulate ESC to force pointerLock.isLocked = false
  const pointerLockValue = PointerLock.get(engine.CameraEntity)
  assertEquals(
    pointerLockValue.isPointerLocked,
    false,
    'isPointerLocked should be false if player pressed ESC key'
  )
})

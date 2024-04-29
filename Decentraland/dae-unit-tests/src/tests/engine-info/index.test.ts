import { EngineInfo, engine } from '@dcl/sdk/ecs'
import { assertEquals } from '../../testing/assert'
import { waitTicks } from '../../utils/waiters'
import { test } from './../../testing'

test('engineInfo: testing engine information (tickNumber and quantity of properties)', function* (context) {
  const firstEngineInfo = EngineInfo.getOrNull(engine.RootEntity)
  console.log(EngineInfo.get(engine.RootEntity))
  yield* waitTicks(5)

  console.log(EngineInfo.get(engine.RootEntity))
  const secondEngineInfo = EngineInfo.getOrNull(engine.RootEntity)
  if (firstEngineInfo != null && secondEngineInfo != null) {
    assertEquals(
      secondEngineInfo.tickNumber,
      firstEngineInfo.tickNumber + 5,
      `ticknumber should be  ${firstEngineInfo.tickNumber + 5}`
    )
    const keysArray: string[] = Object.keys(secondEngineInfo)
    const count: number = keysArray.length
    assertEquals(count, 3, `engineInfo should have 3 keys but it have ${count}`)
  }
})

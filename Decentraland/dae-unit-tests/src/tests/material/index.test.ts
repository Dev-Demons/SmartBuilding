import {
  EngineInfo,
  Material,
  MaterialTransparencyMode,
  MeshRenderer,
  Transform,
  engine
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import * as Testing from '~system/Testing'
import { assertEquals } from '../../testing/assert'
import { customAddEntity } from '../../utils/entity'
import type {
  TakeAndCompareSnapshotRequest,
  TakeAndCompareSnapshotResponse
} from '../../utils/snapshot-test'
import { waitTicks, waitTicksUntil } from '../../utils/waiters'
import { test } from './../../testing'

test('material blue emissiveIntensity:100: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })

  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  Material.setPbrMaterial(cube, {
    albedoColor: Color4.Blue(),
    emissiveColor: Color4.Blue(),
    emissiveIntensity: 100
  })
  yield* waitTicks(5)
  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 1',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material blue with alpha: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  Material.setPbrMaterial(cube, {
    metallic: 0,
    roughness: 0,
    alphaTest: 0.5,
    albedoColor: Color4.Blue()
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 2',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material blue with texture: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  Material.setPbrMaterial(cube, {
    metallic: 0.5,
    roughness: 0.2,
    alphaTest: 1,
    bumpTexture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/src/assets/images/normal_mapping_normal_map.png' }
      }
    },
    albedoColor: Color4.Blue()
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 3',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first  time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material blue with metallic:0 roghness:1 alphaTest:1: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  Material.setPbrMaterial(cube, {
    metallic: 0,
    roughness: 1,
    alphaTest: 1,
    albedoColor: Color4.Blue()
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 4',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material blue with metallic:0.5 roghness:0.5 alphaTest:1: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  Material.setPbrMaterial(cube, {
    metallic: 0.5,
    roughness: 0.5,
    alphaTest: 1,
    albedoColor: Color4.Blue()
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 5',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material blue with metallic:0 roghness:0 alphaTest:1: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  Material.setPbrMaterial(cube, {
    metallic: 0,
    roughness: 0,
    alphaTest: 1,
    albedoColor: Color4.Blue()
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 6',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material blue with metallic:1 roghness:0 alphaTest:1: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  Material.setPbrMaterial(cube, {
    metallic: 1,
    roughness: 0,
    alphaTest: 1,
    albedoColor: Color4.Blue()
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 7',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material uv checker: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Material.setPbrMaterial(cube, {
    texture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/uv-checker.png' }
      }
    }
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 8',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material uv checker with transparency mode auto: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Material.setPbrMaterial(cube, {
    alphaTexture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/transparency-texture.png' }
      }
    },
    texture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/uv-checker.png' }
      }
    },
    transparencyMode: MaterialTransparencyMode.MTM_AUTO
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 9',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material uv checker with transparency mode blend: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Material.setPbrMaterial(cube, {
    alphaTexture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/transparency-texture.png' }
      }
    },
    texture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/uv-checker.png' }
      }
    },
    transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST_AND_ALPHA_BLEND,
    castShadows: false
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 10',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material transparency mode auto with emissive: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Material.setPbrMaterial(cube, {
    alphaTexture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/transparency-texture.png' }
      }
    },
    transparencyMode: MaterialTransparencyMode.MTM_AUTO,
    emissiveTexture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/emissive-texture.png' }
      }
    },
    emissiveColor: Color4.Yellow(),
    emissiveIntensity: 150
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 11',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material rock wall texture: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Material.setPbrMaterial(cube, {
    texture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/rock-wall-texture.png' }
      }
    }
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 12',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('material rock wall texture with bump texture: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 2, 8),
    scale: Vector3.create(2, 2, 2)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })

  Material.setPbrMaterial(cube, {
    texture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/rock-wall-texture.png' }
      }
    },
    bumpTexture: {
      tex: {
        $case: 'texture',
        texture: { src: 'src/assets/images/rock-wall-bump.png' }
      }
    }
  })

  yield* waitTicks(2)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'material 13',
    cameraPosition: Vector3.create(6.5, 4, 6.5),
    cameraTarget: Vector3.create(8, 2, 8),
    snapshotFrameSize: Vector3.create(512, 512),
    tolerance: 0.99
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The t est took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

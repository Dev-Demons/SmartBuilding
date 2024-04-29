import { Transform } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, {
  Button,
  ReactEcsRenderer,
  UiEntity
} from '@dcl/sdk/react-ecs'
import { lazyCreateEntity } from '../../utils/entity'

// export const firstPersonEntity = lazyCreateEntity()
// export const thirdPersonEntity = lazyCreateEntity()
// export const scaledEntity = lazyCreateEntity()
// export const rotatedEntity = lazyCreateEntity()
// export const overlapedEntity = lazyCreateEntity()
// export const overlapedEntity2 = lazyCreateEntity()
export const startTestEntity = lazyCreateEntity()

// var testStage: number = 6
// const ui_width: number = 285
// const ui_height: number = 135
// let margin_left: number = 0
// let margin_top: number = 0

// engine.addSystem(() => {
//   let canvas = UiCanvasInformation.get(engine.RootEntity)
//   margin_left = canvas.width - 15 - ui_width
//   margin_top = canvas.height - 15 - ui_height
// })

export function setupUi(): void {
  ReactEcsRenderer.setUiRenderer(ui)
}

const ui = (): ReactEcs.JSX.Element => {
  return (
    <UiEntity
      uiBackground={{ color: Color4.Black() }}
      uiTransform={{
        width: 140,
        height: 40,
        margin: { top: 150, left: 400 },
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* <UiEntity
        uiTransform={{
          margin: { bottom: '5px' }
        }}
      >
        <Button
          value="First Person"
          variant="primary"
          uiTransform={{ width: 120, height: 20, margin: { left: 15, top: 10 } }}
          onMouseDown={() => {
            handleFirstPerson()
          }}
          disabled={testStage == 1 ? false : true}
        />

        <Button
          value="Third Person"
          uiTransform={{ width: 120, height: 20, margin: { left: 15, top: 10 } }}
          onMouseDown={() => {
            handleThirdPerson()
          }}
          disabled={testStage == 2 ? false : true}
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          margin: { bottom: '5px' }
        }}
      >
        <Button
          value="Scale Area"
          variant="primary"
          uiTransform={{ width: 120, height: 20, margin: { left: 15, top: 10 } }}
          onMouseDown={() => {
            handleScale()
          }}
          disabled={testStage == 3 ? false : true}
        />
        <Button
          value="Rotate Area"
          variant="primary"
          uiTransform={{ width: 120, height: 20, margin: { left: 15, top: 10 } }}
          onMouseDown={() => {
            handleRotate()
          }}
          disabled={testStage == 4 ? false : true}
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          margin: { bottom: '5px' }
        }}
      >
         <Button
          value="Overlaped Areas"
          variant="primary"
          uiTransform={{ width: 120, height: 20, margin: { left: 15, top: 10 } }}
          onMouseDown={() => {
            handleOverlap()
          }}
          disabled={testStage == 5 ? false : true}
        /> 
        <Button
          value="Overlaped Areas 2"
          variant="primary"
          uiTransform={{ width: 120, height: 20, margin: { left: 15, top: 10 } }}
          onMouseDown={() => {
            handleOverlap2()
          }}
          disabled={false}
        />
      </UiEntity> */}
      <Button
        value="Start Tests"
        variant="primary"
        uiTransform={{
          width: 120,
          height: 20,
          margin: { left: '10', top: 10 }
        }}
        onMouseDown={() => {
          handleStartTest()
        }}
      />
    </UiEntity>
  )

  function handleStartTest(): void {
    Transform.deleteFrom(startTestEntity.get())
  }
  //   function handleFirstPerson() {
  //     Transform.deleteFrom(firstPersonEntity.get())
  //     testStage++
  //   }

  //   function handleThirdPerson() {
  //     Transform.deleteFrom(thirdPersonEntity.get())
  //     testStage++
  //   }

  //   function handleScale() {
  //     Transform.deleteFrom(scaledEntity.get())
  //     testStage++
  //   }

  //   function handleRotate() {
  //     Transform.deleteFrom(rotatedEntity.get())
  //     testStage++
  //   }

  //   function handleOverlap() {
  //     Transform.deleteFrom(overlapedEntity.get())
  //     testStage++
  //   }

  //   function handleOverlap2() {
  //     Transform.deleteFrom(overlapedEntity2.get())
  //     testStage++
  //   }
  //   function printCameraMode() {
  //     const camera = CameraMode.get(engine.CameraEntity)
  //     console.log('Camera Mode: ' + camera.mode)
  //   }
}

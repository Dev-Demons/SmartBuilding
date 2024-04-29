import { Add, Remove } from '../entities/Name/List'
import { Poi } from '../entities/schema'
import { buildCountFromPOIs } from '../modules/Count'

export function handleAddPOI(event: Add): void {
  let poi = new Poi(event.params._value)

  poi.coordinates = event.params._value
  poi.x = event.params._value.split(',')[0]
  poi.y = event.params._value.split(',')[1]
  poi.isActive = true

  poi.save()


  let count = buildCountFromPOIs(true)
  count.save()
}


export function handleRemovePOI(event: Remove): void {
  let poi = Poi.load(event.params._value)

  if (!poi) {
    return
  }

  poi.isActive = false

  poi.save()

  let count = buildCountFromPOIs(false)
  count.save()
}
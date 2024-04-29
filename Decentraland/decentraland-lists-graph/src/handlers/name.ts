
import { Add, Remove } from '../entities/Name/List'
import { Name } from '../entities/schema'
import { buildCountFromNames } from '../Modules/Count'

export function handleAddName(event: Add): void {
  let name = new Name(event.params._value)

  name.name = event.params._value
  name.isActive = true

  name.save()

  let count = buildCountFromNames(true)
  count.save()
}


export function handleRemoveName(event: Remove): void {
  let name = Name.load(event.params._value)
  if (!name) {
    return
  }

  name.isActive = false

  name.save()

  let count = buildCountFromNames(false)
  count.save()
}
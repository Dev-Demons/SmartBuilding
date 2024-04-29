import { Catalyst } from '../entities/schema'
import {
  AddCatalyst, RemoveCatalyst
} from '../entities/Catalyst/Catalyst'
import { buildCountFromCatalyst } from '../Modules/Count'

export function handleAddCatalyst(event: AddCatalyst): void {
  let catalyst = new Catalyst(event.params._id.toHexString())

  catalyst.domain = event.params._domain
  catalyst.owner = event.params._owner.toHexString()
  catalyst.isActive = true

  catalyst.save()

  let count = buildCountFromCatalyst(true)
  count.save()
}


export function handleRemoveCatalyst(event: RemoveCatalyst): void {
  let catalyst = Catalyst.load(event.params._id.toHexString())
  if (!catalyst) {
    return
  }
  catalyst.isActive = false

  catalyst.save()

  let count = buildCountFromCatalyst(false)
  count.save()
}

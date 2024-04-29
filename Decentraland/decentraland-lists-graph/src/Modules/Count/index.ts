import { Count } from '../../entities/schema'

export const DEFAULT_ID = 'all'

export function buildCount(): Count {
  let count = Count.load(DEFAULT_ID)

  if (count == null) {
    count = new Count(DEFAULT_ID)
    count.catalystTotal = 0
    count.poisTotal = 0
    count.namesTotal = 0
  }

  return count as Count
}

export function buildCountFromCatalyst(add: boolean): Count {
  let count = buildCount()

  if (add) {
    count.catalystTotal += 1
  } else {
    count.catalystTotal -= 1
  }

  return count
}

export function buildCountFromPOIs(add: boolean): Count {
  let count = buildCount()

  if (add) {
    count.poisTotal += 1
  } else {
    count.poisTotal -= 1
  }

  return count
}

export function buildCountFromNames(add: boolean): Count {
  let count = buildCount()

  if (add) {
    count.namesTotal += 1
  } else {
    count.namesTotal -= 1
  }

  return count
}
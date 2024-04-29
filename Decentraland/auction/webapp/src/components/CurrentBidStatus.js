import React from 'react'

import * as parcelUtils from '../lib/parcelUtils'

export default function CurrentBidStatus({ addressState, parcel, projects }) {
  const isError = parcel.error
  const isReserved = parcelUtils.isReserved(parcel)

  const status = []

  if (isError)
    status.push(
      <div key="1">We couldn{"'"}t fetch the parcel, please try again</div>
    )

  if (isReserved) {
    const project = parcelUtils.getProjectForParcel(parcel, projects.data || [])

    if (project) {
      status.push(
        <div key="2">
          {project.link ? (
            <a href={project.link} target="_blank">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </div>
      )
    }
  }

  return status.length > 0 ? (
    <div className="current-bid-status">{status}</div>
  ) : null
}

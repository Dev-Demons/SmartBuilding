import { Model } from 'decentraland-commons'

class DistrictEntry extends Model {
  static tableName = 'district_entries'
  static columnNames = [
    'id',
    'address',
    'project_id',
    'lands',
    'userTimestamp',
    'action'
  ]

  static countSubmissions() {
    return this.db.query(`SELECT count(*) as amount FROM ${this.tableName}`)
  }

  static async getTotalLand() {
    const result = await this.db.query(
      `SELECT SUM(lands) as total FROM ${this.tableName}`
    )
    return result.length ? result[0].total : 0
  }

  static getTotalLandByAddress(address) {
    return this.db
      .query(`SELECT SUM(lands) FROM ${this.tableName} WHERE address = $1`, [
        address
      ])
      .then(rows => (rows.length ? rows[0].sum : 0))
  }

  static getSubmissions(address) {
    return this.db.query(`SELECT * FROM ${this.tableName} WHERE address = $1`, [
      address
    ])
  }

  static getSummarySubmissions(address) {
    return this.db.query(
      `SELECT "${this.tableName}".id, projects.name, "${this
        .tableName}".lands, "${this
        .tableName}"."userTimestamp", projects.link FROM "${this
        .tableName}" LEFT JOIN projects ON projects.id::text LIKE "${this
        .tableName}".project_id WHERE address = $1`,
      [address]
    )
  }

  static getMonthlyLockedBalanceByAddress(address, landCost) {
    return this.db.query(
      `SELECT EXTRACT(month from TO_TIMESTAMP("userTimestamp"::bigint / 1000)) AS month, SUM(lands) * $1 AS mana
        FROM ${this.tableName} WHERE address = $2
        GROUP BY month`,
      [landCost, address.toLowerCase()]
    )
  }

  static findContributedByAddress(address) {
    return this.db.query(
      'SELECT P.name, P.lookup, SUM(D.lands) FROM district_entries D JOIN projects P ON D.project_id = P.id WHERE D.address = $1 GROUP BY P.name, P.lookup',
      [address.toLowerCase()]
    )
  }

  static findByAddress(address) {
    return this.find({ address })
  }
}

export default DistrictEntry

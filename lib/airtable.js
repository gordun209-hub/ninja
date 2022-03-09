const Airtable = require('airtable')

const bases = 'app3uboSYgSXpf9xh'
const base = new Airtable({ apiKey: 'keyYf5IhmTRlnjIQy' }).base(bases)
const table = base('coffee-stores')

const getMinifiedRecord = record => {
  return {
    recordId: record.id,
    ...record.fields
  }
}

const getMinifiedRecords = records => {
  return records.map(record => getMinifiedRecord(record))
}

const findRecordByFilter = async id => {
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`
    })
    .firstPage()

  return getMinifiedRecords(findCoffeeStoreRecords)
}

export { findRecordByFilter, getMinifiedRecords, table }

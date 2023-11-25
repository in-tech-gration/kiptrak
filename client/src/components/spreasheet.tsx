// cSpell: disable
import { useState } from 'react'

import {
  DataSheetGrid,
  checkboxColumn,
  intColumn,
  textColumn,
  keyColumn,
} from 'react-datasheet-grid'

// Import the style only once in your app!
import 'react-datasheet-grid/dist/style.css'

const Spreadsheet = () => {
  const [ data, setData ] = useState([
    { 
      week: 1,
      day: 2,
      concept: "Setting up: Markdown",
      task: "Watch the 'What is markdown?' video",
      level: "Beginner",
      confidence: 0,
      completed: false,
      instructions: "Update CONFIDENCE column. Change COMPLETED column to TRUE" 
    },
  ])

  const columns = [
    {
      ...keyColumn('week', intColumn),
      disabled: true,
      title: 'Week',
    },
    {
      ...keyColumn('day', intColumn),
      disabled: true,
      title: 'Day',
    },
    {
      ...keyColumn('concept', textColumn),
      disabled: true,
      title: 'Concept',
    },
    {
      ...keyColumn('task', textColumn),
      disabled: true,
      title: 'Task',
    },
    {
      ...keyColumn('level', textColumn),
      disabled: true,
      title: 'Level',
    },
    {
      ...keyColumn('confidence', intColumn),
      title: 'Confidence',
    },
    {
      ...keyColumn('completed', checkboxColumn),
      title: 'Completed',
    },
    {
      ...keyColumn('instructions', textColumn),
      title: 'Instructions',
    },
  ]

  return (
    <DataSheetGrid
      lockRows
      value={data}
      // @ts-expect-error: later TS...
      onChange={setData}
      columns={columns}
    />
  )
}

export default Spreadsheet;
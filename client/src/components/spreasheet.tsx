// cSpell: disable
import React, { useLayoutEffect, useRef, useState } from 'react'
import { CellProps, Column } from 'react-datasheet-grid'
import Select, { GroupBase, SelectInstance } from 'react-select'

import {
  DataSheetGrid,
  checkboxColumn,
  intColumn,
  textColumn,
  keyColumn,
} from 'react-datasheet-grid'

// Import the style only once in your app!
import 'react-datasheet-grid/dist/style.css'

type Choice = {
  label: string
  value: string
}

type SelectOptions = {
  choices: Choice[]
  disabled?: boolean
}

// @ts-expect-error: Take care of these
type Row = {
  flavor: string | null
  quantity: number | null
}

const SelectComponent = React.memo(
  ({
    active,
    rowData,
    setRowData,
    focus,
    stopEditing,
    columnData,
  }: CellProps<string | null, SelectOptions>) => {
    const ref = useRef<SelectInstance<Choice, false, GroupBase<Choice>>>(null)

    useLayoutEffect(() => {
      if (focus) {
        ref.current?.focus()
      } else {
        ref.current?.blur()
      }
    }, [focus])

    return (
      <Select
        ref={ref}
        styles={{
          container: (provided) => ({
            ...provided,
            flex: 1,
            alignSelf: 'stretch',
            pointerEvents: focus ? undefined : 'none',
          }),
          control: (provided) => ({
            ...provided,
            height: '100%',
            border: 'none',
            boxShadow: 'none',
            background: 'none',
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            opacity: 0,
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
          placeholder: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
        }}
        isDisabled={columnData.disabled}
        value={
          columnData.choices.find(({ value }) => value === rowData) ?? null
        }
        menuPortalTarget={document.body}
        menuIsOpen={focus}
        onChange={(choice) => {
          if (choice === null) return;

          setRowData(choice.value);
          setTimeout(stopEditing, 0);
        }}
        onMenuClose={() => stopEditing({ nextRow: false })}
        options={columnData.choices}
      />
    )
  }
)

const selectColumn = ( options: SelectOptions): Column<string | null, SelectOptions> => ({
  // TODO: TypeScript
  // @ts-expect-error: Take care of this:
  component: SelectComponent,
  columnData: options,
  disableKeys: true,
  keepFocus: true,
  disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) =>
    options.choices.find((choice) => choice.value === rowData)?.label ?? null,
  pasteValue: ({ value }) =>
    options.choices.find((choice) => choice.label === value)?.value ?? null,
})

const Spreadsheet = () => {
  const [data, setData] = useState([
    {
      week: 1,
      day: 2,
      concept: "Setting up: Markdown",
      task: "Watch the 'What is markdown?' video",
      level: "beginner",
      confidence: 0,
      completed: false,
      instructions: "Update CONFIDENCE column. Change COMPLETED column to TRUE"
    },
    {
      week: 1,
      day: 2,
      concept: "Learn React",
      task: "Watch the Lecture video",
      level: "advanced",
      confidence: 0,
      completed: false,
      instructions: "Update CONFIDENCE column. Change COMPLETED column to TRUE"
    },
  ])

  // TODO: const columns: Column<Row>[] = [
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
      // ...keyColumn('level', textColumn),
      ...keyColumn('level', selectColumn({
        choices: [
          { value: 'beginner', label: 'Beginner' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'advanced', label: 'Advanced' },
        ]
      })),
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
      // TODO:
      // @ts-expect-error: later TS...
      onChange={setData}
      columns={columns}
    />
  )
}

export default Spreadsheet;
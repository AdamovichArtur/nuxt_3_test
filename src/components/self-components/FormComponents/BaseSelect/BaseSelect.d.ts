export type BaseSelectProps = {
  readonly options: (string | Record<string, any>)[]
  readonly idKey?: string // If the items within the array are objects, provide id key, otherwise the index will be used
  readonly itemKey?: string // If the items within the array are objects, provide the key for the item, otherwise the entire object will be shown to the user
  readonly label?: string // Add a label to the dropdown
  readonly labelPosition?: string // Decide label position for the dropdown. Default is above and 'row' puts things on the same row
  readonly selectionPrompt?: string // Show selection prompt to the user
  readonly selectFirstOption?: boolean // Select first item by default in dropdown
  readonly selectMultiple?: boolean // Allow multiple selection within the dropdown
  readonly disabled?: boolean // Disable the dropdown
  readonly required?: boolean // Make the dropdown required in a form or not
  readonly toSorted?: boolean // Sort the options alphabetically, default is true

  modelValue?: string | Record<string, any>[] | object
}

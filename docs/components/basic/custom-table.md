# custom-table

A custom table.

## Example

<br>
<Demo componentName="examples-basic-custom-table-doc" />

## Example Source Code

<SourceCode>
<<< @/docs/.vuepress/components/examples/basic/custom-table-doc.vue
</SourceCode>

## Component Source Code

<SourceCode>
<<< @/src/components/basic/custom-table/custom-table.vue
</SourceCode>

## slots

**headers**  
Setup the table headers
``` html
<template v-slot:headers="{headers}"></template>
```

**row**  
Setup the table rows
``` html
<template v-slot:row="{row}"></template>
```

**no-row-data**  
Setup a row to be shown when there is no rows in the table
``` html
<template v-slot:no-row-data></template>
```

**footers**  
Setup the table footers
``` html
<template v-slot:footers="{footers}"></template>
```

## props

... TODO: ADD PROPS HERE WITH PROPDOC ...
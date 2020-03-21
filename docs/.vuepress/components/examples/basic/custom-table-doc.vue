<template>
  <div>
    <custom-table :headers="headers" :rows="rows" :footers="footers">
      <template v-slot:headers="{headers}">
        <th>{{headers[0]}}</th>
        <th>{{headers[1]}}</th>
        <th>{{headers[2]}}</th>
      </template>

      <template v-slot:row="{row}">
        <td>{{row.name}}</td>
        <td>{{row.email}}</td>
        <td>{{row.sex}}</td>
      </template>
      <template v-slot:no-row-data>
        <span>No data</span>
      </template>

      <template v-slot:footers="{footers}">
        <td>{{footers[0]}}</td>
        <td>{{footers[1]}}</td>
        <td>{{footers[2]}}</td>
      </template>
    </custom-table>

    <br>

    <custom-table :headers="headers" :rows="rows" :footers="footers" :selectable="{radioLabelKey: 'name'}" @selected-row="handleClickEvent">
      <template v-slot:headers="{headers}">
        <th>{{headers[0]}}</th>
        <th>{{headers[1]}}</th>
        <th>{{headers[2]}}</th>
      </template>

      <template v-slot:row="{row}">
        <td>{{row.name}}</td>
        <td>{{row.email}}</td>
        <td>{{row.sex}}</td>
      </template>
      <template v-slot:no-row-data>
        <span>No data</span>
      </template>

      <template v-slot:footers="{footers}">
        <td>{{footers[0]}}</td>
        <td>{{footers[1]}}</td>
        <td>{{footers[2]}}</td>
      </template>
    </custom-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        'Name',
        'Email',
        'Sex'
      ],
      rows: [
        {
          name: 'Sir GG',
          email: 'gg@we.pee',
          sex: 'male'
        },
        {
          name: 'Lady LMFAO',
          email: 'lol@rofl.lmao',
          sex: 'female'
        }
      ],
      footers: [
        'Mail',
        'Me',
        'Now'
      ]
    }
  },
  methods: {
    handleClickEvent (index, row) {
      window.alert(`You selected index "${index}" of "rows"\n\nThis is the content of the row:\n${JSON.stringify(row)}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-table /deep/ {
    width: 50%;
    display: table;

    .columns {
      $name-column-width: 20rem;
      col:nth-child(1) {
        $magic-number: 6px;
        $selectable-width: 6rem;
        width: calc(#{$magic-number} + #{$selectable-width} + #{$name-column-width});
      }
      &.selectable {
        col:nth-child(2) {
          width: $name-column-width;
        }
      }
    }
  }
</style>

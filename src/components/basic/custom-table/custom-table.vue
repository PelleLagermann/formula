<template>
  <table class="custom-table">
    <colgroup class="columns" :class="{selectable: selectable}">
      <col v-for="(column, index) in columns" :key="index">
    </colgroup>

    <thead class="header" :class="{selectable: selectable}">
      <template v-if="headers.length > 0">
        <tr>
          <th v-if="selectable">&nbsp;</th>
          <slot name="headers" :headers="headers"></slot>
        </tr>
      </template>
    </thead>

    <tbody class="body" :class="{selectable: selectable}">
      <template v-if="rows.length > 0">
          <tr v-for="(row, index) in rows" :key="index" @click.prevent="selectRow($event, index, row)">
            <td v-if="selectable" class="no-border">
              <custom-radio class="radio" :name="id" :options="[{ key: (index + 1), value: getDeep(row, selectable.radioLabelKey), checked: false }]"></custom-radio>
            </td>
            <slot name="row" :row="row"></slot>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="100%">
              <slot name="no-row-data"></slot>
            </td>
          </tr>
        </template>
    </tbody>

    <tfoot class="footer" :class="{selectable: selectable}">
      <template v-if="footers.length > 0">
        <tr>
          <td v-if="selectable">&nbsp;</td>
          <slot name="footers" :footers="footers"></slot>
        </tr>
      </template>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: 'custom-table',

  props: {
    headers: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    rows: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    footers: {
      type: Array,
      default () {
        return []
      },
      required: false
    },
    selectable: {
      type: Object,
      required: false,
      validator: value => {
        return value.hasOwnProperty('radioLabelKey')
      },
      note: 'determins whether or not to show the selecrable radio buttons in the table.\n' +
            '- radioLabelKey: sets the label on the radio button for screen readers and search engines.\n' +
            '- (radioLabelKey: references the object displayed on each table row)'
    }
  },
  data () {
    return {
      calculatedColumns: [],
      calculatedNumberOfColumns: 0
    }
  },
  computed: {
    id () {
      return this._uid + ''
    },
    columns () {
      return this.calculatedColumns
    },
    numberOfColumns () {
      return this.calculatedNumberOfColumns
    }
  },
  methods: {
    selectRow (event, index, row) {
      this.$el.getElementsByClassName('radio')[index].children[0].children[0].checked = true
      this.$emit('selected-row', index, row)
    },
    deselectAllRows () {
      for (const index in this.rows) {
        this.$el.getElementsByClassName('radio')[index].children[0].children[0].checked = false
      }
    },
    getDeep (object, string) {
      string = string.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
      string = string.replace(/^\./, '') // strip a leading dot
      let array = string.split('.')
      for (let i = 0; i < array.length; ++i) {
        let key = array[i]
        if (key in object) {
          object = object[key]
        } else {
          return
        }
      }
      return object
    },
    calculeteColumns () {
      this.calculatedColumns = (this.$el.getElementsByClassName('body')[0].children[0].cells)

      if (this.selectable) {
        this.calculatedNumberOfColumns = (this.$el.getElementsByClassName('body')[0].children[0].cells.length - 1)
      } else {
        this.calculatedNumberOfColumns = (this.$el.getElementsByClassName('body')[0].children[0].cells.length)
      }
    }
  },
  mounted () {
    this.calculeteColumns()
  },
  updated () {
    this.calculeteColumns()
  }
}
</script>

<style lang="scss" scoped>
  .custom-table {
    border-collapse: collapse;
    margin: 0;
    display: block;
    overflow-x: auto;

    tr {
      border-top: none;
    }

    th, td {
      border: none;
      padding: 1rem 1.6rem;
    }

    .columns {
      col:nth-child(even) {
        background-color: $grey900;
      }
      &.selectable {
        col:nth-child(odd) {
          background-color: $grey900;
        }
        col:nth-child(even) {
          background-color: transparent;
        }
        col:nth-child(1) {
          background-color: transparent;
          width: 6rem;
        }
      }
    }

    .header {
      th {
        color: $white;
        font-weight: 200;
        text-align: left;
      }
      th:nth-of-type(odd) {
        background-color: $grey500;
      }
      th:nth-of-type(even) {
        background-color: $grey400;
      }
      &.selectable {
        th:nth-child(odd) {
          background-color: $grey400;
        }
        th:nth-child(even) {
          background-color: $grey500;
        }
        th:nth-child(1) {
          background-color: $grey500;
        }
      }
    }

    .body {
      &:before {
        content: '@';
        display: block;
        line-height: .2rem;
        text-indent: -99999px;
      }
      color: $grey500;
      td {
        border-bottom: 2px solid $grey800;
      }
      tr:nth-child(n) {
        background-color: transparent;
      }
      &.selectable {
        tr {
          cursor: pointer;
        }
        .no-border {
          border-color: transparent !important;
          padding-right: 5rem;
        }
      }
    }

    .footer {
      tr {
        color: $grey500;
        font-weight: 600;
      }
    }

    /deep/ .custom-radio {
      margin: 0;
      .text {
        padding-top: 0.3rem;
        padding-bottom: 0;

        border: 0 !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        height: 1px !important;
        margin: -1px !important;
        overflow: hidden !important;
        padding: 0 !important;
        position: absolute !important;
        width: 1px !important;
        white-space: nowrap !important;
      }

      $radio-offset: -8px;
      .bg {
        top: calc(#{$radio-offset} - 5px);
      }
      .dot {
        top: $radio-offset;
      }
    }
 }
</style>

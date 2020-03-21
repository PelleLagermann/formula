const properties = {

  props: {
    'id': {
      type: String,
      required: false
    },
    'name': {
      type: String,
      required: true,
      default: ''
    },
    'placeholder': {
      type: String,
      required: false,
      default: ''
    },
    'css': {
      type: String,
      required: false,
      default: ''
    },
    'resx': {
      type: Object,
      required: false,
      default: () => {}
    },
    'disabled': {
      type: Boolean,
      required: false,
      default: false
    }
  }

}

export default properties

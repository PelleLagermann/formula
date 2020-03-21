const eventWrapper = {

  methods: {

    endpointDataModel (type = null, status = null, response = null, exception = null) {
      return {
        type,
        status,
        response,
        exception
      }
    },
    eventDataModel (event, data, errors = [], endpoint = null, eventName = null) {
      let evtName = eventName
      if (!evtName) {
        evtName = (event && event.target && event.target.name) ? event.target.name : null
      }

      return {
        event,
        name: evtName,
        value: data,
        errors: (errors && (errors instanceof Array) && errors.length) ? errors : [],
        endpoint
      }
    }

  }

}

export default eventWrapper

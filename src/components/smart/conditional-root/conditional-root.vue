<script>
export default {
  name: 'conditionalRoot',
  functional: true,
  props: ['show'],
  render (h, ctx) {
    const children = ctx.children.filter(vnode => vnode.tag) // remove unnecessary text nodes
    if (children.length !== 1) {
      // eslint-disable-next-line no-console
      console.warn('this component accepts only one root node in its slot')
    }
    if (ctx.props.show) {
      return children[0]
    } else {
      return children[0].children
    }
  }
}
</script>

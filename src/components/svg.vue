<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return `svg-icon${this.className}`
      } else {
        return 'svg-icon'
      }
    }
  }

}
</script>

<style scoped>
.svg-icon {
  width:0.6rem;
  height: 0.6rem;
  vertical-align: -0.15rem;
  fill:currentColor;
  overflow: hidden;
}

</style>

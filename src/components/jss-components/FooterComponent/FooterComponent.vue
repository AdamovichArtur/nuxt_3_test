<template>
  <footer class="footerComponent">
    <placeholder
      name="footer"
      :rendering="routeData"
    />
  </footer>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { RouteData, Placeholder } from '@sitecore-jss/sitecore-jss-vue'

const routeData: RouteData = inject('routeData')
</script>

<style lang="scss">
.footerComponent {
  width: 100%;
  color: get-color-var('white');

  > * {
    margin: auto;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  &__legalLinks {
    li:not(:last-child) {
      padding-right: 1rem;
      border-right: 0.1rem solid get-color-var('black');
      margin-right: 1rem;
    }
  }
  &__copyright {
    text-align: center;
    color: get-color-var('gray');
  }
}
</style>

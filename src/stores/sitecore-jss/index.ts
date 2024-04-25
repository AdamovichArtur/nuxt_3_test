import { defineStore } from 'pinia'

export const useSitecoreJssStore = defineStore('SitecoreJssStore', {
  state: () => ({
   sitecoreContext: {
      site: {},
      pageEditing: false
    },
    routeData: null,
    loading: false
  }),
  actions: {
    setSitecoreData(sitecoreData: any) {
      const route = sitecoreData.sitecore && sitecoreData.sitecore.route
      const context = (sitecoreData.sitecore && sitecoreData.sitecore.context) || {}

      // Do not replace the original state object - the store and any components that use the store
      // need to share a reference to the same object in order for mutations to be observed.
      this.routeData = route
      this.sitecoreContext = {
        ...context,
        routeName: route && route.name,
        itemId: route && route.itemId
      }
      this.setLoading(false);
    },
    setSitecoreSiteContext(site: any) {
      this.sitecoreContext.site = site
    },
    setLoading(state: boolean) {
        this.loading = state
    }
  }
})

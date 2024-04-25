import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('GlobalStore', {
  state: () => ({
    siteName: '',
    skin: 'wireframe',
    overlayFunctions: [],
    mainNavigation: {},
    myAccountLinks: {},
    loginEnabled: true, //TODO: Implement login
    customerServiceOpen: false,
    siteSettings: {},
    accountInfo: {
      isLoggedIn: false,
      user: {
        name: 'Jane Doe',
        email: 'janedoe@velux.com',
        password: '123'
      }
    },
    isShowHeadersProductTable: false
  }),
  actions: {
    setShowHeadersProductTable(state: boolean) {
      this.isShowHeadersProductTable = state
    },
    setSiteName(siteName: string) {
      this.siteName = siteName
    },
    setSkin(skin: string) {
      this.skin = skin
      //Cookies.set('skin', skin)
      //window.location.reload()
    },
    setMainNavigation(structure: Object) {
      this.mainNavigation = structure
    },
    setMyAccountLinks(structure: Object) {
      this.myAccountLinks = structure
    },
    showOverlay(callbackFn: Function) {
      this.overlayFunctions.push(callbackFn || function () {})
      // Body scrolling becomes deactivated
      document.body.classList.add('-noScroll')
    },
    overlayClickHandler() {
      const latestCloseFn = this.overlayFunctions.pop()
      if (typeof latestCloseFn === 'function') {
        latestCloseFn()
      }
      if (this.overlayFunctions.length == 0) {
        // Body scrolling becomes active
        document.body.classList.remove('-noScroll')
      }
    },
    isLoginEnabled() {
      return this.loginEnabled
    },
    isUserLoggedIn() {
      return this.accountInfo.isLoggedIn
    },
    customerServiceOpen() {
      return true
    },
    setSiteSettings(siteSettings) {
      this.siteSettings = siteSettings
      this.init()
    },
    init() {
      //Set shop openingHours
      const shopOpen = () => {
        let shopOpen = [] //openingHours H M
        let shopClose = [] //closingHours H M

        if (
          this.siteSettings.generalSettings.ShopOpensUTC?.value &&
          this.siteSettings.generalSettings.ShopClosesUTC?.value
        ) {
          shopOpen = this.siteSettings.generalSettings.ShopOpensUTC.value.split(':')
          shopClose = this.siteSettings.generalSettings.ShopClosesUTC.value.split(':')
          const now = new Date()
          const dayToday = now.toLocaleString('en-us', { weekday: 'long' }).toLowerCase()

          const closeDate = new Date()
          closeDate.setUTCHours(shopClose[0])
          closeDate.setUTCMinutes(shopClose[1])
          closeDate.setUTCSeconds(0)

          const openDate = new Date()
          openDate.setUTCHours(shopOpen[0])
          openDate.setUTCMinutes(shopOpen[1])
          openDate.setUTCSeconds(0)

          if (
            now < closeDate &&
            now > openDate &&
            this.siteSettings.generalSettings.ShopOpenDays.value.filter((e) => {
              return e == dayToday
            }).length > 0
          ) {
            return true
          }

          return false
        }

        return false
      }

      this.customerServiceOpen = shopOpen()
    }
  }
})

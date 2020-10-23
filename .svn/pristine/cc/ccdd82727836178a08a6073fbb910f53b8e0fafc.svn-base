export default {
  'IS_SHOW_POPUP': {
    computed: {
      isChangePropsState:{
        get() {
          return this.$store.state.isChangePropsState
        },
        set(value) {
          this.$store.dispatch('setPropsState', value)
        }
      },
      isShowMaskerPopup: {
        get() {
          return this.$store.state.isPopupPage.masker
        },
        set(value) {
          this.$store.dispatch('setPopuppageMasker', value)
        }
      },
      isShowFirstPopup: {
        get() {
          return this.$store.state.isPopupPage.first
        },
        set(value) {
          this.$store.dispatch('setPopuppageFirst', value)
        }
      },
      isShowSecPopup: {
        get() {
          return this.$store.state.isPopupPage.second
        },
        set(value) {
          this.$store.dispatch('setPopuppageSecond', value)
        }
      },
      isShowThirdPopup: {
        get() {
          return this.$store.state.isPopupPage.third
        },
        set(value) {
          this.$store.dispatch('setPopuppageThird', value)
        }
      },
      isShowFourPopup: {
        get() {
          return this.$store.state.isPopupPage.fourth
        },
        set(value) {
          this.$store.dispatch('setPopuppageFourth', value)
        }
      },
      isShowFivePopup: {
        get() {
          return this.$store.state.isPopupPage.fifth
        },
        set(value) {
          this.$store.dispatch('setPopuppageFifth', value)
        }
      },
    },
    destroyed(){
      this.isShowMaskerPopup = false;
      this.isShowFirstPopup = false
      this.isShowSecPopup = false;
      this.isShowThirdPopup = false
      this.isShowFourPopup = false
      this.isShowFivePopup = false;
      this.isChangePropsState = false;
    },
  },
  'BEFORE_ROUTE_LEAVE': {
    beforeRouteLeave(to, from, next) {
      if (this.isShowFivePopup) {
        this.isShowFivePopup = false;
        next(false);
      } else if (this.isShowFourPopup) {
        this.isShowFourPopup = false;
        next(false);
      } else if (this.isShowThirdPopup) {
        this.isShowThirdPopup = false;
        next(false);
      } else if (this.isShowSecPopup) {
        this.isShowSecPopup = false;
        next(false);
      } else if (this.isShowFirstPopup) {
        this.isShowFirstPopup = false;
        next(false);
      } else {
        next();
      }
    },
  },

}

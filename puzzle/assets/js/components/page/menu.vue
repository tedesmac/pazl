<template>
  <nav class="__puzzle_menu">
    <a>
      <FontAwesomeIcon
        class="__pazl_menu_icon"
        :icon="faBars"
        @click="show = true"
      />
    </a>

    <a class="__puzzle_logo" href="/" :style="logoStyle" />

    <div>
      <a>
        <FontAwesomeIcon class="__pazl_social_icon" :icon="faFacebookF" />
      </a>

      <a>
        <FontAwesomeIcon class="__pazl_social_icon" :icon="faInstagram" />
      </a>

      <a>
        <FontAwesomeIcon class="__pazl_social_icon" :icon="faTwitter" />
      </a>
    </div>

    <div v-if="show" class="__pazl_nav_background" @click="show = false" />

    <nav class="__pazl_nav" :style="menuStyle">
      <div>
        <a>
          <FontAwesomeIcon
            class="__pazl_menu_close"
            :icon="faTimes"
            @click="show = false"
          />
        </a>
      </div>

      <router-link to="/">Home</router-link>

      <router-link v-for="page in pages" :key="page.path" :to="page.path">
        {{ $utils.capitalize(page.name) }}
      </router-link>

      <div class="__pazl_nav_spacer"></div>

      <hr />

      <div class="__pazl_nav_social">
        <a>
          <FontAwesomeIcon class="__pazl_social_icon" :icon="faFacebookF" />
        </a>

        <a>
          <FontAwesomeIcon class="__pazl_social_icon" :icon="faInstagram" />
        </a>

        <a>
          <FontAwesomeIcon class="__pazl_social_icon" :icon="faTwitter" />
        </a>
      </div>

      <div class="__pazl_powered">
        <a href="http://pazl.io">Powered by Pazl</a>
      </div>
    </nav>
  </nav>
</template>

<script>
import { LogoMixin } from '@/components/mixins'
import { buildMenu } from '@/utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { mapState } from 'vuex'

export default {
  mixins: [LogoMixin],

  components: { FontAwesomeIcon },

  data() {
    return {
      show: false,
    }
  },

  computed: {
    menuStyle() {
      if (this.show) {
        return {
          boxShadow: '0 5px 5px 5px #cecece',
          transform: 'translateX(0)',
        }
      }
      return {}
    },

    faBars: () => faBars,

    faFacebookF: () => faFacebookF,

    faInstagram: () => faInstagram,

    faTimes: () => faTimes,

    faTwitter: () => faTwitter,

    ...mapState({
      pages: state => state.pages.filter(p => p.id !== state.site.home_page),
    }),
  },
}
</script>

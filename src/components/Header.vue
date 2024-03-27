<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          class="nav-link" 
          :class="{active : isMatch(nav.path)}"
          active-class="active">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      @click="toAbout"
      class="user">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import Logo from '~/components/Logo';
import { mapState } from 'vuex';

export default {
    components: {
        Logo,
        RouterLink
    },

    data() {
        return {
            navigations:
            [
                {
                    name : 'Search',
                    href : '/'
                },
                {
                    name : 'Movie',
                    href : '/movie/tt4520988',
                    path : /^\/movie/
                },
                {
                    name : 'About',
                    href : '/about'
                },
            ]
        }
    },
    computed : {
      ...mapState('about', [
        'image',
        'name'
      ]),
    },

    methods : {
      isMatch(path){
        if(!path) return false

        console.log(this.$route)
        return path.test(this.$route.fullPath)
      },
      toAbout (){
        this.$router.push('/about')
      }
    }
}
</script>

<style lang="scss" scoped>

header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo{
        margin-right: 40px;
    }
    .user {
      width : 40px;
      height : 40px;
      padding : 3px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      cursor : pointer;
      position : absolute;
      top: 0;
      bottom : 0;
      right : 40px;
      margin : auto;
      transition: .4s;
      &:hover {
        background-color: darken($gray-200, 10%);
      }
      img {
        height : 100%;
        width : 100%;
        border-radius: 50%;
      }
    }
    @include media-breakpoint-down(sm) {
      .nav{
        display:none;
      }
    }
}

</style>
<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        v-else
        :src="image"
        alt="" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>
      email
    </div>
    <a :href="blog">{{ blog }}</a>
    <div>
      {{ phone }}
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
import { mapState } from 'vuex'

export default {
  components : {
    Loader
  },

  data () {
    return {
      imageLoading : true
    }
  }
  ,
  computed : {
    ...mapState('about', [
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ])
    // image () {
    //   return this.$store.state.about.image
    // },
    // name (){
    //   return this.$store.state.about.name
    // },
    // email () {
    //   return this.$store.state.about.email
    // },
    // blog () {
    //   return this.$store.state.about.blog
    // },
    // phone (){
    //   return this.$store.state.about.phone
    // }
  },
  mounted () {
    this.init()
  },
  methods : {
    async init () {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>

.about{
  text-align : center;
  .photo {
    position : relative;
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding : 0px;
    border : 10px solid $gray-300;
    border-radius: 50%;
    box-sizing : border-box;
    background-color: $gray-200;
  

    img {
      width : 100%;
      height : 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size : 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
</style>
<template>
  <div class="container">
    <input
      v-model="title" 
      class="form-control"
      type="text" 
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />

    <!-- <select v-for="filtered in filters" class="form-select" :key="filtered.name" aria-label="Default select example">
            <option v-for="item in filtered.items" :key="item">
                {{ item }}
            </option>
        </select> -->
    <div class="selects">
      <select
        v-for="filter in filters"
        :key="filter.name"
        class="form-select"
        v-model="$data[filter.name]">
        <!-- $data.type => type을 동적으로 변경해야됨. $data[" String_data "]-->
        <option
          value=""
          v-if="filter.name === 'year'">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>

    export default{
        data(){
            return{
                title : '',
                type : 'movie',
                number: 10,
                year: '',
                filters: [
                    {
                        name: 'type',
                        items: ['movie', 'series', 'episode']
                    },
                    {
                        name: 'number',
                        items: [10, 20, 30]
                    },
                    {
                        name : 'year',
                        items: (() => {
                            const years = []
                            const thisYear = new Date().getFullYear() // 2024
                            
                            for(let i= thisYear; i>=1985; i -= 1){
                                years.push(i)
                            }

                            return years
                        })()
                    }
                ]
            }
        },
        methods : {
            async apply (){
                // mutation 실행 시에는 commit, actions 실행 시에는 .dispatch 사용
                this.$store.dispatch('movie/searchMovies', {
                    title: this.title,
                    type : this.type,
                    number: this.number,
                    year: this.year
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    font-size: 15px;
    > * {
      margin-right:  10px;
      &:last-child {
        margin-right: 0;
      }
    }
    .selects{
        display: flex;
        select{
            width: 120px;
            margin-right: 10px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
    .btn {
        width: 120px;
        height: 50px;
        font-weight: 700;
        flex-shrink: 0;
    }
}
</style>
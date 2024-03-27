import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
    // store에서, 모듈화돼서 사용될 수 있다.
    namespaced : true,
    // data! -> 취급해야되는
    state: () => ({
        movies : [],
        message : _defaultMessage,
        loading : false,
        theMovie : {}
    }),
    // vue js의 computed처럼, 계산된 속성을 만들어내는
    getters: {
        movieIds(state){
            return state.movies.map(m => m.imdbID)
        }
    },
    // methods!!
    // store에 있는 데이터들은, mutations안에서만 변경될 수 있음
    mutations: {
        updateState(state, payload){
            // ['movies', 'message', 'loading']
            // parameter 속성 이름들만 가지고, 새로운 배열을 만들어줌
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },

    // 비동기
    actions: {
        async searchMovies({commit, state} , payload){
            /**
             * 중복 요청 처리
             */
            if(state.loading){
              return
            }
            
            commit('updateState',{
              loading : true,
              message : ''
            })

            try{
                // Search
              //console.log("apply btn checking")
              
              const res = await _fetchMovie({
                ...payload,
                page : 1
              })

              const { Search, totalResults } = res.data

              commit('updateState', {
                  movies: _uniqBy(Search, 'imdbID')
              })

              console.log(totalResults)
              console.log(typeof totalResults) // String

              const total = parseInt(totalResults, 10)
              const pageLength = Math.ceil(total / 10)

              // 추가 요청!

              if(pageLength > 1){
                  for(let page = 2; page <= pageLength; page += 1){
                      if(page > payload.number / 10){
                          break
                      }

                      const res = await _fetchMovie({
                        ...payload,
                        page
                      })

                      const { Search } = res.data

                      commit('updateState',{
                          movies: [
                              ...state.movies, 
                              ..._uniqBy(Search, 'imdbID')
                          ]
                      })
                  }
              }
            } catch(message){
              commit('updateState', {
                movies: [],
                message
              })
            } finally{
              commit('updateState', {
                loading : false
              })
            }
        },
        async searchMovieWithId({state, commit}, payload) {
          if(state.loading){
            return
          }

          commit('updateState', {
            theMovie : {},
            loading : true
          })

          try{
            console.log("called ? ")
            const res = await _fetchMovie(payload)
            commit('updateState', {
              theMovie : res.data
            })
          } catch(error){
            commit('updateState', {
              theMoive : {}
            })
          } finally {
            commit('updateState', {
              loading : false
            })
          }
        }
    }
}

function _fetchMovie(payload){
    const {title, type, year, page, id} = payload

    const OMDB_API_KEY = '7035c60c'
    const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    
     
    return new Promise((resolve, reject) => {
        axios.get(url)
          .then((res) => {
            if(res.data.Error){
              reject(res.data.Error)
            }
            console.log(res)
            resolve(res)
          })
          .catch((err) => {
            reject(err.message)
          })
    })
}
const state = {
  token: localStorage.getItem('token') || '',
  userInfo: {
    username: '',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  }
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    localStorage.setItem('token', token)
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = {
      ...state.userInfo,
      ...userInfo
    };
  }
};

const actions = {
  login({ commit }) {  
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('SET_TOKEN', 'mock_token')
        // 模拟获取用户信息
        const userData = { username: 'admin', avatar: '' }
        commit('SET_USER_INFO', userData)
        resolve()
      }, 500)
    })
  },

  fetchUserInfo({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const userData = { username: 'admin', avatar: '' }
        commit('SET_USER_INFO', userData)
        resolve()
      }, 300)
    })
  },
  
  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_USER_INFO', null)
    localStorage.removeItem('token')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
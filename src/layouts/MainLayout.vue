<template>
  <el-container class="main-container">
    <el-aside width="200px">
      <div class="logo-container">
        <span>iOS管理系统</span>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        class="nav-menu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/users">用户列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header-bar">
        <div class="header-title">iOS设备管理系统</div>
        <el-dropdown class="user-menu" @command="handleCommand">
          <div class="user-info">
            <el-avatar :size="32" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            <span class="username">{{ userInfo?.username || '管理员' }}</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">用户中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view />
        <user-profile-dialog 
          :visible.sync="dialogVisible"
          :user-info="userInfo"
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex';

import UserProfileDialog from '@/components/UserProfileDialog';

export default {
  name: 'MainLayout',
  computed: {
    ...mapState('user', ['userInfo'])
  },
  created() {
    this.$store.dispatch('user/fetchUserInfo');
  },
  components: {
    UserProfileDialog
  },
  data() {
    return {
      dialogVisible: false,
      profileVisible: false
    }
  },
  methods: {
    showUserProfile() {
      this.dialogVisible = true;
    },
    handleCommand(command) {
      if (command === 'profile') {
        this.dialogVisible = true
      } else if (command === 'logout') {
        this.$store.dispatch('user/logout')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  height: 100vh;
  .logo-container {
    height: 60px;
    background: #2b2f3a;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
  }

  .nav-menu {
    border-right: none;
    height: calc(100vh - 60px);
  }

  .header-bar {
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .header-title {
      font-size: 20px;
      color: #303133;
    }

    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      .username {
        margin: 0 8px;
        color: #606266;
      }
    }
  }

  .el-main {
    background: #f0f2f5;
    padding: 20px;
  }
}
</style>
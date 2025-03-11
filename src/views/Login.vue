<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="title">iOS 系统登录</h2>
      <el-form-item label="账号">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" class="submit-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin$123'
      }
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('user/login', this.form)
        .then(() => {
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/element-variables.scss';
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;

  .login-form {
    width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

    .title {
      text-align: center;
      margin-bottom: 30px;
      color: #007AFF;
    }

    .submit-btn {
      width: 100%;
    }
  }
  ::v-deep .el-input__suffix {
    .el-input__icon {
      color: $--color-primary;
    }
  }
}
</style>
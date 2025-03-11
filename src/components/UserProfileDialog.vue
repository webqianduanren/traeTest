<template>
  <el-dialog
    title="用户信息"
    :value="visible"
    width="30%"
    @close="handleClose"
    @input="val => $emit('update:visible', val)"
  >
    <el-form label-width="80px">
      <el-form-item label="用户头像">
        <el-avatar :size="60" :src="userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"/>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="localUserInfo.username" disabled/>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" type="password" show-password/>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.confirmPassword" type="password" show-password/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">修改密码</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    userInfo: {
      type: Object,
      default: () => ({
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      })
    }
  },
  computed: {
    localUserInfo() {
      return { 
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        ...this.userInfo 
      };
    }
  },
  data() {
    return {
      form: {
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleSubmit() {
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.$message.error('两次输入密码不一致！')
        return
      }
      // TODO: 调用修改密码接口
      this.$message.success('密码修改成功')
      this.handleClose()
    }
  }    
}
</script>
   
<style scoped>
.el-form-item {
  margin-bottom: 22px;
}
</style>
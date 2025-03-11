<template>
  <div class="about-container">
    <h1>关于iOS管理系统</h1>
    <el-card class="info-card">
      <div slot="header">系统信息</div>
      <p>版本号：1.0.0</p>
      <p>技术支持：XX科技有限公司</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-container {
  padding: 20px;
}
.info-card {
  margin-top: 20px;
}
</style>
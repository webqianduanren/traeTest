<template>
  <div class="home-container">
    <h1>欢迎使用iOS管理系统</h1>
    <el-card class="info-card">
      <div slot="header">系统功能</div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-user" @click="goToUsers">用户管理</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="success" icon="el-icon-s-goods" @click="goToDevices">设备管理</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="warning" icon="el-icon-document" @click="goToRecords">操作记录</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    goToUsers() {
      this.$router.push("/users");
    },
    goToDevices() {
      this.$router.push("/devices");
    },
    goToRecords() {
      this.$router.push("/records");
    },
  },
};
</script>

<style scoped>
.home-container {
  padding: 20px;
}
.info-card {
  margin-top: 20px;
}
.el-col {
  text-align: center;
}
</style>
<template>
  <base-dialog
    title="用户信息"
    :visible="visible"
    width="30%"
    @close="handleClose"
    @update:visible="val => $emit('update:visible', val)"
    @confirm="handleSubmit"
    @cancel="handleClose"
  >
    <el-form label-width="80px">
      <el-form-item label="用户头像">
        <el-upload
          class="avatar-uploader"
          action="/api/upload" 
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="customUpload"
        >
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="avatar-tip">点击图片可更换头像</div>
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
    </el-form>
  </base-dialog>
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
      },
      avatarUrl: '',
      isAvatarChanged: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        // 当弹窗显示时，初始化头像URL
        this.avatarUrl = this.userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
        this.isAvatarChanged = false;
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
      
      // 构建提交的数据
      const submitData = {};
      
      // 如果修改了头像
      if (this.isAvatarChanged) {
        submitData.avatar = this.avatarUrl;
      }
      
      // 如果修改了密码
      if (this.form.newPassword) {
        submitData.newPassword = this.form.newPassword;
      }
      
      // 如果没有任何修改，直接关闭弹窗
      if (Object.keys(submitData).length === 0) {
        this.handleClose();
        return;
      }
      
      // TODO: 调用修改用户信息接口
      console.log('提交的数据:', submitData);
      
      this.$message.success('用户信息修改成功');
      this.handleClose();
    },
    handleAvatarSuccess(res, file) {
      // 上传成功后的回调
      this.avatarUrl = res.data.url; // 假设后端返回的数据格式为 {data: {url: '图片地址'}}
      this.isAvatarChanged = true;
      console.log('上传的文件信息:', file);
    },
    beforeAvatarUpload(file) {
      // 上传前的验证
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    customUpload(options) {
      // 自定义上传方法，用于演示或开发环境
      // 在实际项目中，这里应该调用真实的上传API
      const { file, onSuccess } = options;
      
      // 模拟上传过程
      setTimeout(() => {
        // 创建一个本地的临时URL用于预览
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const url = reader.result;
          this.avatarUrl = url;
          this.isAvatarChanged = true;
          
          // 模拟上传成功的回调
          onSuccess({ data: { url } });
        };
      }, 300);
    }
  }    
}
</script>
   
<style scoped>
.el-form-item {
  margin-bottom: 22px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 30px;
  height: 30px;
  display: inline-block;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 16px;
  color: #8c939d;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.avatar {
  width: 30px;
  height: 30px;
  display: block;
  object-fit: cover;
}

.avatar-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}
</style>
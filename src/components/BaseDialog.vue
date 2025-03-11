<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :width="width"
    :fullscreen="fullscreen"
    :top="top"
    :modal="modal"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :before-close="beforeClose"
    :center="center"
    :destroy-on-close="destroyOnClose"
    @close="handleClose"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @closed="$emit('closed')"
    @input="val => $emit('update:visible', val)"
  >
    <slot></slot>
    <template #footer v-if="$slots.footer || showFooter">
      <slot name="footer">
        <div class="dialog-footer">
          <el-button @click="handleCancel">{{ cancelButtonText }}</el-button>
          <el-button type="primary" @click="handleConfirm">{{ confirmButtonText }}</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    // 控制对话框是否可见
    visible: {
      type: Boolean,
      default: false
    },
    // 对话框标题
    title: {
      type: String,
      default: ''
    },
    // 对话框宽度
    width: {
      type: String,
      default: '50%'
    },
    // 是否为全屏对话框
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 对话框 CSS 中的 margin-top 值
    top: {
      type: String,
      default: '15vh'
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    // 是否将对话框插入至 body 元素上
    appendToBody: {
      type: Boolean,
      default: false
    },
    // 是否在 Dialog 出现时将 body 滚动锁定
    lockScroll: {
      type: Boolean,
      default: true
    },
    // Dialog 的自定义类名
    customClass: {
      type: String,
      default: ''
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    // 是否可以通过按下 ESC 关闭 Dialog
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 关闭前的回调，会暂停 Dialog 的关闭
    beforeClose: {
      type: Function,
      default: null
    },
    // 是否对头部和底部采用居中布局
    center: {
      type: Boolean,
      default: false
    },
    // 关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    // 是否显示底部按钮
    showFooter: {
      type: Boolean,
      default: true
    },
    // 确认按钮文本
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    // 取消按钮文本
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    // 点击确认按钮时的回调
    onConfirm: {
      type: Function,
      default: null
    },
    // 点击取消按钮时的回调
    onCancel: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    handleConfirm() {
      if (this.onConfirm) {
        this.onConfirm();
      } else {
        this.$emit('confirm');
      }
    },
    handleCancel() {
      if (this.onCancel) {
        this.onCancel();
      } else {
        this.$emit('cancel');
        this.handleClose();
      }
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style> 
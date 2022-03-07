<template>
  <div class="toast" v-show="show">{{ message }}</div>
</template>

<script>
export default {
  name: "toast",
  props: {
    message: {
      type: String,
      default: "",
    },
    show:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    
  }
};


</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.65);
  width: 250px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 28px;
}
</style>
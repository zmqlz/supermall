// 创建事件总线,使$on,$off,&emit生效

import mitt from "mitt";
const bus = {};
const emitter = mitt();
bus.$on = emitter.on;
bus.$off = emitter.off;
bus.$emit = emitter.emit;

export default bus
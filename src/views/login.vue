<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="">
    </div>
    <inputGroup
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    />
    <inputGroup
      type="number"
      v-model="veritifyCode"
      placeholder="验证码"
      :error="errors.code"
    />
    <!-- 用户服务协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick" @click="handleLogin"> 登录</button>
    </div>
  </div>
</template>

<script>
import inputGroup from '../components/inputGroup'
import { setInterval } from 'timers';
export default {
  name: 'login',
  data() {
    return {
      phone: '',
      btnTitle: '获取验证码',
      veritifyCode: '',
      disabled: false,
      errors: {}
    };
  },
  methods: {
    handleLogin () {
      this.errors = {}
      // this.$http
      // .post('/api/posts/sms_back', {
      //   phone: this.phone,
      //   veritifyCode: this.veritifyCode
      // })
      // .then(res => {
      //   localStorage.setItem('ele_login', true)
      //   this.$router.push('/')
      // })
      // .catch(err => {
      //   this.errors = {
      //     code: err.response.data.msg
      //   }
      // })
      this.$router.push('/')
      localStorage.setItem('ele_login', true)
    },
    getVerifyCode () {  
      if(this.validatePhone()) {
        this.validateBtn()
        // 发送网络请求
        this.$http
        .post("/api/posts/sms_send", {
          tpl_id: "154758",
          key: "65e1ba25da720f700d1f2590daaaab0f",
          phone: this.phone
        })
        .then(res => {
          // console.log(res);
        });
      }
    },
    validateBtn () {
      let time = 60
      let timer = setInterval(()=>{
        if(time === 0) {
          clearInterval(timer);
          this.btnTitle = '获取验证码'
          this.disabled = false
        } else {
          this.btnTitle = time + '秒后重试'
          this.disabled =  true
          time--
        }
      },1000)
    },
    validatePhone () {
      if (!this.phone) {
        this.errors = {
          phone: '请输入手机号'
        }
        return false
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: '请输入正确手机号'
        }
        return false
      } else {
        this.errors = {}
        return true
      }
    }
  },
  computed: {
    isClick () {
      if (!this.phone || !this.veritifyCode) {
        return true
      } else return false
    }
  },
  components: {
    inputGroup
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>
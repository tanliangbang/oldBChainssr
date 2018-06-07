import Tool from './Tool'
const FormFun = {}

FormFun.sendCodeed = function (_this, currNode) {
  let number = 60
  currNode.innerHTML = _this.$t('lang.form.send') + '(' + number + 's)'
  let cuntDown = setInterval(function () {
    if (number <= 0) {
      currNode.innerHTML = _this.$t('lang.form.getCode')
      clearInterval(cuntDown)
    } else {
      number = --number
      currNode.innerHTML = _this.$t('lang.form.sended') + '(' + number + 's)'
    }
  }, 1000)
}

FormFun.showDel = function (_this, field) {
  _this.rules[field].class = 'del'
  _this.rules[field].message = ''
}

FormFun.delContent = function (_this, field) {
  _this.registForm[field] = ''
}

FormFun.checkPhone = function (_this, bool) {
  if (_this.form.phone === '') {
    if (!bool) {
      _this.rules.phone.class = 'del'
      _this.rules.phone.message = _this.$t('lang.form.phonePrompt')
    }
    return false
  }
  if (!Tool.isPoneAvailable(_this.form.phone)) {
    if (!bool) {
      _this.rules.phone.class = 'del'
      _this.rules.phone.message = _this.$t('lang.form.phoneError')
    }
    return false
  } else {
    _this.rules.phone.class = 'pass'
    _this.rules.phone.message = ''
    return true
  }
}

FormFun.checkPhoneCode = function (_this, bool) {
  if (!_this.isSendCode) {
    if (!bool) {
      _this.rules.code.class = 'del'
      _this.rules.code.message = _this.$t('lang.form.codePrompt')
    }
    return false
  }
  if (_this.form.code === '') {
    if (!bool) {
      _this.rules.code.class = 'del'
      _this.rules.code.message = _this.$t('lang.form.codePrompt')
    }
    return false
  } else {
    _this.rules.code.class = 'pass'
    _this.rules.code.message = ''
    return true
  }
}

FormFun.checkPass = function (_this, bool) {
  let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)
  if (_this.form.password === '') {
    if (!bool) {
      _this.rules.password.class = 'del'
      _this.rules.password.message = _this.$t('lang.form.passPrompt')
    }
    return false
  } else if (_this.form.password.length < 6) {
    if (!bool) {
      _this.rules.password.class = 'del'
      _this.rules.password.message = _this.$t('lang.form.passLast6')
    }
    return false
  } else if (!reg.test(_this.form.password)) {
    if (!bool) {
      _this.rules.password.class = 'del'
      _this.rules.password.message = _this.$t('lang.form.numberAndLetter')
    }
    return false
  } else {
    _this.rules.password.class = 'pass'
    _this.rules.password.message = ''
    return true
  }
}

FormFun.checkRePass = function (_this, bool) {
  if (_this.form.repassword === '') {
    if (!bool) {
      _this.rules.repassword.class = 'del'
      _this.rules.repassword.message = _this.$t('lang.form.repassPrompt')
    }
    return false
  } else if (_this.form.password !== _this.form.repassword) {
    if (!bool) {
      _this.rules.repassword.class = 'del'
      _this.rules.repassword.message = _this.$t('lang.form.passInconsistent')
    }
    return false
  } else {
    _this.rules.repassword.class = 'pass'
    _this.rules.repassword.message = ''
    return true
  }
}

export default FormFun
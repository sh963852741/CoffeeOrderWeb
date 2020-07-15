let rules = {
    login: {
        userName: [
            {required: true, message: "必须填写用户名", trigger: "blur"}
        ],
        password: [
            {required: true, message: "必须填写密码", trigger: "blur"}
        ]
    },
    regist: {
        userName: [
            {required: true,type: 'string', min: 2, message: "用户名不得少于2字符", trigger: "blur"}
        ],
        password: [
            {required: true, type: 'string', min: 6, message: "密码长度不得少于6字符", trigger: "blur"}
        ],
        telephone: [
            {type: 'string', pattern: /^1[34578]\d{9}$/, message: "电话号码格式不正确", trigger: "blur"}
        ],
        email: [
            {type: 'email', message: "电子邮箱格式不正确", trigger: "blur"}
        ]
    }
}


export default rules
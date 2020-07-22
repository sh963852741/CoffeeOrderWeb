let rules = {
    login: {
        userName: [
            { required: true, message: "必须填写用户名", trigger: "blur" }
        ],
        password: [
            { required: true, message: "必须填写密码", trigger: "blur" }
        ]
    },
    loginByMobile: {
        phoneNumber: [
            { required: true, message: "必须填写联系电话", trigger: "blur" }
        ],
        verificationCode: [
            { required: true, message: "必须输入验证码", trigger: "blur" }
        ]
    },
    regist: {
        userName: [
            { required: true, type: 'string', min: 2, message: "用户名不得少于2字符", trigger: "blur" }
        ],
        password: [
            { required: true, type: 'string', min: 6, message: "密码长度不得少于6字符", trigger: "blur" }
        ],
        telephone: [
            { required: true, type: 'string', pattern: /^1[34578]\d{9}$/, message: "电话号码格式不正确", trigger: "blur" }
        ],
        email: [
            { type: 'email', message: "电子邮箱格式不正确", trigger: "blur" }
        ]
    },
    createMeal: {
        mealName: [
            { required: true, type: 'string', min: 2, message: "餐点名称不得少于1字符", trigger: "blur" }
        ],
        type: [
            { required: true, message: "请选择餐点类型", trigger: "blur" }
        ],
        price: [
            { required: true, type: 'number', message: "价格不能为空", trigger: "blur" },
            { type: 'number', min: 0, message: "应输入数字，最小值应为0", trigger: "blur" }
        ],
        amount: [
            { required: true, type: 'integer', message: "库存数量不能为空", trigger: "blur" },
            { type: 'integer', min: 0, message: "应输入整数，最小值应为0", trigger: "blur" }
        ],
        mealDetail: [
            { required: true, type: "string", message: "请输入餐点描述" }
        ],
    },
    createAddr: {
        receiver: [
            { required: true, type: 'string', min: 1, message: "请输入姓名", trigger: "blur" }
        ],
        telephone: [
            { required: true, message: "手机号不可为空", trigger: "blur" },
            { type: 'string', pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        provence: [
            { required: true, type: 'string', message: "省份不能为空", trigger: "blur" },
        ],
        city: [
            { required: true, type: 'string', message: "城市不能为空", trigger: "blur" },
        ],
        street: [
            { required: true, type: "string", message: "街道不能为空", trigger: "blur" }
        ],
        address: [
            { required: true, type: "string", message: "具体地址不能为空", trigger: "blur" }
        ],
    },
    forgotPwd: {
        userName: [
            { required: true, message: "必须填写用户名", trigger: "blur" }
        ],
        mobile: [
            { required: true, message: "手机号不可为空", trigger: "blur" },
            { type: 'string', pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        password: [
            { required: true, message: "必须填写密码", trigger: "blur" }
        ],
        verify: [
            { required: true, message: "必须填写验证码", trigger: "blur" }
        ]
    }
}


export default rules
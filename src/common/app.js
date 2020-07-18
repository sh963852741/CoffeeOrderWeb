let appSetting = {
    loginSettings: {
        rememberPwd: false,
        username: "",
        password: ""
    }
}
/* 查找是否记住密码 */
let loginSettings = JSON.parse(localStorage.getItem("loginSettings"));
if(loginSettings){
    appSetting.loginSettings = loginSettings;
}
export default appSetting;
// 配置axios基地址
axios.defaults.baseURL = 'https://hmajax.itheima.net'

// 添加请求拦截器---统一处理token
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config,0)
    // 可以通过headers 查看+设置请求头
    // 每次发送请求，都会执行这个回调函数
    const token =localStorage.getItem('token')
    if(token){
        config.headers['Authorization'] = token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


  // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx范围内的状态码都会触发此回调函数
    console.log(response,"response")
    // 对响应数据做点什么  比如数据剥离
    return response.data;
  }, function (error) {
    // 超出2xx范围的状态码都会触发此回调函数
    console.log(error,"error")
    // 统一处理token失效
    if(error.response.status === 401){
        console.log("token失效")
            // 删除缓存 并提示用户 
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            showToast('请重新登录')
            setTimeout(()=>{
                location.href = 'login.html'
            },1000)
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 抽取轻提示函数
function showToast(msg){
    const toastDom = document.querySelector('#myToast')
    console.log(toastDom)
    // 实例化toast组件
    const toast = new bootstrap.Toast(toastDom)
    // 修改内容并提示
    document.querySelector('.toast-body').innerText = msg
    toast.show()
}

// showToast("hello 大家好")

// 抽取校验函数(判断是否登录)
function checkLogin(){
    // 判断token
    const token =localStorage.getItem('token')
    // console.log(token)
    // token为null说明没有缓存
    if(token === null){
        showToast("请先登录")
        setTimeout(()=>{
              location.href = "login.html"
        },1000)
    }
}

// 用户名渲染
function renderUsername(){
    // 读取并渲染用户名
    const username= localStorage.getItem('username')
    console.log(username)
    document.querySelector("#user").innerText= username
}

// 抽取退出登录函数
function registerLoginout(){
    // 绑定点击事件
    document.querySelector("#logout").addEventListener('click',function(){
        // 删除缓存并跳转登录页
        localStorage.removeItem('username')
        localStorage.removeItem('token')

        location.href = 'login.html'
    })
}
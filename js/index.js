// 调用判断是否登录
checkLogin()

// 用户名渲染
renderUsername()

// 退出登录
registerLoginout()

// 渲染统计数据
function renderOverview(overview){
    Object.keys(overview).forEach(key=>{
        document.querySelector(`.${key}`).innerText = overview[key]
    })
}

// 首页---统计数据
async function  getData(){
    // 读取缓存中的token
    const token = localStorage.getItem('token')
    try{
         // 调用接口
            const res = await  axios({
                url:"/dashboard",
                
        })
        console.log(res,"hello")
        const {groupData,overview,provinceData,salaryData,year} = res.data
        // 渲染数据
        renderOverview(overview)
    }catch(err){
        // //    console.dir(err)
        // // 判断token失效 状态码401， token过期，token被篡改
        // if(err.response.status === 401){
        //     console.log("token失效")
        //     // 删除缓存 并提示用户 
        //     localStorage.removeItem('username')
        //     localStorage.removeItem('token')
        //     showToast('请重新登录')
        //     // setTimeout(()=>{
        //     //     location.href = 'login.html'
        //     // },1000)
        // }
    }
}

getData()
// 测试配置结果
// document.querySelector('#btn-register').addEventListener('click',()=>{
//     axios({
//         url:"/register",
//         method:"post",
//         data:{
//             username:"dlxt1234",
//             password:"123456"
//         }
//     })
// })


/* 
 用户注册
 1.收集并校验数据
 2.数据提交
*/
document.querySelector('#btn-register').addEventListener('click',async ()=>{
    // 1.收集并校验数据
    const form = document.querySelector('.register-form')
    const data = serialize(form,{empty:true,hash:true})
    // console.log(data)
    const {username,password} = data
    // 非空校验
    if(username === ''|| password ===''){
        showToast("用户名和密码不能为空")
        return
    }
    // 长度校验
    if(username.length < 8 || username.length > 30 ||password.length < 6|| password.length > 30){
        showToast('用户名的长度为8-30，密码的长度为6-30')
        return
    }
    // 提交功能柜
    // axios({
    //     url:"/register",
    //     method:'POST',
    //     data
    // })
    // 简化写法 .post请求方法  参数1 请求url 参数2 提交数据
     try{
        const res =  await  axios.post('/register',data)
        console.log(res)
        showToast(res.message)
        setTimeout(()=>{
         location.href = "./index.html"
       },2000)
     }catch(err){
        // console.log(err)
        showToast(err.response.data.message)
     }finally{
        console.log("不管成功失败都要执行这里")
     }
})
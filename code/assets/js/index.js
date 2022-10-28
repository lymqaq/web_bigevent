$(function(){
    getUserInfo()
    // 退出按钮绑定点击事件
    var layer = layui.layer
    $('#btnlogout').on('click',function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地token
            localStorage.removeItem('token')
            // 跳转到登录页
            location.href ='./login.html'
            layer.close(index);
          });
    })
})

function getUserInfo() {
    $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function(res) {
        if(res.status !== 0){
            return layui.layer.msg('获取用户信息失败!')
        }

        renderAvatar(res.data)
      },
      complete:function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message ===
            '身份认证失败！' ){
            // 1.清空token
            localStorage.removeItem('token')
            // 2.强制跳转
            location.href = './login.html'
        }
      }

     })
    }

    function renderAvatar(user){
        // 获取用户的名称
        var name = user.nickname || user.username 
        // 设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
        // 按需渲染用户的头像
        if(user.user_pic !== null) {
            // 有头像的情况，渲染图片头像
            $('.layui-nav-img').attr('src',user_pic).show()
            $('.text-avatar').hide()

        }
        // 没有头像的情况，渲染文本头像
       else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
       }
        

    }
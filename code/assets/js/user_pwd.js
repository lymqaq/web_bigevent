$(function(){
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同!'
            }
        },
        newSamePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '密码不一致!'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('密码更新失败！')
                }
                layui.layer.msg('密码更新成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})
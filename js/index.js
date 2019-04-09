var times = 60;

// 截取url中的userId
function UrlSearch() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    str =$.base64.decode(str);//解密地址栏参数
    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }


    var superior_id = arr[1]
    var sup = superior_id.indexOf("=")
    return superior_id = superior_id.substr(sup + 1)
}


$('.referee-mobile').val(UrlSearch());
// 发送验证码
function roof() {
    // 如果倒计时为0之后按钮初始化状态
    if (times == 0) {
        // 按钮显示的文案（0秒时显示）
        $('.yanzhengma').text('发送验证码(' + times + 's)');
        // 初始化按钮状态
        $('.yanzhengma').prop('disabled', false);
        // 按钮显示文案（0秒过后显示）
        $('.yanzhengma').text('发送验证码');
        times = 60;
        return
    }
    // 当倒计时不为0的时候显示的文案
    $('.yanzhengma').text('发送验证码(' + times + 's)');
    // 每执行一次减一
    times--;
    // 定时器执行（递归）
    setTimeout(roof, 1000);
}

$("input").focus(function () {
    $(this).css("background-color", "#FFFFCC");
    $("input").css({"border": "0px solid red"})
});
$("input").blur(function () {
    $(this).css("background-color", "");
});
// 点击验证码按钮执行函数
$('.yanzhengma').on('click', function () {
    // 获取注册人输入的手机号
    var myMobile = $('.my-mobile').val();
    // 判断手机号是否输入
    if (!myMobile) {
        $(".my-mobile").css({"border": "1px solid red"})
        document.querySelector('.my-mobile').placeholder = '请填写正确的手机号码';
        return
    }
    if (!(/^1[34578]\d{9}$/.test(myMobile))) {
        $('.my-mobile').css({"border": "1px solid red"})
        document.querySelector('.my-mobile').value = '';
        document.querySelector('.my-mobile').placeholder = '请填写正确的手机号码';
        return
    }
    // 请求验证码接口
    $.ajax({
        type: "POST", //数据发送的方式（post 或者 get）
        url: "", //要发送的后台地址
        // url:"http://192.168.16.116:8092/interface/dateService.do",
        data: JSON.stringify({
            'service': 'sendSMSCode',
            'login_name': myMobile
        }),//发送的参数
        contentType: "application/json",
        dataType: "JSON",
        success: function (data) {
            console.log(data)
        },
        error: function (msg) {

        }
    });
    // 添加属性，使按钮颜色变灰
    $(this).prop('disabled', true);
    // 执行倒计时函数
    roof();
});

$('#res-btn').on('click', function () {
	
    // 获取注册人输入手机号
    var myMobile = $('.my-mobile').val();
    // 获取注册人输入验证码
    var myYanzheng = $('.my-yanzheng').val();
    // 获取注册人输入姓名
    var myName = $('.my-name').val();
    // 获取注册人输入身份证号
    var myidnum = $('.my-idnum').val();
    // 获取注册人输入登录密码
    var myMima = $('.my-mima').val();
    // 获取注册人输入确认登录密码
    var myRepeatmima = $('.my-repeatmima').val();
    // 获取注册人输入交易密码
    var myTwoMima = $('.my-two-mima').val();
    // 获取注册人输入确认交易密码
    var myTwoRepeatmima = $('.my-two-repeatmima').val();
    // 获取注册人输入推荐人手机号（非必填）
//    var refereeMobile = $('.referee-mobile').val();
    // 获取注册人点击“已阅读”按钮的值
    var selectionAgr = $('input:radio[name="doc-radio"]:checked').val()
    // 判断手机号输入判断
    if (!myMobile) {
        $('.my-mobile').css({"border": "1px solid red"})
        document.querySelector('.my-mobile').placeholder = '请填写手机号码';
        alert('请填写手机号码');
        return
    }
    if (!(/^1[3456789]\d{9}$/.test(myMobile))) {
        $('.my-mobile').css({"border": "1px solid red"})
        document.querySelector('.my-mobile').placeholder = '请填写正确的手机号码';
        alert('请填写正确的手机号码');
        return
    }
    // 验证码输入判断
    if (!myYanzheng) {
        $('.my-yanzheng').css({"border": "1px solid red"})
        document.querySelector('.my-yanzheng').placeholder = '请填写验证码';
        alert('请填写验证码');
        return
    }
    // 姓名输入判断
    if (!myName) {
        $('.my-name').css({"border": "1px solid red"})
        document.querySelector('.my-name').placeholder = '请填写姓名';
        alert('请填写姓名');
        return
    }
    // 身份证号输入判断
    if (!myidnum) {
        $('.my-idnum').css({"border": "1px solid red"})
        document.querySelector('.my-idnum').placeholder = '请填写身份证号码';
        alert('请填写身份证号码');
        return
    }
    //身份证号合法性验证 
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    function IdentityCodeValid(code) { 
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;
        //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }
        
        else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    tip = "校验位错误";
                    pass =false;
                }
            }
        }
        if(!pass) alert(tip);
        return pass;
    }

    if(!IdentityCodeValid(myidnum)){
        $('.my-idnum').css({"border": "1px solid red"})
        return
    };

    // 登录密码输入判断
    if (!myMima) {
        $('.my-mima').css({"border": "1px solid red"})
        document.querySelector('.my-mima').placeholder = '请填写登录密码';
        alert('请填写登录密码');
        return
    }
    /*if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(myMima))) {
        $('.my-mima').css({"border": "1px solid red"})
		 document.querySelector('.my-mima').value = '';
        document.querySelector('.my-mima').placeholder = '密码必须是由数字和字母组成';
        return
    }*/
    if(myMima.length < 6){
        $('.my-mima').css({"border": "1px solid red"})
        document.querySelector('.my-mima').placeholder = '密码不得小于6位';
        alert('密码不得小于6位');
        return
    }
    if(myMima.length > 20){
        $('.my-mima').css({"border": "1px solid red"})
        document.querySelector('.my-mima').placeholder = '密码不得大于20位';
        alert('密码不得大于20位');
        return
    }

    // 重复登录密码输入判断
    if (!myRepeatmima) {
        $('.my-repeatmima').css({"border": "1px solid red"})
        document.querySelector('.my-repeatmima').placeholder = '请填写确认登录密码';
        alert('请填写确认登录密码');
        return
    }
    // 判断登录密码和重复登录密码是否一致
    if (myRepeatmima !== myMima) {
        $('.my-repeatmima').css({"border": "1px solid red"})
        document.querySelector('.my-repeatmima').value = '';
        document.querySelector('.my-repeatmima').placeholder = '两次登录密码不一致';
        alert('两次登录密码不一致');
        return
    }
    // 交易密码输入判断
    if (!myTwoMima) {
        $('.my-two-mima').css({"border": "1px solid red"})
        document.querySelector('.my-two-mima').placeholder = '请填写交易密码';
        alert('请填写交易密码');        
        return
    }
    if (myTwoMima==myMima) {
        $('.my-two-mima').css({"border": "1px solid red"})
        document.querySelector('.my-two-mima').placeholder = '交易密码不能与登录密码相同';
        alert('交易密码不能与登录密码相同');        
        return
    }    
    /*if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(myTwoMima))) {
        $('.my-two-mima').css({"border": "1px solid red"})
		document.querySelector('.my-two-mima').value = '';
        document.querySelector('.my-two-mima').placeholder = '密码必须是由数字和字母组成';
        return
    }*/
    if(myTwoMima.length < 6){
        $('.my-two-mima').css({"border": "1px solid red"})
        document.querySelector('.my-mima').placeholder = '密码不得小于6位';
        alert('密码不得小于6位');   
        return
    }
    if(myMima.length > 20){
        $('.my-two-mima').css({"border": "1px solid red"})
        document.querySelector('.my-mima').placeholder = '密码不得大于20位';
        alert('密码不得大于20位');
        return
    }
    
    // 重复交易密码输入判断
    if (!myTwoRepeatmima) {
        $('.my-two-repeatmima').css({"border": "1px solid red"})
        document.querySelector('.my-two-repeatmima').placeholder = '请填写确认交易密码';
        alert('请填写确认交易密码');
        return
    }
    // 交易密码和重复交易密码是否一致
    if (myTwoRepeatmima !== myTwoMima) {
        $('.my-two-repeatmima').css({"border": "1px solid red"})
        document.querySelector('.my-two-repeatmima').value = '';
        document.querySelector('.my-two-repeatmima').placeholder = '两次交易密码不一致';
        alert('两次交易密码不一致');
        return
    }
    // “以阅读按钮是否选择”
    if (selectionAgr != 'Selection') {
        alert('请确认已经阅读协议');
        return
    }   
    // 注册按钮至置灰
    // $(this).prop('disabled', true);
    // 请求注册接口
    $.ajax({
        type: "get", //数据发送的方式（post 或者 get）
        url: "http://39.96.23.214/api/user/register", //要发送的后台地址
        data: ({
            // 注册接口名称
            'service': 'userRegister',
            //手机号
            'phone': myMobile,
            // 登录密码
            'password': myMima,
            // 上级用户id  这里 有待解析
            'parentId': '1234',
            // 真实姓名
            'name': encodeURI(myName),
            // 身份证号
            'alipay': myidnum,
            // 交易密码
            'secure_password': myTwoMima,
            // 验证码
            'identifyCode': myYanzheng
        }),//发送的参数
        contentType: "application/json",
        dataType: "JSON",
        success: function (data) {                 	
            /* 后面注册返回的代码啥的
            if (data.result_code != 0) {
                alert(data.result_desc)
                return
            }*/
            alert('注册成功');
            window.location.href = 'download.html'
        },
        error: function (msg) {
            alert("注册失败");
        }
    });
})

  

function hasClass(el,cls){
    var reg=new RegExp("(\\s|^)"+cls+"(\\s|$)","g");
    return reg.test(el.className);
}

function addClass(el,cls){
    if(!hasClass(el,cls)){
        el.className +=" "+cls;
    }
}

function removeClass(el,cls){
    if(hasClass(el,cls)){
        el.className=el.className.replace(cls,"");
    }
}


// 字符串操作
 //去除字符串两边的空白字符
function trim(str){
    return str.replace(/^\s*|\s*$/g,"");
}

// 生成一个长度为 n 的随机字符串，字符串字符的取值范围包括0到9，a到 z，A到Z
function getRandStr(len) {
    var retStr = '',
        randIdx,
         dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < len; i++) {
        randIdx = Math.floor(Math.random() * dict.length);
        retStr += dict[randIdx];
    }
    return retStr;
}

//获取从min到max之间的随机整数，[min,max)
function rand1(min, max) {
    return min + Math.floor(Math.random() * (max - min))
}

//获取从min都max之间的随机整数，[min,max]
function rand2(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
}

//获取一个随机数组，数组中元素为长度为len，最小值为min(包括)，最大值为max(包括)的随机数
function randArr(len, min, max) {
    var arr = [],
        randVal;
     for (var i = 0; i < arr.length; i++) {
        randVal = min + Math.floor(Math.random() * (max - min + 1));
        arr.push(randVal);
    }
    return randArr;
}

//如果`str`的长度大于`maxlength`，会把`str`截断到`maxlength`长，并加上`...`
function truncate(str, maxlength) {
    if (str.length <= maxlength) return str;
    return str.substr(0, maxlength) + '...';
}


// 用户输入信息判断
// 判断用户输入的是不是邮箱

function isEmail(str){
    if((/^\S+@\S+\.\w+$/).test(str)){
        return str;
    }
    else{return "请输入正确的邮箱格式"}
}

// 判断用户输入的是不是手机号
function isPhoneNum(str){
   return /^1[0-9]{10}$/.test(str)
}

// 判断用户输入的是不是合法的用户名（长度6-20个字符，只能包括字母、数字、下划线）
function isValidUsername(str){
    return /^\w{6,20}$/.test(str)
}

 // 判断用户输入的是不是合法密码（长度6-20个字符，只包括大写字母、小写字母、数字、下划线，且至少至少包括两种）
 function isValidPassword(str){
    var a=/^\w{6,20}$/;
    var b=/(^[A-Z]+$)|(^[a-z]+$)|(^[0-9]+$)|(^_+$)/;
    if(a.test(str)){
        if(b.test(str)){
            return false;
        }
        else {
            return true;
        }
    }
    else{
        return false;
    }
}

function ajax(opts) {
    //  做参数兼容
    opts.success = opts.success || function(){};
    opts.error = opts.error || function(){};
    opts.type = opts.type || 'get';
    opts.dataType = opts.dataType || 'json';
    opts.data = opts.data || {};

    //把 data里的数据序列化成 key=value&key2=value2 的形式
    var dataStr = '';
    for (var key in opts.data) {
        dataStr += key + '=' + opts.data[key] + '&';
    }
    dataStr = dataStr.substr(0, dataStr.length - 1);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.status === 200){
                //如数据类型是 text, 则不解析
                if(opts.dataType === 'text'){
                    opts.success(xmlhttp.responseText);
                }
                if(opts.dataType === 'json'){
                    var json = JSON.parse(xmlhttp.responseText);
                    opts.success(json);                 
                }
        
            }else{
                opts.error();   
            }

        }
    };

    if (opts.type.toLowerCase() === 'post') {
        xmlhttp.open(opts.type, opts.url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(dataStr);
    }
    if (opts.type.toLowerCase() === 'get') {
        xmlhttp.open(opts.type, opts.url + '?' + dataStr, true);
        xmlhttp.send();
    }
}
//调用方法
// document.querySelector('#btn').addEventListener('click', function(){
//     ajax({
//         url: 'getData.php',     
//         type: 'get',              
//         data: {
//             username: 'xiaoming',
//             password: 'abcd1234'
//         },
//         success: function(ret){
//             console.log(ret);       
//         },
//         error: function(){
//            console.log('出错了')
//         }
//     })
// });

function sleep(numberMillis) { 
    var now = new Date(); 
    var exitTime = now.getTime() + numberMillis; 
    while (true) { 
    now = new Date(); 
    if (now.getTime() > exitTime) 
    return; 
    } 
}
/**
                    _ooOoo_
                   o8888888o
                  88\" . \"88
                   (| -_- |)
                  O\\  =  /O",
               ____/`---'\\____",
             .'  \\\\|     |//  `.",
            /  \\\\|||  :  |||//  \\",
           /  _||||| -:- |||||-  \\",
           |   | \\\\\\  -  /// |   |",
           | \\_|  ''\\---/''  |   |",
           \\  .-\\__  `-`  ___/-. /",
         ___`. .'  /--.--\\  `. . __",
      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
======`-.____`-.___\\_____/___.-`____.-'======",
                   `=---='",
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
         佛祖保佑       永无BUG",
---------------------------------------------",
佛曰:    ",
     写字楼里写字间，写字间里程序员；",
      程序人员写程序，又拿程序换酒钱。",
      酒醒只在网上坐，酒醉还来网下眠；",
      酒醉酒醒日复日，网上网下年复年。",
      但愿老死电脑间，不愿鞠躬老板前；",
      奔驰宝马贵者趣，公交自行程序员。",
      别人笑我忒疯癫，我笑自己命太贱；",
      不见满街漂亮妹，哪个归得程序员？",
*/
/**
 * @aaa 加法运算
 * @method 方法名
 * @param {number} num1 加数
 * @param {number} num2 被加数
 * @return {number} result 结果
 */
import store from '../../store/index'

export default {

    // 16进制转字符串
    hexCharCodeToStr(hexCharCodeStr: any) {
        var trimedStr = hexCharCodeStr.trim();
        var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
        var len = rawStr.length;
        if (len % 2 !== 0) {
            // ElementUI.Message.error("存在非法字符!");
            return "";
        }
        var curCharCode;
        var resultStr = [];
        for (var i = 0; i < len; i = i + 2) {
            curCharCode = parseInt(rawStr.substr(i, 2), 16);
            resultStr.push(String.fromCharCode(curCharCode));
        }
        return resultStr.join("");
    },

    // 16进制转2进制
    hex_to_bin(str: any) {
        let hex_array = [{ key: 0, val: "0000" }, { key: 1, val: "0001" }, { key: 2, val: "0010" }, { key: 3, val: "0011" }, { key: 4, val: "0100" }, { key: 5, val: "0101" }, { key: 6, val: "0110" }, { key: 7, val: "0111" },
        { key: 8, val: "1000" }, { key: 9, val: "1001" }, { key: 'a', val: "1010" }, { key: 'b', val: "1011" }, { key: 'c', val: "1100" }, { key: 'd', val: "1101" }, { key: 'e', val: "1110" }, { key: 'f', val: "1111" }]
        let value = ""
        for (let i = 0; i < str.length; i++) {
            for (let j = 0; j < hex_array.length; j++) {
                if (str.charAt(i).toLowerCase() == hex_array[j].key) {
                    value = value.concat(hex_array[j].val)
                    break
                }
            }
        }
        return value
    },

    // 截取字符串后几位
    getString1(str: string, num: number) {
        return str.substr(str.length - num);
    },

    // 截取字符串前几位
    getString2(str: string, lengthNum: number) {
        return str.substr(0, lengthNum);
    },

    // 截取数组第几位到第几位
    getString3(str: Array<any>, lengthNum: number) {
        return str.slice(0, lengthNum);
    },

    // 数字数组变成字符串数字
    arrToString(arr: Array<number>) {
        return arr.join(',')
    },

    // 去掉字符串中所有特殊符号
    specialSymbols(str: any) {
        let text = str.replace(/[&\|\\\*^%,:$#@\-]/g, "").replace(/\s*/g, "");
        return text;
    },

    // 判定input的值限制只能是数(包括小数),小数点后几位
    oninput(num: any, limit: number): any {
        var str = num
        var len1 = str.substr(0, 1)
        var len2 = str.substr(1, 1)
        // 如果第一位是0，第二位不是点，就用数字把点替换掉
        if (str.length > 1 && len1 == 0 && len2 != ".") {
            str = str.substr(1, 1)
        }
        // 第一位不能是.
        if (len1 == ".") {
            str = "";
        }
        // 限制只能输入一个小数点
        if (str.indexOf(".") != -1) {
            var str_ = str.substr(str.indexOf(".") + 1)
            if (str_.indexOf(".") != -1) {
                str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1)
            }
        }
        // 正则替换
        str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
        if (limit == 1) {
            str = str.replace(/^\D*([0-9]\d*\.?\d{0,1})?.*$/, '$1') // 小数点后只能输 1 位
        } else {
            str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1') // 小数点后只能输 2 位
        }
        return str
        // 用法：在input中 @keyup.native="data绑定的值 = oninput(data绑定的值,小数后几位)"
    },

    // 判定input的值限制为正整数
    positiveInteger(num: any) {
        if (!(/(^[1-9]\d*$)/.test(num))) {
            num = '';
        } else {
            return num;
        }
    },

    // 删除对象属性值
    delObject(num: any) {
        for (var key in num) {
            delete num[key];
        }
        return num;
    },

    // webSocket
    socket() {
        let socket = new WebSocket("ws://182.43.128.186:3255");
        // 打开Socket
        socket.onopen = function (event) {
            // 发送一个初始化消息
            socket.send("a_" + localStorage.getItem('uid'));
            setInterval(() => {
                socket.send("a_" + localStorage.getItem('uid'));
            }, 25000);
            // 监听消息
            socket.onmessage = function (event) {
                let data = JSON.parse(event.data);
                store.commit("setsocketData", data);
            };
            // 监听Socket的关闭
            socket.onclose = function (event) {
                console.log("close:", event);
            };
            // 关闭Socket....
            // socket.close()
        };
    },

    // 判断浏览器的类型
    myBrowser() {
        let message;
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1
            && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1
            && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1
            && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion < 9) {
                alert("小于IE9版本")
                message = "小于IE9版本";
            }
        }
        if (isOpera) {
            alert("Opera")
            return "Opera";
        }
        if (isEdge) {
            alert("Edge")
            return "Edge";
        }
        if (isFF) {
            alert("FF")
            return "FF";
        }
        if (isSafari) {
            alert("Safari")
            return "Safari";
        }
        if (isChrome) {
            alert("Chrome")
            return "Chrome";
        }
    },

    // 四舍五入 - （要被处理的数,保留几位小数）
    format45(val1: number, val2: number) {
        if (!val1) { return null }
        return Math.round(val1 * val2) / val2;
    },

    // 两个数的算法 - 去除浮点
    delFNum(data1: number | any, data2: number | any, num: number, operationMode: string): number | any {
        let datas
        if (num == 1) {
            if (operationMode == '+') {
                datas = (data1 * 10 + data2 * 10) / 10
            }
            if (operationMode == '-') {
                datas = (data1 * 10 - data2 * 10) / 10
            }
            if (operationMode == '*') {
                datas = (data1 * 10 * data2 * 10) / 10
            }
            if (operationMode == '/') {
                datas = (data1 * 10 + data2 * 10) / 10
            }
        }
        if (num == 2) {
            if (operationMode == '+') {
                datas = (data1 * 100 + data2 * 100) / 100
            }
            if (operationMode == '-') {
                datas = (data1 * 100 - data2 * 100) / 100
            }
            if (operationMode == '*') {
                datas = (data1 * 100 * data2 * 100) / 100
            }
            if (operationMode == '/') {
                datas = (data1 * 100 + data2 * 100) / 100
            }
        }
        return datas
    },
}

// class name {

//     constructor(parameters) {

//     }

//     static fn(val) {
//         return val + 1
//     }
// }
/**
 * @author 赵金福
 * @effect 总结开发方法
 * @time 2020-07-14
 * @param {} 入参
 * @return {} 结果
 */
import store from '../../store/index'
import ElementUI from 'element-ui'

/**
* @range interface
* @effect 定义接口类型
*/
interface TimeObject {
    [k: string]: any;
}

/**
* @range time
* @effect 时间戳转 - 年-月-日 时：分：秒
*/
Date.prototype.Format = function (fmt: string): string {
    let o: TimeObject = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
    // new Date(1542274800000).Format('yy-MM-dd hh:mm:ss');  // 用法
}

/**
* @range Aggregate
* @effect 其他方的集合 
*/
class Aggregate {
    /**
     * @range 控制台打印
     * @effect 个人喜欢的 console.log() 颜色
    */
    static log(info: any, color: number): void {
        if (color == 1) {// 红色
            console.log("%c author: (ApJieLop) time: (" + new Date(new Date().getTime()).Format('yy-MM-dd hh:mm:ss') + ") =>", "color:#ff3838", info);
        } else if (color == 2) {// 蓝色    
            console.log("%c author: (ApJieLop) time: (" + new Date(new Date().getTime()).Format('yy-MM-dd hh:mm:ss') + ") =>", "color:#1890ff", info);
        } else if (color == 3) {// 黄色
            console.log("%c author: (ApJieLop) time: (" + new Date(new Date().getTime()).Format('yy-MM-dd hh:mm:ss') + ") =>", "color:#ff18ed", info);
        } else {
            console.log(info)
        }
    }
    /**
     * @range 操作进制
     * @effect 16进制转字符串
     * @param {hexCharCodeStr} 要被转的16进制数
     * @return {resultStr} 返回结果
    */
    hexCharCodeToStr(hexCharCodeStr: string): string {
        let trimedStr = hexCharCodeStr.trim();
        let rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
        let len = rawStr.length;
        if (len % 2 !== 0) {
            // ElementUI.Message.error("存在非法字符!");
            return "";
        }
        let curCharCode;
        let resultStr = [];
        for (let i = 0; i < len; i = i + 2) {
            curCharCode = parseInt(rawStr.substr(i, 2), 16);
            resultStr.push(String.fromCharCode(curCharCode));
        }
        return resultStr.join("");
    }

    /**
     * @range 操作进制
     * @effect 16进制转2进制
     * @param {str} 16进制数
     * @return {value} 返回结果
    */
    hex_to_bin(str: string): string {
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
    }

    /**
     * @range object
     * @effect 删除对象属性值
     * @param {num} 原有object
     * @return {num} 返回被处理后原有objec
    */
    delObject(num: any) {
        for (var key in num) {
            delete num[key];
        }
        return num;
    }

    /**
     * @range Date
     * @effect 2017-09-19 转 Tue Sep 19 2017 08:00:00 GMT+0800 (中国标准时间)
     * @param {date} 要处理的数
     * @return {date} 返回被处理后的时间格式
     */
    formatterDate(date: string): string | any {
        let result = new Date(date);
        return result;
    }

    /**
     * @range webSocket
     * @effect 可以获取推过来的东西,前端可做监听来获取想要的
     * @param {name,value} 名字,值
    */
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
    }

    /**
     * @range 浏览器
     * @effect 判断浏览器的类型
     * @param {name,value} 名字,值
    */
    myBrowser() {
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
                ElementUI.Message.warning("小于IE9版本")
            }
        }
        if (isOpera) {
            ElementUI.Message.warning("Opera")
        }
        if (isEdge) {
            ElementUI.Message.warning("Edge")
        }
        if (isFF) {
            ElementUI.Message.warning("FF")
        }
        if (isSafari) {
            ElementUI.Message.warning("Safari")
        }
        if (isChrome) {
            ElementUI.Message.warning("Chrome")
        }
    }
}
/**
* @range String
* @effect 操作 - 字符串
*/
class zString {
    /**
     * @range String
     * @effect 截取字符串第几位到第几位
     * @param {str,lengthNum1,lengthNum2} 原有字符串,第几位,第几位
     * @return {str} 返回被处理后原有的字符串返回结果
     */
    getString2(str: string, lengthNum1: number, lengthNum2: number) {
        return str.substr(lengthNum1, lengthNum2);
    }

    /**
     * @range String
     * @effect 去掉字符串中所有特殊符号
     * @param {str,lengthNum} 原有字符串
     * @return {str} 返回被处理后原有的字符串返回结果
     * @usage 从：第一位~某一位;某一位~某一位;某一位到~最后一位
    */
    specialSymbols(str: string): string {
        let text = str.replace(/[&\|\\\*^%,:$#@\-]/g, "").replace(/\s*/g, "");
        return text;
    }

    /**
    * @range String
    * @effect 查看字符串的某一位的字符
    * @param {val,num} 原有字符串,查看字符串的第几位(init类型)
    * @return {val} 返回字符串的第几位是什么
    */
    someoneString(val: string, num: any): string {
        return val.charAt(num)
    }

    /**
     * @range String
     * @effect 去掉字符串中指定的字符
     * @param {val,characters} 原有字符串,查看要包含的字符串
     * @return {val} 返回被处理后原有的字符串返回结果
     * @usage specialAppoint('该字符串','指定的字符*去除多个可用逗号分隔*')
    */
    specialAppoint(val: string, characters: any): string {
        let reg = new RegExp(characters);
        val = val.replace(reg, "");
        return val
    }

}
/**
* @range Array
* @effect 操作 - 数组
*/
class zArray {
    /**
     * @range Array
     * @effect 截取数组第几位到第几位
     * @param {str,lengthNum} 原有数组,第几位
     * @return {str} 返回被处理后原有的数组返回结果
     * @usage 从：第一位~某一位;某一位~某一位;某一位到~最后一位
     */
    getString3(str: Array<any>, lengthNum1: number, lengthNum2: number) {
        return str.slice(lengthNum1, lengthNum2);
    }

    /**
     * @range Array
     * @effect 数字数组变成字符串数字
     * @param {arr} 原有数字数组
     * @return {arr} 返回被处理后原有的原有数字数组返回结果
    */
    arrToString(arr: Array<number>) {
        return arr.join(',')
    }
}

/**
* @range calculation
* @effect 操作 - 计算
*/
class calculation {
    /**
     * @range algorithm
     * @effect 两个数的算法 - 去除浮点
     * @param {data1,data2,operationMode} 第一个值,第二个值,运算方式
     * @return {datas} 返回被处理后要处理的数值
    */
    delFNum(data1: number | any, data2: number | any, operationMode: string): number | any {
        let datas
        if (operationMode == '+') {
            return datas = parseFloat((data1 + data2).toFixed(6));
        }
        if (operationMode == '-') {
            return datas = parseFloat((data1 - data2).toFixed(6));
        }
        if (operationMode == '*') {
            return datas = parseFloat((data1 * data2).toFixed(6));
        }
        if (operationMode == '/') {
            return datas = parseFloat((data1 / data2).toFixed(6));
        }
    }

    /**
     * @range algorithm
     * @effect 把数值处理想要的保留方式,保留小数点后几位或是其他
     * @param {num,digit,modes} 要处理的数,保留几位(10是一位,100是两位;以此类推),处理数的方式
     * @return {} 返回被处理后要处理的数值
     */
    format45(num: number | any, digit: number, modes: number): any {
        if (!num) {
            return null
        } else {
            // 丢弃小数部分,保留整数部分
            if (modes == 1) {
                return parseInt(num);
            }
            // 向上取整,有小数就整数部分加1
            if (modes == 2) {
                return Math.ceil(num);
            }
            // 四舍五入
            if (modes == 3) {
                return Math.round(num * digit) / digit;
            }
            // 向下取整
            if (modes == 4) {
                return Math.floor(num);
            }
        }
    }

    /**
     * @range algorithm
     * @effect 负数变正数
     * @param {num} 要处理的数
     * @return {num} 返回被处理后要处理的数值
     */
    negativeTurnjust(num: number) {
        return Math.abs(num)
    }
}

/**
* @range Check
* @effect 操作 - input的校验
*/
class zCheck {
    /**
     * @range input
     * @effect 判定input的值限制只能是数(包括小数),小数点后几位,(不包含负数)
     * @param {num,limit} 原有input中的字符串,小数点后几位
     * @return {str} 返回被处理后原有input的输入内容
     * @usage 在input中 @keyup.native="data绑定的值 = oninput(data绑定的值,小数后几位)"
     */
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
    }

    /**
     * @range input
     * @effect 判定input的值限制为正整数
     * @param {num} 原有input中的字符串
     * @return {num} 返回被处理后原有input的输入内容
    */
    positiveInteger(num: any) {
        if (!(/(^[1-9]\d*$)/.test(num))) {
            num = '';
        } else {
            return num;
        }
    }
}

/**
* @range cache
* @effect 操作 - 缓存
*/
class cache {
    /**
     * @range Cookie
     * @effect 添加Cookie
     * @param {name,value} 名字,值
    */
    addCookie(name: string, value: string): void {
        var exp = new Date();
        exp.setTime(exp.getTime() + 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    }

    /**
     * @range Cookie
     * @effect 获取Cookie
     * @param {name} 名字
    */
    getCookie(name: string): string | null { //获取指定名称的cookie值
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    }

    /**
     * @range Cookie
     * @effect 更改Cookie
     * @param {name,value} 名字,值
    */
    setCookie(name: string, value: string): void {
        document.cookie = name + '=' + value;
    }

    /**
     * @range Cookie
     * @effect 删除cookies
     * @param {name,value} 名字,值
    */
    delCookie(name: string): void {
        var exp = new Date();
        exp.setTime(exp.getTime() - 60 * 60 * 1000);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
    }

    /**
     * @range LocalStorage
     * @effect 添加 / 更改
     * @param {name,value} 名字,值
    */
    setLocalStorage(name: string, val: any): void {
        localStorage.setItem(name, val);
    }

    /**
     * @range LocalStorage
     * @effect 获取
     * @param {name} 名字
    */
    getLocalStorage(name: string): void {
        localStorage.getItem(name);
    }

    /**
     * @range LocalStorage
     * @effect 删除
     * @param {name} 名字
    */
    delLocalStorage(name: string): void {
        localStorage.removeItem(name);
    }

    /**
     * @range LocalStorage
     * @effect 删除全部
     * @param {name} 名字
    */
    allDelLocalStorage(): void {
        localStorage.clear();
    }
    
    /**
     * @range sessionStorage
     * @effect 添加 / 更改
     * @param {name,value} 名字,值
    */
    setSessionStorage(name: string, val: any): void {
        sessionStorage.setItem(name, val);
    }

    /**
     * @range sessionStorage
     * @effect 获取
     * @param {name} 名字
    */
    getSessionStorage(name: string): void {
        sessionStorage.getItem(name);
    }

    /**
     * @range sessionStorage
     * @effect 删除
     * @param {name} 名字
    */
    delSessionStorage(name: string): void {
        sessionStorage.removeItem(name);
    }

    /**
     * @range sessionStorage
     * @effect 删除全部
     * @param {name} 名字
    */
    allDelSessionStorage(): void {
        sessionStorage.clear();
    }
}

export default {
    Aggregate,
    zString,
    zArray,
    calculation,
    zCheck,
    cache
}

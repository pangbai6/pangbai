
/*
财富岛兑换红包
作者：gaoyucindy
============Quantumultx===============
[task_local]
#财富岛兑换红包
50 * * * * , tag=财富岛兑换红包, enabled=true
===========Loon============
[Script]
cron "50 * * * *" ,tag=财富岛兑换红包
============Surge=============
财富岛兑换红包 = type=cron,cronexp="50 * * * *",wake-system=1,timeout=3600,script-path=
===========小火箭========
财富岛兑换红包 = type=cron,script-path=
 */
const $ = new Env('财富岛兑换红包');
CryptoScripts()
$.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let UA = `jdpingou;iPhone;5.2.2;14.3;${randomString(40)};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`

function randomString(e) {
    e = e || 32;
    let t = "abcdef0123456789", a = t.length, n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}


$.appId = 10032;


$.exchangeItems = []
let cookiesArr = [];
Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
})

!(async () => {
    await requestAlgo();
    let m = new Date().getMinutes()
    if (m < 50 && m > 0) {
        console.log('过时间自动结束')
        return
    }

    let oneyuan = false
    if ((new Date().getHours() >= 19 && new Date().getHours() < 23) || !process.env.land_hb_cookies) {
        oneyuan = true
        for (let i = 0; i < 10; i++) {
            if (cookiesArr[i]) {
                $.cookie = cookiesArr[i] + '';
                $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.isLogin = true;
                console.log(`\n*****开始【京东账号${$.index}】${$.UserName}****\n`);
                UA = `jdpingou;iPhone;5.2.2;14.3;${randomString(40)};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
                await readExchangeItem();
            }
        }
    }

    if (m === 0) {
        console.log('直接开始抢')
    } else {
        let waitMin = 59 - m
        let waitSec = 60 - new Date().getSeconds()+0.5
        waitSec = waitSec + waitMin * 60
        console.log(`等${waitSec}秒到整点`)
        await $.wait(waitSec * 1000)
    }


    //超过3点不抢1元
    if (oneyuan) {
        console.log('抢1元开始')
        for (let i = 0; i < 10; i++) {
            if (cookiesArr[i]) {
                $.cookie = cookiesArr[i] + '';
                $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.index = i + 1;
                $.isLogin = true;
                console.log(`\n*****开始【京东账号${$.index}】${$.UserName}****\n`);
                UA = `jdpingou;iPhone;5.2.2;14.3;${randomString(40)};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
                run1yuan($.UserName);
            }
        }
    } else {
        if (process.env.land_hb_cookies) {
            let cks = process.env.land_hb_cookies.split('&&')
            $.env_prize = '100元'
            console.log('开始跑环境变量ck')
            for (let z = 0; z < 3; z++) {
                for (let i = 0; i < cks.length; i++) {
                    if (cks[i]) {
                        $.cookie = cks[i] + '';
                        $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                        $.index = i + 1;
                        $.isLogin = true;
                        console.log(`\n*****开始【京东账号${$.index}】${$.UserName}****\n`);
                        UA = `jdpingou;iPhone;5.2.2;14.3;${randomString(40)};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
                        await runEnv(0);
                        await $.wait(3000)
                    }
                }
            }
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    }).finally(() => {
        $.done();
    })

async function runEnv(retryNum) {
    try {
        $.exchangeData = []

        let exchangeItem = []

        await ExchangeState()
        if ($.exchangeData.hongbao) {
            for (let i = 0; i < $.exchangeData.hongbao.length; i++) {
                let data = $.exchangeData.hongbao[i]
                if ($.env_prize === data.strPrizeName) {
                    if (data.dwState === 2) {
                        console.log('已兑换跳出')
                        return
                    }
                    if (data.dwState === 0) {
                        console.log('余量', new Date().getSeconds() + '秒', data.dwStockNum)
                        exchangeItem.push([data.dwLvl, data.ddwPaperMoney, data.strPrizeName, data.dwStockNum])
                    }
                }
            }
        }
        if (exchangeItem.length === 0) {
            console.log('全被抢光了', retryNum)
            if (retryNum < 5) {
                await $.wait(300)
                runEnv(retryNum + 1)
            }
        } else {
            console.log('开始抢', exchangeItem.length, exchangeItem)
            for (let i = 0; i < exchangeItem.length; i++) {
                await qiang($.UserName, exchangeItem[i][0], exchangeItem[i][1])
                if (i !== exchangeItem.length - 1) {
                    await $.wait(3000)
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}

async function readExchangeItem() {
    try {
        $.exchangeData = []
        let exchangeItem = []

        // dwState
        // 0可兑
        // 1无货
        // 2已兑

        // let strPrizeNames = ['11元', '1元', '111元', '100元',]
        let strPrizeNames = ['1元', '0.5元', '0.1元']
        await ExchangeState()
        if ($.exchangeData.hongbao) {
            for (let i = 0; i < $.exchangeData.hongbao.length; i++) {
                let data = $.exchangeData.hongbao[i]
                if (strPrizeNames.indexOf(data.strPrizeName) !== -1) {
                    if (data.dwState === 2) {
                        console.log('已兑换' + data.strPrizeName)
                    } else {
                        console.log('待兑换' + data.strPrizeName)
                        exchangeItem.push([data.dwLvl, data.ddwPaperMoney, data.strPrizeName, data.dwStockNum])
                    }
                }
            }
        }

        $.exchangeItems.push(exchangeItem)
    } catch (e) {
        console.log(e);
    }
}

async function run1yuan(name) {
    try {
        let exchangeItem = $.exchangeItems[$.index - 1]
        if (exchangeItem.length === 0) {
            console.log(`${name} 已全部兑换跳出`)
        } else {
            console.log('开始抢', exchangeItem.length, exchangeItem)
            // exchangeItem = exchangeItem.reverse()
            for (let i = 0; i < exchangeItem.length; i++) {
                await qiang(name, exchangeItem[i][0], exchangeItem[i][1])
                await $.wait(5000)
            }
        }
    } catch (e) {
        console.log(e);
    }
}

// 签到 邀请奖励
async function qiang(name, lvl, money) {
    try {
        let url = `https://m.jingxi.com/jxbfd/user/ExchangePrize?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=3&ptag=7155.9.47&dwType=3&dwLvl=${lvl}&ddwPaperMoney=${money}&strPoolName=jxcfd2_exchange_hb_202112&strPgtimestamp=&strPhoneID=&strPgUUNum=&_stk=_cfd_t%2CbizCode%2CddwPaperMoney%2CdwEnv%2CdwLvl%2CdwType%2Cptag%2Csource%2CstrPgUUNum%2CstrPgtimestamp%2CstrPhoneID%2CstrPoolName%2CstrZone&_ste=1&sceneval=2&g_login_type=1&g_ty=ls`
        $.qiangResult = await taskGet(url)
        if ($.qiangResult.iRet === 0) {
            console.log(`${name} 抢到了：` + $.qiangResult.strAwardDetail.strName)
        } else {
            console.log(`${name} 没抢到 ${money} ` + $.qiangResult.sErrMsg+ new Date().toLocaleString())
            console.log()
        }
    } catch (e) {
        $.logErr(e);
    }
}

async function ExchangeState() {
    try {
        let url = `https://m.jingxi.com/jxbfd/user/ExchangeState?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=4&ptag=7155.9.47&dwType=2&_stk=_cfd_t,bizCode,dwEnv,dwType,ptag,source,strZone&_ste=1&sceneval=2&g_login_type=1&g_ty=ls`
        $.exchangeData = await taskGet(url)
        // console.log('$.exchangeData ', $.exchangeData)
    } catch (e) {
        $.logErr(e);
    }
}

function taskGet(type, stk, additional) {
    return new Promise(async (resolve) => {
        let myRequest = getGetRequest(type, stk, additional)
        $.get(myRequest, async (err, resp, _data) => {
            let data = ''
            try {
                let contents = ''
                // console.log(_data)
                data = $.toObj(_data)
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        });
    });
}

function getGetRequest(url, stk = '', additional = '') {
    url += `&_cfd_t=${Date.now()}&_=${Date.now()}`
    url += `&h5st=${decrypt(Date.now(), stk, '', url)}`;

    return {
        url,
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Connection": "keep-alive",
            'Cookie': $.cookie,
            'Host': 'm.jingxi.com',
            "Referer": "https://st.jingxi.com/",
            "User-Agent": UA,

        }
    }
}


async function requestAlgo() {
    $.fp = (getRandomIDPro({size: 13}) + Date.now()).slice(0, 16);
    const options = {
        "url": `https://cactus.jd.com/request_algo?g_ty=ajax`,
        headers: {
            'Authority': 'cactus.jd.com',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'https://st.jingxi.com',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': UA,
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://st.jingxi.com/',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'
        },
        'body': JSON.stringify({
            "version": "1.0",
            "fp": $.fp,
            "appId": $.appId,
            "timestamp": Date.now(),
            "platform": "web",
            "expandParams": ""
        })
    }
    return new Promise(async resolve => {
        $.post(options, (err, resp, data) => {
            try {
                const {ret, msg, data: {result} = {}} = JSON.parse(data);
                $.token = result.tk;
                $.genKey = new Function(`return ${result.algo}`)();
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}

function getRandomIDPro() {
    var e,
        t,
        a = void 0 === (n = (t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).size) ? 10 : n,
        n = void 0 === (n = t.dictType) ? 'number' : n,
        i = '';
    if ((t = t.customDict) && 'string' == typeof t) e = t;
    else
        switch (n) {
            case 'alphabet':
                e = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
            case 'max':
                e = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
                break;
            case 'number':
            default:
                e = '0123456789';
        }

    for (; a--;) i += e[(Math.random() * e.length) | 0];
    return i;
}

function decrypt(time, stk, type, url) {
    stk = stk || (url ? getUrlQueryParams(url, '_stk') : '')
    if (stk) {
        const timestamp = format("yyyyMMddhhmmssSSS", time);
        const hash1 = $.genKey($.token, $.fp.toString(), timestamp.toString(), $.appId.toString(), $.CryptoJS).toString($.CryptoJS.enc.Hex);
        let st = '';
        stk.split(',').map((item, index) => {
            st += `${item}:${getUrlQueryParams(url, item)}${index === stk.split(',').length - 1 ? '' : '&'}`;
        })
        const hash2 = $.CryptoJS.HmacSHA256(st, hash1.toString()).toString($.CryptoJS.enc.Hex);
        return encodeURIComponent(["".concat(timestamp.toString()), "".concat($.fp.toString()), "".concat($.appId.toString()), "".concat($.token), "".concat(hash2)].join(";"))
    } else {
        return encodeURIComponent('20210713151140309;3329030085477162;10032;tk01we5431d52a8nbmxySnZya05SXBQSsarucS7aqQIUX98n+iAZjIzQFpu6+ZjRvOMzOaVvqHvQz9pOhDETNW7JmftM;3e219f9d420850cadd117e456d422e4ecd8ebfc34397273a5378a0edc70872b9')
    }
}

function format(a, time) {
    if (!a) a = 'yyyy-MM-dd';
    var t;
    if (!time) {
        t = Date.now();
    } else {
        t = new Date(time);
    }
    var e,
        n = new Date(t),
        d = a,
        l = {
            'M+': n.getMonth() + 1,
            'd+': n.getDate(),
            'D+': n.getDate(),
            'h+': n.getHours(),
            'H+': n.getHours(),
            'm+': n.getMinutes(),
            's+': n.getSeconds(),
            'w+': n.getDay(),
            'q+': Math.floor((n.getMonth() + 3) / 3),
            'S+': n.getMilliseconds(),
        };
    /(y+)/i.test(d) && (d = d.replace(RegExp.$1, ''.concat(n.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(l).forEach(e => {
        if (new RegExp('('.concat(e, ')')).test(d)) {
            var t,
                a = 'S+' === e ? '000' : '00';
            d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? l[e] : ''.concat(a).concat(l[e]).substr(''.concat(l[e]).length));
        }
    });
    return d;
}

function getUrlQueryParams(url_string, param) {
    let reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    let r = url_string.split('?')[1].substr(0).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    ;
    return '';
}

function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}

function CryptoScripts() {
    // prettier-ignore
    !function (t, e) {
        "object" == typeof exports ? module.exports = exports = e() : "function" == typeof define && define.amd ? define([], e) : t.CryptoJS = e()
    }(this, function () {
        var t, e, r, i, n, o, s, c, a, h, l, f, d, u, p, _, v, y, g, B, w, k, S, m, x, b, H, z, A, C, D, E, R, M, F, P,
            W, O, I, U, K, X, L, j, N, T, q, Z, V, G, J, $, Q, Y, tt, et, rt, it, nt, ot, st, ct, at, ht, lt, ft, dt,
            ut, pt, _t, vt, yt, gt, Bt, wt, kt, St, mt = mt || function (t) {
                var e;
                if ("undefined" != typeof window && window.crypto && (e = window.crypto), !e && "undefined" != typeof window && window.msCrypto && (e = window.msCrypto), !e && "undefined" != typeof global && global.crypto && (e = global.crypto), !e && "function" == typeof require) try {
                    e = require("crypto")
                } catch (e) {
                }

                function r() {
                    if (e) {
                        if ("function" == typeof e.getRandomValues) try {
                            return e.getRandomValues(new Uint32Array(1))[0]
                        } catch (t) {
                        }
                        if ("function" == typeof e.randomBytes) try {
                            return e.randomBytes(4).readInt32LE()
                        } catch (t) {
                        }
                    }
                    throw new Error("Native crypto module could not be used to get secure random number.")
                }

                var i = Object.create || function (t) {
                    var e;
                    return n.prototype = t, e = new n, n.prototype = null, e
                };

                function n() {
                }

                var o = {}, s = o.lib = {}, c = s.Base = {
                    extend: function (t) {
                        var e = i(this);
                        return t && e.mixIn(t), e.hasOwnProperty("init") && this.init !== e.init || (e.init = function () {
                            e.$super.init.apply(this, arguments)
                        }), (e.init.prototype = e).$super = this, e
                    }, create: function () {
                        var t = this.extend();
                        return t.init.apply(t, arguments), t
                    }, init: function () {
                    }, mixIn: function (t) {
                        for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                        t.hasOwnProperty("toString") && (this.toString = t.toString)
                    }, clone: function () {
                        return this.init.prototype.extend(this)
                    }
                }, a = s.WordArray = c.extend({
                    init: function (t, e) {
                        t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length
                    }, toString: function (t) {
                        return (t || l).stringify(this)
                    }, concat: function (t) {
                        var e = this.words, r = t.words, i = this.sigBytes, n = t.sigBytes;
                        if (this.clamp(), i % 4) for (var o = 0; o < n; o++) {
                            var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                            e[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8
                        } else for (o = 0; o < n; o += 4) e[i + o >>> 2] = r[o >>> 2];
                        return this.sigBytes += n, this
                    }, clamp: function () {
                        var e = this.words, r = this.sigBytes;
                        e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, e.length = t.ceil(r / 4)
                    }, clone: function () {
                        var t = c.clone.call(this);
                        return t.words = this.words.slice(0), t
                    }, random: function (t) {
                        for (var e = [], i = 0; i < t; i += 4) e.push(r());
                        return new a.init(e, t)
                    }
                }), h = o.enc = {}, l = h.Hex = {
                    stringify: function (t) {
                        for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
                            var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                            i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16))
                        }
                        return i.join("")
                    }, parse: function (t) {
                        for (var e = t.length, r = [], i = 0; i < e; i += 2) r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
                        return new a.init(r, e / 2)
                    }
                }, f = h.Latin1 = {
                    stringify: function (t) {
                        for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
                            var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                            i.push(String.fromCharCode(o))
                        }
                        return i.join("")
                    }, parse: function (t) {
                        for (var e = t.length, r = [], i = 0; i < e; i++) r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
                        return new a.init(r, e)
                    }
                }, d = h.Utf8 = {
                    stringify: function (t) {
                        try {
                            return decodeURIComponent(escape(f.stringify(t)))
                        } catch (t) {
                            throw new Error("Malformed UTF-8 data")
                        }
                    }, parse: function (t) {
                        return f.parse(unescape(encodeURIComponent(t)))
                    }
                }, u = s.BufferedBlockAlgorithm = c.extend({
                    reset: function () {
                        this._data = new a.init, this._nDataBytes = 0
                    }, _append: function (t) {
                        "string" == typeof t && (t = d.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
                    }, _process: function (e) {
                        var r, i = this._data, n = i.words, o = i.sigBytes, s = this.blockSize, c = o / (4 * s),
                            h = (c = e ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0)) * s, l = t.min(4 * h, o);
                        if (h) {
                            for (var f = 0; f < h; f += s) this._doProcessBlock(n, f);
                            r = n.splice(0, h), i.sigBytes -= l
                        }
                        return new a.init(r, l)
                    }, clone: function () {
                        var t = c.clone.call(this);
                        return t._data = this._data.clone(), t
                    }, _minBufferSize: 0
                }), p = (s.Hasher = u.extend({
                    cfg: c.extend(), init: function (t) {
                        this.cfg = this.cfg.extend(t), this.reset()
                    }, reset: function () {
                        u.reset.call(this), this._doReset()
                    }, update: function (t) {
                        return this._append(t), this._process(), this
                    }, finalize: function (t) {
                        return t && this._append(t), this._doFinalize()
                    }, blockSize: 16, _createHelper: function (t) {
                        return function (e, r) {
                            return new t.init(r).finalize(e)
                        }
                    }, _createHmacHelper: function (t) {
                        return function (e, r) {
                            return new p.HMAC.init(t, r).finalize(e)
                        }
                    }
                }), o.algo = {});
                return o
            }(Math);

        function xt(t, e, r) {
            return t ^ e ^ r
        }

        function bt(t, e, r) {
            return t & e | ~t & r
        }

        function Ht(t, e, r) {
            return (t | ~e) ^ r
        }

        function zt(t, e, r) {
            return t & r | e & ~r
        }

        function At(t, e, r) {
            return t ^ (e | ~r)
        }

        function Ct(t, e) {
            return t << e | t >>> 32 - e
        }

        function Dt(t, e, r, i) {
            var n, o = this._iv;
            o ? (n = o.slice(0), this._iv = void 0) : n = this._prevBlock, i.encryptBlock(n, 0);
            for (var s = 0; s < r; s++) t[e + s] ^= n[s]
        }

        function Et(t) {
            if (255 == (t >> 24 & 255)) {
                var e = t >> 16 & 255, r = t >> 8 & 255, i = 255 & t;
                255 === e ? (e = 0, 255 === r ? (r = 0, 255 === i ? i = 0 : ++i) : ++r) : ++e, t = 0, t += e << 16, t += r << 8, t += i
            } else t += 1 << 24;
            return t
        }

        function Rt() {
            for (var t = this._X, e = this._C, r = 0; r < 8; r++) ft[r] = e[r];
            for (e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < ft[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < ft[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < ft[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < ft[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < ft[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < ft[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < ft[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < ft[7] >>> 0 ? 1 : 0, r = 0; r < 8; r++) {
                var i = t[r] + e[r], n = 65535 & i, o = i >>> 16, s = ((n * n >>> 17) + n * o >>> 15) + o * o,
                    c = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                dt[r] = s ^ c
            }
            t[0] = dt[0] + (dt[7] << 16 | dt[7] >>> 16) + (dt[6] << 16 | dt[6] >>> 16) | 0, t[1] = dt[1] + (dt[0] << 8 | dt[0] >>> 24) + dt[7] | 0, t[2] = dt[2] + (dt[1] << 16 | dt[1] >>> 16) + (dt[0] << 16 | dt[0] >>> 16) | 0, t[3] = dt[3] + (dt[2] << 8 | dt[2] >>> 24) + dt[1] | 0, t[4] = dt[4] + (dt[3] << 16 | dt[3] >>> 16) + (dt[2] << 16 | dt[2] >>> 16) | 0, t[5] = dt[5] + (dt[4] << 8 | dt[4] >>> 24) + dt[3] | 0, t[6] = dt[6] + (dt[5] << 16 | dt[5] >>> 16) + (dt[4] << 16 | dt[4] >>> 16) | 0, t[7] = dt[7] + (dt[6] << 8 | dt[6] >>> 24) + dt[5] | 0
        }

        function Mt() {
            for (var t = this._X, e = this._C, r = 0; r < 8; r++) wt[r] = e[r];
            for (e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < wt[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < wt[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < wt[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < wt[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < wt[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < wt[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < wt[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < wt[7] >>> 0 ? 1 : 0, r = 0; r < 8; r++) {
                var i = t[r] + e[r], n = 65535 & i, o = i >>> 16, s = ((n * n >>> 17) + n * o >>> 15) + o * o,
                    c = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                kt[r] = s ^ c
            }
            t[0] = kt[0] + (kt[7] << 16 | kt[7] >>> 16) + (kt[6] << 16 | kt[6] >>> 16) | 0, t[1] = kt[1] + (kt[0] << 8 | kt[0] >>> 24) + kt[7] | 0, t[2] = kt[2] + (kt[1] << 16 | kt[1] >>> 16) + (kt[0] << 16 | kt[0] >>> 16) | 0, t[3] = kt[3] + (kt[2] << 8 | kt[2] >>> 24) + kt[1] | 0, t[4] = kt[4] + (kt[3] << 16 | kt[3] >>> 16) + (kt[2] << 16 | kt[2] >>> 16) | 0, t[5] = kt[5] + (kt[4] << 8 | kt[4] >>> 24) + kt[3] | 0, t[6] = kt[6] + (kt[5] << 16 | kt[5] >>> 16) + (kt[4] << 16 | kt[4] >>> 16) | 0, t[7] = kt[7] + (kt[6] << 8 | kt[6] >>> 24) + kt[5] | 0
        }

        return t = mt.lib.WordArray, mt.enc.Base64 = {
            stringify: function (t) {
                var e = t.words, r = t.sigBytes, i = this._map;
                t.clamp();
                for (var n = [], o = 0; o < r; o += 3) for (var s = (e[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, c = 0; c < 4 && o + .75 * c < r; c++) n.push(i.charAt(s >>> 6 * (3 - c) & 63));
                var a = i.charAt(64);
                if (a) for (; n.length % 4;) n.push(a);
                return n.join("")
            }, parse: function (e) {
                var r = e.length, i = this._map, n = this._reverseMap;
                if (!n) {
                    n = this._reverseMap = [];
                    for (var o = 0; o < i.length; o++) n[i.charCodeAt(o)] = o
                }
                var s = i.charAt(64);
                if (s) {
                    var c = e.indexOf(s);
                    -1 !== c && (r = c)
                }
                return function (e, r, i) {
                    for (var n = [], o = 0, s = 0; s < r; s++) if (s % 4) {
                        var c = i[e.charCodeAt(s - 1)] << s % 4 * 2 | i[e.charCodeAt(s)] >>> 6 - s % 4 * 2;
                        n[o >>> 2] |= c << 24 - o % 4 * 8, o++
                    }
                    return t.create(n, o)
                }(e, r, n)
            }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }, function (t) {
            var e = mt, r = e.lib, i = r.WordArray, n = r.Hasher, o = e.algo, s = [];
            !function () {
                for (var e = 0; e < 64; e++) s[e] = 4294967296 * t.abs(t.sin(e + 1)) | 0
            }();
            var c = o.MD5 = n.extend({
                _doReset: function () {
                    this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878])
                }, _doProcessBlock: function (t, e) {
                    for (var r = 0; r < 16; r++) {
                        var i = e + r, n = t[i];
                        t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8)
                    }
                    var o = this._hash.words, c = t[e + 0], d = t[e + 1], u = t[e + 2], p = t[e + 3], _ = t[e + 4],
                        v = t[e + 5], y = t[e + 6], g = t[e + 7], B = t[e + 8], w = t[e + 9], k = t[e + 10],
                        S = t[e + 11], m = t[e + 12], x = t[e + 13], b = t[e + 14], H = t[e + 15], z = o[0], A = o[1],
                        C = o[2], D = o[3];
                    z = f(z = l(z = l(z = l(z = l(z = h(z = h(z = h(z = h(z = a(z = a(z = a(z = a(z, A, C, D, c, 7, s[0]), A = a(A, C = a(C, D = a(D, z, A, C, d, 12, s[1]), z, A, u, 17, s[2]), D, z, p, 22, s[3]), C, D, _, 7, s[4]), A = a(A, C = a(C, D = a(D, z, A, C, v, 12, s[5]), z, A, y, 17, s[6]), D, z, g, 22, s[7]), C, D, B, 7, s[8]), A = a(A, C = a(C, D = a(D, z, A, C, w, 12, s[9]), z, A, k, 17, s[10]), D, z, S, 22, s[11]), C, D, m, 7, s[12]), A = a(A, C = a(C, D = a(D, z, A, C, x, 12, s[13]), z, A, b, 17, s[14]), D, z, H, 22, s[15]), C, D, d, 5, s[16]), A = h(A, C = h(C, D = h(D, z, A, C, y, 9, s[17]), z, A, S, 14, s[18]), D, z, c, 20, s[19]), C, D, v, 5, s[20]), A = h(A, C = h(C, D = h(D, z, A, C, k, 9, s[21]), z, A, H, 14, s[22]), D, z, _, 20, s[23]), C, D, w, 5, s[24]), A = h(A, C = h(C, D = h(D, z, A, C, b, 9, s[25]), z, A, p, 14, s[26]), D, z, B, 20, s[27]), C, D, x, 5, s[28]), A = h(A, C = h(C, D = h(D, z, A, C, u, 9, s[29]), z, A, g, 14, s[30]), D, z, m, 20, s[31]), C, D, v, 4, s[32]), A = l(A, C = l(C, D = l(D, z, A, C, B, 11, s[33]), z, A, S, 16, s[34]), D, z, b, 23, s[35]), C, D, d, 4, s[36]), A = l(A, C = l(C, D = l(D, z, A, C, _, 11, s[37]), z, A, g, 16, s[38]), D, z, k, 23, s[39]), C, D, x, 4, s[40]), A = l(A, C = l(C, D = l(D, z, A, C, c, 11, s[41]), z, A, p, 16, s[42]), D, z, y, 23, s[43]), C, D, w, 4, s[44]), A = l(A, C = l(C, D = l(D, z, A, C, m, 11, s[45]), z, A, H, 16, s[46]), D, z, u, 23, s[47]), C, D, c, 6, s[48]), A = f(A = f(A = f(A = f(A, C = f(C, D = f(D, z, A, C, g, 10, s[49]), z, A, b, 15, s[50]), D, z, v, 21, s[51]), C = f(C, D = f(D, z = f(z, A, C, D, m, 6, s[52]), A, C, p, 10, s[53]), z, A, k, 15, s[54]), D, z, d, 21, s[55]), C = f(C, D = f(D, z = f(z, A, C, D, B, 6, s[56]), A, C, H, 10, s[57]), z, A, y, 15, s[58]), D, z, x, 21, s[59]), C = f(C, D = f(D, z = f(z, A, C, D, _, 6, s[60]), A, C, S, 10, s[61]), z, A, u, 15, s[62]), D, z, w, 21, s[63]), o[0] = o[0] + z | 0, o[1] = o[1] + A | 0, o[2] = o[2] + C | 0, o[3] = o[3] + D | 0
                }, _doFinalize: function () {
                    var e = this._data, r = e.words, i = 8 * this._nDataBytes, n = 8 * e.sigBytes;
                    r[n >>> 5] |= 128 << 24 - n % 32;
                    var o = t.floor(i / 4294967296), s = i;
                    r[15 + (64 + n >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), r[14 + (64 + n >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), e.sigBytes = 4 * (r.length + 1), this._process();
                    for (var c = this._hash, a = c.words, h = 0; h < 4; h++) {
                        var l = a[h];
                        a[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                    }
                    return c
                }, clone: function () {
                    var t = n.clone.call(this);
                    return t._hash = this._hash.clone(), t
                }
            });

            function a(t, e, r, i, n, o, s) {
                var c = t + (e & r | ~e & i) + n + s;
                return (c << o | c >>> 32 - o) + e
            }

            function h(t, e, r, i, n, o, s) {
                var c = t + (e & i | r & ~i) + n + s;
                return (c << o | c >>> 32 - o) + e
            }

            function l(t, e, r, i, n, o, s) {
                var c = t + (e ^ r ^ i) + n + s;
                return (c << o | c >>> 32 - o) + e
            }

            function f(t, e, r, i, n, o, s) {
                var c = t + (r ^ (e | ~i)) + n + s;
                return (c << o | c >>> 32 - o) + e
            }

            e.MD5 = n._createHelper(c), e.HmacMD5 = n._createHmacHelper(c)
        }(Math), r = (e = mt).lib, i = r.WordArray, n = r.Hasher, o = e.algo, s = [], c = o.SHA1 = n.extend({
            _doReset: function () {
                this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
            }, _doProcessBlock: function (t, e) {
                for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], c = r[3], a = r[4], h = 0; h < 80; h++) {
                    if (h < 16) s[h] = 0 | t[e + h]; else {
                        var l = s[h - 3] ^ s[h - 8] ^ s[h - 14] ^ s[h - 16];
                        s[h] = l << 1 | l >>> 31
                    }
                    var f = (i << 5 | i >>> 27) + a + s[h];
                    f += h < 20 ? 1518500249 + (n & o | ~n & c) : h < 40 ? 1859775393 + (n ^ o ^ c) : h < 60 ? (n & o | n & c | o & c) - 1894007588 : (n ^ o ^ c) - 899497514, a = c, c = o, o = n << 30 | n >>> 2, n = i, i = f
                }
                r[0] = r[0] + i | 0, r[1] = r[1] + n | 0, r[2] = r[2] + o | 0, r[3] = r[3] + c | 0, r[4] = r[4] + a | 0
            }, _doFinalize: function () {
                var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes;
                return e[i >>> 5] |= 128 << 24 - i % 32, e[14 + (64 + i >>> 9 << 4)] = Math.floor(r / 4294967296), e[15 + (64 + i >>> 9 << 4)] = r, t.sigBytes = 4 * e.length, this._process(), this._hash
            }, clone: function () {
                var t = n.clone.call(this);
                return t._hash = this._hash.clone(), t
            }
        }), e.SHA1 = n._createHelper(c), e.HmacSHA1 = n._createHmacHelper(c), function (t) {
            var e = mt, r = e.lib, i = r.WordArray, n = r.Hasher, o = e.algo, s = [], c = [];
            !function () {
                function e(e) {
                    for (var r = t.sqrt(e), i = 2; i <= r; i++) if (!(e % i)) return;
                    return 1
                }

                function r(t) {
                    return 4294967296 * (t - (0 | t)) | 0
                }

                for (var i = 2, n = 0; n < 64;) e(i) && (n < 8 && (s[n] = r(t.pow(i, .5))), c[n] = r(t.pow(i, 1 / 3)), n++), i++
            }();
            var a = [], h = o.SHA256 = n.extend({
                _doReset: function () {
                    this._hash = new i.init(s.slice(0))
                }, _doProcessBlock: function (t, e) {
                    for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], h = r[4], l = r[5], f = r[6], d = r[7], u = 0; u < 64; u++) {
                        if (u < 16) a[u] = 0 | t[e + u]; else {
                            var p = a[u - 15], _ = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3, v = a[u - 2],
                                y = (v << 15 | v >>> 17) ^ (v << 13 | v >>> 19) ^ v >>> 10;
                            a[u] = _ + a[u - 7] + y + a[u - 16]
                        }
                        var g = i & n ^ i & o ^ n & o,
                            B = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22),
                            w = d + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & l ^ ~h & f) + c[u] + a[u];
                        d = f, f = l, l = h, h = s + w | 0, s = o, o = n, n = i, i = w + (B + g) | 0
                    }
                    r[0] = r[0] + i | 0, r[1] = r[1] + n | 0, r[2] = r[2] + o | 0, r[3] = r[3] + s | 0, r[4] = r[4] + h | 0, r[5] = r[5] + l | 0, r[6] = r[6] + f | 0, r[7] = r[7] + d | 0
                }, _doFinalize: function () {
                    var e = this._data, r = e.words, i = 8 * this._nDataBytes, n = 8 * e.sigBytes;
                    return r[n >>> 5] |= 128 << 24 - n % 32, r[14 + (64 + n >>> 9 << 4)] = t.floor(i / 4294967296), r[15 + (64 + n >>> 9 << 4)] = i, e.sigBytes = 4 * r.length, this._process(), this._hash
                }, clone: function () {
                    var t = n.clone.call(this);
                    return t._hash = this._hash.clone(), t
                }
            });
            e.SHA256 = n._createHelper(h), e.HmacSHA256 = n._createHmacHelper(h)
        }(Math), function () {
            var t = mt.lib.WordArray, e = mt.enc;

            function r(t) {
                return t << 8 & 4278255360 | t >>> 8 & 16711935
            }

            e.Utf16 = e.Utf16BE = {
                stringify: function (t) {
                    for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n += 2) {
                        var o = e[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
                        i.push(String.fromCharCode(o))
                    }
                    return i.join("")
                }, parse: function (e) {
                    for (var r = e.length, i = [], n = 0; n < r; n++) i[n >>> 1] |= e.charCodeAt(n) << 16 - n % 2 * 16;
                    return t.create(i, 2 * r)
                }
            }, e.Utf16LE = {
                stringify: function (t) {
                    for (var e = t.words, i = t.sigBytes, n = [], o = 0; o < i; o += 2) {
                        var s = r(e[o >>> 2] >>> 16 - o % 4 * 8 & 65535);
                        n.push(String.fromCharCode(s))
                    }
                    return n.join("")
                }, parse: function (e) {
                    for (var i = e.length, n = [], o = 0; o < i; o++) n[o >>> 1] |= r(e.charCodeAt(o) << 16 - o % 2 * 16);
                    return t.create(n, 2 * i)
                }
            }
        }(), function () {
            if ("function" == typeof ArrayBuffer) {
                var t = mt.lib.WordArray, e = t.init;
                (t.init = function (t) {
                    if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) {
                        for (var r = t.byteLength, i = [], n = 0; n < r; n++) i[n >>> 2] |= t[n] << 24 - n % 4 * 8;
                        e.call(this, i, r)
                    } else e.apply(this, arguments)
                }).prototype = t
            }
        }(), Math, h = (a = mt).lib, l = h.WordArray, f = h.Hasher, d = a.algo, u = l.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), p = l.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), _ = l.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]), v = l.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), y = l.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), g = l.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), B = d.RIPEMD160 = f.extend({
            _doReset: function () {
                this._hash = l.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
            }, _doProcessBlock: function (t, e) {
                for (var r = 0; r < 16; r++) {
                    var i = e + r, n = t[i];
                    t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8)
                }
                var o, s, c, a, h, l, f, d, B, w, k, S = this._hash.words, m = y.words, x = g.words, b = u.words,
                    H = p.words, z = _.words, A = v.words;
                for (l = o = S[0], f = s = S[1], d = c = S[2], B = a = S[3], w = h = S[4], r = 0; r < 80; r += 1) k = o + t[e + b[r]] | 0, k += r < 16 ? xt(s, c, a) + m[0] : r < 32 ? bt(s, c, a) + m[1] : r < 48 ? Ht(s, c, a) + m[2] : r < 64 ? zt(s, c, a) + m[3] : At(s, c, a) + m[4], k = (k = Ct(k |= 0, z[r])) + h | 0, o = h, h = a, a = Ct(c, 10), c = s, s = k, k = l + t[e + H[r]] | 0, k += r < 16 ? At(f, d, B) + x[0] : r < 32 ? zt(f, d, B) + x[1] : r < 48 ? Ht(f, d, B) + x[2] : r < 64 ? bt(f, d, B) + x[3] : xt(f, d, B) + x[4], k = (k = Ct(k |= 0, A[r])) + w | 0, l = w, w = B, B = Ct(d, 10), d = f, f = k;
                k = S[1] + c + B | 0, S[1] = S[2] + a + w | 0, S[2] = S[3] + h + l | 0, S[3] = S[4] + o + f | 0, S[4] = S[0] + s + d | 0, S[0] = k
            }, _doFinalize: function () {
                var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes;
                e[i >>> 5] |= 128 << 24 - i % 32, e[14 + (64 + i >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), t.sigBytes = 4 * (e.length + 1), this._process();
                for (var n = this._hash, o = n.words, s = 0; s < 5; s++) {
                    var c = o[s];
                    o[s] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                }
                return n
            }, clone: function () {
                var t = f.clone.call(this);
                return t._hash = this._hash.clone(), t
            }
        }), a.RIPEMD160 = f._createHelper(B), a.HmacRIPEMD160 = f._createHmacHelper(B), w = mt.lib.Base, k = mt.enc.Utf8, mt.algo.HMAC = w.extend({
            init: function (t, e) {
                t = this._hasher = new t.init, "string" == typeof e && (e = k.parse(e));
                var r = t.blockSize, i = 4 * r;
                e.sigBytes > i && (e = t.finalize(e)), e.clamp();
                for (var n = this._oKey = e.clone(), o = this._iKey = e.clone(), s = n.words, c = o.words, a = 0; a < r; a++) s[a] ^= 1549556828, c[a] ^= 909522486;
                n.sigBytes = o.sigBytes = i, this.reset()
            }, reset: function () {
                var t = this._hasher;
                t.reset(), t.update(this._iKey)
            }, update: function (t) {
                return this._hasher.update(t), this
            }, finalize: function (t) {
                var e = this._hasher, r = e.finalize(t);
                return e.reset(), e.finalize(this._oKey.clone().concat(r))
            }
        }), x = (m = (S = mt).lib).Base, b = m.WordArray, z = (H = S.algo).SHA1, A = H.HMAC, C = H.PBKDF2 = x.extend({
            cfg: x.extend({
                keySize: 4,
                hasher: z,
                iterations: 1
            }), init: function (t) {
                this.cfg = this.cfg.extend(t)
            }, compute: function (t, e) {
                for (var r = this.cfg, i = A.create(r.hasher, t), n = b.create(), o = b.create([1]), s = n.words, c = o.words, a = r.keySize, h = r.iterations; s.length < a;) {
                    var l = i.update(e).finalize(o);
                    i.reset();
                    for (var f = l.words, d = f.length, u = l, p = 1; p < h; p++) {
                        u = i.finalize(u), i.reset();
                        for (var _ = u.words, v = 0; v < d; v++) f[v] ^= _[v]
                    }
                    n.concat(l), c[0]++
                }
                return n.sigBytes = 4 * a, n
            }
        }), S.PBKDF2 = function (t, e, r) {
            return C.create(r).compute(t, e)
        }, R = (E = (D = mt).lib).Base, M = E.WordArray, P = (F = D.algo).MD5, W = F.EvpKDF = R.extend({
            cfg: R.extend({
                keySize: 4,
                hasher: P,
                iterations: 1
            }), init: function (t) {
                this.cfg = this.cfg.extend(t)
            }, compute: function (t, e) {
                for (var r, i = this.cfg, n = i.hasher.create(), o = M.create(), s = o.words, c = i.keySize, a = i.iterations; s.length < c;) {
                    r && n.update(r), r = n.update(t).finalize(e), n.reset();
                    for (var h = 1; h < a; h++) r = n.finalize(r), n.reset();
                    o.concat(r)
                }
                return o.sigBytes = 4 * c, o
            }
        }), D.EvpKDF = function (t, e, r) {
            return W.create(r).compute(t, e)
        }, I = (O = mt).lib.WordArray, U = O.algo, K = U.SHA256, X = U.SHA224 = K.extend({
            _doReset: function () {
                this._hash = new I.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
            }, _doFinalize: function () {
                var t = K._doFinalize.call(this);
                return t.sigBytes -= 4, t
            }
        }), O.SHA224 = K._createHelper(X), O.HmacSHA224 = K._createHmacHelper(X), L = mt.lib, j = L.Base, N = L.WordArray, (T = mt.x64 = {}).Word = j.extend({
            init: function (t, e) {
                this.high = t, this.low = e
            }
        }), T.WordArray = j.extend({
            init: function (t, e) {
                t = this.words = t || [], this.sigBytes = null != e ? e : 8 * t.length
            }, toX32: function () {
                for (var t = this.words, e = t.length, r = [], i = 0; i < e; i++) {
                    var n = t[i];
                    r.push(n.high), r.push(n.low)
                }
                return N.create(r, this.sigBytes)
            }, clone: function () {
                for (var t = j.clone.call(this), e = t.words = this.words.slice(0), r = e.length, i = 0; i < r; i++) e[i] = e[i].clone();
                return t
            }
        }), function (t) {
            var e = mt, r = e.lib, i = r.WordArray, n = r.Hasher, o = e.x64.Word, s = e.algo, c = [], a = [], h = [];
            !function () {
                for (var t = 1, e = 0, r = 0; r < 24; r++) {
                    c[t + 5 * e] = (r + 1) * (r + 2) / 2 % 64;
                    var i = (2 * t + 3 * e) % 5;
                    t = e % 5, e = i
                }
                for (t = 0; t < 5; t++) for (e = 0; e < 5; e++) a[t + 5 * e] = e + (2 * t + 3 * e) % 5 * 5;
                for (var n = 1, s = 0; s < 24; s++) {
                    for (var l = 0, f = 0, d = 0; d < 7; d++) {
                        if (1 & n) {
                            var u = (1 << d) - 1;
                            u < 32 ? f ^= 1 << u : l ^= 1 << u - 32
                        }
                        128 & n ? n = n << 1 ^ 113 : n <<= 1
                    }
                    h[s] = o.create(l, f)
                }
            }();
            var l = [];
            !function () {
                for (var t = 0; t < 25; t++) l[t] = o.create()
            }();
            var f = s.SHA3 = n.extend({
                cfg: n.cfg.extend({outputLength: 512}), _doReset: function () {
                    for (var t = this._state = [], e = 0; e < 25; e++) t[e] = new o.init;
                    this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                }, _doProcessBlock: function (t, e) {
                    for (var r = this._state, i = this.blockSize / 2, n = 0; n < i; n++) {
                        var o = t[e + 2 * n], s = t[e + 2 * n + 1];
                        o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), (A = r[n]).high ^= s, A.low ^= o
                    }
                    for (var f = 0; f < 24; f++) {
                        for (var d = 0; d < 5; d++) {
                            for (var u = 0, p = 0, _ = 0; _ < 5; _++) u ^= (A = r[d + 5 * _]).high, p ^= A.low;
                            var v = l[d];
                            v.high = u, v.low = p
                        }
                        for (d = 0; d < 5; d++) {
                            var y = l[(d + 4) % 5], g = l[(d + 1) % 5], B = g.high, w = g.low;
                            for (u = y.high ^ (B << 1 | w >>> 31), p = y.low ^ (w << 1 | B >>> 31), _ = 0; _ < 5; _++) (A = r[d + 5 * _]).high ^= u, A.low ^= p
                        }
                        for (var k = 1; k < 25; k++) {
                            var S = (A = r[k]).high, m = A.low, x = c[k];
                            p = x < 32 ? (u = S << x | m >>> 32 - x, m << x | S >>> 32 - x) : (u = m << x - 32 | S >>> 64 - x, S << x - 32 | m >>> 64 - x);
                            var b = l[a[k]];
                            b.high = u, b.low = p
                        }
                        var H = l[0], z = r[0];
                        for (H.high = z.high, H.low = z.low, d = 0; d < 5; d++) for (_ = 0; _ < 5; _++) {
                            var A = r[k = d + 5 * _], C = l[k], D = l[(d + 1) % 5 + 5 * _], E = l[(d + 2) % 5 + 5 * _];
                            A.high = C.high ^ ~D.high & E.high, A.low = C.low ^ ~D.low & E.low
                        }
                        A = r[0];
                        var R = h[f];
                        A.high ^= R.high, A.low ^= R.low
                    }
                }, _doFinalize: function () {
                    var e = this._data, r = e.words, n = (this._nDataBytes, 8 * e.sigBytes), o = 32 * this.blockSize;
                    r[n >>> 5] |= 1 << 24 - n % 32, r[(t.ceil((1 + n) / o) * o >>> 5) - 1] |= 128, e.sigBytes = 4 * r.length, this._process();
                    for (var s = this._state, c = this.cfg.outputLength / 8, a = c / 8, h = [], l = 0; l < a; l++) {
                        var f = s[l], d = f.high, u = f.low;
                        d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), u = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8), h.push(u), h.push(d)
                    }
                    return new i.init(h, c)
                }, clone: function () {
                    for (var t = n.clone.call(this), e = t._state = this._state.slice(0), r = 0; r < 25; r++) e[r] = e[r].clone();
                    return t
                }
            });
            e.SHA3 = n._createHelper(f), e.HmacSHA3 = n._createHmacHelper(f)
        }(Math), function () {
            var t = mt, e = t.lib.Hasher, r = t.x64, i = r.Word, n = r.WordArray, o = t.algo;

            function s() {
                return i.create.apply(i, arguments)
            }

            var c = [s(1116352408, 3609767458), s(1899447441, 602891725), s(3049323471, 3964484399), s(3921009573, 2173295548), s(961987163, 4081628472), s(1508970993, 3053834265), s(2453635748, 2937671579), s(2870763221, 3664609560), s(3624381080, 2734883394), s(310598401, 1164996542), s(607225278, 1323610764), s(1426881987, 3590304994), s(1925078388, 4068182383), s(2162078206, 991336113), s(2614888103, 633803317), s(3248222580, 3479774868), s(3835390401, 2666613458), s(4022224774, 944711139), s(264347078, 2341262773), s(604807628, 2007800933), s(770255983, 1495990901), s(1249150122, 1856431235), s(1555081692, 3175218132), s(1996064986, 2198950837), s(2554220882, 3999719339), s(2821834349, 766784016), s(2952996808, 2566594879), s(3210313671, 3203337956), s(3336571891, 1034457026), s(3584528711, 2466948901), s(113926993, 3758326383), s(338241895, 168717936), s(666307205, 1188179964), s(773529912, 1546045734), s(1294757372, 1522805485), s(1396182291, 2643833823), s(1695183700, 2343527390), s(1986661051, 1014477480), s(2177026350, 1206759142), s(2456956037, 344077627), s(2730485921, 1290863460), s(2820302411, 3158454273), s(3259730800, 3505952657), s(3345764771, 106217008), s(3516065817, 3606008344), s(3600352804, 1432725776), s(4094571909, 1467031594), s(275423344, 851169720), s(430227734, 3100823752), s(506948616, 1363258195), s(659060556, 3750685593), s(883997877, 3785050280), s(958139571, 3318307427), s(1322822218, 3812723403), s(1537002063, 2003034995), s(1747873779, 3602036899), s(1955562222, 1575990012), s(2024104815, 1125592928), s(2227730452, 2716904306), s(2361852424, 442776044), s(2428436474, 593698344), s(2756734187, 3733110249), s(3204031479, 2999351573), s(3329325298, 3815920427), s(3391569614, 3928383900), s(3515267271, 566280711), s(3940187606, 3454069534), s(4118630271, 4000239992), s(116418474, 1914138554), s(174292421, 2731055270), s(289380356, 3203993006), s(460393269, 320620315), s(685471733, 587496836), s(852142971, 1086792851), s(1017036298, 365543100), s(1126000580, 2618297676), s(1288033470, 3409855158), s(1501505948, 4234509866), s(1607167915, 987167468), s(1816402316, 1246189591)],
                a = [];
            !function () {
                for (var t = 0; t < 80; t++) a[t] = s()
            }();
            var h = o.SHA512 = e.extend({
                _doReset: function () {
                    this._hash = new n.init([new i.init(1779033703, 4089235720), new i.init(3144134277, 2227873595), new i.init(1013904242, 4271175723), new i.init(2773480762, 1595750129), new i.init(1359893119, 2917565137), new i.init(2600822924, 725511199), new i.init(528734635, 4215389547), new i.init(1541459225, 327033209)])
                }, _doProcessBlock: function (t, e) {
                    for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], h = r[4], l = r[5], f = r[6], d = r[7], u = i.high, p = i.low, _ = n.high, v = n.low, y = o.high, g = o.low, B = s.high, w = s.low, k = h.high, S = h.low, m = l.high, x = l.low, b = f.high, H = f.low, z = d.high, A = d.low, C = u, D = p, E = _, R = v, M = y, F = g, P = B, W = w, O = k, I = S, U = m, K = x, X = b, L = H, j = z, N = A, T = 0; T < 80; T++) {
                        var q, Z, V = a[T];
                        if (T < 16) Z = V.high = 0 | t[e + 2 * T], q = V.low = 0 | t[e + 2 * T + 1]; else {
                            var G = a[T - 15], J = G.high, $ = G.low,
                                Q = (J >>> 1 | $ << 31) ^ (J >>> 8 | $ << 24) ^ J >>> 7,
                                Y = ($ >>> 1 | J << 31) ^ ($ >>> 8 | J << 24) ^ ($ >>> 7 | J << 25), tt = a[T - 2],
                                et = tt.high, rt = tt.low,
                                it = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ et >>> 6,
                                nt = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ (rt >>> 6 | et << 26),
                                ot = a[T - 7], st = ot.high, ct = ot.low, at = a[T - 16], ht = at.high, lt = at.low;
                            Z = (Z = (Z = Q + st + ((q = Y + ct) >>> 0 < Y >>> 0 ? 1 : 0)) + it + ((q += nt) >>> 0 < nt >>> 0 ? 1 : 0)) + ht + ((q += lt) >>> 0 < lt >>> 0 ? 1 : 0), V.high = Z, V.low = q
                        }
                        var ft, dt = O & U ^ ~O & X, ut = I & K ^ ~I & L, pt = C & E ^ C & M ^ E & M,
                            _t = D & R ^ D & F ^ R & F,
                            vt = (C >>> 28 | D << 4) ^ (C << 30 | D >>> 2) ^ (C << 25 | D >>> 7),
                            yt = (D >>> 28 | C << 4) ^ (D << 30 | C >>> 2) ^ (D << 25 | C >>> 7),
                            gt = (O >>> 14 | I << 18) ^ (O >>> 18 | I << 14) ^ (O << 23 | I >>> 9),
                            Bt = (I >>> 14 | O << 18) ^ (I >>> 18 | O << 14) ^ (I << 23 | O >>> 9), wt = c[T],
                            kt = wt.high, St = wt.low, mt = j + gt + ((ft = N + Bt) >>> 0 < N >>> 0 ? 1 : 0),
                            xt = yt + _t;
                        j = X, N = L, X = U, L = K, U = O, K = I, O = P + (mt = (mt = (mt = mt + dt + ((ft += ut) >>> 0 < ut >>> 0 ? 1 : 0)) + kt + ((ft += St) >>> 0 < St >>> 0 ? 1 : 0)) + Z + ((ft += q) >>> 0 < q >>> 0 ? 1 : 0)) + ((I = W + ft | 0) >>> 0 < W >>> 0 ? 1 : 0) | 0, P = M, W = F, M = E, F = R, E = C, R = D, C = mt + (vt + pt + (xt >>> 0 < yt >>> 0 ? 1 : 0)) + ((D = ft + xt | 0) >>> 0 < ft >>> 0 ? 1 : 0) | 0
                    }
                    p = i.low = p + D, i.high = u + C + (p >>> 0 < D >>> 0 ? 1 : 0), v = n.low = v + R, n.high = _ + E + (v >>> 0 < R >>> 0 ? 1 : 0), g = o.low = g + F, o.high = y + M + (g >>> 0 < F >>> 0 ? 1 : 0), w = s.low = w + W, s.high = B + P + (w >>> 0 < W >>> 0 ? 1 : 0), S = h.low = S + I, h.high = k + O + (S >>> 0 < I >>> 0 ? 1 : 0), x = l.low = x + K, l.high = m + U + (x >>> 0 < K >>> 0 ? 1 : 0), H = f.low = H + L, f.high = b + X + (H >>> 0 < L >>> 0 ? 1 : 0), A = d.low = A + N, d.high = z + j + (A >>> 0 < N >>> 0 ? 1 : 0)
                }, _doFinalize: function () {
                    var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes;
                    return e[i >>> 5] |= 128 << 24 - i % 32, e[30 + (128 + i >>> 10 << 5)] = Math.floor(r / 4294967296), e[31 + (128 + i >>> 10 << 5)] = r, t.sigBytes = 4 * e.length, this._process(), this._hash.toX32()
                }, clone: function () {
                    var t = e.clone.call(this);
                    return t._hash = this._hash.clone(), t
                }, blockSize: 32
            });
            t.SHA512 = e._createHelper(h), t.HmacSHA512 = e._createHmacHelper(h)
        }(), Z = (q = mt).x64, V = Z.Word, G = Z.WordArray, J = q.algo, $ = J.SHA512, Q = J.SHA384 = $.extend({
            _doReset: function () {
                this._hash = new G.init([new V.init(3418070365, 3238371032), new V.init(1654270250, 914150663), new V.init(2438529370, 812702999), new V.init(355462360, 4144912697), new V.init(1731405415, 4290775857), new V.init(2394180231, 1750603025), new V.init(3675008525, 1694076839), new V.init(1203062813, 3204075428)])
            }, _doFinalize: function () {
                var t = $._doFinalize.call(this);
                return t.sigBytes -= 16, t
            }
        }), q.SHA384 = $._createHelper(Q), q.HmacSHA384 = $._createHmacHelper(Q), mt.lib.Cipher || function () {
            var t = mt, e = t.lib, r = e.Base, i = e.WordArray, n = e.BufferedBlockAlgorithm, o = t.enc,
                s = (o.Utf8, o.Base64), c = t.algo.EvpKDF, a = e.Cipher = n.extend({
                    cfg: r.extend(), createEncryptor: function (t, e) {
                        return this.create(this._ENC_XFORM_MODE, t, e)
                    }, createDecryptor: function (t, e) {
                        return this.create(this._DEC_XFORM_MODE, t, e)
                    }, init: function (t, e, r) {
                        this.cfg = this.cfg.extend(r), this._xformMode = t, this._key = e, this.reset()
                    }, reset: function () {
                        n.reset.call(this), this._doReset()
                    }, process: function (t) {
                        return this._append(t), this._process()
                    }, finalize: function (t) {
                        return t && this._append(t), this._doFinalize()
                    }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (t) {
                        return {
                            encrypt: function (e, r, i) {
                                return h(r).encrypt(t, e, r, i)
                            }, decrypt: function (e, r, i) {
                                return h(r).decrypt(t, e, r, i)
                            }
                        }
                    }
                });

            function h(t) {
                return "string" == typeof t ? w : g
            }

            e.StreamCipher = a.extend({
                _doFinalize: function () {
                    return this._process(!0)
                }, blockSize: 1
            });
            var l, f = t.mode = {}, d = e.BlockCipherMode = r.extend({
                createEncryptor: function (t, e) {
                    return this.Encryptor.create(t, e)
                }, createDecryptor: function (t, e) {
                    return this.Decryptor.create(t, e)
                }, init: function (t, e) {
                    this._cipher = t, this._iv = e
                }
            }), u = f.CBC = ((l = d.extend()).Encryptor = l.extend({
                processBlock: function (t, e) {
                    var r = this._cipher, i = r.blockSize;
                    p.call(this, t, e, i), r.encryptBlock(t, e), this._prevBlock = t.slice(e, e + i)
                }
            }), l.Decryptor = l.extend({
                processBlock: function (t, e) {
                    var r = this._cipher, i = r.blockSize, n = t.slice(e, e + i);
                    r.decryptBlock(t, e), p.call(this, t, e, i), this._prevBlock = n
                }
            }), l);

            function p(t, e, r) {
                var i, n = this._iv;
                n ? (i = n, this._iv = void 0) : i = this._prevBlock;
                for (var o = 0; o < r; o++) t[e + o] ^= i[o]
            }

            var _ = (t.pad = {}).Pkcs7 = {
                pad: function (t, e) {
                    for (var r = 4 * e, n = r - t.sigBytes % r, o = n << 24 | n << 16 | n << 8 | n, s = [], c = 0; c < n; c += 4) s.push(o);
                    var a = i.create(s, n);
                    t.concat(a)
                }, unpad: function (t) {
                    var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                    t.sigBytes -= e
                }
            }, v = (e.BlockCipher = a.extend({
                cfg: a.cfg.extend({mode: u, padding: _}), reset: function () {
                    var t;
                    a.reset.call(this);
                    var e = this.cfg, r = e.iv, i = e.mode;
                    this._xformMode == this._ENC_XFORM_MODE ? t = i.createEncryptor : (t = i.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == t ? this._mode.init(this, r && r.words) : (this._mode = t.call(i, this, r && r.words), this._mode.__creator = t)
                }, _doProcessBlock: function (t, e) {
                    this._mode.processBlock(t, e)
                }, _doFinalize: function () {
                    var t, e = this.cfg.padding;
                    return this._xformMode == this._ENC_XFORM_MODE ? (e.pad(this._data, this.blockSize), t = this._process(!0)) : (t = this._process(!0), e.unpad(t)), t
                }, blockSize: 4
            }), e.CipherParams = r.extend({
                init: function (t) {
                    this.mixIn(t)
                }, toString: function (t) {
                    return (t || this.formatter).stringify(this)
                }
            })), y = (t.format = {}).OpenSSL = {
                stringify: function (t) {
                    var e = t.ciphertext, r = t.salt;
                    return (r ? i.create([1398893684, 1701076831]).concat(r).concat(e) : e).toString(s)
                }, parse: function (t) {
                    var e, r = s.parse(t), n = r.words;
                    return 1398893684 == n[0] && 1701076831 == n[1] && (e = i.create(n.slice(2, 4)), n.splice(0, 4), r.sigBytes -= 16), v.create({
                        ciphertext: r,
                        salt: e
                    })
                }
            }, g = e.SerializableCipher = r.extend({
                cfg: r.extend({format: y}), encrypt: function (t, e, r, i) {
                    i = this.cfg.extend(i);
                    var n = t.createEncryptor(r, i), o = n.finalize(e), s = n.cfg;
                    return v.create({
                        ciphertext: o,
                        key: r,
                        iv: s.iv,
                        algorithm: t,

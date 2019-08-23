import Vue from 'vue';
import Vuex from 'vuex';
import fly from '@/utils/fly';

Vue.use(Vuex);

let machinetype=[]
let nursezw=[]
let nursezc=[]
let hostype=[]
let hoslevel=[]
let deptype=[]
let hosdep=[]
let hllevel=[]
let nurstatue=[]

fly.request({
    method:"post", //post/get 请求方式
    url:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJM2J9",     //科室列表
    body:{}
}).then(res =>{
    res.rows.forEach(e=>{
        hosdep.push({
            id:e.value,
            name:e.name
        })
    })
})

fly.request({
    method:"post", //post/get 请求方式
    url:"https://www.ty5m.com:8443/hi/main?hi=24987F6N21TK",     //医药器械类型字典表
    body:{}
}).then(res =>{
    res.rows.forEach(e=>{
        machinetype.push({
            id:e.value,
            name:e.name
        })
    })
})

fly.request({
    method:"post", //post/get 请求方式
    url:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1P4O",     //护士职务字典表
    body:{}
}).then(res =>{
    res.rows.forEach(e=>{
        nursezw.push({
            id:e.value,
            name:e.name
        })
    })
})

fly.request({
    method:"post", //post/get 请求方式
    url:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1P3L",     //护士职称字典表
    body:{}
}).then(res =>{
    console.log(res)
    res.rows.forEach(e=>{
        nursezc.push({
            id:e.value,
            name:e.name
        })
    })
})


fly.request({
    method:"post", //post/get 请求方式
    url:"https://www.ty5m.com:8443/hi/main?hi=24987F6N2IN9",     //科室类型字典表
    body:{}
}).then(res =>{
    console.log(res)
    res.rows.forEach(e=>{
        deptype.push({
            id:e.value,
            name:e.name
        })
    })
})


fly.request({
    method:"post", //post/get 请求方式
    url:"https://www.ty5m.com:8443/hi/main?hi=24987F6N27K1",     //医院类型字典表
    body:{}
}).then(res =>{
    res.rows.forEach(e=>{
        hostype.push({
            id:e.value,
            name:e.name
        })
    })
})



fly.request({
    method:"post", //post/get 请求方式
    url:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2S5AO",     //医院等级字典表
    body:{}
}).then(res =>{
    res.rows.forEach(e=>{
        hoslevel.push({
            id:e.value,
            name:e.name
        })
    })
})

fly.request({
        method:"post", //post/get 请求方式
        url:"https://www.ty5m.com:8443/hi/main?hi=249N4DLSL4XX",     //服务等级字典表
        body:{}
    }).then(res =>{
        res.rows.forEach(e=>{
            hllevel.push({
                id:e.value,
                name:e.name
            })
        })
    })

fly.request({
    method:"post", //post/get 请求方式
    url:"https://www.ty5m.com:8443/hi/main?hi=249PBD9M3R9J",        //护士状态字典表
    body:{}
}).then(res =>{
    res.rows.forEach(e=>{
        nurstatue.push({
            id:e.value,
            name:e.name
        })
    })
})

export default new Vuex.Store({
    state:{
        hosdep:hosdep,
        mac:machinetype,
        nurzw:nursezw,
        nurzc:nursezc,
        hostp:hostype,
        hoslev:hoslevel,
        deptp:deptype,
        hllevel:hllevel,
        nurstatue:nurstatue,
        nurroute:"https://www.ty5m.com:8443/hi/main?hi=249RTTOLT31A",            //获取护士位置
        hosregister:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2SIPG",         //医院注册
        hosselect:"https://www.ty5m.com:8443/hi/main?hi=249SOD8D5F6W",           //医院注册查询
        nurselect:"https://www.ty5m.com:8443/hi/main?hi=249U8W8QH915",           //护士注册查询
        hoslocation:"https://www.ty5m.com:8088/phy/addresstolocation.php",       //医院地址
        setidimg:"https://www.ty5m.com:8443/hi/main?hi=24987F6N0ROP",            //获取图片
        yzm:"https://www.ty5m.com:8088/txmessage/app.php",                       //短信验证码
        login1:"https://www.ty5m.com:8443/hi/main?hi=13MC0NFI4FQE",              //医院登陆第一次验证
        login:"https://www.ty5m.com:8443/hi/main?hi=24987F6N106S",               //医院登录接口（login）
        patientInfo:"https://www.ty5m.com:8443/hi/main?hi=24987F6N0XXE",         //未审核订单列表（index）
        orderdetails1:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKYN",       //订单查询（auditingdetails）
        nopass:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1EQV",              //审核不通过
        yes:"https://www.ty5m.com:8443/hi/main?hi=24987F6N0XWD",                 //审核通过
        sendoptlist:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T6GT",         //未派发订单列表（index）
        orderdetails2:"https://www.ty5m.com:8443/hi/main?hi=24969FGJJDSB",       //订单派发
        nurlist:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJM3B1",             //护士派发列表
        nurlist1:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1OHM",            //护士列表
        AllNurList:"https://www.ty5m.com:8443/hi/main?hi=249PBD9M3EF4",          //所有护士列表
        nuradd:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKMA",              //护士添加
        nuralter:"https://www.ty5m.com:8443/hi/main?hi=24969FGJJEIF",            //护士修改
        alertstatue:"https://www.ty5m.com:8443/hi/main?hi=249R3FX76HMO",         //护士状态修改
        nurdetails:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKSA",          //护士查看
        deplist:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKEH",             //科室列表
        depadd:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKLY",              //科室添加
        depalter:"https://www.ty5m.com:8443/hi/main?hi=24987F6N2J31",            //科室修改
        depdetails:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKI3",          //科室查询
        aprlist:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKYD",             //医药器械列表
        apradd:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKTW",              //医药器械添加
        apralter:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKWY",            //医药器械修改
        aprdetails:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKXR",          //医药器械查询
        serlist:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T626",             //服务列表
        seradd:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T5VD",              //服务增加
        seralert:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T5Y9",            //服务修改
        serdetails:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T630",          //服务详情
        sersearch:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2RSPL",           //服务搜索
        aprpacklist:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1JHO",         //服务包列表
        findaprpack:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1JAH",         //查询服务包
        addaprpack:"https://www.ty5m.com:8443/hi/main?hi=24987F6N0T3S",          //服务包增加
        addapr:"https://www.ty5m.com:8443/hi/main?hi=24987F6N0T58",              //服务器械增加
        aprpackdetails:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1JJB",      //服务包详情
        addseraprpack:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1NDE",       //服务服务包增加
        endlist:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T6DM",             //已派发订单列表
        enddetails:"https://www.ty5m.com:8443/hi/main?hi=24987F6MY3F5",          //已派发订单详情
        auditinglist:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T3MC",        //已完成订单列表
        auditingdetails:"https://www.ty5m.com:8443/hi/main?hi=24987F6N15XG",     //已完成订单详情
        findservice:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1N2W",         //服务查询
        hosinfo:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2S17H",             //医院信息
        hosalter:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2RX7D",            //医院修改
        imgdel:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2SBCB",              //照片删除
        sernum:"https://www.ty5m.com:8443/hi/main?hi=249SOD8D44PX",              //服务预约次数
    },
    mutations: {
    }
});

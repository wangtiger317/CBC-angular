export const config = {
    logo: '/assets/logo.jpg',
    slogan: 'One Stop Financial Service',
    dl: { //for login, registration, forget password
        title: {
            en: 'Login',
            zh: '请登录'
        },
        signup: {
            en: 'Sign Up',
            zh: '注册'
        },
        forgetPassword: {
            en: 'Forget Password',
            zh: '忘记密码'
        }
    },
    menu: {
        main:[
            {item:"home",sub:[]},
            {item:"investment",sub:[]},
            {item:"insurance",sub:[]},
            {item:"realEstate",sub:["makeOffer","houseSwap"]},
            {item:"conciergeService",sub:[]}
        ],
        myAccount:[
//            {item:"dashboard",sub:[]},
//            {item:"myProfile",sub:[]},
//            {item:"resetPassword",sub:[]}
        ],
        foot: ["contactUs","customerService" ],
        item: {
            home: {
                l: { en: 'Home', zh: '首页' },
                p: '/page/home'
            },
            investment: {
                l: { en: 'Investment', zh: '投资' },
                p: '/page/investment'
            },
            insurance: {
                l: { en: 'Insurance', zh: '保险' },
                p: '/page/insurance'
            },
            realEstate: {
                l: { en: 'Real Estate', zh: '地产' },
                p: '/page/realEstate'
            },
            mortgage: {
                l: { en: 'Mortgage', zh: '贷款' },
                p: '/page/mortgage'
            },
            conciergeService: {
                l: { en: 'Concierge Service', zh: '综合服务' },
                p: '/page/conciergeService'
            },
            makeOffer: {
                l: { en: 'Make Offer', zh: '房产订单' },
                p: 'offer'
            },
            houseSwap: {
                l: { en: 'House Swap', zh: '房产置换' },
                p: '/page/houseSwap'
            },
            Iwant: {
                l: { en: 'I want to', zh: '我想要' },
                p: '/page/Iwant'
            },
            immigration: {
                l: { en: 'Immigration', zh: '移民' },
                p: '/page/immigration'
            },
            dashboard: {
                l: { en: 'Dashboard', zh: '仪表盘' },
                p: '/myAccount/dashboard'
            },
            myProfile: {
                l: { en: 'My Profile', zh: '我的信息' },
                p: '/myAccount/myProfile'
            },
            resetPassword: {
                l: { en: 'Reset Password', zh: '重置密码' },
                p: '/myAccount/myProfile/resetPassword'
            },
            aboutUs: {
                l: { en: 'About Us', zh: '关于我们' },
                p: '/page/aboutUs'
            },
            contactUs: {
                l: { en: 'Contact Us', zh: '联系我们' },
                p: '/page/contactUs'
            },
            customerService: {
                l: { en: 'Customer Service', zh: '客户服务' },
                p: '/page/customerService'
            }
        },
        head: {
            login: {
                l: { en: 'Login', zh: '登录' },
                p: 'login'
            },
            logout:{
                l:{en:"Logout",zh:"登出"},
                p:"logout"
            },
            myAccount: {
                l: { en: 'My Account', zh: '我的账户' },
                p: 'my-account'
            }
        },
        dl: {
            login: {
                l: { en: 'Login', zh: '登录' },
                p: 'login'
            },
            signup: {
                l: { en: 'Sign Up', zh: '注册' },
                p: 'signup'
            },
            forgetPassword: {
                l: { en: 'Forget Password', zh: '忘记密码' },
                p: 'findpassword'
            }
        }
    },
    url: {
        base:'https://www.concordiaboston.com/',
        login:'users/login',
        signup:"users/signup",
        findPwd:"users/findpwd",
        resetPassword:"users/resetpwd",
        updateProfile:"users/updProfile",
        activation:"users/activate",
        pg: { //for page
            get: 'api/content/get',
            post: 'api/content/post'
        },
        pr: { //for paragraph
            get: 'api/content/get',
            post: 'api/content/post'
        },
        property:{
            get:"api/property/get"
        },
        offer:{
            make:"api/offer/make"
        },
        paragraphMd:"https://www.concordiaboston.com/wp-json/api/content/getParagraphMd"
    },
    storageKey: { //for the key to be used by local storage
        lan: "lan",
        page: 'pg',
        paragraph: 'pr',
        token:"tk",
        email:"e",
        privilege:"p",
        mapCenterLat:"mca",
        mapCenterLng:"mcn",
        mapZoom:"mz",
        selectedProperty:"sp",
        userProfile:"up",
        customerInputInOfferPage:"ciop"
    },
    res: { //for rest response received from server
        "type":"text/html",
        "key": {//key used in the rest response
            "token": "t",
            "code": "c",
            "privilege": "p",
            "description": "d",
            "data":"dt",
            "userProfile":"up",
            "email":"lk",
            "password":"q1",
            "newPassword":"rv",
            "properties":"pt"
        }
    },
    form: {
        submit:{
            login:{
                en:"Login",
                zh:"登录"
            }
        }
    },
    formAlert:{
        required:{
            en:" is required",
            zh:"不能为空,请输入"
        },
        min:{
            en:" should not be less than ",
            zh:"不能小于"
        },
        max:{
            en:" should not be bigger than ",
            zh:"不能大于"
        },
        minlength:{
            en:" length should not be less than ",
            zh:"的长度不应小于"
        },
        maxlength:{
            en:" length should not be bigger than ",
            zh:"的长度不应大于"
        },
        pattern:{
            en:" format is not correct",
            zh:"的格式不正确"
        }
    },
    gmap:{
        map: {
            initial: {
                zoom: 14,
                center: {
                    lat: 42.3655147,
                    lng: -71.1221412
                }
            },
            getMarkerUrl: "https://concordiaboston.com/wp-json/api/getMarker/"
        },
        //initial value for search form
        search: { location: '', prop_type: '', list_price: '0', no_bedrooms: '0', baths: '0', priceInput:'',bedroomInput:'',bathInput:'' },
        searchOption: {
            prop_type: [
                { key: "", desc: {en:"Any Type",zh:"不限房产类型"} },
                { key: "SF", desc: {en:"Single Family",zh:"单一家庭房屋"} },
                { key: "MF", desc: {en:"Multi Family",zh:"多家庭房屋"} },
                { key: "CC", desc: {en:"Condos",zh:"共管公寓"} },
                { key: "MH", desc: {en:"Mobile Homes",zh:"移动房屋"} },
                { key: "LD", desc: {en:"Land",zh:"土地"} },
                { key: "CI", desc: {en:"Commerical",zh:"商业地产"} },
                { key: "RN", desc: {en:"Rental",zh:"出租屋"} },
                { key: "BU", desc: {en:"Business Opportunity",zh:"工作用房"} }],
            no_bedrooms: [
                {key:"0",desc:{en:"Any Bedroom",zh:"不限房间数量"},val:{}},
                {key:"1",desc:{en:"1+ Bedroom",zh:"1居室及以上"},val:{$gte:1}},
                {key:"2",desc:{en:"2+ Bedroom",zh:"2居室及以上"},val:{$gte:2}},
                {key:"3",desc:{en:"3+ Bedroom",zh:"3居室及以上"},val:{$gte:3}},
                {key:"4",desc:{en:"4+ Bedroom",zh:"4居室及以上"},val:{$gte:4}},
                {key:"5",desc:{en:"5+ Bedroom",zh:"5居室及以上"},val:{$gte:5}}
            ],
            baths: [
                { key: "0", desc: {en:"Any Bathroom",zh:"不限洗手间数量"}, val: {} },
                { key: "1", desc: {en:"1+ Bathroom",zh:"1+洗手间"}, val: { $gte: 1 } },
                { key: "2", desc: {en:"2+ Bathroom",zh:"2+洗手间"}, val: { $gte: 2 } },
                { key: "3", desc: {en:"3+ Bathroom",zh:"3+洗手间"}, val: { $gte: 3 } },
                { key: "4", desc: {en:"4+ Bathroom",zh:"4+洗手间"}, val: { $gte: 4 } },
                { key: "5", desc: {en:"5+ Bathroom",zh:"5+洗手间"}, val: { $gte: 5 } }],
            list_price: [
                { key: "0", val: {}, desc: {en:"Any Price",zh:"不限价格"} },
                { key: "1", val: { $lte: 100000 }, desc: {en:"$0 - $100K",zh:"$0 - $10万"} },
                { key: "2", val: { $gte: 100000, $lte: 200000 }, desc:{en: "$100K - $200K",zh:"$10万 - $20万"} },
                { key: "3", val: { $gte: 200000, $lte: 300000 }, desc:{en: "$200K - $300K",zh:"$20万 - $30万"} },
                { key: "4", val: { $gte: 300000, $lte: 500000 }, desc:{en: "$300K - $500K",zh:"$30万 - $50万"} },
                { key: "5", val: { $gte: 500000, $lte: 800000 }, desc:{en: "$500K - $800K",zh:"$50万 - $80万"} },
                { key: "6", val: { $gte: 800000, $lte: 1000000 }, desc: {en:"$800K - $1M",zh:"$80万 - $100万"} },
                { key: "7", val: { $gte: 1000000, $lte: 1300000 }, desc: {en:"$1M - $1.3M",zh:"$100万 - $130万"} },
                { key: "8", val: { $gte: 1300000, $lte: 1600000 }, desc: {en:"$1.3M - 1.6M",zh:"$130万 - 160万"} },
                { key: "9", val: { $gte: 1600000 }, desc: {en:"$1.6M + ",zh:"$160万以上"} }]
        }
    },
    trans:{
        underConstruction:{en:"Under construction, please come back later...",zh:"网站建设中，请稍后访问..."}
    }
}

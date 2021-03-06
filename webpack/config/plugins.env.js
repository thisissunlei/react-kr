const envs = {
    'development':{
        'plugins':'http://optest04.krspace.cn',
    },
    'test01':{
        'plugins':'http://optest01.krspace.cn',
    },
    'test02':{
        'plugins':'http://optest02.krspace.cn',
    },
    'test03':{
        'plugins':'http://optest03.krspace.cn',
    },
    'test04':{
        'plugins':'http://optest04.krspace.cn',
    },
    'test08':{
        'plugins':'http://optest08.krspace.cn',
    },
    'test07':{
        'plugins':'http://optest07.krspace.cn',
    },
    'dev01':{
        'plugins':'http://dev01.krspace.cn',
    },
    'dev02':{
        'plugins':'http://dev02.krspace.cn',
    },
    'production':{
        'plugins':'' ,
    },
    'test':{
        'plugins':'' ,
    },
}
const time = (new Date()).getTime();
const pluginsDomain  = envs[process.env.NODE_ENV].plugins+'/plugins';
const jsFiles=[
       pluginsDomain+'/nav/1.0.0/nav.js'+'?version='+time,
  //  'https://web.krspace.cn/kr-op/umeditor/ueditor.config.js',
  //  'https://web.krspace.cn/kr-op/umeditor/ueditor.all.js',
   // 'https://web.krspace.cn/kr-op/umeditor/lang/zh-cn/zh-cn.js',
    'https://web.krspace.cn/kr-op/gt/1.0.0/gt.js',
];
const cssFiles=[];

module.exports = {
    cssFiles,
    jsFiles
};


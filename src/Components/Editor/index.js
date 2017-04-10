import React from 'react';



export default class Editor extends React.Component{

  static displayName = 'Editor';

  static defaultProps = {
      configs:{
        toolbars:[[
          'source', //源代码
          '|',
          'undo', //撤销
          'redo', //重做
          '|',
          'bold', //加粗
          'italic', //斜体
          'underline', //下划线
          'fontborder', //字符边框
          'strikethrough', //删除线
          'subscript', //下标
          'superscript', //上标
          'removeformat', //清除格式
          'formatmatch', //格式刷
          'autotypeset', //自动排版
          'blockquote', //引用
          'pasteplain', //纯文本粘贴模式
          '|',


          'forecolor', //字体颜色
          'backcolor', //背景色
          'insertorderedlist', //有序列表
          'insertunorderedlist', //无序列表

          'selectall', //全选
          'cleardoc', //清空文档
          '|',
          'rowspacingtop', //段前距
          'rowspacingbottom', //段后距
          'lineheight', //行间距
          '|',
          'customstyle', //自定义标题
          'paragraph', //段落格式
          'fontfamily', //字体
          'fontsize', //字号
          '|',
          'directionalityltr', //从左向右输入
          'directionalityrtl', //从右向左输入
          'indent', //首行缩进
          '|',



          'justifyleft', //居左对齐
          'justifyright', //居右对齐
          'justifycenter', //居中对齐
          'justifyjustify', //两端对齐
          '|',

          'touppercase', //字母大写
          'tolowercase', //字母小写
          '|',


          'link', //超链接
          'unlink', //取消链接
          'anchor', //锚点
          '|',


          'imagenone', //默认
          'imageleft', //左浮动
          'imageright', //右浮动
          'imagecenter', //居中
          '|',

          'simpleupload', //单图上传
          'insertimage', //多图上传
          'emotion', //表情
          'map', //Baidu地图
          'pagebreak', //分页
          'template', //模板
          'background', //背景
          '|',

          'horizontal', //分隔线
          'date', //日期
          'time', //时间
          'spechars', //特殊字符
          '|',

          'inserttable', //插入表格
          'deletetable', //删除表格
          'insertparagraphbeforetable', //"表格前插入行"
          'insertrow', //前插入行
          'insertcol', //前插入列
          'mergeright', //右合并单元格
          'mergedown', //下合并单元格
          'deleterow', //删除行
          'deletecol', //删除列
          'splittorows', //拆分成行
          'splittocols', //拆分成列
          'splittocells', //完全拆分单元格
          'deletecaption', //删除表格标题
          'inserttitle', //插入标题
          'mergecells', //合并多个单元格
          'edittable', //表格属性
          'edittd', //单元格属性
          'charts', // 图表
          '|',

          'edittip ', //编辑提示
          'preview', //预览
          'searchreplace', //查询替换
          'drafts', // 从草稿箱加载
          'help', //帮助
          'toUploadImg',
        ]
      ],
      autoHeightEnabled:true,
      autoFloatEnabled:true,
      elementPathEnabled:false,
      maximumWords:2000,
      initialFrameHeight:200,
      enableAutoSave:false
      ,autoFloatEnabled:false
    }
  }

  static propTypes = {
    configs:React.PropTypes.object,
    value:React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.containerId = 'container_'+Date.now();
    this.ue = null;
    this.init = false;
  }

  componentDidMount(){
    this.initEditor();
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.defaultValue !== this.props.defaultValue){
        this.init = false;
        this.setDefaultValue(nextProps.defaultValue);
    }
  }


  initEditor = () =>{

    var {configs,defaultValue} = this.props;
    var _this = this;
    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function(action) {
      if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
        return 'http://optest.krspace.cn/api/krspace-finance-web/activity/ue-upload-pic';
      }else {
        return this._bkGetActionUrl.call(this, action);
      }
    }
    var ue = UE.getEditor(this.containerId,configs);
    this.ue = ue;
    this.ue.ready(function(editor){
      if(!editor){
        _this.initEditor();
      }
      ue.addListener('contentChange',_this.contentChange);
      _this.setDefaultValue(defaultValue);
    });

  }

  contentChange = ()=>{

    var self = this;
    window.setTimeout(function(){
      var content = UE.getEditor(self.containerId).getContent()
      self.onChange(content);
    },200);

  }


  setDefaultValue = (value)=>{
    if(!value){
      return ;
    }
    if(this.init){
      return ;
    }
    var _this = this;
    UE.getEditor(this.containerId).setContent(value);
    this.init = true;
  }

  onChange =(value)=>{
    const {onChange} = this.props;
    onChange && onChange(value);
  }



  componentWillUnmount(){
    this.init = false;
    UE.delEditor(this.containerId);
  }

  render() {
    let {label} = this.props;
    return (
      <div id={this.containerId} name="content"> </div>
    );
  }
}

import React from 'react';
import './index.less';
import KrField from '../KrField';
import DictionaryConfigs from 'kr/Configs/dictionary';
import Text from './Text';
import {reduxForm,change,initialize}  from 'redux-form';
import {
	Store
} from 'kr/Redux';

export default class TextDic extends React.Component{

	static displayName = 'TextDic';

	constructor(props,context){
        super(props, context);
        this.state={
            //初始的数据
            inputType:[],
            nexts:[],
            //控制组件类型显示隐藏
            isTrue:false,
            //二级的数据处理
            next:[],

            //二级值 
            twoData:'',

            //是否显示三级
            isThree:false,
            //三级值
            label:'',

            //为了四级
            getEdit:{},

            //isCommon
            isCommon:0
        }
        this.isCommon=false;
    }


    componentWillUnmount(){
        
    }

  
    componentDidMount(){
        this.setState({
			inputType:DictionaryConfigs.ERP_InputType,
            nexts:DictionaryConfigs.ERP_ComponentType,
        })     
    }

    componentWillReceiveProps(nextProps){    
        if(this.isCommon){
            return;
        }
        var _this=this;
        if(nextProps.isEdit&&nextProps.getEdit.inputType){
                _this.nextArrRender(nextProps.getEdit.inputType,_this.state.nexts,function(){
                _this.setState({
                    label:nextProps.getEdit.compType,
                    isTrue:true, 
                    isThree:true,
                    getEdit:nextProps.getEdit
                },function(){
                    const {callBack}=_this.props;
                    callBack && callBack(nextProps.getEdit);
                })
            });
        }   
    }

   
    typeChange=(param)=>{
        this.isCommon=true;

        let {nexts}=this.state;
        var _this=this;
        this.setState({
           isTrue:true,
           isThree:false,
           twoData:param.value
		},function(){
            _this.nextArrRender(param.value,nexts);
        })
    }

    nextArrRender=(name,selectName,callBack)=>{
        let {next}=this.state;
        var nextRender=[];
        selectName.map((item,index)=>{
            var list={};
            if(item.value.slice(0,name.length)==name){
                if(name=='TEXT'&& item.value!=='TEXT_AREA_TEXT'&&item.value!=='TEXT_AREA_RICH'){
                    list.value=item.value;
                    list.label=item.desc;
                }else if(name!='TEXT'){
                    list.value=item.value;
                    list.label=item.desc;
                }else{
                    return null
                }
            }else{
              return null
            }
            nextRender.push(list);
        })
        this.setState({
            next:nextRender
        },function(){
            callBack && callBack();
        })
       }

    classChange=(param)=>{
        if(!param){
            return ;
        }
        this.setState({
            isThree:true,
            label:param.value,
            isCommon:new Date().getTime()
        })
        Store.dispatch(change('EditText','sourceType',''));
        Store.dispatch(change('AddText','sourceType',''));
        Store.dispatch(change('AddText','sourceOrgin',''));
        Store.dispatch(change('EditText','sourceOrgin',''));
    }

      onChange=(param)=>{
            const {onChange}=this.props;
            onChange && onChange(param);
       }


	render(){

        let {inputType,isTrue,next,label,isThree,getEdit,isCommon,twoData}=this.state;

        var seleInt=[];
        inputType.map((item,index)=>{
           var list={};
           list.label=item.desc;
           list.value=item.value;
           seleInt.push(list);
        })
        

		return (

                <div style={{display:'inline-block'}}>
                   <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="inputType"
                            component="select"
                            label="表现形式"
                            options={seleInt}
                            onChange={this.typeChange}
                            requireLabel={true}
                    />
                    {isTrue&&<KrField
                        grid={1/2}
                        style={{width:262,marginBottom:5,marginLeft:'30px'}}
                        name="compType"
                        component="select"
                        label="类型"
                        options={next}
                        onChange={this.classChange}
                        requireLabel={true}
                        value={label}
                    />}
                    {isThree&&<Text 
                        label={label} 
                        onChange={this.onChange}
                        getEdit={getEdit}
                        isCommon={isCommon}
                        twoData={twoData}
                    />}
                </div>

		);
	}
}

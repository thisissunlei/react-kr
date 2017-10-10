import React from 'react';
import './index.less';
import {
	toJS
} from 'mobx';
import KrField from '../KrField';
import DictionaryConfigs from 'kr/Configs/dictionary';
import Text from './Text';
import {reduxForm,change,initialize}  from 'redux-form';
import {
	Store
} from 'kr/Redux';
import {
	observer,
	inject
} from 'mobx-react';

@inject("TextDicModel")
@observer
export default class TextDic extends React.Component{

	static displayName = 'TextDic';

	constructor(props,context){
        super(props, context);
        this.state={
            watchSecond:false,
            watchThree:false 
        }
        this.inputType=[];
        this.componentType=[];
        this.componentItem=[];
        this.threeLabel='';
        this.control=false;
    }


  
    componentWillMount(){
        this.inputType=DictionaryConfigs.ERP_InputType;
        this.componentType=DictionaryConfigs.ERP_ComponentType;
    }
    
    componentDidMount(){
        let {isEdit,TextDicModel}=this.props;
        if(isEdit){
            this.setState({
                watchSecond:true,
                watchThree:true
             })
             this.nextArrRender(toJS(TextDicModel.oldDetail).inputType,this.componentType);
             this.threeLabel=toJS(TextDicModel.oldDetail).compType;
        }
    }

    typeChange=(param)=>{  
      this.setState({
        watchSecond:true,
        watchThree:false
      })
      Store.dispatch(change('EditText','compType',''));
      Store.dispatch(change('AddText','compType',''));
      this.nextArrRender(param.value,this.componentType);
    }

    nextArrRender=(name,selectName)=>{
        var nextRender=[];
        selectName.map((item,index)=>{
            var list={};
            if(item.value.slice(0,name.length)==name){
                list.value=item.value;
                list.label=item.desc;
            }else{
                return null
            }
            nextRender.push(list);
        })
        this.componentItem=nextRender;
       }

    classChange=(param)=>{
       this.setState({
         watchThree:true
       })
       this.threeLabel=param.value;
    }


	render(){

       let {watchSecond,watchThree}=this.state;

        var seleInt=[];
        this.inputType.map((item,index)=>{
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
                    {watchSecond&&<KrField
                        grid={1/2}
                        style={{width:262,marginBottom:5,marginLeft:'30px'}}
                        name="compType"
                        component="select"
                        label="类型"
                        options={this.componentItem}
                        onChange={this.classChange}
                        requireLabel={true}
                    />}
                    {watchThree&&<Text 
                       label={this.threeLabel}
                    />}
                </div>

		);
	}
}

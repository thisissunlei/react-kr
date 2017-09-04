import React from 'react';
import KrField from '../../KrField';

export default class Text  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            component:null,
            nexts:[]
        }
    }
    
   nextArrRender=(name,next)=>{
    var nexts=[];
    next.map((item,index)=>{
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
        nexts.push(list); 
    })
    this.setState({
        nexts
    })
   }

    componentDidMount(){
      let {label,next}=this.props;
      this.nextArrRender(label,next);
    }

    componentWillReceiveProps(nextProps){
       if(nextProps.label!=this.props.label){
        this.nextArrRender(nextProps.label,nextProps.next);
        this.setState({
            component:null
        })
       }
    }


    inputTextRender=()=>{
        return <KrField
                grid={1/2}
                style={{width:262,marginBottom:5}}
                name="name"
                component="input"
                label="文本长度"
                requireLabel={true}
            />
    }
    
    floatTextRender=()=>{
        return <KrField
                grid={1/2}
                style={{width:262,marginBottom:5}}
                name="name"
                component="select"
                label="小数位数"
                options={[{label:'1',value:'1'},{label:'2',value:'2'},{label:'3',value:'3'},{label:'4',value:'4'}]}
                requireLabel={true}
            />  
    }

    heightRender=()=>{
        return <KrField
                grid={1/2}
                style={{width:262,marginBottom:5}}
                name="namwww"
                component="input"
                label="高度"
            />
    }

    buttonRender=()=>{
        return <div>
                <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="name"
                    component="select"
                    label="按钮类型"
                    options={[{label:'1',value:'1'},{label:'2',value:'2'},{label:'3',value:'3'},{label:'4',value:'4'}]}
                    requireLabel={true}
                />
                <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="enabled" component="group" label="是否多选" requireLabel={true}>
                    <KrField name="enabled" label="是" type="radio" value='1' />
                    <KrField name="enabled" label="否" type="radio" value='0' />
                </KrField>
            </div>
    }


    fileRender=()=>{
        return <div>
                    <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="name"
                    component="input"
                    label="文件大小(单位:k)"
                    requireLabel={true}
                />
                    <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="enabled" component="group" label="多文件上传 " requireLabel={true}>
                        <KrField name="enabled" label="允许" type="radio" value='1' />
                        <KrField name="enabled" label="禁止" type="radio" value='0' />
                    </KrField>
                    <KrField
                        grid={1/2}
                        style={{width:262,marginBottom:5}}
                        name="name"
                        component="input"
                        label="图片宽度(单位:px)"
                    />
                    <KrField
                        grid={1/2}
                        style={{width:262,marginBottom:5}}
                        name="name"
                        component="input"
                        label="图片高度(单位:px)"
                    />
             </div>
    }

    dateRender=()=>{
        return <KrField grid={1/2}
                    style={{width:262,marginLeft:30}}
                    name="entryDate"
                    component="date"
                    label="日期"
                />
    }
    
    typeRender=(value)=>{
        var component={};
        let _this=this;
        switch (value){
          case 'TEXT_TEXT':{
              component = _this.inputTextRender()
              break;
          }      
          case 'TEXT_INTEGER':{
              component = _this.inputTextRender()
              break;
          }   
          case 'TEXT_FLOAT':{
              component = _this.floatTextRender()
              break;
          }
          case 'TEXT_MONEY_TRANSFER':{
              component = _this.floatTextRender()
              break;
          }
          case 'TEXT_MONEY_QUARTILE':{
              component = _this.floatTextRender()
              break;
          }
          case 'TEXT_AREA_TEXT':{
              component = _this.heightRender()
              break;
          }
          case 'TEXT_AREA_RICH':{
              component = _this.heightRender()
              break;
          }
          case 'BUTTON_BROWES':{
              component = _this.buttonRender()
              break;
          }
          case 'FILE_FILE':{
                component = _this.fileRender()
                break;
          }
          case 'FILE_PHOTO':{
                component = _this.fileRender()
                break;
          }
          case 'TIME_DATE':{
                component = _this.dateRender()
                break;
          }
          case 'TIME_TIME':{
                component = _this.dateRender()
                break;
          }
           case 'TIME_DATETIME':{
                component = _this.dateRender()
                break;
          }
          default:{
              component = null;
          }
        }
        this.setState({
            component
        })
    }

    
    typeChange=(param)=>{
      if(!param){
          return ;
      }
      this.typeRender(param.value);
    }
    


	render(){
         
        let {component,nexts}=this.state;
       
               
		return(

			<div style={{display:'inline-block'}}>
               <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5,marginLeft:'30px'}}
                    name="namerrr"
                    component="select"
                    label="类型"
                    options={nexts}
                    onChange={this.typeChange}
                    requireLabel={true}
				 />
                {component}
			</div>
		);
	}

}

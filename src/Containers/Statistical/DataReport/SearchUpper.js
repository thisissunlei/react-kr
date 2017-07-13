import React from 'react';
import {
	reduxForm,
} from 'redux-form';

import {
    KrField,
    Grid,
    Row,
    Col,
    ButtonGroup,
    Button	
} from 'kr-ui';

class SearchUpper  extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state={
			dateBoxStyle:{marginTop:25,marginLeft:26 ,height:"auto"},
			city:[],
			community:[]
		}
	}

	componentWillMount(){
	  var city=[
            {
                "label": "北京市",
                "value": 1
            },
            {
                "label": "天津市",
                "value": 2
            },
            {
                "label": "广州市",
                "value": 198
            },
            {
                "label": "杭州市",
                "value": 88
            },
            {
                "label": "深圳市",
                "value": 200
            },
            {
                "label": "上海市",
                "value": 74
            },
            {
                "label": "武汉市",
                "value": 170
            },
            {
                "label": "南京市",
                "value": 75
            },
            {
                "label": "成都市",
                "value": 238
            },
            {
                "label": "苏州市",
                "value": 79
            }
        ] ;
	  var cityArr=[];
	  city.map((item,index)=>{
        var list={};
		list.label=item.label;
		list.value=item.value;
		cityArr.push(list);
	  })
	  cityArr.push({"label": "全部城市","value":" "})
      this.setState({
		 city:cityArr
	  }) 
	}

    onSubmit=(values)=> {
	  const {
		   onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}
    
	onCancel=()=> {
	   const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render(){

        let {handleSubmit}=this.props;
        let {dateBoxStyle,city}=this.state;

		return(

			<div>
			    <form style={dateBoxStyle} onSubmit={handleSubmit(this.onSubmit)}>
                    <KrField  grid={1/2} style={{marginTop:1,width:262,marginRight:'26px'}} name='city' component="select" label="城市" 
					 options={city}
                    />
                    
                    <KrField  grid={1/2}  name="intentionCommunityId" style={{marginTop:2,width:262}} component='searchCommunityAll'  label="社区" inline={false} onChange={this.onChangeIntend} placeholder='请输入社区名称'/>
        
                    <Grid style={{marginTop:20,marginBottom:5,marginLeft:-24}}>
                        <Row>
                            <Col md={12} align="center">
                                <ButtonGroup>
                                    <div  className='list-btn-center'><Button  label="确定" type="submit"/></div>
                                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Grid>
				</form>  
			</div>
		);
	}

}

export default reduxForm({form:'SearchUpper'})(SearchUpper);
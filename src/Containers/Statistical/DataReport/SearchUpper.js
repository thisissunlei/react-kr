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
import {Http} from 'kr/Utils';

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
        var _this=this;
        Http.request('report-data-list').then(function(response) {
               var cityArr=[];
                response.items.map((item,index)=>{
                    var list={};
                    list.label=item.label;
                    list.value=item.value;
                    cityArr.push(list);
                })
                cityArr.push({"label": "全部城市","value":" "})
                _this.setState({
                    city:cityArr
                }) 
        }).catch(function(err) {
            Message.error(err.message);
        });

        Http.request('getTheCommunity').then(function(response) {
				var communityArr=[];
                response.items.map((item,index)=>{
                    var list={};
                    list.label=item.name;
                    list.value=item.id;
                    communityArr.push(list);
                })
                communityArr.push({"label": "全部社区","value":" "})
                _this.setState({
                    community:communityArr
                }) 
			}).catch(function(err) {
				Message.error(err.message);
		});
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
        let {dateBoxStyle,city,community}=this.state;

		return(

			<div>
			    <form style={dateBoxStyle} onSubmit={handleSubmit(this.onSubmit)}>
                    <KrField  grid={1/2} style={{marginTop:1,width:262,marginRight:'26px'}} name='cityId' component="select" label="城市" 
					 options={city}
                    />
                    
                    <KrField  grid={1/2}  name="communityId" style={{marginTop:2,width:262}} component='select'  label="社区" 
                      options={community}
                    />
        
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
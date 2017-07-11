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
		}
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
        let {dateBoxStyle}=this.state;

		return(

			<div>
			    <form style={dateBoxStyle} onSubmit={handleSubmit(this.onSubmit)}>
                    <KrField  grid={1/2} style={{marginTop:1,width:262,marginRight:'26px'}} name='city' component="select" label="城市" 
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
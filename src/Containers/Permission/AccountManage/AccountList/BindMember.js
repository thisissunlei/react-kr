import React from 'react';

import {
	reduxForm,
} from 'redux-form';
import {
	Http
} from "kr/Utils";
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
  	Message,
	ButtonGroup,
	CircleStyleTwo,
	KrDate
} from 'kr-ui';

import './index.less';


class BindMember extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
        super(props);
        this.state={
            memberInfo:{}
        }
	}


	componentDidMount() {
        let {detail}=this.props;
        this.refs.phone.value=detail.phone;
	}

  onSearch = () => {
      var _this=this;
      let phone=this.refs.phone.value;
      let form={
          phone:phone
      }
      
      Http.request('get-mobile-phone-info', form).then(function(response) {
            _this.setState({
                memberInfo:response
            })
      }).catch(function(err) {
        Message.error(err.message);
      });
  }
    onSubmit=()=>{
        let { memberInfo }=this.state;
        let { onSubmit } = this.props;
        onSubmit && onSubmit(memberInfo.uid);
    }

    onCancel = () => {
        let {
            onCancel
        } = this.props;
        onCancel && onCancel();
    }
    
    renderMemberInfo=()=>{
        let {memberInfo} = this.state;
        if(memberInfo.name){
            return(
                <div className="m-member-info">
                        <KrField
                                grid={1/2} 
                                label="姓名:"
                                component="labelText"
                                inline={false} 
                                value={memberInfo.name}
                                defaultValue="无"
                        />
                        <KrField 
                                grid={1/2} 
                                label="公司:"
                                inline={false} 
                                component="labelText" 
                                value={memberInfo.companyName} 
                                defaultValue="无"
                        />

                        <KrField 
                                grid={1/2}  
                                component="labelText"
                                label="社区:" 
                                inline={false} 
                                value={memberInfo.communityName} 
                                defaultValue="无"
                        />
                        <KrField 
                                grid={1/2} 
                                label="邮箱:"
                                inline={false}  
                                component="labelText"
                                value={memberInfo.email} 
                                defaultValue="无"
                        />
                        <div className="u-button">
                                <Button  
                                        label="绑定" 
                                        type="button" 
                                        height={34} 
                                        width={90}
                                        onClick={this.onSubmit}
                                />
                        </div>
                        

            </div>
            )
        }

    }  

render() {
    const {
      handleSubmit,
    } = this.props;
    let {memberInfo} = this.state;
	return (
      <div className='g-bind-member'>
          <form className="m-form" onSubmit={handleSubmit(this.onSearch)}>
                <input 
                    type="text" 
                    ref="phone"  
                    className="u-phone-input"
                    placeholder="请输入手机号码"
                />
                <Button  label="搜索"   type="submit"  height={34} width={90}/>
          </form>
          {this.renderMemberInfo()}
          

      </div>

    );
	}
}

export default reduxForm({
    form: 'bindMember',
})(BindMember);

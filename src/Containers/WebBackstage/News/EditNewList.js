import React from "react";
import {reduxForm,change,initialize}  from 'redux-form';
import { Store } from "kr/Redux";
import { Http } from "kr/Utils";
import {
  KrField,
  Grid,
  Row,
  Col,
  Button,
  Message,
  ListGroup,
  ListGroupItem,
  CircleStyleTwo,
  DrawerTitle,
  ButtonGroup
} from "kr-ui";
import { observer } from "mobx-react";
import "./index.less";
import State from "./State";

@observer
class EditNewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsContent: "",
      photoUrl: "",
      publishType: [
        {
          label: "公司动态",
          value: "COMPANY_DYNAMIC"
        },
        {
          label: "社区报道",
          value: "CMT_STORY"
        },
        {
          label: "会员报道",
          value: "MREMBER_STORY"
        },
        {
          label: "行业动态",
          value: "MEMBER_SERVICE"
        }
      ]
    };
    let { detail } = this.props;
    State.getNewsDate(detail.id);
  }
  componentDidMount() {
    let { detail } = this.props;
    var _this = this;
    setTimeout(function() {
      Http.request("get-news-detail", { id: detail.id }).then(function(
        response
      ) {
        _this.setState({
          newsContent: response.newsContent,
          photoUrl: response.photoUrl
        });
        Store.dispatch(initialize("editNewList", response));
        if(response.recommend== true){
            Store.dispatch(change('editNewList','recommend','true'))   
        }else{
            Store.dispatch(change('editNewList','recommend','false'))  
        }
      });
    }, 500);
  }

  onCancel = () => {
    let { onCancel } = this.props;
    onCancel && onCancel();
  };
  onSubmit = form => {
    let { detail } = this.props;
    form = Object.assign({}, form);
    form.id = detail.id;
    let { onSubmit } = this.props;
    onSubmit && onSubmit(form);
  };

  render() {
    const { handleSubmit } = this.props;
    let { newsContent, photoUrl } = this.state;
    return (
      <div className="g-new-list">
        <div className="u-title-box">
          <DrawerTitle title="编辑新闻" onCancel={this.onCancel} />
        </div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <CircleStyleTwo num="1" info="新闻基本信息">
            <KrField
              style={{ width: 548 }}
              name="title"
              type="text"
              component="input"
              label="新闻标题"
              requireLabel={true}
            />
            <KrField
              name="newsType"
              component="select"
              label="发布类型"
              options={this.state.publishType}
              requireLabel={true}
              errors={{ requiredValue: "发布类型为必填项" }}
              style={{ width: "252px", margin: "0 35px 5px 0" }}
            />
            <KrField
              style={{ width: 260, marginRight: 25 }}
              name="publishedTime"
              component="date"
              label="发布时间"
              requireLabel={true}
            />
            <KrField
              style={{ width: 260, marginRight: 25 }}
              name="orderNum"
              type="text"
              component="input"
              label="排序号"
              requireLabel={true}
            />
            <KrField
              style={{ width: 260, marginTop: 10 }}
              name="publishedStatus"
              component="group"
              label="发布状态"
              requireLabel={true}
            >
              <KrField
                name="publishedStatus"
                grid={1 / 2}
                label="发布"
                type="radio"
                value="PUBLISHED"
              />
              <KrField
                name="publishedStatus"
                grid={1 / 2}
                label="未发布"
                type="radio"
                value="UNPUBLISHED"
              />
            </KrField>
            <KrField
              style={{ width: 260, marginTop: 5, marginBottom: 5 }}
              name="stickStatus"
              component="group"
              label="置顶状态"
              requireLabel={true}
            >
              <KrField
                name="stickStatus"
                grid={1 / 2}
                label="置顶"
                type="radio"
                value="STICKED"
              />
              <KrField
                name="stickStatus"
                grid={1 / 2}
                label="未置顶"
                type="radio"
                value="UNSTICKED"
              />
            </KrField>
            <KrField
							style={{width:548,height:20}}
							type="labelText"
							inline={false}
							label="阅读人数"
					 	/>
            <KrField 
						 		style={{width:130,marginRight:25,marginBottom:10}}
						 		name="webReadCount" 
						 		component="input"
								inline={false}
                disabled={true}
						 		label="WEB"
						 />
              <KrField 
                style={{width:130,marginRight:25,marginBottom:10}}
                name="appReadCount" 
                component="input"
                inline={false}
                disabled={true}
                label="APP"
              />
						<KrField 
                style={{width:130,marginBottom:10}}
                name="baseReadCount" 
                component="input"
                inline={false}
                label="基数"
            />
            <KrField
              style={{ width: 260, marginRight: 25, marginBottom: 10 }}
              name="recommend"
              component="group"
              label="是否HOT"
              requireLabel={true}
            >
              <KrField
                name="recommend"
                grid={1 / 2}
                label="是"
                type="radio"
                value="true"
              />
              <KrField
                name="recommend"
                grid={1 / 2}
                label="否"
                type="radio"
                value="false"
              />
            </KrField>
            <KrField
              style={{ width: 548 }}
              name="newsDesc"
              component="textarea"
              label="新闻简介"
              maxSize={300}
              requireLabel={true}
            />
            <KrField
              name="photoUrl"
              component="mainNewsUploadImage"
              innerstyle={{ width: 392, height: 161, padding: 10 }}
              pictureFormat={"JPG,PNG,GIF"}
              pictureMemory={"500"}
              requestURI={State.requestURI}
              requireLabel={true}
              label="新闻列表图片"
              inline={false}
              defaultValue={photoUrl}
            />
            <KrField
              style={{ width: 248, zIndex: 1000 }}
              name="relateCmt"
              component="searchCommunitys"
              label="文章关联社区"
            />
          </CircleStyleTwo>
          <CircleStyleTwo num="2" info="新闻详细信息" circle="bottom">
            <KrField
              component="editor"
              name="newsContent"
              label="新闻内容"
              style={{ width: 560 }}
              requireLabel={true}
              defaultValue={newsContent}
            />
            <Grid style={{ marginTop: 50, width: "81%" }}>
              <Row>
                <Col md={12} align="center">
                  <ButtonGroup>
                    <Button label="确定" type="submit" />
                    <Button
                      label="取消"
                      cancle={true}
                      type="button"
                      onTouchTap={this.onCancel}
                    />
                  </ButtonGroup>
                </Col>
              </Row>
            </Grid>
          </CircleStyleTwo>
        </form>
      </div>
    );
  }
}
const validate = values => {
  const errors = {};
  let numContr = /^[1-9]\d{0,4}$/;
  if (!values.title) {
    errors.title = "请输入新闻标题";
  }
  if (!values.newsType) {
    errors.title = "请选择发布类型";
  }
  if (values.title) {
    if (values.title.length > 50) {
      errors.title = "新闻标题不能超过50字";
    }
  }
  if (!values.publishedTime) {
    errors.publishedTime = "请选择发布时间";
  }
  if (!values.orderNum) {
    errors.orderNum = "请输入排序号";
  }
  if (values.orderNum) {
    var orderNum = (values.orderNum + "").replace(/(^\s*)|(\s*$)/g, "");
    if (!numContr.test(orderNum)) {
      errors.orderNum = "排序号必须为五位以内正整数";
    }
  }
  if (!values.newsDesc) {
    errors.newsDesc = "请输入新闻简介";
  }
  if (!values.photoUrl) {
    errors.photoUrl = "请上传新闻列表图片";
  }
  if (!values.newsContent) {
    errors.newsContent = "请输入新闻内容";
  }

  return errors;
};
export default (EditNewList = reduxForm({
  form: "editNewList",
  validate
})(EditNewList));

import React from "react";
import { toJS } from "mobx";
import { DateFormat, Http } from "kr/Utils";
import { reduxForm, initialize, change, FieldArray } from "redux-form";
import { Store } from "kr/Redux";
import { observer } from "mobx-react";
import {
  KrField,
  Grid,
  Row,
  Col,
  Button,
  ButtonGroup,
  Message,
  DrawerTitle
} from "kr-ui";
import "./index.less";
import State from "../State";
// import CommunityButton from './../CommunityButton/index.js'
import CommunityButton from "./cardOne.js";
import CardTwo from "./cardTwo";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

//楼层增加与减少
const renderMembers = ({ fields, meta: { touched, error } }) => {
  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {fields.map((wherefloorsStr, index) => (
        <li key={index} style={{ width: 600, listStyle: "none" }}>
          <div className="krFlied-box">
            <KrField
              style={{ width: 239, marginLeft: 16, marginRight: 3 }}
              requireLabel={true}
              grid={1 / 2}
              name={`${wherefloorsStr}.floor`}
              type="text"
              component={renderField}
              label="所在楼层"
            />
            <span className="unit">层</span>
          </div>
          <div className="krFlied-box">
            <KrField
              style={{ width: 201, marginLeft: 32, marginRight: 3 }}
              requireLabel={true}
              grid={1 / 2}
              name={`${wherefloorsStr}.stationCount`}
              type="text"
              component={renderField}
              label="可出租工位数"
            />
            <span className="unit">个</span>
          </div>
          <span
            onClick={() => fields.insert(index + 1, {})}
            className="addBtn"
          />
          <span className="minusBtn" onClick={() => fields.remove(index)} />
        </li>
      ))}
      {error && <li className="error">{error}</li>}
    </ul>
  );
};

@observer
class EditCommunityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeName: "",
      communityName: "",
      cityId: ""
    };
  }

  onSubmit = values => {
    var signStartDate = DateFormat(values.signStartDate, "yyyy-mm-dd hh:MM:ss");
    var signEndDate = DateFormat(values.signEndDate, "yyyy-mm-dd hh:MM:ss");
    if (
      signStartDate != "" &&
      signEndDate != "" &&
      signEndDate < signStartDate
    ) {
      Message.error("签约开始时间不能大于签约结束时间");
      return;
    }
    if (
      values.businessBegin != "" &&
      values.businessEnd != "" &&
      values.businessEnd < values.businessBegin
    ) {
      Message.error("营业开始时间不能大于营业结束时间");
      return;
    }
    //楼层开始
    values.wherefloorsStr = JSON.stringify(values.wherefloors);
    //楼层结束

    delete values.wherefloors;

    //图片结束
		State.newCommunitySubmit(values,'3');
		values.wherefloors = JSON.parse(values.wherefloorsStr)
  };

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  //排序
  orderChange = params => {
    let { cityId } = this.state;
    let { communityId } = this.props;
    if (!cityId) {
      Message.error("请先填写城市");
      return;
    }
    State.communityRank(params.toString().trim(), cityId, communityId);
  };

  componentDidMount() {
    let { cityId } = this.props;
    this.setState({
      cityId: cityId
    });
	}
	onCancelEdit=()=>{
		State.cardThirdEdit = !State.cardThirdEdit;
		Store.dispatch(reset('CardTwo'));
	}

  render() {
    let { codeName, communityName } = this.state;
    var nameStyle = {};
    if (
      State.isCorpName ||
      State.isCorpCode ||
      communityName == "无" ||
      (codeName && !communityName)
    ) {
      nameStyle = {
        height: "100px"
      };
    } else {
      nameStyle = {
        height: "auto"
      };
    }

    var openTime = "";
    var startTime = "";
    var endTime = "";
    var inforStyle = "";
    openTime = DateFormat(toJS(State.detailData.openDate), "yyyy-mm-dd");
    startTime = DateFormat(toJS(State.detailData.signStartDate), "yyyy-mm-dd");
    endTime = DateFormat(toJS(State.detailData.signEndDate), "yyyy-mm-dd");

    if (toJS(State.detailData.opened) == true) {
      inforStyle = "已开业";
    }
    if (toJS(State.detailData.opened) == false) {
      inforStyle = "未开业";
    }

    var whereFloor = [];

    if (State.detailData.wherefloors) {
      State.detailData.wherefloors.map((item, index) => {
        whereFloor.push(item);
      });
    }

    var area = "";
    if (State.detailData.area) {
      area = State.detailData.area;
    } else {
      area = "无";
    }

    const { handleSubmit, cityData, timeStart, timeEnd, cityId } = this.props;

    return (
      <div className="communityList-m" style={{ paddingLeft: 9 }}>
        <div className="title">
          <DrawerTitle title="编辑社区" onCancel={this.onCancel} />
        </div>
        <div className="cheek">
          <div className="titleBar">
            <span className="order-number">1</span>
            <span className="wire" />
            <label className="small-title">关联项目</label>
          </div>
          <div className="small-cheek">
            <CommunityButton />
            <div className="middle-round" />
          </div>

          <div className="titleBar">
            <span className="order-number">2</span>
            <span className="wire" />
            <label className="small-title">基本信息</label>
          </div>
          <div className="small-cheek">
            <div>
              <CardTwo
                cityData={cityData}
                timeStart={timeStart}
                timeEnd={timeEnd}
                cityId={cityId}
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit)} onClick={this.closemm}>
          <div className="cheek" style={{ marginTop: 0 }}>
            <div className="titleBar">
              <span className="order-number">3</span>
              <span className="wire" />
              <label className="small-title">运营信息</label>
            </div>
            <div className="small-cheek">
              <Grid style={{ marginBottom: 30,display:State.cardThirdEdit?'block':'none' }}>
                <Row>
                  <Col md={12} align="right">
                    <ButtonGroup>
                      <div className="list-btn-center">
                        <Button
                          label="取消"
                          type="button"
                          cancle={true}
                          onTouchTap={this.onCancelEdit}
                        />
                      </div>
                      <Button label="确定" type="submit" />
                    </ButtonGroup>
                  </Col>
                </Row>
              </Grid>
              <Grid style={{ margimarginBottomnTop: 30,display:State.cardThirdEdit?'none':'block' }}>
                <Row>
                  <Col md={12} align="right">
                    <Button
                      label="编辑"
                      type="button"
                      onTouchTap={this.onCancelEdit}
                    />
                  </Col>
                </Row>
              </Grid>
              <div style={{display:State.cardThirdEdit?'block':'none'}}>
                <KrField
                  grid={1 / 2}
                  label="排序"
                  name="orderNum"
                  style={{ width: "262px", marginLeft: 15 }}
                  component="input"
                  onChange={this.orderChange}
                />
                <KrField
                  grid={1 / 2}
                  label="开业时间"
                  name="openDate"
                  style={{ width: "262px", marginLeft: 32 }}
                  component="date"
                  requireLabel={true}
                />
                {State.isCorpRank && (
                  <div
                    style={{
                      display: "block",
                      color: "red",
                      paddingLeft: "25px",
                      paddingBottom: "10px"
                    }}
                  >
                    该序号已存在
                  </div>
                )}
                <KrField
                  grid={1 / 2}
                  label="签约开始时间"
                  name="signStartDate"
                  style={{ width: 260, marginLeft: 15 }}
                  component="date"
                  requireLabel={true}
                />
                <KrField
                  grid={1 / 2}
                  label="签约结束时间"
                  name="signEndDate"
                  style={{ width: 260, marginLeft: 29 }}
                  component="date"
                  requireLabel={true}
                />
                <div className="krFlied-box">
                  <KrField
                    grid={1 / 2}
                    label="设计工位数"
                    name="stationNum"
                    style={{ width: 239, marginLeft: 16, marginRight: 3 }}
                    component="input"
                    requireLabel={true}
                  />
                  <span className="unit">个</span>
                </div>
                <div className="krFlied-box">
                  <KrField
                    grid={1 / 2}
                    label="会议室总数"
                    name="meetNum"
                    style={{ width: 239, marginLeft: 32, marginRight: 3 }}
                    component="input"
                    requireLabel={true}
                  />
                  <span className="unit">间</span>
                </div>

                <FieldArray name="wherefloors" component={renderMembers} />

                <div
                  style={{ display: "inline-block" }}
                  className="community-list-time"
                >
                  <KrField
                    component="selectTime"
                    label="营业时间"
                    style={{ width: 140, zIndex: 5, marginLeft: 16 }}
                    name="businessBegin"
                    timeNum={timeStart}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 35,
                      marginLeft: -10
                    }}
                  >
                    至
                  </span>
                  <KrField
                    component="selectTime"
                    style={{
                      width: 140,
                      zIndex: 5,
                      marginLeft: -1,
                      marginTop: 15
                    }}
                    name="businessEnd"
                    timeNum={timeEnd}
                  />
                </div>

                <KrField
                  grid={1 / 2}
                  label="联系方式"
                  name="contract"
                  style={{ width: 262, marginLeft: 8 }}
                  component="input"
                  requireLabel={true}
                />
              </div>
              <div style={{display:State.cardThirdEdit?'none':'block'}}>
                <KrField
                  grid={1 / 2}
                  label="社区状态"
                  style={{ width: 262, marginLeft: 15 }}
                  component="labelText"
                  inline={false}
                  value={inforStyle ? inforStyle : "无"}
                />
                <KrField
                  grid={1 / 2}
                  label="开业时间"
                  style={{ width: 262, marginLeft: 28 }}
                  component="labelText"
                  inline={false}
                  value={openTime ? openTime : "无"}
                />
                <KrField
                  grid={1 / 2}
                  label="签约开始时间"
                  style={{ width: 262, marginLeft: 15 }}
                  component="labelText"
                  inline={false}
                  value={startTime ? startTime : "无"}
                />
                <KrField
                  grid={1 / 2}
                  label="签约结束时间"
                  style={{ width: 262, marginLeft: 28 }}
                  component="labelText"
                  inline={false}
                  value={endTime ? endTime : "无"}
                />
                <KrField
                  grid={1 / 2}
                  label="设计工位数"
                  style={{ width: 262, marginLeft: 15 }}
                  component="labelText"
                  inline={false}
                  value={
                    toJS(State.detailData.stationNum)
                      ? toJS(State.detailData.stationNum) + "个"
                      : "无"
                  }
                />
                <KrField
                  grid={1 / 2}
                  label="会议室总数"
                  style={{ width: 262, marginLeft: 28 }}
                  component="labelText"
                  inline={false}
                  value={
                    toJS(State.detailData.meetNum)
                      ? toJS(State.detailData.meetNum) + "间"
                      : "无"
                  }
                />

                {whereFloor.map((item, index) => {
                  return (
                    <div>
                      <KrField
                        grid={1 / 2}
                        label="所在楼层"
                        style={{ width: 262, marginLeft: 15 }}
                        component="labelText"
                        inline={false}
                        value={item.floor + "层"}
                      />
                      <KrField
                        grid={1 / 2}
                        label="可出租工位数"
                        style={{ width: 262, marginLeft: 28 }}
                        component="labelText"
                        inline={false}
                        value={item.stationCount + "个"}
                      />
                    </div>
                  );
                })}

                <KrField
                  grid={1 / 2}
                  component="labelText"
                  label="营业时间"
                  style={{ width: 262, marginLeft: 15 }}
                  inline={false}
                  value={
                    State.detailData.businessBegin &&
                    State.detailData.businessEnd
                      ? State.detailData.businessBegin +
                        " 至 " +
                        State.detailData.businessEnd
                      : "无"
                  }
                />
                <KrField
                  grid={1 / 2}
                  label="联系方式"
                  style={{ width: 262, marginLeft: 28 }}
                  component="labelText"
                  inline={false}
                  value={
                    toJS(State.detailData.contract)
                      ? toJS(State.detailData.contract)
                      : "无"
                  }
                />
              </div>
              <div className="end-round" style={{ left: "-42px" }} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const validate = values => {
  const errors = {};
  let phone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
  let checkTel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
  let stationN = /^([1-9][0-9]{0,2})$/;
  let stationNP = /^([0-9][0-9]{0,4})$/;
  //正整数
  let numberNotZero = /^[0-9]*[1-9][0-9]*$/;
  //非负整数
  let noMinus = /^(0|[1-9]\d*)$/;
  //整数
  let zeroNum = /^-?\d+$/;
  //坐标
  var reg = /^[-\+]?\d+(\.\d+)\,[-\+]?\d+(\.\d+)$/;

  //空格
  let regs = /^\s*$/;

  //楼层检验
  if (!values.wherefloors || !values.wherefloors.length) {
    errors.wherefloors = { _error: "At least one member must be entered" };
  } else {
    const membersArrayErrors = [];
    values.wherefloors.forEach((wherefloors, memberIndex) => {
      const memberErrors = {};
      if (
        !wherefloors ||
        !wherefloors.floor ||
        (wherefloors.floor && regs.test(wherefloors.floor.toString().trim()))
      ) {
        memberErrors.floor = "请输入所在楼层";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (
        wherefloors.floor &&
        wherefloors.floor.toString().trim() &&
        !zeroNum.test(wherefloors.floor.toString().trim())
      ) {
        memberErrors.floor = "楼层为整数";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (
        !wherefloors ||
        !wherefloors.stationCount ||
        (wherefloors.stationCount &&
          regs.test(wherefloors.stationCount.toString().trim()))
      ) {
        memberErrors.stationCount = "请输入可出租工位数";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (
        wherefloors.stationCount &&
        wherefloors.stationCount.toString().trim() &&
        !noMinus.test(wherefloors.stationCount.toString().trim())
      ) {
        memberErrors.stationCount = "可出租工位数为非负整数";
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });
    if (membersArrayErrors.length) {
      errors.wherefloors = membersArrayErrors;
    }
  }

  if (values.floorHeight && isNaN(values.floorHeight)) {
    errors.floorHeight = "请输入数字";
  }
  if (
    values.entryNum &&
    values.entryNum.toString().trim() &&
    !numberNotZero.test(values.entryNum.toString().trim())
  ) {
    errors.entryNum = "请输入正整数";
  }
  if (
    values.elevatorNum &&
    values.elevatorNum.toString().trim() &&
    !numberNotZero.test(values.elevatorNum.toString().trim())
  ) {
    errors.elevatorNum = "请输入正整数";
  }
  if (
    values.cargoNum &&
    values.cargoNum.toString().trim() &&
    !numberNotZero.test(values.cargoNum.toString().trim())
  ) {
    errors.cargoNum = "请输入正整数";
  }
  if (values.efficientRate && isNaN(values.efficientRate)) {
    errors.efficientRate = "请输入数字";
  }
  if (values.greenRate && isNaN(values.greenRate)) {
    errors.greenRate = "请输入数字";
  }
  if (
    values.stationNum &&
    values.stationNum.toString().trim() &&
    !numberNotZero.test(values.stationNum.toString().trim())
  ) {
    errors.stationNum = "请输入正整数";
  }
  if (
    values.meetNum &&
    values.meetNum.toString().trim() &&
    !numberNotZero.test(values.meetNum.toString().trim())
  ) {
    errors.meetNum = "请输入正整数";
  }

  if (
    values.local &&
    values.local.toString().trim() &&
    !reg.test(values.local.toString().trim())
  ) {
    errors.local = "请填写正确的坐标格式";
  }

  if (
    !values.name ||
    (values.name && regs.test(values.name.toString().trim()))
  ) {
    errors.name = "请填写社区名称";
  }

  if (
    !values.local ||
    (values.local && regs.test(values.local.toString().trim()))
  ) {
    errors.local = "请输入社区坐标";
  }

  if (
    !values.area ||
    (values.area && regs.test(values.area.toString().trim()))
  ) {
    errors.area = "请输入社区面积";
  }
  if (
    values.area &&
    values.area.toString().trim() &&
    !numberNotZero.test(values.area.toString().trim())
  ) {
    errors.area = "请输入正整数";
  }

  if (!values.countyId) {
    errors.countyId = "请填写所属区县";
  }

  if (
    !values.address ||
    (values.address && regs.test(values.address.toString().trim()))
  ) {
    errors.address = "请输入详细地址";
  }

  if (!values.opened) {
    errors.opened = "请输入社区状态";
  }

  if (!values.openDate) {
    errors.openDate = "请输入开业时间";
  }

  if (!values.signStartDate) {
    errors.signStartDate = "请输入签约开始时间";
  }

  if (!values.signEndDate) {
    errors.signEndDate = "请输入签约结束时间";
  }

  if (
    !values.stationNum ||
    (values.stationNum && regs.test(values.stationNum.toString().trim()))
  ) {
    errors.stationNum = "请输入工位总数";
  }

  if (
    !values.meetNum ||
    (values.meetNum && regs.test(values.meetNum.toString().trim()))
  ) {
    errors.meetNum = "请输入会议室总数";
  }

  if (
    !values.contract ||
    (values.contract && regs.test(values.contract.toString().trim()))
  ) {
    errors.contract = "请输入联系方式";
  }

  /*
	 			else if(values.contract.toString().trim()&&!phone.test(values.contract.toString().trim())||!checkTel.test(values.contract.toString().trim())){
	         errors.contract='联系方式错误'
	       }
	 			*/
  return errors;
};
export default reduxForm({
  form: "editCommunityList",
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EditCommunityList);

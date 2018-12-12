import React from "react";
import { toJS } from "mobx";
import { DateFormat } from "kr/Utils";
import { reduxForm, initialize, change, FieldArray, reset } from "redux-form";
import { Actions, Store } from "kr/Redux";
import { observer, mobx } from "mobx-react";
import {
  KrField,
  Grid,
  Row,
  Col,
  Button,
  ButtonGroup,
  DrawerTitle,
  Message,
  Dialog
} from "kr-ui";
import "./index.less";
import State from "../State";
@observer
class CardTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeName: "",
      communityName: "",
      cityId: "",
      showEdit: false,
      cityName: ""
    };
  }

  componentDidMount() {
    if (State.chooceType) {
      Store.dispatch(
        change("CardTwo", "buildName", State.relatedInfo.buildingName)
      );
      Store.dispatch(
        change("CardTwo", "name", State.relatedInfo.communityName)
      );
      Store.dispatch(
        change("CardTwo", "address", State.relatedInfo.detailAddress)
      );
      Store.dispatch(change("CardTwo", "openDate", State.relatedInfo.openDate));
      this.setState({
        cityName:
          State.relatedInfo.provinceName +
          "/" +
          State.relatedInfo.cityName +
          "/" +
          State.relatedInfo.countyName
      });
    }
  }
  onSubmit = values => {
    values.openTime = DateFormat(toJS(State.detailData.openDate), "yyyy-mm-dd");
    values.openDate = DateFormat(toJS(State.detailData.openDate), "yyyy-mm-dd 00:00:00");
    values.wherefloorsStr = JSON.stringify(values.wherefloors);
    delete values.wherefloors;
    State.newCommunitySubmit(values, "2");
    values.wherefloors = JSON.parse(values.wherefloorsStr);
  };

  onCancel = () => {
    State.cardTwoEdit = false;
    Store.dispatch(reset("CardTwo"));
    Store.dispatch(
      change(
        "CardTwo",
        "local",
        State.detailData.longitude + "," + State.detailData.latitude
      )
    );
  };

  //社区名称
  communityNameChange = value => {
    let { communityId } = this.props;
    if (!value.toString().trim()) {
      this.setState({
        communityName: "无"
      });
    } else {
      this.setState({
        communityName: value
      });
    }
    State.communityName(value.toString().trim(), communityId);
  };

  //社区编码
  communityCodeChange = value => {
    let { communityId } = this.props;
    this.setState({
      codeName: value
    });
    State.communityCode(value.toString().trim(), communityId);
  };

  //所属区县
  cityValue = (communityId, cityId, city) => {
    this.setState({
      cityId: cityId
    });
    Store.dispatch(change("CardTwo", "countyId", communityId));
  };

  //地图坐标
  locationMap = value => {
    var xLocation = value.split(",")[1];
    var yLocation = value.split(",")[0];
    Store.dispatch(change("CardTwo", "latitude", xLocation));
    Store.dispatch(change("CardTwo", "longitude", yLocation));
  };
  editChange = () => {
    State.cardTwoEdit = true;
  };

  render() {
    var homeDecoration = "";
    var communityGo = "";
    if (toJS(State.detailData.decoration) == "ROUGHCAST") {
      homeDecoration = "毛坯";
    }
    if (toJS(State.detailData.decoration) == "PAPERBACK") {
      homeDecoration = "简装";
    }
    if (toJS(State.detailData.decoration) == "HARDCOVER") {
      homeDecoration = "精装";
    }
    if (toJS(State.detailData.decoration) == "LUXURIOUS") {
      homeDecoration = "豪装";
    }

    if (toJS(State.detailData.orientation) == "EAST") {
      communityGo = "东";
    }
    if (toJS(State.detailData.orientation) == "SOUTH") {
      communityGo = "南";
    }
    if (toJS(State.detailData.orientation) == "WEST") {
      communityGo = "西";
    }
    if (toJS(State.detailData.orientation) == "NORTH") {
      communityGo = "北";
    }
    if (toJS(State.detailData.orientation) == "SOUTHEAST") {
      communityGo = "东南";
    }
    if (toJS(State.detailData.orientation) == "NORTHEAST") {
      communityGo = "东北";
    }
    if (toJS(State.detailData.orientation) == "SOUTHWEST") {
      communityGo = "西南";
    }
    if (toJS(State.detailData.orientation) == "NORTHWEST") {
      communityGo = "西北";
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

    const { handleSubmit, timeStart, timeEnd } = this.props;
    let cityData = this.state.cityName || this.props.cityData;
    let showEdit = State.cardTwoEdit;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div style={{marginRight:20}}>
            <Grid
              style={{ marginBottom: 20, display: showEdit ? "block" : "none" }}
            >
              <Row>
                <Col md={12} align="right">
                  <ButtonGroup>
                    <div className="list-btn-center">
                      <Button
                        label="取消"
                        type="button"
                        cancle={true}
                        onTouchTap={this.onCancel}
                      />
                    </div>
                    <Button label="确定" type="submit" />
                  </ButtonGroup>
                </Col>
              </Row>
            </Grid>
            <Grid
              style={{ marginBottom: 20, display: showEdit ? "none" : "block" }}
            >
              <Row>
                <Col md={12} align="right">
                  <Button
                    label="编辑"
                    type="button"
                    onTouchTap={this.editChange}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
          <div
            className="watch"
            style={{ display: showEdit ? "none" : "block" }}
          >
            <div>
              <KrField
                grid={1 / 2}
                label="社区名称"
                component="labelText"
                style={{ width: 262, marginLeft: 15 }}
                inline={false}
                value={
                  toJS(State.detailData.name)
                    ? toJS(State.detailData.name)
                    : "无"
                }
              />
              <KrField
                grid={1 / 2}
                label="社区编码"
                style={{ width: 262, marginLeft: 28 }}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.code)
                    ? toJS(State.detailData.code)
                    : "无"
                }
              />
              <KrField
                grid={1 / 2}
                label="社区面积"
                style={{ width: 262, marginLeft: 15 }}
                inline={false}
                component="labelText"
                value={
                  <div style={{ marginTop: -5 }}>
                    <span>{area}</span>
                    <span>m</span>
                    <sup>2</sup>
                  </div>
                }
              />
              <KrField
                grid={1 / 2}
                style={{ width: 262, marginLeft: 28 }}
                component="labelText"
                label="所属商圈"
                inline={false}
                value={
                  toJS(State.detailData.businessAreaName)
                    ? toJS(State.detailData.businessAreaName)
                    : "无"
                }
              />
              <KrField
                grid={1 / 2}
                label="所属区县"
                style={{ width: 262, marginLeft: 15 }}
                component="labelText"
                inline={false}
                value={
                  State.detailData.cityData 
                }
              />

              <KrField
                grid={1 / 2}
                label="详细地址"
                style={{ width: 262, marginLeft: 28 }}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.address)
                    ? toJS(State.detailData.address)
                    : "无"
                }
              />

              <KrField
                grid={1 / 2}
                label="社区坐标"
                component="labelText"
                style={{ width: 262, marginLeft: 15 }}
                inline={false}
                value={
                  State.detailData.latitude && State.detailData.longitude
                    ? "x:" +
                      State.detailData.longitude +
                      ",y:" +
                      State.detailData.latitude
                    : "无"
                }
              />

              <KrField
                grid={1 / 2}
                label="大厦名称"
                style={{ width: 262, marginLeft: 28 }}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.buildName)
                    ? toJS(State.detailData.buildName)
                    : "无"
                }
              />
              <KrField
                grid={1 / 2}
                label="装修情况"
                style={{ width: 262, marginLeft: 15 }}
                component="labelText"
                inline={false}
                value={homeDecoration ? homeDecoration : "无"}
              />
              <KrField
                grid={1 / 2}
                style={{ width: 262, marginLeft: 28 }}
                component="labelText"
                label="社区朝向"
                inline={false}
                value={communityGo ? communityGo : "无"}
              />

              <KrField
                grid={1 / 2}
                label="标准层高"
                style={{ width: 262, marginLeft: 15 }}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.floorHeight)
                    ? toJS(State.detailData.floorHeight) + "m"
                    : "无"
                }
              />
              <KrField
                grid={1 / 2}
                label="社区入口"
                style={{ width: 262, marginLeft: 28 }}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.entryNum)
                    ? toJS(State.detailData.entryNum) + "个"
                    : "无"
                }
              />

              <KrField
                grid={1 / 2}
                label="客梯数量"
                style={{ width: 262, marginLeft: 15 }}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.elevatorNum)
                    ? toJS(State.detailData.elevatorNum) + "部"
                    : "无"
                }
              />
              <KrField
                grid={1 / 2}
                label="货梯数量"
                style={{ width: 262, marginLeft: 28 }}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.cargoNum)
                    ? toJS(State.detailData.cargoNum) + "部"
                    : "无"
                }
              />

              <KrField
                grid={1 / 2}
                label="得房率"
                style={{ width: 262, marginLeft: 15 }}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.efficientRate)
                    ? toJS(State.detailData.efficientRate) + "%"
                    : "无"
                }
              />
              <KrField
                grid={1 / 2}
                label="绿化率"
                style={{ width: 262, marginLeft: 28 }}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.greenRate)
                    ? toJS(State.detailData.greenRate) + "%"
                    : "无"
                }
              />
            </div>
          </div>

          <div
            className="edit-form"
            style={{ display: showEdit ? "block" : "none" }}
          >
            <KrField
              grid={1 / 2}
              type="hidden"
              name="latitude"
              component="input"
              style={{ width: 0 }}
            />
            <KrField
              grid={1 / 2}
              type="hidden"
              name="longitude"
              component="input"
              style={{ width: 0 }}
            />
            <div style={nameStyle}>
              <div
                style={{
                  height: "auto",
                  display: "inline-block",
                  float: "left"
                }}
              >
                <KrField
                grid={1 / 2}
                label="社区名称"
                component="labelText"
                style={{ width: 262, marginLeft: 15 ,display:State.chooceType?'inline-block':'none'}}
                inline={false}
                value={
                  toJS(State.detailData.name)
                    ? toJS(State.detailData.name)
                    : "无"
                }
              />
                <KrField
                  grid={1 / 2}
                  label="社区名称"
                  name="name"
                  component="input"
                  style={{ width: 262, marginLeft: 15 ,display:State.chooceType?'none':'inline-block'}}
                  requireLabel={true}
                  onChange={this.communityNameChange}
                />
                {State.isCorpName && (
                  <div
                    style={{
                      fontSize: 14,
                      color: "red",
                      paddingLeft: 26,
                      paddingBottom: 7
                    }}
                  >
                    该社区名称已存在
                  </div>
                )}
              </div>
              <div
                className="communityList-code"
                style={{
                  height: "auto",
                  display: "inline-block",
                  float: "left",
                  height: "73px"
                }}
              >
                <KrField
                  grid={1 / 2}
                  inline={false}
                  label="社区编码"
                  name="code"
                  style={{ width: 262, marginLeft: 28 }}
                  component="label"
                />
              </div>
            </div>
            <div className="krFlied-box">
              <KrField
                grid={1 / 2}
                label="社区面积"
                name="area"
                style={{ width: 239, marginLeft: 16, marginRight: 3 }}
                component="input"
                requireLabel={true}
              />
              <span className="unit">
                m<sup>2</sup>
              </span>
            </div>
            <KrField
              grid={1 / 2}
              name="businessAreaId"
              style={{ width: 262, marginLeft: 22, }}
              component="select"
              label="所属商圈"
              inline={false}
              options={toJS(State.searchData)}
            />
            <KrField
                grid={1 / 2}
                label="所属区县"
                style={{ width: 262, marginLeft: 15 ,display:State.chooceType?'inline-block':'none'}}
                component="labelText"
                inline={false}
                value={
                  State.detailData.cityData 
                }
              />

              <KrField
                grid={1 / 2}
                label="详细地址"
                style={{ width: 262, marginLeft: 28 ,display:State.chooceType?'inline-block':'none'}}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.address)
                    ? toJS(State.detailData.address)
                    : "无"
                }
              />
            <KrField
              grid={1 / 2}
              label="所属区县"
              name="countyId"
              style={{
                width: 262,
                marginLeft: 16,
                position: "relative",
                zIndex: 5,
                display:State.chooceType?'none':'inline-block'
              }}
              component="city"
              onSubmit={this.cityValue}
              requireLabel={true}
              cityName={cityData}
            />

            <KrField
              grid={1 / 2}
              label="详细地址"
              name="address"
              style={{ width: 262, marginLeft: 28 ,display:State.chooceType?'none':'inline-block'}}
              component="input"
              requireLabel={true}
            />

            <div className="location-m">
              <KrField
                grid={1 / 2}
                label="社区坐标"
                component="input"
                name="local"
                style={{ width: 262, marginLeft: 16 }}
                requireLabel={true}
                onChange={this.locationMap}
              />

              <a
                className="mapLocation"
                href={`http:\/\/api.map.baidu.com/lbsapi/getpoint/index.html`}
                target="_blank"
              />
              <KrField
                grid={1 / 2}
                label="大厦名称"
                style={{ width: 262, marginLeft: 28 ,display:State.chooceType?'inline-block':'none'}}
                component="labelText"
                inline={false}
                value={
                  toJS(State.detailData.buildName)
                    ? toJS(State.detailData.buildName)
                    : "无"
                }
              />
              <KrField
                grid={1 / 2}
                label="大厦名称"
                name="buildName"
                style={{ width: 262, marginLeft: 28 ,display:State.chooceType?'none':'inline-block'}}
                component="input"
                requireLabel={false}
              />
            </div>
            <KrField
              grid={1 / 2}
              label="装修情况"
              name="decoration"
              style={{ width: 262, marginLeft: 16, zIndex: 2 }}
              component="select"
              options={[
                { label: "毛坯", value: "ROUGHCAST" },
                { label: "简装", value: "PAPERBACK" },
                { label: "精装", value: "HARDCOVER" },
                { label: "豪装", value: "LUXURIOUS" }
              ]}
            />
            <KrField
              grid={1 / 2}
              name="orientation"
              style={{ width: 262, marginLeft: 28 }}
              component="select"
              label="社区朝向"
              inline={false}
              options={[
                { label: "东", value: "EAST" },
                { label: "南", value: "SOUTH" },
                { label: "西", value: "WEST" },
                { label: "北", value: "NORTH" },
                { label: "东南", value: "SOUTHEAST" },
                { label: "东北", value: "NORTHEAST" },
                { label: "西南", value: "SOUTHWEST" },
                { label: "西北", value: "NORTHWEST" }
              ]}
            />

            <div className="krFlied-box">
              <KrField
                grid={1 / 2}
                label="标准层高"
                name="floorHeight"
                style={{ width: 239, marginLeft: 16, marginRight: 3 }}
                component="input"
              />
              <span className="unit">m</span>
            </div>
            <div className="krFlied-box">
              <KrField
                grid={1 / 2}
                label="社区入口"
                name="entryNum"
                style={{ width: 239, marginLeft: 33, marginRight: 3 }}
                component="input"
              />
              <span className="unit">个</span>
            </div>

            <div className="krFlied-box">
              <KrField
                grid={1 / 2}
                label="客梯数量"
                name="elevatorNum"
                style={{ width: 239, marginLeft: 16, marginRight: 3 }}
                component="input"
              />
              <span className="unit">部</span>
            </div>
            <div className="krFlied-box">
              <KrField
                grid={1 / 2}
                label="货梯数量"
                name="cargoNum"
                style={{ width: 239, marginLeft: 33, marginRight: 3 }}
                component="input"
              />
              <span className="unit">部</span>
            </div>

            <div className="krFlied-box">
              <KrField
                grid={1 / 2}
                label="得房率"
                name="efficientRate"
                style={{ width: 239, marginLeft: 16, marginRight: 3 }}
                component="input"
              />
              <span className="unit">%</span>
            </div>
            <div className="krFlied-box">
              <KrField
                grid={1 / 2}
                label="绿化率"
                name="greenRate"
                style={{ width: 239, marginLeft: 36, marginRight: 3 }}
                component="input"
              />
              <span className="unit">%</span>
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
    !values.code ||
    (values.code && regs.test(values.code.toString().trim()))
  ) {
    errors.code = "请填写社区编码";
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

  return errors;
};
export default reduxForm({ form: "CardTwo", validate })(CardTwo);

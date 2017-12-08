import React from 'react';
import './index.less';
export default class AirBubbles extends React.Component {

    static displayName = 'Tooltip';

    static propTypes = {
        children: React.PropTypes.node,
        title: React.PropTypes.string,
        maxWidth: React.PropTypes.number,
        offsetTop: React.PropTypes.number
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let _this = this;
        this.text.onmouseover = function () {
            _this.tipRender();
            _this.tip.style.visibility = 'visible';
        }
        this.text.onmouseout = function () {
            _this.tip.style.visibility = 'hidden';
        }
    }
    //判断显示的位置(上下位置变换)
    judgmentPosition = (textDetail, tipDetail) => {
        if (textDetail.top < tipDetail.height + 5) {
            return "bottom";
        }
        return "top";
    }
    //气泡显示出来
    tipRender = () => {
        let { offsetTop } = this.props;
        const textDetail = this.text.getBoundingClientRect();
        const tipDetail = this.tip.getBoundingClientRect();
        offsetTop = Number(offsetTop||0);
        let isTop = this.judgmentPosition(textDetail, tipDetail) == 'top';
        let text_refer_posiyion = {
            x: textDetail.left + Math.ceil(textDetail.width) / 2,
            y: isTop ? textDetail.top + offsetTop - 5 : textDetail.bottom,
        };
        let tip_LT_position = {
            x: text_refer_posiyion.x - Math.ceil(tipDetail.width) / 2,
            y: isTop ? (text_refer_posiyion.y - tipDetail.height ) : (text_refer_posiyion.y + 5)
        };
        if (tip_LT_position.x < 0) {
            tip_LT_position.x = 5
        }
        if (isTop) {
            this.triangle.className = 'triangle triangle-top'
        } else {
            this.triangle.className = 'triangle triangle-bottom'
        }
        this.tip.style.top = tip_LT_position.y + 'px';
        this.tip.style.left = tip_LT_position.x + 'px';
        this.triangle.style.top = text_refer_posiyion.y - 7 + 'px';
        this.triangle.style.left = text_refer_posiyion.x - 5 + 'px';

    }


    render() {

        let { children, title, maxWidth } = this.props;

        return (
            <div
                className="ui-tool-tip"


            >
                <div
                    className="text"
                    ref={
                        (ref) => {
                            this.text = ref;
                        }
                    }
                >
                    {children}
                </div>
                <div
                    className="tip"
                    ref={(ref) => {
                        this.tip = ref;
                    }}
                    style={{ maxWidth: maxWidth || 800 ,lineHeight:1}}
                >
                    {title}
                    <div
                        ref={(ref) => {
                            this.triangle = ref;
                        }}
                        className="triangle triangle-top"></div>
                </div>
            </div>
        );
    }
}







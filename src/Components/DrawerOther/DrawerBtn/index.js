import React from 'react';
import {
  Grid,
  Row,
  Col
} from '../../Grid';
import ButtonGroup from '../../ButtonGroup';
import Button from '../../Button';

export default class DrawerBottomBtn extends React.Component {

    constructor(props) {
        super(props);
    }

    onCancel =()=>{
        const {onCancel} = this.props;
        onCancel && onCancel();
    }
    render() {
        return (
              
            <Grid style={{marginTop:30}}>
                <Row>
                    <Col md={12} align="center">
                        <ButtonGroup>
                            <div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
                            <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                        </ButtonGroup>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

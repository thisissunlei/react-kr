import React from 'react';
import { FormSection, Field } from 'redux-form';


import AddressBtn from './AddressBtn';



export default class BrowseBtn extends React.Component {

   
    constructor(props, context) {
        super(props, context)
        this.state = {
         
        }
    }

    btnRender = () =>{
        let { component } = this.props;
        // console.log(component,">>>>>>>")
        switch (component) {
            case "addressBtn":
                // console.log(component, "addressBtn")
                return (<AddressBtn  {...this.props}/>);
                break;
            default:
                return (<AddressBtn  {...this.props} />);
                
        }
    }

    render() {
        const {name} = this.props;
        console.log("9999999", Field)
        return (
            <FormSection name={name}>
                {this.btnRender()}
            </FormSection>
        );
    }
}
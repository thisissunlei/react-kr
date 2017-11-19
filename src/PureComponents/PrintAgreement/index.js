import React, {
    
   PropTypes
} from 'react';
import {
   observer
} from 'mobx-react';

import {
   Title,
   Button
} from 'kr-ui';
import {
   Actions,
   Store
} from 'kr/Redux';

export default class PrintAgreement extends React.Component {
   
   constructor(props, context) {
       super(props, context);
     
   }
   componentDidMount() {
       let {childElem} = this.props;
       this.print.innerHTML = childElem;  
    //    setTimeout(function() {
    //        State.cachet = _this.renderImg();
    //         window.print();
    //         window.close();
    //     }, 1200)


   }
  
   print=()=>{
       window.print()
   }
   render() {
       let {children} = this.props;
       return (
        <div
            ref = {(ref)=>{
                this.print = ref;
            }}
        >
          
        </div>

       );
   }
}

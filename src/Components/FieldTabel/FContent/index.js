import React from 'react';

export default class FContent extends React.Component {


  constructor(props) {
    super(props);
  }


  rowCheck = (event) =>{
    const {index,onCheck} = this.props;
    onCheck && onCheck(index,event.target.checked);

  }
  contentRender = () =>{
    const {data,detail,checkbox} = this.props;
    var doms = detail.map((item,index)=>{
      return (
        <td>
          {item.checkbox && <input 
              type="checkbox" 
              onChange={(event) =>{
                  this.onCheck(event,item,index)
              }} 
              checked = {item.checked ? "checked":""}
          />}
          {data[item.name]}
        </td>
      )
    })
    if(checkbox){
      doms.unshift(
         <td>
              <input 
                    type="checkbox" 
                    onChange={(event) =>{
                        this.rowCheck(event)
                    }} 
                    checked = {data.checked ? "checked":""}
                />
            </td>
      )
    }
    return doms;
  }

  render() {
    return (
      <tr>
       
        {this.contentRender()}
      </tr>
    );
  }
}

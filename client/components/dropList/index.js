import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import List from './list';
import ReactDOM from 'react-dom';

class DropdownList extends Component{
    constructor(props) {
        super(props);
		this.state = {
			open: false,
			selected: this.props.defaultIndex || null
		}
		this.toggleOpen = this.toggleOpen.bind(this);
    }
	
	toggleOpen() {
		if( !this.props.disabled ) {
			this.setState({
				open: !this.state.open
			})
		}
		
	}
	
	onSelect(data, index) {
		this.setState({
			open: false,
			selected: index+1
		})
		data.index = index+1; 
		this.props.onSelected(data);
	}
	
    render(){
		let that = this;
		let status = '';
		if( this.props.disabled ) status = 'disabled';
		else if ( this.state.selected || this.state.open ) status='active';
		
        return(
            <div styleName="droplist"> 
				<div styleName={'listInput '+status} onClick={this.toggleOpen.bind(this)} className={this.props.className}>
					{
						(() => {
							if( this.state.selected ) {
								let defaultSelect = this.props.listContent[this.state.selected-1];
								if(defaultSelect.iconFont) return <div><i className={"fa " + defaultSelect.iconFont } aria-hidden="true"/>{defaultSelect.label}</div>
								else return defaultSelect.label;	 
							}else {
								return '請選擇' ; 
							} 
						})()
					}
					<i className="fa fa-caret-down" aria-hidden="true" styleName="caret-down"/> 
				</div>
				{this.state.open && 
				<List type={this.state.posType}
				      open={this.state.open} 
                      clickAway={this.toggleOpen} > 
					  { this.props.listContent.map(function (data, index) {
						  return (
							  <li key={index} onClick={that.onSelect.bind(that, data, index)}>
								  { typeof(data.iconFont) !== 'undefined' && <i className={"fa " + data.iconFont } aria-hidden="true"  /> }								  	
								  {data.label}
							  </li>
							);
					  })}  
                </List>
				}               
            </div>
        );
    }
}

export default CSSModules(DropdownList,style,{allowMultiple:true});
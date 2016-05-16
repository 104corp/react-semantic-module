import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Overlay from '../../utils/overlay';
import { enableDocScroll, disableDocScroll } from '../../utils/windowScroll';


class Lightbox extends Component{
	componentDidMount() {
		disableDocScroll();
	}
	
	componentWillUnmount() {
		enableDocScroll();
	}
	
    render(){
		
        console.log(this.props.option.closeIcon);
        let boxWidth = '380px',contentPadding = '0 10px', contentHeight = 'auto';
        if( this.props.option.title ) {
            boxWidth = '800px';
        }
        if ( this.props.option.contentHeight ) {
            contentHeight = this.props.option.contentHeight;
        }
        return(
            <div styleName="container">
                <Overlay 
                         onRequestClose={this.props.onClose}
                         styleName="overlay">
                        
                </Overlay>
                <div styleName="lightbox" style={{ width: boxWidth}} className={this.props.className}>
                    { 
                        this.props.option.title && 
                        <div styleName="title">{ this.props.option.title }</div>
                    }
                    <div styleName="content" style={{padding: contentPadding, maxHeight : contentHeight}}>
                        { this.props.children }
                        { this.props.option.submit && <button onClick={this.props.option.submit.action} styleName="submit">{this.props.option.submit.text}</button>}
                        { this.props.option.cancel && <button onClick={this.props.onClose}>{this.props.option.cancel.text}</button>}
                    </div>
                    { this.props.option.closeIcon && <div styleName="close" onClick={this.props.onClose}></div>}
                </div>
            </div>
        );
    }
} 
export default CSSModules(Lightbox,style,{allowMultiple:true});
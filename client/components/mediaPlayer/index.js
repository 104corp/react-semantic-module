import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import style from './index.css';
import Player from './player.js';
import { getFileUrl } from '../../utils/fileUpload.js';


const getMappingData = ( fileFromDocApiSrc ) => {

	if( !fileFromDocApiSrc ) fileFromDocApiSrc = [];
	const docApiMap = {
		'VIDEO': {
			tag: ['720p'],
			template: <video src={fileFromDocApiSrc[0]} controls autoPlay="autoplay"/>
		},
		'AUDIO': {
			tag: [],
			template: <audio src={fileFromDocApiSrc[0]} controls/>
		},
		'IMAGE': {
			tag: ['activityGrid'],
			template: <img src={fileFromDocApiSrc[0]}/>
		},
		'DOCUMENT': {
			tag: ['activityPlay'],
			template: <Player src={fileFromDocApiSrc}/>
		},
	}

	return docApiMap;
}



class MediaPlayer extends Component {
	constructor(props){
		super(props);
		this.state = {
			transformed: false,
			tagType: props.property.tagtype,
			carrier: null,
			data: {}
		}
		console.log(props);
		this.handleClick = (e) => this._handleClick(e);
	}
	_handleClick(e) {
		let that = this;
		if( !this.state.transformed ) {
			getFileUrl(this.props.property.fileid, this.state.tagType, getMappingData()[this.state.tagType].tag).done(function(res){
				console.log(res);	
				that.state.carrier = getMappingData(res[0].url)[that.state.tagType].template;
				that.setState({ 
					transformed: true,
					carrier: that.state.carrier
				});	
			});
		}
		
		
	}
	render() {
		console.log(this.state.carrier);
		if( this.state.tagType === 'HYPERLINK' ){
			return (
				<div styleName="block">
					<a href={this.props.property.linkurl } target="_blank">
					<span styleName="link">{this.props.property.linkurl}</span>
						<div styleName="linkBlock">
							<img src={this.props.property.src} />
							<div styleName="info">
								<h3>{this.props.property.linktitle}</h3>
								<p>{this.props.property.linkcontent}</p>
							</div>
						</div>
					</a>
				</div>
			);
		}else if( this.state.tagType === 'YOUTUBE' ) {
			return (
				<div styleName="block">
					<a href={this.props.property.url } target="_blank">{this.props.property.url}</a>
					<div>
					<iframe width="476" height="267.5"
						src={location.protocol + "//www.youtube.com/embed/" + this.props.property.file}>
						</iframe>
					</div>
				</div>
			)
		}else {
			let blockStyle = this.state.transformed? '' : this.state.tagType.toLowerCase();
			return (
				<div styleName={blockStyle + ' block'} onClick={this.handleClick}>
					{ this.state.transformed ? this.state.carrier : <img src={this.props.property.src} /> }
				</div>
			);
		}
		
	}
}

export default CSSModules(MediaPlayer,style,{allowMultiple:true});
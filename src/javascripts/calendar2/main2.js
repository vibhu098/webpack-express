import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Year from './controls/year';
import $ from 'jquery';
import YearSelect from './controls/yearselection';

require('../../styles/calendar/main.scss');


var App= React.createClass({

	render:function(){
		return <div>
				<YearSelect year={moment().year()} country={this.props.country && this.props.country.toLowerCase()} />
		   		<div id="month-view">
		   		
		   		</div>
   				</div>;
	}
});

var getMobileOperatingSystem = function () {
				var userAgent = navigator.userAgent || navigator.vendor || window.opera;

				if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
					return 'iOS';

				} else if (userAgent.match(/Android/i)) {

					return 'Android';
				} else {
					return 'unknown';
				}
};
$(".nav").on('click',function(){
				var query=""
					if(getMobileOperatingSystem() == "Android"){
						query = "?android=true";
					}
					var targetURL = "/spotcues/apps/list1"+query;
					window.location.replace(targetURL);
});

$.get("http://ipinfo.io", function (response) {
	$("#loader").addClass('hidden');
    ReactDOM.render(<App country={response.country} />,
    	document.getElementById('main')
	);
}, "jsonp");


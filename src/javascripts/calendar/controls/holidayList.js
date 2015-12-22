import React, {Component, PropTypes} from 'react';
import moment from 'moment';

class HolidayList extends Component{
	renderHolidays(){
		var holidayDom=[],self=this;
		self.props.holidays.forEach(function(holiday){
				var date=holiday.date.iso;
				var index=0;
				var list=<li key={date+""+index}><span className="date">some date{moment(date).format("MMM Do YYYY")}</span><a href={holiday.url} target="_blank"><span>{holiday.name}</span></a><p><i>{holiday.oneliner || "Not Available "}</i></p>
				</li>; 
				holidayDom = holidayDom.concat(list);
			});
		return holidayDom;
	}
	render(){
		return <ul>{this.renderHolidays()}</ul>;
	}
}



export default HolidayList
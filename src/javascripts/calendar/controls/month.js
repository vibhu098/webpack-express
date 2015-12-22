import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import _ from 'lodash';

class DayNames extends Component{
    render() {
        return <div className="week names">
            <span className="day">Sun</span>
            <span className="day">Mon</span>
            <span className="day">Tue</span>
            <span className="day">Wed</span>
            <span className="day">Thu</span>
            <span className="day">Fri</span>
            <span className="day">Sat</span>
        </div>
    }
}

class Week extends Component{
    render() {
        var days = [],
            date = this.props.date,
            month = this.props.month,
            holidays = this.props.holidays;


        for (var i = 0; i < 7; i++) {
            var day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                isHoliday:holidays.indexOf(date.format("YYYY-MM-DD"))>-1
            };
            days.push(<span key={day.date.toString()} className={"day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + ((day.isHoliday && day.isCurrentMonth) ? " isHoliday" : "") } >{day.number}</span>);
            date = date.clone();
            date.add(1, "d");
        }

        return <div className="week" key={days[0].toString()}>
            {days}
        </div>
    }
}



class Month extends Component{
   	
   	constructor(props) {
    	super(props);
    	this.state = {month: this.props.selected,holidays:_.pluck(_.pluck(this.props.holidays,'date'),'iso')}
  	}

    componentWillReceiveProps(nextProps){
      var holidays= _.pluck(_.pluck(nextProps.holidays,'date'),'iso');
      this.setState({holidays:holidays});
    }
   
    render() {

    	var prop={className:"month"};
    	if(this.props.onClick){
    		prop.onClick=this.props.onClick.bind(this);
    	}
        
        return <div {...prop}>
            <div className="header">
                {this.renderMonthLabel()}
            </div>
            <DayNames />
            {this.renderWeeks()}
        </div>;
    }
    
    renderWeeks() {
        var weeks = [],
            done = false,
            date = this.props.selected.clone().startOf("month").add("w" -1).day("Sunday"),
            monthIndex = date.month(),
            count = 0,
            holidays=this.state.holidays;
           // console.log(holidays);

        while (!done) {
            weeks.push(<Week key={date.toString()} date={date.clone()} month={this.props.selected} holidays={holidays}  selected={this.props.selected} />);
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    }

    renderMonthLabel() {
        return <span>{this.props.selected.format("MMMM")}</span>;
    }
}

Month.propTypes={
	selected:PropTypes.object
};

export default Month
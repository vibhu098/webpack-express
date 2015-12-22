import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Month from './month';
import _ from 'lodash';
import HolidayList from './holidayList';
import holidays from '../collection/holidays';
import YearSelect from './yearselection';

class MonthView extends Component{
    constructor(props) {
    	super(props);
    	this.state = {
                    month: this.props.selected,
                    holidays:this.props.holidays,
                    initialYear:this.props.selected.year(),
                    year:this.props.selected.year()
                  }
  	}

    checkIfYearChange(month){
      var self= this;
        if(this.state.year !== this.state.month.year()){
          this.state.year= this.state.month.year();
          holidays.get(this.state.year,this.props.country).done(function(res){
            self.setState({holidays:res.holidays});
            self.filterHolidays(month);
          });
          return [];
        }else{
            return self.filterHolidays(month);
        }
        
    }
    filterHolidays(month){
      var monthHolidays={};
      var self=this;
      monthHolidays  = _.filter(self.state.holidays,function(holiday){
        return moment(holiday.date.iso).month()===month;
      })
      // keys.map(function(key){
      //   var m=moment(key).month()
      //   if(m==month){
      //     monthHolidays[key]=self.state.holidays[key];
      //   } 
      // });
      return monthHolidays;
    }

    previous() {
        var month = this.state.month;
        month.add(-1, "M");
        this.setState({ month: month });
    }

    next() {
        var month = this.state.month;
        month.add(1, "M");
        this.setState({ month: month });
    }

    back(){
    	$("#year-view").removeClass('hidden');
  		$("#month-view").addClass('hidden');
      if(this.state.initialYear !==this.state.year){
        this.props.onChange({target:{value:this.state.year}});
      }
    }
	 
    componentWillReceiveProps(nextProps){
    	var month= nextProps.selected;
      var holiday=nextProps.holidays
    	this.setState({month:month,holidays:nextProps.holidays});
    }

  	render(){
  		var month=this.state.month.clone();
  		var holidays=this.checkIfYearChange(this.state.month.month());
  			$("#year-view").addClass('hidden');
      	$("#month-view").removeClass('hidden');
	      return <div>
	      		<div className="button-wrapper clearfix">
	      			<button className="back btn-primary pull-left" onClick={this.back.bind(this)}>Back</button>
	      			<span className="year-label">{month.year()}</span>
	      			<div className="navigation pull-right">
		      			<button className="prev btn-primary" onClick={this.previous.bind(this)}>Prev</button>
		      			<button className="next btn-primary" onClick={this.next.bind(this)}>Next</button>
	      			</div>
	      		</div>
	      		<div id='month-detail'>
	      			<Month selected={month} holidays={this.state.holidays}/>
	      		</div>      
	      		<div id="holiday-detail">
	      			<HolidayList holidays={holidays} />
	      		</div>
	      		</div>;
  	}
}

MonthView.propTpes={month:PropTypes.object,holidays:PropTypes.object};

export default MonthView
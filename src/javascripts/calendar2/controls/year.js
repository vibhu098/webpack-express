import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Month from './month';
import HolidayList from './holidayList';
import MonthView from './month_detail';

class Year extends Component{
	constructor(props) {
    	super(props);
    	this.state = {year: this.props.selected,holidays:this.props.holidays}
  	}

    componentDidMount(){
      this.openMonth(moment(new Date()).month());
    }

    componentWillReceiveProps(nextProps){
      var holidays= nextProps.holidays;
      this.setState({holidays:holidays});
    }

  	openMonth(index){
  		var date = moment({year:this.props.selected,month:index});
      ReactDOM.render(<MonthView selected={date} refs={this.refs} country={this.props.country} onChange = {this.props.onChange.bind(this)} holidays={this.state.holidays}/>,
    		document.getElementById('month-view'));
  	}

  	renderMonths(year){
  		var months=[];
  		for(var i=0;i<12;i++){
  			months.push(<Month key={year+""+i} selected={moment({year:year,month:i})} country={this.props.country} holidays={this.state.holidays} onClick={this.openMonth.bind(this,i)}/>);
  		}
  		return months;
  	}

  	render() {
		var year= this.props.selected;
  		return <div>
  				{this.renderMonths(year)}
  			</div>;
  	}
}

Year.propTypes={
	selected:PropTypes.number
}
export default Year

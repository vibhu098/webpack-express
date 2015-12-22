import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Year from './year';
import moment from 'moment';
import holidays from '../collection/holidays';


class YearSelection extends Component{
	   constructor(props) {
    	super(props);
    	this.state = {
        years:[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
        countries:[{country:"United Estates",code:"us"},{country:"Switzerland",code:"cz"},{country:"Australia",code:"au"},{country:"India",code:"in"},{country:"Russia",code:"ru"},{country:"United Kingdom",code:"uk"},{country:"Japan",code:"jp"},{country:"Canada",code:"ca"}],
        selectedYear: this.props.year,
        selectedCountry:this.props.country
      }
  	}
  	
  	renderYears(){
  		var years=this.state.years,
  		domYears=[];
  		for(var i in years){
  			domYears.push(<option key={years[i]*Math.random().toFixed(2)+"year"} value={years[i]}>{years[i]}</option>);  		
  		}
  		return domYears; 
  	}

  	componentDidMount(){
    	this.changeYear();    
    }

  	changeYear(e){
      var self=this;
  		var year= this.state.selectedYear;
  		if(e){
  			year = (e.target.value)*1;
  		}
      holidays.get(year,this.state.selectedCountry).done(function(res){
        self.setState({selectedYear:year,holidays:res.holidays});
      });

		//this.setState({selectedYear:year});
  	}

    changeCountry(e){
      var self=this;
      var country= this.state.selectedCountry;
      if(e){
        country = e.target.value;
      }
      holidays.get(this.state.selectedYear,country).done(function(res){
        self.setState({selectedCountry:country,holidays:res.holidays});
      });

    }

    renderCountry(){
      var countries =this.state.countries,
      domCountries=[];
      for(var i in countries){
        domCountries.push(<option key={countries[i].country} value={countries[i].code}>{countries[i].country}</option>);     
      }
      return domCountries;
    }

  	render(){
  		return <div id="year-view">
            <div className="year-selection clearfix" id="year-selection">
              <select className="year-dropdown" value ={this.state.selectedYear} onChange={this.changeYear.bind(this)}>
        			{this.renderYears()}
      		    </select>
              <select className="city-dropdown pull-right" value={this.state.selectedCountry} onChange={this.changeCountry.bind(this)}>
              {this.renderCountry()}
              </select>
            </div>
            <div id="years">
              {this.state.holidays && <Year onChange={this.changeYear.bind(this)} selected={this.state.selectedYear} country={this.state.selectedCountry} holidays={this.state.holidays} />}
            </div>
          </div>;

  	}
}

YearSelection.propTypes={
	years:PropTypes.arrayOf(PropTypes.number)
}

export default YearSelection;
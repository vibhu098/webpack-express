import $ from 'jquery'
import crypto from 'crypto';
import moment from 'moment'

class HolidayList{

	get(year,country){
		var secretkey= "QfRuhRo92utKt6A2MHiZ";
		var accesskey = "838Sd2JeSf";
		var timestamp= moment().toISOString();
		var service= "holidays";
		var message=accesskey+service+timestamp;
		var hash=crypto.createHmac('sha1', secretkey).update(message).digest('base64'); 
		var data= {
			version:2,
			accesskey:accesskey,
			signature:hash,
			timestamp:timestamp,
			country:country,
			year:year
		}
		$("#loader").removeClass("hidden");
		return $.ajax({
			url:"https://api.xmltime.com/holidays",
			data:data,
			dataType:'json',
			complete:function(){
				$("#loader").addClass("hidden");
			}
		});
	}
}

export default new HolidayList()
import Vue from 'vue'

Vue.mixin({
	methods: {

		formatDate(dateString) {
				const date = new Date(dateString);
					// Then specify how you want your dates to be formatted
				return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format( new Date( date.getTime() + Math.abs(date.getTimezoneOffset()*60000) ));
		} 

	}
})
module.exports = {
	authToken: 'klRv6VO06Sm7SNJdAaty8V3tT',
	intervalTime: 10000,
	occupationEndpoint: 'https://data.colorado.gov/resource/vu7j-izta.json',
	query: queryParams
}

function addQueryParams(key, value) {
	if (!this.query) {
		this.query = this.query + '?'
	} else {
		this.query = this.query + '&'
	}
	this.query = this.query + key + '=' + value;
}

function queryParams() {
	this.query = '';
	this.add = addQueryParams;
}
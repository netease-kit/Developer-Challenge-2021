import {
	getData,
	getListData,
	postData,
	postDataWithQuery
} from './query.js'
export function getLst() {
	const query = {
			p: {
				n: 1,
				s: 10
			},
			o: 'desc'
		}
	return getData('/movie/index?query=' + encodeURI(JSON.stringify(query)))
}

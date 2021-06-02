/* https://ht.zjhjjk.com */
import cache from './apiCache.js'
const baseUrl = 'http://panda.kblue.site'
	/* 获取Data */
	export const getData = (url,queryData) => {
		const _key =  encodeURI(url + JSON.stringify(queryData))
		const promise = new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				data: {
					...queryData
				},
				timeout: 2000,
				method: 'GET',
				success(res) {
					if (res.data.code == 0) {
						console.log('接口请求成功',res)
						const _storage = cache.set(_key,res.data)
						console.log('接口请求成功',_storage)
						resolve(res.data)
					}else if (res.data.code == 300){
						resolve(res.data)
					}else if( res.data.code == 404  || res.data.code == 502){
						const res = cache.get(_key)
						console.log('404错误返回之前的数据',res);
						if (res.msg == 'ok') {
							resolve(res)
						}
					}else{
						console.log('接口请求失败:' + '/\请求参数：' + JSON.stringify(queryData) + '/\请求方式：GET'  + '/\错误返回' + res,'/\接口地址：' + baseUrl + url)
						reject(res)
					}
				},  
				fail(err) {
					if (err.errMsg === 'request:fail abort statusCode:-1') {
						const res = cache.get(_key)
						if (res.msg == 'ok') {
							resolve(res)
						}
					}
				},
				complete(cpl) {
					console.log(cpl);
				}
			})
		})
		return promise.then(res =>{
			return res
		}).catch(err => {
			return err
		})
	}
	/* 获取listData */
	export const getListData = (url, queryData) => {
		const promise = new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				data: {
					...queryData
				},
				method: 'GET',
				success(res) {
					if (res.data.code == 0) {
						console.log('code 0 数据返回',res.data)
						resolve(res.data)
					}else{
						console.log('接口请求失败','参数' + JSON.stringify(queryData))
						reject(res)
					}
				}
			})
		})
		return promise.then(res =>{
			return res
		}).catch(err => {
			return err
		})
	}
	export const postData = (url, queryData) =>  {
		console.log('开始获取签名')
		let queryDatas
		if(Array.isArray(queryData)){
			queryDatas = queryData
		}else{
			queryDatas = {...queryData}
		}
		const promise = new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				data: queryDatas,
				method: 'POST',
				success(res) {
					/* console.log(res) */
					if (res.data.code == 0) {
						/* console.log('code 0 数据返回',res) */
						resolve(res.data)
					}else{
						console.log('接口请求失败:' + '/\请求参数：' + JSON.stringify(queryData) + '/\请求方式：POST'  + '/\错误返回' + res.data.msg,'/\接口地址：' + baseUrl + url)
						reject(res)
					}
				}
			})
		})
		return promise.then(res =>{
			return res
		}).catch(err => {
			return err
		})
	}
	export const postDataWithQuery = (url, queryData) =>  {
		let query = ""
		Object.keys(queryData).forEach((key, index) => {
		  query += key + '=' + queryData[key] + '&'
		})
		query = query.substr(0, query.length - 1)
		console.log('开始获取签名了')
		const promise = new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url + `?${query}` ,
				data: {},
				method: 'POST',
				success(res) {
					if (res.data.code == 0) {
						console.log('code 0 数据返回')
						resolve(res.data)
					}else{
						console.log('接口请求失败',JSON.stringify(queryData))
						reject(res)
					}
				}
			})
		})
		return promise.then(res =>{
			return res
		}).catch(err => {
			return err
		})
	}
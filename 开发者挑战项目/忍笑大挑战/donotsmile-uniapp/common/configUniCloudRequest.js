function _beforeProcess(){
	// let globalData = getApp().globalData
	// uniCloud._header = {authorization:globalData.id_token}
}

function _postProcessResult(r){
	if(r.success||r.success==undefined){
		console.log(r);
		if(r.result.status == 200){
			return r.result.data	
		}else{
			uni.showModal({
				showCancel: false,
				content: r.result.msg
			})
			return false
		}
	}else{
		console.log("云请求出现错误")
		return false
	}
}


uniCloud.get = async  function(url,postData){
	_beforeProcess()
	let r = await uniCloud.callFunction({
		name: "api",            
		data: {                   
			url: url,        
			method: "get",      
			header: uniCloud._header,
			data:postData
		}
	})
	return _postProcessResult(r)
	
}

uniCloud.post = async function(url,postData){
	_beforeProcess()
	let r = await uniCloud.callFunction({
		name: "api",            
		data: {                   
			url: url,        
			method: "post",      
			header: uniCloud._header,
			data:postData
		}
	})
	return _postProcessResult(r)
}

uniCloud.delete = async function(url,postData){
	_beforeProcess()
	let r = await uniCloud.callFunction({
		name: "api",            
		data: {                   
			url: url,        
			method: "delete",      
			header: uniCloud._header,
			data:postData
		}
	})
	return _postProcessResult(r)
}

uniCloud.patch = async function(url,postData){
	_beforeProcess()
	let r = await uniCloud.callFunction({
		name: "api",            
		data: {                   
			url: url,        
			method: "patch",      
			header: uniCloud._header,
			data:postData
		}
	})
	return _postProcessResult(r)
}
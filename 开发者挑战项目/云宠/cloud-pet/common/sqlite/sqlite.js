/* 数据操作
	creted by hjl 2020/9/24
 */
// 打开本地的localStorage.db数据库
function openComDB() {  
    return new Promise((resolve, reject) => {
		plus.sqlite.openDatabase({
			name: 'localStorage',
			path: '_doc/localStorage.db',
			success: function(e) {
				console.log('打开数据库localStorage.db成功 ');
				resolve(e);
			},
			fail: function(e) {
				console.log('打开数据库localStorage.db失败: ' + JSON.stringify(e));
				reject(e);
			}
		});
	})
}  
// 新增表
function executeSQL(name, sql) {  
    return new Promise( (resolve, reject) => {
		plus.sqlite.selectSql({
		    name: name,  
		    sql: sql,  
		    success: function(e) {  
		        console.log("查询数据库:" + name + ",表:" + sql + ";的");  
		        resolve(e) 
		    },  
		    fail: function(e) {  
		        console.log("查询数据库失败:" + JSON.stringify(e));   
				reject(e)
		    }  
		})  
	}).then(res => {
		let msg = {
			code: 0,
			msg: '查询或新增数据库成功',
			data: res
		}
		return msg
	}).catch(error => {
		let msg = {
			code: 200,
			msg: '查询或新增数据库失败',
			data: error
		}
		return msg
	})
}  
// 新增数据
function newAddData (name,sql) {
	return new Promise( (resolve,reject) => {
		plus.sqlite.executeSql({
			name: name,
			sql: sql,
			success(e){
				console.log('成功',e)
				resolve(e)
			},
			fail(e) {
				console.log('错误',e)
				reject(e)
			}
		})
	}).then( res => {
		let msg = {
			code: 0,
			msg: '数据写入数据库成功',
			data: res
		}
		return msg
	}).catch(error => {
		let msg = {
			code: 200,
			msg: '数据写入数据库失败',
			data: error
		}
		return error
	})
}
// 数据库查询
function querySql (name,sql) {
	return new Promise( (resolve,reject) => {
		plus.sqlite.selectSql({
			name: name,
			sql: sql,
			success(e){
				resolve(e)
			},
			fail(e) {
				reject(e)
			}
		})
	}).then( res => {
		let msg = {
			code: 0,
			msg: '数据库查询成功',
			data: res
		}
		return msg
	}).catch(error => {
		let msg = {
			code: 200,
			msg: '数据库查询失败',
			data: error
		}
		return msg
	})
}

// 清空表数据 聊天记录
function clearChatRecord (name,sql) {
	return new Promise( (resolve,reject) => {
		plus.sqlite.selectSql({
			name: 'localStorage',
			sql: 'delete from chatRecord',
			success(e){
				resolve(e)
			},
			fail(e) {
				reject(e)
			}
		})
	}).then( res => {
		let msg = {
			code: 0,
			msg: '聊天记录清空成功',
			data: res
		}
		return msg
	}).catch(error => {
		let msg = {
			code: 200,
			msg: '聊天记录清空失败',
			data: error
		}
		return msg
	})
}
export{  
openComDB,  
executeSQL,
querySql,
newAddData,
clearChatRecord
}
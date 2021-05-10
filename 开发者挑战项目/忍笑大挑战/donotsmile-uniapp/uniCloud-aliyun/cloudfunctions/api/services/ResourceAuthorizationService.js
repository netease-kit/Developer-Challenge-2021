import fs from 'fs'

class ResourceAuthorizationService {

    constructor(ctx) {
        this.PART_DIVIDER_TOKEN = ":"
        this.SUBPART_DIVIDER_TOKEN = ","
        this.authorizerDict = {}
        this._loadAuthorizer()
        return this
    }

    _loadAuthorizer() {
        let files = fs.readdirSync(__dirname + '/authorizers')
        let js_files = files.filter((f) => {
            return f.endsWith('.js') && f != 'ResourceAuthorizer.js'
        }, files);

        for (let f of js_files) {
            console.log(`import authorizer from file ${f}...`);
            let Authorizer = require(__dirname + '/authorizers/' + f).default
            let authorizer = new Authorizer(this.ctx)
            this.authorizerDict[authorizer.RESOURCE_TYPE] = authorizer
        }

    }


    async checkPermission(permissionString) {
        // 如果是管理员，直接返回
        if (this.hasRole('admin')) return

        let parts = permissionString.split(this.PART_DIVIDER_TOKEN)
        if (parts.length != 3) {
            throw new Error('权限字符串错误')
        }

        if(this.authorizerDict[parts[0]]){
            this.authorizerDict[parts[0]].checkPermission(parts[1], parts[2])
        }
        else {
            throw new Error('不支持该资源类型')
        }

    }

    hasRole(role) {
        if(RoleDict[role]){
            // this.ctx.state.user.role 来自 jWT Decode 的结果
            return this.ctx.state.user.role & RoleDict[role] === 1
        }else{
            throw new Error('不支持该角色类型')
        }
    }
}

export default ResourceAuthorizationService
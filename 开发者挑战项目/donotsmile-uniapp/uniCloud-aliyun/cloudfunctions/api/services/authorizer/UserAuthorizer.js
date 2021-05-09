import ResourceAuthorizer from './ResourceAuthorizer'

class UserAuthorizer extends ResourceAuthorizer{
    constructor(ctx){
        super(ctx,'user')
    }

    async checkPermission(operation,resourceId) {
        if(operation === this.WILDCARD_TOKEN||operation === this.UPDATE_TOKEN||operation ===  this.DELETE_TOKEN||operation === this.READ_TOKEN){
            if(this.ctx.state.user.id != resourceId){
                this.ctx.throw(403,ResponseMessage.USER_FORBIDDEN)
            }
        }else{
            throw new Error('不支持该资源操作')
        }
    }
}

export default UserAuthorizer
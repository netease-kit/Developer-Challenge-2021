class ResourceAuthorizer {
    constructor(ctx,type) {
        this.ctx = ctx
        this.RESOURCE_TYPE = type
        this.WILDCARD_TOKEN = "*";
        this.READ_TOKEN = "read";
        this.UPDATE_TOKEN = "update";
        this.DELETE_TOKEN = "delete";
    }

    checkPermission(operation, resourceId) {
        
    }
}
module.exports = ResourceAuthorizer
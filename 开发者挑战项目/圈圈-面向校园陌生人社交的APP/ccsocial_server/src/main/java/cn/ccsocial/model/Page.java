package cn.ccsocial.model;

public class Page {
    /**
     * 查询起始位置
     */
    int startLoaction;
    /**
     * 页面查询数量
     */
    int pageQty ;

    public int getStartLoaction() {
        return startLoaction;
    }

    public void setStartLoaction(int startLoaction) {
        this.startLoaction = startLoaction;
    }
    public int getPageQty () {
        return pageQty;
    }

    public void setPageQty (int pageSQty) {
        this.pageQty = pageQty;
    }

    public Page() {
    }

    public Page(int startLoaction, int pageQty) {
        this.startLoaction = startLoaction;
        this.pageQty = pageQty;
    }
}

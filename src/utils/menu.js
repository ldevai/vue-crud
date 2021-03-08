export default {
    initChildrenAndFilterInactive(node) {
        if (node.children == null) node.children = [];
        var i = node.children.length;
        while(i--) {
            if(!node.children[i].active) {
                node.children.splice(i, 1);
            }
        }
        if (node.children.length > 0) {
            for (let i = 0; i < node.children.length; i++) {
                this.initChildrenAndFilterInactive(node.children[i]);
            }
        }
    }
}
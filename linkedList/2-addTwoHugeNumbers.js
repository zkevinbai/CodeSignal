function addTwoHugeNumbers(a, b) {
    let aValue = getValue(a);
    let bValue = getValue(b);

    return aValue + bValue;
}

function getValue(linkList) {
    let value = "";

    let node = linkList;

    while( node ) {
        let nodeV = toString(node.value);

        while(nodeV.length < 4) {
            nodeV = "0" + nodeV;
        }

        value += nodeV;

        node = node.next;
    }

    return parseInt(value);
}
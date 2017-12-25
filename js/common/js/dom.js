var elementStyle = document.createElement('div').style
var vender = (function() {
    var transformName = {
        webkit: 'webkitTransform',
        O: 'OTransform',
        Moz: 'MozTransform',
        ms: 'msTransform',
        standard: 'transform'
    }
    for (var key in transformName) {
        if (elementStyle[transformName[key]] !== undefined) {
            return key
        }
        return false
    }
})()

function prefixStyle(style) {
    if (vender === false) {
        return
    }
    if (vender === 'standard') {
        return style
    }
    return vender + style.charAt(0).toUpperCase() + style.substr(1)
}
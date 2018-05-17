// 判断 localStorage 是否存在
function storageAvailable(type) {
    try {
        var storage = window[type],
        x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
};
// localStorage 执行函数
//elem 为输入的input，eStorage为localStorage的存储名字
function goStorage(elem, eStorage) { 
	elem.addEventListener("change", function(){
		var thisV = this.value;
		var v = localStorage[eStorage];
		if(v === undefined) {
			localStorage[eStorage] = thisV;
		}else {
			var onlyValue = v.split("|");
			if(onlyValue.length > 0 && onlyValue.indexOf(thisV) == -1) {
				v = thisV + "|" + onlyValue.join("|");
			}else {
				var n = onlyValue.indexOf(thisV);
				onlyValue.splice(n, 1);
				v = thisV + "|" + onlyValue.join("|");
			};
			localStorage[eStorage] = v;
		}
	});
};
// 清除loca 缓存
function clearHistory(ele) {
	localStorage.removeItem(ele);
};
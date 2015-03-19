app.service("common.services.arrayHelper", [function () {
   
    function _removeFromArray(array, item) {
        for (var i = array.length; i--;) {
            if (array[i].Id === item.Id) {
                array.splice(i, 1);
            }
        }
    }

    function _replaceItemInArray(array, itemToReplace) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].Id === itemToReplace.Id) {
                array[i] = itemToReplace;
            }
        }
    }

    function _addItemToArray(array, newItem) {
        array.splice(0, 0, newItem);
    }

    function _isItemInArray(array, item) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].Id === item.Id) {
                return true;
            }
        }
        return false;
    }

    return {
        removeFromArray: _removeFromArray,
        replaceItemInArray: _replaceItemInArray,
        isItemInArray: _isItemInArray,
        addItemToArray: _addItemToArray
    };
}]);
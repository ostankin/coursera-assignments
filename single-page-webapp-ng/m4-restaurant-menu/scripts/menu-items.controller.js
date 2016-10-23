(function () {
'use strict';

angular.module('MenuData')
  .controller('MenuItemsController', MenuItemsController);

MenuItemsController.$inject = ['itemsResponse', 'categoryName'];
function MenuItemsController(itemsResponse, categoryName) {
  this.items = itemsResponse.data.menu_items;
  this.categoryName = categoryName;
}

})();

(function () {
'use strict';

angular.module('MenuData')
  .controller('MenuCategoriesController', MenuCategoriesController);

MenuCategoriesController.$inject = ['categoriesResponse'];
function MenuCategoriesController(categoriesResponse) {
  this.categories = categoriesResponse.data;

}

})();

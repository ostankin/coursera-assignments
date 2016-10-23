(function() {
'use strict';

angular.module('MenuData')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });
    return response;
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    });
  };

}

})();
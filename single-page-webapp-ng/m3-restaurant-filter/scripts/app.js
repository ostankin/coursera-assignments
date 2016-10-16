(function () {

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .directive('itemsLoaderIndicator', ItemsLoaderIndicator);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.categories = {};
  menu.loadingInProgress = false;

  menu.load = function(searchTerm) {
    MenuSearchService.getMatchedMenuItems(menu, searchTerm);
  };

  menu.remove = function(index) {
    menu.categories.splice(index, 1);
  }
}

function FoundItems() {
  return {
    restrict: 'E',
    templateUrl: 'templates/foundItems.html',
    scope: {
      menu: "<foundItems"
    }
  };
}

function ItemsLoaderIndicator() {
  return {
    restrict: 'E',
    templateUrl: 'templates/loadingIndicator.html',
    scope: {
      location: "<"
    }
  };
}


MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  service.menuUrl = 'https://davids-restaurant.herokuapp.com/menu_items.json'

  service.getMatchedMenuItems = function(menuCtrl, searchTerm) {
    if (searchTerm === undefined || searchTerm.length == 0) {
      menuCtrl.categories = new Array();
      return;
    }

    menuCtrl.loadingInProgress = true;
    $http({
      method: "GET",
      url: service.menuUrl
    }).then(function(response) {
      var data = response.data;
      menuCtrl.categories = filterMenu(data.menu_items, searchTerm);
      menuCtrl.loadingInProgress = false;
    }).catch(function(error) {
        console.log(error);
        menuCtrl.loadingInProgress = false;
    });
  };

  function filterMenu(list, searchTerm) {
    var r = new RegExp(searchTerm, "i")
    return list.filter(function(a) {
      var nameMatch = a.name.search(r) != -1
      var descMatch = a.description.search(r) != -1
      return nameMatch || descMatch;
    });
  }
}

})();

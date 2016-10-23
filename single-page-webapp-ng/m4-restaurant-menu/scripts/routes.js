(function () {
'use strict';

angular.module('MenuData')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.template.html'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'templates/menu.template.html',
    controller: 'MenuCategoriesController as ctrl',
    resolve: {
      categoriesResponse: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categories.items', {
    url: '/items/{index}',
    templateUrl: 'templates/items-view.template.html',
    controller: 'MenuItemsController as itemList',
    resolve: {
// Hate the copy-paste, but I couldn't invent a better way to pass category name to the child view.
// Wish I had direct access to the parent state controller, the code would be much more neat.
      itemsResponse: ['$stateParams', 'categoriesResponse', 'MenuDataService',
            function ($stateParams, categoriesResponse, MenuDataService) {
              var index = $stateParams.index;
              var categories = categoriesResponse.data;
              var category = categories[index];
              return MenuDataService.getItemsForCategory(category.short_name);
            }],
      categoryName: ['$stateParams', 'categoriesResponse',
            function($stateParams, categoriesResponse) {
              var index = $stateParams.index;
              var categories = categoriesResponse.data;
              return categories[index].name;
            }]
    }
  });
}

})();

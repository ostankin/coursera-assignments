(function() {
'use strict';

angular.module('MenuData')
  .component('categoriesView', {
    templateUrl: 'templates/categories-view.template.html',
    bindings: {
      categories: '<'
    }
  });

})();

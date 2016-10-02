(function () {

angular.module('LunchCheck', [])
       .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchMenu = "";
  $scope.decision = "";

  $scope.checkLunchMenu = function () {
    var list = splitInput($scope.lunchMenu);
    $scope.decision = makeDecision(list);
    $scope.itemList = list;

    // Split the comma-separated input into an array
    function splitInput(input) {
      var list = input.split(',');
      // trim empty or whitespace-only elements
      list = list.filter( function(n) { return n.trim() != "" });
      return list;
    };

    // Return a message depending on the number of elements
    function makeDecision(list) {
      switch (list.length) {
        case 0:
          return "Please enter data first";
        case 1:
        case 2:
        case 3:
          return "Enjoy!";
          break;
        default:
          return "Too much!"
      }
    };
  };
}

})();

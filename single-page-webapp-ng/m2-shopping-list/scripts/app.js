(function () {

angular.module('ShoppingList', [])
       .controller('ToBuyListController', ToBuyListController)
       .controller('BoughtListController', BoughtListController)
       .service('ShoppingListService', ShoppingListService);

// Check out a great article about inheritance in AngularJS:
// http://blog.mgechev.com/2013/12/18/inheritance-services-controllers-in-angularjs/
ToBuyListController.prototype = Object.create(CheckListController.prototype);
ToBuyListController.$inject = ['ShoppingListService'];
BoughtListController.prototype = Object.create(CheckListController.prototype);
BoughtListController.$inject = ['ShoppingListService'];

function CheckListController(ShoppingListService) {
  var list = this;

  list.isEmpty = function() {
   return list.items.length === 0;
 }

  list.tickItem = function(index) {
    list.itemAction(index);
  }
}

function ToBuyListController(ShoppingListService) {
  CheckListController.call(this, ShoppingListService);

  this.items = ShoppingListService.getShoppingList();

  this.itemAction = function(index) {
    ShoppingListService.buyItem(index);
  }
}

function BoughtListController(ShoppingListService) {
  CheckListController.call(this, ShoppingListService);

  this.items = ShoppingListService.getBoughtList();

  this.itemAction = function(index) {
    ShoppingListService.removeItem(index);
  }
}

function ShoppingListService() {
  var service = this;

  var shoppingList = [
    {name: "beers", quantity: 5},
    {name: "ice creams", quantity: 10},
    {name: "snickers bars", quantity: 15},
    {name: "meatballs", quantity: 23},
    {name: "pieces of mind", quantity: 42},
   ];
   var boughtList = [];

   function MoveItem(sourceList, index, destList) {
     // should be an error check here but I'm too lazy to implement it :)
     var item = sourceList[index];
     sourceList.splice(index, 1);
     destList.push(item);
   }

   service.getShoppingList = function () {
     return shoppingList;
   }

   service.getBoughtList = function () {
     return boughtList;
   }

   service.buyItem = function(index) {
      MoveItem(shoppingList, index, boughtList);
   }

   service.removeItem = function(index) {
     MoveItem(boughtList, index, shoppingList);
   }
}

})();

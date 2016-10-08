(function () {

angular.module('ShoppingList', [])
       .controller('ToBuyListController', ToBuyListController)
       .controller('BoughtListController', BoughtListController)
       .service('ShoppingListService', ShoppingListService);

ToBuyListController.$inject = ['ShoppingListService'];
ToBuyListController.prototype = Object.create(CheckListController.prototype);
BoughtListController.$inject = ['ShoppingListService'];
BoughtListController.prototype = Object.create(CheckListController.prototype);

function CheckListController(ShoppingListService) {
  var list = this;

  list.items = {}; // init this from service later

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
    {name: "Beers", quantity: 5},
    {name: "Ice creams", quantity: 10},
    {name: "Snickers bars", quantity: 15},
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

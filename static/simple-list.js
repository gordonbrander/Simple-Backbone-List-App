/*global
Backbone: true
_: true,
$: true,
List: true
*/

/* Items (model collection)
--------------------------------------------------------------------------- */

var items = window.items = new Backbone.Collection([
  { title: "Go to Gym" },
  { title: "Buy Groceries" },
  { title: "Mow the Lawn" },
  { title: "Pick up Drycleaning" }
]);

/* View
--------------------------------------------------------------------------- */

var List = Backbone.View.extend({
  initialize: function (options) {
    this.collection
      .bind('add', this.addOne, this)
      .bind('remove', this.removeOne, this)
      .bind('reset', this.render, this);
  },

  addOne: function (model) {
    $('<li id="' + model.cid + '" class="item"><span class="title">' + model.get('title') + '</span></li>')
      .hide()
      .appendTo(this.el)
      .slideDown(300);
  },

  removeOne: function (model) {
    this.$('#' + model.cid).slideUp(300, function () {
      $(this).remove();
    });
  },

  render: function () {
    var $el = $(this.el);

    // Empty element
    $el.html('');

    this.collection.each(this.addOne, this);
  }
});

var list = window.list = new List({
  el: $('#items'),
  collection: items
});

list.render();
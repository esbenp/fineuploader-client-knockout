"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KnockoutEngine = (function () {
  function KnockoutEngine(knockout) {
    _classCallCheck(this, KnockoutEngine);

    this.knockout = knockout;
  }

  KnockoutEngine.prototype.render = function render(node) {
    var viewmodel = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return this.knockout.applyBindings(viewmodel, node);
  };

  return KnockoutEngine;
})();

exports.KnockoutEngine = KnockoutEngine;
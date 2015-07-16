System.register([], function (_export) {
  "use strict";

  var KnockoutEngine;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      KnockoutEngine = (function () {
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

      _export("KnockoutEngine", KnockoutEngine);
    }
  };
});
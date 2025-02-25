/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constant.js":
/*!*************************!*\
  !*** ./src/constant.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PAGES: () => (/* binding */ PAGES)
/* harmony export */ });
var PAGES = {
  PRODUCTS: "products",
  CART: "cart"
};

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/constant.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var render = function render(state) {
  renderProducts(state);
  if (state.pages === _constant__WEBPACK_IMPORTED_MODULE_0__.PAGES.CART) {
    renderCart(state);
  } else {
    cartEl.innerHTML = "";
  }
};
var appEl = document.querySelector("#app");
var cartEl = document.querySelector(".cart");
var renderProducts = function renderProducts(state) {
  var totalItems = Object.values(state.cart).reduce(function (sum, qty) {
    return sum + qty;
  }, 0);
  var viewCart = totalItems > 0 ? "View Cart (".concat(totalItems, ")") : "View Cart";
  var hasViewCart = state.pages !== _constant__WEBPACK_IMPORTED_MODULE_0__.PAGES.CART;
  var listhtml = state.products.map(function (product, index) {
    return "\n        <li>\n          <span \n              class=\"product\"\n              data-index=\"".concat(index, "\"\n          >\n          <img src=\"").concat(product.image, "\" alt=\"").concat(product.name, "\">\n            <h3>").concat(product.name, "</h3>\n            <p>$").concat(product.price.toFixed(2), " each</p>\n          </span>\n          <button\n              data-index=\"").concat(index, "\" class=\"add\" type=\"button\">\n              Add to Cart\n          </button>\n      </li>\n      ");
  }).join("");
  appEl.innerHTML = "\n ".concat(hasViewCart ? "<button type=\"button\" class=\"page\" data-target=\"cart\">".concat(viewCart, "</button>") : "", "\n \n\n  <ul class=\"products\">\n    ").concat(listhtml, "\n    </ul>");
};

// Render cart contents
function renderCart(state) {
  cartEl.innerHTML = "\n    <button type=\"button\" class=\"page\" data-target=\"products\">Hide Cart</button>\n    <button type=\"button\" class=\"checkout\" >Checkout</button>\n";
  var cartEntries = Object.entries(state.cart);
  if (cartEntries.length === 0) {
    cartEl.innerHTML += "<p>Nothing in the cart</p>";
    return;
  }
  var totalPrice = 0;
  cartEntries.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      productId = _ref2[0],
      quantity = _ref2[1];
    var product = state.products[productId];
    var itemTotal = product.price * quantity;
    totalPrice += itemTotal;
    if (quantity) {
      var cartItemEl = document.createElement("div");
      cartItemEl.classList.add("cart-item");
      cartItemEl.innerHTML = "\n            <img src=\"http://placehold.co/50x50?text=".concat(product.name, "\" alt=\"").concat(product.name, "\">\n            <p>").concat(product.name, " - $").concat(product.price.toFixed(2), " x ").concat(quantity, " = $").concat(itemTotal.toFixed(2), "</p>\n            <button\n              data-index=\"").concat(productId, "\" class=\"delete\" type=\"button\">\n              -\n          </button>\n            <span>").concat(quantity, "</span>\n            <button\n              data-index=\"").concat(productId, "\" class=\"add\" type=\"button\">\n              +\n          </button>\n        ");
      cartEl.appendChild(cartItemEl);
    }
  });
  var cartTotalEl = document.createElement("p");
  cartTotalEl.classList.add("cart-total");
  cartTotalEl.textContent = "Total: $".concat(totalPrice.toFixed(2));
  cartEl.appendChild(cartTotalEl);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/constant.js");

var state = {
  products: [{
    id: 0,
    name: "Jorts",
    price: 0.99,
    image: "http://placehold.co/150x150?text=Jorts"
  }, {
    id: 1,
    name: "Jean",
    price: 3.14,
    image: "http://placehold.co/150x150?text=Jean"
  }, {
    id: 2,
    name: "Nyancat",
    price: 2.73,
    image: "http://placehold.co/150x150?text=Nyancat"
  }],
  pages: _constant__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCTS,
  cart: {}
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/products.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");


var appEl = document.querySelector("#app");
var cartEl = document.querySelector(".cart");
appEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("product")) {
    var index = e.target.dataset.index;
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return;
  }
  if (e.target.classList.contains("add")) {
    var _index = e.target.dataset.index;
    if (!_state__WEBPACK_IMPORTED_MODULE_1__["default"].cart[_index]) {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].cart[_index] = 1;
    } else {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].cart[_index] += 1;
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return;
  }
  if (e.target.classList.contains("page")) {
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].pages = e.target.dataset.target;
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return;
  }
});
cartEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("page")) {
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].pages = e.target.dataset.target;
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return;
  }
  if (e.target.classList.contains("add")) {
    var index = e.target.dataset.index;
    if (!_state__WEBPACK_IMPORTED_MODULE_1__["default"].cart[index]) {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].cart[index] = 1;
    } else {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].cart[index] += 1;
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return;
  }
  if (e.target.classList.contains("delete")) {
    var _index2 = e.target.dataset.index;
    if (!_state__WEBPACK_IMPORTED_MODULE_1__["default"].cart[_index2]) {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].cart[_index2] = 0;
    } else {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].cart[_index2] -= 1;
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return;
  }
  if (e.target.classList.contains("checkout")) {
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].pages = e.target.dataset.target;
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].cart = {};
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return;
  }
});
(0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
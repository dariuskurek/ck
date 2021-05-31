/*!
 * jQuery UI Widget 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}((function(t){var e,i=0,s=Array.prototype.slice;return t.cleanData=(e=t.cleanData,function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{(s=t._data(n,"events"))&&s.remove&&t(n).triggerHandler("remove")}catch(t){}e(i)}),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0],u=l+"-"+(e=e.split(".")[1]);return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][u.toLowerCase()]=function(e){return!!t.data(e,u)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){if(!this._createWidget)return new o(t,e);arguments.length&&this._createWidget(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),(a=new i).options=t.widget.extend({},a.options),t.each(s,(function(e,s){t.isFunction(s)?r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}():r[e]=s})),o.prototype=t.widget.extend(a,{widgetEventPrefix:n&&a.widgetEventPrefix||e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:u}),n?(t.each(n._childConstructors,(function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)})),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,n,o=s.call(arguments,1),a=0,r=o.length;a<r;a++)for(i in o[a])n=o[a][i],o[a].hasOwnProperty(i)&&void 0!==n&&(t.isPlainObject(n)?e[i]=t.isPlainObject(e[i])?t.widget.extend({},e[i],n):t.widget.extend({},n):e[i]=n);return e},t.widget.bridge=function(e,i){var n=i.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=s.call(arguments,1),l=this;return a?this.length||"instance"!==o?this.each((function(){var i,s=t.data(this,n);return"instance"===o?(l=s,!1):s?t.isFunction(s[o])&&"_"!==o.charAt(0)?(i=s[o].apply(s,r))!==s&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0:t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+o+"'")})):l=void 0:(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each((function(){var e=t.data(this,n);e?(e.option(o||{}),e._init&&e._init()):t.data(this,n,new i(o,this))}))),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,(function(t,i){e._removeClass(i,t)})),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;o<s.length-1;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){var i=[],s=this;function n(n,o){var a,r;for(r=0;r<n.length;r++)a=s.classesElementLookup[n[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),s.classesElementLookup[n[r]]=a,i.push(n[r]),o&&e.classes[n[r]]&&i.push(e.classes[n[r]])}return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&n(e.keys.match(/\S+/g)||[],!0),e.extra&&n(e.extra.match(/\S+/g)||[]),i.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,(function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))}))},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,(function(s,a){function r(){if(e||!0!==o.options.disabled&&!t(this).hasClass("ui-state-disabled"))return("string"==typeof a?o[a]:a).apply(o,arguments)}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),u=l[1]+o.eventNamespace,h=l[2];h?n.on(u,h,r):i.on(u,r)}))},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){var i=this;return setTimeout((function(){return("string"==typeof t?i[t]:t).apply(i,arguments)}),e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},(i=t.Event(i)).type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&!1===a.apply(this.element[0],[i].concat(s))||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},(function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){var a;"string"==typeof n&&(n={effect:n});var r=n?!0===n||"number"==typeof n?i:n.effect||i:e;"number"==typeof(n=n||{})&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue((function(i){t(this)[e](),o&&o.call(s[0]),i()}))}})),t.widget}));;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  var autocomplete;

  function autocompleteSplitValues(value) {
    var result = [];
    var quote = false;
    var current = '';
    var valueLength = value.length;
    var character;

    for (var i = 0; i < valueLength; i++) {
      character = value.charAt(i);

      if (character === '"') {
        current += character;
        quote = !quote;
      } else if (character === ',' && !quote) {
        result.push(current.trim());
        current = '';
      } else {
        current += character;
      }
    }

    if (value.length > 0) {
      result.push($.trim(current));
    }

    return result;
  }

  function extractLastTerm(terms) {
    return autocomplete.splitValues(terms).pop();
  }

  function searchHandler(event) {
    var options = autocomplete.options;

    if (options.isComposing) {
      return false;
    }

    var term = autocomplete.extractLastTerm(event.target.value);

    if (term.length > 0 && options.firstCharacterBlacklist.indexOf(term[0]) !== -1) {
      return false;
    }

    return term.length >= options.minLength;
  }

  function sourceData(request, response) {
    var elementId = this.element.attr('id');

    if (!(elementId in autocomplete.cache)) {
      autocomplete.cache[elementId] = {};
    }

    function showSuggestions(suggestions) {
      var tagged = autocomplete.splitValues(request.term);
      var il = tagged.length;

      for (var i = 0; i < il; i++) {
        var index = suggestions.indexOf(tagged[i]);

        if (index >= 0) {
          suggestions.splice(index, 1);
        }
      }

      response(suggestions);
    }

    var term = autocomplete.extractLastTerm(request.term);

    function sourceCallbackHandler(data) {
      autocomplete.cache[elementId][term] = data;
      showSuggestions(data);
    }

    if (autocomplete.cache[elementId].hasOwnProperty(term)) {
      showSuggestions(autocomplete.cache[elementId][term]);
    } else {
      var options = $.extend({
        success: sourceCallbackHandler,
        data: {
          q: term
        }
      }, autocomplete.ajax);
      $.ajax(this.element.attr('data-autocomplete-path'), options);
    }
  }

  function focusHandler() {
    return false;
  }

  function selectHandler(event, ui) {
    var terms = autocomplete.splitValues(event.target.value);
    terms.pop();
    terms.push(ui.item.value);
    event.target.value = terms.join(', ');
    return false;
  }

  function renderItem(ul, item) {
    return $('<li>').append($('<a>').html(item.label)).appendTo(ul);
  }

  Drupal.behaviors.autocomplete = {
    attach: function attach(context) {
      var $autocomplete = $(context).find('input.form-autocomplete').once('autocomplete');

      if ($autocomplete.length) {
        var blacklist = $autocomplete.attr('data-autocomplete-first-character-blacklist');
        $.extend(autocomplete.options, {
          firstCharacterBlacklist: blacklist || ''
        });
        $autocomplete.autocomplete(autocomplete.options).each(function () {
          $(this).data('ui-autocomplete')._renderItem = autocomplete.options.renderItem;
        });
        $autocomplete.on('compositionstart.autocomplete', function () {
          autocomplete.options.isComposing = true;
        });
        $autocomplete.on('compositionend.autocomplete', function () {
          autocomplete.options.isComposing = false;
        });
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        $(context).find('input.form-autocomplete').removeOnce('autocomplete').autocomplete('destroy');
      }
    }
  };
  autocomplete = {
    cache: {},
    splitValues: autocompleteSplitValues,
    extractLastTerm: extractLastTerm,
    options: {
      source: sourceData,
      focus: focusHandler,
      search: searchHandler,
      select: selectHandler,
      renderItem: renderItem,
      minLength: 1,
      firstCharacterBlacklist: '',
      isComposing: false
    },
    ajax: {
      dataType: 'json',
      jsonp: false
    }
  };
  Drupal.autocomplete = autocomplete;
})(jQuery, Drupal);;
/*! UIkit 3.1.6 | http://www.getuikit.com | (c) 2014 - 2018 YOOtheme | MIT License */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("uikit",e):(t=t||self).UIkit=e()}(this,function(){"use strict";function f(i,n){return function(t){var e=arguments.length;return e?1<e?i.apply(n,arguments):i.call(n,t):i.call(n)}}var e=Object.prototype,i=e.hasOwnProperty;function c(t,e){return i.call(t,e)}var n={},r=/([a-z\d])([A-Z])/g;function d(t){return t in n||(n[t]=t.replace(r,"$1-$2").toLowerCase()),n[t]}var o=/-(\w)/g;function p(t){return t.replace(o,s)}function s(t,e){return e?e.toUpperCase():""}function m(t){return t.length?s(0,t.charAt(0))+t.slice(1):""}var t=String.prototype,a=t.startsWith||function(t){return 0===this.lastIndexOf(t,0)};function w(t,e){return a.call(t,e)}var h=t.endsWith||function(t){return this.substr(-t.length)===t};function l(t,e){return h.call(t,e)}function u(t,e){return~this.indexOf(t,e)}var g=Array.prototype,v=t.includes||u,b=g.includes||u;function y(t,e){return t&&(D(t)?v:b).call(t,e)}var x=g.findIndex||function(t){for(var e=arguments,i=0;i<this.length;i++)if(t.call(e[1],this[i],i,this))return i;return-1};function k(t,e){return x.call(t,e)}var $=Array.isArray;function I(t){return"function"==typeof t}function S(t){return null!==t&&"object"==typeof t}function T(t){return S(t)&&Object.getPrototypeOf(t)===e}function E(t){return S(t)&&t===t.window}function A(t){return S(t)&&9===t.nodeType}function C(t){return S(t)&&!!t.jquery}function _(t){return t instanceof Node||S(t)&&1<=t.nodeType}var N=e.toString;function M(t){return N.call(t).match(/^\[object (NodeList|HTMLCollection)\]$/)}function O(t){return"boolean"==typeof t}function D(t){return"string"==typeof t}function z(t){return"number"==typeof t}function B(t){return z(t)||D(t)&&!isNaN(t-parseFloat(t))}function P(t){return!($(t)?t.length:S(t)&&Object.keys(t).length)}function H(t){return void 0===t}function L(t){return O(t)?t:"true"===t||"1"===t||""===t||"false"!==t&&"0"!==t&&t}function F(t){var e=Number(t);return!isNaN(e)&&e}function j(t){return parseFloat(t)||0}function W(t){return _(t)||E(t)||A(t)?t:M(t)||C(t)?t[0]:$(t)?W(t[0]):null}function V(t){return _(t)?[t]:M(t)?g.slice.call(t):$(t)?t.map(W).filter(Boolean):C(t)?t.toArray():[]}function Y(t){return $(t)?t:D(t)?t.split(/,(?![^(]*\))/).map(function(t){return B(t)?F(t):L(t.trim())}):[t]}function R(t){return t?l(t,"ms")?j(t):1e3*j(t):0}function q(t,i){return t===i||S(t)&&S(i)&&Object.keys(t).length===Object.keys(i).length&&K(t,function(t,e){return t===i[e]})}function U(t,e,i){return t.replace(new RegExp(e+"|"+i,"mg"),function(t){return t===e?i:e})}var X=Object.assign||function(t){for(var e=[],i=arguments.length-1;0<i--;)e[i]=arguments[i+1];t=Object(t);for(var n=0;n<e.length;n++){var r=e[n];if(null!==r)for(var o in r)c(r,o)&&(t[o]=r[o])}return t};function K(t,e){for(var i in t)if(!1===e(t[i],i))return!1;return!0}function G(t,r){return t.sort(function(t,e){var i=t[r];void 0===i&&(i=0);var n=e[r];return void 0===n&&(n=0),n<i?1:i<n?-1:0})}function J(t,i){var n=new Set;return t.filter(function(t){var e=t[i];return!n.has(e)&&(n.add(e)||!0)})}function Z(t,e,i){return void 0===e&&(e=0),void 0===i&&(i=1),Math.min(Math.max(F(t)||0,e),i)}function Q(){}function tt(t,e){return t.left<e.right&&t.right>e.left&&t.top<e.bottom&&t.bottom>e.top}function et(t,e){return t.x<=e.right&&t.x>=e.left&&t.y<=e.bottom&&t.y>=e.top}var it={ratio:function(t,e,i){var n,r="width"===e?"height":"width";return(n={})[r]=t[e]?Math.round(i*t[r]/t[e]):t[r],n[e]=i,n},contain:function(i,n){var r=this;return K(i=X({},i),function(t,e){return i=i[e]>n[e]?r.ratio(i,e,n[e]):i}),i},cover:function(i,n){var r=this;return K(i=this.contain(i,n),function(t,e){return i=i[e]<n[e]?r.ratio(i,e,n[e]):i}),i}};function nt(t,e,i){if(S(e))for(var n in e)nt(t,n,e[n]);else{if(H(i))return(t=W(t))&&t.getAttribute(e);V(t).forEach(function(t){I(i)&&(i=i.call(t,nt(t,e))),null===i?ot(t,e):t.setAttribute(e,i)})}}function rt(t,e){return V(t).some(function(t){return t.hasAttribute(e)})}function ot(t,e){t=V(t),e.split(" ").forEach(function(e){return t.forEach(function(t){return t.hasAttribute(e)&&t.removeAttribute(e)})})}function st(t,e){for(var i=0,n=[e,"data-"+e];i<n.length;i++)if(rt(t,n[i]))return nt(t,n[i])}function at(t,e){return W(t)||lt(t,ct(t,e))}function ht(t,e){var i=V(t);return i.length&&i||ut(t,ct(t,e))}function ct(t,e){return void 0===e&&(e=document),mt(t)||A(e)?e:e.ownerDocument}function lt(t,e){return W(dt(t,e,"querySelector"))}function ut(t,e){return V(dt(t,e,"querySelectorAll"))}function dt(t,s,e){if(void 0===s&&(s=document),!t||!D(t))return null;var a;mt(t=t.replace(pt,"$1 *"))&&(a=[],t=t.match(gt).map(function(t){return t.replace(/,$/,"").trim()}).map(function(t,e){var i=s;if("!"===t[0]){var n=t.substr(1).trim().split(" ");i=xt(s.parentNode,n[0]),t=n.slice(1).join(" ").trim()}if("-"===t[0]){var r=t.substr(1).trim().split(" "),o=(i||s).previousElementSibling;i=bt(o,t.substr(1))?o:null,t=r.slice(1).join(" ")}return i?(i.id||(i.id="uk-"+Date.now()+e,a.push(function(){return ot(i,"id")})),"#"+It(i.id)+" "+t):null}).filter(Boolean).join(","),s=document);try{return s[e](t)}catch(t){return null}finally{a&&a.forEach(function(t){return t()})}}var ft=/(^|[^\\],)\s*[!>+~-]/,pt=/([!>+~-])(?=\s+[!>+~-]|\s*$)/g;function mt(t){return D(t)&&t.match(ft)}var gt=/.*?[^\\](?:,|$)/g;var vt=Element.prototype,wt=vt.matches||vt.webkitMatchesSelector||vt.msMatchesSelector;function bt(t,e){return V(t).some(function(t){return wt.call(t,e)})}var yt=vt.closest||function(t){var e=this;do{if(bt(e,t))return e;e=e.parentNode}while(e&&1===e.nodeType)};function xt(t,e){return w(e,">")&&(e=e.slice(1)),_(t)?t.parentNode&&yt.call(t,e):V(t).map(function(t){return xt(t,e)}).filter(Boolean)}function kt(t,e){for(var i=[],n=W(t).parentNode;n&&1===n.nodeType;)bt(n,e)&&i.push(n),n=n.parentNode;return i}var $t=window.CSS&&CSS.escape||function(t){return t.replace(/([^\x7f-\uFFFF\w-])/g,function(t){return"\\"+t})};function It(t){return D(t)?$t.call(null,t):""}var St={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function Tt(t){return V(t).some(function(t){return St[t.tagName.toLowerCase()]})}function Et(t){return V(t).some(function(t){return t.offsetWidth||t.offsetHeight||t.getClientRects().length})}var At="input,select,textarea,button";function Ct(t){return V(t).some(function(t){return bt(t,At)})}function _t(t,e){return V(t).filter(function(t){return bt(t,e)})}function Nt(t,e){return D(e)?bt(t,e)||xt(t,e):t===e||(A(e)?e.documentElement:W(e)).contains(W(t))}function Mt(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var i,n=Pt(t),r=n[0],o=n[1],s=n[2],a=n[3],h=n[4];return r=Ft(r),s&&(a=function(t,n,r){var o=this;return function(i){t.forEach(function(t){var e=">"===n[0]?ut(n,t).reverse().filter(function(t){return Nt(i.target,t)})[0]:xt(i.target,n);e&&(i.delegate=t,i.current=e,r.call(o,i))})}}(r,s,a)),1<a.length&&(i=a,a=function(t){return $(t.detail)?i.apply(void 0,[t].concat(t.detail)):i(t)}),o.split(" ").forEach(function(e){return r.forEach(function(t){return t.addEventListener(e,a,h)})}),function(){return Ot(r,o,a,h)}}function Ot(t,e,i,n){void 0===n&&(n=!1),t=Ft(t),e.split(" ").forEach(function(e){return t.forEach(function(t){return t.removeEventListener(e,i,n)})})}function Dt(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var i=Pt(t),n=i[0],r=i[1],o=i[2],s=i[3],a=i[4],h=i[5],c=Mt(n,r,o,function(t){var e=!h||h(t);e&&(c(),s(t,e))},a);return c}function zt(t,i,n){return Ft(t).reduce(function(t,e){return t&&e.dispatchEvent(Bt(i,!0,!0,n))},!0)}function Bt(t,e,i,n){if(void 0===e&&(e=!0),void 0===i&&(i=!1),D(t)){var r=document.createEvent("CustomEvent");r.initCustomEvent(t,e,i,n),t=r}return t}function Pt(t){return I(t[2])&&t.splice(2,0,!1),t}function Ht(t){return t&&"addEventListener"in t}function Lt(t){return Ht(t)?t:W(t)}function Ft(t){return $(t)?t.map(Lt).filter(Boolean):D(t)?ut(t):Ht(t)?[t]:V(t)}function jt(t){return"touch"===t.pointerType||t.touches}function Wt(t,e){void 0===e&&(e="client");var i=t.touches,n=t.changedTouches,r=i&&i[0]||n&&n[0]||t;return{x:r[e+"X"],y:r[e+"Y"]}}function Vt(){var i=this;this.promise=new Yt(function(t,e){i.reject=e,i.resolve=t})}var Yt="Promise"in window?window.Promise:Ut,Rt=2,qt="setImmediate"in window?setImmediate:setTimeout;function Ut(t){this.state=Rt,this.value=void 0,this.deferred=[];var e=this;try{t(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(t){e.reject(t)}}Ut.reject=function(i){return new Ut(function(t,e){e(i)})},Ut.resolve=function(i){return new Ut(function(t,e){t(i)})},Ut.all=function(s){return new Ut(function(i,t){var n=[],r=0;function e(e){return function(t){n[e]=t,(r+=1)===s.length&&i(n)}}0===s.length&&i(n);for(var o=0;o<s.length;o+=1)Ut.resolve(s[o]).then(e(o),t)})},Ut.race=function(n){return new Ut(function(t,e){for(var i=0;i<n.length;i+=1)Ut.resolve(n[i]).then(t,e)})};var Xt=Ut.prototype;function Kt(s,a){return new Yt(function(t,e){var i=X({data:null,method:"GET",headers:{},xhr:new XMLHttpRequest,beforeSend:Q,responseType:""},a);i.beforeSend(i);var n=i.xhr;for(var r in i)if(r in n)try{n[r]=i[r]}catch(t){}for(var o in n.open(i.method.toUpperCase(),s),i.headers)n.setRequestHeader(o,i.headers[o]);Mt(n,"load",function(){0===n.status||200<=n.status&&n.status<300||304===n.status?t(n):e(X(Error(n.statusText),{xhr:n,status:n.status}))}),Mt(n,"error",function(){return e(X(Error("Network Error"),{xhr:n}))}),Mt(n,"timeout",function(){return e(X(Error("Network Timeout"),{xhr:n}))}),n.send(i.data)})}function Gt(n,r,o){return new Yt(function(t,e){var i=new Image;i.onerror=e,i.onload=function(){return t(i)},o&&(i.sizes=o),r&&(i.srcset=r),i.src=n})}Xt.resolve=function(t){var e=this;if(e.state===Rt){if(t===e)throw new TypeError("Promise settled with itself.");var i=!1;try{var n=t&&t.then;if(null!==t&&S(t)&&I(n))return void n.call(t,function(t){i||e.resolve(t),i=!0},function(t){i||e.reject(t),i=!0})}catch(t){return void(i||e.reject(t))}e.state=0,e.value=t,e.notify()}},Xt.reject=function(t){var e=this;if(e.state===Rt){if(t===e)throw new TypeError("Promise settled with itself.");e.state=1,e.value=t,e.notify()}},Xt.notify=function(){var o=this;qt(function(){if(o.state!==Rt)for(;o.deferred.length;){var t=o.deferred.shift(),e=t[0],i=t[1],n=t[2],r=t[3];try{0===o.state?I(e)?n(e.call(void 0,o.value)):n(o.value):1===o.state&&(I(i)?n(i.call(void 0,o.value)):r(o.value))}catch(t){r(t)}}})},Xt.then=function(i,n){var r=this;return new Ut(function(t,e){r.deferred.push([i,n,t,e]),r.notify()})},Xt.catch=function(t){return this.then(void 0,t)};var Jt=/msie|trident/i.test(window.navigator.userAgent),Zt="rtl"===nt(document.documentElement,"dir"),Qt="ontouchstart"in window,te=window.PointerEvent,ee=Qt||window.DocumentTouch&&document instanceof DocumentTouch||navigator.maxTouchPoints,ie=te?"pointerdown":Qt?"touchstart":"mousedown",ne=te?"pointermove":Qt?"touchmove":"mousemove",re=te?"pointerup":Qt?"touchend":"mouseup",oe=te?"pointerenter":Qt?"":"mouseenter",se=te?"pointerleave":Qt?"":"mouseleave",ae=te?"pointercancel":"touchcancel";function he(t){if("loading"===document.readyState)var e=Mt(document,"DOMContentLoaded",function(){e(),t()});else t()}function ce(t,e){return e?V(t).indexOf(W(e)):V((t=W(t))&&t.parentNode.children).indexOf(t)}function le(t,e,i,n){void 0===i&&(i=0),void 0===n&&(n=!1);var r=(e=V(e)).length;return t=B(t)?F(t):"next"===t?i+1:"previous"===t?i-1:ce(e,t),n?Z(t,0,r-1):(t%=r)<0?t+r:t}function ue(t){return(t=Se(t)).innerHTML="",t}function de(t,e){return t=Se(t),H(e)?t.innerHTML:fe(t.hasChildNodes()?ue(t):t,e)}function fe(e,t){return e=Se(e),ge(t,function(t){return e.appendChild(t)})}function pe(e,t){return e=Se(e),ge(t,function(t){return e.parentNode.insertBefore(t,e)})}function me(e,t){return e=Se(e),ge(t,function(t){return e.nextSibling?pe(e.nextSibling,t):fe(e.parentNode,t)})}function ge(t,e){return(t=D(t)?$e(t):t)?"length"in t?V(t).map(e):e(t):null}function ve(t){V(t).map(function(t){return t.parentNode&&t.parentNode.removeChild(t)})}function we(t,e){for(e=W(pe(t,e));e.firstChild;)e=e.firstChild;return fe(e,t),e}function be(t,e){return V(V(t).map(function(t){return t.hasChildNodes?we(V(t.childNodes),e):fe(t,e)}))}function ye(t){V(t).map(function(t){return t.parentNode}).filter(function(t,e,i){return i.indexOf(t)===e}).forEach(function(t){pe(t,t.childNodes),ve(t)})}var xe=/^\s*<(\w+|!)[^>]*>/,ke=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;function $e(t){var e=ke.exec(t);if(e)return document.createElement(e[1]);var i=document.createElement("div");return xe.test(t)?i.insertAdjacentHTML("beforeend",t.trim()):i.textContent=t,1<i.childNodes.length?V(i.childNodes):i.firstChild}function Ie(t,e){if(t&&1===t.nodeType)for(e(t),t=t.firstElementChild;t;)Ie(t,e),t=t.nextElementSibling}function Se(t,e){return D(t)?Ee(t)?W($e(t)):lt(t,e):W(t)}function Te(t,e){return D(t)?Ee(t)?V($e(t)):ut(t,e):V(t)}function Ee(t){return"<"===t[0]||t.match(/^\s*</)}function Ae(t){for(var e=[],i=arguments.length-1;0<i--;)e[i]=arguments[i+1];De(t,e,"add")}function Ce(t){for(var e=[],i=arguments.length-1;0<i--;)e[i]=arguments[i+1];De(t,e,"remove")}function _e(t,e){nt(t,"class",function(t){return(t||"").replace(new RegExp("\\b"+e+"\\b","g"),"")})}function Ne(t){for(var e=[],i=arguments.length-1;0<i--;)e[i]=arguments[i+1];e[0]&&Ce(t,e[0]),e[1]&&Ae(t,e[1])}function Me(t,e){return e&&V(t).some(function(t){return t.classList.contains(e.split(" ")[0])})}function Oe(t){for(var n=[],e=arguments.length-1;0<e--;)n[e]=arguments[e+1];if(n.length){var r=D((n=ze(n))[n.length-1])?[]:n.pop();n=n.filter(Boolean),V(t).forEach(function(t){for(var e=t.classList,i=0;i<n.length;i++)Be.Force?e.toggle.apply(e,[n[i]].concat(r)):e[(H(r)?!e.contains(n[i]):r)?"add":"remove"](n[i])})}}function De(t,i,n){(i=ze(i).filter(Boolean)).length&&V(t).forEach(function(t){var e=t.classList;Be.Multiple?e[n].apply(e,i):i.forEach(function(t){return e[n](t)})})}function ze(t){return t.reduce(function(t,e){return t.concat.call(t,D(e)&&y(e," ")?e.trim().split(" "):e)},[])}var Be={get Multiple(){return this.get("_multiple")},get Force(){return this.get("_force")},get:function(t){if(!c(this,t)){var e=document.createElement("_").classList;e.add("a","b"),e.toggle("c",!1),this._multiple=e.contains("b"),this._force=!e.contains("c")}return this[t]}},Pe={"animation-iteration-count":!0,"column-count":!0,"fill-opacity":!0,"flex-grow":!0,"flex-shrink":!0,"font-weight":!0,"line-height":!0,opacity:!0,order:!0,orphans:!0,"stroke-dasharray":!0,"stroke-dashoffset":!0,widows:!0,"z-index":!0,zoom:!0};function He(t,e,r){return V(t).map(function(i){if(D(e)){if(e=Ye(e),H(r))return Fe(i,e);r||z(r)?i.style[e]=B(r)&&!Pe[e]?r+"px":r:i.style.removeProperty(e)}else{if($(e)){var n=Le(i);return e.reduce(function(t,e){return t[e]=n[Ye(e)],t},{})}S(e)&&K(e,function(t,e){return He(i,e,t)})}return i})[0]}function Le(t,e){return(t=W(t)).ownerDocument.defaultView.getComputedStyle(t,e)}function Fe(t,e,i){return Le(t,i)[e]}var je={};function We(t){var e=document.documentElement;if(!Jt)return Le(e).getPropertyValue("--uk-"+t);if(!(t in je)){var i=fe(e,document.createElement("div"));Ae(i,"uk-"+t),je[t]=Fe(i,"content",":before").replace(/^["'](.*)["']$/,"$1"),ve(i)}return je[t]}var Ve={};function Ye(t){var e=Ve[t];return e=e||(Ve[t]=function(t){t=d(t);var e=document.documentElement.style;if(t in e)return t;var i,n=Re.length;for(;n--;)if((i="-"+Re[n]+"-"+t)in e)return i}(t)||t)}var Re=["webkit","moz","ms"];function qe(t,s,a,h){return void 0===a&&(a=400),void 0===h&&(h="linear"),Yt.all(V(t).map(function(o){return new Yt(function(i,n){for(var t in s){var e=He(o,t);""===e&&He(o,t,e)}var r=setTimeout(function(){return zt(o,"transitionend")},a);Dt(o,"transitionend transitioncanceled",function(t){var e=t.type;clearTimeout(r),Ce(o,"uk-transition"),He(o,{"transition-property":"","transition-duration":"","transition-timing-function":""}),"transitioncanceled"===e?n():i()},!1,function(t){var e=t.target;return o===e}),Ae(o,"uk-transition"),He(o,X({"transition-property":Object.keys(s).map(Ye).join(","),"transition-duration":a+"ms","transition-timing-function":h},s))})}))}var Ue={start:qe,stop:function(t){return zt(t,"transitionend"),Yt.resolve()},cancel:function(t){zt(t,"transitioncanceled")},inProgress:function(t){return Me(t,"uk-transition")}},Xe="uk-animation-",Ke="uk-cancel-animation";function Ge(t,e,i,a,h){var c=arguments;return void 0===i&&(i=200),Yt.all(V(t).map(function(s){return new Yt(function(n,r){if(Me(s,Ke))requestAnimationFrame(function(){return Yt.resolve().then(function(){return Ge.apply(void 0,c).then(n,r)})});else{var t=e+" "+Xe+(h?"leave":"enter");w(e,Xe)&&(a&&(t+=" uk-transform-origin-"+a),h&&(t+=" "+Xe+"reverse")),o(),Dt(s,"animationend animationcancel",function(t){var e=t.type,i=!1;"animationcancel"===e?(r(),o()):(n(),Yt.resolve().then(function(){i=!0,o()})),requestAnimationFrame(function(){i||(Ae(s,Ke),requestAnimationFrame(function(){return Ce(s,Ke)}))})},!1,function(t){var e=t.target;return s===e}),He(s,"animationDuration",i+"ms"),Ae(s,t)}function o(){He(s,"animationDuration",""),_e(s,Xe+"\\S*")}})}))}var Je=new RegExp(Xe+"(enter|leave)"),Ze={in:function(t,e,i,n){return Ge(t,e,i,n,!1)},out:function(t,e,i,n){return Ge(t,e,i,n,!0)},inProgress:function(t){return Je.test(nt(t,"class"))},cancel:function(t){zt(t,"animationcancel")}},Qe={width:["x","left","right"],height:["y","top","bottom"]};function ti(t,e,l,u,d,i,n,r){l=ci(l),u=ci(u);var f={element:l,target:u};if(!t||!e)return f;var p=ii(t),m=ii(e),g=m;if(hi(g,l,p,-1),hi(g,u,m,1),d=li(d,p.width,p.height),i=li(i,m.width,m.height),d.x+=i.x,d.y+=i.y,g.left+=d.x,g.top+=d.y,n){var o=[ii(wi(t))];r&&o.unshift(ii(r)),K(Qe,function(t,s){var a=t[0],h=t[1],c=t[2];!0!==n&&!y(n,a)||o.some(function(n){var t=l[a]===h?-p[s]:l[a]===c?p[s]:0,e=u[a]===h?m[s]:u[a]===c?-m[s]:0;if(g[h]<n[h]||g[h]+p[s]>n[c]){var i=p[s]/2,r="center"===u[a]?-m[s]/2:0;return"center"===l[a]&&(o(i,r)||o(-i,-r))||o(t,e)}function o(e,t){var i=g[h]+e+t-2*d[a];if(i>=n[h]&&i+p[s]<=n[c])return g[h]=i,["element","target"].forEach(function(t){f[t][a]=e?f[t][a]===Qe[s][1]?Qe[s][2]:Qe[s][1]:f[t][a]}),!0}})})}return ei(t,g),f}function ei(i,n){if(i=W(i),!n)return ii(i);var r=ei(i),o=He(i,"position");["left","top"].forEach(function(t){if(t in n){var e=He(i,t);He(i,t,n[t]-r[t]+j("absolute"===o&&"auto"===e?ni(i)[t]:e))}})}function ii(t){var e,i,n=wi(t=W(t)),r=n.pageYOffset,o=n.pageXOffset;if(E(t)){var s=t.innerHeight,a=t.innerWidth;return{top:r,left:o,height:s,width:a,bottom:r+s,right:o+a}}Et(t)||"none"!==He(t,"display")||(e=nt(t,"style"),i=nt(t,"hidden"),nt(t,{style:(e||"")+";display:block !important;",hidden:null}));var h=t.getBoundingClientRect();return H(e)||nt(t,{style:e,hidden:i}),{height:h.height,width:h.width,top:h.top+r,left:h.left+o,bottom:h.bottom+r,right:h.right+o}}function ni(n){var r=(n=W(n)).offsetParent||bi(n).documentElement,o=ei(r),t=["top","left"].reduce(function(t,e){var i=m(e);return t[e]-=o[e]+j(He(n,"margin"+i))+j(He(r,"border"+i+"Width")),t},ei(n));return{top:t.top,left:t.left}}var ri=si("height"),oi=si("width");function si(n){var r=m(n);return function(t,e){if(t=W(t),H(e)){if(E(t))return t["inner"+r];if(A(t)){var i=t.documentElement;return Math.max(i["offset"+r],i["scroll"+r])}return(e="auto"===(e=He(t,n))?t["offset"+r]:j(e)||0)-ai(n,t)}He(t,n,e||0===e?+e+ai(n,t)+"px":"")}}function ai(t,i,e){return void 0===e&&(e="border-box"),He(i,"boxSizing")===e?Qe[t].slice(1).map(m).reduce(function(t,e){return t+j(He(i,"padding"+e))+j(He(i,"border"+e+"Width"))},0):0}function hi(o,s,a,h){K(Qe,function(t,e){var i=t[0],n=t[1],r=t[2];s[i]===r?o[n]+=a[e]*h:"center"===s[i]&&(o[n]+=a[e]*h/2)})}function ci(t){var e=/left|center|right/,i=/top|center|bottom/;return 1===(t=(t||"").split(" ")).length&&(t=e.test(t[0])?t.concat(["center"]):i.test(t[0])?["center"].concat(t):["center","center"]),{x:e.test(t[0])?t[0]:"center",y:i.test(t[1])?t[1]:"center"}}function li(t,e,i){var n=(t||"").split(" "),r=n[0],o=n[1];return{x:r?j(r)*(l(r,"%")?e/100:1):0,y:o?j(o)*(l(o,"%")?i/100:1):0}}function ui(t){switch(t){case"left":return"right";case"right":return"left";case"top":return"bottom";case"bottom":return"top";default:return t}}function di(t,e,i){if(void 0===e&&(e=0),void 0===i&&(i=0),!Et(t))return!1;var n=wi(t=W(t)),r=t.getBoundingClientRect(),o={top:-e,left:-i,bottom:e+ri(n),right:i+oi(n)};return tt(r,o)||et({x:r.left,y:r.top},o)}function fi(t,e){if(void 0===e&&(e=0),!Et(t))return 0;var i=wi(t=W(t)),n=bi(t),r=t.offsetHeight+e,o=mi(t)[0],s=ri(i),a=s+Math.min(0,o-s),h=Math.max(0,s-(ri(n)+e-(o+r)));return Z((a+i.pageYOffset-o)/((a+(r-(h<s?h:0)))/100)/100)}function pi(t,e){if(E(t=W(t))||A(t)){var i=wi(t);(0,i.scrollTo)(i.pageXOffset,e)}else t.scrollTop=e}function mi(t){var e=[0,0];do{if(e[0]+=t.offsetTop,e[1]+=t.offsetLeft,"fixed"===He(t,"position")){var i=wi(t);return e[0]+=i.pageYOffset,e[1]+=i.pageXOffset,e}}while(t=t.offsetParent);return e}function gi(t,e,i){return void 0===e&&(e="width"),void 0===i&&(i=window),B(t)?+t:l(t,"vh")?vi(ri(wi(i)),t):l(t,"vw")?vi(oi(wi(i)),t):l(t,"%")?vi(ii(i)[e],t):j(t)}function vi(t,e){return t*j(e)/100}function wi(t){return E(t)?t:bi(t).defaultView}function bi(t){return W(t).ownerDocument}var yi={reads:[],writes:[],read:function(t){return this.reads.push(t),ki(),t},write:function(t){return this.writes.push(t),ki(),t},clear:function(t){return Ii(this.reads,t)||Ii(this.writes,t)},flush:xi};function xi(){$i(yi.reads),$i(yi.writes.splice(0,yi.writes.length)),yi.scheduled=!1,(yi.reads.length||yi.writes.length)&&ki(!0)}function ki(t){void 0===t&&(t=!1),yi.scheduled||(yi.scheduled=!0,t?Yt.resolve().then(xi):requestAnimationFrame(xi))}function $i(t){for(var e;e=t.shift();)e()}function Ii(t,e){var i=t.indexOf(e);return!!~i&&!!t.splice(i,1)}function Si(){}function Ti(t,e){return(e.y-t.y)/(e.x-t.x)}Si.prototype={positions:[],position:null,init:function(){var n=this;this.positions=[],this.position=null;var r=!1;this.unbind=Mt(document,"mousemove",function(i){r||(setTimeout(function(){var t=Date.now(),e=n.positions.length;e&&100<t-n.positions[e-1].time&&n.positions.splice(0,e),n.positions.push({time:t,x:i.pageX,y:i.pageY}),5<n.positions.length&&n.positions.shift(),r=!1},5),r=!0)})},cancel:function(){this.unbind&&this.unbind()},movesTo:function(t){if(this.positions.length<2)return!1;var e=ei(t),i=this.positions[this.positions.length-1],n=this.positions[0];if(e.left<=i.x&&i.x<=e.right&&e.top<=i.y&&i.y<=e.bottom)return!1;var r=[[{x:e.left,y:e.top},{x:e.right,y:e.bottom}],[{x:e.right,y:e.top},{x:e.left,y:e.bottom}]];return e.right<=i.x||(e.left>=i.x?(r[0].reverse(),r[1].reverse()):e.bottom<=i.y?r[0].reverse():e.top>=i.y&&r[1].reverse()),!!r.reduce(function(t,e){return t+(Ti(n,e[0])<Ti(i,e[0])&&Ti(n,e[1])>Ti(i,e[1]))},0)}};var Ei={};function Ai(t,e,i){return Ei.computed(I(t)?t.call(i,i):t,I(e)?e.call(i,i):e)}function Ci(t,e){return t=t&&!$(t)?[t]:t,e?t?t.concat(e):$(e)?e:[e]:t}function _i(e,i,n){var r={};if(I(i)&&(i=i.options),i.extends&&(e=_i(e,i.extends,n)),i.mixins)for(var t=0,o=i.mixins.length;t<o;t++)e=_i(e,i.mixins[t],n);for(var s in e)h(s);for(var a in i)c(e,a)||h(a);function h(t){r[t]=(Ei[t]||function(t,e){return H(e)?t:e})(e[t],i[t],n)}return r}function Ni(t,e){var i;void 0===e&&(e=[]);try{return t?w(t,"{")?JSON.parse(t):e.length&&!y(t,":")?((i={})[e[0]]=t,i):t.split(";").reduce(function(t,e){var i=e.split(/:(.*)/),n=i[0],r=i[1];return n&&!H(r)&&(t[n.trim()]=r.trim()),t},{}):{}}catch(t){return{}}}Ei.events=Ei.created=Ei.beforeConnect=Ei.connected=Ei.beforeDisconnect=Ei.disconnected=Ei.destroy=Ci,Ei.args=function(t,e){return!1!==e&&Ci(e||t)},Ei.update=function(t,e){return G(Ci(t,I(e)?{read:e}:e),"order")},Ei.props=function(t,e){return $(e)&&(e=e.reduce(function(t,e){return t[e]=String,t},{})),Ei.methods(t,e)},Ei.computed=Ei.methods=function(t,e){return e?t?X({},t,e):e:t},Ei.data=function(e,i,t){return t?Ai(e,i,t):i?e?function(t){return Ai(e,i,t)}:i:e};function Mi(t){this.id=++Oi,this.el=W(t)}var Oi=0;function Di(t,e){try{t.contentWindow.postMessage(JSON.stringify(X({event:"command"},e)),"*")}catch(t){}}Mi.prototype.isVideo=function(){return this.isYoutube()||this.isVimeo()||this.isHTML5()},Mi.prototype.isHTML5=function(){return"VIDEO"===this.el.tagName},Mi.prototype.isIFrame=function(){return"IFRAME"===this.el.tagName},Mi.prototype.isYoutube=function(){return this.isIFrame()&&!!this.el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/)},Mi.prototype.isVimeo=function(){return this.isIFrame()&&!!this.el.src.match(/vimeo\.com\/video\/.*/)},Mi.prototype.enableApi=function(){var e=this;if(this.ready)return this.ready;var i,r=this.isYoutube(),o=this.isVimeo();return r||o?this.ready=new Yt(function(t){var n;Dt(e.el,"load",function(){if(r){var t=function(){return Di(e.el,{event:"listening",id:e.id})};i=setInterval(t,100),t()}}),(n=function(t){return r&&t.id===e.id&&"onReady"===t.event||o&&Number(t.player_id)===e.id},new Yt(function(i){Dt(window,"message",function(t,e){return i(e)},!1,function(t){var e=t.data;if(e&&D(e)){try{e=JSON.parse(e)}catch(t){return}return e&&n(e)}})})).then(function(){t(),i&&clearInterval(i)}),nt(e.el,"src",e.el.src+(y(e.el.src,"?")?"&":"?")+(r?"enablejsapi=1":"api=1&player_id="+e.id))}):Yt.resolve()},Mi.prototype.play=function(){var t=this;if(this.isVideo())if(this.isIFrame())this.enableApi().then(function(){return Di(t.el,{func:"playVideo",method:"play"})});else if(this.isHTML5())try{var e=this.el.play();e&&e.catch(Q)}catch(t){}},Mi.prototype.pause=function(){var t=this;this.isVideo()&&(this.isIFrame()?this.enableApi().then(function(){return Di(t.el,{func:"pauseVideo",method:"pause"})}):this.isHTML5()&&this.el.pause())},Mi.prototype.mute=function(){var t=this;this.isVideo()&&(this.isIFrame()?this.enableApi().then(function(){return Di(t.el,{func:"mute",method:"setVolume",value:0})}):this.isHTML5()&&(this.el.muted=!0,nt(this.el,"muted","")))};var zi="IntersectionObserver"in window?window.IntersectionObserver:function(){function t(e,t){var i=this;void 0===t&&(t={});var n=t.rootMargin;void 0===n&&(n="0 0"),this.targets=[];var r,o=(n||"0 0").split(" ").map(j),s=o[0],a=o[1];this.offsetTop=s,this.offsetLeft=a,this.apply=function(){r=r||requestAnimationFrame(function(){return setTimeout(function(){var t=i.takeRecords();t.length&&e(t,i),r=!1})})},this.off=Mt(window,"scroll resize load",this.apply,{passive:!0,capture:!0})}return t.prototype.takeRecords=function(){var i=this;return this.targets.filter(function(t){var e=di(t.target,i.offsetTop,i.offsetLeft);if(null===t.isIntersecting||e^t.isIntersecting)return t.isIntersecting=e,!0})},t.prototype.observe=function(t){this.targets.push({target:t,isIntersecting:null}),this.apply()},t.prototype.disconnect=function(){this.targets=[],this.off()},t}();function Bi(t){return!(!w(t,"uk-")&&!w(t,"data-uk-"))&&p(t.replace("data-uk-","").replace("uk-",""))}function Pi(t){this._init(t)}var Hi,Li,Fi,ji,Wi,Vi,Yi,Ri,qi;function Ui(t,e){if(t)for(var i in t)t[i]._connected&&t[i]._callUpdate(e)}function Xi(t,e){var i={},n=t.args;void 0===n&&(n=[]);var r=t.props;void 0===r&&(r={});var o=t.el;if(!r)return i;for(var s in r){var a=d(s),h=st(o,a);if(!H(h)){if(h=r[s]===Boolean&&""===h||Zi(r[s],h),"target"===a&&(!h||w(h,"_")))continue;i[s]=h}}var c=Ni(st(o,e),n);for(var l in c){var u=p(l);void 0!==r[u]&&(i[u]=Zi(r[u],c[l]))}return i}function Ki(n,r,o){Object.defineProperty(n,r,{enumerable:!0,get:function(){var t=n._computeds,e=n.$props,i=n.$el;return c(t,r)||(t[r]=(o.get||o).call(n,e,i)),t[r]},set:function(t){var e=n._computeds;e[r]=o.set?o.set.call(n,t):t,H(e[r])&&delete e[r]}})}function Gi(e,i,n){T(i)||(i={name:n,handler:i});var r,o,t=i.name,s=i.el,a=i.handler,h=i.capture,c=i.passive,l=i.delegate,u=i.filter,d=i.self;(s=I(s)?s.call(e):s||e.$el,$(s))?s.forEach(function(t){return Gi(e,X({},i,{el:t}),n)}):!s||u&&!u.call(e)||(r=D(a)?e[a]:f(a,e),a=function(t){return $(t.detail)?r.apply(void 0,[t].concat(t.detail)):r(t)},d&&(o=a,a=function(t){if(t.target===t.currentTarget||t.target===t.current)return o.call(null,t)}),e._events.push(Mt(s,t,l?D(l)?l:l.call(e):null,a,O(c)?{passive:c,capture:h}:h)))}function Ji(t,e){return t.every(function(t){return!t||!c(t,e)})}function Zi(t,e){return t===Boolean?L(e):t===Number?F(e):"list"===t?Y(e):t?t(e):e}Pi.util=Object.freeze({isVoidElement:Tt,isVisible:Et,selInput:At,isInput:Ct,filter:_t,within:Nt,ajax:Kt,getImage:Gt,attr:nt,hasAttr:rt,removeAttr:ot,data:st,addClass:Ae,removeClass:Ce,removeClasses:_e,replaceClass:Ne,hasClass:Me,toggleClass:Oe,positionAt:ti,offset:ei,position:ni,height:ri,width:oi,boxModelAdjust:ai,flipPosition:ui,isInView:di,scrolledOver:fi,scrollTop:pi,offsetPosition:mi,toPx:gi,ready:he,index:ce,getIndex:le,empty:ue,html:de,prepend:function(e,t){return(e=Se(e)).hasChildNodes()?ge(t,function(t){return e.insertBefore(t,e.firstChild)}):fe(e,t)},append:fe,before:pe,after:me,remove:ve,wrapAll:we,wrapInner:be,unwrap:ye,fragment:$e,apply:Ie,$:Se,$$:Te,isIE:Jt,isRtl:Zt,hasTouch:ee,pointerDown:ie,pointerMove:ne,pointerUp:re,pointerEnter:oe,pointerLeave:se,pointerCancel:ae,on:Mt,off:Ot,once:Dt,trigger:zt,createEvent:Bt,toEventTargets:Ft,isTouch:jt,getEventPos:Wt,fastdom:yi,transition:qe,Transition:Ue,animate:Ge,Animation:Ze,bind:f,hasOwn:c,hyphenate:d,camelize:p,ucfirst:m,startsWith:w,endsWith:l,includes:y,findIndex:k,isArray:$,isFunction:I,isObject:S,isPlainObject:T,isWindow:E,isDocument:A,isJQuery:C,isNode:_,isNodeCollection:M,isBoolean:O,isString:D,isNumber:z,isNumeric:B,isEmpty:P,isUndefined:H,toBoolean:L,toNumber:F,toFloat:j,toNode:W,toNodes:V,toList:Y,toMs:R,isEqual:q,swap:U,assign:X,each:K,sortBy:G,uniqueBy:J,clamp:Z,noop:Q,intersectRect:tt,pointInRect:et,Dimensions:it,MouseTracker:Si,mergeOptions:_i,parseOptions:Ni,Player:Mi,Promise:Yt,Deferred:Vt,IntersectionObserver:zi,query:at,queryAll:ht,find:lt,findAll:ut,matches:bt,closest:xt,parents:kt,escape:It,css:He,getStyles:Le,getStyle:Fe,getCssVar:We,propName:Ye}),Pi.data="__uikit__",Pi.prefix="uk-",Pi.options={},Fi=(Hi=Pi).data,Hi.use=function(t){if(!t.installed)return t.call(null,this),t.installed=!0,this},Hi.mixin=function(t,e){(e=(D(e)?Hi.component(e):e)||this).options=_i(e.options,t)},Hi.extend=function(t){t=t||{};function e(t){this._init(t)}return((e.prototype=Object.create(this.prototype)).constructor=e).options=_i(this.options,t),e.super=this,e.extend=this.extend,e},Hi.update=function(t,e){(function t(e,i){e&&e!==document.body&&e.parentNode&&(t(e.parentNode,i),i(e.parentNode))})(t=t?W(t):document.body,function(t){return Ui(t[Fi],e)}),Ie(t,function(t){return Ui(t[Fi],e)})},Object.defineProperty(Hi,"container",{get:function(){return Li||document.body},set:function(t){Li=Se(t)}}),(ji=Pi).prototype._callHook=function(t){var e=this,i=this.$options[t];i&&i.forEach(function(t){return t.call(e)})},ji.prototype._callConnected=function(){this._connected||(this._data={},this._computeds={},this._initProps(),this._callHook("beforeConnect"),this._connected=!0,this._initEvents(),this._initObserver(),this._callHook("connected"),this._callUpdate())},ji.prototype._callDisconnected=function(){this._connected&&(this._callHook("beforeDisconnect"),this._observer&&(this._observer.disconnect(),this._observer=null),this._unbindEvents(),this._callHook("disconnected"),this._connected=!1)},ji.prototype._callUpdate=function(t){var o=this;void 0===t&&(t="update");var s=t.type||t;y(["update","resize"],s)&&this._callWatches();var e=this.$options.update,i=this._frames,a=i.reads,h=i.writes;e&&e.forEach(function(t,e){var i=t.read,n=t.write,r=t.events;"update"!==s&&!y(r,s)||(i&&!y(yi.reads,a[e])&&(a[e]=yi.read(function(){var t=o._connected&&i.call(o,o._data,s);!1===t&&n?yi.clear(h[e]):T(t)&&X(o._data,t)})),n&&!y(yi.writes,h[e])&&(h[e]=yi.write(function(){return o._connected&&n.call(o,o._data,s)})))})},Vi=0,(Wi=Pi).prototype._init=function(t){(t=t||{}).data=function(t,e){var i=t.data,n=(t.el,e.args),r=e.props;void 0===r&&(r={});if(i=$(i)?P(n)?void 0:i.slice(0,n.length).reduce(function(t,e,i){return T(e)?X(t,e):t[n[i]]=e,t},{}):i)for(var o in i)H(i[o])?delete i[o]:i[o]=r[o]?Zi(r[o],i[o]):i[o];return i}(t,this.constructor.options),this.$options=_i(this.constructor.options,t,this),this.$el=null,this.$props={},this._frames={reads:{},writes:{}},this._events=[],this._uid=Vi++,this._initData(),this._initMethods(),this._initComputeds(),this._callHook("created"),t.el&&this.$mount(t.el)},Wi.prototype._initData=function(){var t=this.$options.data;for(var e in void 0===t&&(t={}),t)this.$props[e]=this[e]=t[e]},Wi.prototype._initMethods=function(){var t=this.$options.methods;if(t)for(var e in t)this[e]=f(t[e],this)},Wi.prototype._initComputeds=function(){var t=this.$options.computed;if(this._computeds={},t)for(var e in t)Ki(this,e,t[e])},Wi.prototype._callWatches=function(){var t=this.$options.computed,e=this._computeds;for(var i in e){var n=e[i];delete e[i],t[i].watch&&!q(n,this[i])&&t[i].watch.call(this,this[i],n)}},Wi.prototype._initProps=function(t){var e;for(e in t=t||Xi(this.$options,this.$name))H(t[e])||(this.$props[e]=t[e]);var i=[this.$options.computed,this.$options.methods];for(e in this.$props)e in t&&Ji(i,e)&&(this[e]=this.$props[e])},Wi.prototype._initEvents=function(){var i=this,t=this.$options.events;t&&t.forEach(function(t){if(c(t,"handler"))Gi(i,t);else for(var e in t)Gi(i,t[e],e)})},Wi.prototype._unbindEvents=function(){this._events.forEach(function(t){return t()}),this._events=[]},Wi.prototype._initObserver=function(){var i=this,t=this.$options,n=t.attrs,e=t.props,r=t.el;if(!this._observer&&e&&!1!==n){n=$(n)?n:Object.keys(e),this._observer=new MutationObserver(function(){var e=Xi(i.$options,i.$name);n.some(function(t){return!H(e[t])&&e[t]!==i.$props[t]})&&i.$reset()});var o=n.map(function(t){return d(t)}).concat(this.$name);this._observer.observe(r,{attributes:!0,attributeFilter:o.concat(o.map(function(t){return"data-"+t}))})}},Ri=(Yi=Pi).data,qi={},Yi.component=function(s,t){if(!t)return T(qi[s])&&(qi[s]=Yi.extend(qi[s])),qi[s];Yi[s]=function(t,i){for(var e=arguments.length,n=Array(e);e--;)n[e]=arguments[e];var r=Yi.component(s);return T(t)?new r({data:t}):r.options.functional?new r({data:[].concat(n)}):t&&t.nodeType?o(t):Te(t).map(o)[0];function o(t){var e=Yi.getComponent(t,s);if(e){if(!i)return e;e.$destroy()}return new r({el:t,data:i})}};var e=T(t)?X({},t):t.options;if(e.name=s,e.install&&e.install(Yi,e,s),Yi._initialized&&!e.functional){var i=d(s);yi.read(function(){return Yi[s]("[uk-"+i+"],[data-uk-"+i+"]")})}return qi[s]=T(t)?e:t},Yi.getComponents=function(t){return t&&t[Ri]||{}},Yi.getComponent=function(t,e){return Yi.getComponents(t)[e]},Yi.connect=function(t){if(t[Ri])for(var e in t[Ri])t[Ri][e]._callConnected();for(var i=0;i<t.attributes.length;i++){var n=Bi(t.attributes[i].name);n&&n in qi&&Yi[n](t)}},Yi.disconnect=function(t){for(var e in t[Ri])t[Ri][e]._callDisconnected()},function(n){var r=n.data;n.prototype.$mount=function(t){var e=this.$options.name;t[r]||(t[r]={}),t[r][e]||((t[r][e]=this).$el=this.$options.el=this.$options.el||t,Nt(t,document)&&this._callConnected())},n.prototype.$emit=function(t){this._callUpdate(t)},n.prototype.$reset=function(){this._callDisconnected(),this._callConnected()},n.prototype.$destroy=function(t){void 0===t&&(t=!1);var e=this.$options,i=e.el,n=e.name;i&&this._callDisconnected(),this._callHook("destroy"),i&&i[r]&&(delete i[r][n],P(i[r])||delete i[r],t&&ve(this.$el))},n.prototype.$create=function(t,e,i){return n[t](e,i)},n.prototype.$update=n.update,n.prototype.$getComponent=n.getComponent;var e={};Object.defineProperties(n.prototype,{$container:Object.getOwnPropertyDescriptor(n,"container"),$name:{get:function(){var t=this.$options.name;return e[t]||(e[t]=n.prefix+d(t)),e[t]}}})}(Pi);var Qi={connected:function(){Me(this.$el,this.$name)||Ae(this.$el,this.$name)}},tn={props:{cls:Boolean,animation:"list",duration:Number,origin:String,transition:String,queued:Boolean},data:{cls:!1,animation:[!1],duration:200,origin:!1,transition:"linear",queued:!1,initProps:{overflow:"",height:"",paddingTop:"",paddingBottom:"",marginTop:"",marginBottom:""},hideProps:{overflow:"hidden",height:0,paddingTop:0,paddingBottom:0,marginTop:0,marginBottom:0}},computed:{hasAnimation:function(t){return!!t.animation[0]},hasTransition:function(t){var e=t.animation;return this.hasAnimation&&!0===e[0]}},methods:{toggleElement:function(c,l,u){var d=this;return new Yt(function(t){c=V(c);function e(t){return Yt.all(t.map(function(t){return d._toggleElement(t,l,u)}))}var i,n=c.filter(function(t){return d.isToggled(t)}),r=c.filter(function(t){return!y(n,t)});if(d.queued&&H(u)&&H(l)&&d.hasAnimation&&!(c.length<2)){var o=document.body,s=o.scrollTop,a=n[0],h=Ze.inProgress(a)&&Me(a,"uk-animation-leave")||Ue.inProgress(a)&&"0px"===a.style.height;i=e(n),h||(i=i.then(function(){var t=e(r);return o.scrollTop=s,t}))}else i=e(r.concat(n));i.then(t,Q)})},toggleNow:function(e,i){var n=this;return new Yt(function(t){return Yt.all(V(e).map(function(t){return n._toggleElement(t,i,!1)})).then(t,Q)})},isToggled:function(t){var e=V(t||this.$el);return this.cls?Me(e,this.cls.split(" ")[0]):!rt(e,"hidden")},updateAria:function(t){!1===this.cls&&nt(t,"aria-hidden",!this.isToggled(t))},_toggleElement:function(t,e,i){var n=this;if(e=O(e)?e:Ze.inProgress(t)?Me(t,"uk-animation-leave"):Ue.inProgress(t)?"0px"===t.style.height:!this.isToggled(t),!zt(t,"before"+(e?"show":"hide"),[this]))return Yt.reject();var r,o,s,a,h,c,l,u,d,f,p,m,g=(I(i)?i:!1!==i&&this.hasAnimation?this.hasTransition?(l=(c=this).isToggled,u=c.duration,d=c.initProps,f=c.hideProps,p=c.transition,m=c._toggle,function(t,e){var i=Ue.inProgress(t),n=t.hasChildNodes?j(He(t.firstElementChild,"marginTop"))+j(He(t.lastElementChild,"marginBottom")):0,r=Et(t)?ri(t)+(i?0:n):0;Ue.cancel(t),l(t)||m(t,!0),ri(t,""),yi.flush();var o=ri(t)+(i?0:n);return ri(t,r),(e?Ue.start(t,X({},d,{overflow:"hidden",height:o}),Math.round(u*(1-r/o)),p):Ue.start(t,f,Math.round(u*(r/o)),p).then(function(){return m(t,!1)})).then(function(){return He(t,d)})}):(o=(r=this).animation,s=r.duration,a=r.origin,h=r._toggle,function(t,e){return Ze.cancel(t),e?(h(t,!0),Ze.in(t,o[0],s,a)):Ze.out(t,o[1]||o[0],s,a).then(function(){return h(t,!1)})}):this._toggle)(t,e);zt(t,e?"show":"hide",[this]);function v(){zt(t,e?"shown":"hidden",[n]),n.$update(t)}return g?g.then(v):Yt.resolve(v())},_toggle:function(t,e){var i;t&&(e=Boolean(e),this.cls?(i=y(this.cls," ")||e!==Me(t,this.cls))&&Oe(t,this.cls,y(this.cls," ")?void 0:e):(i=e===rt(t,"hidden"))&&nt(t,"hidden",e?null:""),Te("[autofocus]",t).some(function(t){return Et(t)?t.focus()||!0:t.blur()}),this.updateAria(t),i&&this.$update(t))}}};var en={mixins:[Qi,tn],props:{targets:String,active:null,collapsible:Boolean,multiple:Boolean,toggle:String,content:String,transition:String},data:{targets:"> *",active:!1,animation:[!0],collapsible:!0,multiple:!1,clsOpen:"uk-open",toggle:"> .uk-accordion-title",content:"> .uk-accordion-content",transition:"ease"},computed:{items:function(t,e){return Te(t.targets,e)}},events:[{name:"click",delegate:function(){return this.targets+" "+this.$props.toggle},handler:function(t){t.preventDefault(),this.toggle(ce(Te(this.targets+" "+this.$props.toggle,this.$el),t.current))}}],connected:function(){if(!1!==this.active){var t=this.items[Number(this.active)];t&&!Me(t,this.clsOpen)&&this.toggle(t,!1)}},update:function(){var e=this;this.items.forEach(function(t){return e._toggle(Se(e.content,t),Me(t,e.clsOpen))});var t=!this.collapsible&&!Me(this.items,this.clsOpen)&&this.items[0];t&&this.toggle(t,!1)},methods:{toggle:function(r,o){var s=this,t=le(r,this.items),a=_t(this.items,"."+this.clsOpen);(r=this.items[t])&&[r].concat(!this.multiple&&!y(a,r)&&a||[]).forEach(function(t){var e=t===r,i=e&&!Me(t,s.clsOpen);if(i||!e||s.collapsible||!(a.length<2)){Oe(t,s.clsOpen,i);var n=t._wrapper?t._wrapper.firstElementChild:Se(s.content,t);t._wrapper||(t._wrapper=we(n,"<div>"),nt(t._wrapper,"hidden",i?"":null)),s._toggle(n,!0),s.toggleElement(t._wrapper,i,o).then(function(){Me(t,s.clsOpen)===i&&(i||s._toggle(n,!1),t._wrapper=null,ye(n))})}})}}},nn={mixins:[Qi,tn],args:"animation",props:{close:String},data:{animation:[!0],selClose:".uk-alert-close",duration:150,hideProps:X({opacity:0},tn.data.hideProps)},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.close()}}],methods:{close:function(){var t=this;this.toggleElement(this.$el).then(function(){return t.$destroy(!0)})}}};function rn(r){he(function(){var i;r.update(),Mt(window,"load resize",function(){return r.update(null,"resize")}),Mt(document,"loadedmetadata load",function(t){var e=t.target;return r.update(e,"resize")},!0),Mt(window,"scroll",function(t){if(!i){i=!0,yi.write(function(){return i=!1});var e=t.target;r.update(1!==e.nodeType?document.body:e,t.type)}},{passive:!0,capture:!0});var e,n=0;Mt(document,"animationstart",function(t){var e=t.target;(He(e,"animationName")||"").match(/^uk-.*(left|right)/)&&(n++,He(document.body,"overflowX","hidden"),setTimeout(function(){--n||He(document.body,"overflowX","")},R(He(e,"animationDuration"))+100))},!0),Mt(document,ie,function(t){if(e&&e(),jt(t)){var s=Wt(t),a="tagName"in t.target?t.target:t.target.parentNode;e=Dt(document,re+" "+ae,function(t){var e=Wt(t),r=e.x,o=e.y;(a&&r&&100<Math.abs(s.x-r)||o&&100<Math.abs(s.y-o))&&setTimeout(function(){var t,e,i,n;zt(a,"swipe"),zt(a,"swipe"+(t=s.x,e=s.y,i=r,n=o,Math.abs(t-i)>=Math.abs(e-n)?0<t-i?"Left":"Right":0<e-n?"Up":"Down"))})})}},{passive:!0})})}var on,sn,an={args:"autoplay",props:{automute:Boolean,autoplay:Boolean},data:{automute:!1,autoplay:!0},computed:{inView:function(t){return"inview"===t.autoplay}},connected:function(){this.inView&&!rt(this.$el,"preload")&&(this.$el.preload="none"),this.player=new Mi(this.$el),this.automute&&this.player.mute()},update:{read:function(){return!!this.player&&{visible:Et(this.$el)&&"hidden"!==He(this.$el,"visibility"),inView:this.inView&&di(this.$el)}},write:function(t){var e=t.visible,i=t.inView;!e||this.inView&&!i?this.player.pause():(!0===this.autoplay||this.inView&&i)&&this.player.play()},events:["resize","scroll"]}},hn={mixins:[Qi,an],props:{width:Number,height:Number},data:{automute:!0},update:{read:function(){var t=this.$el;if(!Et(t))return!1;var e=t.parentNode;return{height:e.offsetHeight,width:e.offsetWidth}},write:function(t){var e=t.height,i=t.width,n=this.$el,r=this.width||n.naturalWidth||n.videoWidth||n.clientWidth,o=this.height||n.naturalHeight||n.videoHeight||n.clientHeight;r&&o&&He(n,it.cover({width:r,height:o},{width:i+(i%2?1:0),height:e+(e%2?1:0)}))},events:["resize"]}},cn={props:{pos:String,offset:null,flip:Boolean,clsPos:String},data:{pos:"bottom-"+(Zt?"right":"left"),flip:!0,offset:!1,clsPos:""},computed:{pos:function(t){var e=t.pos;return(e+(y(e,"-")?"":"-center")).split("-")},dir:function(){return this.pos[0]},align:function(){return this.pos[1]}},methods:{positionAt:function(t,e,i){var n;_e(t,this.clsPos+"-(top|bottom|left|right)(-[a-z]+)?"),He(t,{top:"",left:""});var r=this.offset,o=this.getAxis();B(r)||(r=(n=Se(r))?ei(n)["x"===o?"left":"top"]-ei(e)["x"===o?"right":"bottom"]:0);var s=ti(t,e,"x"===o?ui(this.dir)+" "+this.align:this.align+" "+ui(this.dir),"x"===o?this.dir+" "+this.align:this.align+" "+this.dir,"x"===o?""+("left"===this.dir?-r:r):" "+("top"===this.dir?-r:r),null,this.flip,i).target,a=s.x,h=s.y;this.dir="x"===o?a:h,this.align="x"===o?h:a,Oe(t,this.clsPos+"-"+this.dir+"-"+this.align,!1===this.offset)},getAxis:function(){return"top"===this.dir||"bottom"===this.dir?"y":"x"}}},ln={mixins:[cn,tn],args:"pos",props:{mode:"list",toggle:Boolean,boundary:Boolean,boundaryAlign:Boolean,delayShow:Number,delayHide:Number,clsDrop:String},data:{mode:["click","hover"],toggle:"- *",boundary:window,boundaryAlign:!1,delayShow:0,delayHide:800,clsDrop:!1,hoverIdle:200,animation:["uk-animation-fade"],cls:"uk-open"},computed:{boundary:function(t,e){return at(t.boundary,e)},clsDrop:function(t){return t.clsDrop||"uk-"+this.$options.name},clsPos:function(){return this.clsDrop}},created:function(){this.tracker=new Si},connected:function(){Ae(this.$el,this.clsDrop);var t=this.$props.toggle;this.toggle=t&&this.$create("toggle",at(t,this.$el),{target:this.$el,mode:this.mode}),this.toggle||zt(this.$el,"updatearia")},events:[{name:"click",delegate:function(){return"."+this.clsDrop+"-close"},handler:function(t){t.preventDefault(),this.hide(!1)}},{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){var e=t.target.hash;e||t.preventDefault(),e&&Nt(e,this.$el)||this.hide(!1)}},{name:"beforescroll",handler:function(){this.hide(!1)}},{name:"toggle",self:!0,handler:function(t,e){t.preventDefault(),this.isToggled()?this.hide(!1):this.show(e,!1)}},{name:oe,filter:function(){return y(this.mode,"hover")},handler:function(t){jt(t)||(on&&on!==this&&on.toggle&&y(on.toggle.mode,"hover")&&!Nt(t.target,on.toggle.$el)&&!et({x:t.pageX,y:t.pageY},ei(on.$el))&&on.hide(!1),t.preventDefault(),this.show(this.toggle))}},{name:"toggleshow",handler:function(t,e){e&&!y(e.target,this.$el)||(t.preventDefault(),this.show(e||this.toggle))}},{name:"togglehide "+se,handler:function(t,e){jt(t)||e&&!y(e.target,this.$el)||(t.preventDefault(),this.toggle&&y(this.toggle.mode,"hover")&&this.hide())}},{name:"beforeshow",self:!0,handler:function(){this.clearTimers(),Ze.cancel(this.$el),this.position()}},{name:"show",self:!0,handler:function(){this.tracker.init(),zt(this.$el,"updatearia"),function(){if(sn)return;sn=!0,Mt(document,re,function(t){var e,i=t.target;if(!t.defaultPrevented)for(;on&&on!==e&&!Nt(i,on.$el)&&(!on.toggle||!Nt(i,on.toggle.$el));)(e=on).hide(!1)})}()}},{name:"beforehide",self:!0,handler:function(){this.clearTimers()}},{name:"hide",handler:function(t){var e=t.target;this.$el===e?(on=this.isActive()?null:on,zt(this.$el,"updatearia"),this.tracker.cancel()):on=null===on&&Nt(e,this.$el)&&this.isToggled()?this:on}},{name:"updatearia",self:!0,handler:function(t,e){t.preventDefault(),this.updateAria(this.$el),(e||this.toggle)&&(nt((e||this.toggle).$el,"aria-expanded",this.isToggled()?"true":"false"),Oe(this.toggle.$el,this.cls,this.isToggled()))}}],update:{write:function(){this.isToggled()&&!Ze.inProgress(this.$el)&&this.position()},events:["resize"]},methods:{show:function(e,i){var n=this;void 0===i&&(i=!0);function r(){return!n.isToggled()&&n.toggleElement(n.$el,!0)}function t(){if(n.toggle=e||n.toggle,n.clearTimers(),!n.isActive())if(i&&on&&on!==n&&on.isDelaying)n.showTimer=setTimeout(n.show,10);else{if(n.isParentOf(on)){if(!on.hideTimer)return;on.hide(!1)}else if(on&&n.isChildOf(on))on.clearTimers();else if(on&&!n.isChildOf(on)&&!n.isParentOf(on))for(var t;on&&on!==t&&!n.isChildOf(on);)(t=on).hide(!1);i&&n.delayShow?n.showTimer=setTimeout(r,n.delayShow):r(),on=n}}e&&this.toggle&&e.$el!==this.toggle.$el?(Dt(this.$el,"hide",t),this.hide(!1)):t()},hide:function(t){var e=this;void 0===t&&(t=!0);function i(){return e.toggleNow(e.$el,!1)}this.clearTimers(),this.isDelaying=this.tracker.movesTo(this.$el),t&&this.isDelaying?this.hideTimer=setTimeout(this.hide,this.hoverIdle):t&&this.delayHide?this.hideTimer=setTimeout(i,this.delayHide):i()},clearTimers:function(){clearTimeout(this.showTimer),clearTimeout(this.hideTimer),this.showTimer=null,this.hideTimer=null,this.isDelaying=!1},isActive:function(){return on===this},isChildOf:function(t){return t&&t!==this&&Nt(this.$el,t.$el)},isParentOf:function(t){return t&&t!==this&&Nt(t.$el,this.$el)},position:function(){_e(this.$el,this.clsDrop+"-(stack|boundary)"),He(this.$el,{top:"",left:"",display:"block"}),Oe(this.$el,this.clsDrop+"-boundary",this.boundaryAlign);var t=ei(this.boundary),e=this.boundaryAlign?t:ei(this.toggle.$el);if("justify"===this.align){var i="y"===this.getAxis()?"width":"height";He(this.$el,i,e[i])}else this.$el.offsetWidth>Math.max(t.right-e.left,e.right-t.left)&&Ae(this.$el,this.clsDrop+"-stack");this.positionAt(this.$el,this.boundaryAlign?this.boundary:this.toggle.$el,this.boundary),He(this.$el,"display","")}}};var un={extends:ln},dn={mixins:[Qi],args:"target",props:{target:Boolean},data:{target:!1},computed:{input:function(t,e){return Se(At,e)},state:function(){return this.input.nextElementSibling},target:function(t,e){var i=t.target;return i&&(!0===i&&this.input.parentNode===e&&this.input.nextElementSibling||at(i,e))}},update:function(){var t=this.target,e=this.input;if(t){var i,n=Ct(t)?"value":"textContent",r=t[n],o=e.files&&e.files[0]?e.files[0].name:bt(e,"select")&&(i=Te("option",e).filter(function(t){return t.selected})[0])?i.textContent:e.value;r!==o&&(t[n]=o)}},events:[{name:"change",handler:function(){this.$emit()}},{name:"reset",el:function(){return xt(this.$el,"form")},handler:function(){this.$emit()}}]},fn={update:{read:function(t){var e=di(this.$el);if(!e||t.isInView===e)return!1;t.isInView=e},write:function(){this.$el.src=this.$el.src},events:["scroll","resize"]}},pn={props:{margin:String,firstColumn:Boolean},data:{margin:"uk-margin-small-top",firstColumn:"uk-first-column"},update:{read:function(t){var e=this.$el.children;if(!e.length||!Et(this.$el))return t.rows=[[]];t.rows=mn(e),t.stacks=!t.rows.some(function(t){return 1<t.length})},write:function(t){var n=this;t.rows.forEach(function(t,i){return t.forEach(function(t,e){Oe(t,n.margin,0!==i),Oe(t,n.firstColumn,0===e)})})},events:["resize"]}};function mn(t){for(var e=[[]],i=0;i<t.length;i++){var n=t[i],r=gn(n);if(r.height)for(var o=e.length-1;0<=o;o--){var s=e[o];if(!s[0]){s.push(n);break}var a=void 0;if(a=s[0].offsetParent===n.offsetParent?gn(s[0]):(r=gn(n,!0),gn(s[0],!0)),r.top>=a.bottom-1){e.push([n]);break}if(r.bottom>a.top){if(r.left<a.left&&!Zt){s.unshift(n);break}s.push(n);break}if(0===o){e.unshift([n]);break}}}return e}function gn(t,e){var i;void 0===e&&(e=!1);var n=t.offsetTop,r=t.offsetLeft,o=t.offsetHeight;return e&&(n=(i=mi(t))[0],r=i[1]),{top:n,left:r,height:o,bottom:n+o}}var vn={extends:pn,mixins:[Qi],name:"grid",props:{masonry:Boolean,parallax:Number},data:{margin:"uk-grid-margin",clsStack:"uk-grid-stack",masonry:!1,parallax:0},computed:{length:function(t,e){return e.children.length},parallax:function(t){var e=t.parallax;return e&&this.length?Math.abs(e):""}},connected:function(){this.masonry&&Ae(this.$el,"uk-flex-top uk-flex-wrap-top")},update:[{read:function(t){var r=t.rows;(this.masonry||this.parallax)&&(r=r.map(function(t){return G(t,"offsetLeft")}),Zt&&r.map(function(t){return t.reverse()}));var e,i,n,o,s,a=r.some(function(t){return t.some(Ue.inProgress)}),h=!1,c="";if(this.masonry&&this.length){var l=0;h=r.reduce(function(i,t,n){return i[n]=t.map(function(t,e){return 0===n?0:j(i[n-1][e])+(l-j(r[n-1][e]&&r[n-1][e].offsetHeight))}),l=t.reduce(function(t,e){return Math.max(t,e.offsetHeight)},0),i},[]),s=r,c=Math.max.apply(Math,s.reduce(function(i,t){return t.forEach(function(t,e){return i[e]=(i[e]||0)+t.offsetHeight}),i},[]))+(e=this.$el,i=this.margin,n=V(e.children),j((o=n.filter(function(t){return Me(t,i)})[0])?He(o,"marginTop"):He(n[0],"paddingLeft"))*(r.length-1))}return{rows:r,translates:h,height:!a&&c}},write:function(t){var e=t.stacks,i=t.height;Oe(this.$el,this.clsStack,e),He(this.$el,"paddingBottom",this.parallax),!1!==i&&He(this.$el,"height",i)},events:["resize"]},{read:function(t){var e=t.height;return{scrolled:!!this.parallax&&fi(this.$el,e?e-ri(this.$el):0)*this.parallax}},write:function(t){var e=t.rows,n=t.scrolled,r=t.translates;!1===n&&!r||e.forEach(function(t,i){return t.forEach(function(t,e){return He(t,"transform",n||r?"translateY("+((r&&-r[i][e])+(n?e%2?n:n/8:0))+"px)":"")})})},events:["scroll","resize"]}]};var wn=Jt?{data:{selMinHeight:!1,forceHeight:!1},computed:{elements:function(t,e){var i=t.selMinHeight;return i?Te(i,e):[e]}},update:[{read:function(){He(this.elements,"height","")},order:-5,events:["resize"]},{write:function(){var i=this;this.elements.forEach(function(t){var e=j(He(t,"minHeight"));e&&(i.forceHeight||Math.round(e+ai("height",t,"content-box"))>=t.offsetHeight)&&He(t,"height",e)})},order:5,events:["resize"]}]}:{},bn={mixins:[wn],args:"target",props:{target:String,row:Boolean},data:{target:"> *",row:!0,forceHeight:!0},computed:{elements:function(t,e){return Te(t.target,e)}},update:{read:function(){return{rows:(this.row?mn(this.elements):[this.elements]).map(yn)}},write:function(t){t.rows.forEach(function(t){var i=t.heights;return t.elements.forEach(function(t,e){return He(t,"minHeight",i[e])})})},events:["resize"]}};function yn(t){var e;if(t.length<2)return{heights:[""],elements:t};var i=xn(t),n=i.heights,r=i.max,o=t.some(function(t){return t.style.minHeight}),s=t.some(function(t,e){return!t.style.minHeight&&n[e]<r});return o&&s&&(He(t,"minHeight",""),e=xn(t),n=e.heights,r=e.max),{heights:n=t.map(function(t,e){return n[e]===r&&j(t.style.minHeight).toFixed(2)!==r.toFixed(2)?"":r}),elements:t}}function xn(t){var e=t.map(function(t){return ei(t).height-ai("height",t,"content-box")});return{heights:e,max:Math.max.apply(null,e)}}var kn={mixins:[wn],props:{expand:Boolean,offsetTop:Boolean,offsetBottom:Boolean,minHeight:Number},data:{expand:!1,offsetTop:!1,offsetBottom:!1,minHeight:0},update:{read:function(t){var e=t.minHeight,i="",n=ai("height",this.$el,"content-box");if(this.expand)i=ri(window)-($n(document.documentElement)-$n(this.$el))-n||"";else{if(i="calc(100vh",this.offsetTop){var r=ei(this.$el).top;i+=r<ri(window)/2?" - "+r+"px":""}!0===this.offsetBottom?i+=" - "+$n(this.$el.nextElementSibling)+"px":B(this.offsetBottom)?i+=" - "+this.offsetBottom+"vh":this.offsetBottom&&l(this.offsetBottom,"px")?i+=" - "+j(this.offsetBottom)+"px":D(this.offsetBottom)&&(i+=" - "+$n(at(this.offsetBottom,this.$el))+"px"),i+=(n?" - "+n+"px":"")+")"}return{minHeight:i,prev:e}},write:function(t){var e=t.minHeight,i=t.prev;He(this.$el,{minHeight:e}),e!==i&&this.$update(this.$el,"resize"),this.minHeight&&j(He(this.$el,"minHeight"))<this.minHeight&&He(this.$el,"minHeight",this.minHeight)},events:["resize"]}};function $n(t){return t&&t.offsetHeight||0}var In={args:"src",props:{id:Boolean,icon:String,src:String,style:String,width:Number,height:Number,ratio:Number,class:String,strokeAnimation:Boolean,attributes:"list"},data:{ratio:1,include:["style","class"],class:"",strokeAnimation:!1},beforeConnect:function(){var t,e=this;if(this.class+=" uk-svg",!this.icon&&y(this.src,"#")){var i=this.src.split("#");1<i.length&&(t=i,this.src=t[0],this.icon=t[1])}this.svg=this.getSvg().then(function(t){return e.applyAttributes(t),e.svgEl=function(t,e){{if(Tt(e)||"CANVAS"===e.tagName){nt(e,"hidden",!0);var i=e.nextElementSibling;return Cn(t,i)?i:me(e,t)}var n=e.lastElementChild;return Cn(t,n)?n:fe(e,t)}}(t,e.$el)},Q)},disconnected:function(){var e=this;Tt(this.$el)&&nt(this.$el,"hidden",null),this.svg&&this.svg.then(function(t){return(!e._connected||t!==e.svgEl)&&ve(t)},Q),this.svg=this.svgEl=null},update:{read:function(){return!!(this.strokeAnimation&&this.svgEl&&Et(this.svgEl))},write:function(){var t,e;t=this.svgEl,(e=An(t))&&t.style.setProperty("--uk-animation-stroke",e)},type:["resize"]},methods:{getSvg:function(){var e=this;return function(i){if(Sn[i])return Sn[i];return Sn[i]=new Yt(function(e,t){i?w(i,"data:")?e(decodeURIComponent(i.split(",")[1])):Kt(i).then(function(t){return e(t.response)},function(){return t("SVG not found.")}):t()})}(this.src).then(function(t){return function(t,e){e&&y(t,"<symbol")&&(t=function(t,e){if(!En[t]){var i;for(En[t]={};i=Tn.exec(t);)En[t][i[3]]='<svg xmlns="http://www.w3.org/2000/svg"'+i[1]+"svg>";Tn.lastIndex=0}return En[t][e]}(t,e)||t);return(t=Se(t.substr(t.indexOf("<svg"))))&&t.hasChildNodes()&&t}(t,e.icon)||Yt.reject("SVG not found.")})},applyAttributes:function(i){var n=this;for(var t in this.$options.props)this[t]&&y(this.include,t)&&nt(i,t,this[t]);for(var e in this.attributes){var r=this.attributes[e].split(":",2),o=r[0],s=r[1];nt(i,o,s)}this.id||ot(i,"id");var a=["width","height"],h=[this.width,this.height];h.some(function(t){return t})||(h=a.map(function(t){return nt(i,t)}));var c=nt(i,"viewBox");c&&!h.some(function(t){return t})&&(h=c.split(" ").slice(2)),h.forEach(function(t,e){(t=(0|t)*n.ratio)&&nt(i,a[e],t),t&&!h[1^e]&&ot(i,a[1^e])}),nt(i,"data-svg",this.icon||this.src)}}},Sn={};var Tn=/<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g,En={};function An(t){return Math.ceil(Math.max.apply(Math,Te("[stroke]",t).map(function(t){return t.getTotalLength&&t.getTotalLength()||0}).concat([0])))}function Cn(t,e){return nt(t,"data-svg")===nt(e,"data-svg")}var _n={},Nn={spinner:'<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>',totop:'<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>',marker:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>',"close-icon":'<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>',"close-large":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>',"navbar-toggle-icon":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"/><rect y="3" width="20" height="2"/><rect y="15" width="20" height="2"/></svg>',"overlay-icon":'<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>',"pagination-next":'<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>',"pagination-previous":'<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>',"search-icon":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',"search-large":'<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>',"search-navbar":'<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>',"slidenav-next":'<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>',"slidenav-next-large":'<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>',"slidenav-previous":'<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>',"slidenav-previous-large":'<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>'},Mn={install:function(r){r.icon.add=function(t,e){var i,n=D(t)?((i={})[t]=e,i):t;K(n,function(t,e){Nn[e]=t,delete _n[e]}),r._initialized&&Ie(document.body,function(t){return K(r.getComponents(t),function(t){t.$options.isIcon&&t.icon in n&&t.$reset()})})}},extends:In,args:"icon",props:["icon"],data:{include:[]},isIcon:!0,beforeConnect:function(){Ae(this.$el,"uk-icon")},methods:{getSvg:function(){var t,e=function(t){if(!Nn[t])return null;_n[t]||(_n[t]=Se(Nn[t].trim()));return _n[t].cloneNode(!0)}((t=this.icon,Zt?U(U(t,"left","right"),"previous","next"):t));return e?Yt.resolve(e):Yt.reject("Icon not found.")}}},On={args:!1,extends:Mn,data:function(t){return{icon:d(t.constructor.options.name)}},beforeConnect:function(){Ae(this.$el,this.$name)}},Dn={extends:On,beforeConnect:function(){Ae(this.$el,"uk-slidenav")},computed:{icon:function(t,e){var i=t.icon;return Me(e,"uk-slidenav-large")?i+"-large":i}}},zn={extends:On,computed:{icon:function(t,e){var i=t.icon;return Me(e,"uk-search-icon")&&kt(e,".uk-search-large").length?"search-large":kt(e,".uk-search-navbar").length?"search-navbar":i}}},Bn={extends:On,computed:{icon:function(){return"close-"+(Me(this.$el,"uk-close-large")?"large":"icon")}}},Pn={extends:On,connected:function(){var e=this;this.svg.then(function(t){return 1!==e.ratio&&He(Se("circle",t),"strokeWidth",1/e.ratio)},Q)}};var Hn={args:"dataSrc",props:{dataSrc:String,dataSrcset:Boolean,sizes:String,width:Number,height:Number,offsetTop:String,offsetLeft:String,target:String},data:{dataSrc:"",dataSrcset:!1,sizes:!1,width:!1,height:!1,offsetTop:"50vh",offsetLeft:0,target:!1},computed:{cacheKey:function(t){var e=t.dataSrc;return this.$name+"."+e},width:function(t){var e=t.width,i=t.dataWidth;return e||i},height:function(t){var e=t.height,i=t.dataHeight;return e||i},sizes:function(t){var e=t.sizes,i=t.dataSizes;return e||i},isImg:function(t,e){return Rn(e)},target:{get:function(t){var e=t.target;return[this.$el].concat(ht(e,this.$el))},watch:function(){this.observe()}},offsetTop:function(t){return gi(t.offsetTop,"height")},offsetLeft:function(t){return gi(t.offsetLeft,"width")}},connected:function(){Un[this.cacheKey]?Ln(this.$el,Un[this.cacheKey]||this.dataSrc,this.dataSrcset,this.sizes):this.isImg&&this.width&&this.height&&Ln(this.$el,function(t,e,i){var n;i&&(n=it.ratio({width:t,height:e},"width",gi(jn(i))),t=n.width,e=n.height);return'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+e+'"></svg>'}(this.width,this.height,this.sizes)),this.observer=new zi(this.load,{rootMargin:this.offsetTop+"px "+this.offsetLeft+"px"}),requestAnimationFrame(this.observe)},disconnected:function(){this.observer.disconnect()},update:{read:function(t){var e=this,i=t.image;if(i||"complete"!==document.readyState||this.load(this.observer.takeRecords()),this.isImg)return!1;i&&i.then(function(t){return t&&""!==t.currentSrc&&Ln(e.$el,qn(t))})},write:function(t){if(this.dataSrcset&&1!==window.devicePixelRatio){var e=He(this.$el,"backgroundSize");!e.match(/^(auto\s?)+$/)&&j(e)!==t.bgSize||(t.bgSize=(i=this.dataSrcset,n=this.sizes,r=gi(jn(n)),(o=(i.match(Yn)||[]).map(j).sort(function(t,e){return t-e})).filter(function(t){return r<=t})[0]||o.pop()||""),He(this.$el,"backgroundSize",t.bgSize+"px"))}var i,n,r,o},events:["resize"]},methods:{load:function(t){var e=this;t.some(function(t){return t.isIntersecting})&&(this._data.image=Gt(this.dataSrc,this.dataSrcset,this.sizes).then(function(t){return Ln(e.$el,qn(t),t.srcset,t.sizes),Un[e.cacheKey]=qn(t),t},Q),this.observer.disconnect())},observe:function(){var e=this;!this._data.image&&this._connected&&this.target.forEach(function(t){return e.observer.observe(t)})}}};function Ln(t,e,i,n){if(Rn(t))n&&(t.sizes=n),i&&(t.srcset=i),e&&(t.src=e);else if(e){!y(t.style.backgroundImage,e)&&(He(t,"backgroundImage","url("+It(e)+")"),zt(t,Bt("load",!1)))}}var Fn=/\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;function jn(t){var e,i;for(Fn.lastIndex=0;e=Fn.exec(t);)if(!e[1]||window.matchMedia(e[1]).matches){e=w(i=e[2],"calc")?i.substring(5,i.length-1).replace(Wn,function(t){return gi(t)}).replace(/ /g,"").match(Vn).reduce(function(t,e){return t+ +e},0):i;break}return e||"100vw"}var Wn=/\d+(?:\w+|%)/g,Vn=/[+-]?(\d+)/g;var Yn=/\s+\d+w\s*(?:,|$)/g;function Rn(t){return"IMG"===t.tagName}function qn(t){return t.currentSrc||t.src}var Un,Xn="__test__";try{(Un=window.sessionStorage||{})[Xn]=1,delete Un[Xn]}catch(t){Un={}}var Kn={props:{media:Boolean},data:{media:!1},computed:{matchMedia:function(){var t=function(t){if(D(t)){if("@"===t[0])t=j(We("breakpoint-"+t.substr(1)));else if(isNaN(t))return t}return!(!t||isNaN(t))&&"(min-width: "+t+"px)"}(this.media);return!t||window.matchMedia(t).matches}}};var Gn,Jn,Zn={mixins:[Qi,Kn],props:{fill:String},data:{fill:"",clsWrapper:"uk-leader-fill",clsHide:"uk-leader-hide",attrFill:"data-fill"},computed:{fill:function(t){return t.fill||We("leader-fill-content")}},connected:function(){var t;t=be(this.$el,'<span class="'+this.clsWrapper+'">'),this.wrapper=t[0]},disconnected:function(){ye(this.wrapper.childNodes)},update:{read:function(t){var e=t.changed,i=t.width,n=i;return{width:i=Math.floor(this.$el.offsetWidth/2),fill:this.fill,changed:e||n!==i,hide:!this.matchMedia}},write:function(t){Oe(this.wrapper,this.clsHide,t.hide),t.changed&&(t.changed=!1,nt(this.wrapper,this.attrFill,new Array(t.width).join(t.fill)))},events:["resize"]}},Qn={props:{container:Boolean},data:{container:!0},computed:{container:function(t){var e=t.container;return!0===e&&this.$container||e&&Se(e)}}},tr={mixins:[Qi,Qn,tn],props:{selPanel:String,selClose:String,escClose:Boolean,bgClose:Boolean,stack:Boolean},data:{cls:"uk-open",escClose:!0,bgClose:!0,overlay:!0,stack:!1},computed:{panel:function(t,e){return Se(t.selPanel,e)},transitionElement:function(){return this.panel},bgClose:function(t){return t.bgClose&&this.panel}},beforeDisconnect:function(){this.isToggled()&&this.toggleNow(this.$el,!1)},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.hide()}},{name:"toggle",self:!0,handler:function(t){t.defaultPrevented||(t.preventDefault(),this.toggle())}},{name:"beforeshow",self:!0,handler:function(t){var i=Gn&&Gn!==this&&Gn;Gn=this,i?this.stack?this.prev=i:((Gn=i).isToggled()?i.hide().then(this.show):Dt(i.$el,"beforeshow hidden",this.show,!1,function(t){var e=t.target;return"hidden"===t.type&&e===i.$el}),t.preventDefault()):function(){if(Jn)return;Jn=[Mt(document,re,function(t){var e=t.target,i=t.defaultPrevented;!Gn||!Gn.bgClose||i||Gn.overlay&&!Nt(e,Gn.$el)||Nt(e,Gn.panel)||Gn.hide()}),Mt(document,"keydown",function(t){27===t.keyCode&&Gn&&Gn.escClose&&(t.preventDefault(),Gn.hide())})]}()}},{name:"show",self:!0,handler:function(){Me(document.documentElement,this.clsPage)||(this.scrollbarWidth=oi(window)-oi(document),He(document.body,"overflowY",this.scrollbarWidth&&this.overlay?"scroll":"")),Ae(document.documentElement,this.clsPage)}},{name:"hide",self:!0,handler:function(){Gn&&(Gn!==this||this.prev)||(Jn&&Jn.forEach(function(t){return t()}),Jn=null)}},{name:"hidden",self:!0,handler:function(){var t,e=this.prev;if(Gn=Gn&&Gn!==this&&Gn||e)for(;e;){if(e.clsPage===this.clsPage){t=!0;break}e=e.prev}else He(document.body,"overflowY","");t||Ce(document.documentElement,this.clsPage)}}],methods:{toggle:function(){return this.isToggled()?this.hide():this.show()},show:function(){var e=this;return this.isToggled()?Yt.resolve():this.container&&this.$el.parentNode!==this.container?(fe(this.container,this.$el),new Yt(function(t){return requestAnimationFrame(function(){return e.show().then(t)})})):this.toggleElement(this.$el,!0,er(this))},hide:function(){return this.isToggled()?this.toggleElement(this.$el,!1,er(this)):Yt.resolve()},getActive:function(){return Gn}}};function er(t){var r=t.transitionElement,o=t._toggle;return function(i,n){return new Yt(function(t,e){return Dt(i,"show hide",function(){i._reject&&i._reject(),i._reject=e,o(i,n),R(He(r,"transitionDuration"))?Dt(r,"transitionend",t,!1,function(t){return t.target===r}):t()})})}}var ir={install:function(a){a.modal.dialog=function(t,e){var i=a.modal(' <div class="uk-modal"> <div class="uk-modal-dialog">'+t+"</div> </div> ",e);return i.show(),Mt(i.$el,"hidden",function(t){t.target===t.currentTarget&&Yt.resolve(function(){return i.$destroy(!0)})}),i},a.modal.alert=function(e,i){return i=X({bgClose:!1,escClose:!1,labels:a.modal.labels},i),new Yt(function(t){return Mt(a.modal.dialog(' <div class="uk-modal-body">'+(D(e)?e:de(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>'+i.labels.ok+"</button> </div> ",i).$el,"hide",t)})},a.modal.confirm=function(r,o){return o=X({bgClose:!1,escClose:!0,labels:a.modal.labels},o),new Yt(function(e,t){var i=a.modal.dialog(' <form> <div class="uk-modal-body">'+(D(r)?r:de(r))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+o.labels.cancel+'</button> <button class="uk-button uk-button-primary" autofocus>'+o.labels.ok+"</button> </div> </form> ",o),n=!1;Mt(i.$el,"submit","form",function(t){t.preventDefault(),e(),n=!0,i.hide()}),Mt(i.$el,"hide",function(){n||t()})})},a.modal.prompt=function(t,o,s){return s=X({bgClose:!1,escClose:!0,labels:a.modal.labels},s),new Yt(function(e){var i=a.modal.dialog(' <form class="uk-form-stacked"> <div class="uk-modal-body"> <label>'+(D(t)?t:de(t))+'</label> <input class="uk-input" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+s.labels.cancel+'</button> <button class="uk-button uk-button-primary">'+s.labels.ok+"</button> </div> </form> ",s),n=Se("input",i.$el);n.value=o;var r=!1;Mt(i.$el,"submit","form",function(t){t.preventDefault(),e(n.value),r=!0,i.hide()}),Mt(i.$el,"hide",function(){r||e(null)})})},a.modal.labels={ok:"Ok",cancel:"Cancel"}},mixins:[tr],data:{clsPage:"uk-modal-page",selPanel:".uk-modal-dialog",selClose:".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"},events:[{name:"show",self:!0,handler:function(){Me(this.panel,"uk-margin-auto-vertical")?Ae(this.$el,"uk-flex"):He(this.$el,"display","block"),ri(this.$el)}},{name:"hidden",self:!0,handler:function(){He(this.$el,"display",""),Ce(this.$el,"uk-flex")}}]};var nr={extends:en,data:{targets:"> .uk-parent",toggle:"> a",content:"> ul"}},rr={mixins:[Qi,wn],props:{dropdown:String,mode:"list",align:String,offset:Number,boundary:Boolean,boundaryAlign:Boolean,clsDrop:String,delayShow:Number,delayHide:Number,dropbar:Boolean,dropbarMode:String,dropbarAnchor:Boolean,duration:Number},data:{dropdown:".uk-navbar-nav > li",align:Zt?"right":"left",clsDrop:"uk-navbar-dropdown",mode:void 0,offset:void 0,delayShow:void 0,delayHide:void 0,boundaryAlign:void 0,flip:"x",boundary:!0,dropbar:!1,dropbarMode:"slide",dropbarAnchor:!1,duration:200,forceHeight:!0,selMinHeight:".uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle"},computed:{boundary:function(t,e){var i=t.boundary,n=t.boundaryAlign;return!0===i||n?e:i},dropbarAnchor:function(t,e){return at(t.dropbarAnchor,e)},pos:function(t){return"bottom-"+t.align},dropdowns:function(t,e){return Te(t.dropdown+" ."+t.clsDrop,e)}},beforeConnect:function(){var t=this.$props.dropbar;this.dropbar=t&&(at(t,this.$el)||Se("+ .uk-navbar-dropbar",this.$el)||Se("<div></div>")),this.dropbar&&(Ae(this.dropbar,"uk-navbar-dropbar"),"slide"===this.dropbarMode&&Ae(this.dropbar,"uk-navbar-dropbar-slide"))},disconnected:function(){this.dropbar&&ve(this.dropbar)},update:function(){var e=this;this.$create("drop",this.dropdowns.filter(function(t){return!e.getDropdown(t)}),X({},this.$props,{boundary:this.boundary,pos:this.pos,offset:this.dropbar||this.offset}))},events:[{name:"mouseover",delegate:function(){return this.dropdown},handler:function(t){var e=t.current,i=this.getActive();i&&i.toggle&&!Nt(i.toggle.$el,e)&&!i.tracker.movesTo(i.$el)&&i.hide(!1)}},{name:"mouseleave",el:function(){return this.dropbar},handler:function(){var t=this.getActive();t&&!this.dropdowns.some(function(t){return bt(t,":hover")})&&t.hide()}},{name:"beforeshow",capture:!0,filter:function(){return this.dropbar},handler:function(){this.dropbar.parentNode||me(this.dropbarAnchor||this.$el,this.dropbar)}},{name:"show",capture:!0,filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el,n=e.dir;this.clsDrop&&Ae(i,this.clsDrop+"-dropbar"),"bottom"===n&&this.transitionTo(i.offsetHeight+j(He(i,"marginTop"))+j(He(i,"marginBottom")),i)}},{name:"beforehide",filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el,n=this.getActive();bt(this.dropbar,":hover")&&n&&n.$el===i&&t.preventDefault()}},{name:"hide",filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el,n=this.getActive();(!n||n&&n.$el===i)&&this.transitionTo(0)}}],methods:{getActive:function(){var t=this.dropdowns.map(this.getDropdown).filter(function(t){return t&&t.isActive()})[0];return t&&y(t.mode,"hover")&&Nt(t.toggle.$el,this.$el)&&t},transitionTo:function(t,e){var i=this,n=this.dropbar,r=Et(n)?ri(n):0;return He(e=r<t&&e,"clip","rect(0,"+e.offsetWidth+"px,"+r+"px,0)"),ri(n,r),Ue.cancel([e,n]),Yt.all([Ue.start(n,{height:t},this.duration),Ue.start(e,{clip:"rect(0,"+e.offsetWidth+"px,"+t+"px,0)"},this.duration)]).catch(Q).then(function(){He(e,{clip:""}),i.$update(n)})},getDropdown:function(t){return this.$getComponent(t,"drop")||this.$getComponent(t,"dropdown")}}},or={mixins:[tr],args:"mode",props:{mode:String,flip:Boolean,overlay:Boolean},data:{mode:"slide",flip:!1,overlay:!1,clsPage:"uk-offcanvas-page",clsContainer:"uk-offcanvas-container",selPanel:".uk-offcanvas-bar",clsFlip:"uk-offcanvas-flip",clsContainerAnimation:"uk-offcanvas-container-animation",clsSidebarAnimation:"uk-offcanvas-bar-animation",clsMode:"uk-offcanvas",clsOverlay:"uk-offcanvas-overlay",selClose:".uk-offcanvas-close"},computed:{clsFlip:function(t){var e=t.flip,i=t.clsFlip;return e?i:""},clsOverlay:function(t){var e=t.overlay,i=t.clsOverlay;return e?i:""},clsMode:function(t){var e=t.mode;return t.clsMode+"-"+e},clsSidebarAnimation:function(t){var e=t.mode,i=t.clsSidebarAnimation;return"none"===e||"reveal"===e?"":i},clsContainerAnimation:function(t){var e=t.mode,i=t.clsContainerAnimation;return"push"!==e&&"reveal"!==e?"":i},transitionElement:function(t){return"reveal"===t.mode?this.panel.parentNode:this.panel}},events:[{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){var e=t.current;e.hash&&Se(e.hash,document.body)&&this.hide()}},{name:"touchstart",passive:!0,el:function(){return this.panel},handler:function(t){var e=t.targetTouches;1===e.length&&(this.clientY=e[0].clientY)}},{name:"touchmove",self:!0,passive:!1,filter:function(){return this.overlay},handler:function(t){t.cancelable&&t.preventDefault()}},{name:"touchmove",passive:!1,el:function(){return this.panel},handler:function(t){if(1===t.targetTouches.length){var e=event.targetTouches[0].clientY-this.clientY,i=this.panel,n=i.scrollTop,r=i.scrollHeight,o=i.clientHeight;(r<=o||0===n&&0<e||r-n<=o&&e<0)&&t.cancelable&&t.preventDefault()}}},{name:"show",self:!0,handler:function(){"reveal"!==this.mode||Me(this.panel.parentNode,this.clsMode)||(we(this.panel,"<div>"),Ae(this.panel.parentNode,this.clsMode)),He(document.documentElement,"overflowY",this.overlay?"hidden":""),Ae(document.body,this.clsContainer,this.clsFlip),He(document.body,"touch-action","pan-y pinch-zoom"),He(this.$el,"display","block"),Ae(this.$el,this.clsOverlay),Ae(this.panel,this.clsSidebarAnimation,"reveal"!==this.mode?this.clsMode:""),ri(document.body),Ae(document.body,this.clsContainerAnimation),this.clsContainerAnimation&&(sr().content+=",user-scalable=0")}},{name:"hide",self:!0,handler:function(){Ce(document.body,this.clsContainerAnimation),He(document.body,"touch-action","");var t=this.getActive();("none"===this.mode||t&&t!==this&&t!==this.prev)&&zt(this.panel,"transitionend")}},{name:"hidden",self:!0,handler:function(){var t;this.clsContainerAnimation&&((t=sr()).content=t.content.replace(/,user-scalable=0$/,"")),"reveal"===this.mode&&ye(this.panel),Ce(this.panel,this.clsSidebarAnimation,this.clsMode),Ce(this.$el,this.clsOverlay),He(this.$el,"display",""),Ce(document.body,this.clsContainer,this.clsFlip),He(document.documentElement,"overflowY","")}},{name:"swipeLeft swipeRight",handler:function(t){this.isToggled()&&l(t.type,"Left")^this.flip&&this.hide()}}]};function sr(){return Se('meta[name="viewport"]',document.head)||fe(document.head,'<meta name="viewport">')}var ar={mixins:[Qi],props:{selContainer:String,selContent:String},data:{selContainer:".uk-modal",selContent:".uk-modal-dialog"},computed:{container:function(t,e){return xt(e,t.selContainer)},content:function(t,e){return xt(e,t.selContent)}},connected:function(){He(this.$el,"minHeight",150)},update:{read:function(){return!(!this.content||!this.container)&&{current:j(He(this.$el,"maxHeight")),max:Math.max(150,ri(this.container)-(ei(this.content).height-ri(this.$el)))}},write:function(t){var e=t.current,i=t.max;He(this.$el,"maxHeight",i),Math.round(e)!==Math.round(i)&&zt(this.$el,"resize")},events:["resize"]}},hr={props:["width","height"],connected:function(){Ae(this.$el,"uk-responsive-width")},update:{read:function(){return!!(Et(this.$el)&&this.width&&this.height)&&{width:oi(this.$el.parentNode),height:this.height}},write:function(t){ri(this.$el,it.contain({height:this.height,width:this.width},t).height)},events:["resize"]}},cr={props:{duration:Number,offset:Number},data:{duration:1e3,offset:0},methods:{scrollTo:function(i){var n=this;i=i&&Se(i)||document.body;var t=ri(document),e=ri(window),r=ei(i).top-this.offset;if(t<r+e&&(r=t-e),zt(this.$el,"beforescroll",[this,i])){var o=Date.now(),s=window.pageYOffset,a=function(){var t,e=s+(r-s)*(t=Z((Date.now()-o)/n.duration),.5*(1-Math.cos(Math.PI*t)));pi(window,e),e!==r?requestAnimationFrame(a):zt(n.$el,"scrolled",[n,i])};a()}}},events:{click:function(t){t.defaultPrevented||(t.preventDefault(),this.scrollTo(It(decodeURIComponent(this.$el.hash)).substr(1)))}}};var lr={args:"cls",props:{cls:String,target:String,hidden:Boolean,offsetTop:Number,offsetLeft:Number,repeat:Boolean,delay:Number},data:function(){return{cls:!1,target:!1,hidden:!0,offsetTop:0,offsetLeft:0,repeat:!1,delay:0,inViewClass:"uk-scrollspy-inview"}},computed:{elements:function(t,e){var i=t.target;return i?Te(i,e):[e]}},update:[{write:function(){this.hidden&&He(_t(this.elements,":not(."+this.inViewClass+")"),"visibility","hidden")}},{read:function(t){var i=this;t.update&&this.elements.forEach(function(t){var e=t._ukScrollspyState;(e=e||{cls:st(t,"uk-scrollspy-class")||i.cls}).show=di(t,i.offsetTop,i.offsetLeft),t._ukScrollspyState=e})},write:function(r){var o=this;if(!r.update)return this.$emit(),r.update=!0;this.elements.forEach(function(t){var i=t._ukScrollspyState,e=i.cls;if(!i.show||i.inview||i.queued){if(!i.show&&(i.inview||i.queued)&&o.repeat){if(i.abort&&i.abort(),!i.inview)return;He(t,"visibility",o.hidden?"hidden":""),Ce(t,o.inViewClass),Oe(t,e),zt(t,"outview"),o.$update(t),i.inview=!1}}else{var n=function(){He(t,"visibility",""),Ae(t,o.inViewClass),Oe(t,e),zt(t,"inview"),o.$update(t),i.inview=!0,i.abort&&i.abort()};o.delay?(i.queued=!0,r.promise=(r.promise||Yt.resolve()).then(function(){return!i.inview&&new Yt(function(t){var e=setTimeout(function(){n(),t()},r.promise||1===o.elements.length?o.delay:0);i.abort=function(){clearTimeout(e),t(),i.queued=!1}})})):n()}})},events:["scroll","resize"]}]},ur={props:{cls:String,closest:String,scroll:Boolean,overflow:Boolean,offset:Number},data:{cls:"uk-active",closest:!1,scroll:!1,overflow:!0,offset:0},computed:{links:function(t,e){return Te('a[href^="#"]',e).filter(function(t){return t.hash})},elements:function(t){var e=t.closest;return xt(this.links,e||"*")},targets:function(){return Te(this.links.map(function(t){return It(t.hash).substr(1)}).join(","))}},update:[{read:function(){this.scroll&&this.$create("scroll",this.links,{offset:this.offset||0})}},{read:function(o){var s=this,a=window.pageYOffset+this.offset+1,h=ri(document)-ri(window)+this.offset;o.active=!1,this.targets.every(function(t,e){var i=ei(t).top,n=e+1===s.targets.length;if(!s.overflow&&(0===e&&a<i||n&&i+t.offsetTop<a))return!1;if(!n&&ei(s.targets[e+1]).top<=a)return!0;if(h<=a)for(var r=s.targets.length-1;e<r;r--)if(di(s.targets[r])){t=s.targets[r];break}return!(o.active=Se(_t(s.links,'[href="#'+t.id+'"]')))})},write:function(t){var e=t.active;this.links.forEach(function(t){return t.blur()}),Ce(this.elements,this.cls),e&&zt(this.$el,"active",[e,Ae(this.closest?xt(e,this.closest):e,this.cls)])},events:["scroll","resize"]}]},dr={mixins:[Qi,Kn],props:{top:null,bottom:Boolean,offset:Number,animation:String,clsActive:String,clsInactive:String,clsFixed:String,clsBelow:String,selTarget:String,widthElement:Boolean,showOnUp:Boolean,targetOffset:Number},data:{top:0,bottom:!1,offset:0,animation:"",clsActive:"uk-active",clsInactive:"",clsFixed:"uk-sticky-fixed",clsBelow:"uk-sticky-below",selTarget:"",widthElement:!1,showOnUp:!1,targetOffset:!1},computed:{selTarget:function(t,e){var i=t.selTarget;return i&&Se(i,e)||e},widthElement:function(t,e){return at(t.widthElement,e)||this.placeholder},isActive:{get:function(){return Me(this.selTarget,this.clsActive)},set:function(t){t&&!this.isActive?(Ne(this.selTarget,this.clsInactive,this.clsActive),zt(this.$el,"active")):t||Me(this.selTarget,this.clsInactive)||(Ne(this.selTarget,this.clsActive,this.clsInactive),zt(this.$el,"inactive"))}}},connected:function(){this.placeholder=Se("+ .uk-sticky-placeholder",this.$el)||Se('<div class="uk-sticky-placeholder"></div>'),this.isFixed=!1,this.isActive=!1},disconnected:function(){this.isFixed&&(this.hide(),Ce(this.selTarget,this.clsInactive)),ve(this.placeholder),this.placeholder=null,this.widthElement=null},events:[{name:"load hashchange popstate",el:window,handler:function(){var n=this;if(!1!==this.targetOffset&&location.hash&&0<window.pageYOffset){var r=Se(location.hash);r&&yi.read(function(){var t=ei(r).top,e=ei(n.$el).top,i=n.$el.offsetHeight;n.isFixed&&t<=e+i&&e<=t+r.offsetHeight&&pi(window,t-i-(B(n.targetOffset)?n.targetOffset:0)-n.offset)})}}}],update:[{read:function(t,e){var i=t.height;this.isActive&&"update"!==e&&(this.hide(),i=this.$el.offsetHeight,this.show()),i=this.isActive?i:this.$el.offsetHeight,this.topOffset=ei(this.isFixed?this.placeholder:this.$el).top,this.bottomOffset=this.topOffset+i;var n=fr("bottom",this);return this.top=Math.max(j(fr("top",this)),this.topOffset)-this.offset,this.bottom=n&&n-i,this.inactive=!this.matchMedia,{lastScroll:!1,height:i,margins:He(this.$el,["marginTop","marginBottom","marginLeft","marginRight"])}},write:function(t){var e=t.height,i=t.margins,n=this.placeholder;He(n,X({height:e},i)),Nt(n,document)||(me(this.$el,n),nt(n,"hidden","")),this.isActive=this.isActive},events:["resize"]},{read:function(t){var e=t.scroll;return void 0===e&&(e=0),this.width=(Et(this.widthElement)?this.widthElement:this.$el).offsetWidth,this.scroll=window.pageYOffset,{dir:e<=this.scroll?"down":"up",scroll:this.scroll,visible:Et(this.$el),top:mi(this.placeholder)[0]}},write:function(t,e){var i=this,n=t.initTimestamp;void 0===n&&(n=0);var r=t.dir,o=t.lastDir,s=t.lastScroll,a=t.scroll,h=t.top,c=t.visible,l=performance.now();if(!((t.lastScroll=a)<0||a===s||!c||this.disabled||this.showOnUp&&"scroll"!==e||((300<l-n||r!==o)&&(t.initScroll=a,t.initTimestamp=l),t.lastDir=r,this.showOnUp&&Math.abs(t.initScroll-a)<=30&&Math.abs(s-a)<=10)))if(this.inactive||a<this.top||this.showOnUp&&(a<=this.top||"down"===r||"up"===r&&!this.isFixed&&a<=this.bottomOffset)){if(!this.isFixed)return void(Ze.inProgress(this.$el)&&a<h&&(Ze.cancel(this.$el),this.hide()));this.isFixed=!1,this.animation&&a>this.topOffset?(Ze.cancel(this.$el),Ze.out(this.$el,this.animation).then(function(){return i.hide()},Q)):this.hide()}else this.isFixed?this.update():this.animation?(Ze.cancel(this.$el),this.show(),Ze.in(this.$el,this.animation).catch(Q)):this.show()},events:["resize","scroll"]}],methods:{show:function(){this.isFixed=!0,this.update(),nt(this.placeholder,"hidden",null)},hide:function(){this.isActive=!1,Ce(this.$el,this.clsFixed,this.clsBelow),He(this.$el,{position:"",top:"",width:""}),nt(this.placeholder,"hidden","")},update:function(){var t=0!==this.top||this.scroll>this.top,e=Math.max(0,this.offset);this.bottom&&this.scroll>this.bottom-this.offset&&(e=this.bottom-this.scroll),He(this.$el,{position:"fixed",top:e+"px",width:this.width}),this.isActive=t,Oe(this.$el,this.clsBelow,this.scroll>this.bottomOffset),Ae(this.$el,this.clsFixed)}}};function fr(t,e){var i=e.$props,n=e.$el,r=e[t+"Offset"],o=i[t];if(o){if(B(o))return r+j(o);if(D(o)&&o.match(/^-?\d+vh$/))return ri(window)*j(o)/100;var s=!0===o?n.parentNode:at(o,n);return s?ei(s).top+s.offsetHeight:void 0}}var pr,mr={mixins:[tn],args:"connect",props:{connect:String,toggle:String,active:Number,swiping:Boolean},data:{connect:"~.uk-switcher",toggle:"> * > :first-child",active:0,swiping:!0,cls:"uk-active",clsContainer:"uk-switcher",attrItem:"uk-switcher-item",queued:!0},computed:{connects:function(t,e){return ht(t.connect,e)},toggles:function(t,e){return Te(t.toggle,e)}},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(e){e.preventDefault(),this.show(V(this.$el.children).filter(function(t){return Nt(e.current,t)})[0])}},{name:"click",el:function(){return this.connects},delegate:function(){return"["+this.attrItem+"],[data-"+this.attrItem+"]"},handler:function(t){t.preventDefault(),this.show(st(t.current,this.attrItem))}},{name:"swipeRight swipeLeft",filter:function(){return this.swiping},el:function(){return this.connects},handler:function(t){var e=t.type;this.show(l(e,"Left")?"next":"previous")}}],update:function(){var e=this;this.connects.forEach(function(t){return e.updateAria(t.children)});var t=this.$el.children;this.show(_t(t,"."+this.cls)[0]||t[this.active]||t[0]),this.swiping&&He(this.connects,"touch-action","pan-y pinch-zoom")},methods:{index:function(){return!P(this.connects)&&ce(_t(this.connects[0].children,"."+this.cls)[0])},show:function(t){for(var e,i,n=this,r=this.$el.children,o=r.length,s=this.index(),a=0<=s,h="previous"===t?-1:1,c=le(t,r,s),l=0;l<o;l++,c=(c+h+o)%o)if(!bt(this.toggles[c],".uk-disabled *, .uk-disabled, [disabled]")){e=this.toggles[c],i=r[c];break}!i||0<=s&&Me(i,this.cls)||s===c||(Ce(r,this.cls),Ae(i,this.cls),nt(this.toggles,"aria-expanded",!1),nt(e,"aria-expanded",!0),this.connects.forEach(function(t){a?n.toggleElement([t.children[s],t.children[c]]):n.toggleNow(t.children[c])}))}}},gr={mixins:[Qi],extends:mr,props:{media:Boolean},data:{media:960,attrItem:"uk-tab-item"},connected:function(){var t=Me(this.$el,"uk-tab-left")?"uk-tab-left":!!Me(this.$el,"uk-tab-right")&&"uk-tab-right";t&&this.$create("toggle",this.$el,{cls:t,mode:"media",media:this.media})}},vr={mixins:[Kn,tn],args:"target",props:{href:String,target:null,mode:"list"},data:{href:!1,target:!1,mode:"click",queued:!0},computed:{target:function(t,e){var i=t.href,n=t.target;return(n=ht(n||i,e)).length&&n||[e]}},connected:function(){zt(this.target,"updatearia",[this])},events:[{name:oe+" "+se,filter:function(){return y(this.mode,"hover")},handler:function(t){jt(t)||this.toggle("toggle"+(t.type===oe?"show":"hide"))}},{name:"click",filter:function(){return y(this.mode,"click")||ee&&y(this.mode,"hover")},handler:function(t){var e;(xt(t.target,'a[href="#"], a[href=""]')||(e=xt(t.target,"a[href]"))&&(this.cls||!Et(this.target)||e.hash&&bt(this.target,e.hash)))&&t.preventDefault(),this.toggle()}}],update:{read:function(){return!(!y(this.mode,"media")||!this.media)&&{match:this.matchMedia}},write:function(t){var e=t.match,i=this.isToggled(this.target);(e?!i:i)&&this.toggle()},events:["resize"]},methods:{toggle:function(t){zt(this.target,t||"toggle",[this])&&this.toggleElement(this.target)}}};Pi.version="3.1.6",(pr=Pi).component("accordion",en),pr.component("alert",nn),pr.component("cover",hn),pr.component("drop",ln),pr.component("dropdown",un),pr.component("formCustom",dn),pr.component("gif",fn),pr.component("grid",vn),pr.component("heightMatch",bn),pr.component("heightViewport",kn),pr.component("icon",Mn),pr.component("img",Hn),pr.component("leader",Zn),pr.component("margin",pn),pr.component("modal",ir),pr.component("nav",nr),pr.component("navbar",rr),pr.component("offcanvas",or),pr.component("overflowAuto",ar),pr.component("responsive",hr),pr.component("scroll",cr),pr.component("scrollspy",lr),pr.component("scrollspyNav",ur),pr.component("sticky",dr),pr.component("svg",In),pr.component("switcher",mr),pr.component("tab",gr),pr.component("toggle",vr),pr.component("video",an),pr.component("close",Bn),pr.component("marker",On),pr.component("navbarToggleIcon",On),pr.component("overlayIcon",On),pr.component("paginationNext",On),pr.component("paginationPrevious",On),pr.component("searchIcon",zn),pr.component("slidenavNext",Dn),pr.component("slidenavPrevious",Dn),pr.component("spinner",Pn),pr.component("totop",On),pr.use(rn);var wr={mixins:[Qi],props:{date:String,clsWrapper:String},data:{date:"",clsWrapper:".uk-countdown-%unit%"},computed:{date:function(t){var e=t.date;return Date.parse(e)},days:function(t,e){return Se(t.clsWrapper.replace("%unit%","days"),e)},hours:function(t,e){return Se(t.clsWrapper.replace("%unit%","hours"),e)},minutes:function(t,e){return Se(t.clsWrapper.replace("%unit%","minutes"),e)},seconds:function(t,e){return Se(t.clsWrapper.replace("%unit%","seconds"),e)},units:function(){var e=this;return["days","hours","minutes","seconds"].filter(function(t){return e[t]})}},connected:function(){this.start()},disconnected:function(){var e=this;this.stop(),this.units.forEach(function(t){return ue(e[t])})},events:[{name:"visibilitychange",el:document,handler:function(){document.hidden?this.stop():this.start()}}],update:{write:function(){var t,e,n=this,r=(t=this.date,{total:e=t-Date.now(),seconds:e/1e3%60,minutes:e/1e3/60%60,hours:e/1e3/60/60%24,days:e/1e3/60/60/24});r.total<=0&&(this.stop(),r.days=r.hours=r.minutes=r.seconds=0),this.units.forEach(function(t){var e=String(Math.floor(r[t]));e=e.length<2?"0"+e:e;var i=n[t];i.textContent!==e&&((e=e.split("")).length!==i.children.length&&de(i,e.map(function(){return"<span></span>"}).join("")),e.forEach(function(t,e){return i.children[e].textContent=t}))})}},methods:{start:function(){var t=this;this.stop(),this.date&&this.units.length&&(this.$emit(),this.timer=setInterval(function(){return t.$emit()},1e3))},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}}};var br,yr="uk-animation-target",xr={props:{animation:Number},data:{animation:150},computed:{target:function(){return this.$el}},methods:{animate:function(t){var n=this;!function(){if(br)return;(br=fe(document.head,"<style>").sheet).insertRule("."+yr+" > * {\n            margin-top: 0 !important;\n            transform: none !important;\n        }",0)}();var r=V(this.target.children),o=r.map(function(t){return kr(t,!0)}),e=ri(this.target),i=window.pageYOffset;t(),Ue.cancel(this.target),r.forEach(Ue.cancel),$r(this.target),this.$update(this.target),yi.flush();var s=ri(this.target),a=(r=r.concat(V(this.target.children).filter(function(t){return!y(r,t)}))).map(function(t,e){return!!(t.parentNode&&e in o)&&(o[e]?Et(t)?Ir(t):{opacity:0}:{opacity:Et(t)?1:0})});return o=a.map(function(t,e){var i=r[e].parentNode===n.target&&(o[e]||kr(r[e]));if(i)if(t){if(!("opacity"in t)){i.opacity%1?t.opacity=1:delete i.opacity}}else delete i.opacity;return i}),Ae(this.target,yr),r.forEach(function(t,e){return o[e]&&He(t,o[e])}),He(this.target,"height",e),pi(window,i),Yt.all(r.map(function(t,e){return o[e]&&a[e]?Ue.start(t,a[e],n.animation,"ease"):Yt.resolve()}).concat(Ue.start(this.target,{height:s},this.animation,"ease"))).then(function(){r.forEach(function(t,e){return He(t,{display:0===a[e].opacity?"none":"",zIndex:""})}),$r(n.target),n.$update(n.target),yi.flush()},Q)}}};function kr(t,e){var i=He(t,"zIndex");return!!Et(t)&&X({display:"",opacity:e?He(t,"opacity"):"0",pointerEvents:"none",position:"absolute",zIndex:"auto"===i?ce(t):i},Ir(t))}function $r(t){He(t.children,{height:"",left:"",opacity:"",pointerEvents:"",position:"",top:"",width:""}),Ce(t,yr),He(t,"height","")}function Ir(t){var e=t.getBoundingClientRect(),i=e.height,n=e.width,r=ni(t),o=r.top,s=r.left;return{top:o+=j(He(t,"marginTop")),left:s,height:i,width:n}}var Sr={mixins:[xr],args:"target",props:{target:Boolean,selActive:Boolean},data:{target:null,selActive:!1,attrItem:"uk-filter-control",cls:"uk-active",animation:250},computed:{toggles:{get:function(t,e){t.attrItem;return Te("["+this.attrItem+"],[data-"+this.attrItem+"]",e)},watch:function(){this.updateState()}},target:function(t,e){return Se(t.target,e)},children:{get:function(){return V(this.target&&this.target.children)},watch:function(t,e){var i,n;n=e,(i=t).length===n.length&&i.every(function(t){return~n.indexOf(t)})||this.updateState()}}},events:[{name:"click",delegate:function(){return"["+this.attrItem+"],[data-"+this.attrItem+"]"},handler:function(t){t.preventDefault(),this.apply(t.current)}}],connected:function(){var e=this;if(this.updateState(),!1!==this.selActive){var i=Te(this.selActive,this.$el);this.toggles.forEach(function(t){return Oe(t,e.cls,y(i,t))})}},methods:{apply:function(t){this.setState(Er(t,this.attrItem,this.getState()))},getState:function(){var i=this;return this.toggles.filter(function(t){return Me(t,i.cls)}).reduce(function(t,e){return Er(e,i.attrItem,t)},{filter:{"":""},sort:[]})},setState:function(c,t){var l=this;void 0===t&&(t=!0),c=X({filter:{"":""},sort:[]},c),zt(this.$el,"beforeFilter",[this,c]);var u=this.children;this.toggles.forEach(function(t){return Oe(t,l.cls,!!function(t,e,i){var n=i.filter;void 0===n&&(n={"":""});var r=i.sort,o=r[0],s=r[1],a=Tr(t,e),h=a.filter;void 0===h&&(h="");var c=a.group;void 0===c&&(c="");var l=a.sort,u=a.order;void 0===u&&(u="asc");return H(l)?c in n&&h===n[c]||!h&&c&&!(c in n)&&!n[""]:o===l&&s===u}(t,l.attrItem,c))});function e(){var t,e,i=(t=c.filter,e="",K(t,function(t){return e+=t||""}),e);u.forEach(function(t){return He(t,"display",i&&!bt(t,i)?"none":"")});var n,r,o=c.sort,s=o[0],a=o[1];if(s){var h=(n=s,r=a,X([],u).sort(function(t,e){return st(t,n).localeCompare(st(e,n),void 0,{numeric:!0})*("asc"===r||-1)}));q(h,u)||h.forEach(function(t){return fe(l.target,t)})}}t?this.animate(e).then(function(){return zt(l.$el,"afterFilter",[l])}):(e(),zt(this.$el,"afterFilter",[this]))},updateState:function(){var t=this;yi.write(function(){return t.setState(t.getState(),!1)})}}};function Tr(t,e){return Ni(st(t,e),["filter"])}function Er(t,e,i){var n=Tr(t,e),r=n.filter,o=n.group,s=n.sort,a=n.order;return void 0===a&&(a="asc"),(r||H(s))&&(o?r?(delete i.filter[""],i.filter[o]=r):(delete i.filter[o],(P(i.filter)||""in i.filter)&&(i.filter={"":r||""})):i.filter={"":r||""}),H(s)||(i.sort=[s,a]),i}var Ar={slide:{show:function(t){return[{transform:_r(-100*t)},{transform:_r()}]},percent:function(t){return Cr(t)},translate:function(t,e){return[{transform:_r(-100*e*t)},{transform:_r(100*e*(1-t))}]}}};function Cr(t){return Math.abs(He(t,"transform").split(",")[4]/t.offsetWidth)||0}function _r(t,e){return void 0===t&&(t=0),void 0===e&&(e="%"),t+=t?e:"",Jt?"translateX("+t+")":"translate3d("+t+", 0, 0)"}function Nr(t){return"scale3d("+t+", "+t+", 1)"}var Mr=X({},Ar,{fade:{show:function(){return[{opacity:0},{opacity:1}]},percent:function(t){return 1-He(t,"opacity")},translate:function(t){return[{opacity:1-t},{opacity:t}]}},scale:{show:function(){return[{opacity:0,transform:Nr(.8)},{opacity:1,transform:Nr(1)}]},percent:function(t){return 1-He(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Nr(1-.2*t)},{opacity:t,transform:Nr(.8+.2*t)}]}}});function Or(t,e,i){zt(t,Bt(e,!1,!1,i))}var Dr={mixins:[{props:{autoplay:Boolean,autoplayInterval:Number,pauseOnHover:Boolean},data:{autoplay:!1,autoplayInterval:7e3,pauseOnHover:!0},connected:function(){this.autoplay&&this.startAutoplay()},disconnected:function(){this.stopAutoplay()},update:function(){nt(this.slides,"tabindex","-1")},events:[{name:"visibilitychange",el:document,filter:function(){return this.autoplay},handler:function(){document.hidden?this.stopAutoplay():this.startAutoplay()}},{name:"mouseenter",filter:function(){return this.autoplay&&this.pauseOnHover},handler:function(){this.isHovering=!0}},{name:"mouseleave",filter:function(){return this.autoplay&&this.pauseOnHover},handler:function(){this.isHovering=!1}}],methods:{startAutoplay:function(){var t=this;this.stopAutoplay(),this.interval=setInterval(function(){return!Nt(document.activeElement,t.$el)&&!t.isHovering&&!t.stack.length&&t.show("next")},this.autoplayInterval)},stopAutoplay:function(){this.interval&&clearInterval(this.interval)}}},{props:{draggable:Boolean},data:{draggable:!0,threshold:10},created:function(){var n=this;["start","move","end"].forEach(function(t){var i=n[t];n[t]=function(t){var e=Wt(t).x*(Zt?-1:1);n.prevPos=e!==n.pos?n.pos:n.prevPos,n.pos=e,i(t)}})},events:[{name:ie,delegate:function(){return this.selSlides},handler:function(t){var e;!this.draggable||!jt(t)&&(!(e=t.target).children.length&&e.childNodes.length)||0<t.button||this.length<2||this.start(t)}},{name:"touchmove",passive:!1,handler:"move",delegate:function(){return this.selSlides}},{name:"dragstart",handler:function(t){t.preventDefault()}}],methods:{start:function(){var t=this;this.drag=this.pos,this._transitioner?(this.percent=this._transitioner.percent(),this.drag+=this._transitioner.getDistance()*this.percent*this.dir,this._transitioner.cancel(),this._transitioner.translate(this.percent),this.dragging=!0,this.stack=[]):this.prevIndex=this.index;var e="touchmove"!=ne?Mt(document,ne,this.move,{passive:!1}):Q;this.unbindMove=function(){e(),t.unbindMove=null},Mt(window,"scroll",this.unbindMove),Mt(document,re,this.end,!0),He(this.list,"userSelect","none")},move:function(t){var e=this;if(this.unbindMove){var i=this.pos-this.drag;if(!(0==i||this.prevPos===this.pos||!this.dragging&&Math.abs(i)<this.threshold)){He(this.list,"pointerEvents","none"),t.cancelable&&t.preventDefault(),this.dragging=!0,this.dir=i<0?1:-1;for(var n=this.slides,r=this.prevIndex,o=Math.abs(i),s=this.getIndex(r+this.dir,r),a=this._getDistance(r,s)||n[r].offsetWidth;s!==r&&a<o;)this.drag-=a*this.dir,r=s,o-=a,s=this.getIndex(r+this.dir,r),a=this._getDistance(r,s)||n[r].offsetWidth;this.percent=o/a;var h,c=n[r],l=n[s],u=this.index!==s,d=r===s;[this.index,this.prevIndex].filter(function(t){return!y([s,r],t)}).forEach(function(t){zt(n[t],"itemhidden",[e]),d&&(h=!0,e.prevIndex=r)}),(this.index===r&&this.prevIndex!==r||h)&&zt(n[this.index],"itemshown",[this]),u&&(this.prevIndex=r,this.index=s,d||zt(c,"beforeitemhide",[this]),zt(l,"beforeitemshow",[this])),this._transitioner=this._translate(Math.abs(this.percent),c,!d&&l),u&&(d||zt(c,"itemhide",[this]),zt(l,"itemshow",[this]))}}},end:function(){if(Ot(window,"scroll",this.unbindMove),this.unbindMove&&this.unbindMove(),Ot(document,re,this.end,!0),this.dragging)if(this.dragging=null,this.index===this.prevIndex)this.percent=1-this.percent,this.dir*=-1,this._show(!1,this.index,!0),this._transitioner=null;else{var t=(Zt?this.dir*(Zt?1:-1):this.dir)<0==this.prevPos>this.pos;this.index=t?this.index:this.prevIndex,t&&(this.percent=1-this.percent),this.show(0<this.dir&&!t||this.dir<0&&t?"next":"previous",!0)}He(this.list,{userSelect:"",pointerEvents:""}),this.drag=this.percent=null}}},{data:{selNav:!1},computed:{nav:function(t,e){return Se(t.selNav,e)},selNavItem:function(t){var e=t.attrItem;return"["+e+"],[data-"+e+"]"},navItems:function(t,e){return Te(this.selNavItem,e)}},update:{write:function(){var i=this;this.nav&&this.length!==this.nav.children.length&&de(this.nav,this.slides.map(function(t,e){return"<li "+i.attrItem+'="'+e+'"><a href="#"></a></li>'}).join("")),Oe(Te(this.selNavItem,this.$el).concat(this.nav),"uk-hidden",!this.maxIndex),this.updateNav()},events:["resize"]},events:[{name:"click",delegate:function(){return this.selNavItem},handler:function(t){t.preventDefault(),this.show(st(t.current,this.attrItem))}},{name:"itemshow",handler:"updateNav"}],methods:{updateNav:function(){var i=this,n=this.getValidIndex();this.navItems.forEach(function(t){var e=st(t,i.attrItem);Oe(t,i.clsActive,F(e)===n),Oe(t,"uk-invisible",i.finite&&("previous"===e&&0===n||"next"===e&&n>=i.maxIndex))})}}}],props:{clsActivated:Boolean,easing:String,index:Number,finite:Boolean,velocity:Number},data:function(){return{easing:"ease",finite:!1,velocity:1,index:0,prevIndex:-1,stack:[],percent:0,clsActive:"uk-active",clsActivated:!1,Transitioner:!1,transitionOptions:{}}},connected:function(){this.prevIndex=-1,this.index=this.getValidIndex(this.index),this.stack=[]},disconnected:function(){Ce(this.slides,this.clsActive)},computed:{duration:function(t,e){var i=t.velocity;return zr(e.offsetWidth/i)},list:function(t,e){return Se(t.selList,e)},maxIndex:function(){return this.length-1},selSlides:function(t){return t.selList+" > *"},slides:{get:function(){return V(this.list.children)},watch:function(){this.$reset()}},length:function(){return this.slides.length}},events:{itemshown:function(){this.$update(this.list)}},methods:{show:function(t,e){var i=this;if(void 0===e&&(e=!1),!this.dragging&&this.length){var n=this.stack,r=e?0:n.length,o=function(){n.splice(r,1),n.length&&i.show(n.shift(),!0)};if(n[e?"unshift":"push"](t),!e&&1<n.length)2===n.length&&this._transitioner.forward(Math.min(this.duration,200));else{var s=this.index,a=Me(this.slides,this.clsActive)&&this.slides[s],h=this.getIndex(t,this.index),c=this.slides[h];if(a!==c){var l,u;if(this.dir=(u=s,"next"===(l=t)?1:"previous"===l?-1:l<u?-1:1),this.prevIndex=s,this.index=h,a&&zt(a,"beforeitemhide",[this]),!zt(c,"beforeitemshow",[this,a]))return this.index=this.prevIndex,void o();var d=this._show(a,c,e).then(function(){return a&&zt(a,"itemhidden",[i]),zt(c,"itemshown",[i]),new Yt(function(t){yi.write(function(){n.shift(),n.length?i.show(n.shift(),!0):i._transitioner=null,t()})})});return a&&zt(a,"itemhide",[this]),zt(c,"itemshow",[this]),d}o()}}},getIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.index),Z(le(t,this.slides,e,this.finite),0,this.maxIndex)},getValidIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),this.getIndex(t,e)},_show:function(t,e,i){if(this._transitioner=this._getTransitioner(t,e,this.dir,X({easing:i?e.offsetWidth<600?"cubic-bezier(0.25, 0.46, 0.45, 0.94)":"cubic-bezier(0.165, 0.84, 0.44, 1)":this.easing},this.transitionOptions)),!i&&!t)return this._transitioner.translate(1),Yt.resolve();var n=this.stack.length;return this._transitioner[1<n?"forward":"show"](1<n?Math.min(this.duration,75+75/(n-1)):this.duration,this.percent)},_getDistance:function(t,e){return new this._getTransitioner(t,t!==e&&e).getDistance()},_translate:function(t,e,i){void 0===e&&(e=this.prevIndex),void 0===i&&(i=this.index);var n=this._getTransitioner(e!==i&&e,i);return n.translate(t),n},_getTransitioner:function(t,e,i,n){return void 0===t&&(t=this.prevIndex),void 0===e&&(e=this.index),void 0===i&&(i=this.dir||1),void 0===n&&(n=this.transitionOptions),new this.Transitioner(z(t)?this.slides[t]:t,z(e)?this.slides[e]:e,i*(Zt?-1:1),n)}}};function zr(t){return.5*t+300}var Br={mixins:[Dr],props:{animation:String},data:{animation:"slide",clsActivated:"uk-transition-active",Animations:Ar,Transitioner:function(o,s,a,t){var e=t.animation,h=t.easing,i=e.percent,n=e.translate,r=e.show;void 0===r&&(r=Q);var c=r(a),l=new Vt;return{dir:a,show:function(t,e,i){var n=this;void 0===e&&(e=0);var r=i?"linear":h;return t-=Math.round(t*Z(e,-1,1)),this.translate(e),Or(s,"itemin",{percent:e,duration:t,timing:r,dir:a}),Or(o,"itemout",{percent:1-e,duration:t,timing:r,dir:a}),Yt.all([Ue.start(s,c[1],t,r),Ue.start(o,c[0],t,r)]).then(function(){n.reset(),l.resolve()},Q),l.promise},stop:function(){return Ue.stop([s,o])},cancel:function(){Ue.cancel([s,o])},reset:function(){for(var t in c[0])He([s,o],t,"")},forward:function(t,e){return void 0===e&&(e=this.percent()),Ue.cancel([s,o]),this.show(t,e,!0)},translate:function(t){this.reset();var e=n(t,a);He(s,e[1]),He(o,e[0]),Or(s,"itemtranslatein",{percent:t,dir:a}),Or(o,"itemtranslateout",{percent:1-t,dir:a})},percent:function(){return i(o||s,s,a)},getDistance:function(){return o&&o.offsetWidth}}}},computed:{animation:function(t){var e=t.animation,i=t.Animations;return X(e in i?i[e]:i.slide,{name:e})},transitionOptions:function(){return{animation:this.animation}}},events:{"itemshow itemhide itemshown itemhidden":function(t){var e=t.target;this.$update(e)},beforeitemshow:function(t){Ae(t.target,this.clsActive)},itemshown:function(t){Ae(t.target,this.clsActivated)},itemhidden:function(t){Ce(t.target,this.clsActive,this.clsActivated)}}},Pr={mixins:[Qn,tr,tn,Br],functional:!0,props:{delayControls:Number,preload:Number,videoAutoplay:Boolean,template:String},data:function(){return{preload:1,videoAutoplay:!1,delayControls:3e3,items:[],cls:"uk-open",clsPage:"uk-lightbox-page",selList:".uk-lightbox-items",attrItem:"uk-lightbox-item",selClose:".uk-close-large",pauseOnHover:!1,velocity:2,Animations:Mr,template:'<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href="#" uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href="#" uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>'}},created:function(){var t=this;this.$mount(fe(this.container,this.template)),this.caption=Se(".uk-lightbox-caption",this.$el),this.items.forEach(function(){return fe(t.list,"<li></li>")})},events:[{name:ne+" "+ie+" keydown",handler:"showControls"},{name:"click",self:!0,delegate:function(){return this.selSlides},handler:function(t){t.defaultPrevented||this.hide()}},{name:"shown",self:!0,handler:function(){this.showControls()}},{name:"hide",self:!0,handler:function(){this.hideControls(),Ce(this.slides,this.clsActive),Ue.stop(this.slides)}},{name:"hidden",self:!0,handler:function(){this.$destroy(!0)}},{name:"keyup",el:document,handler:function(t){if(this.isToggled(this.$el))switch(t.keyCode){case 37:this.show("previous");break;case 39:this.show("next")}}},{name:"beforeitemshow",handler:function(t){this.isToggled()||(this.draggable=!1,t.preventDefault(),this.toggleNow(this.$el,!0),this.animation=Mr.scale,Ce(t.target,this.clsActive),this.stack.splice(1,0,this.index))}},{name:"itemshow",handler:function(t){var e=ce(t.target),i=this.getItem(e).caption;He(this.caption,"display",i?"":"none"),de(this.caption,i);for(var n=0;n<=this.preload;n++)this.loadItem(this.getIndex(e+n)),this.loadItem(this.getIndex(e-n))}},{name:"itemshown",handler:function(){this.draggable=this.$props.draggable}},{name:"itemload",handler:function(t,r){var o,s=this,e=r.source,i=r.type,n=r.alt;if(this.setItem(r,"<span uk-spinner></span>"),e)if("image"===i||e.match(/\.(jp(e)?g|png|gif|svg|webp)($|\?)/i))Gt(e).then(function(t){return s.setItem(r,'<img width="'+t.width+'" height="'+t.height+'" src="'+e+'" alt="'+(n||"")+'">')},function(){return s.setError(r)});else if("video"===i||e.match(/\.(mp4|webm|ogv)($|\?)/i)){var a=Se("<video controls playsinline"+(r.poster?' poster="'+r.poster+'"':"")+' uk-video="'+this.videoAutoplay+'"></video>');nt(a,"src",e),Dt(a,"error loadedmetadata",function(t){"error"===t?s.setError(r):(nt(a,{width:a.videoWidth,height:a.videoHeight}),s.setItem(r,a))})}else if("iframe"===i||e.match(/\.(html|php)($|\?)/i))this.setItem(r,'<iframe class="uk-lightbox-iframe" src="'+e+'" frameborder="0" allowfullscreen></iframe>');else if(o=e.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/watch\?v=([^&\s]+)/)||e.match(/()youtu\.be\/(.*)/)){var h=o[2],c=function(t,e){return void 0===t&&(t=640),void 0===e&&(e=450),s.setItem(r,Hr("https://www.youtube"+(o[1]||"")+".com/embed/"+h,t,e,s.videoAutoplay))};Gt("https://img.youtube.com/vi/"+h+"/maxresdefault.jpg").then(function(t){var e=t.width,i=t.height;120===e&&90===i?Gt("https://img.youtube.com/vi/"+h+"/0.jpg").then(function(t){var e=t.width,i=t.height;return c(e,i)},c):c(e,i)},c)}else(o=e.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/))&&Kt("https://vimeo.com/api/oembed.json?maxwidth=1920&url="+encodeURI(e),{responseType:"json",withCredentials:!1}).then(function(t){var e=t.response,i=e.height,n=e.width;return s.setItem(r,Hr("https://player.vimeo.com/video/"+o[2],n,i,s.videoAutoplay))},function(){return s.setError(r)})}}],methods:{loadItem:function(t){void 0===t&&(t=this.index);var e=this.getItem(t);e.content||zt(this.$el,"itemload",[e])},getItem:function(t){return void 0===t&&(t=this.index),this.items[t]||{}},setItem:function(t,e){X(t,{content:e});var i=de(this.slides[this.items.indexOf(t)],e);zt(this.$el,"itemloaded",[this,i]),this.$update(i)},setError:function(t){this.setItem(t,'<span uk-icon="icon: bolt; ratio: 2"></span>')},showControls:function(){clearTimeout(this.controlsTimer),this.controlsTimer=setTimeout(this.hideControls,this.delayControls),Ae(this.$el,"uk-active","uk-transition-active")},hideControls:function(){Ce(this.$el,"uk-active","uk-transition-active")}}};function Hr(t,e,i,n){return'<iframe src="'+t+'" width="'+e+'" height="'+i+'" style="max-width: 100%; box-sizing: border-box;" frameborder="0" allowfullscreen uk-video="autoplay: '+n+'" uk-responsive></iframe>'}var Lr,Fr={install:function(t,e){t.lightboxPanel||t.component("lightboxPanel",Pr);X(e.props,t.component("lightboxPanel").options.props)},props:{toggle:String},data:{toggle:"a"},computed:{toggles:{get:function(t,e){return Te(t.toggle,e)},watch:function(){this.hide()}},items:function(){return J(this.toggles.map(jr),"source")}},disconnected:function(){this.hide()},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(t){t.preventDefault();var e=st(t.current,"href");this.show(k(this.items,function(t){return t.source===e}))}}],methods:{show:function(t){var e=this;return this.panel=this.panel||this.$create("lightboxPanel",X({},this.$props,{items:this.items})),Mt(this.panel.$el,"hidden",function(){return e.panel=!1}),this.panel.show(t)},hide:function(){return this.panel&&this.panel.hide()}}};function jr(i){return["href","caption","type","poster","alt"].reduce(function(t,e){return t["href"===e?"source":e]=st(i,e),t},{})}var Wr={},Vr={functional:!0,args:["message","status"],data:{message:"",status:"",timeout:5e3,group:null,pos:"top-center",clsClose:"uk-notification-close",clsMsg:"uk-notification-message"},install:function(r){r.notification.closeAll=function(i,n){Ie(document.body,function(t){var e=r.getComponent(t,"notification");!e||i&&i!==e.group||e.close(n)})}},computed:{marginProp:function(t){return"margin"+(w(t.pos,"top")?"Top":"Bottom")},startProps:function(){var t;return(t={opacity:0})[this.marginProp]=-this.$el.offsetHeight,t}},created:function(){Wr[this.pos]||(Wr[this.pos]=fe(this.$container,'<div class="uk-notification uk-notification-'+this.pos+'"></div>'));var t=He(Wr[this.pos],"display","block");this.$mount(fe(t,'<div class="'+this.clsMsg+(this.status?" "+this.clsMsg+"-"+this.status:"")+'"> <a href="#" class="'+this.clsClose+'" data-uk-close></a> <div>'+this.message+"</div> </div>"))},connected:function(){var t,e=this,i=j(He(this.$el,this.marginProp));Ue.start(He(this.$el,this.startProps),((t={opacity:1})[this.marginProp]=i,t)).then(function(){e.timeout&&(e.timer=setTimeout(e.close,e.timeout))})},events:((Lr={click:function(t){xt(t.target,'a[href="#"],a[href=""]')&&t.preventDefault(),this.close()}})[oe]=function(){this.timer&&clearTimeout(this.timer)},Lr[se]=function(){this.timeout&&(this.timer=setTimeout(this.close,this.timeout))},Lr),methods:{close:function(t){function e(){zt(i.$el,"close",[i]),ve(i.$el),Wr[i.pos].children.length||He(Wr[i.pos],"display","none")}var i=this;this.timer&&clearTimeout(this.timer),t?e():Ue.start(this.$el,this.startProps).then(e)}}};var Yr=["x","y","bgx","bgy","rotate","scale","color","backgroundColor","borderColor","opacity","blur","hue","grayscale","invert","saturate","sepia","fopacity","stroke"],Rr={mixins:[Kn],props:Yr.reduce(function(t,e){return t[e]="list",t},{}),data:Yr.reduce(function(t,e){return t[e]=void 0,t},{}),computed:{props:function(m,g){var v=this;return Yr.reduce(function(t,e){if(H(m[e]))return t;var i,n,r,o=e.match(/color/i),s=o||"opacity"===e,a=m[e].slice(0);s&&He(g,e,""),a.length<2&&a.unshift(("scale"===e?1:s?He(g,e):0)||0);var h=a.reduce(function(t,e){return D(e)&&e.replace(/-|\d/g,"").trim()||t},"");if(o){var c=g.style.color;a=a.map(function(t){return He(He(g,"color",t),"color").split(/[(),]/g).slice(1,-1).concat(1).slice(0,4).map(j)}),g.style.color=c}else if(w(e,"bg")){var l="bgy"===e?"height":"width";if(a=a.map(function(t){return gi(t,l,v.$el)}),He(g,"background-position-"+e[2],""),n=He(g,"backgroundPosition").split(" ")["x"===e[2]?0:1],v.covers){var u=Math.min.apply(Math,a),d=Math.max.apply(Math,a),f=a.indexOf(u)<a.indexOf(d);r=d-u,a=a.map(function(t){return t-(f?u:d)}),i=(f?-r:0)+"px"}else i=n}else a=a.map(j);if("stroke"===e){if(!a.some(function(t){return t}))return t;var p=An(v.$el);He(g,"strokeDasharray",p),"%"===h&&(a=a.map(function(t){return t*p/100})),a=a.reverse(),e="strokeDashoffset"}return t[e]={steps:a,unit:h,pos:i,bgPos:n,diff:r},t},{})},bgProps:function(){var e=this;return["bgx","bgy"].filter(function(t){return t in e.props})},covers:function(t,e){return n=(i=e).style.backgroundSize,r="cover"===He(He(i,"backgroundSize",""),"backgroundSize"),i.style.backgroundSize=n,r;var i,n,r}},disconnected:function(){delete this._image},update:{read:function(t){var h=this;if(t.active=this.matchMedia,t.active){if(!t.image&&this.covers&&this.bgProps.length){var e=He(this.$el,"backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/,"$1");if(e){var i=new Image;i.src=e,(t.image=i).naturalWidth||(i.onload=function(){return h.$emit()})}}var n=t.image;if(n&&n.naturalWidth){var c={width:this.$el.offsetWidth,height:this.$el.offsetHeight},l={width:n.naturalWidth,height:n.naturalHeight},u=it.cover(l,c);this.bgProps.forEach(function(t){var e=h.props[t],i=e.diff,n=e.bgPos,r=e.steps,o="bgy"===t?"height":"width",s=u[o]-c[o];if(s<i)c[o]=u[o]+i-s;else if(i<s){var a=c[o]/gi(n,o,h.$el);a&&(h.props[t].steps=r.map(function(t){return t-(s-i)/a}))}u=it.cover(l,c)}),t.dim=u}}},write:function(t){var e=t.dim;t.active?e&&He(this.$el,{backgroundSize:e.width+"px "+e.height+"px",backgroundRepeat:"no-repeat"}):He(this.$el,{backgroundSize:"",backgroundRepeat:""})},events:["resize"]},methods:{reset:function(){var i=this;K(this.getCss(0),function(t,e){return He(i.$el,e,"")})},getCss:function(u){var d=this.props;return Object.keys(d).reduce(function(t,e){var i=d[e],n=i.steps,r=i.unit,o=i.pos,s=function(t,e,i){void 0===i&&(i=2);var n=qr(t,e),r=n[0],o=n[1],s=n[2];return(z(r)?r+Math.abs(r-o)*s*(r<o?1:-1):+o).toFixed(i)}(n,u);switch(e){case"x":case"y":r=r||"px",t.transform+=" translate"+m(e)+"("+j(s).toFixed("px"===r?0:2)+r+")";break;case"rotate":r=r||"deg",t.transform+=" rotate("+(s+r)+")";break;case"scale":t.transform+=" scale("+s+")";break;case"bgy":case"bgx":t["background-position-"+e[2]]="calc("+o+" + "+s+"px)";break;case"color":case"backgroundColor":case"borderColor":var a=qr(n,u),h=a[0],c=a[1],l=a[2];t[e]="rgba("+h.map(function(t,e){return t+=l*(c[e]-t),3===e?j(t):parseInt(t,10)}).join(",")+")";break;case"blur":r=r||"px",t.filter+=" blur("+(s+r)+")";break;case"hue":r=r||"deg",t.filter+=" hue-rotate("+(s+r)+")";break;case"fopacity":r=r||"%",t.filter+=" opacity("+(s+r)+")";break;case"grayscale":case"invert":case"saturate":case"sepia":r=r||"%",t.filter+=" "+e+"("+(s+r)+")";break;default:t[e]=s}return t},{transform:"",filter:""})}}};function qr(t,e){var i=t.length-1,n=Math.min(Math.floor(i*e),i-1),r=t.slice(n,n+2);return r.push(1===e?1:e%(1/i)*i),r}var Ur={mixins:[Rr],props:{target:String,viewport:Number,easing:Number},data:{target:!1,viewport:1,easing:1},computed:{target:function(t,e){var i=t.target;return function t(e){return e?"offsetTop"in e?e:t(e.parentNode):document.body}(i&&at(i,e)||e)}},update:{read:function(t,e){var i=t.percent;if("scroll"!==e&&(i=!1),t.active){var n,r,o=i;return n=fi(this.target)/(this.viewport||1),r=this.easing,{percent:i=Z(n*(1-(r-r*n))),style:o!==i&&this.getCss(i)}}},write:function(t){var e=t.style;t.active?e&&He(this.$el,e):this.reset()},events:["scroll","resize"]}};var Xr={update:{write:function(){if(!this.stack.length&&!this.dragging){var t=this.getValidIndex(this.index);~this.prevIndex&&this.index===t||this.show(t)}},events:["resize"]}};function Kr(t,e,i){var n,r=Zr(t,e);return i?r-(n=t,Qr(e).width/2-Qr(n).width/2):Math.min(r,Gr(e))}function Gr(t){return Math.max(0,Jr(t)-Qr(t).width)}function Jr(t){return eo(t).reduce(function(t,e){return Qr(e).width+t},0)}function Zr(t,e){return(ni(t).left+(Zt?Qr(t).width-Qr(e).width:0))*(Zt?-1:1)}function Qr(t){return t.getBoundingClientRect()}function to(t,e,i){zt(t,Bt(e,!1,!1,i))}function eo(t){return V(t.children)}var io={mixins:[Qi,Dr,Xr],props:{center:Boolean,sets:Boolean},data:{center:!1,sets:!1,attrItem:"uk-slider-item",selList:".uk-slider-items",selNav:".uk-slider-nav",clsContainer:"uk-slider-container",Transitioner:function(r,n,o,t){var e=t.center,s=t.easing,a=t.list,h=new Vt,i=r?Kr(r,a,e):Kr(n,a,e)+Qr(n).width*o,c=n?Kr(n,a,e):i+Qr(r).width*o*(Zt?-1:1);return{dir:o,show:function(t,e,i){void 0===e&&(e=0);var n=i?"linear":s;return t-=Math.round(t*Z(e,-1,1)),this.translate(e),r&&this.updateTranslates(),e=r?e:Z(e,0,1),to(this.getItemIn(),"itemin",{percent:e,duration:t,timing:n,dir:o}),r&&to(this.getItemIn(!0),"itemout",{percent:1-e,duration:t,timing:n,dir:o}),Ue.start(a,{transform:_r(-c*(Zt?-1:1),"px")},t,n).then(h.resolve,Q),h.promise},stop:function(){return Ue.stop(a)},cancel:function(){Ue.cancel(a)},reset:function(){He(a,"transform","")},forward:function(t,e){return void 0===e&&(e=this.percent()),Ue.cancel(a),this.show(t,e,!0)},translate:function(t){var e=this.getDistance()*o*(Zt?-1:1);He(a,"transform",_r(Z(e-e*t-c,-Jr(a),Qr(a).width)*(Zt?-1:1),"px")),this.updateTranslates(),r&&(t=Z(t,-1,1),to(this.getItemIn(),"itemtranslatein",{percent:t,dir:o}),to(this.getItemIn(!0),"itemtranslateout",{percent:1-t,dir:o}))},percent:function(){return Math.abs((He(a,"transform").split(",")[4]*(Zt?-1:1)+i)/(c-i))},getDistance:function(){return Math.abs(c-i)},getItemIn:function(t){void 0===t&&(t=!1);var e=this.getActives(),i=G(eo(a),"offsetLeft"),n=ce(i,e[0<o*(t?-1:1)?e.length-1:0]);return~n&&i[n+(r&&!t?o:0)]},getActives:function(){var i=Kr(r||n,a,e);return G(eo(a).filter(function(t){var e=Zr(t,a);return i<=e&&e+Qr(t).width<=Qr(a).width+i}),"offsetLeft")},updateTranslates:function(){var i=this.getActives();eo(a).forEach(function(t){var e=y(i,t);to(t,"itemtranslate"+(e?"in":"out"),{percent:e?1:0,dir:t.offsetLeft<=n.offsetLeft?1:-1})})}}}},computed:{avgWidth:function(){return Jr(this.list)/this.length},finite:function(t){return t.finite||Jr(this.list)<Qr(this.list).width+eo(this.list).reduce(function(t,e){return Math.max(t,Qr(e).width)},0)+this.center},maxIndex:function(){if(!this.finite||this.center&&!this.sets)return this.length-1;if(this.center)return this.sets[this.sets.length-1];He(this.slides,"order","");for(var t=Gr(this.list),e=this.length;e--;)if(Zr(this.list.children[e],this.list)<t)return Math.min(e+1,this.length-1);return 0},sets:function(t){var o=this,e=t.sets,s=Qr(this.list).width/(this.center?2:1),a=0,h=s,c=0;return!P(e=e&&this.slides.reduce(function(t,e,i){var n=Qr(e).width;if(a<c+n&&(!o.center&&i>o.maxIndex&&(i=o.maxIndex),!y(t,i))){var r=o.slides[i+1];o.center&&r&&n<h-Qr(r).width/2?h-=n:(h=s,t.push(i),a=c+s+(o.center?n/2:0))}return c+=n,t},[]))&&e},transitionOptions:function(){return{center:this.center,list:this.list}}},connected:function(){Oe(this.$el,this.clsContainer,!Se("."+this.clsContainer,this.$el))},update:{write:function(){var i=this;Te("["+this.attrItem+"],[data-"+this.attrItem+"]",this.$el).forEach(function(t){var e=st(t,i.attrItem);i.maxIndex&&Oe(t,"uk-hidden",B(e)&&(i.sets&&!y(i.sets,j(e))||e>i.maxIndex))}),this.dragging||this.stack.length||this._getTransitioner().translate(1)},events:["resize"]},events:{beforeitemshow:function(t){!this.dragging&&this.sets&&this.stack.length<2&&!y(this.sets,this.index)&&(this.index=this.getValidIndex());var e=Math.abs(this.index-this.prevIndex+(0<this.dir&&this.index<this.prevIndex||this.dir<0&&this.index>this.prevIndex?(this.maxIndex+1)*this.dir:0));if(!this.dragging&&1<e){for(var i=0;i<e;i++)this.stack.splice(1,0,0<this.dir?"next":"previous");t.preventDefault()}else this.duration=zr(this.avgWidth/this.velocity)*(Qr(this.dir<0||!this.slides[this.prevIndex]?this.slides[this.index]:this.slides[this.prevIndex]).width/this.avgWidth),this.reorder()},itemshow:function(){H(this.prevIndex)||Ae(this._getTransitioner().getItemIn(),this.clsActive)},itemshown:function(){var e=this,i=this._getTransitioner(this.index).getActives();this.slides.forEach(function(t){return Oe(t,e.clsActive,y(i,t))}),this.sets&&!y(this.sets,j(this.index))||this.slides.forEach(function(t){return Oe(t,e.clsActivated,y(i,t))})}},methods:{reorder:function(){var i=this;if(He(this.slides,"order",""),!this.finite){var n=0<this.dir&&this.slides[this.prevIndex]?this.prevIndex:this.index;if(this.slides.forEach(function(t,e){return He(t,"order",0<i.dir&&e<n?1:i.dir<0&&e>=i.index?-1:"")}),this.center)for(var t=this.slides[n],e=Qr(this.list).width/2-Qr(t).width/2,r=0;0<e;){var o=this.getIndex(--r+n,n),s=this.slides[o];He(s,"order",n<o?-2:-1),e-=Qr(s).width}}},getValidIndex:function(t,e){if(void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),t=this.getIndex(t,e),!this.sets)return t;var i;do{if(y(this.sets,t))return t;i=t,t=this.getIndex(t+this.dir,e)}while(t!==i);return t}}},no={mixins:[Rr],data:{selItem:"!li"},computed:{item:function(t,e){return at(t.selItem,e)}},events:[{name:"itemshown",self:!0,el:function(){return this.item},handler:function(){He(this.$el,this.getCss(.5))}},{name:"itemin itemout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,i=t.detail,n=i.percent,r=i.duration,o=i.timing,s=i.dir;Ue.cancel(this.$el),He(this.$el,this.getCss(oo(e,s,n))),Ue.start(this.$el,this.getCss(ro(e)?.5:0<s?1:0),r,o).catch(Q)}},{name:"transitioncanceled transitionend",self:!0,el:function(){return this.item},handler:function(){Ue.cancel(this.$el)}},{name:"itemtranslatein itemtranslateout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,i=t.detail,n=i.percent,r=i.dir;Ue.cancel(this.$el),He(this.$el,this.getCss(oo(e,r,n)))}}]};function ro(t){return l(t,"in")}function oo(t,e,i){return i/=2,ro(t)?e<0?1-i:i:e<0?i:1-i}var so,ao=X({},Ar,{fade:{show:function(){return[{opacity:0,zIndex:0},{zIndex:-1}]},percent:function(t){return 1-He(t,"opacity")},translate:function(t){return[{opacity:1-t,zIndex:0},{zIndex:-1}]}},scale:{show:function(){return[{opacity:0,transform:Nr(1.5),zIndex:0},{zIndex:-1}]},percent:function(t){return 1-He(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Nr(1+.5*t),zIndex:0},{zIndex:-1}]}},pull:{show:function(t){return t<0?[{transform:_r(30),zIndex:-1},{transform:_r(),zIndex:0}]:[{transform:_r(-100),zIndex:0},{transform:_r(),zIndex:-1}]},percent:function(t,e,i){return i<0?1-Cr(e):Cr(t)},translate:function(t,e){return e<0?[{transform:_r(30*t),zIndex:-1},{transform:_r(-100*(1-t)),zIndex:0}]:[{transform:_r(100*-t),zIndex:0},{transform:_r(30*(1-t)),zIndex:-1}]}},push:{show:function(t){return t<0?[{transform:_r(100),zIndex:0},{transform:_r(),zIndex:-1}]:[{transform:_r(-30),zIndex:-1},{transform:_r(),zIndex:0}]},percent:function(t,e,i){return 0<i?1-Cr(e):Cr(t)},translate:function(t,e){return e<0?[{transform:_r(100*t),zIndex:0},{transform:_r(-30*(1-t)),zIndex:-1}]:[{transform:_r(-30*t),zIndex:-1},{transform:_r(100*(1-t)),zIndex:0}]}}}),ho={mixins:[Qi,Br,Xr],props:{ratio:String,minHeight:Number,maxHeight:Number},data:{ratio:"16:9",minHeight:!1,maxHeight:!1,selList:".uk-slideshow-items",attrItem:"uk-slideshow-item",selNav:".uk-slideshow-nav",Animations:ao},update:{read:function(){var t=this.ratio.split(":").map(Number),e=t[0],i=t[1];return i=i*this.list.offsetWidth/e||0,this.minHeight&&(i=Math.max(this.minHeight,i)),this.maxHeight&&(i=Math.min(this.maxHeight,i)),{height:i-ai(this.list,"content-box")}},write:function(t){var e=t.height;He(this.list,"minHeight",e)},events:["resize"]}},co={mixins:[Qi,xr],props:{group:String,threshold:Number,clsItem:String,clsPlaceholder:String,clsDrag:String,clsDragState:String,clsBase:String,clsNoDrag:String,clsEmpty:String,clsCustom:String,handle:String},data:{group:!1,threshold:5,clsItem:"uk-sortable-item",clsPlaceholder:"uk-sortable-placeholder",clsDrag:"uk-sortable-drag",clsDragState:"uk-drag",clsBase:"uk-sortable",clsNoDrag:"uk-sortable-nodrag",clsEmpty:"uk-sortable-empty",clsCustom:"",handle:!1},created:function(){var o=this;["init","start","move","end"].forEach(function(t){var r=o[t];o[t]=function(t){o.scrollY=window.pageYOffset;var e=Wt(t,"page"),i=e.x,n=e.y;o.pos={x:i,y:n},r(t)}})},events:{name:ie,passive:!1,handler:"init"},update:{write:function(){if(this.clsEmpty&&Oe(this.$el,this.clsEmpty,P(this.$el.children)),He(this.handle?Te(this.handle,this.$el):this.$el.children,{touchAction:"none",userSelect:"none"}),this.drag){ei(this.drag,{top:this.pos.y+this.origin.top,left:this.pos.x+this.origin.left});var t,e=ei(this.drag),i=e.top,n=i+e.height;0<i&&i<this.scrollY?t=this.scrollY-5:n<ri(document)&&n>ri(window)+this.scrollY&&(t=this.scrollY+5),t&&setTimeout(function(){return pi(window,t)},5)}}},methods:{init:function(t){var e=t.target,i=t.button,n=t.defaultPrevented,r=V(this.$el.children).filter(function(t){return Nt(e,t)})[0];!r||n||0<i||Ct(e)||Nt(e,"."+this.clsNoDrag)||this.handle&&!Nt(e,this.handle)||(t.preventDefault(),this.touched=[this],this.placeholder=r,this.origin=X({target:e,index:ce(r)},this.pos),Mt(document,ne,this.move),Mt(document,re,this.end),Mt(window,"scroll",this.scroll),this.threshold||this.start(t))},start:function(t){this.drag=fe(this.$container,this.placeholder.outerHTML.replace(/^<li/i,"<div").replace(/li>$/i,"div>")),He(this.drag,X({boxSizing:"border-box",width:this.placeholder.offsetWidth,height:this.placeholder.offsetHeight},He(this.placeholder,["paddingLeft","paddingRight","paddingTop","paddingBottom"]))),nt(this.drag,"uk-no-boot",""),Ae(this.drag,this.clsDrag,this.clsCustom),ri(this.drag.firstElementChild,ri(this.placeholder.firstElementChild));var e=ei(this.placeholder),i=e.left,n=e.top;X(this.origin,{left:i-this.pos.x,top:n-this.pos.y}),Ae(this.placeholder,this.clsPlaceholder),Ae(this.$el.children,this.clsItem),Ae(document.documentElement,this.clsDragState),zt(this.$el,"start",[this,this.placeholder]),this.move(t)},move:function(t){if(this.drag){this.$emit();var e="mousemove"===t.type?t.target:document.elementFromPoint(this.pos.x-window.pageXOffset,this.pos.y-window.pageYOffset),i=this.getSortable(e),n=this.getSortable(this.placeholder),r=i!==n;if(i&&!Nt(e,this.placeholder)&&(!r||i.group&&i.group===n.group)){if(e=i.$el===e.parentNode&&e||V(i.$el.children).filter(function(t){return Nt(e,t)})[0],r)n.remove(this.placeholder);else if(!e)return;i.insert(this.placeholder,e),y(this.touched,i)||this.touched.push(i)}}else(Math.abs(this.pos.x-this.origin.x)>this.threshold||Math.abs(this.pos.y-this.origin.y)>this.threshold)&&this.start(t)},end:function(t){if(Ot(document,ne,this.move),Ot(document,re,this.end),Ot(window,"scroll",this.scroll),this.drag){var e=this.getSortable(this.placeholder);this===e?this.origin.index!==ce(this.placeholder)&&zt(this.$el,"moved",[this,this.placeholder]):(zt(e.$el,"added",[e,this.placeholder]),zt(this.$el,"removed",[this,this.placeholder])),zt(this.$el,"stop",[this,this.placeholder]),ve(this.drag),this.drag=null;var i=this.touched.map(function(t){return t.clsPlaceholder+" "+t.clsItem}).join(" ");this.touched.forEach(function(t){return Ce(t.$el.children,i)}),Ce(document.documentElement,this.clsDragState)}else"touchend"===t.type&&t.target.click()},scroll:function(){var t=window.pageYOffset;t!==this.scrollY&&(this.pos.y+=t-this.scrollY,this.scrollY=t,this.$emit())},insert:function(i,n){var r=this;Ae(this.$el.children,this.clsItem);function t(){var t,e;n?!Nt(i,r.$el)||(e=n,(t=i).parentNode===e.parentNode&&ce(t)>ce(e))?pe(n,i):me(n,i):fe(r.$el,i)}this.animation?this.animate(t):t()},remove:function(t){Nt(t,this.$el)&&(He(this.handle?Te(this.handle,t):t,{touchAction:"",userSelect:""}),this.animation?this.animate(function(){return ve(t)}):ve(t))},getSortable:function(t){return t&&(this.$getComponent(t,"sortable")||this.getSortable(t.parentNode))}}};var lo,uo,fo,po=[],mo={mixins:[Qn,tn,cn],args:"title",props:{delay:Number,title:String},data:{pos:"top",title:"",delay:0,animation:["uk-animation-scale-up"],duration:100,cls:"uk-active",clsPos:"uk-tooltip"},beforeConnect:function(){this._hasTitle=rt(this.$el,"title"),nt(this.$el,{title:"","aria-expanded":!1})},disconnected:function(){this.hide(),nt(this.$el,{title:this._hasTitle?this.title:null,"aria-expanded":null})},methods:{show:function(){var e=this;this.isActive()||(po.forEach(function(t){return t.hide()}),po.push(this),this._unbind=Mt(document,re,function(t){return!Nt(t.target,e.$el)&&e.hide()}),clearTimeout(this.showTimer),this.showTimer=setTimeout(function(){e._show(),e.hideTimer=setInterval(function(){Et(e.$el)||e.hide()},150)},this.delay))},hide:function(){!this.isActive()||bt(this.$el,"input")&&this.$el===document.activeElement||(po.splice(po.indexOf(this),1),clearTimeout(this.showTimer),clearInterval(this.hideTimer),nt(this.$el,"aria-expanded",!1),this.toggleElement(this.tooltip,!1),this.tooltip&&ve(this.tooltip),this.tooltip=!1,this._unbind())},_show:function(){this.tooltip=fe(this.container,'<div class="'+this.clsPos+'" aria-expanded="true" aria-hidden> <div class="'+this.clsPos+'-inner">'+this.title+"</div> </div>"),this.positionAt(this.tooltip,this.$el),this.origin="y"===this.getAxis()?ui(this.dir)+"-"+this.align:this.align+"-"+ui(this.dir),this.toggleElement(this.tooltip,!0)},isActive:function(){return y(po,this)}},events:((so={focus:"show",blur:"hide"})[oe+" "+se]=function(t){jt(t)||(t.type===oe?this.show():this.hide())},so[ie]=function(t){jt(t)&&(this.isActive()?this.hide():this.show())},so)},go={props:{allow:String,clsDragover:String,concurrent:Number,maxSize:Number,method:String,mime:String,msgInvalidMime:String,msgInvalidName:String,msgInvalidSize:String,multiple:Boolean,name:String,params:Object,type:String,url:String},data:{allow:!1,clsDragover:"uk-dragover",concurrent:1,maxSize:0,method:"POST",mime:!1,msgInvalidMime:"Invalid File Type: %s",msgInvalidName:"Invalid File Name: %s",msgInvalidSize:"Invalid File Size: %s Kilobytes Max",multiple:!1,name:"files[]",params:{},type:"",url:"",abort:Q,beforeAll:Q,beforeSend:Q,complete:Q,completeAll:Q,error:Q,fail:Q,load:Q,loadEnd:Q,loadStart:Q,progress:Q},events:{change:function(t){bt(t.target,'input[type="file"]')&&(t.preventDefault(),t.target.files&&this.upload(t.target.files),t.target.value="")},drop:function(t){wo(t);var e=t.dataTransfer;e&&e.files&&(Ce(this.$el,this.clsDragover),this.upload(e.files))},dragenter:function(t){wo(t)},dragover:function(t){wo(t),Ae(this.$el,this.clsDragover)},dragleave:function(t){wo(t),Ce(this.$el,this.clsDragover)}},methods:{upload:function(t){var n=this;if(t.length){zt(this.$el,"upload",[t]);for(var e=0;e<t.length;e++){if(this.maxSize&&1e3*this.maxSize<t[e].size)return void this.fail(this.msgInvalidSize.replace("%s",this.maxSize));if(this.allow&&!vo(this.allow,t[e].name))return void this.fail(this.msgInvalidName.replace("%s",this.allow));if(this.mime&&!vo(this.mime,t[e].type))return void this.fail(this.msgInvalidMime.replace("%s",this.mime))}this.multiple||(t=[t[0]]),this.beforeAll(this,t);var r=function(t,e){for(var i=[],n=0;n<t.length;n+=e){for(var r=[],o=0;o<e;o++)r.push(t[n+o]);i.push(r)}return i}(t,this.concurrent),o=function(t){var e=new FormData;for(var i in t.forEach(function(t){return e.append(n.name,t)}),n.params)e.append(i,n.params[i]);Kt(n.url,{data:e,method:n.method,responseType:n.type,beforeSend:function(t){var e=t.xhr;e.upload&&Mt(e.upload,"progress",n.progress),["loadStart","load","loadEnd","abort"].forEach(function(t){return Mt(e,t.toLowerCase(),n[t])}),n.beforeSend(t)}}).then(function(t){n.complete(t),r.length?o(r.shift()):n.completeAll(t)},function(t){return n.error(t)})};o(r.shift())}}}};function vo(t,e){return e.match(new RegExp("^"+t.replace(/\//g,"\\/").replace(/\*\*/g,"(\\/[^\\/]+)*").replace(/\*/g,"[^\\/]+").replace(/((?!\\))\?/g,"$1.")+"$","i"))}function wo(t){t.preventDefault(),t.stopPropagation()}function bo(){xo(document.body,uo),yi.flush(),new MutationObserver(function(t){return t.forEach(yo)}).observe(document,{childList:!0,subtree:!0,characterData:!0,attributes:!0}),lo._initialized=!0}function yo(t){var e=t.target;("attributes"!==t.type?function(t){for(var e=t.addedNodes,i=t.removedNodes,n=0;n<e.length;n++)xo(e[n],uo);for(var r=0;r<i.length;r++)xo(i[r],fo);return!0}(t):function(t){var e=t.target,i=t.attributeName;if("href"===i)return!0;var n=Bi(i);if(!(n&&n in lo))return;if(rt(e,i))return lo[n](e),!0;var r=lo.getComponent(e,n);if(r)return r.$destroy(),!0}(t))&&lo.update(e)}function xo(t,e){if(1===t.nodeType&&!rt(t,"uk-no-boot"))for(e(t),t=t.firstElementChild;t;){var i=t.nextElementSibling;xo(t,e),t=i}}return Pi.component("countdown",wr),Pi.component("filter",Sr),Pi.component("lightbox",Fr),Pi.component("lightboxPanel",Pr),Pi.component("notification",Vr),Pi.component("parallax",Ur),Pi.component("slider",io),Pi.component("sliderParallax",no),Pi.component("slideshow",ho),Pi.component("slideshowParallax",no),Pi.component("sortable",co),Pi.component("tooltip",mo),Pi.component("upload",go),uo=(lo=Pi).connect,fo=lo.disconnect,"MutationObserver"in window&&(document.body?bo():new MutationObserver(function(){document.body&&(this.disconnect(),bo())}).observe(document,{childList:!0,subtree:!0})),Pi});;
/*! UIkit 3.1.6 | http://www.getuikit.com | (c) 2014 - 2018 YOOtheme | MIT License */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("uikiticons",e):(t=t||self).UIkitIcons=e()}(this,function(){"use strict";function e(t){e.installed||t.icon.add({"500px":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.624,11.866c-0.141,0.132,0.479,0.658,0.662,0.418c0.051-0.046,0.607-0.61,0.662-0.664c0,0,0.738,0.719,0.814,0.719 c0.1,0,0.207-0.055,0.322-0.17c0.27-0.269,0.135-0.416,0.066-0.495l-0.631-0.616l0.658-0.668c0.146-0.156,0.021-0.314-0.1-0.449 c-0.182-0.18-0.359-0.226-0.471-0.125l-0.656,0.654l-0.654-0.654c-0.033-0.034-0.08-0.045-0.124-0.045 c-0.079,0-0.191,0.068-0.307,0.181c-0.202,0.202-0.247,0.351-0.133,0.462l0.665,0.665L9.624,11.866z"/><path d="M11.066,2.884c-1.061,0-2.185,0.248-3.011,0.604c-0.087,0.034-0.141,0.106-0.15,0.205C7.893,3.784,7.919,3.909,7.982,4.066 c0.05,0.136,0.187,0.474,0.452,0.372c0.844-0.326,1.779-0.507,2.633-0.507c0.963,0,1.9,0.191,2.781,0.564 c0.695,0.292,1.357,0.719,2.078,1.34c0.051,0.044,0.105,0.068,0.164,0.068c0.143,0,0.273-0.137,0.389-0.271 c0.191-0.214,0.324-0.395,0.135-0.575c-0.686-0.654-1.436-1.138-2.363-1.533C13.24,3.097,12.168,2.884,11.066,2.884z"/><path d="M16.43,15.747c-0.092-0.028-0.242,0.05-0.309,0.119l0,0c-0.652,0.652-1.42,1.169-2.268,1.521 c-0.877,0.371-1.814,0.551-2.779,0.551c-0.961,0-1.896-0.189-2.775-0.564c-0.848-0.36-1.612-0.879-2.268-1.53 c-0.682-0.688-1.196-1.455-1.529-2.268c-0.325-0.799-0.471-1.643-0.471-1.643c-0.045-0.24-0.258-0.249-0.567-0.203 c-0.128,0.021-0.519,0.079-0.483,0.36v0.01c0.105,0.644,0.289,1.284,0.545,1.895c0.417,0.969,1.002,1.849,1.756,2.604 c0.757,0.754,1.636,1.34,2.604,1.757C8.901,18.785,9.97,19,11.088,19c1.104,0,2.186-0.215,3.188-0.645 c1.838-0.896,2.604-1.757,2.604-1.757c0.182-0.204,0.227-0.317-0.1-0.643C16.779,15.956,16.525,15.774,16.43,15.747z"/><path d="M5.633,13.287c0.293,0.71,0.723,1.341,1.262,1.882c0.54,0.54,1.172,0.971,1.882,1.264c0.731,0.303,1.509,0.461,2.298,0.461 c0.801,0,1.578-0.158,2.297-0.461c0.711-0.293,1.344-0.724,1.883-1.264c0.543-0.541,0.971-1.172,1.264-1.882 c0.314-0.721,0.463-1.5,0.463-2.298c0-0.79-0.148-1.569-0.463-2.289c-0.293-0.699-0.721-1.329-1.264-1.881 c-0.539-0.541-1.172-0.959-1.867-1.263c-0.721-0.303-1.5-0.461-2.299-0.461c-0.802,0-1.613,0.159-2.322,0.461 c-0.577,0.25-1.544,0.867-2.119,1.454v0.012V2.108h8.16C15.1,2.104,15.1,1.69,15.1,1.552C15.1,1.417,15.1,1,14.809,1H5.915 C5.676,1,5.527,1.192,5.527,1.384v6.84c0,0.214,0.273,0.372,0.529,0.428c0.5,0.105,0.614-0.056,0.737-0.224l0,0 c0.18-0.273,0.776-0.884,0.787-0.894c0.901-0.905,2.117-1.408,3.416-1.408c1.285,0,2.5,0.501,3.412,1.408 c0.914,0.914,1.408,2.122,1.408,3.405c0,1.288-0.508,2.496-1.408,3.405c-0.9,0.896-2.152,1.406-3.438,1.406 c-0.877,0-1.711-0.229-2.433-0.671v-4.158c0-0.553,0.237-1.151,0.643-1.614c0.462-0.519,1.094-0.799,1.782-0.799 c0.664,0,1.293,0.253,1.758,0.715c0.459,0.459,0.709,1.071,0.709,1.723c0,1.385-1.094,2.468-2.488,2.468 c-0.273,0-0.769-0.121-0.781-0.125c-0.281-0.087-0.405,0.306-0.438,0.436c-0.159,0.496,0.079,0.585,0.123,0.607 c0.452,0.137,0.743,0.157,1.129,0.157c1.973,0,3.572-1.6,3.572-3.57c0-1.964-1.6-3.552-3.572-3.552c-0.97,0-1.872,0.36-2.546,1.038 c-0.656,0.631-1.027,1.487-1.027,2.322v3.438v-0.011c-0.372-0.42-0.732-1.041-0.981-1.682c-0.102-0.248-0.315-0.202-0.607-0.113 c-0.135,0.035-0.519,0.157-0.44,0.439C5.372,12.799,5.577,13.164,5.633,13.287z"/></svg>',album:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="10" height="1"/><rect x="3" y="4" width="14" height="1"/><rect fill="none" stroke="#000" x="1.5" y="6.5" width="17" height="11"/></svg>',android:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" version="1.1"><path d="m 65.947,153.884 c -8.183,0 -15.136,2.853 -20.844,8.566 -5.708,5.711 -8.564,12.562 -8.564,20.555 v 122.772 c 0,8.179 2.855,15.126 8.564,20.837 5.708,5.712 12.657,8.562 20.841,8.562 8.186,0 15.085,-2.851 20.699,-8.562 5.618,-5.711 8.425,-12.658 8.425,-20.837 V 183.005 c 0,-7.996 -2.857,-14.847 -8.565,-20.555 -5.709,-5.71 -12.564,-8.566 -20.556,-8.566 z" transform="matrix(.04113 0 0 .04182 .217 .08)"/><path d="m 106.494,349.457 c 0,8.754 3.046,16.177 9.136,22.269 6.091,6.085 13.512,9.13 22.27,9.13 h 21.128 l 0.288,64.81 c 0,8.186 2.855,15.129 8.564,20.841 5.708,5.711 12.562,8.565 20.555,8.565 8.188,0 15.133,-2.854 20.844,-8.565 5.711,-5.712 8.564,-12.655 8.564,-20.841 v -64.81 h 39.397 v 64.81 c 0,8.186 2.854,15.129 8.562,20.841 5.715,5.711 12.662,8.565 20.848,8.565 8.179,0 15.126,-2.854 20.834,-8.565 5.708,-5.712 8.559,-12.655 8.559,-20.841 v -64.81 h 21.416 c 8.56,0 15.89,-3.039 21.98,-9.13 6.092,-6.092 9.138,-13.515 9.138,-22.269 V 159.308 H 106.494 Z" transform="matrix(.04113 0 0 .04182 .217 .08)"/><path d="M 302.345,43.682 322.61,6.279 c 1.335,-2.474 0.855,-4.377 -1.424,-5.708 -2.478,-1.143 -4.38,-0.572 -5.708,1.714 l -20.56,37.685 c -18.082,-7.994 -37.205,-11.991 -57.384,-11.991 -20.174,0 -39.304,3.997 -57.387,11.991 L 159.591,2.286 C 158.263,0 156.357,-0.571 153.883,0.572 c -2.285,1.331 -2.758,3.234 -1.426,5.708 l 20.271,37.402 c -20.559,10.467 -36.923,25.076 -49.108,43.824 -12.181,18.749 -18.273,39.259 -18.273,61.525 h 264.095 c 0,-22.266 -6.091,-42.777 -18.273,-61.525 C 338.982,68.758 322.717,54.148 302.345,43.682 Z M 185.144,98.068 c -2.187,2.19 -4.803,3.284 -7.849,3.284 -3.046,0 -5.614,-1.093 -7.71,-3.284 -2.091,-2.187 -3.14,-4.805 -3.14,-7.85 0,-3.046 1.049,-5.664 3.14,-7.854 2.093,-2.19 4.665,-3.282 7.71,-3.282 3.042,0 5.659,1.091 7.849,3.282 2.19,2.19 3.284,4.808 3.284,7.854 0,3.046 -1.094,5.66 -3.284,7.85 z m 120.345,0 c -2.098,2.19 -4.668,3.284 -7.713,3.284 -3.046,0 -5.657,-1.093 -7.848,-3.284 -2.19,-2.187 -3.281,-4.805 -3.281,-7.85 0,-3.046 1.091,-5.664 3.281,-7.854 2.19,-2.19 4.802,-3.282 7.848,-3.282 3.045,0 5.615,1.091 7.713,3.282 2.088,2.19 3.139,4.808 3.139,7.854 0,3.046 -1.048,5.66 -3.139,7.85 z" transform="matrix(.04113 0 0 .04182 .217 .08)"/><path d="m 429.964,162.306 c -5.708,-5.614 -12.655,-8.422 -20.841,-8.422 -7.991,0 -14.843,2.808 -20.551,8.422 -5.711,5.616 -8.568,12.517 -8.568,20.699 v 122.772 c 0,8.179 2.857,15.126 8.568,20.837 5.708,5.712 12.56,8.562 20.551,8.562 8.186,0 15.133,-2.851 20.841,-8.562 5.715,-5.711 8.568,-12.658 8.568,-20.837 V 183.005 c 0,-8.183 -2.853,-15.084 -8.568,-20.699 z" transform="matrix(.04113 0 0 .04182 .217 .08)"/></svg>',apple:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" version="1.1"><g fill="#000"><path d="m 461.852,355.712 c -1.692,-2.616 -4.443,-4.362 -7.531,-4.779 -40.621,-5.306 -69.25,-42.537 -63.944,-83.158 3.748,-28.694 23.84,-52.588 51.465,-61.205 5.61,-1.798 8.701,-7.803 6.903,-13.413 -0.28,-0.873 -0.671,-1.707 -1.164,-2.481 -18.641,-33.642 -51.786,-56.779 -89.792,-62.677 -19.152,0.914 -38.026,4.957 -55.872,11.968 -12.817,5.158 -26.351,8.317 -40.128,9.365 -13.777,-1.048 -27.311,-4.207 -40.128,-9.365 -17.846,-7.011 -36.72,-11.054 -55.872,-11.968 -39.829,0 -117.333,56.469 -117.333,160 0,98.389 71.765,224 128,224 21.457,0.192 42.656,-4.691 61.867,-14.251 7.235,-3.99 15.232,-6.404 23.467,-7.083 8.234,0.679 16.232,3.093 23.467,7.083 19.211,9.56 40.41,14.443 61.867,14.251 44.587,0 94.912,-76.544 115.989,-147.477 0.882,-2.979 0.422,-6.197 -1.261,-8.81 z" transform="translate(.554 .453) scale(.03704)"/><path d="M 251.121,128 C 315.893,127.929 368.384,75.439 368.454,10.667 368.454,4.776 363.679,0 357.788,0 293.016,0.071 240.525,52.561 240.455,117.333 240.454,123.224 245.23,128 251.121,128 Z" transform="translate(.554 .453) scale(.03704)"/></g></svg>',"arrow-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66"/><line fill="none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15"/></svg>',"arrow-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5"/><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52"/></svg>',"arrow-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14"/><line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5"/></svg>',"arrow-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,4 15.37,9.4 14.63,10.08 10.5,5.49 6.37,10.08 5.63,9.4"/><line fill="none" stroke="#000" x1="10.5" y1="16" x2="10.5" y2="5"/></svg>',ban:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><line fill="none" stroke="#000" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5"/></svg>',behance:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.5,10.6c-0.4-0.5-0.9-0.9-1.6-1.1c1.7-1,2.2-3.2,0.7-4.7C7.8,4,6.3,4,5.2,4C3.5,4,1.7,4,0,4v12c1.7,0,3.4,0,5.2,0 c1,0,2.1,0,3.1-0.5C10.2,14.6,10.5,12.3,9.5,10.6L9.5,10.6z M5.6,6.1c1.8,0,1.8,2.7-0.1,2.7c-1,0-2,0-2.9,0V6.1H5.6z M2.6,13.8v-3.1 c1.1,0,2.1,0,3.2,0c2.1,0,2.1,3.2,0.1,3.2L2.6,13.8z"/><path d="M19.9,10.9C19.7,9.2,18.7,7.6,17,7c-4.2-1.3-7.3,3.4-5.3,7.1c0.9,1.7,2.8,2.3,4.7,2.1c1.7-0.2,2.9-1.3,3.4-2.9h-2.2 c-0.4,1.3-2.4,1.5-3.5,0.6c-0.4-0.4-0.6-1.1-0.6-1.7H20C20,11.7,19.9,10.9,19.9,10.9z M13.5,10.6c0-1.6,2.3-2.7,3.5-1.4 c0.4,0.4,0.5,0.9,0.6,1.4H13.5L13.5,10.6z"/><rect x="13" y="4" width="5" height="1.4"/></svg>',bell:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17,15.5 L3,15.5 C2.99,14.61 3.79,13.34 4.1,12.51 C4.58,11.3 4.72,10.35 5.19,7.01 C5.54,4.53 5.89,3.2 7.28,2.16 C8.13,1.56 9.37,1.5 9.81,1.5 L9.96,1.5 C9.96,1.5 11.62,1.41 12.67,2.17 C14.08,3.2 14.42,4.54 14.77,7.02 C15.26,10.35 15.4,11.31 15.87,12.52 C16.2,13.34 17.01,14.61 17,15.5 L17,15.5 Z"/><path fill="none" stroke="#000" d="M12.39,16 C12.39,17.37 11.35,18.43 9.91,18.43 C8.48,18.43 7.42,17.37 7.42,16"/></svg>',bold:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5,15.3 C5.66,15.3 5.9,15 5.9,14.53 L5.9,5.5 C5.9,4.92 5.56,4.7 5,4.7 L5,4 L8.95,4 C12.6,4 13.7,5.37 13.7,6.9 C13.7,7.87 13.14,9.17 10.86,9.59 L10.86,9.7 C13.25,9.86 14.29,11.28 14.3,12.54 C14.3,14.47 12.94,16 9,16 L5,16 L5,15.3 Z M9,9.3 C11.19,9.3 11.8,8.5 11.85,7 C11.85,5.65 11.3,4.8 9,4.8 L7.67,4.8 L7.67,9.3 L9,9.3 Z M9.185,15.22 C11.97,15 12.39,14 12.4,12.58 C12.4,11.15 11.39,10 9,10 L7.67,10 L7.67,15 L9.18,15 Z"/></svg>',bolt:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.74,20 L7.73,12 L3,12 L15.43,1 L12.32,9 L17.02,9 L4.74,20 L4.74,20 L4.74,20 Z M9.18,11 L7.1,16.39 L14.47,10 L10.86,10 L12.99,4.67 L5.61,11 L9.18,11 L9.18,11 L9.18,11 Z"/></svg>',bookmark:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="5.5 1.5 15.5 1.5 15.5 17.5 10.5 12.5 5.5 17.5"/></svg>',calendar:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"/><rect width="1" height="3" x="6" y="2"/><rect width="1" height="3" x="13" y="2"/></svg>',camera:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10.8" r="3.8"/><path fill="none" stroke="#000" d="M1,4.5 C0.7,4.5 0.5,4.7 0.5,5 L0.5,17 C0.5,17.3 0.7,17.5 1,17.5 L19,17.5 C19.3,17.5 19.5,17.3 19.5,17 L19.5,5 C19.5,4.7 19.3,4.5 19,4.5 L13.5,4.5 L13.5,2.9 C13.5,2.6 13.3,2.5 13,2.5 L7,2.5 C6.7,2.5 6.5,2.6 6.5,2.9 L6.5,4.5 L1,4.5 L1,4.5 Z"/></svg>',cart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="7.3" cy="17.3" r="1.4"/><circle cx="13.3" cy="17.3" r="1.4"/><polyline fill="none" stroke="#000" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"/></svg>',check:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"/></svg>',"chevron-double-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 14 6 10 10 6"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="14 14 10 10 14 6"/></svg>',"chevron-double-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 6 14 10 10 14"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="6 6 10 10 6 14"/></svg>',"chevron-down":'<svg width="14" height="10" viewBox="0 0 14 10"><polyline fill="none" stroke="#313131" stroke-width="2" points="2 2 7 7 12 2"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" version="1.1"><path d="m 97.141,225.92 c 0,-8.095 3.091,-16.192 9.259,-22.366 L 300.689,9.27 c 12.359,-12.359 32.397,-12.359 44.751,0 12.354,12.354 12.354,32.388 0,44.748 L 173.525,225.92 345.428,397.829 c 12.354,12.354 12.354,32.391 0,44.744 -12.354,12.365 -32.386,12.365 -44.745,0 L 106.393,248.292 c -6.167,-6.177 -9.252,-14.274 -9.252,-22.372 z" transform="translate(3.514 3.73) scale(.02778)"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" version="1.1"><path d="m 97.141,225.92 c 0,-8.095 3.091,-16.192 9.259,-22.366 L 300.689,9.27 c 12.359,-12.359 32.397,-12.359 44.751,0 12.354,12.354 12.354,32.388 0,44.748 L 173.525,225.92 345.428,397.829 c 12.354,12.354 12.354,32.391 0,44.744 -12.354,12.365 -32.386,12.365 -44.745,0 L 106.393,248.292 c -6.167,-6.177 -9.252,-14.274 -9.252,-22.372 z" transform="matrix(-.02778 0 0 .02778 16.067 3.73)"/></svg>',"chevron-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13"/></svg>',clock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',close:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"/><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"/></svg>',"cloud-download":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.3,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="11.75 16 9.5 18.25 7.25 16"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',"cloud-upload":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.31,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="7.25 11.75 9.5 9.5 11.75 11.75"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',code:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16"/></svg>',cog:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="9.997" cy="10" r="3.31"/><path fill="none" stroke="#000" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z"/></svg>',comment:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z"/></svg>',commenting:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="1.5,1.5 18.5,1.5 18.5,13.5 10.5,13.5 6.5,17.5 6.5,13.5 1.5,13.5"/><circle cx="10" cy="8" r="1"/><circle cx="6" cy="8" r="1"/><circle cx="14" cy="8" r="1"/></svg>',comments:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="2 0.5 19.5 0.5 19.5 13"/><path d="M5,19.71 L5,15 L0,15 L0,2 L18,2 L18,15 L9.71,15 L5,19.71 L5,19.71 L5,19.71 Z M1,14 L6,14 L6,17.29 L9.29,14 L17,14 L17,3 L1,3 L1,14 L1,14 L1,14 Z"/></svg>',copy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="2.5" width="12" height="16"/><polyline fill="none" stroke="#000" points="5 0.5 17.5 0.5 17.5 17"/></svg>',"credit-card":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12"/><rect x="1" y="7" width="18" height="3"/></svg>',database:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="10" cy="4.64" rx="7.5" ry="3.14"/><path fill="none" stroke="#000" d="M17.5,8.11 C17.5,9.85 14.14,11.25 10,11.25 C5.86,11.25 2.5,9.84 2.5,8.11"/><path fill="none" stroke="#000" d="M17.5,11.25 C17.5,12.99 14.14,14.39 10,14.39 C5.86,14.39 2.5,12.98 2.5,11.25"/><path fill="none" stroke="#000" d="M17.49,4.64 L17.5,14.36 C17.5,16.1 14.14,17.5 10,17.5 C5.86,17.5 2.5,16.09 2.5,14.36 L2.5,4.64"/></svg>',desktop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="15" width="1" height="2"/><rect x="11" y="15" width="1" height="2"/><rect x="5" y="16" width="10" height="1"/><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11"/></svg>',download:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3"/></svg>',dribbble:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.4" d="M1.3,8.9c0,0,5,0.1,8.6-1c1.4-0.4,2.6-0.9,4-1.9 c1.4-1.1,2.5-2.5,2.5-2.5"/><path fill="none" stroke="#000" stroke-width="1.4" d="M3.9,16.6c0,0,1.7-2.8,3.5-4.2 c1.8-1.3,4-2,5.7-2.2C16,10,19,10.6,19,10.6"/><path fill="none" stroke="#000" stroke-width="1.4" d="M6.9,1.6c0,0,3.3,4.6,4.2,6.8 c0.4,0.9,1.3,3.1,1.9,5.2c0.6,2,0.9,4.4,0.9,4.4"/><circle fill="none" stroke="#000" stroke-width="1.4" cx="10" cy="10" r="9"/></svg>',etsy:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M8,4.26C8,4.07,8,4,8.31,4h4.46c.79,0,1.22.67,1.53,1.91l.25,1h.76c.14-2.82.26-4,.26-4S13.65,3,12.52,3H6.81L3.75,2.92v.84l1,.2c.73.11.9.27,1,1,0,0,.06,2,.06,5.17s-.06,5.14-.06,5.14c0,.59-.23.81-1,.94l-1,.2v.84l3.06-.1h5.11c1.15,0,3.82.1,3.82.1,0-.7.45-3.88.51-4.22h-.73l-.76,1.69a2.25,2.25,0,0,1-2.45,1.47H9.4c-1,0-1.44-.4-1.44-1.24V10.44s2.16,0,2.86.06c.55,0,.85.19,1.06,1l.23,1H13L12.9,9.94,13,7.41h-.85l-.28,1.13c-.16.74-.28.84-1,1-1,.1-2.89.09-2.89.09Z"/></svg>',expand:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 18 2 18 7 17 7 17 3 13 3"/><polygon points="2 13 3 13 3 17 7 17 7 18 2 18"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11"/></svg>',facebook:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 0 20 20" xml:space="preserve"><path d="M10.737,7.473v-1.99c0-0.549,0.446-0.995,0.997-0.995h0.994V2h-1.991C9.09,2,7.753,3.336,7.753,4.985v2.487h-1.99V9.96 h1.99v7.96h2.984V9.96h1.991l0.994-2.487H10.737z"/></svg>',"file-edit":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"/><polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"/></svg>',"file-pdf":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><path d="M14.65 11.67c-.48.3-1.37-.19-1.79-.37a4.65 4.65 0 0 1 1.49.06c.35.1.36.28.3.31zm-6.3.06l.43-.79a14.7 14.7 0 0 0 .75-1.64 5.48 5.48 0 0 0 1.25 1.55l.2.15a16.36 16.36 0 0 0-2.63.73zM9.5 5.32c.2 0 .32.5.32.97a1.99 1.99 0 0 1-.23 1.04 5.05 5.05 0 0 1-.17-1.3s0-.71.08-.71zm-3.9 9a4.35 4.35 0 0 1 1.21-1.46l.24-.22a4.35 4.35 0 0 1-1.46 1.68zm9.23-3.3a2.05 2.05 0 0 0-1.32-.3 11.07 11.07 0 0 0-1.58.11 4.09 4.09 0 0 1-.74-.5 5.39 5.39 0 0 1-1.32-2.06 10.37 10.37 0 0 0 .28-2.62 1.83 1.83 0 0 0-.07-.25.57.57 0 0 0-.52-.4H9.4a.59.59 0 0 0-.6.38 6.95 6.95 0 0 0 .37 3.14c-.26.63-1 2.12-1 2.12-.3.58-.57 1.08-.82 1.5l-.8.44A3.11 3.11 0 0 0 5 14.16a.39.39 0 0 0 .15.42l.24.13c1.15.56 2.28-1.74 2.66-2.42a23.1 23.1 0 0 1 3.59-.85 4.56 4.56 0 0 0 2.91.8.5.5 0 0 0 .3-.21 1.1 1.1 0 0 0 .12-.75.84.84 0 0 0-.14-.25z"/></svg>',"file-text":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><line fill="none" stroke="#000" x1="6" x2="12" y1="12.5" y2="12.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="8.5" y2="8.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="6.5" y2="6.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="10.5" y2="10.5"/></svg>',file:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="1.5" width="13" height="17"/></svg>',flickr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="9.5" r="3.5"/><circle cx="14.5" cy="9.5" r="3.5"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5"/></svg>',forward:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.47,13.11 C4.02,10.02 6.27,7.85 9.04,6.61 C9.48,6.41 10.27,6.13 11,5.91 L11,2 L18.89,9 L11,16 L11,12.13 C9.25,12.47 7.58,13.19 6.02,14.25 C3.03,16.28 1.63,18.54 1.63,18.54 C1.63,18.54 1.38,15.28 2.47,13.11 L2.47,13.11 Z M5.3,13.53 C6.92,12.4 9.04,11.4 12,10.92 L12,13.63 L17.36,9 L12,4.25 L12,6.8 C11.71,6.86 10.86,7.02 9.67,7.49 C6.79,8.65 4.58,10.96 3.49,13.08 C3.18,13.7 2.68,14.87 2.49,16 C3.28,15.05 4.4,14.15 5.3,13.53 L5.3,13.53 Z"/></svg>',foursquare:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.23,2 C15.96,2 16.4,2.41 16.5,2.86 C16.57,3.15 16.56,3.44 16.51,3.73 C16.46,4.04 14.86,11.72 14.75,12.03 C14.56,12.56 14.16,12.82 13.61,12.83 C13.03,12.84 11.09,12.51 10.69,13 C10.38,13.38 7.79,16.39 6.81,17.53 C6.61,17.76 6.4,17.96 6.08,17.99 C5.68,18.04 5.29,17.87 5.17,17.45 C5.12,17.28 5.1,17.09 5.1,16.91 C5.1,12.4 4.86,7.81 5.11,3.31 C5.17,2.5 5.81,2.12 6.53,2 L15.23,2 L15.23,2 Z M9.76,11.42 C9.94,11.19 10.17,11.1 10.45,11.1 L12.86,11.1 C13.12,11.1 13.31,10.94 13.36,10.69 C13.37,10.64 13.62,9.41 13.74,8.83 C13.81,8.52 13.53,8.28 13.27,8.28 C12.35,8.29 11.42,8.28 10.5,8.28 C9.84,8.28 9.83,7.69 9.82,7.21 C9.8,6.85 10.13,6.55 10.5,6.55 C11.59,6.56 12.67,6.55 13.76,6.55 C14.03,6.55 14.23,6.4 14.28,6.14 C14.34,5.87 14.67,4.29 14.67,4.29 C14.67,4.29 14.82,3.74 14.19,3.74 L7.34,3.74 C7,3.75 6.84,4.02 6.84,4.33 C6.84,7.58 6.85,14.95 6.85,14.99 C6.87,15 8.89,12.51 9.76,11.42 L9.76,11.42 Z"/></svg>',future:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10"/><rect x="9" y="4" width="1" height="7"/><path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1"/></svg>',"git-branch":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="3" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14" cy="6" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="17" r="2"/><path fill="none" stroke="#000" stroke-width="2" d="M14,8 C14,10.41 12.43,10.87 10.56,11.25 C9.09,11.54 7,12.06 7,15 L7,5"/></svg>',"git-fork":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="5.79" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14.19" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="10.03" cy="16.79" r="1.79"/><path fill="none" stroke="#000" stroke-width="2" d="M5.79,4.57 L5.79,6.56 C5.79,9.19 10.03,10.22 10.03,13.31 C10.03,14.86 10.04,14.55 10.04,14.55 C10.04,14.37 10.04,14.86 10.04,13.31 C10.04,10.22 14.2,9.19 14.2,6.56 L14.2,4.57"/></svg>',"github-alt":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.75,0.5 0.5,4.76 0.5,10.01 C0.5,15.26 4.75,19.51 10,19.51 C15.24,19.51 19.5,15.26 19.5,10.01 C19.5,4.76 15.25,0.5 10,0.5 L10,0.5 Z M12.81,17.69 C12.81,17.69 12.81,17.7 12.79,17.69 C12.47,17.75 12.35,17.59 12.35,17.36 L12.35,16.17 C12.35,15.45 12.09,14.92 11.58,14.56 C12.2,14.51 12.77,14.39 13.26,14.21 C13.87,13.98 14.36,13.69 14.74,13.29 C15.42,12.59 15.76,11.55 15.76,10.17 C15.76,9.25 15.45,8.46 14.83,7.8 C15.1,7.08 15.07,6.29 14.75,5.44 L14.51,5.42 C14.34,5.4 14.06,5.46 13.67,5.61 C13.25,5.78 12.79,6.03 12.31,6.35 C11.55,6.16 10.81,6.05 10.09,6.05 C9.36,6.05 8.61,6.15 7.88,6.35 C7.28,5.96 6.75,5.68 6.26,5.54 C6.07,5.47 5.9,5.44 5.78,5.44 L5.42,5.44 C5.06,6.29 5.04,7.08 5.32,7.8 C4.7,8.46 4.4,9.25 4.4,10.17 C4.4,11.94 4.96,13.16 6.08,13.84 C6.53,14.13 7.05,14.32 7.69,14.43 C8.03,14.5 8.32,14.54 8.55,14.55 C8.07,14.89 7.82,15.42 7.82,16.16 L7.82,17.51 C7.8,17.69 7.7,17.8 7.51,17.8 C4.21,16.74 1.82,13.65 1.82,10.01 C1.82,5.5 5.49,1.83 10,1.83 C14.5,1.83 18.17,5.5 18.17,10.01 C18.18,13.53 15.94,16.54 12.81,17.69 L12.81,17.69 Z"/></svg>',github:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,1 C5.03,1 1,5.03 1,10 C1,13.98 3.58,17.35 7.16,18.54 C7.61,18.62 7.77,18.34 7.77,18.11 C7.77,17.9 7.76,17.33 7.76,16.58 C5.26,17.12 4.73,15.37 4.73,15.37 C4.32,14.33 3.73,14.05 3.73,14.05 C2.91,13.5 3.79,13.5 3.79,13.5 C4.69,13.56 5.17,14.43 5.17,14.43 C5.97,15.8 7.28,15.41 7.79,15.18 C7.87,14.6 8.1,14.2 8.36,13.98 C6.36,13.75 4.26,12.98 4.26,9.53 C4.26,8.55 4.61,7.74 5.19,7.11 C5.1,6.88 4.79,5.97 5.28,4.73 C5.28,4.73 6.04,4.49 7.75,5.65 C8.47,5.45 9.24,5.35 10,5.35 C10.76,5.35 11.53,5.45 12.25,5.65 C13.97,4.48 14.72,4.73 14.72,4.73 C15.21,5.97 14.9,6.88 14.81,7.11 C15.39,7.74 15.73,8.54 15.73,9.53 C15.73,12.99 13.63,13.75 11.62,13.97 C11.94,14.25 12.23,14.8 12.23,15.64 C12.23,16.84 12.22,17.81 12.22,18.11 C12.22,18.35 12.38,18.63 12.84,18.54 C16.42,17.35 19,13.98 19,10 C19,5.03 14.97,1 10,1 L10,1 Z"/></svg>',gitter:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="1" width="1.531" height="11.471"/><rect x="7.324" y="4.059" width="1.529" height="15.294"/><rect x="11.148" y="4.059" width="1.527" height="15.294"/><rect x="14.971" y="4.059" width="1.529" height="8.412"/></svg>',"google-plus":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.9,9c0,2.7-0.6,5-3.2,6.3c-3.7,1.8-8.1,0.2-9.4-3.6C-1.1,7.6,1.9,3.3,6.1,3c1.7-0.1,3.2,0.3,4.6,1.3 c0.1,0.1,0.3,0.2,0.4,0.4c-0.5,0.5-1.2,1-1.7,1.6c-1-0.8-2.1-1.1-3.5-0.9C5,5.6,4.2,6,3.6,6.7c-1.3,1.3-1.5,3.4-0.5,5 c1,1.7,2.6,2.3,4.6,1.9c1.4-0.3,2.4-1.2,2.6-2.6H6.9V9H12.9z"/><polygon points="20,9 20,11 18,11 18,13 16,13 16,11 14,11 14,9 16,9 16,7 18,7 18,9"/></svg>',google:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.86,9.09 C18.46,12.12 17.14,16.05 13.81,17.56 C9.45,19.53 4.13,17.68 2.47,12.87 C0.68,7.68 4.22,2.42 9.5,2.03 C11.57,1.88 13.42,2.37 15.05,3.65 C15.22,3.78 15.37,3.93 15.61,4.14 C14.9,4.81 14.23,5.45 13.5,6.14 C12.27,5.08 10.84,4.72 9.28,4.98 C8.12,5.17 7.16,5.76 6.37,6.63 C4.88,8.27 4.62,10.86 5.76,12.82 C6.95,14.87 9.17,15.8 11.57,15.25 C13.27,14.87 14.76,13.33 14.89,11.75 L10.51,11.75 L10.51,9.09 L17.86,9.09 L17.86,9.09 Z"/></svg>',grid:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="3" height="3"/><rect x="8" y="2" width="3" height="3"/><rect x="14" y="2" width="3" height="3"/><rect x="2" y="8" width="3" height="3"/><rect x="8" y="8" width="3" height="3"/><rect x="14" y="8" width="3" height="3"/><rect x="2" y="14" width="3" height="3"/><rect x="8" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>',happy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="7" r="1"/><circle cx="7" cy="7" r="1"/><circle fill="none" stroke="#000" cx="10" cy="10" r="8.5"/><path fill="none" stroke="#000" d="M14.6,11.4 C13.9,13.3 12.1,14.5 10,14.5 C7.9,14.5 6.1,13.3 5.4,11.4"/></svg>',hashtag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.431,8 L15.661,7 L12.911,7 L13.831,3 L12.901,3 L11.98,7 L9.29,7 L10.21,3 L9.281,3 L8.361,7 L5.23,7 L5,8 L8.13,8 L7.21,12 L4.23,12 L4,13 L6.98,13 L6.061,17 L6.991,17 L7.911,13 L10.601,13 L9.681,17 L10.611,17 L11.531,13 L14.431,13 L14.661,12 L11.76,12 L12.681,8 L15.431,8 Z M10.831,12 L8.141,12 L9.061,8 L11.75,8 L10.831,12 Z"/></svg>',heart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z"/></svg>',history:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="#000" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',home:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65"/><polygon points="15 4 18 4 18 7 17 7 17 5 15 5"/><polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19"/></svg>',image:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="16.1" cy="6.1" r="1.1"/><rect fill="none" stroke="#000" x=".5" y="2.5" width="19" height="15"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14"/></svg>',info:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',instagram:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 0 20 20" xml:space="preserve"><path d="M4.092,2h11.754c1.117,0,2.03,0.826,2.03,2.029v11.756c0,1.203-0.913,2.029-2.03,2.029H4.092 c-1.117,0-2.03-0.826-2.03-2.029V4.029C2.062,2.826,2.975,2,4.092,2L4.092,2z M13.581,3.757c-0.391,0-0.71,0.321-0.71,0.712v1.704 c0,0.392,0.319,0.713,0.71,0.713h1.788c0.392,0,0.712-0.321,0.712-0.713V4.469c0-0.391-0.32-0.712-0.712-0.712H13.581L13.581,3.757 z M16.089,8.688h-1.393c0.133,0.43,0.204,0.886,0.204,1.357c0,2.63-2.201,4.763-4.917,4.763c-2.714,0-4.915-2.133-4.915-4.763 c0-0.472,0.071-0.927,0.203-1.357H3.82v6.68c0,0.346,0.283,0.629,0.628,0.629H15.46c0.347,0,0.629-0.283,0.629-0.629V8.688 L16.089,8.688z M9.983,6.795c-1.754,0-3.176,1.378-3.176,3.078c0,1.699,1.422,3.077,3.176,3.077s3.177-1.378,3.177-3.077 C13.16,8.173,11.738,6.795,9.983,6.795z"/></svg>',italic:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.63,5.48 L10.15,14.52 C10,15.08 10.37,15.25 11.92,15.3 L11.72,16 L6,16 L6.2,15.31 C7.78,15.26 8.19,15.09 8.34,14.53 L10.82,5.49 C10.97,4.92 10.63,4.76 9.09,4.71 L9.28,4 L15,4 L14.81,4.69 C13.23,4.75 12.78,4.91 12.63,5.48 L12.63,5.48 Z"/></svg>',joomla:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.8,13.4l1.7-1.7L5.9,8c-0.6-0.5-0.6-1.5,0-2c0.6-0.6,1.4-0.6,2,0l1.7-1.7c-1-1-2.3-1.3-3.6-1C5.8,2.2,4.8,1.4,3.7,1.4 c-1.3,0-2.3,1-2.3,2.3c0,1.1,0.8,2,1.8,2.3c-0.4,1.3-0.1,2.8,1,3.8L7.8,13.4L7.8,13.4z"/><path d="M10.2,4.3c1-1,2.5-1.4,3.8-1c0.2-1.1,1.1-2,2.3-2c1.3,0,2.3,1,2.3,2.3c0,1.2-0.9,2.2-2,2.3c0.4,1.3,0,2.8-1,3.8L13.9,8 c0.6-0.5,0.6-1.5,0-2c-0.5-0.6-1.5-0.6-2,0L8.2,9.7L6.5,8"/><path d="M14.1,16.8c-1.3,0.4-2.8,0.1-3.8-1l1.7-1.7c0.6,0.6,1.5,0.6,2,0c0.5-0.6,0.6-1.5,0-2l-3.7-3.7L12,6.7l3.7,3.7 c1,1,1.3,2.4,1,3.6c1.1,0.2,2,1.1,2,2.3c0,1.3-1,2.3-2.3,2.3C15.2,18.6,14.3,17.8,14.1,16.8"/><path d="M13.2,12.2l-3.7,3.7c-1,1-2.4,1.3-3.6,1c-0.2,1-1.2,1.8-2.2,1.8c-1.3,0-2.3-1-2.3-2.3c0-1.1,0.8-2,1.8-2.3 c-0.3-1.3,0-2.7,1-3.7l1.7,1.7c-0.6,0.6-0.6,1.5,0,2c0.6,0.6,1.4,0.6,2,0l3.7-3.7"/></svg>',laptop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="16" width="20" height="1"/><rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10"/></svg>',lifesaver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.76,0.5 0.5,4.76 0.5,10 C0.5,15.24 4.76,19.5 10,19.5 C15.24,19.5 19.5,15.24 19.5,10 C19.5,4.76 15.24,0.5 10,0.5 L10,0.5 Z M10,1.5 C11.49,1.5 12.89,1.88 14.11,2.56 L11.85,4.82 C11.27,4.61 10.65,4.5 10,4.5 C9.21,4.5 8.47,4.67 7.79,4.96 L5.58,2.75 C6.87,1.95 8.38,1.5 10,1.5 L10,1.5 Z M4.96,7.8 C4.67,8.48 4.5,9.21 4.5,10 C4.5,10.65 4.61,11.27 4.83,11.85 L2.56,14.11 C1.88,12.89 1.5,11.49 1.5,10 C1.5,8.38 1.95,6.87 2.75,5.58 L4.96,7.79 L4.96,7.8 L4.96,7.8 Z M10,18.5 C8.25,18.5 6.62,17.97 5.27,17.06 L7.46,14.87 C8.22,15.27 9.08,15.5 10,15.5 C10.79,15.5 11.53,15.33 12.21,15.04 L14.42,17.25 C13.13,18.05 11.62,18.5 10,18.5 L10,18.5 Z M10,14.5 C7.52,14.5 5.5,12.48 5.5,10 C5.5,7.52 7.52,5.5 10,5.5 C12.48,5.5 14.5,7.52 14.5,10 C14.5,12.48 12.48,14.5 10,14.5 L10,14.5 Z M15.04,12.21 C15.33,11.53 15.5,10.79 15.5,10 C15.5,9.08 15.27,8.22 14.87,7.46 L17.06,5.27 C17.97,6.62 18.5,8.25 18.5,10 C18.5,11.62 18.05,13.13 17.25,14.42 L15.04,12.21 L15.04,12.21 Z"/></svg>',link:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975"/></svg>',linkedin:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.81,2.019H4.524c-1.289,0-2.338,1.049-2.338,2.338v11.286c0,1.291,1.049,2.34,2.338,2.34H15.81\tc1.29,0,2.339-1.049,2.339-2.34V4.357C18.148,3.068,17.1,2.019,15.81,2.019z M7.829,14.678H5.958V8.129h1.871V14.678z M7.829,7.194\tH5.958v-1.87h1.871V7.194z M14.376,14.678h-1.871v-3.742c0-0.516-0.42-0.936-0.936-0.936c-0.515,0-0.935,0.42-0.935,0.936v3.742\tH8.764V8.129h1.871v0.353c0.489-0.152,0.808-0.353,1.403-0.353c1.268,0.001,2.338,1.14,2.338,2.484V14.678z"/></svg>',list:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="12" height="1"/><rect x="6" y="9" width="12" height="1"/><rect x="6" y="14" width="12" height="1"/><rect x="2" y="4" width="2" height="1"/><rect x="2" y="9" width="2" height="1"/><rect x="2" y="14" width="2" height="1"/></svg>',location:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"/><circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3"/></svg>',lock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" height="10" width="13" y="8.5" x="3.5"/><path fill="none" stroke="#000" d="M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8"/></svg>',mail:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5"/><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z"/></svg>',menu:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="1"/><rect x="2" y="9" width="16" height="1"/><rect x="2" y="14" width="16" height="1"/></svg>',microphone:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" x1="10" x2="10" y1="16.44" y2="18.5"/><line fill="none" stroke="#000" x1="7" x2="13" y1="18.5" y2="18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.5 4.89v5.87a3.5 3.5 0 0 1-7 0V4.89a3.5 3.5 0 0 1 7 0z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M15.5 10.36V11a5.5 5.5 0 0 1-11 0v-.6"/></svg>',"minus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',minus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect height="1" width="18" y="9" x="1"/></svg>',"more-vertical":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="3" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="10" cy="17" r="2"/></svg>',more:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="10" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="17" cy="10" r="2"/></svg>',move:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="4,5 1,5 1,9 2,9 2,6 4,6"/><polygon points="1,16 2,16 2,18 4,18 4,19 1,19"/><polygon points="14,16 14,19 11,19 11,18 13,18 13,16"/><rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13"/><rect x="1" y="11" width="1" height="3"/><rect x="6" y="18" width="3" height="1"/></svg>',nut:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="2.5,5.7 10,1.3 17.5,5.7 17.5,14.3 10,18.7 2.5,14.3"/><circle fill="none" stroke="#000" cx="10" cy="10" r="3.5"/></svg>',pagekit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="3,1 17,1 17,16 10,16 10,13 14,13 14,4 6,4 6,16 10,16 10,19 3,19"/></svg>',"paint-bucket":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.21,1 L0,11.21 L8.1,19.31 L18.31,9.1 L10.21,1 L10.21,1 Z M16.89,9.1 L15,11 L1.7,11 L10.21,2.42 L16.89,9.1 Z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M6.42,2.33 L11.7,7.61"/><path d="M18.49,12 C18.49,12 20,14.06 20,15.36 C20,16.28 19.24,17 18.49,17 L18.49,17 C17.74,17 17,16.28 17,15.36 C17,14.06 18.49,12 18.49,12 L18.49,12 Z"/></svg>',pencil:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z"/><path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148"/></svg>',"phone-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17,5.5 C17.8,5.5 18.5,6.2 18.5,7 L18.5,14 C18.5,14.8 17.8,15.5 17,15.5 L3,15.5 C2.2,15.5 1.5,14.8 1.5,14 L1.5,7 C1.5,6.2 2.2,5.5 3,5.5 L17,5.5 L17,5.5 L17,5.5 Z"/><circle cx="3.8" cy="10.5" r=".8"/></svg>',phone:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z"/><circle cx="10.5" cy="16.5" r=".8"/></svg>',pinterest:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 0 20 20" xml:space="preserve"><path d="M14.157,4.415c-0.985-0.948-2.351-1.468-3.843-1.468c-2.279,0-3.68,0.934-4.455,1.717 C4.905,5.63,4.357,6.912,4.357,8.182c0,1.595,0.667,2.821,1.785,3.274c0.075,0.03,0.15,0.046,0.224,0.046 c0.236,0,0.423-0.154,0.487-0.4c0.038-0.143,0.125-0.491,0.163-0.644c0.082-0.301,0.015-0.445-0.162-0.654 C6.532,9.421,6.38,8.97,6.38,8.381c0-1.747,1.301-3.604,3.713-3.604c1.915,0,3.103,1.088,3.103,2.838 c0,1.105-0.238,2.128-0.671,2.881c-0.299,0.523-0.828,1.147-1.639,1.147c-0.352,0-0.666-0.145-0.865-0.395 c-0.188-0.237-0.25-0.545-0.174-0.865c0.085-0.361,0.201-0.738,0.314-1.102c0.206-0.666,0.399-1.294,0.399-1.794 c0-0.858-0.527-1.434-1.311-1.434c-0.997,0-1.778,1.013-1.778,2.305c0,0.633,0.169,1.107,0.245,1.29 c-0.126,0.532-0.871,3.695-1.013,4.29c-0.082,0.348-0.574,3.099,0.242,3.317c0.917,0.247,1.736-2.431,1.819-2.733 c0.068-0.247,0.304-1.177,0.449-1.75c0.443,0.427,1.155,0.716,1.849,0.716c1.307,0,2.481-0.589,3.31-1.656 c0.802-1.035,1.245-2.48,1.245-4.065C15.618,6.527,15.085,5.306,14.157,4.415z"/></svg>',"play-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',play:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="6.5,5 14.5,10 6.5,15"/></svg>',"plus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',plus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="1" width="1" height="17"/><rect x="1" y="9" width="17" height="1"/></svg>',print:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="4.5 13.5 1.5 13.5 1.5 6.5 18.5 6.5 18.5 13.5 15.5 13.5"/><polyline fill="none" stroke="#000" points="15.5 6.5 15.5 2.5 4.5 2.5 4.5 6.5"/><rect fill="none" stroke="#000" width="11" height="6" x="4.5" y="11.5"/><rect width="8" height="1" x="6" y="13"/><rect width="8" height="1" x="6" y="15"/></svg>',pull:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="6.85,8 9.5,10.6 12.15,8 12.85,8.7 9.5,12 6.15,8.7"/><line fill="none" stroke="#000" x1="9.5" y1="11" x2="9.5" y2="2"/><polyline fill="none" stroke="#000" points="6,5.5 3.5,5.5 3.5,18.5 15.5,18.5 15.5,5.5 13,5.5"/></svg>',push:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12.15,4 9.5,1.4 6.85,4 6.15,3.3 9.5,0 12.85,3.3"/><line fill="none" stroke="#000" x1="9.5" y1="10" x2="9.5" y2="1"/><polyline fill="none" stroke="#000" points="6 5.5 3.5 5.5 3.5 18.5 15.5 18.5 15.5 5.5 13 5.5"/></svg>',question:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><circle cx="10.44" cy="14.42" r="1.05"/><path fill="none" stroke="#000" stroke-width="1.2" d="M8.17,7.79 C8.17,4.75 12.72,4.73 12.72,7.72 C12.72,8.67 11.81,9.15 11.23,9.75 C10.75,10.24 10.51,10.73 10.45,11.4 C10.44,11.53 10.43,11.64 10.43,11.75"/></svg>',"quote-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.27,7.79 C17.27,9.45 16.97,10.43 15.99,12.02 C14.98,13.64 13,15.23 11.56,15.97 L11.1,15.08 C12.34,14.2 13.14,13.51 14.02,11.82 C14.27,11.34 14.41,10.92 14.49,10.54 C14.3,10.58 14.09,10.6 13.88,10.6 C12.06,10.6 10.59,9.12 10.59,7.3 C10.59,5.48 12.06,4 13.88,4 C15.39,4 16.67,5.02 17.05,6.42 C17.19,6.82 17.27,7.27 17.27,7.79 L17.27,7.79 Z"/><path d="M8.68,7.79 C8.68,9.45 8.38,10.43 7.4,12.02 C6.39,13.64 4.41,15.23 2.97,15.97 L2.51,15.08 C3.75,14.2 4.55,13.51 5.43,11.82 C5.68,11.34 5.82,10.92 5.9,10.54 C5.71,10.58 5.5,10.6 5.29,10.6 C3.47,10.6 2,9.12 2,7.3 C2,5.48 3.47,4 5.29,4 C6.8,4 8.08,5.02 8.46,6.42 C8.6,6.82 8.68,7.27 8.68,7.79 L8.68,7.79 Z"/></svg>',receiver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"/></svg>',reddit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19 9.05a2.56 2.56 0 0 0-2.56-2.56 2.59 2.59 0 0 0-1.88.82 10.63 10.63 0 0 0-4.14-1v-.08c.58-1.62 1.58-3.89 2.7-4.1.38-.08.77.12 1.19.57a1.15 1.15 0 0 0-.06.37 1.48 1.48 0 1 0 1.51-1.45 1.43 1.43 0 0 0-.76.19A2.29 2.29 0 0 0 12.91 1c-2.11.43-3.39 4.38-3.63 5.19 0 0 0 .11-.06.11a10.65 10.65 0 0 0-3.75 1A2.56 2.56 0 0 0 1 9.05a2.42 2.42 0 0 0 .72 1.76A5.18 5.18 0 0 0 1.24 13c0 3.66 3.92 6.64 8.73 6.64s8.74-3 8.74-6.64a5.23 5.23 0 0 0-.46-2.13A2.58 2.58 0 0 0 19 9.05zm-16.88 0a1.44 1.44 0 0 1 2.27-1.19 7.68 7.68 0 0 0-2.07 1.91 1.33 1.33 0 0 1-.2-.72zM10 18.4c-4.17 0-7.55-2.4-7.55-5.4S5.83 7.53 10 7.53 17.5 10 17.5 13s-3.38 5.4-7.5 5.4zm7.69-8.61a7.62 7.62 0 0 0-2.09-1.91 1.41 1.41 0 0 1 .84-.28 1.47 1.47 0 0 1 1.44 1.45 1.34 1.34 0 0 1-.21.72z"/><path d="M6.69 12.58a1.39 1.39 0 1 1 1.39-1.39 1.38 1.38 0 0 1-1.38 1.39z"/><path d="M14.26 11.2a1.39 1.39 0 1 1-1.39-1.39 1.39 1.39 0 0 1 1.39 1.39z"/><path d="M13.09 14.88a.54.54 0 0 1-.09.77 5.3 5.3 0 0 1-3.26 1.19 5.61 5.61 0 0 1-3.4-1.22.55.55 0 1 1 .73-.83 4.09 4.09 0 0 0 5.25 0 .56.56 0 0 1 .77.09z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.08,11.15 C17.09,11.31 17.1,11.47 17.1,11.64 C17.1,15.53 13.94,18.69 10.05,18.69 C6.16,18.68 3,15.53 3,11.63 C3,7.74 6.16,4.58 10.05,4.58 C10.9,4.58 11.71,4.73 12.46,5"/><polyline fill="none" stroke="#000" points="9.9 2 12.79 4.89 9.79 7.9"/></svg>',reply:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"/></svg>',rss:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3.12" cy="16.8" r="1.85"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,8.2 C1.78,8.18 2.06,8.16 2.35,8.16 C7.57,8.16 11.81,12.37 11.81,17.57 C11.81,17.89 11.79,18.19 11.76,18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,2.52 C1.78,2.51 2.06,2.5 2.35,2.5 C10.72,2.5 17.5,9.24 17.5,17.57 C17.5,17.89 17.49,18.19 17.47,18.5"/></svg>',search:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',server:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="1" height="2"/><rect x="5" y="3" width="1" height="2"/><rect x="7" y="3" width="1" height="2"/><rect x="16" y="3" width="1" height="1"/><rect x="16" y="10" width="1" height="1"/><circle fill="none" stroke="#000" cx="9.9" cy="17.4" r="1.4"/><rect x="3" y="10" width="1" height="2"/><rect x="5" y="10" width="1" height="2"/><rect x="9.5" y="14" width="1" height="2"/><rect x="3" y="17" width="6" height="1"/><rect x="11" y="17" width="6" height="1"/><rect fill="none" stroke="#000" x="1.5" y="1.5" width="17" height="5"/><rect fill="none" stroke="#000" x="1.5" y="8.5" width="17" height="5"/></svg>',settings:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15"/><ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15"/><circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15"/><rect x="1" y="3" width="3" height="1"/><rect x="10" y="3" width="8" height="1"/><rect x="1" y="9" width="8" height="1"/><rect x="15" y="9" width="3" height="1"/><rect x="1" y="15" width="3" height="1"/><rect x="10" y="15" width="8" height="1"/></svg>',shrink:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="11 4 12 4 12 8 16 8 16 9 11 9"/><polygon points="4 11 9 11 9 16 8 16 8 12 4 12"/><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12"/></svg>',"sign-in":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="7 2 17 2 17 17 7 17 7 16 16 16 16 3 7 3"/><polygon points="9.1 13.4 8.5 12.8 11.28 10 4 10 4 9 11.28 9 8.5 6.2 9.1 5.62 13 9.5"/></svg>',"sign-out":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5"/><polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3"/></svg>',social:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="13.4" y1="14" x2="6.3" y2="10.7"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13.5" y1="5.5" x2="6.5" y2="8.8"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="4.6" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="14.8" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="4.5" cy="9.8" r="2.3"/></svg>',soundcloud:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.2,9.4c-0.4,0-0.8,0.1-1.101,0.2c-0.199-2.5-2.399-4.5-5-4.5c-0.6,0-1.2,0.1-1.7,0.3C9.2,5.5,9.1,5.6,9.1,5.6V15h8 c1.601,0,2.801-1.2,2.801-2.8C20,10.7,18.7,9.4,17.2,9.4L17.2,9.4z"/><rect x="6" y="6.5" width="1.5" height="8.5"/><rect x="3" y="8" width="1.5" height="7"/><rect y="10" width="1.5" height="5"/></svg>',star:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"/></svg>',strikethrough:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,13.02 L6.65,13.02 C7.64,15.16 8.86,16.12 10.41,16.12 C12.22,16.12 12.92,14.93 12.92,13.89 C12.92,12.55 11.99,12.03 9.74,11.23 C8.05,10.64 6.23,10.11 6.23,7.83 C6.23,5.5 8.09,4.09 10.4,4.09 C11.44,4.09 12.13,4.31 12.72,4.54 L13.33,4 L13.81,4 L13.81,7.59 L13.16,7.59 C12.55,5.88 11.52,4.89 10.07,4.89 C8.84,4.89 7.89,5.69 7.89,7.03 C7.89,8.29 8.89,8.78 10.88,9.45 C12.57,10.03 14.38,10.6 14.38,12.91 C14.38,14.75 13.27,16.93 10.18,16.93 C9.18,16.93 8.17,16.69 7.46,16.39 L6.52,17 L6,17 L6,13.02 L6,13.02 Z"/><rect x="3" y="10" width="15" height="1"/></svg>',table:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="18" height="1"/><rect x="1" y="7" width="18" height="1"/><rect x="1" y="11" width="18" height="1"/><rect x="1" y="15" width="18" height="1"/></svg>',"tablet-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1.5,5 C1.5,4.2 2.2,3.5 3,3.5 L17,3.5 C17.8,3.5 18.5,4.2 18.5,5 L18.5,16 C18.5,16.8 17.8,17.5 17,17.5 L3,17.5 C2.2,17.5 1.5,16.8 1.5,16 L1.5,5 L1.5,5 L1.5,5 Z"/><circle cx="3.7" cy="10.5" r=".8"/></svg>',tablet:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M5,18.5 C4.2,18.5 3.5,17.8 3.5,17 L3.5,3 C3.5,2.2 4.2,1.5 5,1.5 L16,1.5 C16.8,1.5 17.5,2.2 17.5,3 L17.5,17 C17.5,17.8 16.8,18.5 16,18.5 L5,18.5 L5,18.5 L5,18.5 Z"/><circle cx="10.5" cy="16.3" r=".8"/></svg>',tag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 L17.5,3.71 Z"/><circle cx="14" cy="6" r="1"/></svg>',thumbnails:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5"/><rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5"/></svg>',trash:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"/><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"/><rect x="8" y="7" width="1" height="9"/><rect x="11" y="7" width="1" height="9"/><rect x="2" y="3" width="16" height="1"/></svg>',"triangle-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 7 15 7 10 12"/></svg>',"triangle-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12 5 7 10 12 15"/></svg>',"triangle-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="8 5 13 10 8 15"/></svg>',"triangle-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 13 10 8 15 13"/></svg>',tripadvisor:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19.021,7.866C19.256,6.862,20,5.854,20,5.854h-3.346C14.781,4.641,12.504,4,9.98,4C7.363,4,4.999,4.651,3.135,5.876H0\tc0,0,0.738,0.987,0.976,1.988c-0.611,0.837-0.973,1.852-0.973,2.964c0,2.763,2.249,5.009,5.011,5.009\tc1.576,0,2.976-0.737,3.901-1.879l1.063,1.599l1.075-1.615c0.475,0.611,1.1,1.111,1.838,1.451c1.213,0.547,2.574,0.612,3.825,0.15\tc2.589-0.963,3.913-3.852,2.964-6.439c-0.175-0.463-0.4-0.876-0.675-1.238H19.021z M16.38,14.594\tc-1.002,0.371-2.088,0.328-3.06-0.119c-0.688-0.317-1.252-0.817-1.657-1.438c-0.164-0.25-0.313-0.52-0.417-0.811\tc-0.124-0.328-0.186-0.668-0.217-1.014c-0.063-0.689,0.037-1.396,0.339-2.043c0.448-0.971,1.251-1.71,2.25-2.079\tc2.075-0.765,4.375,0.3,5.14,2.366c0.762,2.066-0.301,4.37-2.363,5.134L16.38,14.594L16.38,14.594z M8.322,13.066\tc-0.72,1.059-1.935,1.76-3.309,1.76c-2.207,0-4.001-1.797-4.001-3.996c0-2.203,1.795-4.002,4.001-4.002\tc2.204,0,3.999,1.8,3.999,4.002c0,0.137-0.024,0.261-0.04,0.396c-0.067,0.678-0.284,1.313-0.648,1.853v-0.013H8.322z M2.472,10.775\tc0,1.367,1.112,2.479,2.476,2.479c1.363,0,2.472-1.11,2.472-2.479c0-1.359-1.11-2.468-2.472-2.468\tC3.584,8.306,2.473,9.416,2.472,10.775L2.472,10.775z M12.514,10.775c0,1.367,1.104,2.479,2.471,2.479\tc1.363,0,2.474-1.108,2.474-2.479c0-1.359-1.11-2.468-2.474-2.468c-1.364,0-2.477,1.109-2.477,2.468H12.514z M3.324,10.775\tc0-0.893,0.726-1.618,1.614-1.618c0.889,0,1.625,0.727,1.625,1.618c0,0.898-0.725,1.627-1.625,1.627\tc-0.901,0-1.625-0.729-1.625-1.627H3.324z M13.354,10.775c0-0.893,0.726-1.618,1.627-1.618c0.886,0,1.61,0.727,1.61,1.618\tc0,0.898-0.726,1.627-1.626,1.627s-1.625-0.729-1.625-1.627H13.354z M9.977,4.875c1.798,0,3.425,0.324,4.849,0.968\tc-0.535,0.015-1.061,0.108-1.586,0.3c-1.264,0.463-2.264,1.388-2.815,2.604c-0.262,0.551-0.398,1.133-0.448,1.72\tC9.79,7.905,7.677,5.873,5.076,5.82C6.501,5.208,8.153,4.875,9.94,4.875H9.977z"/></svg>',tumblr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.885,8.598c0,0,0,3.393,0,4.996c0,0.282,0,0.66,0.094,0.942c0.377,1.509,1.131,2.545,2.545,3.11 c1.319,0.472,2.356,0.472,3.676,0c0.565-0.188,1.132-0.659,1.132-0.659l-0.849-2.263c0,0-1.036,0.378-1.603,0.283 c-0.565-0.094-1.226-0.66-1.226-1.508c0-1.603,0-4.902,0-4.902h2.828V5.771h-2.828V2H8.205c0,0-0.094,0.66-0.188,0.942 C7.828,3.791,7.262,4.733,6.603,5.394C5.848,6.147,5,6.43,5,6.43v2.168H6.885z"/></svg>',tv:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="16" width="6" height="1"/><rect fill="none" stroke="#000" x=".5" y="3.5" width="19" height="11"/></svg>',twitter:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 0 20 20" xml:space="preserve"><path d="M17.876,5.137c-0.584,0.256-1.205,0.425-1.854,0.508c0.667-0.398,1.176-1.023,1.415-1.777 C16.816,4.238,16.13,4.5,15.398,4.646c-0.59-0.628-1.431-1.018-2.349-1.018c-1.78,0-3.212,1.445-3.212,3.216 c0,0.255,0.021,0.5,0.074,0.733c-2.673-0.13-5.038-1.412-6.626-3.363c-0.277,0.482-0.44,1.033-0.44,1.626 c0,1.113,0.573,2.1,1.428,2.671c-0.517-0.01-1.023-0.16-1.453-0.396c0,0.01,0,0.022,0,0.035c0,1.563,1.114,2.861,2.576,3.16 c-0.262,0.071-0.546,0.105-0.843,0.105c-0.206,0-0.414-0.012-0.609-0.055c0.417,1.273,1.599,2.209,3.004,2.24 c-1.094,0.855-2.483,1.371-3.986,1.371c-0.264,0-0.517-0.012-0.77-0.045c1.424,0.92,3.112,1.443,4.933,1.443 c5.916,0,9.15-4.901,9.15-9.149c0-0.143-0.004-0.28-0.012-0.416C16.902,6.354,17.438,5.788,17.876,5.137z"/></svg>',uikit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="14.4,3.1 11.3,5.1 15,7.3 15,12.9 10,15.7 5,12.9 5,8.5 2,6.8 2,14.8 9.9,19.5 18,14.8 18,5.3"/><polygon points="9.8,4.2 6.7,2.4 9.8,0.4 12.9,2.3"/></svg>',unlock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="8.5" width="13" height="10"/><path fill="none" stroke="#000" d="M6.5,8.5 L6.5,4.9 C6.5,3 8.1,1.5 10,1.5 C11.9,1.5 13.5,3 13.5,4.9"/></svg>',upload:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4"/></svg>',user:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.9" cy="6.4" r="4.4"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2"/></svg>',users:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"/></svg>',"video-camera":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="17.5 6.9 17.5 13.1 13.5 10.4 13.5 14.5 2.5 14.5 2.5 5.5 13.5 5.5 13.5 9.6 17.5 6.9"/></svg>',vimeo:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.065,7.59C1.84,7.367,1.654,7.082,1.468,6.838c-0.332-0.42-0.137-0.411,0.274-0.772c1.026-0.91,2.004-1.896,3.127-2.688 c1.017-0.713,2.365-1.173,3.286-0.039c0.849,1.045,0.869,2.629,1.084,3.891c0.215,1.309,0.421,2.648,0.88,3.901 c0.127,0.352,0.37,1.018,0.81,1.074c0.567,0.078,1.145-0.917,1.408-1.289c0.684-0.987,1.611-2.317,1.494-3.587 c-0.115-1.349-1.572-1.095-2.482-0.773c0.146-1.514,1.555-3.216,2.912-3.792c1.439-0.597,3.579-0.587,4.302,1.036 c0.772,1.759,0.078,3.802-0.763,5.396c-0.918,1.731-2.1,3.333-3.363,4.829c-1.114,1.329-2.432,2.787-4.093,3.422 c-1.897,0.723-3.021-0.686-3.667-2.318c-0.705-1.777-1.056-3.771-1.565-5.621C4.898,8.726,4.644,7.836,4.136,7.191 C3.473,6.358,2.72,7.141,2.065,7.59C1.977,7.502,2.115,7.551,2.065,7.59L2.065,7.59z"/></svg>',warning:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="14" r="1"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><path d="M10.97,7.72 C10.85,9.54 10.56,11.29 10.56,11.29 C10.51,11.87 10.27,12 9.99,12 C9.69,12 9.49,11.87 9.43,11.29 C9.43,11.29 9.16,9.54 9.03,7.72 C8.96,6.54 9.03,6 9.03,6 C9.03,5.45 9.46,5.02 9.99,5 C10.53,5.01 10.97,5.44 10.97,6 C10.97,6 11.04,6.54 10.97,7.72 L10.97,7.72 Z"/></svg>',whatsapp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.7,3.3c-1.8-1.8-4.1-2.8-6.7-2.8c-5.2,0-9.4,4.2-9.4,9.4c0,1.7,0.4,3.3,1.3,4.7l-1.3,4.9l5-1.3c1.4,0.8,2.9,1.2,4.5,1.2 l0,0l0,0c5.2,0,9.4-4.2,9.4-9.4C19.5,7.4,18.5,5,16.7,3.3 M10.1,17.7L10.1,17.7c-1.4,0-2.8-0.4-4-1.1l-0.3-0.2l-3,0.8l0.8-2.9 l-0.2-0.3c-0.8-1.2-1.2-2.7-1.2-4.2c0-4.3,3.5-7.8,7.8-7.8c2.1,0,4.1,0.8,5.5,2.3c1.5,1.5,2.3,3.4,2.3,5.5 C17.9,14.2,14.4,17.7,10.1,17.7 M14.4,11.9c-0.2-0.1-1.4-0.7-1.6-0.8c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.6,0.8-0.8,0.9 c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5C8,8.8,8.1,8.7,8.2,8.5 c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.2,0-0.3,0-0.4C8.4,7.6,7.9,6.5,7.7,6C7.5,5.5,7.3,5.6,7.2,5.6c-0.1,0-0.3,0-0.4,0 c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.8,0.8-0.8,2c0,1.2,0.8,2.3,1,2.4c0.1,0.2,1.7,2.5,4,3.5c0.6,0.2,1,0.4,1.3,0.5 c0.6,0.2,1.1,0.2,1.5,0.1c0.5-0.1,1.4-0.6,1.6-1.1c0.2-0.5,0.2-1,0.1-1.1C14.8,12.1,14.6,12,14.4,11.9"/></svg>',wordpress:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5c5.2,0,9.5-4.3,9.5-9.5S15.2,0.5,10,0.5L10,0.5L10,0.5z M15.6,3.9h-0.1 c-0.8,0-1.4,0.7-1.4,1.5c0,0.7,0.4,1.3,0.8,1.9c0.3,0.6,0.7,1.3,0.7,2.3c0,0.7-0.3,1.5-0.6,2.7L14.1,15l-3-8.9 c0.5,0,0.9-0.1,0.9-0.1C12.5,6,12.5,5.3,12,5.4c0,0-1.3,0.1-2.2,0.1C9,5.5,7.7,5.4,7.7,5.4C7.2,5.3,7.2,6,7.6,6c0,0,0.4,0.1,0.9,0.1 l1.3,3.5L8,15L5,6.1C5.5,6.1,5.9,6,5.9,6C6.4,6,6.3,5.3,5.9,5.4c0,0-1.3,0.1-2.2,0.1c-0.2,0-0.3,0-0.5,0c1.5-2.2,4-3.7,6.9-3.7 C12.2,1.7,14.1,2.6,15.6,3.9L15.6,3.9L15.6,3.9z M2.5,6.6l3.9,10.8c-2.7-1.3-4.6-4.2-4.6-7.4C1.8,8.8,2,7.6,2.5,6.6L2.5,6.6L2.5,6.6 z M10.2,10.7l2.5,6.9c0,0,0,0.1,0.1,0.1C11.9,18,11,18.2,10,18.2c-0.8,0-1.6-0.1-2.3-0.3L10.2,10.7L10.2,10.7L10.2,10.7z M14.2,17.1 l2.5-7.3c0.5-1.2,0.6-2.1,0.6-2.9c0-0.3,0-0.6-0.1-0.8c0.6,1.2,1,2.5,1,4C18.3,13,16.6,15.7,14.2,17.1L14.2,17.1L14.2,17.1z"/></svg>',world:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1,10.5 L19,10.5"/><path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5"/><path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5"/><path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z"/><circle fill="none" stroke="#000" cx="10" cy="10.5" r="9"/></svg>',xing:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.4,4.56 C4.24,4.56 4.11,4.61 4.05,4.72 C3.98,4.83 3.99,4.97 4.07,5.12 L5.82,8.16 L5.82,8.17 L3.06,13.04 C2.99,13.18 2.99,13.33 3.06,13.44 C3.12,13.55 3.24,13.62 3.4,13.62 L6,13.62 C6.39,13.62 6.57,13.36 6.71,13.12 C6.71,13.12 9.41,8.35 9.51,8.16 C9.49,8.14 7.72,5.04 7.72,5.04 C7.58,4.81 7.39,4.56 6.99,4.56 L4.4,4.56 L4.4,4.56 Z"/><path d="M15.3,1 C14.91,1 14.74,1.25 14.6,1.5 C14.6,1.5 9.01,11.42 8.82,11.74 C8.83,11.76 12.51,18.51 12.51,18.51 C12.64,18.74 12.84,19 13.23,19 L15.82,19 C15.98,19 16.1,18.94 16.16,18.83 C16.23,18.72 16.23,18.57 16.16,18.43 L12.5,11.74 L12.5,11.72 L18.25,1.56 C18.32,1.42 18.32,1.27 18.25,1.16 C18.21,1.06 18.08,1 17.93,1 L15.3,1 L15.3,1 Z"/></svg>',yelp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.175,14.971c-0.112,0.77-1.686,2.767-2.406,3.054c-0.246,0.1-0.487,0.076-0.675-0.069\tc-0.122-0.096-2.446-3.859-2.446-3.859c-0.194-0.293-0.157-0.682,0.083-0.978c0.234-0.284,0.581-0.393,0.881-0.276\tc0.016,0.01,4.21,1.394,4.332,1.482c0.178,0.148,0.263,0.379,0.225,0.646L17.175,14.971L17.175,14.971z M11.464,10.789\tc-0.203-0.307-0.199-0.666,0.009-0.916c0,0,2.625-3.574,2.745-3.657c0.203-0.135,0.452-0.141,0.69-0.025\tc0.691,0.335,2.085,2.405,2.167,3.199v0.027c0.024,0.271-0.082,0.491-0.273,0.623c-0.132,0.083-4.43,1.155-4.43,1.155\tc-0.322,0.096-0.68-0.06-0.882-0.381L11.464,10.789z M9.475,9.563C9.32,9.609,8.848,9.757,8.269,8.817c0,0-3.916-6.16-4.007-6.351\tc-0.057-0.212,0.011-0.455,0.202-0.65C5.047,1.211,8.21,0.327,9.037,0.529c0.27,0.069,0.457,0.238,0.522,0.479\tc0.047,0.266,0.433,5.982,0.488,7.264C10.098,9.368,9.629,9.517,9.475,9.563z M9.927,19.066c-0.083,0.225-0.273,0.373-0.54,0.421\tc-0.762,0.13-3.15-0.751-3.647-1.342c-0.096-0.131-0.155-0.262-0.167-0.394c-0.011-0.095,0-0.189,0.036-0.272\tc0.061-0.155,2.917-3.538,2.917-3.538c0.214-0.272,0.595-0.355,0.952-0.213c0.345,0.13,0.56,0.428,0.536,0.749\tC10.014,14.479,9.977,18.923,9.927,19.066z M3.495,13.912c-0.235-0.009-0.444-0.148-0.568-0.382c-0.089-0.17-0.151-0.453-0.19-0.794\tC2.63,11.701,2.761,10.144,3.07,9.648c0.145-0.226,0.357-0.345,0.592-0.336c0.154,0,4.255,1.667,4.255,1.667\tc0.321,0.118,0.521,0.453,0.5,0.833c-0.023,0.37-0.236,0.655-0.551,0.738L3.495,13.912z"/></svg>',youtube:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 0 20 20" xml:space="preserve"><path d="M17.205,5.724c-0.563-0.67-1.605-0.943-3.594-0.943H6.39c-2.034,0-3.092,0.291-3.655,1.005 C2.188,6.482,2.188,7.508,2.188,8.927v2.705c0,2.75,0.65,4.146,4.203,4.146h7.221c1.725,0,2.68-0.242,3.298-0.833 c0.635-0.606,0.905-1.599,0.905-3.313V8.927C17.814,7.43,17.772,6.398,17.205,5.724z M12.221,10.653l-3.279,1.714 c-0.073,0.036-0.154,0.057-0.234,0.057c-0.09,0-0.18-0.025-0.261-0.072c-0.15-0.092-0.243-0.255-0.243-0.432V8.503 c0-0.175,0.093-0.34,0.243-0.431C8.597,7.981,8.784,7.976,8.94,8.057l3.279,1.702c0.166,0.086,0.271,0.259,0.271,0.447 C12.491,10.393,12.386,10.565,12.221,10.653z"/></svg>',chat:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" version="1.1"><path d="m 15.596149,15.076339 c 2.100207,-2.422432 1.842469,-6.0755195 -0.527046,-8.1956995 1.217073,4.2648485 -2.00119,8.5250205 -6.4351641,8.5250205 -0.08536,0 0.429784,0.0031 -1.599283,-0.0095 1.109765,1.104593 2.58786,1.706618 4.1309151,1.706618 0.004,0 5.437572,-0.0278 5.440771,-0.0278 0.370943,-0.0017 0.555733,-0.453211 0.291125,-0.714369 z" stroke-width=".028"/><path d="m 8.6339389,14.571018 c 3.2290571,0 5.8560891,-2.627168 5.8560891,-5.8563955 0,-3.229224 -2.627005,-5.856396 -5.8560891,-5.856396 -3.229088,0 -5.856062,2.627172 -5.856062,5.856396 0,1.4216455 0.503231,2.7661955 1.42548,3.8299725 l -1.301314,1.284235 c -0.263748,0.260324 -0.08104,0.712558 0.291148,0.714368 0.0027,2.8e-5 5.43791,0.0278 5.440748,0.0278 z M 6.1440649,6.6419315 h 5.0075671 c 0.230473,0 0.417292,0.18685 0.417292,0.417319 0,0.230473 -0.186819,0.417323 -0.417292,0.417323 H 6.1440649 c -0.230473,0 -0.417292,-0.18685 -0.417292,-0.417323 0,-0.230469 0.186847,-0.417319 0.417292,-0.417319 z m 0,1.669283 h 5.0075671 c 0.230473,0 0.417292,0.186846 0.417292,0.417319 0,0.230473 -0.186819,0.417319 -0.417292,0.417319 H 6.1440649 c -0.230473,0 -0.417292,-0.186846 -0.417292,-0.417319 0,-0.230473 0.186847,-0.417319 0.417292,-0.417319 z m -0.417292,2.0865995 c 0,-0.23047 0.186819,-0.4173194 0.417292,-0.4173194 h 5.0075671 c 0.230473,0 0.417292,0.1868494 0.417292,0.4173194 0,0.230473 -0.186819,0.417322 -0.417292,0.417322 H 6.1440649 c -0.230445,0 -0.417292,-0.186849 -0.417292,-0.417322 z" stroke-width=".028"/></svg>',"external-link":'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="511.626" height="511.627" viewBox="0 0 511.626 511.627" xml:space="preserve"><path d="M392.857,292.354h-18.274c-2.669,0-4.859,0.855-6.563,2.573c-1.718,1.708-2.573,3.897-2.573,6.563v91.361 c0,12.563-4.47,23.315-13.415,32.262c-8.945,8.945-19.701,13.414-32.264,13.414H82.224c-12.562,0-23.317-4.469-32.264-13.414 c-8.945-8.946-13.417-19.698-13.417-32.262V155.31c0-12.562,4.471-23.313,13.417-32.259c8.947-8.947,19.702-13.418,32.264-13.418 h200.994c2.669,0,4.859-0.859,6.57-2.57c1.711-1.713,2.566-3.9,2.566-6.567V82.221c0-2.662-0.855-4.853-2.566-6.563 c-1.711-1.713-3.901-2.568-6.57-2.568H82.224c-22.648,0-42.016,8.042-58.102,24.125C8.042,113.297,0,132.665,0,155.313v237.542 c0,22.647,8.042,42.018,24.123,58.095c16.086,16.084,35.454,24.13,58.102,24.13h237.543c22.647,0,42.017-8.046,58.101-24.13 c16.085-16.077,24.127-35.447,24.127-58.095v-91.358c0-2.669-0.856-4.859-2.574-6.57 C397.709,293.209,395.519,292.354,392.857,292.354z"/><path d="M506.199,41.971c-3.617-3.617-7.905-5.424-12.85-5.424H347.171c-4.948,0-9.233,1.807-12.847,5.424 c-3.617,3.615-5.428,7.898-5.428,12.847s1.811,9.233,5.428,12.85l50.247,50.248L198.424,304.067 c-1.906,1.903-2.856,4.093-2.856,6.563c0,2.479,0.953,4.668,2.856,6.571l32.548,32.544c1.903,1.903,4.093,2.852,6.567,2.852 s4.665-0.948,6.567-2.852l186.148-186.148l50.251,50.248c3.614,3.617,7.898,5.426,12.847,5.426s9.233-1.809,12.851-5.426 c3.617-3.616,5.424-7.898,5.424-12.847V54.818C511.626,49.866,509.813,45.586,506.199,41.971z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 5.292 5.292" version="1.1"><path d="M 510.096,249.937 C 506.064,244.07 409.168,106.662 255.995,106.662 124.56,106.662 7.44,243.281 2.512,249.105 c -3.349,3.968 -3.349,9.792 0,13.781 4.928,5.824 122.048,142.443 253.483,142.443 131.435,0 248.554,-136.619 253.482,-142.443 3.094,-3.669 3.371,-8.981 0.619,-12.949 z M 255.995,383.996 c -105.365,0 -205.547,-100.48 -230.997,-128 25.408,-27.541 125.483,-128 230.997,-128 123.285,0 210.304,100.331 231.552,127.424 -24.534,26.645 -125.291,128.576 -231.552,128.576 z" transform="translate(.045 -.102) scale(.01016)"/><path d="m 255.995,170.662 c -47.061,0 -85.333,38.272 -85.333,85.333 0,47.061 38.272,85.333 85.333,85.333 47.061,0 85.333,-38.272 85.333,-85.333 0,-47.061 -38.272,-85.333 -85.333,-85.333 z m 0,149.334 c -35.285,0 -64,-28.715 -64,-64 0,-35.285 28.715,-64 64,-64 35.285,0 64,28.715 64,64 0,35.285 -28.715,64 -64,64 z" transform="translate(.045 -.102) scale(.01016)"/></svg>',"login-card":'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="438.529" height="438.529" viewBox="0 0 438.529 438.529" xml:space="preserve"><path d="M219.265,219.267c30.271,0,56.108-10.71,77.518-32.121c21.412-21.411,32.12-47.248,32.12-77.515 c0-30.262-10.708-56.1-32.12-77.516C275.366,10.705,249.528,0,219.265,0S163.16,10.705,141.75,32.115 c-21.414,21.416-32.121,47.253-32.121,77.516c0,30.267,10.707,56.104,32.121,77.515 C163.166,208.557,189.001,219.267,219.265,219.267z"/><path d="M419.258,335.036c-0.668-9.609-2.002-19.985-3.997-31.121c-1.999-11.136-4.524-21.457-7.57-30.978 c-3.046-9.514-7.139-18.794-12.278-27.836c-5.137-9.041-11.037-16.748-17.703-23.127c-6.666-6.377-14.801-11.465-24.406-15.271 c-9.617-3.805-20.229-5.711-31.84-5.711c-1.711,0-5.709,2.046-11.991,6.139c-6.276,4.093-13.367,8.662-21.266,13.708 c-7.898,5.037-18.182,9.609-30.834,13.695c-12.658,4.093-25.361,6.14-38.118,6.14c-12.752,0-25.456-2.047-38.112-6.14 c-12.655-4.086-22.936-8.658-30.835-13.695c-7.898-5.046-14.987-9.614-21.267-13.708c-6.283-4.093-10.278-6.139-11.991-6.139 c-11.61,0-22.222,1.906-31.833,5.711c-9.613,3.806-17.749,8.898-24.412,15.271c-6.661,6.379-12.562,14.086-17.699,23.127 c-5.137,9.042-9.229,18.326-12.275,27.836c-3.045,9.521-5.568,19.842-7.566,30.978c-2,11.136-3.332,21.505-3.999,31.121 c-0.666,9.616-0.998,19.466-0.998,29.554c0,22.836,6.949,40.875,20.842,54.104c13.896,13.224,32.36,19.835,55.39,19.835h249.533 c23.028,0,41.49-6.611,55.388-19.835c13.901-13.229,20.845-31.265,20.845-54.104C420.264,354.502,419.932,344.652,419.258,335.036 z"/></svg>',"map-marker":'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="512" height="512" viewBox="0 0 512 512" xml:space="preserve"><path d="M256,0C167.641,0,96,71.625,96,160c0,24.75,5.625,48.219,15.672,69.125C112.234,230.313,256,512,256,512l142.594-279.375 C409.719,210.844,416,186.156,416,160C416,71.625,344.375,0,256,0z M256,256c-53.016,0-96-43-96-96s42.984-96,96-96 c53,0,96,43,96,96S309,256,256,256z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#DA291C"/></svg>',"sign-right-arrow":'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" version="1.1"><path d="M 18.670672,9.1825495 10.801933,1.3138093 c -0.439944,-0.4399427 -1.1536219,-0.4399427 -1.5939189,0 l -7.86874,7.8687402 c -0.43994304,0.4402929 -0.43994304,1.1536205 0,1.5939175 l 7.86874,7.86874 c 0.439944,0.440297 1.1536249,0.440297 1.5939189,0 l 7.868739,-7.86874 c 0.439944,-0.440297 0.439944,-1.1536246 0,-1.5939175 z m -3.548363,0.4413513 -2.95908,2.7313722 c -0.179914,0.166211 -0.47192,0.03866 -0.47192,-0.206618 V 10.260623 H 8.3179351 v 2.248912 c 0,0.155319 -0.125797,0.281116 -0.281111,0.281116 h -1.124458 c -0.155318,0 -0.281115,-0.125797 -0.281115,-0.281116 V 9.6983936 c 0,-0.6209121 0.503545,-1.1244582 1.124457,-1.1244582 H 11.691309 V 6.6859029 c 0,-0.2449196 0.291655,-0.3728278 0.47192,-0.2066184 l 2.95908,2.7313755 c 0.120526,0.1113951 0.120526,0.3018476 0,0.4132408 z" fill="currentColor" stroke-width=".035"/></svg>',vk:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="20" height="20" viewBox="0 0 20 20" xml:space="preserve"><defs><rect id="a" x="1.857" y="5.234" width="16.268" height="9.297"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" d="M17.935,13.563c-0.021-0.044-0.038-0.078-0.056-0.106c-0.279-0.505-0.817-1.124-1.607-1.859 l-0.018-0.018l-0.008-0.008l-0.009-0.007h-0.008c-0.358-0.344-0.587-0.574-0.682-0.692c-0.174-0.223-0.214-0.451-0.118-0.681 c0.068-0.174,0.319-0.542,0.758-1.103c0.23-0.297,0.411-0.535,0.547-0.715c0.972-1.291,1.391-2.115,1.263-2.474l-0.051-0.084 c-0.033-0.05-0.12-0.097-0.262-0.139c-0.139-0.042-0.317-0.049-0.537-0.021l-2.425,0.017c-0.038-0.014-0.096-0.013-0.168,0.004 s-0.108,0.026-0.108,0.026l-0.042,0.021L14.37,5.75c-0.028,0.017-0.06,0.046-0.094,0.088c-0.032,0.042-0.061,0.091-0.083,0.147 c-0.264,0.678-0.564,1.31-0.899,1.893c-0.208,0.349-0.398,0.649-0.573,0.905c-0.174,0.255-0.32,0.444-0.437,0.564 c-0.118,0.121-0.225,0.217-0.32,0.291c-0.095,0.072-0.17,0.104-0.219,0.092c-0.052-0.012-0.1-0.023-0.144-0.034 c-0.08-0.05-0.143-0.118-0.19-0.206c-0.047-0.086-0.08-0.196-0.095-0.329c-0.018-0.131-0.027-0.245-0.03-0.34 c-0.002-0.095,0-0.23,0.003-0.404c0.006-0.174,0.01-0.292,0.01-0.354c0-0.213,0.004-0.445,0.012-0.694 c0.01-0.25,0.016-0.448,0.021-0.594c0.006-0.146,0.01-0.3,0.01-0.463c0-0.163-0.01-0.291-0.03-0.383 c-0.02-0.092-0.048-0.182-0.088-0.27c-0.04-0.087-0.097-0.154-0.173-0.201c-0.074-0.048-0.17-0.085-0.28-0.114 c-0.299-0.067-0.676-0.104-1.138-0.109C8.59,5.224,7.919,5.292,7.622,5.438c-0.118,0.062-0.225,0.146-0.32,0.252 C7.201,5.813,7.187,5.881,7.259,5.892c0.337,0.05,0.575,0.171,0.716,0.362l0.051,0.101c0.038,0.073,0.078,0.202,0.116,0.387 c0.04,0.186,0.065,0.391,0.077,0.614c0.028,0.41,0.028,0.76,0,1.053C8.19,8.7,8.163,8.927,8.139,9.089 C8.114,9.252,8.076,9.384,8.026,9.485C7.975,9.586,7.94,9.647,7.923,9.67C7.908,9.692,7.893,9.707,7.881,9.712 C7.809,9.741,7.733,9.754,7.654,9.754c-0.078,0-0.173-0.039-0.286-0.117C7.257,9.558,7.14,9.45,7.02,9.312 c-0.121-0.137-0.257-0.33-0.408-0.576C6.459,8.489,6.303,8.198,6.14,7.86L6.005,7.617C5.921,7.459,5.806,7.232,5.661,6.931 c-0.146-0.3-0.275-0.589-0.387-0.871c-0.045-0.118-0.113-0.208-0.203-0.27L5.03,5.765C5.001,5.743,4.957,5.719,4.895,5.693 C4.833,5.669,4.769,5.65,4.701,5.639L2.395,5.655C2.16,5.655,2,5.709,1.916,5.815l-0.034,0.05 C1.866,5.895,1.857,5.939,1.857,6.001c0,0.062,0.016,0.137,0.05,0.228C2.244,7.02,2.609,7.782,3.006,8.517 c0.395,0.735,0.739,1.327,1.03,1.776c0.292,0.45,0.589,0.873,0.892,1.271c0.303,0.397,0.504,0.653,0.602,0.766 c0.098,0.114,0.175,0.196,0.231,0.253l0.21,0.202c0.135,0.136,0.332,0.295,0.594,0.484c0.26,0.188,0.55,0.373,0.866,0.556 c0.317,0.182,0.687,0.33,1.107,0.446c0.421,0.114,0.831,0.16,1.229,0.137h0.968c0.196-0.015,0.345-0.078,0.445-0.185l0.032-0.042 c0.023-0.032,0.044-0.086,0.065-0.156c0.019-0.068,0.028-0.146,0.028-0.23c-0.006-0.242,0.014-0.459,0.056-0.651 c0.042-0.194,0.089-0.339,0.143-0.438c0.054-0.097,0.112-0.181,0.181-0.247c0.066-0.069,0.114-0.109,0.144-0.122 c0.028-0.016,0.049-0.025,0.066-0.031c0.135-0.043,0.293,0,0.477,0.132c0.183,0.132,0.352,0.293,0.512,0.487 s0.353,0.412,0.577,0.652c0.226,0.241,0.422,0.421,0.589,0.539l0.168,0.101c0.112,0.068,0.259,0.13,0.438,0.185 c0.179,0.058,0.337,0.071,0.47,0.042l2.155-0.032c0.213,0,0.379-0.036,0.497-0.106c0.118-0.068,0.187-0.146,0.21-0.23 c0.022-0.084,0.024-0.18,0.005-0.286C17.973,13.68,17.953,13.605,17.935,13.563L17.935,13.563z M17.935,13.563"/></svg>'})}return"undefined"!=typeof window&&window.UIkit&&window.UIkit.use(e),e});;
!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=4)}([function(t,e,i){"use strict";e.a={"breakpoint-small":640,"breakpoint-medium":960,"breakpoint-large":1200,"breakpoint-xlarge":1600}},,,,function(t,e,i){"use strict";i.r(e);var n=i(0);function r(t,e){if(t!==e)throw new TypeError("Cannot instantiate an arrow function")}!function(t,e){e.behaviors.loginMenu={attach:function(e,i){var u=this;t(window,e).once("login_menu").each(function(){var e=this;r(this,u);var i=document.getElementById("login-menu-nav");UIkit.util.on(i,"show",function(i){r(this,e);var u=i.target,o=u.parentNode,a=window.innerWidth,l=window.innerHeight,d=UIkit.util.query("button.ck-login-menu-block span.uk-chevron-down",o),s=UIkit.util.query("button.uk-close",o),c=UIkit.util.query(".ck-slide-menu-close"),k=UIkit.util.query(".ck-slide-burger-icon");UIkit.util.addClass(d,["transform-rotate-180"]),a<n.a["breakpoint-medium"]?(t(u).css({width:"600%",height:l,left:"calc(-83.333%*6 + 50px)","max-width":"600%"}),UIkit.util.removeClass(s,["uk-hidden"]),UIkit.util.addClass(c,["uk-hidden"]),UIkit.util.addClass(k,["uk-hidden"])):(t(u).css({width:"",height:""}),UIkit.util.addClass(t(u),["uk-width-medium"]))}.bind(this)),UIkit.util.on(i,"hide",function(i){r(this,e);var u=window.innerWidth,o=i.target,a=o.parentNode,l=t("button.ck-login-menu-block span.uk-chevron-down",a),d=UIkit.util.query("button.uk-close",a),s=UIkit.util.query(".ck-slide-menu-close"),c=UIkit.util.query(".ck-slide-burger-icon");UIkit.util.addClass(d,["uk-hidden"]),UIkit.util.removeClass(l,["transform-rotate-180"]),UIkit.util.removeClass(s,["uk-hidden"]),UIkit.util.removeClass(c,["uk-hidden"]),u<n.a["breakpoint-medium"]?t(o).css({width:"auto",height:"auto"}):(t(o).css({width:"",height:""}),UIkit.util.addClass(t(o),["uk-width-medium"]))}.bind(this))}.bind(this))}}}(jQuery,Drupal)}]);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

Drupal.debounce = function (func, wait, immediate) {
  var timeout;
  var result;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;

    var later = function later() {
      timeout = null;

      if (!immediate) {
        result = func.apply(context, args);
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
    }

    return result;
  };
};;
!function(e){var n={};function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=n,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)i.d(t,a,function(n){return e[n]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i(i.s=5)}({0:function(e,n,i){"use strict";n.a={"breakpoint-small":640,"breakpoint-medium":960,"breakpoint-large":1200,"breakpoint-xlarge":1600}},5:function(e,n,i){"use strict";i.r(n);var t=i(0);function a(e,n){if(e!==n)throw new TypeError("Cannot instantiate an arrow function")}!function(e,n,i,o){n.behaviors.mainMenu={attach:function(n,r){var c=this,s=!1,u=e(".ck-slide-menu"),l=e(".ck-sliding-menu",u),d=e(".ck-navigation-block"),h=function(){a(this,c),s=!1,UIkit.offcanvas("#main-menu").$destroy(),u.removeClass("uk-offcanvas"),e("> div",u).removeClass("uk-offcanvas-bar menu-offcanvas"),d.append(u),e(".uk-navbar-container",d).hide(),e(".uk-offcanvas-close",d).hide(),e(document).off("click",".ck-sliding-menu li.back",f),e("li.back",l).remove(),e("a span.uk-icon",l).not(".store-locator span.uk-icon").remove(),e("li.attached-element").remove(),e("ul",l).show(),e("ul",u).css({width:"auto"}),e("li > ul",l).css({width:""}),e("a:not(:last-child)",l).off(),e(".top-region .uk-flex").prepend(e(".ck-top-menu-block")).prepend(e(".ck-store-locator-block")),e("li.store-locator",l).remove(),e("li.top-menu",l).remove()}.bind(this),f=function(n){if(a(this,c),n.currentTarget){var i=e(n.currentTarget);e(".uk-offcanvas-bar",u).animate({scrollLeft:"-="+i.outerWidth()},100,"swing")}}.bind(this),m=function(){var n=this;a(this,c),UIkit.offcanvas("#main-menu",{mode:"slide"}),UIkit.util.on("#main-menu","beforeshow",function(i){a(this,n),e("header").addClass("open-menu-header"),e("main").css("margin-top","112px"),e(".ck-slide-burger-icon",d).hide(),e(".ck-slide-menu-close",d).show()}.bind(this)),UIkit.util.on("#main-menu","hidden",function(i){a(this,n),e("header").removeClass("open-menu-header"),e("main").css("margin-top","0"),e(".ck-slide-burger-icon",d).show(),e(".ck-slide-menu-close",d).hide()}.bind(this)),l.append('<li class="top-menu"></li>'),e(".top-menu").append(e(".ck-top-menu-block")),e("a:not(:last-child)",l).append('<span uk-icon="icon: chevron-right; ratio: 0.85;" class="icon-chevron-right uk-float-right uk-hidden@m"></span>'),e("ul ul",l).each(function(i,t){a(this,n);var o=e(t).parent(),r=e("> a",o);r[0]&&e(t).prepend('<li class="attached-element"><a href="'.concat(r[0].href,'">').concat(r[0].innerText,"</a></li>"))}.bind(this)),e("ul",l).not("li.top-menu ul").prepend('<li class="back"><span class="uk-margin-small-right" uk-icon="chevron-left"></span>'.concat(o.ck_main_menu.backText,"</li>")),e(document).on("click",".ck-sliding-menu li.back",f),e("a:not(:last-child)",l).on("click",function(i){a(this,n),i.preventDefault(),e("ul",u).removeAttr("ck-active"),e("ul",l).not("li.top-menu ul").hide();var t=e(i.target).parents(),o=0,r=1;for(o=0;o<t.length&&!e(t[o]).hasClass("ck-sliding-menu");o++)e("> ul",e(t[o])).show(),e(t[o]).is("ul")&&r++;e(i.target).parent().parent().attr("ck-active",r),e(".uk-offcanvas-bar",u).animate({scrollLeft:"+="+window.innerWidth},100,"swing")}.bind(this)),s=!0}.bind(this),v=function(){a(this,c),e("li.menu-item a",l).off("click"),e(document).off("click")}.bind(this),p=function(){var n=this;a(this,c),e("ul",l).hide(),e(document).on("click",function(i){a(this,n),!e(i.target).closest(l).length&&e("li > ul",l).is(":visible")&&(e("li > ul",l).hide(),e("> li",l).removeClass("active"))}.bind(this)),e("li.menu-item > a",l).on("click",function(i){a(this,n);var t=e(i.currentTarget).parent();t.children().length>1&&(i.preventDefault(),t.hasClass("active")?(e("ul",t).hide(),t.removeClass("active")):(e("> li",l).removeClass("active"),t.addClass("active"),e("li > ul",l).hide(),e("ul",t).show()))}.bind(this))}.bind(this);e(window,n).once("main_menu").each(function(){var n=this;a(this,c),window.innerWidth<t.a["breakpoint-medium"]?(v(),m()):(e("> div",u).removeClass("uk-offcanvas-bar menu-offcanvas"),e(".uk-navbar-container",d).hide(),e(".uk-offcanvas-close",u).hide(),p()),UIkit.util.on("#main-menu","hidden",function(i){a(this,n),e(".ck-slide-menu-close").hide(),e(".ck-slide-burger-icon").show()}.bind(this));var o=i(function(){var i=this;a(this,n),window.innerWidth<=t.a["breakpoint-medium"]&&!s&&(e("> div",u).addClass("uk-offcanvas-bar menu-offcanvas"),e(".uk-navbar-container",d).show(),e(".uk-offcanvas-close",u).show(),v(),m()),window.innerWidth>t.a["breakpoint-medium"]&&s&&(h(),p()),s&&(e("ul",u).css({width:e(window).width()}),e("ul",u).each(function(n,t){a(this,i),e(t).attr("ck-active")&&e("> div",u).scrollLeft(e(window).width()*e(t).attr("ck-active"))}.bind(this)))}.bind(this),250);window.addEventListener("resize",o)}.bind(this))}}}(jQuery,Drupal,Drupal.debounce,drupalSettings)}});;
/*!
 * jQuery Form Plugin
 * version: 4.2.2
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,r){return void 0===r&&(r="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(r),r}:e(jQuery)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).closest("form").ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=r.form;if(i.clk=r,"image"===r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==e('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var o=!!e.fn.prop;e.fn.attr2=function(){if(!o)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t,r,n,s){function u(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;a<o;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function c(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){a("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function i(){function t(){try{var e=n(v).readyState;a("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){a("Server abort: ",e," (",e.name,")"),s(L),j&&clearTimeout(j),j=void 0}}var r=p.attr2("target"),i=p.attr2("action"),o=p.attr("enctype")||p.attr("encoding")||"multipart/form-data";w.setAttribute("target",m),l&&!/post/i.test(l)||w.setAttribute("method","POST"),i!==f.url&&w.setAttribute("action",f.url),f.skipEncodingOverride||l&&!/post/i.test(l)||p.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(j=setTimeout(function(){T=!0,s(A)},f.timeout));var u=[];try{if(f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&(e.isPlainObject(f.extraData[c])&&f.extraData[c].hasOwnProperty("name")&&f.extraData[c].hasOwnProperty("value")?u.push(e('<input type="hidden" name="'+f.extraData[c].name+'">',k).val(f.extraData[c].value).appendTo(w)[0]):u.push(e('<input type="hidden" name="'+c+'">',k).val(f.extraData[c]).appendTo(w)[0]));f.iframeTarget||h.appendTo(D),v.attachEvent?v.attachEvent("onload",s):v.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(e){document.createElement("form").submit.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",o),r?w.setAttribute("target",r):p.removeAttr("target"),e(u).remove()}}function s(t){if(!x.aborted&&!X){if((O=n(v))||(a("cannot access response document"),t=L),t===A&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t===L&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(O&&O.location.href!==f.iframeSrc||T){v.detachEvent?v.detachEvent("onload",s):v.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"===f.dataType||O.XMLDocument||e.isXMLDoc(O);if(a("isXml="+o),!o&&window.opera&&(null===O.body||!O.body.innerHTML)&&--C)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=O.body?O.body:O.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=O.XMLDocument?O.XMLDocument:O,o&&(f.dataType="xml"),x.getResponseHeader=function(e){return{"content-type":f.dataType}[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(f.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||f.textarea){var p=O.getElementsByTagName("textarea")[0];if(p)x.responseText=p.value,x.status=Number(p.getAttribute("status"))||x.status,x.statusText=p.getAttribute("statusText")||x.statusText;else if(l){var m=O.getElementsByTagName("pre")[0],g=O.getElementsByTagName("body")[0];m?x.responseText=m.textContent?m.textContent:m.innerText:g&&(x.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!x.responseXML&&x.responseText&&(x.responseXML=q(x.responseText));try{M=N(x,c,f)}catch(e){i="parsererror",x.error=r=e||i}}catch(e){a("error caught: ",e),i="error",x.error=r=e||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(f.success&&f.success.call(f.context,M,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,f])):i&&(void 0===r&&(r=x.statusText),f.error&&f.error.call(f.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,f,r])),d&&e.event.trigger("ajaxComplete",[x,f]),d&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,x,i),X=!0,f.timeout&&clearTimeout(j),setTimeout(function(){f.iframeTarget?h.attr("src",f.iframeSrc):h.remove(),x.responseXML=null},100)}}}var u,c,f,d,m,h,v,x,y,b,T,j,w=p[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;c<g.length;c++)u=e(g[c]),o?u.prop("disabled",!1):u.removeAttr("disabled");(f=e.extend(!0,{},e.ajaxSettings,t)).context=f.context||f,m="jqFormIO"+(new Date).getTime();var k=w.ownerDocument,D=p.closest("body");if(f.iframeTarget?(b=(h=e(f.iframeTarget,k)).attr2("name"))?m=b:h.attr2("name",m):(h=e('<iframe name="'+m+'" src="'+f.iframeSrc+'" />',k)).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=h[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}h.attr("src",f.iframeSrc),x.error=r,f.error&&f.error.call(f.context,x,r,t),d&&e.event.trigger("ajaxError",[x,f,r]),f.complete&&f.complete.call(f.context,x,r)}},(d=f.global)&&0==e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,f]),f.beforeSend&&!1===f.beforeSend.call(f.context,x,f))return f.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;(y=w.clk)&&(b=y.name)&&!y.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=y.value,"image"===y.type&&(f.extraData[b+".x"]=w.clk_x,f.extraData[b+".y"]=w.clk_y));var A=1,L=2,F=e("meta[name=csrf-token]").attr("content"),E=e("meta[name=csrf-param]").attr("content");E&&F&&(f.extraData=f.extraData||{},f.extraData[E]=F),f.forceSync?i():setTimeout(i,10);var M,O,X,C=50,q=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},_=e.parseJSON||function(e){return window.eval("("+e+")")},N=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i=("xml"===r||!r)&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&(("json"===r||!r)&&n.indexOf("json")>=0?o=_(o):("script"===r||!r)&&n.indexOf("javascript")>=0&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var l,f,d,p=this;"function"==typeof t?t={success:t}:"string"==typeof t||!1===t&&arguments.length>0?(t={url:t,data:r,dataType:n},"function"==typeof s&&(t.success=s)):void 0===t&&(t={}),l=t.method||t.type||this.attr2("method"),(d=(d="string"==typeof(f=t.url||this.attr2("action"))?e.trim(f):"")||window.location.href||"")&&(d=(d.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:d,success:e.ajaxSettings.success,type:l||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&!1===t.beforeSerialize(this,t))return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var h=t.traditional;void 0===h&&(h=e.ajaxSettings.traditional);var v,g=[],x=this.formToArray(t.semantic,g,t.filtering);if(t.data){var y=e.isFunction(t.data)?t.data(x):t.data;t.extraData=y,v=e.param(y,h)}if(t.beforeSubmit&&!1===t.beforeSubmit(x,this,t))return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[x,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var b=e.param(x,h);v&&(b=b?b+"&"+v:v),"GET"===t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+b,t.data=null):t.data=b;var T=[];if(t.resetForm&&T.push(function(){p.resetForm()}),t.clearForm&&T.push(function(){p.clearForm(t.includeHidden)}),!t.dataType&&t.target){var j=t.success||function(){};T.push(function(r,a,n){var i=arguments,o=t.replaceTarget?"replaceWith":"html";e(t.target)[o](r).each(function(){j.apply(this,i)})})}else t.success&&(e.isArray(t.success)?e.merge(T,t.success):T.push(t.success));if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=T.length;i<o;i++)T[i].apply(n,[e,r,a||p,p])},t.error){var w=t.error;t.error=function(e,r,a){var n=t.context||this;w.apply(n,[e,r,a,p])}}if(t.complete){var S=t.complete;t.complete=function(e,r){var a=t.context||this;S.apply(a,[e,r,p])}}var k=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}).length>0,D="multipart/form-data",A=p.attr("enctype")===D||p.attr("encoding")===D,L=i.fileapi&&i.formdata;a("fileAPI :"+L);var F,E=(k||A)&&!L;!1!==t.iframe&&(t.iframe||E)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){F=c(x)}):F=c(x):F=(k||A)&&L?function(r){for(var a=new FormData,n=0;n<r.length;n++)a.append(r[n].name,r[n].value);if(t.extraData){var i=u(t.extraData);for(n=0;n<i.length;n++)i[n]&&a.append(i[n][0],i[n][1])}t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});t.uploadProgress&&(o.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),o.data=null;var s=o.beforeSend;return o.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=a,s&&s.call(this,e,r)},e.ajax(o)}(x):e.ajax(t),p.removeData("jqxhr").data("jqxhr",F);for(var M=0;M<g.length;M++)g[M]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n,i,o,s){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:o},"function"==typeof s&&(n.success=s)),n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var u={s:this.selector,c:this.context};return!e.isReady&&u.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(u.s,u.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().on("submit.form-plugin",n,t).on("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r,a){var n=[];if(0===this.length)return n;var o,s=this[0],u=this.attr("id"),c=t||void 0===s.elements?s.getElementsByTagName("*"):s.elements;if(c&&(c=e.makeArray(c)),u&&(t||/(Edge|Trident)\//.test(navigator.userAgent))&&(o=e(':input[form="'+u+'"]').get()).length&&(c=(c||[]).concat(o)),!c||!c.length)return n;e.isFunction(a)&&(c=e.map(c,a));var l,f,d,p,m,h,v;for(l=0,h=c.length;l<h;l++)if(m=c[l],(d=m.name)&&!m.disabled)if(t&&s.clk&&"image"===m.type)s.clk===m&&(n.push({name:d,value:e(m).val(),type:m.type}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}));else if((p=e.fieldValue(m,!0))&&p.constructor===Array)for(r&&r.push(m),f=0,v=p.length;f<v;f++)n.push({name:d,value:p[f]});else if(i.fileapi&&"file"===m.type){r&&r.push(m);var g=m.files;if(g.length)for(f=0;f<g.length;f++)n.push({name:d,value:g[f],type:m.type});else n.push({name:d,value:"",type:m.type})}else null!==p&&void 0!==p&&(r&&r.push(m),n.push({name:d,value:p,type:m.type,required:m.required}));if(!t&&s.clk){var x=e(s.clk),y=x[0];(d=y.name)&&!y.disabled&&"image"===y.type&&(n.push({name:d,value:x.val()}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor===Array)for(var i=0,o=n.length;i<o;i++)r.push({name:a,value:n[i]});else null!==n&&void 0!==n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;a<n;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor===Array&&!o.length||(o.constructor===Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,i=t.type,o=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!t.checked||("submit"===i||"image"===i)&&t.form&&t.form.clk!==t||"select"===o&&-1===t.selectedIndex))return null;if("select"===o){var s=t.selectedIndex;if(s<0)return null;for(var u=[],c=t.options,l="select-one"===i,f=l?s+1:c.length,d=l?s:0;d<f;d++){var p=c[d];if(p.selected&&!p.disabled){var m=p.value;if(m||(m=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),l)return m;u.push(m)}}return u}return e(t).val().replace(n,"\r\n")},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"===n?this.value="":"checkbox"===a||"radio"===a?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){var t=e(this),r=this.tagName.toLowerCase();switch(r){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var a=t.parents("select");return a.length&&a[0].multiple?"option"===r?this.selected=this.defaultSelected:t.find("option").resetForm():a.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var n=e(t.attr("for")),i=t.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"===r||"radio"===r)this.checked=t;else if("option"===this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"===a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.theme.progressBar = function (id) {
    return "<div id=\"".concat(id, "\" class=\"progress\" aria-live=\"polite\">") + '<div class="progress__label">&nbsp;</div>' + '<div class="progress__track"><div class="progress__bar"></div></div>' + '<div class="progress__percentage"></div>' + '<div class="progress__description">&nbsp;</div>' + '</div>';
  };

  Drupal.ProgressBar = function (id, updateCallback, method, errorCallback) {
    this.id = id;
    this.method = method || 'GET';
    this.updateCallback = updateCallback;
    this.errorCallback = errorCallback;
    this.element = $(Drupal.theme('progressBar', id));
  };

  $.extend(Drupal.ProgressBar.prototype, {
    setProgress: function setProgress(percentage, message, label) {
      if (percentage >= 0 && percentage <= 100) {
        $(this.element).find('div.progress__bar').css('width', "".concat(percentage, "%"));
        $(this.element).find('div.progress__percentage').html("".concat(percentage, "%"));
      }

      $('div.progress__description', this.element).html(message);
      $('div.progress__label', this.element).html(label);

      if (this.updateCallback) {
        this.updateCallback(percentage, message, this);
      }
    },
    startMonitoring: function startMonitoring(uri, delay) {
      this.delay = delay;
      this.uri = uri;
      this.sendPing();
    },
    stopMonitoring: function stopMonitoring() {
      clearTimeout(this.timer);
      this.uri = null;
    },
    sendPing: function sendPing() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (this.uri) {
        var pb = this;
        var uri = this.uri;

        if (uri.indexOf('?') === -1) {
          uri += '?';
        } else {
          uri += '&';
        }

        uri += '_format=json';
        $.ajax({
          type: this.method,
          url: uri,
          data: '',
          dataType: 'json',
          success: function success(progress) {
            if (progress.status === 0) {
              pb.displayError(progress.data);
              return;
            }

            pb.setProgress(progress.percentage, progress.message, progress.label);
            pb.timer = setTimeout(function () {
              pb.sendPing();
            }, pb.delay);
          },
          error: function error(xmlhttp) {
            var e = new Drupal.AjaxError(xmlhttp, pb.uri);
            pb.displayError("<pre>".concat(e.message, "</pre>"));
          }
        });
      }
    },
    displayError: function displayError(string) {
      var error = $('<div class="messages messages--error"></div>').html(string);
      $(this.element).before(error).hide();

      if (this.errorCallback) {
        this.errorCallback(this);
      }
    }
  });
})(jQuery, Drupal);;
loadjs=function(){var h=function(){},c={},u={},f={};function o(e,n){if(e){var r=f[e];if(u[e]=n,r)for(;r.length;)r[0](e,n),r.splice(0,1)}}function l(e,n){e.call&&(e={success:e}),n.length?(e.error||h)(n):(e.success||h)(e)}function d(r,t,s,i){var c,o,e=document,n=s.async,u=(s.numRetries||0)+1,f=s.before||h,l=r.replace(/[\?|#].*$/,""),a=r.replace(/^(css|img)!/,"");i=i||0,/(^css!|\.css$)/.test(l)?((o=e.createElement("link")).rel="stylesheet",o.href=a,(c="hideFocus"in o)&&o.relList&&(c=0,o.rel="preload",o.as="style")):/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(l)?(o=e.createElement("img")).src=a:((o=e.createElement("script")).src=r,o.async=void 0===n||n),!(o.onload=o.onerror=o.onbeforeload=function(e){var n=e.type[0];if(c)try{o.sheet.cssText.length||(n="e")}catch(e){18!=e.code&&(n="e")}if("e"==n){if((i+=1)<u)return d(r,t,s,i)}else if("preload"==o.rel&&"style"==o.as)return o.rel="stylesheet";t(r,n,e.defaultPrevented)})!==f(r,o)&&e.head.appendChild(o)}function r(e,n,r){var t,s;if(n&&n.trim&&(t=n),s=(t?r:n)||{},t){if(t in c)throw"LoadJS";c[t]=!0}function i(n,r){!function(e,t,n){var r,s,i=(e=e.push?e:[e]).length,c=i,o=[];for(r=function(e,n,r){if("e"==n&&o.push(e),"b"==n){if(!r)return;o.push(e)}--i||t(o)},s=0;s<c;s++)d(e[s],r,n)}(e,function(e){l(s,e),n&&l({success:n,error:r},e),o(t,e)},s)}if(s.returnPromise)return new Promise(i);i()}return r.ready=function(e,n){return function(e,r){e=e.push?e:[e];var n,t,s,i=[],c=e.length,o=c;for(n=function(e,n){n.length&&i.push(e),--o||r(i)};c--;)t=e[c],(s=u[t])?n(t,s):(f[t]=f[t]||[]).push(n)}(e,function(e){l(n,e)}),r},r.done=function(e){o(e,[])},r.reset=function(){c={},u={},f={}},r.isDefined=function(e){return e in c},r}();
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function ($, window, Drupal, drupalSettings, loadjs) {
  Drupal.behaviors.AJAX = {
    attach: function attach(context, settings) {
      function loadAjaxBehavior(base) {
        var elementSettings = settings.ajax[base];

        if (typeof elementSettings.selector === 'undefined') {
          elementSettings.selector = "#".concat(base);
        }

        $(elementSettings.selector).once('drupal-ajax').each(function () {
          elementSettings.element = this;
          elementSettings.base = base;
          Drupal.ajax(elementSettings);
        });
      }

      Object.keys(settings.ajax || {}).forEach(function (base) {
        return loadAjaxBehavior(base);
      });
      Drupal.ajax.bindAjaxLinks(document.body);
      $('.use-ajax-submit').once('ajax').each(function () {
        var elementSettings = {};
        elementSettings.url = $(this.form).attr('action');
        elementSettings.setClick = true;
        elementSettings.event = 'click';
        elementSettings.progress = {
          type: 'throbber'
        };
        elementSettings.base = $(this).attr('id');
        elementSettings.element = this;
        Drupal.ajax(elementSettings);
      });
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        Drupal.ajax.expired().forEach(function (instance) {
          Drupal.ajax.instances[instance.instanceIndex] = null;
        });
      }
    }
  };

  Drupal.AjaxError = function (xmlhttp, uri, customMessage) {
    var statusCode;
    var statusText;
    var responseText;

    if (xmlhttp.status) {
      statusCode = "\n".concat(Drupal.t('An AJAX HTTP error occurred.'), "\n").concat(Drupal.t('HTTP Result Code: !status', {
        '!status': xmlhttp.status
      }));
    } else {
      statusCode = "\n".concat(Drupal.t('An AJAX HTTP request terminated abnormally.'));
    }

    statusCode += "\n".concat(Drupal.t('Debugging information follows.'));
    var pathText = "\n".concat(Drupal.t('Path: !uri', {
      '!uri': uri
    }));
    statusText = '';

    try {
      statusText = "\n".concat(Drupal.t('StatusText: !statusText', {
        '!statusText': $.trim(xmlhttp.statusText)
      }));
    } catch (e) {}

    responseText = '';

    try {
      responseText = "\n".concat(Drupal.t('ResponseText: !responseText', {
        '!responseText': $.trim(xmlhttp.responseText)
      }));
    } catch (e) {}

    responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
    responseText = responseText.replace(/[\n]+\s+/g, '\n');
    var readyStateText = xmlhttp.status === 0 ? "\n".concat(Drupal.t('ReadyState: !readyState', {
      '!readyState': xmlhttp.readyState
    })) : '';
    customMessage = customMessage ? "\n".concat(Drupal.t('CustomMessage: !customMessage', {
      '!customMessage': customMessage
    })) : '';
    this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
    this.name = 'AjaxError';
  };

  Drupal.AjaxError.prototype = new Error();
  Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;

  Drupal.ajax = function (settings) {
    if (arguments.length !== 1) {
      throw new Error('Drupal.ajax() function must be called with one configuration object only');
    }

    var base = settings.base || false;
    var element = settings.element || false;
    delete settings.base;
    delete settings.element;

    if (!settings.progress && !element) {
      settings.progress = false;
    }

    var ajax = new Drupal.Ajax(base, element, settings);
    ajax.instanceIndex = Drupal.ajax.instances.length;
    Drupal.ajax.instances.push(ajax);
    return ajax;
  };

  Drupal.ajax.instances = [];

  Drupal.ajax.expired = function () {
    return Drupal.ajax.instances.filter(function (instance) {
      return instance && instance.element !== false && !document.body.contains(instance.element);
    });
  };

  Drupal.ajax.bindAjaxLinks = function (element) {
    $(element).find('.use-ajax').once('ajax').each(function (i, ajaxLink) {
      var $linkElement = $(ajaxLink);
      var elementSettings = {
        progress: {
          type: 'throbber'
        },
        dialogType: $linkElement.data('dialog-type'),
        dialog: $linkElement.data('dialog-options'),
        dialogRenderer: $linkElement.data('dialog-renderer'),
        base: $linkElement.attr('id'),
        element: ajaxLink
      };
      var href = $linkElement.attr('href');

      if (href) {
        elementSettings.url = href;
        elementSettings.event = 'click';
      }

      Drupal.ajax(elementSettings);
    });
  };

  Drupal.Ajax = function (base, element, elementSettings) {
    var defaults = {
      event: element ? 'mousedown' : null,
      keypress: true,
      selector: base ? "#".concat(base) : null,
      effect: 'none',
      speed: 'none',
      method: 'replaceWith',
      progress: {
        type: 'throbber',
        message: Drupal.t('Please wait...')
      },
      submit: {
        js: true
      }
    };
    $.extend(this, defaults, elementSettings);
    this.commands = new Drupal.AjaxCommands();
    this.instanceIndex = false;

    if (this.wrapper) {
      this.wrapper = "#".concat(this.wrapper);
    }

    this.element = element;
    this.element_settings = elementSettings;
    this.elementSettings = elementSettings;

    if (this.element && this.element.form) {
      this.$form = $(this.element.form);
    }

    if (!this.url) {
      var $element = $(this.element);

      if ($element.is('a')) {
        this.url = $element.attr('href');
      } else if (this.element && element.form) {
        this.url = this.$form.attr('action');
      }
    }

    var originalUrl = this.url;
    this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, '/ajax$1');

    if (drupalSettings.ajaxTrustedUrl[originalUrl]) {
      drupalSettings.ajaxTrustedUrl[this.url] = true;
    }

    var ajax = this;
    ajax.options = {
      url: ajax.url,
      data: ajax.submit,
      beforeSerialize: function beforeSerialize(elementSettings, options) {
        return ajax.beforeSerialize(elementSettings, options);
      },
      beforeSubmit: function beforeSubmit(formValues, elementSettings, options) {
        ajax.ajaxing = true;
        return ajax.beforeSubmit(formValues, elementSettings, options);
      },
      beforeSend: function beforeSend(xmlhttprequest, options) {
        ajax.ajaxing = true;
        return ajax.beforeSend(xmlhttprequest, options);
      },
      success: function success(response, status, xmlhttprequest) {
        if (typeof response === 'string') {
          response = $.parseJSON(response);
        }

        if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url]) {
          if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
            var customMessage = Drupal.t('The response failed verification so will not be processed.');
            return ajax.error(xmlhttprequest, ajax.url, customMessage);
          }
        }

        return ajax.success(response, status);
      },
      complete: function complete(xmlhttprequest, status) {
        ajax.ajaxing = false;

        if (status === 'error' || status === 'parsererror') {
          return ajax.error(xmlhttprequest, ajax.url);
        }
      },
      dataType: 'json',
      jsonp: false,
      type: 'POST'
    };

    if (elementSettings.dialog) {
      ajax.options.data.dialogOptions = elementSettings.dialog;
    }

    if (ajax.options.url.indexOf('?') === -1) {
      ajax.options.url += '?';
    } else {
      ajax.options.url += '&';
    }

    var wrapper = "drupal_".concat(elementSettings.dialogType || 'ajax');

    if (elementSettings.dialogRenderer) {
      wrapper += ".".concat(elementSettings.dialogRenderer);
    }

    ajax.options.url += "".concat(Drupal.ajax.WRAPPER_FORMAT, "=").concat(wrapper);
    $(ajax.element).on(elementSettings.event, function (event) {
      if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url)) {
        throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {
          '!url': ajax.url
        }));
      }

      return ajax.eventResponse(this, event);
    });

    if (elementSettings.keypress) {
      $(ajax.element).on('keypress', function (event) {
        return ajax.keypressResponse(this, event);
      });
    }

    if (elementSettings.prevent) {
      $(ajax.element).on(elementSettings.prevent, false);
    }
  };

  Drupal.ajax.WRAPPER_FORMAT = '_wrapper_format';
  Drupal.Ajax.AJAX_REQUEST_PARAMETER = '_drupal_ajax';

  Drupal.Ajax.prototype.execute = function () {
    if (this.ajaxing) {
      return;
    }

    try {
      this.beforeSerialize(this.element, this.options);
      return $.ajax(this.options);
    } catch (e) {
      this.ajaxing = false;
      window.alert("An error occurred while attempting to process ".concat(this.options.url, ": ").concat(e.message));
      return $.Deferred().reject();
    }
  };

  Drupal.Ajax.prototype.keypressResponse = function (element, event) {
    var ajax = this;

    if (event.which === 13 || event.which === 32 && element.type !== 'text' && element.type !== 'textarea' && element.type !== 'tel' && element.type !== 'number') {
      event.preventDefault();
      event.stopPropagation();
      $(element).trigger(ajax.elementSettings.event);
    }
  };

  Drupal.Ajax.prototype.eventResponse = function (element, event) {
    event.preventDefault();
    event.stopPropagation();
    var ajax = this;

    if (ajax.ajaxing) {
      return;
    }

    try {
      if (ajax.$form) {
        if (ajax.setClick) {
          element.form.clk = element;
        }

        ajax.$form.ajaxSubmit(ajax.options);
      } else {
        ajax.beforeSerialize(ajax.element, ajax.options);
        $.ajax(ajax.options);
      }
    } catch (e) {
      ajax.ajaxing = false;
      window.alert("An error occurred while attempting to process ".concat(ajax.options.url, ": ").concat(e.message));
    }
  };

  Drupal.Ajax.prototype.beforeSerialize = function (element, options) {
    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.detachBehaviors(this.$form.get(0), settings, 'serialize');
    }

    options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;
    var pageState = drupalSettings.ajaxPageState;
    options.data['ajax_page_state[theme]'] = pageState.theme;
    options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
    options.data['ajax_page_state[libraries]'] = pageState.libraries;
  };

  Drupal.Ajax.prototype.beforeSubmit = function (formValues, element, options) {};

  Drupal.Ajax.prototype.beforeSend = function (xmlhttprequest, options) {
    if (this.$form) {
      options.extraData = options.extraData || {};
      options.extraData.ajax_iframe_upload = '1';
      var v = $.fieldValue(this.element);

      if (v !== null) {
        options.extraData[this.element.name] = v;
      }
    }

    $(this.element).prop('disabled', true);

    if (!this.progress || !this.progress.type) {
      return;
    }

    var progressIndicatorMethod = "setProgressIndicator".concat(this.progress.type.slice(0, 1).toUpperCase()).concat(this.progress.type.slice(1).toLowerCase());

    if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === 'function') {
      this[progressIndicatorMethod].call(this);
    }
  };

  Drupal.theme.ajaxProgressThrobber = function (message) {
    var messageMarkup = typeof message === 'string' ? Drupal.theme('ajaxProgressMessage', message) : '';
    var throbber = '<div class="throbber">&nbsp;</div>';
    return "<div class=\"ajax-progress ajax-progress-throbber\">".concat(throbber).concat(messageMarkup, "</div>");
  };

  Drupal.theme.ajaxProgressIndicatorFullscreen = function () {
    return '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
  };

  Drupal.theme.ajaxProgressMessage = function (message) {
    return "<div class=\"message\">".concat(message, "</div>");
  };

  Drupal.theme.ajaxProgressBar = function ($element) {
    return $('<div class="ajax-progress ajax-progress-bar"></div>').append($element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorBar = function () {
    var progressBar = new Drupal.ProgressBar("ajax-progress-".concat(this.element.id), $.noop, this.progress.method, $.noop);

    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }

    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }

    this.progress.element = $(Drupal.theme('ajaxProgressBar', progressBar.element));
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorThrobber = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressThrobber', this.progress.message));
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
    $('body').append(this.progress.element);
  };

  Drupal.Ajax.prototype.success = function (response, status) {
    var _this = this;

    if (this.progress.element) {
      $(this.progress.element).remove();
    }

    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }

    $(this.element).prop('disabled', false);
    var elementParents = $(this.element).parents('[data-drupal-selector]').addBack().toArray();
    var focusChanged = false;
    return Object.keys(response || {}).reduce(function (executionQueue, key) {
      return executionQueue.then(function () {
        var command = response[key].command;

        if (command && _this.commands[command]) {
          if (command === 'invoke' && response[key].method === 'focus') {
            focusChanged = true;
          }

          return _this.commands[command](_this, response[key], status);
        }
      });
    }, $.Deferred().resolve().promise()).then(function () {
      if (!focusChanged && _this.element && !$(_this.element).data('disable-refocus')) {
        var target = false;

        for (var n = elementParents.length - 1; !target && n >= 0; n--) {
          target = document.querySelector("[data-drupal-selector=\"".concat(elementParents[n].getAttribute('data-drupal-selector'), "\"]"));
        }

        if (target) {
          $(target).trigger('focus');
        }
      }

      if (_this.$form && document.body.contains(_this.$form.get(0))) {
        var settings = _this.settings || drupalSettings;
        Drupal.attachBehaviors(_this.$form.get(0), settings);
      }

      _this.settings = null;
    }).catch(function (error) {
      return console.error(Drupal.t('An error occurred during the execution of the Ajax response: !error', {
        '!error': error
      }));
    });
  };

  Drupal.Ajax.prototype.getEffect = function (response) {
    var type = response.effect || this.effect;
    var speed = response.speed || this.speed;
    var effect = {};

    if (type === 'none') {
      effect.showEffect = 'show';
      effect.hideEffect = 'hide';
      effect.showSpeed = '';
    } else if (type === 'fade') {
      effect.showEffect = 'fadeIn';
      effect.hideEffect = 'fadeOut';
      effect.showSpeed = speed;
    } else {
      effect.showEffect = "".concat(type, "Toggle");
      effect.hideEffect = "".concat(type, "Toggle");
      effect.showSpeed = speed;
    }

    return effect;
  };

  Drupal.Ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
    if (this.progress.element) {
      $(this.progress.element).remove();
    }

    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }

    $(this.wrapper).show();
    $(this.element).prop('disabled', false);

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }

    throw new Drupal.AjaxError(xmlhttprequest, uri, customMessage);
  };

  Drupal.theme.ajaxWrapperNewContent = function ($newContent, ajax, response) {
    return (response.effect || ajax.effect) !== 'none' && $newContent.filter(function (i) {
      return !($newContent[i].nodeName === '#comment' || $newContent[i].nodeName === '#text' && /^(\s|\n|\r)*$/.test($newContent[i].textContent));
    }).length > 1 ? Drupal.theme('ajaxWrapperMultipleRootElements', $newContent) : $newContent;
  };

  Drupal.theme.ajaxWrapperMultipleRootElements = function ($elements) {
    return $('<div></div>').append($elements);
  };

  Drupal.AjaxCommands = function () {};

  Drupal.AjaxCommands.prototype = {
    insert: function insert(ajax, response) {
      var $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
      var method = response.method || ajax.method;
      var effect = ajax.getEffect(response);
      var settings = response.settings || ajax.settings || drupalSettings;
      var $newContent = $($.parseHTML(response.data, document, true));
      $newContent = Drupal.theme('ajaxWrapperNewContent', $newContent, ajax, response);

      switch (method) {
        case 'html':
        case 'replaceWith':
        case 'replaceAll':
        case 'empty':
        case 'remove':
          Drupal.detachBehaviors($wrapper.get(0), settings);
          break;

        default:
          break;
      }

      $wrapper[method]($newContent);

      if (effect.showEffect !== 'show') {
        $newContent.hide();
      }

      var $ajaxNewContent = $newContent.find('.ajax-new-content');

      if ($ajaxNewContent.length) {
        $ajaxNewContent.hide();
        $newContent.show();
        $ajaxNewContent[effect.showEffect](effect.showSpeed);
      } else if (effect.showEffect !== 'show') {
        $newContent[effect.showEffect](effect.showSpeed);
      }

      if ($newContent.parents('html').length) {
        $newContent.each(function (index, element) {
          if (element.nodeType === Node.ELEMENT_NODE) {
            Drupal.attachBehaviors(element, settings);
          }
        });
      }
    },
    remove: function remove(ajax, response, status) {
      var settings = response.settings || ajax.settings || drupalSettings;
      $(response.selector).each(function () {
        Drupal.detachBehaviors(this, settings);
      }).remove();
    },
    changed: function changed(ajax, response, status) {
      var $element = $(response.selector);

      if (!$element.hasClass('ajax-changed')) {
        $element.addClass('ajax-changed');

        if (response.asterisk) {
          $element.find(response.asterisk).append(" <abbr class=\"ajax-changed\" title=\"".concat(Drupal.t('Changed'), "\">*</abbr> "));
        }
      }
    },
    alert: function alert(ajax, response, status) {
      window.alert(response.text);
    },
    announce: function announce(ajax, response) {
      if (response.priority) {
        Drupal.announce(response.text, response.priority);
      } else {
        Drupal.announce(response.text);
      }
    },
    redirect: function redirect(ajax, response, status) {
      window.location = response.url;
    },
    css: function css(ajax, response, status) {
      $(response.selector).css(response.argument);
    },
    settings: function settings(ajax, response, status) {
      var ajaxSettings = drupalSettings.ajax;

      if (ajaxSettings) {
        Drupal.ajax.expired().forEach(function (instance) {
          if (instance.selector) {
            var selector = instance.selector.replace('#', '');

            if (selector in ajaxSettings) {
              delete ajaxSettings[selector];
            }
          }
        });
      }

      if (response.merge) {
        $.extend(true, drupalSettings, response.settings);
      } else {
        ajax.settings = response.settings;
      }
    },
    data: function data(ajax, response, status) {
      $(response.selector).data(response.name, response.value);
    },
    invoke: function invoke(ajax, response, status) {
      var $element = $(response.selector);
      $element[response.method].apply($element, _toConsumableArray(response.args));
    },
    restripe: function restripe(ajax, response, status) {
      $(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');
    },
    update_build_id: function update_build_id(ajax, response, status) {
      $("input[name=\"form_build_id\"][value=\"".concat(response.old, "\"]")).val(response.new);
    },
    add_css: function add_css(ajax, response, status) {
      $('head').prepend(response.data);
    },
    message: function message(ajax, response) {
      var messages = new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));

      if (response.clearPrevious) {
        messages.clear();
      }

      messages.add(response.message, response.messageOptions);
    },
    add_js: function add_js(ajax, response, status) {
      var deferred = $.Deferred();
      var parentEl = document.querySelector(response.selector || 'body');
      var settings = ajax.settings || drupalSettings;
      var scriptsSrc = response.data.map(function (script) {
        var uniqueBundleID = script.src + ajax.instanceIndex;
        loadjs(script.src, uniqueBundleID, {
          async: !!script.async,
          before: function before(path, scriptEl) {
            if (script.defer) {
              scriptEl.defer = true;
            }

            parentEl.appendChild(scriptEl);
            return false;
          }
        });
        return uniqueBundleID;
      });
      loadjs.ready(scriptsSrc, {
        success: function success() {
          Drupal.attachBehaviors(parentEl, settings);
          deferred.resolve();
        }
      });
      return deferred.promise();
    }
  };
})(jQuery, window, Drupal, drupalSettings, loadjs);;
/**
 * @file sim-search-map.js
 */

(function ($, Drupal) {
  Drupal.behaviors.simSearchMap = {
    attach(context, settings) {
      $('.station-details-link', context).once().on('click', function(e) {
        loadStationDetailsModal($(this).attr('data-station-id'));
      });
    },
  };

  // Global variable to save actually opened info window.
  let openedInfoWindow;

  // ScrollTop to element id.
  $.fn.jump = function () {
    const elementId = this[0].id;

    $('html,body').animate({
      scrollTop: $('#' + elementId).offset().top
    },'slow');
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(() => {}, () => {});
  }

  // It is using in SimSearchForm to update data on map (new InvokeCommand).
  $.fn.initMap = function(settings) {
    const map = new google.maps.Map(document.getElementById("map"), {
      mapTypeId: 'roadmap',
      streetViewControl: false,
      styles: [
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#d3d3d3"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "color": "#808080"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#b3b3b3"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "weight": 1.8
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#d7d7d7"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ebebeb"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#a7a7a7"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#efefef"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#696969"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#737373"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#d6d6d6"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {},
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        }
    ]
    });

    const clusterStyles = {
      styles: [
        {
          textColor: 'white',
          url: drupalSettings.ck_sim_search.module_path + '/assets/images/circle.png',
          height: 32,
          width: 32,
          textLineHeight: 33,
          fontWeight: 'bold',
        },
      ],
    };

    if (settings && settings.station_results) {
      const list = Object.values(settings.station_results);
      const latlngList = [];
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            new google.maps.Marker({
              position: new google.maps.LatLng(pos.lat, pos.lng),
              map,
              icon: drupalSettings.ck_sim_search.module_path + '/assets/images/user_location.png',
            });

            // Filter empty records
            // https://stackoverflow.com/a/24806827/567058.
            const markers = list.filter(function(location) {
            if (location['/sites/{siteId}/location']['lat'] !== null || location['/sites/{siteId}/location']['lng'] !== null) {
                return true;
              }
              return false;
            }).map((location, i) => {
              latlngList.push(new google.maps.LatLng(location['/sites/{siteId}/location']['lat'], location['/sites/{siteId}/location']['lng']));
              return createMarker(location, pos);
            });

            // Add a marker clusterer to manage the markers.
            const markerCluster = new MarkerClusterer(map, markers, clusterStyles);

            // Add user location.
            latlngList.push(new google.maps.LatLng(pos.lat, pos.lng));
            provideBounds(map, latlngList);
            
          },
          () => {
            // Filter empty records
            // https://stackoverflow.com/a/24806827/567058.
            const markers = list.filter(function(location) {
              if (location['/sites/{siteId}/location']['lat'] !== null || location['/sites/{siteId}/location']['lng'] !== null) {
                return true;
              }
              return false;
            }).map((location, i) => {
              latlngList.push(new google.maps.LatLng(location['/sites/{siteId}/location']['lat'], location['/sites/{siteId}/location']['lng']));
              return createMarker(location);
            });
            // Add a marker clusterer to manage the markers.
            const markerCluster = new MarkerClusterer(map, markers, clusterStyles);
            provideBounds(map, latlngList);
          },
        );
      }
      else {
        // Browser doesn't support Geolocation
        localizationBrowserError();
      }
    }
    else {
      const countries_coords = getCountryCoords();

      if (countries_coords) {
        country_bounds = [];
        countries_coords.map((locations, i) => {
          let coords = locations.split(', ');
          country_bounds.push(new google.maps.LatLng(coords[0], coords[1]));
        });

        provideBounds(map, country_bounds);
      }
    }
  }

  function createMarker(location, pos = null) {
    let infoContent;
    if (pos) {
      const getDirection = "https://www.google.pl/maps/dir/" + pos.lat + "," + pos.lng + "/" + location['/sites/{siteId}/location']['lat'] + "," + location['/sites/{siteId}/location']['lng'];
      infoContent = `
        <div id='content'>
          <h4 class='uk-heading-small uk-heading-divider'>${location['/sites/{siteId}']['name']}</h4>
          <ul class='uk-list uk-margin-small-bottom'>
            <li><span uk-icon='icon: info; ratio: .9' class='uk-text-muted uk-margin-small-right'></span><a class='info-content' data-station-id='${location['/sites/{siteId}']['id']}'>${Drupal.t('Get more details')}</a></li>
            <li><span uk-icon='icon: location;' class='uk-text-muted uk-margin-small-right'></span><a href='${getDirection}' target='_blank'>${Drupal.t('Get directions')}</a></li>
          </ul>
        </div>`;
    }
    else {
      infoContent = `
        <div id='content'>
          <h4 class='uk-heading-small uk-heading-divider'>${location['/sites/{siteId}']['name']}</h4>
          <ul class='uk-list uk-margin-small-bottom'>
            <li><span uk-icon='icon: info; ratio: .9' class='uk-text-muted uk-margin-small-right'></span><a class='info-content' data-station-id='${location['/sites/{siteId}']['id']}'>${Drupal.t('Get more details')}</a></li>
          </ul>
        </div>`;
    }

    const infoWindow = new google.maps.InfoWindow({
      content: infoContent,
      maxWidth: 300,
    });

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(location['/sites/{siteId}/location']['lat'], location['/sites/{siteId}/location']['lng']),
      icon: drupalSettings.ck_sim_search.module_path + '/assets/images/marker.png',
    });

    marker.addListener("click", () => {
      if (openedInfoWindow) {
        openedInfoWindow.close();
      }

      infoWindow.open(map, marker);
      openedInfoWindow = infoWindow;
    });

    google.maps.event.addListener(infoWindow, 'domready', function() {
      $(".info-content").click(function(e) {
        loadStationDetailsModal($(this).attr('data-station-id'));
      });
    });

    return marker;
  }

  // Center and fit map to LatLng points.
  function provideBounds(map, latlngList) {
    const bounds = new google.maps.LatLngBounds();
    latlngList.map((location, i) => {
      bounds.extend(location);
    });
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
  }

  // Get info about station and display it in modal.
  function loadStationDetailsModal(station_id) {
    if (UIkit !== undefined) {
      $.ajax({
        url: "/station/" + station_id + "?_wrapper_format=drupal_modal",
        success:  function (response) {
          let element = $('#sim-single-station');
          element.html(response[3].data);
          UIkit.modal('#modal-station').show();
        },
        beforeSend: function () {
          $('body').after(Drupal.theme.ajaxProgressIndicatorFullscreen());
        },
        complete: function () {
          $('.ajax-progress').remove();
        },
      });
    }
    else {
      const ajaxSettings = {
        url: '/station/' + station_id,
        dialogType: 'modal',
        progress: { type: 'fullscreen' },
        dialog: { width: '60%', dialogClass: 'ck-station-search-dialog' },
      };
      const myAjaxObject = Drupal.ajax(ajaxSettings);
      myAjaxObject.execute();
    }
  }

  // Define countries coordinates.
  function getCountryCoords() {
    const countries_bounds = {
      'pl' :
        [
          '54.581940955857014, 17.70727817808548',
          '53.12635200444736, 22.116942650830676',
          '49.79404158994879, 20.427586275515683',
          '51.09472954659403, 17.145864660085174',
        ],
      'se' :
        [
          '55.41893251324602, 13.574577969913785',
          '57.13212342935245, 12.297465980929726',
          '58.983245210847635, 11.345724066344063',
          '67.49031882642102, 16.309558659818364',
          '65.97964239978731, 23.793877395770597',
          '62.99430006260394, 18.214746199788582',
        ],
      'ee' :
        [
          '59.41821650200505, 24.75384547745883',
          '59.395851163073885, 27.599304396059818',
          '58.15443419536058, 27.456482133736216',
          '58.47757351315815, 23.940857215001408',
          '57.64065509151939, 27.225769248444244'
        ],
      'dk' :
        [
          '57.46308195460734, 10.125550050232464',
          '55.09765727187677, 9.103821532194909',
          '55.95884372224691, 12.328308764505598',
          '54.778944443208616, 11.377991403660094',
        ],
      'no' :
        [
          '58.35927998261805, 7.374406999726202',
          '63.374950080739886, 10.3077567718855',
          '68.75881657613743, 15.460344806756225',
          '70.40968032081237, 29.731584660200635',
        ],
      'lv' :
        [
          '56.63891092748547, 21.69508601655097',
          '57.77529816802571, 25.47438280419089',
          '56.292969122240386, 27.68263470627119',
        ],
      'lt' :
        [
          '55.72174731608638, 21.66212699433684',
          '56.042180895559, 23.892351552159237',
          '54.7191205870958, 25.298601519653158',
          '54.56654137038168, 23.332048830735875',
        ],
      'ru' :
        [
          '55.84034184060817, 37.50441387290106',
          '47.74175319810064, 43.57985501024731',
          '55.218551322117335, 131.20680655463931',
          '71.95970282929589, 97.80837056617192',
        ],
      'dkingo' :
        [
          '57.46308195460734, 10.125550050232464',
          '55.09765727187677, 9.103821532194909',
          '55.95884372224691, 12.328308764505598',
          '54.778944443208616, 11.377991403660094',
        ],
      'seingo' :
        [
          '55.41893251324602, 13.574577969913785',
          '57.13212342935245, 12.297465980929726',
          '58.983245210847635, 11.345724066344063',
          '67.49031882642102, 16.309558659818364',
          '65.97964239978731, 23.793877395770597',
          '62.99430006260394, 18.214746199788582',
        ],
    };

    return countries_bounds[drupalSettings.ck_sim_search.country_code];
  }

  function localizationBrowserError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

})(jQuery, Drupal);
;

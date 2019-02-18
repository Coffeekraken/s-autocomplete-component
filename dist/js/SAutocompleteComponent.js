'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

var _coffeekrakenSTemplateComponent = _interopRequireDefault(
  require('coffeekraken-s-template-component')
)

var _addEventListener = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/addEventListener')
)

var _debounce = _interopRequireDefault(
  require('coffeekraken-sugar/js/utils/functions/debounce')
)

var _axios = _interopRequireDefault(require('axios'))

var _mustache = _interopRequireDefault(require('mustache'))

var _scrollTop = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/scrollTop')
)

var _scrollLeft = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/scrollLeft')
)

var _offset = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/offset')
)

var _offsetParent = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/offsetParent')
)

var _striptags = _interopRequireDefault(
  require('coffeekraken-sugar/js/utils/strings/striptags')
)

var _dispatchEvent = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/dispatchEvent')
)

var _isHover = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/isHover')
)

var _isInIframe = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/isInIframe')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }
  return _typeof(obj)
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }
  return obj
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }
  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args)
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value)
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      _next(undefined)
    })
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return self
}

function _get(target, property, receiver) {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property)
      if (!base) return
      var desc = Object.getOwnPropertyDescriptor(base, property)
      if (desc.get) {
        return desc.get.call(receiver)
      }
      return desc.value
    }
  }
  return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object)
    if (object === null) break
  }
  return object
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

/**
 * @name    SAutocompleteComponent
 * Easily create fully customizable autocomplete dropdown
 *
 * @exemple    html
 * <input type="search" name="my-cool-input" placeholder="Keywords..." />
 * <s-autocomplete for="my-cool-input" endpoint="//api.my-cool-domain.com/search">
 *   <span class="something-cool">{{title}}</span>
 *   <p class="something">{{body}}</p>
 * </s-autocomplete>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SAutocompleteComponent =
  /*#__PURE__*/
  (function(_STemplateComponent) {
    _inherits(SAutocompleteComponent, _STemplateComponent)

    function SAutocompleteComponent() {
      _classCallCheck(this, SAutocompleteComponent)

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(SAutocompleteComponent).apply(this, arguments)
      )
    }

    _createClass(
      SAutocompleteComponent,
      [
        {
          key: 'componentWillMount',

          /**
           * Component will mount
           * @definition    SWebComponent.componentWillMount
           * @protected
           */
          value: function componentWillMount() {
            _get(
              _getPrototypeOf(SAutocompleteComponent.prototype),
              'componentWillMount',
              this
            ).call(this) // get the target input

            if (this.props.for instanceof HTMLElement) {
              this._$targetInput = this.props.for
            } else if (typeof this.props.for === 'string') {
              this._$targetInput = document.querySelector(
                '#'
                  .concat(this.props.for, ',[name="')
                  .concat(this.props.for, '"]')
              )
            }

            if (!this._$targetInput) {
              throw new Error(
                'The '.concat(
                  this.componentNameDash,
                  ' component need a proper "for" target...'
                )
              )
            } // some variables

            this._cache = {}
          }
          /**
           * Mount component
           * @definition    SWebComponent.componentMount
           * @protected
           */
        },
        {
          key: 'componentMount',
          value: function componentMount() {
            var _this = this

            _get(
              _getPrototypeOf(SAutocompleteComponent.prototype),
              'componentMount',
              this
            ).call(this) // get the template html from component itself

            var $templateChild = this.querySelector('template')
            this._htmlTemplate = $templateChild
              ? $templateChild.innerHTML
              : this.innerHTML
            this.innerHTML = '' // add some attributes to the target input

            this._$targetInput.setAttribute('autocomplete', 'off') // prepare the search function wrapped in the debounce

            var searchDebouncedFn = (0, _debounce.default)(
              this._search.bind(this),
              this.props.inputDebounce
            ) // listen for keydown

            this._removeKeydownHandler = (0, _addEventListener.default)(
              document,
              'keydown',
              function(e) {
                // prevent triggering other autocomplete in the page
                if (document.activeElement !== _this._$targetInput) return // take care of some keys pressed

                switch (e.keyCode) {
                  case 38:
                    // up arrow
                    e.preventDefault()

                    if (!_this.isOpened()) {
                      _this._search(_this._$targetInput.value)

                      _this.open()
                    } else {
                      _this._selectPreviousResult()
                    }

                    break

                  case 40:
                    // down arrow
                    e.preventDefault()

                    if (!_this.isOpened()) {
                      _this._search(_this._$targetInput.value)

                      _this.open()
                    } else {
                      _this._selectNextResult()
                    }

                    break

                  case 13:
                    // enter
                    e.preventDefault()

                    _this._chooseSelectedResult()

                    break

                  case 27:
                    // escape
                    e.preventDefault() // close the autocomplete

                    _this._forceClose()

                    break

                  default:
                }
              }
            ) // listen for scroll

            this._removeScrollHandler = (0, _addEventListener.default)(
              window,
              'scroll',
              function() {
                // set size and position
                _this._setSizeAndPosition()
              }
            ) // lsiten for resize

            this._removeResizeHandler = (0, _addEventListener.default)(
              window,
              'resize',
              function() {
                // set size and position
                _this._setSizeAndPosition(true)
              }
            ) // listen for focus in the target element

            this._removeFocusHandler = (0, _addEventListener.default)(
              this._$targetInput,
              'focus',
              function() {
                if (_this.props.openOnFocus) {
                  // open the autocomplete
                  _this._search(_this._$targetInput.value)

                  _this.open()
                }
              }
            ) // listen for blur in the target element

            this._removeBlurHandler = (0, _addEventListener.default)(
              this._$targetInput,
              'blur',
              function() {
                var closeTimeout = 0 // check if the mouse if hover the autocomplete

                if (
                  (0, _isHover.default)(_this) ||
                  (0, _isInIframe.default)()
                ) {
                  closeTimeout = 1000 // this seems to be high but it will be closed by the _chooseSelectedResult method anyway
                } // close the autocomplete

                setTimeout(function() {
                  _this.close()
                }, closeTimeout)
              }
            ) // listen for click in the target element

            this._removeTargetClickHandler = (0, _addEventListener.default)(
              this._$targetInput,
              'click',
              function() {
                if (_this.props.openOnFocus) {
                  // open the autocomplete
                  _this._search(_this._$targetInput.value)

                  _this.open()
                }
              }
            ) // listen for updates from the target field

            this._removeInputChangeHandler = (0, _addEventListener.default)(
              this._$targetInput,
              'input',
              function(e) {
                // make the search
                searchDebouncedFn(e.target.value) // open the autocomplete

                _this.open()
              }
            ) // first time set position and size

            this._setSizeAndPosition()
          }
          /**
           * Component unmount
           * @definition    SWebComponent.componentUnmount
           * @protected
           */
        },
        {
          key: 'componentUnmount',
          value: function componentUnmount() {
            _get(
              _getPrototypeOf(SAutocompleteComponent.prototype),
              'componentUnmount',
              this
            ).call(this)

            if (this._removeInputChangeHandler) this._removeInputChangeHandler()
            if (this._removeScrollHandler) this._removeScrollHandler()
            if (this._removeResizeHandler) this._removeResizeHandler()
            if (this._removeFocusHandler) this._removeFocusHandler()
            if (this._removeBlurHandler) this._removeBlurHandler()
            if (this._removeKeydownHandler) this._removeKeydownHandler()
            if (this._removeTargetClickHandler) this._removeTargetClickHandler()
          }
          /**
           * Component will receive prop
           * @definition    SWebComponent.componentWillReceiveProp
           * @protected
           */
        },
        {
          key: 'componentWillReceiveProp',
          value: function componentWillReceiveProp(name, newVal, oldVal) {
            _get(
              _getPrototypeOf(SAutocompleteComponent.prototype),
              'componentWillReceiveProp',
              this
            ).call(this, name, newVal, oldVal)
          }
          /**
           * Render the component
           * Here goes the code that reflect the this.props state on the actual html element
           * @definition    SWebComponent.render
           * @protected
           */
        },
        {
          key: 'render',
          value: function render() {
            var _this2 = this

            if (this.state.isOpened) {
              // check if we find the text in the option
              var regexp = new RegExp(
                '('.concat(this._$targetInput.value, ')(?!([^<]+)?>)'),
                'gi'
              )

              if (this.state.isLoading) {
                _get(
                  _getPrototypeOf(SAutocompleteComponent.prototype),
                  'render',
                  this
                ).call(
                  this,
                  _coffeekrakenSTemplateComponent.default.createElement(
                    'div',
                    {
                      className: ''.concat(this.componentNameDash, '__loading')
                    },
                    _coffeekrakenSTemplateComponent.default.createElement(
                      'div',
                      {
                        className: ''.concat(this.componentNameDash, '__loader')
                      }
                    )
                  )
                )
              } else {
                _get(
                  _getPrototypeOf(SAutocompleteComponent.prototype),
                  'render',
                  this
                ).call(
                  this,
                  _coffeekrakenSTemplateComponent.default.createElement(
                    'ul',
                    {
                      className: ''.concat(this.componentNameDash, '__results')
                    },
                    this.state.results.map(function(result, idx) {
                      return _coffeekrakenSTemplateComponent.default.createElement(
                        'li',
                        {
                          key: result.id || idx,
                          idx: idx,
                          onClick: function onClick() {
                            return _this2._resultClickHandler(idx)
                          },
                          className: ''
                            .concat(_this2.componentNameDash, '__result ')
                            .concat(
                              idx === _this2.state.selectedResultIdx
                                ? 'active'
                                : ''
                            ),
                          dangerouslySetInnerHTML: {
                            __html: _mustache.default
                              .render(_this2._htmlTemplate, result)
                              .replace(
                                regexp,
                                '<span class="'.concat(
                                  _this2.componentNameDash,
                                  '__search-result">$1</span>'
                                )
                              )
                          }
                        }
                      )
                    })
                  )
                )
              }
            }
          }
          /**
           * Click on a result
           * @param    {Integer}    idx    The chosen result idx
           */
        },
        {
          key: '_resultClickHandler',
          value: function _resultClickHandler(idx) {
            // force close
            this._forceClose() // set the selected result idx

            this.state.selectedResultIdx = idx // trigger the _chooseSelectedResult

            this._chooseSelectedResult()
          }
          /**
           * Choose selected result
           */
        },
        {
          key: '_chooseSelectedResult',
          value: function _chooseSelectedResult() {
            // we need a selectedResultIdx to work with
            if (this.state.selectedResultIdx === null) return // get the selected result json and dom element

            var selectedJson = this.state.results[this.state.selectedResultIdx]
            var $selectedResult = this.querySelector(
              '[idx="'.concat(this.state.selectedResultIdx, '"]')
            ) // try to get the value.
            // 1. from the dom element in the "s-autocomplete-value" attribute
            // 2. from the json in the "value" property
            // 3. finally, from the html using innerHTML and striptags

            var value = null
            var $sAutocompleteValueElm = $selectedResult.querySelector(
              '['.concat(this.componentNameDash, '-value]')
            )

            if ($sAutocompleteValueElm) {
              value = $sAutocompleteValueElm.getAttribute(
                ''.concat(this.componentNameDash, '-value')
              )
            } else if (selectedJson.value) {
              value = selectedJson.value.toString()
            } else {
              value = (0, _striptags.default)($selectedResult.innerHTML)
            } // set the value on the target input

            this._$targetInput.value = value
            ;(0, _dispatchEvent.default)(this._$targetInput, 'change', value)
            /**
             * @event
             * @name    chosen
             * Event dispatched when an autocomplete result has been chosen.
             * The result json will be passed to the event under `e.detail`
             */

            ;(0, _dispatchEvent.default)(this, 'chosen', selectedJson) // onChoose property

            if (this.props.onChoose) this.props.onChoose(selectedJson) // close the autocomplete

            if (this.isOpened()) this._forceClose()
          }
          /**
           * Select next result
           */
        },
        {
          key: '_selectNextResult',
          value: function _selectNextResult() {
            // check if already have a result selected
            if (this.state.selectedResultIdx !== null) {
              if (
                this.state.selectedResultIdx + 1 <
                this.state.results.length
              ) {
                this.state.selectedResultIdx += 1
              } else {
                this.state.selectedResultIdx = 0
              }
            } else {
              this.state.selectedResultIdx = 0
            } // scroll to selected result

            this._scrollToSelectedResult()
          }
          /**
           * Select previous result
           */
        },
        {
          key: '_selectPreviousResult',
          value: function _selectPreviousResult() {
            // check if already have a result selected
            if (this.state.selectedResultIdx !== null) {
              if (this.state.selectedResultIdx - 1 >= 0) {
                this.state.selectedResultIdx -= 1
              } else {
                this.state.selectedResultIdx = this.state.results.length - 1
              }
            } else {
              this.state.selectedResultIdx = this.state.results.length - 1
            } // scroll to selected result

            this._scrollToSelectedResult()
          }
          /**
           * Scroll to selected result
           */
        },
        {
          key: '_scrollToSelectedResult',
          value: function _scrollToSelectedResult() {
            // we need a selectedResultIdx to work with
            if (
              this.state.selectedResultIdx === null ||
              !this.state.results.length
            )
              return // query the result item in the dom

            var $result = this.querySelector(
              '[idx="'.concat(this.state.selectedResultIdx, '"]')
            ) // calculate the offset relative to the parent

            var resultOffsetParent = (0, _offsetParent.default)($result) // check if the selected result is above or bellow the fold

            if (
              resultOffsetParent.top - this.scrollTop + $result.offsetHeight >=
              this.offsetHeight
            ) {
              this.scrollTop =
                resultOffsetParent.top -
                this.offsetHeight +
                $result.offsetHeight
            } else if (resultOffsetParent.top - this.scrollTop < 0) {
              this.scrollTop = resultOffsetParent.top
            }
          }
          /**
           * Set size and position of the autocomplete container
           */
        },
        {
          key: '_setSizeAndPosition',
          value: function _setSizeAndPosition() {
            var _this3 = this

            var isResize =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : false
            // only if the autocomplete is opened
            if (!this.isOpened() && !isResize) return // get the target offset

            var targetInputOffset = (0, _offset.default)(this._$targetInput)
            var targetInputTop =
              targetInputOffset.top - (0, _scrollTop.default)()
            var targetInputLeft =
              targetInputOffset.left - (0, _scrollLeft.default)()
            var targetInputHeight = this._$targetInput.offsetHeight
            var targetInputOffsetBottom =
              window.innerHeight - (targetInputTop + targetInputHeight)
            var dropup = false

            if (targetInputOffsetBottom < this.props.dropupLimit) {
              dropup = true
            }

            if (dropup) {
              // set the position
              this.style.top = 'auto'
              this.style.bottom = ''.concat(
                window.innerHeight - targetInputTop + this.props.offset,
                'px'
              )
              this.style.left = ''.concat(targetInputLeft, 'px')
              this.style.maxHeight = ''.concat(
                targetInputTop - this.props.screenMarginTop - this.props.offset,
                'px'
              )
            } else {
              // set the position
              this.style.bottom = 'auto'
              this.style.top = ''.concat(
                targetInputTop + targetInputHeight + this.props.offset,
                'px'
              )
              this.style.left = ''.concat(targetInputLeft, 'px')
              this.style.maxHeight = ''.concat(
                window.innerHeight -
                  (targetInputTop + targetInputHeight) -
                  this.props.screenMarginBottom -
                  this.props.offset,
                'px'
              )
            }

            if (this.props.autoWidth) {
              var targetInputWidth = this._$targetInput.offsetWidth

              if (isResize) {
                this.style.width = ''
                setTimeout(function() {
                  if (_this3.offsetWidth < targetInputWidth) {
                    _this3.style.width = ''.concat(targetInputWidth, 'px')
                  }
                })
              } else if (this.offsetWidth < targetInputWidth) {
                this.style.width = ''.concat(targetInputWidth, 'px')
              }
            }
          }
          /**
           * Process to the search on the data-source using the passed value
           * @param    {String}    query    The query to make the search
           * @return    {Promise}    A promise with the search result as value
           */
        },
        {
          key: '_search',
          value: (function() {
            var _search2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(query) {
                var response
                return regeneratorRuntime.wrap(
                  function _callee$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          if (!(query.length < this.props.minLengthForSearch)) {
                            _context.next = 3
                            break
                          }

                          this.state.results = []
                          return _context.abrupt('return')

                        case 3:
                          // reset some variables
                          this.state.selectedResultIdx = null // add the state class

                          this.classList.add('loading') // set the state loading

                          this.state.isLoading = true // check if we have the value in cache

                          if (!this._cache[query]) {
                            _context.next = 10
                            break
                          }

                          this.state.results = this._cache[query]
                          _context.next = 15
                          break

                        case 10:
                          _context.next = 12
                          return _axios.default.get(this.props.endpoint, {
                            params: _defineProperty(
                              {},
                              this.props.queryStringParam,
                              query
                            )
                          })

                        case 12:
                          response = _context.sent
                          // save in cache the results
                          this._cache[query] = response.data // save the results in the state

                          this.state.results = response.data

                        case 15:
                          // onSearch prop
                          if (this.props.onSearch)
                            this.props.onSearch(
                              query,
                              JSON.parse(JSON.stringify(this.state.results))
                            ) // remove the state class

                          this.classList.remove('loading') // set the state loading

                          this.state.isLoading = false

                        case 18:
                        case 'end':
                          return _context.stop()
                      }
                    }
                  },
                  _callee,
                  this
                )
              })
            )

            function _search(_x) {
              return _search2.apply(this, arguments)
            }

            return _search
          })()
          /**
           * Force close
           */
        },
        {
          key: '_forceClose',
          value: function _forceClose() {
            var _this4 = this

            this.classList.add('force-close')
            setTimeout(function() {
              _this4.classList.remove('force-close')
            }, 100)
            this.close()
          }
          /**
           * Open the autocomplete with an optional keywords value
           * @param    {String}    keywords    Some keywords to search
           */
        },
        {
          key: 'open',
          value: function open() {
            // if the input is empty, reset the results
            if (
              this._$targetInput.value.length < this.props.minLengthForSearch
            ) {
              return
            } // open the autocomplete

            this.state.isOpened = true // add the active class

            this.classList.add('active') // set size and position

            this._setSizeAndPosition()
          }
          /**
           * Close the autocomplete
           */
        },
        {
          key: 'close',
          value: function close() {
            // set the isOpened flag
            this.state.isOpened = false // remove the active class

            this.classList.remove('active') // reset some variables

            this.state.results = []
            this.state.selectedResultIdx = null
          }
          /**
           * Check if the autocomplete is opened or not
           * @return    {Boolean}    true if opened, false if not
           */
        },
        {
          key: 'isOpened',
          value: function isOpened() {
            return this.state.isOpened
          }
        }
      ],
      [
        {
          key: 'defaultCss',

          /**
           * Css
           * @protected
           */
          value: function defaultCss(componentName, componentNameDash) {
            return '\n      '
              .concat(
                componentNameDash,
                ' {\n        display : block;\n        position: fixed;\n        overflow-x: hidden;\n        overflow-y: auto;\n        opacity: 0;\n        pointer-events: none;\n      }\n      '
              )
              .concat(
                componentNameDash,
                '.force-close {\n        display: none;\n        pointer-events: none !important;\n      }\n\n      '
              )
              .concat(
                componentNameDash,
                '.active {\n        opacity: 1;\n        pointer-events: all;\n      }\n      .'
              )
              .concat(componentNameDash, '__result:hover,\n      .')
              .concat(
                componentNameDash,
                '__result.active {\n        cursor: pointer;\n      }\n      .'
              )
              .concat(
                componentNameDash,
                '__search-result {\n        font-weight: bold;\n      }\n    '
              )
          }
        },
        {
          key: 'defaultProps',

          /**
           * Default props
           * @definition    SWebComponent.defaultProps
           * @protected
           */
          get: function get() {
            return {
              /**
               * Specify the input to connect the autocomplete to.
               * This is exactly like the `for` attribute of a `label` tag
               * @prop
               * @type    {String}
               */
              for: null,

              /**
               * Specify the endpoint to use for search and get back autocomplete values
               * @prop
               * @type    {String}
               */
              endpoint: null,

              /**
               * Specify if the autocomplete has to open itself on input focus
               * @prop
               * @type    {Boolean}
               */
              openOnFocus: false,

              /**
               * Specify how many times to wait between the user input and the request to the endpoint in ms
               * @prop
               * @type    {Integer}
               */
              inputDebounce: 500,

              /**
               * Specify the query string search param name
               * @prop
               * @type    {String}
               */
              queryStringParam: 'q',

              /**
               * Specify how many characters are needed before trigger a search request on the endpoint
               * @prop
               * @type    {Integer}
               */
              minLengthForSearch: 1,

              /**
               * Specify if the autocomplete width has to match as best the target input width
               * @prop
               * @type    {Boolean}
               */
              autoWidth: true,

              /**
               * Specify the margin in pixels to keep between the select dropdown and the window top corner
               * @prop
               * @type 	{Integer}
               */
              screenMarginTop: 50,

              /**
               * Specify the margin in pixels to keep between the select dropdown and the window bottom corner
               * @prop
               * @type 	{Integer}
               */
              screenMarginBottom: 50,

              /**
               * Specify the limit height under which to set the select as a dropup
               * @prop
               * @type 		{Number}
               */
              dropupLimit: 200,

              /**
               * Specify an offset for the autocomplete. This will add a margin between the autocomplete and the target input
               * @prop
               * @type    {Integer}
               */
              offset: 1,

              /**
               * When a result has been chosen. The chosen result object will be passed as a parameter
               * @prop
               * @type    {Function}
               */
              onChoose: null,

              /**
               * When a search query has been made. The query string and the search response will be passed as parameters
               * @prop
               * @type    {Function}
               */
              onSearch: null
            }
          }
          /**
           * Default state
           * @definition    STemplateComponent.defaultState
           * @deprecated
           */
        },
        {
          key: 'defaultState',
          get: function get() {
            return {
              /**
               * Store the results of the search json
               * @type    {Array}
               */
              results: [],

              /**
               * Store the selected result idx
               * @type    {Integer}
               */
              selectedResultIdx: null,

              /**
               * Store the opened state of the autocomplete
               * @type    {Boolean}
               */
              isOpened: false,

              /**
               * Store the loading state of the autocomplete
               * @type    {Boolean}
               */
              isLoading: false
            }
          }
          /**
           * Required props
           * @definition    SWebComponent.requiredProps
           * @protected
           */
        },
        {
          key: 'requiredProps',
          get: function get() {
            return ['for', 'endpoint']
          }
        }
      ]
    )

    return SAutocompleteComponent
  })(_coffeekrakenSTemplateComponent.default)

exports.default = SAutocompleteComponent

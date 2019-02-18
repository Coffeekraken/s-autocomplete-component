import STemplateComponent from 'coffeekraken-s-template-component'
import addEventListener from 'coffeekraken-sugar/js/dom/addEventListener'
import debounce from 'coffeekraken-sugar/js/utils/functions/debounce'
import axios from 'axios'
import mustache from 'mustache'
import scrollTop from 'coffeekraken-sugar/js/dom/scrollTop'
import scrollLeft from 'coffeekraken-sugar/js/dom/scrollLeft'
import offset from 'coffeekraken-sugar/js/dom/offset'
import offsetParent from 'coffeekraken-sugar/js/dom/offsetParent'
import striptags from 'coffeekraken-sugar/js/utils/strings/striptags'
import dispatchEvent from 'coffeekraken-sugar/js/dom/dispatchEvent'
import isHover from 'coffeekraken-sugar/js/dom/isHover'
import isInIframe from 'coffeekraken-sugar/js/dom/isInIframe'

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
export default class SAutocompleteComponent extends STemplateComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
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
  static get defaultState() {
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
  static get requiredProps() {
    return ['for', 'endpoint']
  }

  /**
   * Css
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display : block;
        position: fixed;
        overflow-x: hidden;
        overflow-y: auto;
        opacity: 0;
        pointer-events: none;
      }
      ${componentNameDash}.force-close {
        display: none;
        pointer-events: none !important;
      }

      ${componentNameDash}.active {
        opacity: 1;
        pointer-events: all;
      }
      .${componentNameDash}__result:hover,
      .${componentNameDash}__result.active {
        cursor: pointer;
      }
      .${componentNameDash}__search-result {
        font-weight: bold;
      }
    `
  }

  /**
   * Component will mount
   * @definition    SWebComponent.componentWillMount
   * @protected
   */
  componentWillMount() {
    super.componentWillMount()

    // get the target input
    if (this.props.for instanceof HTMLElement) {
      this._$targetInput = this.props.for
    } else if (typeof this.props.for === 'string') {
      this._$targetInput = document.querySelector(
        `#${this.props.for},[name="${this.props.for}"]`
      )
    }
    if (!this._$targetInput) {
      throw new Error(
        `The ${this.componentNameDash} component need a proper "for" target...`
      )
    }

    // some variables
    this._cache = {}
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount() {
    super.componentMount()

    // get the template html from component itself
    const $templateChild = this.querySelector('template')
    this._htmlTemplate = $templateChild
      ? $templateChild.innerHTML
      : this.innerHTML
    this.innerHTML = ''

    // add some attributes to the target input
    this._$targetInput.setAttribute('autocomplete', 'off')

    // prepare the search function wrapped in the debounce
    const searchDebouncedFn = debounce(
      this._search.bind(this),
      this.props.inputDebounce
    )

    // listen for keydown
    this._removeKeydownHandler = addEventListener(document, 'keydown', e => {
      // prevent triggering other autocomplete in the page
      if (document.activeElement !== this._$targetInput) return
      // take care of some keys pressed
      switch (e.keyCode) {
        case 38: // up arrow
          e.preventDefault()
          if (!this.isOpened()) {
            this._search(this._$targetInput.value)
            this.open()
          } else {
            this._selectPreviousResult()
          }
          break
        case 40: // down arrow
          e.preventDefault()
          if (!this.isOpened()) {
            this._search(this._$targetInput.value)
            this.open()
          } else {
            this._selectNextResult()
          }
          break
        case 13: // enter
          e.preventDefault()
          this._chooseSelectedResult()
          break
        case 27: // escape
          e.preventDefault()
          // close the autocomplete
          this._forceClose()
          break
        default:
      }
    })

    // listen for scroll
    this._removeScrollHandler = addEventListener(window, 'scroll', () => {
      // set size and position
      this._setSizeAndPosition()
    })

    // lsiten for resize
    this._removeResizeHandler = addEventListener(window, 'resize', () => {
      // set size and position
      this._setSizeAndPosition(true)
    })

    // listen for focus in the target element
    this._removeFocusHandler = addEventListener(
      this._$targetInput,
      'focus',
      () => {
        if (this.props.openOnFocus) {
          // open the autocomplete
          this._search(this._$targetInput.value)
          this.open()
        }
      }
    )

    // listen for blur in the target element
    this._removeBlurHandler = addEventListener(
      this._$targetInput,
      'blur',
      () => {
        let closeTimeout = 0

        // check if the mouse if hover the autocomplete
        if (isHover(this) || isInIframe()) {
          closeTimeout = 1000 // this seems to be high but it will be closed by the _chooseSelectedResult method anyway
        }

        // close the autocomplete
        setTimeout(() => {
          this.close()
        }, closeTimeout)
      }
    )

    // listen for click in the target element
    this._removeTargetClickHandler = addEventListener(
      this._$targetInput,
      'click',
      () => {
        if (this.props.openOnFocus) {
          // open the autocomplete
          this._search(this._$targetInput.value)
          this.open()
        }
      }
    )

    // listen for updates from the target field
    this._removeInputChangeHandler = addEventListener(
      this._$targetInput,
      'input',
      e => {
        // make the search
        searchDebouncedFn(e.target.value)
        // open the autocomplete
        this.open()
      }
    )

    // first time set position and size
    this._setSizeAndPosition()
  }

  /**
   * Component unmount
   * @definition    SWebComponent.componentUnmount
   * @protected
   */
  componentUnmount() {
    super.componentUnmount()
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
  componentWillReceiveProp(name, newVal, oldVal) {
    super.componentWillReceiveProp(name, newVal, oldVal)
  }

  /**
   * Render the component
   * Here goes the code that reflect the this.props state on the actual html element
   * @definition    SWebComponent.render
   * @protected
   */
  render() {
    if (this.state.isOpened) {
      // check if we find the text in the option
      const regexp = new RegExp(
        `(${this._$targetInput.value})(?!([^<]+)?>)`,
        'gi'
      )

      if (this.state.isLoading) {
        super.render(
          <div className={`${this.componentNameDash}__loading`}>
            <div className={`${this.componentNameDash}__loader`} />
          </div>
        )
      } else {
        super.render(
          <ul className={`${this.componentNameDash}__results`}>
            {this.state.results.map((result, idx) => (
              <li
                key={result.id || idx}
                idx={idx}
                onClick={() => this._resultClickHandler(idx)}
                className={`${this.componentNameDash}__result ${
                  idx === this.state.selectedResultIdx ? 'active' : ''
                }`}
                dangerouslySetInnerHTML={{
                  __html: mustache
                    .render(this._htmlTemplate, result)
                    .replace(
                      regexp,
                      `<span class="${
                        this.componentNameDash
                      }__search-result">$1</span>`
                    )
                }}
              />
            ))}
          </ul>
        )
      }
    }
  }

  /**
   * Click on a result
   * @param    {Integer}    idx    The chosen result idx
   */
  _resultClickHandler(idx) {
    // force close
    this._forceClose()
    // set the selected result idx
    this.state.selectedResultIdx = idx
    // trigger the _chooseSelectedResult
    this._chooseSelectedResult()
  }

  /**
   * Choose selected result
   */
  _chooseSelectedResult() {
    // we need a selectedResultIdx to work with
    if (this.state.selectedResultIdx === null) return

    // get the selected result json and dom element
    const selectedJson = this.state.results[this.state.selectedResultIdx]
    const $selectedResult = this.querySelector(
      `[idx="${this.state.selectedResultIdx}"]`
    )

    // try to get the value.
    // 1. from the dom element in the "s-autocomplete-value" attribute
    // 2. from the json in the "value" property
    // 3. finally, from the html using innerHTML and striptags
    let value = null
    const $sAutocompleteValueElm = $selectedResult.querySelector(
      `[${this.componentNameDash}-value]`
    )
    if ($sAutocompleteValueElm) {
      value = $sAutocompleteValueElm.getAttribute(
        `${this.componentNameDash}-value`
      )
    } else if (selectedJson.value) {
      value = selectedJson.value.toString()
    } else {
      value = striptags($selectedResult.innerHTML)
    }

    // set the value on the target input
    this._$targetInput.value = value
    dispatchEvent(this._$targetInput, 'change', value)

    /**
     * @event
     * @name    chosen
     * Event dispatched when an autocomplete result has been chosen.
     * The result json will be passed to the event under `e.detail`
     */
    dispatchEvent(this, 'chosen', selectedJson)

    // onChoose property
    if (this.props.onChoose) this.props.onChoose(selectedJson)

    // close the autocomplete
    if (this.isOpened()) this._forceClose()
  }

  /**
   * Select next result
   */
  _selectNextResult() {
    // check if already have a result selected
    if (this.state.selectedResultIdx !== null) {
      if (this.state.selectedResultIdx + 1 < this.state.results.length) {
        this.state.selectedResultIdx += 1
      } else {
        this.state.selectedResultIdx = 0
      }
    } else {
      this.state.selectedResultIdx = 0
    }
    // scroll to selected result
    this._scrollToSelectedResult()
  }

  /**
   * Select previous result
   */
  _selectPreviousResult() {
    // check if already have a result selected
    if (this.state.selectedResultIdx !== null) {
      if (this.state.selectedResultIdx - 1 >= 0) {
        this.state.selectedResultIdx -= 1
      } else {
        this.state.selectedResultIdx = this.state.results.length - 1
      }
    } else {
      this.state.selectedResultIdx = this.state.results.length - 1
    }
    // scroll to selected result
    this._scrollToSelectedResult()
  }

  /**
   * Scroll to selected result
   */
  _scrollToSelectedResult() {
    // we need a selectedResultIdx to work with
    if (this.state.selectedResultIdx === null || !this.state.results.length)
      return

    // query the result item in the dom
    const $result = this.querySelector(
      `[idx="${this.state.selectedResultIdx}"]`
    )

    // calculate the offset relative to the parent
    const resultOffsetParent = offsetParent($result)

    // check if the selected result is above or bellow the fold
    if (
      resultOffsetParent.top - this.scrollTop + $result.offsetHeight >=
      this.offsetHeight
    ) {
      this.scrollTop =
        resultOffsetParent.top - this.offsetHeight + $result.offsetHeight
    } else if (resultOffsetParent.top - this.scrollTop < 0) {
      this.scrollTop = resultOffsetParent.top
    }
  }

  /**
   * Set size and position of the autocomplete container
   */
  _setSizeAndPosition(isResize = false) {
    // only if the autocomplete is opened
    if (!this.isOpened() && !isResize) return

    // get the target offset
    const targetInputOffset = offset(this._$targetInput)
    const targetInputTop = targetInputOffset.top - scrollTop()
    const targetInputLeft = targetInputOffset.left - scrollLeft()
    const targetInputHeight = this._$targetInput.offsetHeight
    const targetInputOffsetBottom =
      window.innerHeight - (targetInputTop + targetInputHeight)
    let dropup = false

    if (targetInputOffsetBottom < this.props.dropupLimit) {
      dropup = true
    }

    if (dropup) {
      // set the position
      this.style.top = 'auto'
      this.style.bottom = `${window.innerHeight -
        targetInputTop +
        this.props.offset}px`
      this.style.left = `${targetInputLeft}px`
      this.style.maxHeight = `${targetInputTop -
        this.props.screenMarginTop -
        this.props.offset}px`
    } else {
      // set the position
      this.style.bottom = 'auto'
      this.style.top = `${targetInputTop +
        targetInputHeight +
        this.props.offset}px`
      this.style.left = `${targetInputLeft}px`
      this.style.maxHeight = `${window.innerHeight -
        (targetInputTop + targetInputHeight) -
        this.props.screenMarginBottom -
        this.props.offset}px`
    }

    if (this.props.autoWidth) {
      const targetInputWidth = this._$targetInput.offsetWidth
      if (isResize) {
        this.style.width = ''
        setTimeout(() => {
          if (this.offsetWidth < targetInputWidth) {
            this.style.width = `${targetInputWidth}px`
          }
        })
      } else if (this.offsetWidth < targetInputWidth) {
        this.style.width = `${targetInputWidth}px`
      }
    }
  }

  /**
   * Process to the search on the data-source using the passed value
   * @param    {String}    query    The query to make the search
   * @return    {Promise}    A promise with the search result as value
   */
  async _search(query) {
    // if the input is empty, reset the results
    if (query.length < this.props.minLengthForSearch) {
      this.state.results = []
      return
    }
    // reset some variables
    this.state.selectedResultIdx = null
    // add the state class
    this.classList.add('loading')
    // set the state loading
    this.state.isLoading = true
    // check if we have the value in cache
    if (this._cache[query]) {
      this.state.results = this._cache[query]
    } else {
      // make the search on the endpoint
      const response = await axios.get(this.props.endpoint, {
        params: {
          [this.props.queryStringParam]: query
        }
      })
      // save in cache the results
      this._cache[query] = response.data
      // save the results in the state
      this.state.results = response.data
    }
    // onSearch prop
    if (this.props.onSearch)
      this.props.onSearch(query, JSON.parse(JSON.stringify(this.state.results)))
    // remove the state class
    this.classList.remove('loading')
    // set the state loading
    this.state.isLoading = false
  }

  /**
   * Force close
   */
  _forceClose() {
    this.classList.add('force-close')
    setTimeout(() => {
      this.classList.remove('force-close')
    }, 100)
    this.close()
  }

  /**
   * Open the autocomplete with an optional keywords value
   * @param    {String}    keywords    Some keywords to search
   */
  open() {
    // if the input is empty, reset the results
    if (this._$targetInput.value.length < this.props.minLengthForSearch) {
      return
    }
    // open the autocomplete
    this.state.isOpened = true
    // add the active class
    this.classList.add('active')
    // set size and position
    this._setSizeAndPosition()
  }

  /**
   * Close the autocomplete
   */
  close() {
    // set the isOpened flag
    this.state.isOpened = false
    // remove the active class
    this.classList.remove('active')
    // reset some variables
    this.state.results = []
    this.state.selectedResultIdx = null
  }

  /**
   * Check if the autocomplete is opened or not
   * @return    {Boolean}    true if opened, false if not
   */
  isOpened() {
    return this.state.isOpened
  }
}

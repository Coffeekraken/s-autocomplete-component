module.exports = {
  // server port
  port: 3000,

  // title
  title: 's-autocomplete-component',

  // layout
  layout: 'right',

  // compile server
  compileServer: {
    // compile server port
    port: 4000
  },

  // editors
  editors: {
    html: {
      language: 'html',
      data: `
        <input type="search" name="keywords" placeholder="Keywords..." class="form-input" />
        <s-autocomplete for="keywords" endpoint="demo/data/mock.json">
          <span class="firstname" s-autocomplete-value="{{email}}">{{first_name}}</span> <span class="lastname">{{last_name}}</span>
          <p class="p">{{email}}</p>
        </s-autocomplete>
        <p class="p m-t">
          In this demo, the filtering does not work cause it's attached to a plain JSON backend...
        </p>
      `
    },
    css: {
      language: 'scss',
      data: `
        @import 'node_modules/coffeekraken-sugar/index';
        @import 'node_modules/coffeekraken-s-typography-component/index';
        @import 'node_modules/coffeekraken-s-form-component/index';
        @import 'index';
        @include s-init();
        @include s-classes();
        @include s-typography-classes();
        body {
          padding: s-space(bigger);
        }
        @include s-form-classes();
        @include s-autocomplete-classes();
      `
    },
    js: {
      language: 'js',
      data: `
        import '@babel/polyfill'
        import SAutocompleteComponent from './dist/index'
      `
    }
  }
}

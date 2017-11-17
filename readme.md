# hyperterm-dibdabs

<img width="600" src="https://raw.githubusercontent.com/supercrabtree/hyperterm-dibdabs/master/media/screen-shot.png"/>

The little colored dot on the left of the tab is added for quick identification
of commonly used tabs. The dot is always the same color for every tab title, so
my dotfiles are always that same pink and my home folder always that same blue.
Makes moving between projects that little bit quicker.

Powered by [hashbow](https://www.npmjs.com/package/hashbow)

## Config
To override the color of your dibdab, add the file path and desired color (hex or rgb) to the `override` attribute of the plugin's configuration, located in the `hyper.js` file.

**For example:** Update the color of the `Development` directory to a lovely pale green.

``` javascript
module.exports = {
  config: {
    'hyperterm-dibdabs': {
      overrides: {
        '~/Development': '#c0ffee'
      }
    }
  }
}
```

'use strict';

const hashbow = require('hashbow');

function getOverrides(path) {
  return window.config.getConfig()['hyperterm-dibdabs'].overrides[path];
}

function getColor(path) {
  return getOverrides(path) || hashbow(path);
}

exports.getTabProps = function (uid, parentProps, props) {
  return Object.assign({}, props, {
    dabColor: getColor(props.text)
  });
};

exports.decorateTab = function (Tab, { React }) {
  return class extends Tab {
    render() {
      const dab = React.createElement('span', {
        className: 'tab_dibdab',
        style: {
          'background-color': this.props.dabColor
        }
      });
      const customChildrenBefore = Array.from(this.props.customChildrenBefore || []).concat(dab);
      return React.createElement(Tab, Object.assign({}, this.props, { customChildrenBefore }));
    }
  }
};

exports.decorateConfig = function (config) {
  return Object.assign({}, config, {
    css: `
      ${config.css || ''}
      .tab_dibdab {
        position: absolute;
        left: 13px;
        top: 13px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
    `
  });
};

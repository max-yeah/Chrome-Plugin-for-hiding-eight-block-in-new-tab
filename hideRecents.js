// Generated by CoffeeScript 1.10.0
(function() {
  chrome.runtime.onMessage.addListener(function(msg) {
    var modEl, storageOptions, storageOptions2domElementSelectors;
    modEl = function(selector, modus) {
      var error, ex, i, len, pNode, targetNode, targetNodes;
      targetNodes = document.querySelectorAll(selector);
      for (i = 0, len = targetNodes.length; i < len; i++) {
        targetNode = targetNodes[i];
        try {
          switch (modus) {
            case 'remove':
            case void 0:
              pNode = targetNode.parentNode;
              pNode.removeChild(targetNode);
              break;
            case 'invisible':
              targetNode.style.visibility = 'hidden';
              break;
            case 'hide':
              targetNode.style.display = 'none';
          }
        } catch (error) {
          ex = error;
        }
      }
    };
    if (msg === 'activate') {
      modEl('#most-visited', 'remove');
    }
    storageOptions = ['cbAlsoHideLogo', 'cbAlsoHideSearchbar', 'cbAlsoHideNavbar', 'cbAlsoHidePromo', 'cbAlsoHideByCssSelectors'];
    storageOptions2domElementSelectors = {
      cbAlsoHideLogo: {
        selector: '#lga',
        modus: 'invisible'
      },
      cbAlsoHideSearchbar: {
        selector: '#f',
        modus: 'remove'
      },
      cbAlsoHideNavbar: {
        selector: '#mngb',
        modus: 'remove'
      },
      cbAlsoHidePromo: {
        selector: '#prm-pt',
        modus: 'remove'
      }
    };
    chrome.storage.sync.get(storageOptions, function(dataObject) {
      var i, item, key, len, sel, selectors;
      for (key in dataObject) {
        try {
          if (dataObject[key] === true) {
            item = storageOptions2domElementSelectors[key];
            modEl(item.selector, item.modus);
          } else if (dataObject[key].length > 1) {
            selectors = dataObject[key].split("\n");
            for (i = 0, len = selectors.length; i < len; i++) {
              sel = selectors[i];
              modEl(sel, 'hide');
            }
          }
        } catch (undefined) {}
      }
    });
  });

}).call(this);

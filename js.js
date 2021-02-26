chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      var array_price = []
      var doc = new DOMParser().parseFromString(request.source, "text/html")
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        if(url.includes("olx")){           
            //Code for olx website:
            var length_elements =doc.body.querySelectorAll('p.price').length;
            for (var i = 0; i <length_elements;i++){
                var single_element =doc.body.querySelectorAll('p.price')[i].querySelector('strong').innerHTML.toString().replace(/\s/g,'');
                var matches = single_element.match(/(\d+)/)[0];
                array_price.push(parseInt(matches));
            }
        message.innerText = (((array_price.reduce((a, b) => a + b, 0))/length_elements).toFixed(2)+" PLN");//Average price for search item
        }       
    });

    }
  });
  
  function onWindowLoad() {
    var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  }
  window.onload = onWindowLoad;
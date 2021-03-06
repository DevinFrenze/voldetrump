var elements = document.getElementsByTagName('*');

function replaceWords() {
  for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      for (var j = 0; j < element.childNodes.length; j++) {
          var node = element.childNodes[j];

          if (node.nodeType === 3) {
              var text = node.nodeValue;
              var replacedText = text.replace(/(Donald\s?([(J\.?)(John)]*\s)?)?Trump/g, 'Voldemort');
                            
              if (replacedText !== text) {
                  element.replaceChild(document.createTextNode(replacedText), node);
              }
          }
      }
  }
}
replaceWords()
setInterval(replaceWords, 1000)

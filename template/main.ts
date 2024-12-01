//

import {SlideTemplateManager, withRange} from "@zenml/slide";


const manager = new SlideTemplateManager();

manager.registerElementRule(["row"], "slide", (transformer, document, element) => {
  const self = document.createDocumentFragment();
  self.appendElement("section", (self) => {
    const language = element.getAttribute("lang");
    self.addClassName("row");
    self.setAttribute("data-lang", language);
    self.appendElement("div", (self) => {
      self.addClassName("row-left");
      if (language === "sh") {
        self.appendElement("img", (self) => {
          self.addClassName("logo");
          self.setAttribute("src", "https://ziphil.com/material/logo/2.svg");
        });
      }
    });
    self.appendElement("p", (self) => {
      self.addClassName("text");
      self.addClassName("bordered");
      self.appendElement("span", (self) => {
        self.addClassName("bordered-real");
        self.appendChild(transformer.apply());
      });
      self.appendElement("span", (self) => {
        self.addClassName("bordered-dummy");
        self.appendChild(transformer.apply());
      });
    });
  });
  return self;
});

manager.registerElementRule(["section", "p", "div", "span", "img"], "slide", withRange((transformer, document, element) => {
  const self = document.createDocumentFragment();
  self.appendElement(element.tagName, (self) => {
    for (let i = 0 ; i < element.attributes.length ; i ++) {
      const {name, value} = element.attributes.item(i)!;
      if (name !== "range") {
        self.setAttribute(name, value);
      }
    }
    self.appendChild(transformer.apply());
  });
  return self;
}));

export default manager;
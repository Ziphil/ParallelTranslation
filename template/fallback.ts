//

import {SlideTemplateManager} from "@zenml/slide";


const INLINE_TAG_NAMES = ["x", "xn", "a"];

const manager = new SlideTemplateManager();

manager.registerElementRule(true, "slide", (transformer, document) => {
  return document.createDocumentFragment();
});

manager.registerTextRule("slide", (transformer, document, text) => {
  let content = text.data;
  content = content.replace(/\uFEFF/gu, "");
  content = content.replace(/(、|。|」|』|〉)/g, (match) => match + " ");
  content = content.replace(/(「|『|〈)/g, (match) => " " + match);
  content = content.replace(/(、|。)\s+(」|』)/g, (match, before, after) => before + after);
  content = content.replace(/(」|』|〉)\s+(、|。|,|\.)/g, (match, before, after) => before + after);
  content = content.replace(/(\(|「|『)\s+(「|『)/g, (match, before, after) => before + after);
  if (!text.previousSibling?.isElement() || !INLINE_TAG_NAMES.includes(text.previousSibling.tagName)) {
    content = content.replace(/^\s+(「|『|〈)/g, (match, paren) => paren);
  }
  if (!text.nextSibling?.isElement() || !INLINE_TAG_NAMES.includes(text.nextSibling.tagName)) {
    content = content.replace(/(」|』|〉)\s+$/g, (match, paren) => paren);
  }
  const self = document.createTextNode(content);
  return self;
});

export default manager;
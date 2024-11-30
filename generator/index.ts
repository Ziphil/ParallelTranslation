//

import "source-map-support/register";
import {SlideGenerator} from "@zenml/slide";
import "@zenml/xmldom";
import templateManagers from "../template";


const generator = new SlideGenerator({
  pluginManagers: [],
  templateManagers,
  documentDirPath: "document",
  outputDirPath: "out",
  errorLogPath: "log/error.txt"
});
generator.execute();
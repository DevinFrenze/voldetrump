var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*",
  contentScriptFile: "./content-script.js",
  contentScriptWhen: "end"
})

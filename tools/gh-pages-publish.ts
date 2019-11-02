// tslint:disable: no-var-requires
// since ts-node compiled js files may contain import statements
// that may not supported by current node interpreter
// use require here
const fs = require("fs");
const ghpages = require("gh-pages");
const path = require("path");

const docRoot = "build/docs";
const nojekyll = path.join(process.cwd(), docRoot, ".nojekyll");
// create .nojekyll file make github jekyll off
// so ghpages will no ignore filename starts with _
// otherwise it returns 404
if (!fs.existsSync(nojekyll)) {
    fs.closeSync(fs.openSync(nojekyll, "w"));
}
ghpages.publish(docRoot, { dotfiles: true }, (e) => {
});

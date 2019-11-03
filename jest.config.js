// no jest config required so far
// module.exports = {
//   preset: "ts-jest",
//   setupFilesAfterEnv: ["jest-extended"],
//   verbose: true,
//   "roots": [
//     "<rootDir>/specs"
//   ],
//   "transform": {
//     "^.+\\.tsx?$": "ts-jest"
//   },
//   "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
//   "moduleFileExtensions": [
//     "ts",
//     "tsx",
//     "js",
//     "jsx",
//     "json",
//     "node"
//   ],
//   "automock": false,
// };
// needs for vue-jest
// vue-template-compiler babel-core babel-plugin-syntax-dynamic-import babel-plugin-dynamic-import-node
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended"],
  verbose: true,
  // roots:["<rootDir>/specs"],
  "moduleFileExtensions": ["js", "json", "vue", "ts", "tsx", "jsx"],
  "transform": {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
    // "^.+\\.[t|j]sx?$": "babel-jest"
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};

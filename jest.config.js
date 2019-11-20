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

module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended"],
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ["TS2531"]
      }
    }
  },
  verbose: true,
  rootDir: ".",
  "moduleFileExtensions": ["js", "json", "vue", "ts", "tsx", "jsx"],
  "transform": {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};

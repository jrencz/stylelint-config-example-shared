const path = require('path');
const dependentPkg = require(path.resolve(process.cwd(), './package.json'));

const isString = value => typeof value === 'string';

const pkgConfigProperty = 'componentPrefix';
const hasPrefixConfig = pkg => 'config' in pkg &&
  pkgConfigProperty in pkg.config;

const isValidPrefixConfig = prefixConfig => isString(prefixConfig) || (
  Array.isArray(prefixConfig) &&
  prefixConfig.every(isString)
);

const getPrefixConfig = pkg => pkg.config[pkgConfigProperty];

const hasValidPrefixConfig = pkg => hasPrefixConfig(pkg) &&
  isValidPrefixConfig(getPrefixConfig(pkg));

/**
 * Finds component prefixes allowed in project as valid in selectors.
 *
 * @param {Object} pkg - read from package.json. Used to find prefix data in.
 *
 * @returns {Array.<string>}
 */
const readPrefixes = pkg => {
  if (hasValidPrefixConfig(pkg)) {
    const prefix = getPrefixConfig(pkg);

    return Array.isArray(prefix) ?
      prefix :
      [prefix];
  }

  return [];
};

module.exports = () => readPrefixes(dependentPkg);

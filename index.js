var CssSelectorParser = require('css-selector-parser').CssSelectorParser;

var parser = new CssSelectorParser();
parser.registerNestingOperators('>', '+', '~');
parser.registerAttrEqualityMods('^', '$', '*', '~');


/**
* parse
*
* @param {String} str
* @param {Function} callback - called when all selectors have been parsed. Passed with err and an array of results
* @api private
*/

function parse(str, callback) {
	var returnArray = [];

	var ast = parser.parse(str);

	if (ast.type === 'ruleSet') {
		parseTree(ast.rule, function(d) {
			returnArray.push(d);
			callback(null, returnArray);
		});
	} else if (ast.type === 'selectors') {
		for (var a = 0; a < ast.selectors.length; a++) {
			parseTree(ast.selectors[a], function(d) {
				returnArray.push(d);

				if(a === ast.selectors.length - 1) {
					callback(null, returnArray);
				}
			});
		}
	}
}


/**
* parseTree
*
* @param {Object} tree
* @param {Function} callback
* @api private
*/

function parseTree(tree, callback) {
	var treeSpecificity = 0;

	parseTreeLimb(tree, onLimbParsed);

	function onLimbParsed(data) {
		treeSpecificity += data.value;

		if(data.tree) {
			parseTreeLimb(data.tree, onLimbParsed);
		} else {
			callback(treeSpecificity);
		}
	}
}


/**
* parseTreeLimb
*
* @param {Object} limb
* @param {Function} callback
* @api private
*/

function parseTreeLimb(limb, callback) {
	var value = 0;

	if (limb.id) {
		value += 100;
	}

	if (limb.classNames) {
		for (var y = 0; y < limb.classNames.length; y++) {
			value += 10;
		}
	}

	if (limb.tagName) {
		value += 1;
	}

	if (limb.pseudos) {
		for (var i = 0; i < limb.pseudos.length; i++) {
			if (isPseudoElement(limb.pseudos[i].name)){
				value += 1;
			} else {
				value += 10;
			}
		}
	}

	if (limb.attrs) {
		for (var x = 0; x < limb.attrs.length; x++) {
			value += 10;
		}
	}

	if (limb.rule) {
		callback({
			value: value,
			tree: limb.rule
		});
	} else {
		callback({
			value: value,
			tree: false
		});
	}
}


/**
* isPseudoElement
*
* @param {String} str
* @return {Boolean}
* @api private
*/

function isPseudoElement(str) {
	if (str === 'before' || str === 'after') {
		return true;
	}
	return false;
}


module.exports = parse;
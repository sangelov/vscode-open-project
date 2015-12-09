'use strict';

import fs = require('fs');
import path = require('path');

var cache: { [bin: string]: string; } = {};

export function getCommandPath(command: string) {
	command = correctCommandName(command);
	if (cache[command]) return cache[command];
	
	if (process.env["PATH"]) {
		var pathparts = process.env["PATH"].split(path.delimiter);
		for (var i = 0; i < pathparts.length; i++) {
			let binpath = path.join(pathparts[i], command);
			if (fs.existsSync(binpath)) {
				cache[command] = binpath;
				return binpath;
			}
		}
	}

	return command;
}

function correctCommandName(binname: string) {
	if (process.platform === 'win32') {
		return binname + ".cmd";
	} 		
	return binname;
}
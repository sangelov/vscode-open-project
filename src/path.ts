"use strict";

import * as vscode from "vscode";
import fs = require("fs");
import path = require("path");

var cache: { [bin: string]: string; } = {};

export function getCodeCommandPath() {
	var command = correctCommandName("code");
	if (cache[command]) return cache[command];

	var codePath = <string>vscode.workspace.getConfiguration("vscode-open-project").get("codePath");
	if (codePath && fs.existsSync(codePath)) {
		cache[command] = codePath;
		return codePath;
	}

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

	return null;
}

export function isCodeCommandAvailable(): boolean {
	var command = correctCommandName("code");
	return getCodeCommandPath() !== null;
}

function correctCommandName(binname: string) {
	if (process.platform === "win32") {
		return binname + ".cmd";
	}
	return binname;
}
"use strict";

import * as vscode from "vscode";
import * as path from "./path";
import * as status from "./status"
import cp = require("child_process");

export const OpenProjectCommandId = "vscode-open-project.openProject";

export function openProject() {
	var projects = vscode.workspace.getConfiguration("vscode-open-project").get("projects");
	var projectNames = Object.getOwnPropertyNames(projects);
	vscode.window.showQuickPick(projectNames).then(launchNewInstance);
}

function launchNewInstance(selected: string) {
	if (selected) {
		var projects = vscode.workspace.getConfiguration("vscode-open-project").get("projects");
		var projectFolder = projects[selected];
		var codeCommand = path.getCodeCommandPath();
		if (codeCommand) {
			cp.execFile(codeCommand, [projectFolder]);
		} else {
			status.showCodeCommandNotFoundMessage();
		}

	}
}

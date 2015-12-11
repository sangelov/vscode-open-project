import * as vscode from 'vscode';
import cp = require('child_process');
import { getCommandPath } from "./path";

export function openProject() {
	var projects = vscode.workspace.getConfiguration("vscode-open-project").get("projects");
	var projectNames = Object.getOwnPropertyNames(projects);
	vscode.window.showQuickPick(projectNames).then(launchNewInstance);
}

function launchNewInstance(selected: string) {
	if (selected) {
		var projects = vscode.workspace.getConfiguration("vscode-open-project").get("projects");
		var projectFolder = projects[selected];
		var codeCommand = getCommandPath("code");
		cp.execFile(codeCommand, [projectFolder]);
	}
}

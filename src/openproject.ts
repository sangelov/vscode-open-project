"use strict";

import * as vscode from "vscode";
import * as path from "./path";
import * as status from "./status"
import cp = require("child_process");

export const OpenProjectCommandId = "vscode-open-project.openProject";
export const ChangeProjectCommandId = "vscode-open-project.changeProject";

export function openProject() {
	selectProject(launchNewInstance);
}

export function changeProject() {
	selectProject(changeCurrentProject);
}

function selectProject(selectedProjectAction: (folder: string) => void) {
	var projects = vscode.workspace.getConfiguration("vscode-open-project").get("projects");
	var projectNames = Object.getOwnPropertyNames(projects);
	vscode.window.showQuickPick(projectNames)
		.then(selected => {
			var projects = vscode.workspace.getConfiguration("vscode-open-project").get("projects");
			var projectFolder = projects[selected];
			if (projectFolder) {
				selectedProjectAction(projectFolder);
			}
		});
}

function changeCurrentProject(selected: string) {
	let uri = vscode.Uri.parse('file:///' + selected);
	vscode.commands.executeCommand('vscode.openFolder', uri);
}

function launchNewInstance(projectFolder: string) {
	var codeCommand = path.getCodeCommandPath();
	if (codeCommand) {
		cp.execFile(codeCommand, [projectFolder]);
	} else {
		status.showCodeCommandNotFoundMessage();
	}
}

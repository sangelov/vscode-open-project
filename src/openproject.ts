"use strict";

import * as vscode from "vscode";
import * as path from "./path";
import * as status from "./status"
import cp = require("child_process");

export const OpenProjectCommandId = "vscode-open-project.openProject";
export const ChangeProjectCommandId = "vscode-open-project.changeProject";
export const ChangeCurrentFolderCommandId = "vscode-open-project.changeCurrentFolder";

export function openProject() {
	selectProject(launchNewInstance);
}

export function changeProject() {
	selectProject(changeCurrentProject);
}

export function changeCurrentFolder() {
	vscode.window.showInputBox({ prompt: "Enter Folder Path",validateInput: checkIfFolderExists}).then(changeCurrentProject);
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
	if (selected) {
		let uri = vscode.Uri.parse('file:///' + selected);
		vscode.commands.executeCommand('vscode.openFolder', uri);
	}
}

function checkIfFolderExists(folderPath: string): string {
	return path.directoryExist(folderPath) ? null : "Folder doesn't exist";
}

function launchNewInstance(projectFolder: string) {
	var codeCommand = path.getCodeCommandPath();
	if (codeCommand) {
		cp.execFile(codeCommand, [projectFolder]);
	} else {
		status.showCodeCommandNotFoundMessage();
	}
}

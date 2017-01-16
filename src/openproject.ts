'use strict';

import * as vscode from 'vscode';
import * as path from './path';
import * as status from './status'
import { allProjects, getConfigPath } from './projects';
import cp = require('child_process');

export const OpenProjectCommandId = 'vscode-open-project.openProject';
export const ChangeProjectCommandId = 'vscode-open-project.changeProject';
export const ChangeCurrentFolderCommandId = 'vscode-open-project.changeCurrentFolder';
export const OpenCurrentFileInNewWindowCommandId = 'vscode-open-project.openCurrentFileInNewWindow';
export const OpenProjectConfigurationCommandId = 'vscode-open-project.openProjectConfiguration';

export function openProject() {
	selectProject(launchNewInstance);
}

export function changeProject() {
	selectProject(changeCurrentProject);
}

export function changeCurrentFolder() {
	vscode.window.showInputBox({ prompt: 'Enter Folder Path', validateInput: checkIfFolderExists }).then(changeCurrentProject);
}

export function openCurrentFileInNewWindow() {
	if (vscode.window.activeTextEditor) {
		launchNewInstance(vscode.window.activeTextEditor.document.fileName);
	} else {
		vscode.window.showInformationMessage('Command failed. There is no active text editor');
	}
}

export function openProjectConfiguration() {
	var configPath = getConfigPath();
	if (configPath) {
		let uri = vscode.Uri.parse('file:///' + configPath);
		vscode.commands.executeCommand('vscode.open', uri);
	} else {
		vscode.commands.executeCommand('workbench.action.openGlobalSettings');
	}
}

function selectProject(selectedProjectAction: (folder: string) => void) {
	var projects = allProjects();
	var projectNames = Object.getOwnPropertyNames(projects);
	vscode.window.showQuickPick(projectNames)
		.then(selected => {
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
	return path.directoryExist(folderPath) ? null : 'Folder doesn\'t exist';
}

function launchNewInstance(filepath: string) {
	var codeCommand = path.getCodeCommandPath();
	if (codeCommand) {
		cp.execFile(codeCommand, [filepath]);
	} else {
		status.showCodeCommandNotFoundMessage();
	}
}

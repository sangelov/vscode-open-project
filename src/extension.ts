'use strict';

import * as vscode from 'vscode';
import * as op from './openproject';
import * as status from './status';

export function activate(context: vscode.ExtensionContext) {
	status.checkCodePath();

	var openProjectCommand = vscode.commands.registerCommand(op.OpenProjectCommandId, op.openProject);
	var changeProjectCommand = vscode.commands.registerCommand(op.ChangeProjectCommandId, op.changeProject);
	var changeCurrentFolderCommand = vscode.commands.registerCommand(op.ChangeCurrentFolderCommandId, op.changeCurrentFolder);
	var openCurrentFileInNewWindow = vscode.commands.registerCommand(op.OpenCurrentFileInNewWindowCommandId, op.openCurrentFileInNewWindow);
	var openConfigurationCommand = vscode.commands.registerCommand(op.OpenProjectConfigurationCommandId, op.openProjectConfiguration);
	var showCodeCommandNotFound = vscode.commands.registerCommand(status.CodeNotFoundCommandId, status.showCodeCommandNotFoundMessage);
	context.subscriptions.push(openProjectCommand, changeProjectCommand, changeCurrentFolderCommand, openCurrentFileInNewWindow, openConfigurationCommand, showCodeCommandNotFound);
}
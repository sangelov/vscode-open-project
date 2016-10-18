"use strict";

import * as vscode from "vscode";
import * as op from "./openproject";
import * as status from "./status";

export function activate(context: vscode.ExtensionContext) {
	status.checkCodePath();

	var openProjectCommand = vscode.commands.registerCommand(op.OpenProjectCommandId, op.openProject);
	var changeProjectCommand = vscode.commands.registerCommand(op.ChangeProjectCommandId, op.changeProject);
	var showCodeCommandNotFound = vscode.commands.registerCommand(status.CodeNotFoundCommandId, status.showCodeCommandNotFoundMessage);
	context.subscriptions.push(openProjectCommand);
}
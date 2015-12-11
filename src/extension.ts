'use strict';

import * as vscode from 'vscode';
import {openProject} from './openproject';

export const OpenProjectCommandId = 'vscode-open-project.openProject'

export function activate(context: vscode.ExtensionContext) {
	var openProjectCommand = vscode.commands.registerCommand(OpenProjectCommandId, openProject);
	context.subscriptions.push(openProjectCommand);
}
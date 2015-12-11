'use strict';

import * as vscode from 'vscode';
import {openProject} from './openproject';

export function activate(context: vscode.ExtensionContext) {
	var openProjectCommand = vscode.commands.registerCommand('vscode-open-project.openProject', openProject);
	context.subscriptions.push(openProjectCommand);
}
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import cp = require('child_process');
import { getCommandPath } from "./path";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-open-project" is now active!'); 

	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('vscode-open-project.openProject', () => {
		var projects = vscode.workspace.getConfiguration("vscode-open-project").get("projects");
		var projectNames = [];
		for (var key in projects) {
			projectNames.push(key);
		}

		vscode.window.showQuickPick(projectNames)
			.then(selected => {
				var codeCommand = getCommandPath("code");
				cp.execFile(codeCommand, [projects[selected]]);
			});
	});

	context.subscriptions.push(disposable);
}
"use strict";

import * as vscode from "vscode";
import * as path from "./path";

const statusBarEntryColor = "yellow";
const statusBarEntryText = "code command not found";

const warningMessageText = "'code' is not found in PATH or set via 'vscode-open-project.codePath' setting in Code. Open Project won't work.";
const warningMessageTooltip = "code command not found";

let statusBarEntry: vscode.StatusBarItem;

export const CodeNotFoundCommandId = "vscode-open-project.codeCommandNotFound";

export function checkCodePath(): void {
	if (!path.isCodeCommandAvailable()) {
		showWarningStatusBarEntry(statusBarEntryText, warningMessageTooltip, CodeNotFoundCommandId)
	}
}

export function showCodeCommandNotFoundMessage(): void {
	vscode.window.showWarningMessage(warningMessageText);
	statusBarEntry.dispose();
}

function showWarningStatusBarEntry(message: string, tooltip: string, command: string) {
	statusBarEntry = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, Number.MIN_VALUE);
	statusBarEntry.text = message;
	statusBarEntry.command = command;
	statusBarEntry.color = statusBarEntryColor;
	statusBarEntry.tooltip = tooltip;
	statusBarEntry.show();
}


import * as assert from 'assert';
import * as vscode from 'vscode';
import * as openProject from '../src/extension';

suite("setup", () => {

	suiteSetup(done => {
		// load the extension
		vscode.commands.getCommands().then(_ => done());
	});
	
	test("Command is added to the context", (done) => {
		vscode.commands.getCommands().then(commands => {
			assert.ok(commands.indexOf(openProject.OpenProjectCommandId) > -1, 'open project command is not registered');
		}).then(done, done);
	});
});
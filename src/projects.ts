import * as vscode from "vscode";
import fs = require('fs');

export function allProjects() {
    var projects = <Object>vscode.workspace.getConfiguration("vscode-open-project").get("projects");

    // clone the settings, otherwise vscode would update its configuration with projects coming from config file
    var projectsClone = {};
    for (var project in projects) {
        if (projects.hasOwnProperty(project)) {
            projectsClone[project] = projects[project];
        }
    }

    var configProjects = allConfigProjects();
    if (configProjects) {
        for (var configProject in configProjects) {
            if (!projectsClone.hasOwnProperty(configProject)) {
                projectsClone[configProject] = configProjects[configProject];
            }
        }
    }
    return projectsClone;
}

export function getConfigPath(): string {
    var config = <string>vscode.workspace.getConfiguration("vscode-open-project").get("config");
    if (config && fs.existsSync(config)) {
        return config;
    }
    return null;
}

function allConfigProjects(): Object {
    var config = <string>vscode.workspace.getConfiguration("vscode-open-project").get("config");
    if (config && fs.existsSync(config)) {
        try {
            var configProjects = JSON.parse(fs.readFileSync(config, 'utf8'));
        }
        catch (е) {
            vscode.window.showErrorMessage("Error parsing vscode-open-project.config file. See your configuration path and the json file");
        }
        if (configProjects && configProjects.projects) {
            return configProjects.projects;
        }
    }
    return null;
}
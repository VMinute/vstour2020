import * as vscode from 'vscode';

export class MonicelliTaskProvider implements vscode.TaskProvider {

    compilercommand: string;

    public constructor(context: vscode.ExtensionContext) {
        var extensionpath = context.extensionPath;

        this.compilercommand = extensionpath + "/compiler/mcc";
    }

    provideTasks(token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
        if ((vscode.workspace.workspaceFolders === undefined) || (vscode.workspace.workspaceFolders.length === 0)) {
            return [];
        }

        var commandline = this.compilercommand + " -o ${fileDirname}/${fileBasenameNoExtension} ${file} ";

        var task = new vscode.Task(
            {
                type: "monicelli",
            },
            vscode.workspace.workspaceFolders[0],
            "monicelli_build",
            "monicelli",
            new vscode.ShellExecution(commandline));

        task.group = vscode.TaskGroup.Build;
        task.problemMatchers = ["gcc"];

        return [task];
    }

    resolveTask(task: vscode.Task, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
        return task;
    }

}
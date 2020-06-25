import * as vscode from 'vscode';
import * as child_process from 'child_process';

// The Monicelli compiler runs on Linux.
// On Windows we need to use WSL and we have to translate the windows paths
// into Linux-compatible ones using the wslpath command
export function translatepath(originalpath: string): string {
    var translatedpath = originalpath;

    if (process.platform === "win32") {
        var result = child_process.execSync("wsl.exe wslpath \"" + originalpath + "\"");

        translatedpath = result.toString().trim();
    }

    return translatedpath;
}


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

        var command: string;

        // the compiler is a Linux exe, so on Windows we use a batch to invoke it inside WSL
        if (process.platform === "win32") {
            command = this.compilercommand + ".bat \"" + this.compilercommand + "\" \"${file}\" \"${fileDirname}/${fileBasenameNoExtension}\"";
        } else {
            command = this.compilercommand + "-o \"${fileDirname}/${fileBasenameNoExtension}\" \"${file}\"";
        }

        var task = new vscode.Task(
            {
                type: "monicelli",
            },
            vscode.workspace.workspaceFolders[0],
            "monicelli_build",
            "monicelli",
            new vscode.ShellExecution(command));

        task.group = vscode.TaskGroup.Build;
        task.problemMatchers = ["gcc"];

        return [task];
    }

    resolveTask(task: vscode.Task, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
        return task;
    }

}
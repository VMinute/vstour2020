// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as numbertowords from 'number-to-words';

// this method will show a simple input box
async function showInputBox() {
    // vscode.window.showInputBox will return undefined if the user does not confirm the value with enter
    var value: string | undefined;

    // simple box with placeholder
    value = await vscode.window.showInputBox({
        prompt: "Plain input box",
        placeHolder: "This is a placeholders, will be replaced by your input"
    });

    // passwords!
    value = await vscode.window.showInputBox({
        prompt: "Password box",
        password: true
    });

    // you can't click away from this one!
    value = await vscode.window.showInputBox({
        prompt: "Can't be dismissed by clicking away",
        ignoreFocusOut: true
    });

    // box with a value and selection
    value = await vscode.window.showInputBox({
        prompt: "We already got a value", value: "The Value",
        valueSelection: [0, 3]
    });
}

// this method will show how to use quick pics
async function showQuickPick() {
    // when using strings undefined is returned when the user made no selection
    var stringvalue: string | undefined;

    // super-simple quick pick with strings
    stringvalue = await vscode.window.showQuickPick(["one", "two", "three"]);

    // using quick pick items and codicon
    // https://microsoft.github.io/vscode-codicons/dist/codicon.html
    var items: vscode.QuickPickItem[] = [
        { label: "database", detail: "$(database) a database" },
        { label: "person", detail: "$(person) a human being" },
        { label: "globe", detail: "a nice $(globe) globe" }];

    // here we get a QuickPickItem or undefined
    var item = await vscode.window.showQuickPick(items, {
        placeHolder: "Select one of the items"
    });
}

async function showMessages() {
    // an information message, it returns the selected string or undefined
    var selection = await vscode.window.showInformationMessage(
        "This is an information message", "Ok", "I don't care");

    // warning, no options
    await vscode.window.showWarningMessage(
        "This is a warning message, and you selected "
        + new String(selection) + " on the previous message");

    // error
    await vscode.window.showErrorMessage(
        "Noooooo! An error!!! A bad error!!! What can we do!!",
        "ignore", "IGNORE but all caps");
}

async function showOutputChannel() {
    var channel = vscode.window.createOutputChannel("Test");

    // show our new channel
    channel.show(true);

    // time to clear our channel
    channel.clear();

    // append some text
    channel.append("This ");
    channel.append("is ");
    channel.append("a message!\n");

    // append line
    channel.appendLine("This is the same thing, but all on a single line \
        and with a single function call!");
}


// we create 1k nodes on 3 levels:
// 0
//  0
//  1
//  ...
//  9
// 1
//  0
// ...
class DummyDataProvider implements vscode.TreeDataProvider<number> {
    onDidChangeTreeData?: vscode.Event<number | void | null | undefined> | undefined;
    getTreeItem(element: number): vscode.TreeItem | Thenable<vscode.TreeItem> {
        var item: vscode.TreeItem = {
            label: element.toString(),
            description: numbertowords.toWords(element),
            command: {
                title: "info",
                command: "ui-demo.showInfo",
                arguments: [element]
            }
        }

        // only the top two levels can be expanded, first one is expanded, 2nd collapsed
        if (element <= 9) {
            item.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
        }
        if (element <= 99) {
            item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        }
        return item;
    }

    getChildren(element?: number | undefined): vscode.ProviderResult<number[]> {
        var base: number;

        if (element === undefined) {
            base = 0;
        }
        else {
            base = element;
        }

        if (base > 99) {
            return [];
        }

        var children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (var i = 0; i < 9; i++) {
            children[i] += base * 10;
        }

        return children;
    }
}

// this function is executed via ui-demo.showInfo command when an element is selected
function showInfo(element: number) {
    vscode.window.showInformationMessage(numbertowords.toOrdinal(element));
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "ui-demo" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand("ui-demo.inputBox", showInputBox));
    context.subscriptions.push(vscode.commands.registerCommand("ui-demo.quickPick", showQuickPick));
    context.subscriptions.push(vscode.commands.registerCommand("ui-demo.messages", showMessages));
    context.subscriptions.push(vscode.commands.registerCommand("ui-demo.outputChannel", showOutputChannel));
    context.subscriptions.push(vscode.commands.registerCommand("ui-demo.showInfo", showInfo));
    vscode.window.registerTreeDataProvider("ui-dummyview", new DummyDataProvider());
}

// this method is called when your extension is deactivated
export function deactivate() { }

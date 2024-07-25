import * as vscode from "vscode";
import fs from "fs";
import createAllFiles from "./utils/createAllFiles";

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        "createFiles.createTemplateFilesWithCode",
        async (uri) => {
            if (uri) {
                const selectedPath = uri.fsPath;
                const componentName = await vscode.window.showInputBox({
                    prompt: "Enter the Component Name (component name also becomes folder name)",
                    placeHolder: "e.g., MyReactComponent",
                    validateInput: (text) => {
                        if (!text.trim()) {
                            return "File name cannot be empty";
                        }
                        return null;
                    },
                });

                if (componentName) {
                    try {
                        const fullPathToCreateFilesIn =
                            selectedPath + `/${componentName}`;

                        if (fs.existsSync(fullPathToCreateFilesIn)) {
                            vscode.window.showInformationMessage(
                                "Component/Path already Exists."
                            );
                        } else {
                            fs.mkdirSync(fullPathToCreateFilesIn);
                            createAllFiles(
                                fullPathToCreateFilesIn,
                                componentName
                            );
                            vscode.window.showInformationMessage(
                                `🪄  Finished creating files. Check folder: ${fullPathToCreateFilesIn}`
                            );
                        }
                    } catch (error: any) {
                        vscode.window.showInformationMessage(error);
                    }
                } else {
                    vscode.window.showInformationMessage(
                        "No file name entered."
                    );
                }
            } else {
                vscode.window.showErrorMessage("No resource selected.");
            }
        }
    );
    context.subscriptions.push(disposable);
}

export function deactivate() {}

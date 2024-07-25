import fs from "fs";

export default function createAllFiles(
    fullPathToCreateFilesIn: string,
    componentName: string
) {
    const componentContent = `import styles from './${componentName}.module.css';
const ${componentName} = () => {
  return <div>${componentName}</div>;
};

export default ${componentName};`;

    const indexContent = `import ${componentName} from "./${componentName}.jsx";

export default ${componentName};
`;

    fs.writeFileSync(
        `${fullPathToCreateFilesIn}/${componentName}.jsx`,
        componentContent
    );
    fs.writeFileSync(`${fullPathToCreateFilesIn}/index.js`, indexContent);
    fs.writeFileSync(
        `${fullPathToCreateFilesIn}/constants.js`,
        "// You put static content in this file."
    );
    fs.writeFileSync(
        `${fullPathToCreateFilesIn}/${componentName}.module.css`,
        "/* Define css styles here */"
    );
    fs.writeFileSync(
        `${fullPathToCreateFilesIn}/helpers.js`,
        "// You can create helper functions in this file."
    );
}

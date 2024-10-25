# CLI工具
[如何开发一个前端CLI脚手架工具，并发布npm，为团队提效](https://juejin.cn/post/7359474677980839988#heading-8)

## 1.使用的工具
1. commander: 通过创建`commander`实例`program` 代表整个命令行程序的根节点
2. inquirer: `inquirer` 提供了一系列的 `prompt` 类型，包括文本输入、列表选择、密码输入等。返回一个`promise`,`data`为用户输入参数
3. chalk: 可以实现好看的日志输出等
4. `fs-extra`是对标准fs模块的扩展，它不仅包含了所有原生fs模块的方法，而且还添加了许多实用的功能，如复制、移动、删除文件/目录等。这些方法都支持Promise，使得我们可以用同步或异步的方式轻松处理文件。

## 2.我想开发一个前端cli工具来实现一个react项目的自动生成模版页面功能,要求通过cli传入的参数来定制页面,例如输入select和input,会自动生成一个页面,页面的filter部分有select和input组件,使用commander,inquirer,fs-extra,chalk来帮我实现这一功能?
你可以按照以下步骤使用 `commander`、`inquirer`、`fs-extra` 和 `chalk` 来实现一个前端 CLI 工具，用于自动生成带有特定组件的 React 页面模版。

### 1. **项目结构**

你可以组织项目如下：

```
/react-cli
  /templates
    /pageTemplate.js
  /bin
    /index.js
  package.json
```

- `/templates/pageTemplate.js`：存放页面模版的文件
- `/bin/index.js`：CLI 的入口文件

### 2. **安装依赖**

在项目目录下执行以下命令来安装依赖：

```bash
npm init -y
npm install commander inquirer fs-extra chalk
```

### 3. **编写模版文件**

在 `/templates/pageTemplate.js` 文件中创建一个简单的页面模版，这里你可以根据需求将组件插入到页面中：

```javascript
module.exports = ({ components }) => `
import React from 'react';

const MyPage = () => {
  return (
    <div>
      <h1>Generated Page</h1>
      <form>
        ${components.map(component => `<${component} />`).join('\n        ')}
      </form>
    </div>
  );
};

export default MyPage;
`;
```

### 4. **创建 CLI 脚本**

在 `/bin/index.js` 文件中实现 CLI 工具：

```javascript
#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// 引入模版
const pageTemplate = require('../templates/pageTemplate');

const program = new Command();

program
  .version('1.0.0')
  .description('A CLI to generate React template pages with custom components');

// 定义 CLI 入口命令
program
  .command('generate')
  .description('Generate a React page with specified components')
  .action(async () => {
    // 询问用户输入
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'components',
        message: 'Select the components you want to include:',
        choices: ['Input', 'Select', 'Button', 'Checkbox'],
      },
      {
        type: 'input',
        name: 'pageName',
        message: 'Enter the name of the page:',
        validate: input => input ? true : 'Page name cannot be empty',
      }
    ]);

    const { components, pageName } = answers;
    
    // 如果没有选择任何组件，提醒用户
    if (components.length === 0) {
      console.log(chalk.red('You must select at least one component.'));
      return;
    }

    // 创建页面文件
    const pagePath = path.join(process.cwd(), `${pageName}.js`);
    const content = pageTemplate({ components });

    try {
      await fs.outputFile(pagePath, content);
      console.log(chalk.green(`Page ${pageName}.js has been created successfully.`));
    } catch (error) {
      console.error(chalk.red('Error creating the page:', error.message));
    }
  });

program.parse(process.argv);
```

### 5. **配置 `package.json`**

在 `package.json` 中添加以下脚本，使 `cli` 可以全局执行：

```json
{
  "name": "react-cli",
  "version": "1.0.0",
  "description": "CLI to generate React template pages",
  "main": "bin/index.js",
  "bin": {
    "react-cli": "./bin/index.js"
  },
  "scripts": {
    "start": "node bin/index.js"
  },
  "dependencies": {
    "chalk": "^4.1.0",
    "commander": "^8.3.0",
    "fs-extra": "^10.0.0",
    "inquirer": "^8.2.0"
  }
}
```

### 6. **使 CLI 可执行**

在项目根目录下执行以下命令，将 CLI 工具全局链接，使其可以在命令行中运行：

```bash
npm link
```

### 7. **运行 CLI 工具**

现在可以使用命令生成页面了：

```bash
react-cli generate
```

CLI 会询问用户需要生成的组件，如选择 `Input` 和 `Select`，它会生成一个 React 页面，其中包含这两个组件。

### 8. **生成的页面示例**

当你选择了 `Input` 和 `Select` 组件时，生成的 `MyPage.js` 文件将会是：

```javascript
import React from 'react';

const MyPage = () => {
  return (
    <div>
      <h1>Generated Page</h1>
      <form>
        <Input />
        <Select />
      </form>
    </div>
  );
};

export default MyPage;
```

### 9. **改进建议**

- 你可以将模版文件抽象得更灵活，允许动态传入更多参数，例如 `label`、`placeholder` 等。
- 根据不同组件类型插入额外的代码逻辑，比如为 `Select` 自动生成一些选项。
- 通过 `fs-extra` 复制完整的项目结构模板，而不仅限于生成单个文件。

这样，你的 CLI 工具就能帮助快速生成 React 项目中的自定义页面模版。

---

## 3.能详细介绍一下如何配置模板页面吗?比如我页面的`<Input />`和`<Select />`等组件是自己基于组件库封装的,我希望通过这个模板生成的这个页面既引入了这些组件,这些组件又有一些默认的props配置,该如何实现?页面又是怎么和inquirer命令关联的?
要实现通过 CLI 工具生成一个定制化的 React 页面，既能够引入自定义封装的组件，又能为这些组件配置默认的 props，我们需要在模版页面中动态生成代码，并通过 `inquirer` 收集用户的需求并传递给模版文件。

以下是详细的实现步骤和解释：

### 1. **自定义封装的组件**

假设你的项目中有一些自定义的封装组件，比如 `<Input />` 和 `<Select />`，并且这些组件都支持一些默认的 props。比如：

```javascript
// src/components/Input.js
import React from 'react';

const Input = ({ placeholder = 'Enter text', value = '', ...rest }) => (
  <input placeholder={placeholder} value={value} {...rest} />
);

export default Input;

// src/components/Select.js
import React from 'react';

const Select = ({ options = [], defaultValue = '', ...rest }) => (
  <select defaultValue={defaultValue} {...rest}>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
```

### 2. **改进模版文件**

我们需要一个模版文件，它可以动态生成页面代码，包括引入自定义的组件并且给这些组件传递一些默认的 props。模版文件会根据 `inquirer` 的用户选择生成适当的代码。

修改后的模版文件 `/templates/pageTemplate.js`：

```javascript
module.exports = ({ components }) => {
  const componentImports = components.map(component => {
    return `import ${component.name} from '${component.importPath}';`;
  }).join('\n');

  const componentUsage = components.map(component => {
    // 动态生成组件的 props 代码
    const propsString = Object.entries(component.props)
      .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
      .join(' ');

    return `<${component.name} ${propsString} />`;
  }).join('\n        ');

  return `
import React from 'react';
${componentImports}

const MyPage = () => {
  return (
    <div>
      <h1>Generated Page</h1>
      <form>
        ${componentUsage}
      </form>
    </div>
  );
};

export default MyPage;
  `;
};
```

在这个模版中，我们根据传递进来的 `components` 数组生成了两个部分：
1. **组件引入 (`componentImports`)**：动态生成 `import` 语句。
2. **组件使用 (`componentUsage`)**：生成每个组件的 JSX 代码，并为它们动态传入默认的 props。

### 3. **通过 `inquirer` 收集用户输入**

我们使用 `inquirer` 收集用户对于组件的选择，并允许他们定制组件的默认 props。然后将这些数据传递给模版文件生成页面。

```javascript
#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// 引入模版
const pageTemplate = require('../templates/pageTemplate');

// CLI 配置
const program = new Command();

program
  .version('1.0.0')
  .description('A CLI to generate React template pages with custom components');

// 定义命令
program
  .command('generate')
  .description('Generate a React page with specified components')
  .action(async () => {
    // 第一步：让用户选择需要的组件
    const { components } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'components',
        message: 'Select the components you want to include:',
        choices: ['Input', 'Select', 'Button', 'Checkbox'],
      }
    ]);

    if (components.length === 0) {
      console.log(chalk.red('You must select at least one component.'));
      return;
    }

    // 第二步：针对每个组件询问一些默认 props
    const componentConfigs = [];
    for (const component of components) {
      let props = {};
      
      switch (component) {
        case 'Input':
          props = await inquirer.prompt([
            {
              type: 'input',
              name: 'placeholder',
              message: 'Enter default placeholder for Input:',
              default: 'Enter text'
            },
            {
              type: 'input',
              name: 'value',
              message: 'Enter default value for Input:',
              default: ''
            }
          ]);
          componentConfigs.push({
            name: 'Input',
            importPath: './components/Input',
            props
          });
          break;

        case 'Select':
          const optionsInput = await inquirer.prompt([
            {
              type: 'input',
              name: 'options',
              message: 'Enter options for Select (comma separated, e.g. "Option1,Option2"):',
              filter: input => input.split(',').map((opt, idx) => ({ label: opt, value: idx }))
            },
            {
              type: 'input',
              name: 'defaultValue',
              message: 'Enter default value for Select:',
              default: '0'
            }
          ]);
          componentConfigs.push({
            name: 'Select',
            importPath: './components/Select',
            props: optionsInput
          });
          break;

        // 其他组件可以类似配置
        default:
          break;
      }
    }

    // 第三步：获取页面名称
    const { pageName } = await inquirer.prompt({
      type: 'input',
      name: 'pageName',
      message: 'Enter the name of the page:',
      validate: input => input ? true : 'Page name cannot be empty',
    });

    // 第四步：生成页面文件
    const pagePath = path.join(process.cwd(), `${pageName}.js`);
    const content = pageTemplate({ components: componentConfigs });

    try {
      await fs.outputFile(pagePath, content);
      console.log(chalk.green(`Page ${pageName}.js has been created successfully.`));
    } catch (error) {
      console.error(chalk.red('Error creating the page:', error.message));
    }
  });

program.parse(process.argv);
```

### 4. **生成的页面示例**

假设用户选择了 `Input` 和 `Select`，并配置了一些默认的 props：

- `Input` 的 `placeholder` 为 `'Enter your name'`
- `Select` 的 `options` 为 `[ {label: 'Option1', value: 0}, {label: 'Option2', value: 1} ]`

生成的页面代码将如下：

```javascript
import React from 'react';
import Input from './components/Input';
import Select from './components/Select';

const MyPage = () => {
  return (
    <div>
      <h1>Generated Page</h1>
      <form>
        <Input placeholder="Enter your name" value="" />
        <Select options={[{"label":"Option1","value":0},{"label":"Option2","value":1}]} defaultValue="0" />
      </form>
    </div>
  );
};

export default MyPage;
```

### 5. **关键点总结**

- **inquirer 与模版关联**：`inquirer` 的每个回答都与模版文件关联，通过组件的名称、引入路径、以及默认的 props 配置将数据传递给模版文件，然后由模版文件生成实际页面代码。
  
- **组件的动态配置**：可以为每个组件动态询问所需的 props，并将其转化为代码。模版文件负责根据这些 props 生成 JSX 代码。

- **可扩展性**：你可以根据需求为每个组件添加更多的默认 props，甚至支持更复杂的组件，比如嵌套组件、动态生成选项等。

这样一来，你的 CLI 工具就能够帮助开发者通过命令行定制页面模版，自动引入自定义封装的组件并为它们配置默认的 props，大大提升了项目中的开发效率。
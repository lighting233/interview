
const path = require('path');
const fs = require('fs');
const babelParser = require('@babel/parser');
const babelGenerator = require('@babel/generator').default;
const babelTraverse = require('@babel/traverse').default;
const babelTypes = require('@babel/types');

const { getType, toUnixPath } = require('./utils.js');

const baseDir = toUnixPath(process.cwd());

function getSource(chunk) {
    return `var modules = {
        ${chunk.modules.map((module, idx) => {
        return `${(idx > 0) ? '\n' : ''}'${module.moduleId}': (module) => {
                    ${module._source}
                }`
    })}
    };
    
    var cache = {};
    
    function require(moduleId) {
        if (cache[moduleId]) return cache[moduleId]
    
        let module = {
            exports: {}
        }
        modules[moduleId](module, module.exports, require)
        cache[moduleId] = module.exports
        return module.exports
    }

    require("${chunk.entryModule.moduleId}");
    `
}

module.exports = class Compilation {
    constructor(webpackOptions) {
        this.webpackOptions = webpackOptions;
        this.modules = [];
        this.chunks = [];
        this.assets = {};
    }
    build(callback) {
        // 5.整理入口文件
        let entry = {};
        if (getType(this.webpackOptions.entry) === 'String') {
            entry.main = this.webpackOptions.entry;
        } else {
            entry = this.webpackOptions.entry;
        }

        for (let chunkName in entry) {
            let chunkEntry = path.join(baseDir, entry[chunkName]);
            // 6.从入口文件开始编译模块
            let entryModule = this.buildModule(chunkName, chunkEntry);

            // 11.根据入口文件模块生成chunk
            let chunk = {
                name: chunkName,
                entryModule,
                modules: this.modules.filter(_ => _.chunkNames.includes(chunkName)),
            };
            this.chunks.push(chunk);

            // 12.根据chunk整理输出资源列表assets
            let filename = this.webpackOptions.output.filename.replace('[name]', chunkName);
            let sourceCode = getSource(chunk);
            this.assets[filename] = {
                source() {
                    return sourceCode
                },
                size() {
                    return sourceCode.length
                }
            };

        }

        callback({
            modules: this.modules,
            chunks: this.chunks,
            assets: this.assets,
        });
    }

    buildModule(chunkName, modulePath) {
        let moduleId = toUnixPath(path.relative(baseDir, modulePath));

        // 检查是否已经编译过此module
        let exitModule = this.modules.find(_ => _.moduleId === moduleId);
        if (exitModule) {
            if (!exitModule.chunkNames.includes(chunkName)) exitModule.chunkNames.push(chunkName);
            return exitModule;
        }

        // 创建新的module
        let module = {
            moduleId,
            chunkNames: [chunkName],
            dependencies: [],
            _source: '',
        };

        let sourceCode = fs.readFileSync(modulePath, 'utf-8');

        // 7.找到匹配的loader进行编译
        let rules, loaders = [];
        try {
            rules = this.webpackOptions.module.rules;
        } catch {
            rules = [];
        }

        for (let rule of rules) {
            if (rule.test.test(modulePath)) loaders.push(...rule.use);
        }
        loaders = loaders.reverse();

        let loaderContext = {
            hasChange: false,
            callback(err, content, map, meta) {
                this.hasChange = true
                sourceCode = content
            },
        };
        for (let loader of loaders) {
            loader = require(path.join(baseDir, loader));
            let res = loader.call(loaderContext, sourceCode);
            if (loaderContext.hasChange) {
                loaderContext.hasChange = false;
                continue;
            } else {
                sourceCode = res;
            }
        }

        // 8.抽象语法树操作，收集该模块所依赖的模块，把其中的依赖模块相对路径解析
        let ast = babelParser.parse(sourceCode, {});

        babelTraverse(ast, {
            CallExpression(nodePath) {
                if (!(nodePath.node.callee.name === 'require')) return;
                let depModulePath = path.join(path.dirname(modulePath), nodePath.node.arguments[0].value);
                let depModuleId = toUnixPath(path.relative(baseDir, depModulePath));
                nodePath.node.arguments = [babelTypes.StringLiteral(depModuleId)];
                module.dependencies.push({ depModuleId, depModulePath });
            }
        })

        // 9.抽象语法树生成回源代码
        let { code } = babelGenerator(ast);
        module._source = code;

        this.modules.push(module);
        // 10.对依赖模块进行编译
        module.dependencies.forEach(({ depModuleId, depModulePath }) => {
            this.buildModule(chunkName, depModulePath);
        });

        return module;
    }
}
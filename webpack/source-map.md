# source-map
Webpack 的 `source-map` 配置用于在打包后的代码与源代码之间建立映射关系，从而帮助调试。这些映射文件可以让开发者在浏览器的开发者工具中查看原始的源码，即使在生产环境中代码已经被压缩和混淆。Webpack 提供了多种 `source-map` 选项，每种都有不同的性能和质量权衡。

## 最佳实践
- **线上**的时候当然要启用 hidden，不关联 sourcemap，但要生成 sourcemap，不大需要 module 来映射回最初的源码，所以可能是 `hidden-source-map` 这种。

- **开发**的时候可以用 eval 的方式，这样是每个模块单独做映射，不用从 bundle.js 开始映射，然后 cheap 也可以开启，只映射到源码的某一行，提升生成速度，一般需要 module 来映射回最初的源码，所以可能是 `eval-cheap-module-source-map` 这种。



### 1. `devtool` 配置选项

Webpack 通过 `devtool` 配置项来控制 `source-map` 的生成方式。以下是一些常用的 `devtool` 配置及其特性：

- **`none` 或 `false`**:
  - 不生成 `source-map`。通常用于生产环境以提高性能。

- **`eval`**:
  - 每个模块使用 `eval()` 包裹，并在行末添加 `//@ sourceURL`，快速重编译，但生成的 `source-map` 不准确。

- **`source-map`**:
  - 生成完整且独立的 `source-map` 文件（`.map`），提供最高质量的映射关系。性能较低，适合生产环境但可能暴露源码。(**生产环境独立部署**)

- **`inline-source-map`**:
  - 将 `source-map` 作为 DataURL 内联到打包后的文件中。适用于开发环境，打包速度较慢，文件体积较大。

- **`cheap-source-map`**:
  - 生成较粗糙的 `source-map`，不包含列信息，只映射行。性能较高，但映射精度较低。

- **`cheap-module-source-map`**:
  - 类似于 `cheap-source-map`，但包括 loader 的 `source-map`。对 loader 生成的代码映射更好。

- **`eval-source-map`**:
  - 将 `source-map` 以 DataURL 内联到打包后的文件中，每个模块使用 `eval()` 包裹。重编译速度快，适合开发环境。

- **`cheap-eval-source-map`**:
  - 结合 `eval` 和 `cheap-source-map`。快速重编译，生成粗糙的 `source-map`。

- **`hidden-source-map`**:
  - 生成完整的 `source-map` 文件，但不会在打包后的文件中添加 `sourceMappingURL` 注释。适用于生产环境，不会暴露源文件路径。

- **`nosources-source-map`**:
  - 生成 `source-map`，但不包含源代码，仅提供错误栈信息。

### 2. 配置示例

在 Webpack 配置中设置 `devtool`：

```javascript
module.exports = {
  // ...
  devtool: 'source-map', // 选择适合你的环境的 source-map 配置
  // ...
};
```

### 3. 如何选择 `source-map` 配置

- **开发环境**:
  - `eval-source-map`: 提供完整的 `source-map` 并且重编译速度快。
  - `cheap-module-eval-source-map`: 更快的重编译速度，稍微牺牲了映射精度。

- **生产环境**:
  - `source-map`: 提供最完整的 `source-map`，适合在生产环境中调试错误。
  - `hidden-source-map`: 避免暴露源文件路径，仅在错误报告中使用。
  - `nosources-source-map`: 提供错误栈信息，但不暴露源代码。

### 4. 使用 `source-map` 的注意事项

- **性能**: `source-map` 生成过程可能会增加构建时间，尤其是较高质量的 `source-map`（如 `source-map` 和 `cheap-module-source-map`）。
- **安全**: 在生产环境中使用 `source-map` 时，应注意不要暴露敏感的源码信息。可以使用 `hidden-source-map` 或 `nosources-source-map` 来避免这一问题。
- **错误调试**: `source-map` 让你可以在浏览器中看到原始的代码行号，这对于调试和错误追踪非常有帮助。

### 总结

Webpack 提供了多种 `source-map` 配置选项，以平衡调试的便利性和构建性能。选择合适的 `source-map` 配置取决于项目的开发阶段（开发或生产）以及对调试精度和性能的需求。
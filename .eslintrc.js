/**
 * 题库组 ESLint 规则 - React
 *
 * 包含所有 ESLint 规则，以及所有 eslint-plugin-react 规则
 * 使用 babel-eslint 作为解析器
 *
 * @fixable 表示此配置支持 --fix
 * @off 表示此配置被关闭了，并且后面说明了关闭的原因
 */

module.exports = {
  extends: 'eslint-config-alloy/react',
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    //
    // 一个缩进必须用两个空格替代
    "indent": [
        true,
        "spaces",
        2
    ],
    "member-ordering": false,
    "arrow-parens":  [true, "ban-single-arg-parens"]
  }
};

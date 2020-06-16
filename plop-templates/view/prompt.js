module.exports = {
  description: '视图组件',
  prompts: [
    {
      type: 'input',
      name: 'dirName',
      message: '组件的母文件, 如dataManager'
    },
    {
      type: 'input',
      name: 'name',
      message: '组件的名字, 如MyApp',
      validate: function (value) {
        if ((/([A-Z][a-z]+)+/).test(value)) {
          return true
        }
        return '组件名称必须为驼峰形式'
      }
    }],
  actions: [
    /**
     * TemplateComponent.js
     */
    {
      type: 'add',
      path: 'src/views/{{dirName}}/{{name}}/index.js',
      templateFile: './plop-templates/view/TemplateComponent.js'
    },
    {
      type: 'modify',
      path: 'src/views/{{dirName}}/{{name}}/index.js',
      pattern: /TemplateComponent/g,
      template: '{{name}}'
    },
    {
      type: 'modify',
      path: 'src/views/{{dirName}}/{{name}}/index.js',
      pattern: /template-component/g,
      template: '{{dashCase name}}'
    },
    /**
     * template-component.scss and css
     */
    {
      type: 'add',
      path: 'src/views/{{dirName}}/{{name}}/{{name}}.less',
      templateFile: './plop-templates/view/templateComponent.less'
    },
    {
      type: 'modify',
      path: 'src/views/{{dirName}}/{{name}}/{{name}}.less',
      pattern: /TemplateComponent/g,
      template: '{{name}}'
    },
    {
      type: 'modify',
      path: 'src/views/{{dirName}}/{{name}}/{{name}}.less',
      pattern: /template-component/g,
      template: '{{dashCase name}}'
    }
  ]
}

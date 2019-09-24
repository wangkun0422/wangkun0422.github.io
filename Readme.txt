gulp和grunt都是nodejs中常用的自动化工具（将一系列任务定义为脚本，按序执行）！

它主要使用nodejs中的Transform Stream转换流技术实现的！

它的安装需要两部分：
1、项目依赖（任务定义需要组件提供的api）
npm init -y
npm i gulp --save-dev（-D）

2、全局工具（通过cli工具执行自动化脚本）
npm i gulp-cli -g

gulp -v

------------------------------------------------------------------------------------------------------

定义自动化脚本：
1、创建一个gulpfile.js文件（注意：一定要是这个文件名字，因为gulp工具就是去查找当前路径下的该文件！！！）

2、在当前gulpfile.js文件中，导入开发依赖的组件gulp
let gulp = require("gulp");

3、自定义任务
gulp.task("hello", function() {
    console.log("Hello :)");
});

4、使用gulp-cli工具执行gulpfile.js（不是用node！）
gulp hello（hello是任务名称）
gulp（默认执行default任务）

5、指定一些任务按序执行！
gulp.task("somejobs", gulp.series("hi", "hello"));









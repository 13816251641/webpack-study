//这是项目的入口js文件

//1.导入Jquery
//import *** from *** 是es6中导入模块的方式
//由于ES6的代码太高级了,浏览器解析不了所以这一行会报错
import $ from "jquery";

//使用import语法导入css样式表,写成css/index.css还报错,不知道原因
import "./css/index.css";
import "./css/index.less"
import "./css/index.scss"
//注意:webpack默认只能打包处理js类型的文件,无法处理其他非js类型的文件;
//如果要处理非js类型的文件,我们需要手动安装一些合适的第三方loader加载器
//1.如果想要打包处理css文件,需要安装npm i style-loader css-loader -D
//2.打开webpack.config.js这个配置文件,在里面新增一个配置节点叫做module,它是一个对象;
//在这个module对象身上,有个rules属性,这个rules属性是个数组;这个数组中存放了所有第三方
//文件的匹配和处理规则

//注意:webpack处理第三方文件类型的过程:
//1.发现这个要处理的文件不是js文件,然后就去配置文件中查找有没有对应的第三方loader规则
//2.如果能找到对应的规则,就会调用对应的loader处理这种文件类型
//3.在调用loader的时候是从后往前调用的
//4.在最后的一个loader调用完毕会把处理的结果直接交给webpack进行打包合并,最终输出到bundle.js中去

$(function () {
    $("li:odd").css("backgroundColor","yellow");
    $("li:even").css("backgroundColor",function () {
        return "#"+"D97634";
    });
})

/*
    1.webpack能让我们在js文件中引入别的js,所以一个网站只要有一个main.js中即可(理想状态)
    2.webpack能够处理js的兼容问题,把高级的,浏览器不识别的语法,转为低级的浏览器能正常识别的语法
    刚才运行的命令格式:webpack 要打包的文件的路径 输出文件的路径
 */


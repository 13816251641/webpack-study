const path = require("path");//nodejs中对路径的操作
/*
    导入在内存中生成html页面的插件
    只要是插件就一定要放到plugins节点中去
    这个插件的两个作用:
        1.自动在内存中根据指定页面生成一个内存的页面
        2.自动把打包好的bundle.js追加到页面中去
 */
const htmlWebpackPlugin = require("html-webpack-plugin");
//启动热更新的第一步
const webpack = require("webpack");
//这个配置文件,其实就是一个js文件,通过node中的模块操作,向外暴露了一个配置对象
module.exports={
    entry:path.join(__dirname,"./src/main.js"),//入口,表示要使用webpack打包哪个文件
    output:{
        path:path.join(__dirname,"./dist"),//指定打包好的文件输出到哪个目录中去
        filename:"bundle.js"//这是指定输出文件的名称
    },
    /*
        这是配置dev-server命令参数的第二种形式,相对来说这种方式麻烦一些
        --open --port 9000 --contentBase src --hot
        相比起上面的写法下面是它的补充,上面的优先级较高,然后再拼接下面的
        --contentBase src 个人认为是将服务器 /=>src/
     */
    devServer: {
        open:true,
        port:3000,
        //contentBase:"src",
        hot:true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//new一个热更新的模块对象,启动热更新的第二步
        new htmlWebpackPlugin({ //创建在一个内存中生成html页面的插件
            template:path.join(__dirname,"./src/index.html"),//指定模板页面,将来会根据指定的页面路径去生成内存中的页面
            filename:"index.html"//指定生成页面的名称,它会生成到/路径下
        })
    ],
    module: { //这个节点用于配置所有第三方
        rules: [ //所有第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']}, //配置处理.css文件的第三方loader规则
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//配置处理.less文件的第三方loader规则
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}//配置处理.scss文件的第三方规则
        ]
    }
}

/*
    当我们在控制台直接输入webpack命令执行的时候,webpack做了以下几步:
    1.首先webpack发现,我们并没有通过命令的形式,给它指定入口和出口
    2.webpack就会去项目的根目录中,查找一个叫做'webpack.config.js'的配置文件
    3.当找到配置文件后,webpack会去解析这个配置文件,当解析执行完成配置文件后,就得到了配置文件中导出的配置对象
    4.当webpack拿到配置对象后,就拿到了配置对象中指定的入口和出口然后进行打包构建
 */

/*
    使用webpack-dev-server这个工具来实现自动打包编译的功能
    1.运行npm i webpack-dev-server@2.9.3 -D把这个工具安装到项目的本地开发以来
    2.安装完毕后这个工具的用法和webpack命令的用法完全一样
    3.由于我们是在项目中本地安装的webpack-dev-server,所以无法把它当做脚本命令,在
    powershell终端中直接运行;(只有那些安装到全局-g的工具才能在终端中正常执行)
    4.注意:webpack-dev-server这个工具如果想要正常运行,要求在本地目录中必须安装webpack
    5.注意:webpack-dev-server帮我们打包生成的bundle.js文件,并没有存放到实际的物理磁盘上;而是
    直接托管到了电脑的的内存中。所以我们在项目根目录中根本找不到这个打包好的bundle.js;
    6.我们可以认为,webpack-dev-server把打包好的文件以一种虚拟的形式托管到了咱们项目的根目录中,
    虽然我们看不到它但是可以认为和dist src node_module平级,有一种看不见的文件叫做bundle.js
 */
# 技术论坛系统

## 1.介绍

> 本系统目标用户为各软件编程技术爱好者们，你可以仅仅作为游客浏览其他用户的发言，你也可以注册帐号来加入他们的讨论，甚至你可以申请成为版主来协助管理员进行管理。最后，务必要谨言慎行，管理员有权对你的违规行为作封号处理

## 2.系统架构说明

> 本系统采用当今流行的前后端分离技术进行开发,前端采用react框架,采用有状态组件系列进行编写,使用node.js进行项目管理,使用axios与后端进行交互。后端使用Springboot+SpringMVC+spring Data JPA进行开发,采用gradle进行项目管理,数据库使用的是mysql数据库,同时也需要使用redis数据库。

## 3.后端项目简介及运行步骤

> 我们将后端项目拆分成了3个子工程,technical_forum_utils,technical_forum_web,technical_forum_service。service子工程依赖utils子过程,web子工程依赖service子工程,形成良好的单向依赖。utils工程放置一些通用的工具类,service工程放置业务逻辑以及持久层相关的代码,web工程放置一些与web相关代码及配置。

运行步骤:

> 1.在technical_forum_web/src/main/resources目录下找到application.yml配置连接数据库以及redis数据库相关信息
>
> 2.运行technical_forum_web/src/main/java/jee/sanda/forum/boot/TechnicalForumApplication.java,启动后端服务即可
>
> 3.可访问[http://localhost:8000/forum/swagger-ui.html](http://localhost:8000/forum/swagger-ui.html#/) 查看所有接口信息

## 4.前端项目简介及运行步骤

> 前端项目多由react的组件构成。src目录下的index.js为页面主入口。在此加载了主路由表,App.jsx文件中,对前端项目的所有主路由进行了管理。js文件夹中的axios-default.js定义了axios的通用配置,components中定义大量组件,home文件夹下多为主页中渲染的组件,其中HomeRouter.jsx定义了主页中的子路由配置,utils文件下为一些通用工具组件,Layout文件夹中定义了一些我们自己封装的样式组件,authentication文件夹中定义了用户认证,注册,登录等相关功能的组件

运行步骤:

>1.首先确保你的电脑上安装了node.js
>导入后端项目文件（technical_forum_backend）等待gradle包导入完毕后运行启动类（TechnicalForumApplication）
>使用vscode软件导入前端项目文件（technical_forum_frontend）,打开调试终端并且输入以下命令
```
 npm install
```

>2.安装完毕后,输入命令
```
 npm start
```
>此时项目成功运行,祝你使用愉快！

## 结尾
>本项目由于时间紧凑,且主要用于学习,可能会有些bug及不足点。此为我们开发的第一个版本,今后可能会对代码进行优化以及功能的升级。
>
>如遇到问题请联系开发者
>本项目作者：
>
>吴霄    	825612027@qq.com
>
>帅正宇	1971730142@qq.com
>
>​蔡圣晔	992945919@qq.com
#生产环境部署脚本
###
 # @Description: 
 # @Author: 曹俊
 # @Date: 2022-09-17 15:53:07
 # @LastEditors: 曹俊
 # @LastEditTime: 2022-09-17 16:59:33
### 

#先构建项目，生成dist目录
pnpm build

#cd到构建的目录下
cd dist

#部署到自定义域名
scp -r * root@119.91.120.237:/www/server/phpmyadmin/music

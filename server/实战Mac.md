# 实战Mac
## Brew安装
## 安装Homebrew
https://brew.sh/
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 配置国内镜像
```bash
# 替换brew.git:
$ cd "$(brew --repo)"
# 中国科大:
$ git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
# 清华大学:
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
 
# 替换homebrew-core.git:
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
# 中国科大:
$ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
# 清华大学:
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
 
# 替换homebrew-bottles:
# 中国科大:
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile
# 清华大学:
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile

# 应用生效:
brew update
```

## 确定brew健康状况
```bash
# 确认brew在正常工作
brew doctor
# update更新包
brew 
```

# Mysql
## 安装
```bash
## 安装mysql
brew install mysql 
```
## 开启服务
```bash
brew services start mysql
```

## 设置用户名密码
设置简单密码规则
```bash
mysql -uroot

# 允许简单密码
set global validate_password.policy=0;
set global validate_password.length=1;

# 修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'example';
```

## 验证
```bash
mysql -uroot -pexample
```










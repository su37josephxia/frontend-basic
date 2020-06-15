# Git学习笔记
## 参考资料
[廖雪峰Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)

## Git使用
### 本地版本

### 版本日志
```bash
git log
git log –-oneline # 简短日志
```

### 回退reset和revert
reset与revert区别
> - reset 相当于修改HEAD的指向
> - revert 相当于回滚并提交一个正式版本
>
> 在回滚这一操作上看，效果差不多。但是在日后继续merge以前的老版本时有区别。因为git revert是用一次逆向的commit“中和”之前的提交，因此日后合并老的branch时，导致这部分改变不会再次出现，但是git reset是之间把某些commit在某个branch上删除，因而和老的branch再次merge时，这些被回滚的commit应该还会被引入。
> git reset 是把HEAD向后移动了一下，而git revert是HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容


#### reset
> soft 与 hard
> - soft 这该条commit号之 后（时间作为参考点）的所有commit的修改都会退回到git缓冲区中。
> - hard 则缓冲区中不会存储这些修改，git会直接丢弃这部分内容。

```bash
# 回退上一版本
git reset --hard HEAD~1
git reset --hard HEAD^
# 回退到某个commitid
git reset --hard ’commit_id‘

```


### 合并多个提交记录



### 忽略文件


### 分支管理

### 远程仓库
#### 远程版本回退
```bash
git push origin HEAD --force
```
### 回退远程版本为上一个版本
```bash
git reset --hard HEAD~1
git push --force
```


### GitHooks


## GitHub使用
### Fork代码 
### 提出PR
### 在线Review代码




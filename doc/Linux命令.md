# Linux基础

[TOC]
 
### 公钥信任

```bash
# 生成公钥
ssh-keygen -t rsa -P ''

xubin@xubindeMBP:~$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/xubin/.ssh/id_rsa):
/Users/xubin/.ssh/id_rsa already exists.
Overwrite (y/n)? yes
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/xubin/.ssh/id_rsa.
Your public key has been saved in /Users/xubin/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:IeFPfrcQ3hhP64SRTAFzGIHl2ROcopl5HotRi2XNOGk xubin@xubindeMBP
The key's randomart image is:
+---[RSA 2048]----+
|      .o*@=o     |
|     ..oEB=o     |
|      o@=+O .    |
|      B=+o @ .   |
|       =So* *    |
|      . o. = .   |
|            o    |
|                 |
|                 |
+----[SHA256]-----+

# 查看公钥
cat .ssh/id_rsa.pub 

# 将公钥拷贝到服务器
scp ~/.ssh/id_rsa.pub root@47.98.252.XXX:/root

# 将公钥加入信任列表
cat id_dsa.pub >> ~/.ssh/authorized_keys

```
<!-- <video controls="controls">
    <source src="../assets/ScreenFlow.mp4" type="video/mp4" />
        Your browser does not support the video tag.
</video> -->


<a href="https://scrimba.com/c/cndQdvsp">abc</a>

### SSH登录

```bash
# root 为用户名
# ip地址
ssh root@47.98.252.XXX
```

### 目录操作

```bash
# 查看目录
pwd

# 改变当前目录
cd [directory_name]

# 列出当前目录的文件和子目录
ls

ls -a     列出所有目录、子目录、文件和隐藏文件

ls -R    列出从当前目录开始的所有的子目录、文件并且一层层往下显示

ls -F     列出文件、目录名并显示出文件类型

ls -t     以修改时间为时间倒序来列出文件、子目录

ls -l      以长列表格式显示文件、目录的详细信息
```

### 文本操作

```bash
# 查看操作
cat xxx

# 动态查看信息
tail -f xxx.log

```

vi 编辑内容

>  https://www.w3cschool.cn/vim/cjtr1pu3.html

### 系统信息查看

```bash
# 磁盘容量
df -h

# 系统配置
cat /proc/cpuinfo 

# 发行版本
lsb_release -a

```

### 系统进程

```bash
# 列出系统中当前运行的那些进程
ps
-a 显示同一终端下的所有程序
-A 显示所有进程
c  显示进程的真实名称
-N 反向选择
-e 等于“-A”
e  显示环境变量
f  显示程序间的关系
-H 显示树状结构
r  显示当前终端的进程
T  显示当前终端的所有程序
u  指定用户的所有进程
-au 显示较详细的资讯
-aux 显示所有包含其他使用者的行程 

# 动态查看进程变化，监控linux的系统状况
top 
# top 运行中可以通过 top 的内部命令对进程的显示方式进行控制。内部命令如下：
s – 改变画面更新频率
l – 关闭或开启第一部分第一行 top 信息的表示
t – 关闭或开启第一部分第二行 Tasks 和第三行 Cpus 信息的表示
m – 关闭或开启第一部分第四行 Mem 和 第五行 Swap 信息的表示
N – 以 PID 的大小的顺序排列表示进程列表
P – 以 CPU 占用率大小的顺序排列进程列表
M – 以内存占用率大小的顺序排列进程列表
h – 显示帮助
n – 设置在进程列表所显示进程的数量
q – 退出 top
s – 改变画面更新周期

# 杀死进程
kill
-l  信号，若果不加信号的编号参数，则使用“-l”参数会列出全部的信号名称
-a  当处理当前进程时，不限制命令名和进程号的对应关系
-p  指定kill 命令只打印相关进程的进程号，而不发送任何信号
-s  指定发送信号
-u  指定用户 

# 先用ps查找进程，然后用kill杀掉
ps -ef|grep vim 

```

### 网络状况

```bash
# 监控TCP/IP网络
netstat
# 列出所有端口情况
[root@xiesshavip002 ~]# netstat -a      # 列出所有端口
[root@xiesshavip002 ~]# netstat -at     # 列出所有TCP端口
[root@xiesshavip002 ~]# netstat -au     # 列出所有UDP端口

# 列出所有处于监听状态的Sockets
[root@xiesshavip002 ~]# netstat -l   # 只显示监听端口
[root@xiesshavip002 ~]# netstat -lt  # 显示监听TCP端口
[root@xiesshavip002 ~]# netstat -lu  # 显示监听UDP端口
[root@xiesshavip002 ~]# netstat -lx  # 显示监听UNIX端口

# 显示 PID 和进程名称
[root@xiesshavip002 ~]# netstat -p

# 显示核心路由信息
[root@xiesshavip002 ~]# netstat -r
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
default         gateway         0.0.0.0         UG        0 0          0 eth0
192.168.130.0   0.0.0.0         255.255.255.0   U         0 0          0 eth0
[root@xiesshavip002 ~]# netstat -rn   # 显示数字格式，不查询主机名称
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.130.1   0.0.0.0         UG        0 0          0 eth0
192.168.130.0   0.0.0.0         255.255.255.0   U         0 0          0 eth0

# 查看端口和服务
[root@xiesshavip002 ~]# netstat -antp | grep ssh
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      734/sshd            
tcp        0     52 192.168.130.20:22       119.129.118.189:58737   ESTABLISHED 1846/sshd: root@pts 
tcp6       0      0 :::22                   :::*                    LISTEN      734/sshd            
[root@xiesshavip002 ~]# netstat -antp | grep 22
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      734/sshd            
tcp        0     52 192.168.130.20:22       119.129.118.189:58737   ESTABLISHED 1846/sshd: root@pts 
tcp6       0      0 :::22                   :::*                    LISTEN      734/sshd            
[root@xiesshavip002 ~]#

# 网络抓包工具
tcpdump -nn -i eth0 icmp


```

### 系统服务管理器

```bash
systemctl (待完成)

# 显示 系统状态:
systemctl status

# 
systemctl enable
```




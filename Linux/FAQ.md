
# FAQ

## ssh login without password

Copy local public key to remote machine.

``` shell
ssh-copy-id -i id_rsa.pub uec1szh@SGHZ001036195
```

## Shell Parameter Expansion

### ${param:-${XXX}}

检查param是否为空，如果是，则使用备选的XXX

``` shell
#A="aaabbbccc"
B="bd"
C=${A:-${B}}
echo $A, $B, $C

A="aaabbbccc"
B="bd"
C=${A:-${B}}
echo $A, $B, $C
```

结果为

```shell
, bd, bd
aaabbbccc, bd, aaabbbccc
```

[GNU doc](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

## shell script `set -xue`

这些开关可以显式地写在脚本顶端，也可以在调用shell脚本时作为参数传入：

``` shell
sh -xeu xxx.sh
```

- `set -u`
检查是否有变量未定义`undefined`，如果有未定义，则终止脚本执行。
这个选项很有用，特别是当脚本里使用了`rm -rf`时可以避免意外的删除。

``` shell
#!/bin/bash

set -u
echo $AAA
```

- `set -e`
脚本运行有错误error时，终止执行。相当于开启了断点。
不使用它的时候，shell默认会继续执行后续语句。

``` shell
#!/bin/bash

set -ue

echo $AAA
echo helloworld!
```

- `set -x`
展开eXpand显示变量的内容

## Using Docker with Rootless Mode

1.Add docker group to system (if non-existed)

``` shell
sudo groupadd docker
```

2.Adding user uec1szh to group docker

``` shell
sudo gpasswd -a $USER docker
```

3.change group or logout to change to the new group

``` shell
newgrp docker
```

NOTE:
For lower version ubuntu (< `21.04`), still need to change socker file attribute.

``` shell
sudo chown root:docker /var/run/docker.sock
sudo chown -R root:docker /var/run/docker
```

4.(Optional) logout

``` shell
sudo pkill -u $USER
```

## logout via remote ssh

``` shell
sudo pkill -u $USER
```

## Cannot change default shell - user 'xxx' does not exist in /etc/passwd

The system is using distributed authentication (`Kerberos`), so user account doesn't appear in local `/etc/passwd`.

``` shell
xxx@xxx:~$ chsh
Password:
Changing the login shell for uec1szh
Enter the new value, or press ENTER for the default
        Login Shell [/bin/bash]:
chsh: user 'uec1szh' does not exist in /etc/passwd
```

However user account can be retrieved via:

``` shell
getent passwd $USER
```

output:

``` shell
xxx@host:~$ getent passwd $USER
xxx:*:1420530021:1420530021:xxx xxx (department/XXX):/home/xxx:/bin/bash
```

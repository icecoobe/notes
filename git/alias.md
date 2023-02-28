# alias

使用了`oh-my-zsh`之后，内置的git插件已经添加了常用的别名。
本文列举自用的别名和常用的命令组合。

- `glog`: `git log --oneline --decorate --graph`

## 本地添加子模块

``` shell
git submodule add https://github.com/chaconinc/DbConnector [optional:其他文件夹名]
```

默认会使用子仓库的名称在本地创建子文件夹，也可以在url后面添加空格指定新的名称。

## clone同时将所有子模块配置并拉取到本地

``` shell
git clone --recurse-submodules https://github.com/chaconinc/MainProject
```

## 子模块在本地注册配置同时递归更新

``` shell
git submodule update --init --recursive
```

-----------------------------------------------------------

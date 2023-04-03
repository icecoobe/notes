# Best practices of shell script

## Tools

- [Shellcheck][1] is a great plugin for checking scripts.

也可以在terminal中使用该工具。

``` shell
sudo apt install -y shellcheck
shellcheck xx.sh
```

- [explainshell.com][2]
- [Google Shell Style Guide][3]
- [Bash Best Practise][4]

## Enable debugging, tracing

- 调用shell脚本时传入选项参数

``` shell
bash -x -e -u s.sh
```

这个好处是shell脚本内部不需要做设置。

- 在脚本顶部添加选项设置，也可以在脚本最后去掉这个配置

``` shell
#!/bin/bash
set -x -e -u
# ...
set +x +e +u
```

## Rules

1. 多写注释。
2. 环境变量(`export`)使用大写`UPPERCASE`，自定义变量使用小写`lowercase`
3. 将通用的接口或者全局的变量定义单独拆分出来，放到项目的公共文件夹以供复用。
4. 使用`$(cmd <args>)`代替传统的\`cmd \<args\>\`
5. 使用双引号将字符串变量包裹，防止变量实际内容包含空格导致的截断
6. 常量或者不希望修改的变量，使用`readonly`来确保
7. 使用local变量拷贝处理外部变量和传入的参数
8. 在文件末尾将不需要传递给外部的变量删除`unset VAR`
9. 变量的使用全部采用`${VAR}`的形式
10. 变量的使用全部采用双引号包裹，也就是`"${VAR}"`
11. 采用命令的长名称选项，这样增加可读性
12. 统一采用#!/usr/bin/env bash作为第一行
13. 虽然用点号更通用，不过source更直观

``` shell
#!/usr/bin/env bash
#
# ==============================================================================
#  @copyright (c) 2023 by XXXX. All rights reserved.
#
#  The reproduction, distribution and utilization of this file as
#  well as the communication of its contents to others without express
#  authorization is prohibited. Offenders will be held liable for the
#  payment of damages and can be prosecuted. All rights reserved particularly
#  in the event of the grant of a patent, utility model or design.
# ==============================================================================

# options (must-have, not rely on argument-passing)
set -e

# import external scripts
source "$(dirname "$0")"/lib/util.sh arg-1 arg-2

now=$(date +'%Y-%m-%d %H:%M:%S')
echo "$name"
readonly version="1.2.3"

#######################################
# test XXXX
# Globals:
#   $name
# Arguments:
#   exptect 3 params
# Outputs:
#   Writes updated info to stdout
#######################################
function test()
{
    local first_arg="${1}"
    local second_arg="${2}"
    local _3rd_arg="${3}"
    local _name="Allen ""$name"

    echo "$_name"
    echo "1st arg: $first_arg"
    echo "2nd arg: $second_arg"
    echo "3rd arg: $_3rd_arg"
}

test 1 3 "hello" "sssss"

## rule 9, 10, 11
rm --recursive --force -- "${dir}"

exit 0
```

-------------------------

[1]:https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck
[2]:https://www.explainshell.com/
[3]:https://google.github.io/styleguide/shellguide.html
[4]:https://bertvv.github.io/cheat-sheets/Bash.html

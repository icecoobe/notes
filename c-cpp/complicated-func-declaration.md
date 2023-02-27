
# complicated function declaration

Tool: [cdecl](https://cdecl.org/)

## Sample from Stack overflow

解析复杂的函数和指针定义等
[How do I understand complicated function declarations?](https://stackoverflow.com/a/2663377)

## local tool

``` shell
sudo apt install cdecl -y

cdecl
Type `help' or `?' for help
cdecl> void (*(*(*fp)(int,int))(int))
syntax error
cdecl> void (*(*(*fp)(int,int))(int));
syntax error
cdecl> explain void (*(*(*fp)(int,int))(int));
declare fp as pointer to function (int, int) returning pointer to function (int) returning pointer to void
```

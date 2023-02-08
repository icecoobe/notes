# cross compile

## GCC configure options

`--build`: where compilation occurs, 当前是在什么平台编译的
`--host`: where the object will run, 目标是在什么平台运行的
`--target`: which platform the object can handle, 目标文件针对的是什么平台

通常，host和target是一致的，这也是默认的，如果未设置target，它的值与host一致。  
对于交叉编译器，build和host是一致的，都是当前的宿主机，target是目标平台，比如armeabi。  
极端的例子(GCC术语[`Canadian Cross`][3])，在x86上编译，跑在powerpc，针对arm平台。  
常见的情况出现在GDB client，我们在A机器上编译，在B机器上运行GDB client，这个GDB Client针对目标平台C。  

一个不常见例子是：

- A平台比较**慢**，但是它**有**编译器
- B平台比较**快**，但是它**没有**编译器
- C平台又**慢**，又**没有**编译器

为了长期地快速构建目标，我们自然想构建一套在B平台上运行的编译套件。  
此时，在A平台上的编译选项应该如下：

``` shell
./configure     \
    --build=A   \
    --host=B    \
    --target=C  \
    ...
```

### 构建交叉编译器

>The C standard defines two different kinds of executing environments - "freestanding" and "hosted".
>While the definition might be rather fuzzy for the average application programmer,
>it is pretty clear-cut when you're doing OS development: A kernel is "freestanding", everything you do in user space is "hosted".
>A "freestanding" environment needs to provide only a subset of the C library:
>float.h, iso646.h, limits.h, stdalign.h, stdarg.h, stdbool.h, stddef.h, stdint.h and stdnoreturn.h (as of C11).
>All of these consist of typedef s and #define s "only", so you can implement them without a single .c file in sight.

C 标准原文  
>5.1.2 Execution environments
Tw o execution environments are defined: freestanding and hosted. In both cases,
program startup occurs when a designated C function is called by the execution
environment. All objects with static storage duration shall be initialized (set to their
initial values) before program startup. The manner and timing of such initialization are
otherwise unspecified. Program termination returns control to the execution
environment.

C语言标准规定了两种运行环境，独立和托管。  
在Hosted环境下，C程序入口点必须是命名为main的函数，而且其函数原型必须符合标准。  
而在Freestanding环境下，C程序的入口点没有指定的名称，由程序员自行决定。  

我们编译用户程序采用的就是后者，在这种情况下编译器和链接器都会自动添加依赖的C库运行库，并增加了C库的初始化和终止时的清理。  
当我们想要构建新的系统平台（操作系统，独立的目标平台程序-编译器等），需要使用`freestanding`类型。

注：这里的freestanding编译器和gcc的-ffreestanding选项有一定的关联。
-ffreestanding将hosted的gcc降级为freestanding来使用。

最保险的做法是：

1. 构建freestanding的交叉编译器
2. 用这个独立编译器编译目标glibc，binutils等
3. 再用独立编译器开启完整功能选项，结合glibc等编译完整功能的交叉编译器

1中的编译器针对OS、单片机和底层开发足够了。但是对于开发OS下用户程序是不够的，它不是一个hosted的编译器。  
编译器hosted程序，需要初始化环境，这些依赖于C库。而编译器本身不知道glibc的路径，编译的时候需要额外的命令行参数来提供。  
因此，还需要执行步骤2来构建一个完整功能的编译器。  
binutils里面包含了链接器相关的功能套件。

``` shell
[gcc-xxx.xx] $ ./configure          \
                --disable-nls       \
                --without-headers   \
                --with-newlib       \
                --enable-language=c
```

`--disable-nls`: disable native language support  
`--without-headers`: 强制libgcc不使用任何C库的头文件  
`--with-newlib`: 配置libgcc和gcc中的**其他库**使用newlib的头文件，而不要使用C的标准库  

[newlib][5]是RedHat公司的开源C标准库，不适用所有的平台，但是对于POSIX系统和嵌入式系统足够了。

## reference

[OSDev Wiki - GCC Cross-Compiler][1]
[--build --target --host][2]
[Canadian Cross][3]
[Investigating the effects of GCC's --without-headers and --with-newlib configuration flags][4]
[Why is the Canadian Cross used for cross-compilation in Linux From Scratch-1][6]
[Why is the Canadian Cross used for cross-compilation in Linux From Scratch-2][7]
[Freestanding C与交叉编译器的生成原理分析][8]

----------------------

[1]: https://wiki.osdev.org/GCC_Cross-Compiler
[2]: https://stackoverflow.com/a/53031636/827436
[3]: https://wiki.osdev.org/Canadian_Cross
[4]: https://www.ryanstan.com/withoutHeaders.html
[5]: https://sourceware.org/newlib/
[6]: https://unix.stackexchange.com/a/668847
[7]: https://unix.stackexchange.com/a/668887
[8]: https://blog.csdn.net/smstong/article/details/53579148

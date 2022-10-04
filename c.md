# C语言笔记

## 常量

常量指的是内联的字面量，也就是立即数。
常量的存储缺乏自由，数值型的常量直接以内联的形式插入在汇编语句中，属于`.text`段。

``` assembly
mov eax, 0x10
```

字符串常量，或者过大的数值常量则通常存储在`.rodata`只读数据区

``` assembly
.L1: "Hello World %d\n"
```

``` assembly
$SG6328 DB        '%lf', 0aH, 00H
        ORG $+3
$SG6329 DB        '%d', 0aH, 00H
$SG6330 DB        '%lf', 0aH, 00H

push    100                           ; 00000064H
push    OFFSET $SG6329
call    _printf
```

## 变量

函数内部`static`定义的变量，是全局静态变量，仅初始化一次；与应用程序同样的生命周期，只是它的作用范围只在函数内部。
函数外部声明的变量，全局变量，与应用程序同样的生命周，默认为`extern`的作用范围是全局，除非显式地加上`static`，这样作用范围是文件内部。

### 变量存储

- 全局初始化变量，存放在`.data`
- 全局未初始化变量，一般为0，存放在`.bss`
- 函数内的局部变量，存放在栈`stack`
- 动态申请的内存，存在堆`heap`

## ABI

Application Binary Interface, 规定了在某个平台上应用运行时必须遵守的一套规范。因此，它决定了应用的二进制层面的兼容性。里面包含了：

- 数据类型的定义，大小，对齐
- 函数调用的方式，入参方式，栈的维护，返回值处理等等
- 目标文件的格式
- 系统调用的方式，系统调用编号

比如，
函数的入参只有1个时，可以采用`ax`寄存器，多个参数的时候（小于6个），可以采用常用的寄存器组（`ax`，`dx`。。。），还有就是采用RTL顺序入栈等。
当函数只有一个返回值时，编译器可以采用`rax`、`eax`、`ax`寄存器传递。
当需要返回`struct`变量时，可能会采用栈空间传递。
返回浮点数数据，可能使用`xmm`寄存器。

遵从统一的ABI有助于多种不同编译器生成兼容的目标文件，这些文件可以无缝地组合成单个目标文件，或者运行时动态加载并调用对方的接口。

与ABI紧密相关的是系统平台架构和硬件体系，因为这两者的与应用的运行密切相关，ABI的设计和程序的编写必须遵循它们的约束，违反其中一条都会导致应用运行的异常。

比如，Windows的可执行文件格式为`PE`，Linux的是`ELF`；ARM与Intel的x86指令集也是不同的。

## 函数

通过函数可以将程序模块化划分，以及将任务拆解。

没有加限定的函数，默认为`extern`的。
内联函数，需要使用`static`声明，否则会遇到link error 找不到符号。在没有开启最高优化的时候，链接器会去其他目标文件中寻找符号。加了`static`可以保证无论优化选项，都限定在本文件内部查找符号。

函数运行主要涉及到stack的使用和维护，有的`ABI`规定调用者清理stack，有的约定被调用者清理stack。函数运行期间，栈指针寄存器指向的区域为栈帧，在调用其他的函数之前，`rbp`和`rsp`指向的区间就是当前函数的栈帧。

函数调用前，需要将参数入栈，之后使用call指令（保存当前指令地址，修改CS:IP）调用函数。

1. 参数入栈
2. 当前指令地址（PC寄存器地址）入栈
3. 保存bp寄存器
4. 将sp赋值给bp
5. 进入目标函数主体
6. 清理局部变量占用的空间等
7. 传递返回值，ax寄存器等
8. 将bp赋值给sp
9. pop bp
10. 使用入栈的PC寄存器地址，回到调用前的下一条指令继续执行

至此， 函数调用结束，如果期间还有调用其他函数，那么过程类似，在中途再嵌入上述所有步骤。

x86中使用`enter`和`leave`组合，`enter`执行3和4，`leave`执行8和9；
`call`执行2，`ret`执行10

## Test and profiling

- CUnit, Cmocka
- Instruments (OSX)
- Windows Performance Recorder (WPR)
- Perf (GNU/Linux)

### TAP

Test Anything Protocol

### C程序的入口

main函数只能说是用户代码部分最优先执行的，而不是C程序的真正入口。因为在转入main执行之前，C库部分需要做一些初始化准备工作，同时在程序退出的时候也要做一些清理工作。

首先，编写一个不依赖任何外部接口的精简代码。

``` c
int main(void)
{
    return 0;
}
```

编译后，使用`readelf`命令查看可执行文件的内容摘要。

``` shell
$ readelf -h ./test_main
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              DYN (Shared object file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x1040
  Start of program headers:          64 (bytes into file)
  Start of section headers:          14616 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         13
  Size of section headers:           64 (bytes)
  Number of section headers:         29
  Section header string table index: 28
```

此时，我们发现程序的`Entry point address`为`0x1040`。使用`objdump`命令查看这部分的反汇编内容。

``` shell
$ objdump -M intel -d ./test_main | grep 1040 -A 10
0000000000001040 <_start>:
    1040:       f3 0f 1e fa             endbr64 
    1044:       31 ed                   xor    ebp,ebp
    1046:       49 89 d1                mov    r9,rdx
    1049:       5e                      pop    rsi
    104a:       48 89 e2                mov    rdx,rsp
    104d:       48 83 e4 f0             and    rsp,0xfffffffffffffff0
    1051:       50                      push   rax
    1052:       54                      push   rsp
    1053:       4c 8d 05 56 01 00 00    lea    r8,[rip+0x156]        # 11b0 <__libc_csu_fini>
    105a:       48 8d 0d df 00 00 00    lea    rcx,[rip+0xdf]        # 1140 <__libc_csu_init>
    1061:       48 8d 3d c1 00 00 00    lea    rdi,[rip+0xc1]        # 1129 <main>
```

这里，发现了真正的入口名`_start`。汇编中采用这个符号纯粹是约定俗成，业内习惯而已。链接器在链接目标的时候，在全局符号表中查找这个符号，并将地址写入到ELF头部信息中的相关字段`e_entry`。

``` shell
$ ld --verbose
GNU ld (GNU Binutils for Ubuntu) 2.34
  Supported emulations:
   elf_x86_64
   elf32_x86_64
   elf_i386
   elf_iamcu
   elf_l1om
   elf_k1om
   i386pep
   i386pe
using internal linker script:
==================================================
/* Script for -z combreloc -z separate-code */
/* Copyright (C) 2014-2020 Free Software Foundation, Inc.
   Copying and distribution of this script, with or without modification,
   are permitted in any medium without royalty provided the copyright
   notice and this notice are preserved.  */
OUTPUT_FORMAT("elf64-x86-64", "elf64-x86-64",
              "elf64-x86-64")
OUTPUT_ARCH(i386:x86-64)
ENTRY(_start)
SEARCH_DIR("=/usr/local/lib/x86_64-linux-gnu"); SEARCH_DIR("=/lib/x86_64-linux-gnu"); SEARCH_DIR("=/usr/lib/x86_64-linux-gnu"); SEARCH_DIR("=/usr/lib/x86_64-linux-gnu64"); SEARCH_DIR("=/usr/local/lib64"); SEARCH_DIR("=/lib64"); SEARCH_DIR("=/usr/lib64"); SEARCH_DIR("=/usr/local/lib"); SEARCH_DIR("=/lib"); SEARCH_DIR("=/usr/lib"); SEARCH_DIR("=/usr/x86_64-linux-gnu/lib64"); SEARCH_DIR("=/usr/x86_64-linux-gnu/lib");
```

事实上，每个C程序在运行时都会依赖于`C Runtime Library`，即使如上面例子一样没有显式添加任何库函数调用。在GNU/Linux平台上运行时库就是`glibc`。我们可以在GitHub上找到它的具体实现[glibc/sysdeps/x86_64/start.S](https://github.com/bminor/glibc/blob/master/sysdeps/x86_64/start.S)。

``` C
/* This is the canonical entry point, usually the first thing in the text
   segment.  The SVR4/i386 ABI (pages 3-31, 3-32) says that when the entry
   point runs, most registers' values are unspecified, except for:
   %rdx		Contains a function pointer to be registered with `atexit'.
		This is how the dynamic linker arranges to have DT_FINI
		functions called for shared libraries that have been loaded
		before this code runs.
   %rsp		The stack contains the arguments and environment:
		0(%rsp)				argc
		LP_SIZE(%rsp)			argv[0]
		...
		(LP_SIZE*argc)(%rsp)		NULL
		(LP_SIZE*(argc+1))(%rsp)	envp[0]
		...
						NULL
*/

#include <sysdep.h>

ENTRY (_start)
	/* Clearing frame pointer is insufficient, use CFI.  */
	cfi_undefined (rip)
	/* Clear the frame pointer.  The ABI suggests this be done, to mark
	   the outermost frame obviously.  */
	xorl %ebp, %ebp

	/* Extract the arguments as encoded on the stack and set up
	   the arguments for __libc_start_main (int (*main) (int, char **, char **),
		   int argc, char *argv,
		   void (*init) (void), void (*fini) (void),
		   void (*rtld_fini) (void), void *stack_end).
	   The arguments are passed via registers and on the stack:
	main:		%rdi
	argc:		%rsi
	argv:		%rdx
	init:		%rcx
	fini:		%r8
	rtld_fini:	%r9
	stack_end:	stack.	*/

	mov %RDX_LP, %R9_LP	/* Address of the shared library termination
				   function.  */
#ifdef __ILP32__
	mov (%rsp), %esi	/* Simulate popping 4-byte argument count.  */
	add $4, %esp
#else
	popq %rsi		/* Pop the argument count.  */
#endif
	/* argv starts just at the current stack top.  */
	mov %RSP_LP, %RDX_LP
	/* Align the stack to a 16 byte boundary to follow the ABI.  */
	and  $~15, %RSP_LP

	/* Push garbage because we push 8 more bytes.  */
	pushq %rax

	/* Provide the highest stack address to the user code (for stacks
	   which grow downwards).  */
	pushq %rsp

	/* These used to be the addresses of .fini and .init.  */
	xorl %r8d, %r8d
	xorl %ecx, %ecx

#ifdef PIC
	mov main@GOTPCREL(%rip), %RDI_LP
#else
	mov $main, %RDI_LP
#endif

	/* Call the user's main function, and exit with its value.
	   But let the libc call main.  Since __libc_start_main in
	   libc.so is called very early, lazy binding isn't relevant
	   here.  Use indirect branch via GOT to avoid extra branch
	   to PLT slot.  In case of static executable, ld in binutils
	   2.26 or above can convert indirect branch into direct
	   branch.  */
	call *__libc_start_main@GOTPCREL(%rip)

	hlt			/* Crash if somehow `exit' does return.	 */
END (_start)

/* Define a symbol for the first piece of initialized data.  */
	.data
	.globl __data_start
__data_start:
	.long 0
	.weak data_start
	data_start = __data_start
```

### CRT

可以看到C运行时库在执行main之前，做了很多准备工作，也注册了清理析构部分的内容。之后，使用`__libc_start_main`来调用`main`函数。在程序退出的时候，C运行时库还会将main的返回值传递给`exit(int)`函数，告知操作系统本次程序执行的结果，这也是为什么我们能在shell中看到和获取返回值的原因。

``` shell
 lighthouse @ VM-12-15-ubuntu in ~/repo [21:28:46] 
$ wget ssss
--2022-10-04 21:28:50--  http://ssss/
Resolving ssss (ssss)... failed: Temporary failure in name resolution.
wget: unable to resolve host address ‘ssss’

# lighthouse @ VM-12-15-ubuntu in ~/repo [21:28:50] C:4
$ 
```

上面的`C:4`就是`wget`这条shell命令的返回结果。

在信号处理的时候，我们可以注册信号处理接口，针对退出的信号处理函数会在libc库的exit时候执行。而`abort()`函数则会导致程序不会执行libc库的清理工作。

CRT是跟平台相关的，在Windows上我们会看到[msvcrt](https://github.com/cansou/msvcrt)，微软的VC编译器也会做类似的处理。
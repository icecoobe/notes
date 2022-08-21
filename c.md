# C语言笔记

## 常量

常量指的是内联的字面量，也就是立即数。
常量的存储缺乏自由，数值型的常量直接以内联的形式插入在汇编语句中。

``` assembly
mov eax, 0x10
```

字符串常量，则通常存储在.data部分

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


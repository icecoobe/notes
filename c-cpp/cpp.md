
# c++

## const

### 全局const变量

const变量默认只再文件内有效，也就是跟文件内的static全局变量一样。
因为const变量必须要在编译期间确定其初始值。

如果某个const变量，初始值不是一个常量表达式，又想在文件之间共享，又不想编译器为每个文件生成独立的变量。

解决办法就是，无论是全局const变量的定义还是声明，都要加上`extern`。

```cpp
// const_var.cpp
#include <iostream>
using namespace std;

// NOTE: 这里的定义加上了extern
extern const int k_num = 100;

void print_knum()
{
    cout << __FUNCTION__ << ":" << k_num << endl;
}

```

``` cpp
// main.cpp
#include <iostream>

using namespace std;

extern const int k_num;
extern void print_knum();
int main()
{
    cout << __FUNCTION__ << ":" << k_num << endl;
    print_knum();
    return 0;
}
```

Output:

``` shell
main:100
print_knum:100
```

## Class

## namespace {} 替代文件内的全局`static`

``` c++
struct AllocateTrace
{
    uint32_t Allocated = 0;
    uint32_t Freed = 0;

    void PrintUsage()
    {
        cout << "Usage=0x" << hex << Allocated - Freed << endl;
    }
};

namespace
{
AllocateTrace tracer;
}
```

### const member function

Means in this func, member variables are const.

``` c++
class A
{
    int x = 10;
    int *p = &x;

    void test() const
    {
        *p = 20;
    }

    void test2() const
    {
        // Cannot assign to non-static data member within const member function 'test2'
        //p = new int;
    }
};
```

## Tools

- [cdecl](https://cdecl.org/)
  解析复杂的函数和指针定义等
  [How do I understand complicated function declarations?](https://stackoverflow.com/a/2663377)

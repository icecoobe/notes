
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

## Class

### 默认构造函数

编译器在需要构造对象，且该类没有明确定义构造函数的时候会创建默认的构造函数。

默认的构造函数包括

- 无参构造函数`A()`
- 拷贝构造函数`A(const A&)`
- 赋值构造函数`A& operator=(const A&)`

同理，还会创建默认的析构函数`~A()`。

如果该类有特殊的构造和析构处理，不应该依赖编译器生成的默认函数，它们都是空的函数体，几乎没有实质作用。

### 父类的析构函数一定要声明为virtual

只有这样，在`delete`父类类型指针的时候，才会调用真正对象所属类的析构函数。

``` c++
class father 
{
    virtual ~father();
};

father* f = new child();
delete f;
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

### 重载 overload

类中包含多个同名，不同参数的函数，这种方式称为重载。函数的返回值类型不作为判断因素。

### 重写 override

子类中重新实现父类中的同样声明形式的virtual函数。

### 继承和多态

不太严谨的说法，继承是子类使用父类的方法；多态是父类使用子类的方法。

## Tools

- [cdecl](https://cdecl.org/)
  解析复杂的函数和指针定义等
  [How do I understand complicated function declarations?](https://stackoverflow.com/a/2663377)

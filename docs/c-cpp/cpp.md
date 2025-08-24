
# c++

在用C++设计系统的时候，往往心智负担会比较重。担心自己的实现不是最符合C++设计的，担心是在用C++的环境编写C风格的程序，继而一度使用C和C#来开发。<br>

在使用C#这一类语言时，开发人员会更聚焦在系统的复杂度分解，再到类之间的关系，进而考虑类本身的设计。<br>
而当使用C++时，在类的实现语法层面需要考虑地更多，`explicite`、类的6大函数，`copyable`和`noncopyable`等细节都要在大脑里盘点一遍。

举例而言，类的静态变量，在C++中还需要单独处理，属于实现上的额外要求。

```C++
class A {
public:
    static int count;
};

int A::count = 0;
```

``` C#
class A 
{
    public static int count = 0;
}
```

在阅读了祖师爷的书之后，我放下了包袱。他本意就是想创建一种自由的语言，能让所有的开发人员在C++中找到自己喜欢的编码方式。因此，C++中包含了面向过程、面向对象、函数式、泛型等多种编程范式。

祖师爷对新增特性是极其谨慎的，非语言必要的特性通过标准库的方式提供给开发者。比如，并发语义的支持。
因为要兼容C语言保留直接操纵底层的能力，兼容旧版C++标准编写的程序，尽量避免关键字的增加等因素，现代C++在不断丰富“军刀”的同时，依旧会让人觉得“怪异”和复杂。

## 与C语言的对比

如果用比喻来形容的话，C语言就像《第一滴血》里面兰博的匕首，它很简单也很锋利，它的用途取决于你的个人能力。而C++就像一把瑞士军刀，提供了很多开箱即用的选择，让你在面对一些问题时可以默认的方案使用。

C++就像我们自己写的程序，你很难对一个仍然在大范围使用的软件系统进行推倒重来，纵使有无数的理由和现代化的理念。如果说系统架构意味着某种程度上的妥协，作为基石的语言设计更是如此。更何况C++仍然保持了旺盛的生命力在不断地演进和完善。

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

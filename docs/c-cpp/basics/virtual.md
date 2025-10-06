# virtual

``` cpp
#include <iostream>
using namespace std;

class A
{
public:
    virtual void v_test() final { cout << "A::v_test" << endl; }
    virtual void v_test(int) { cout << "A::v_test(int)" << endl; }
    void test() { cout << "A::test" << endl; }
};

class B : public A
{
public:
    // cannot override final virtual function
    //void v_test() { cout << "B::v_test" << endl; }
    void v_test(int) final { cout << "B::v_test(int)" << endl; }
    void test() { cout << "B::test" << endl; }
};

// Final Class
class C final : public B
{
public:
    // cannot override final virtual function
    //void v_test() { cout << "C::v_test" << endl; }
    //void v_test(int) { cout << "C::test(int)" << endl; }
    void test() { cout << "C::test" << endl; }
};

class D : public B
{
public:
    // cannot override final virtual function
    // void v_test() { cout << "D::v_test" << endl; }
    // void v_test(int) { cout << "D::test(int)" << endl; }
    void test() { cout << "D::test" << endl; }
};

int main() 
{
    A a;
    B b;
    C c;
    D d;

    A* pa = &a;
    pa->v_test();
    pa->v_test(0);
    pa->test();
    cout << "----------------" << endl;

    pa = &b;
    pa->v_test();
    pa->v_test(0);
    pa->test();
    cout << "----------------" << endl;
    
    pa = &c;
    pa->v_test();
    pa->v_test(0);
    pa->test();
    cout << "----------------" << endl;

    pa = &d;
    pa->v_test();
    pa->v_test(0);
    pa->test();
    cout << "----------------" << endl;

    A& ref_a = d;
    ref_a.v_test();
    ref_a.v_test(0);
    ref_a.test();
    cout << "----------------" << endl;

    return 0;
}
```

没有使用`virtual`声明的基类接口，派生类无法重写该接口，使用**基类指针/引用**调用时总是调用基类的接口。

!!! note "C++的认知烦恼"

    ``` cpp
    virtual void v_test() final { cout << "A::v_test" << endl; }
    ```
    
    这个是C++编译器或者标准中没法避免的语义上的错误，既然定义为抽象接口就是可以重写（`override`）的，但是语法上又支持使用`final`来限制重写。

    当然，这个本意是想确保子类从父类继承下来的抽象接口不再被改写。

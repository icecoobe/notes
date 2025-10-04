# final

使用final可以防止类被继承，或者防止虚函数被重写。

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

// 不能继承final class
// class D : public C
// {
// }；

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
# 指针和引用

1. 引用和指针都可以用来修改他们指向的对象内部状态
2. 但是引用需要在声明的时候初始化，而且一旦指向某个对象，不会再改变；
3. 对初始化的引用再次赋值，是对引用指向的对象进行赋值，引用本身始终指向最初的对象，它是那个对象的别名。

=== "snippet-1"

    ```cpp
    #include <iostream>
    void swapByPointer(int* a, int* b) {
        int temp = *a;
        *a = *b;
        *b = temp;
    }
    void swapByReference(int& a, int& b) {
        int temp = a;
        a = b;
        b = temp;
    }
    int main() {
        int x = 5;
        int y = 10;
        std::cout << "Before swapping: x = " << x << ", y = " << y << std::endl;
        // 使用指针交换变量的值
        swapByPointer(&x, &y);
        std::cout << "After swapping by pointer: x = " << x << ", y = " << y << std::endl;
        x = 5;
        y = 10;
        // 使用引用交换变量的值
        swapByReference(x, y);
        std::cout << "After swapping by reference: x = " << x << ", y = " << y << std::endl;
        return 0;
    }
    ```

=== "snippet-2"

    ```cpp
    #include <iostream>
    using namespace std;
    class Parent
    {
    public:
        virtual void v_test() { cout << "Parent::v_test" << endl; }
        int a = 0;
    };
    class Child : public Parent
    {
    public:
        void v_test() override { cout << "Child::v_test" << endl; }
    };
    int main()
    {
        Parent parent;
        Child child;
        parent.a = 1;
        child.a = 2;
        Parent* p = &child;
        Parent& ref_parent = parent;
        cout << p->a << endl;
        cout << ref_parent.a << endl;
        // 对引用指向的对象进行赋值
        // 改变的是对象内部的值，a的值变了
        ref_parent = child;
        cout << ref_parent.a << endl;
        p->v_test();
        ref_parent.v_test();
        return 0;
    }
    ```

    ??? example "输出"

        ```plaintext
        2
        1
        2
        Child::v_test
        Parent::v_test
        ```
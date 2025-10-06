# RTTI - Run Time Type Information

// Run Time Type Information
``` cpp
#include <ios>
#include <iostream>
using namespace std;
class Base
{
public:
    Base() { cout << __FUNCTION__ << endl; }
    virtual ~Base() { cout << __FUNCTION__ << endl; }
    virtual void f() 
    { 
        cout << "Base" << __FUNCTION__ << endl; 
    }
};
class Derived : public Base
{
public:
    Derived() { cout << __FUNCTION__ << endl; }
    ~Derived() { cout << __FUNCTION__ << endl; }
    
    void f() 
    { 
        cout << "Derived-" << __FUNCTION__ << endl;  
    }
};
class Derived2 : public Derived
{
public:
    Derived2() { cout << __FUNCTION__ << endl; }
    ~Derived2() { cout << __FUNCTION__ << endl; }
    void f()  
    { 
        cout << "Derived2-" << __FUNCTION__ << endl; 
    }
};
int main(void)
{
    Derived* p = new Derived2();
    cout << "-------------------" << endl;
    p->f();
    cout << "-------------------" << endl;
    auto p2 = dynamic_cast<Derived2*>(p);
    auto p3 = dynamic_cast<Base*>(p2);
    cout << sizeof(p) << ", " 
        << typeid(p).name() << ", " 
        << std::hex << typeid(p).hash_code() << endl;
    cout << "p2: " << typeid(p2).name() << ", " 
        << std::hex << typeid(p2).hash_code() << endl;
    cout << "p3: " << typeid(p3).name() << ", " 
        << std::hex << typeid(p3).hash_code() << endl;
    cout << sizeof(*p) << ", " 
        << typeid(*p).name() << ", " 
        << std::hex << typeid(*p).hash_code() << endl;
    cout << "-------------------" << endl;
    delete p;
    cout << "-------------------" << endl;
    return 0;
}
```

!!! experiment "Output"
    ```cpp
    Base
    Derived
    Derived2
    -------------------
    Derived2-f
    -------------------
    8, P7Derived, 9a7969d972aa52f7
    p2: P8Derived2, 16a9329eaa369fd5
    p3: P4Base, 11468d01f070011b
    8, 8Derived2, f3ec1aaa6ce2faa5
    -------------------
    ~Derived2
    ~Derived
    ~Base
    -------------------
    ```

---
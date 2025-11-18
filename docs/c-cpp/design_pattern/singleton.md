# Singleton 单例模式

单例模式其实不算一种设计模式，更像一种实现模式。
它有好几种实现方式，这里只记录一种基于 C++11 标准库的实现方式，也是我比较喜欢的`std::call_once`。

[Gist - singleton.cpp](https://gist.github.com/icecoobe/4de400ba7f6452fada5533a01888737d)
``` C++
#include <iostream>
#include <mutex>
#include <thread>

namespace
{
std::once_flag init_once_flag;
}

class singleton
{
public:
    static singleton* instance()
    {
        std::call_once(init_once_flag, init);
        return instance_;
    }

    void print_something()
    {
        std::cout << __FUNCTION__ << ": hello" << std::endl;
    }

private:
    singleton() = default;
    ~singleton() = default;

    static void init()
    {
        std::cout << "[init]" << std::endl;
        if (instance_ == nullptr)
        {
            instance_ = new singleton();
        }
    }
private:
    static singleton *instance_;
};

singleton* singleton::instance_ = nullptr;


int main()
{
    std::thread t([](){
        std::cout << "- 1" << std::endl;
        singleton::instance()->print_something();
        std::cout << "=====" << std::endl;
        });
    std::thread t2([](){
        std::cout << "- 2" << std::endl;
        singleton::instance()->print_something();
        std::cout << "=====" << std::endl;
        });
    std::thread t3([](){
        std::cout << "- 3" << std::endl;
        singleton::instance()->print_something();
        std::cout << "=====" << std::endl;
        });
    t.join();
    t2.join();
    t3.join();

    return 0;
}
```
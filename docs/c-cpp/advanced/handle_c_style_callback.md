# How-to Handle C-style Callbacks in C++

- [GitHub Gist - 1](https://gist.github.com/icecoobe/cf5532ba66ddc9aa0e66750f3e0e0afe)
- [GitHub Gist - 2](https://gist.github.com/icecoobe/d4b80983e05164b37ed246de2e63f536)

Regist member function with C-Style callback

``` cpp
#include <iostream>
using namespace std;

// https://en.cppreference.com/w/cpp/language/pointer

class delegate;
union callback
{
    int (*func_in_c)(int);
    int (delegate::*func_in_cpp)(int);
};

typedef int (*callback_func)(int num);
void do_something(callback_func f, int n)
{
    if (f)
        f(n);
}

class delegate
{
public:
    delegate() { init(); }
    ~delegate() = default;

    void init()
    {
        callback cb;
        cb.func_in_cpp = &delegate::test;
        do_something(cb.func_in_c, 10);
    }

    // https://stackoverflow.com/a/71194688
    void init2()
    {
        static auto f = [this](int n)
        {
            return test(n);
        };
        do_something(
            [](int n)
            {
                return f(n);
            }, 11);
    }
private:
    int test(int n)
    {
        cout << __FUNCTION__ << ": " << n << endl;
        return 0;
    }
};

int main(void)
{
    delegate d;
    d.init2();
    return 0;
}
```
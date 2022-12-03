
# c++

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

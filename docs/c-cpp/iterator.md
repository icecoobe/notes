
# iterator

``` c++
#ifndef ITER_PRACTICE_HPP
#define ITER_PRACTICE_HPP

#include <iostream>
using namespace std;

struct iter_practice
{
    void sort()
    {
        for (int i = 0; i < 5; i++)
            for (int j = i + 1; j < 5; j++)
                if (nums[j] < nums[i])
                {
                    auto temp = nums[j];
                    nums[j] = nums[i];
                    nums[i] = temp;
                }
    }

    operator bool() const
    {
        if (nums[0] == 100)
            return true;

        return false;
    }

    struct iter
    {
        int* m_p = nullptr;

        iter(int *p) { m_p = p; }

        /**
         * @brief operator ++ 后缀++
         * @param step
         * @return
         */
        iter& operator++(int step)
        {
            cout << "step: " << step << endl;
            m_p++;
            return *this;
        }

        /**
         * @brief operator ++ ++前缀
         * @return
         */
        iter& operator++()
        {
            m_p++;
            return *this;
        }

        bool operator!=(const iter& others)
        {
            return others.m_p != m_p;
        }

        int& operator*()
        {
            return *m_p;
        }

    };

    iter m_it { (int*)&nums[0] };
    iter m_it_end { (int*)&nums[4] };
    iter& begin()
    {
        m_it = (int*)&nums[0];
        return m_it;
    }

    iter& end() { return m_it_end; }

    int operator[](size_t n)
    {
        if (n > 5)
            return -1;

        return nums[n];
    }

    friend int test_fr(const iter_practice& ip);
private:
    int nums[5] { 105, 100, 400, 200, 330 };
};

#endif // ITER_PRACTICE_HPP
```

``` c++
#include <iostream>

using namespace std;

#include "iter_practice.hpp"

#include <vector>
#include <tuple>

int test_fr(const iter_practice& ip)
{
    return ip.nums[2];
}

int&& test(int &a)
{
    //int a = 10;
    return std::move(a);
}

int main()
{
    std::pair<int, float> p = std::make_pair(10, 3.5f);
    std::pair<int, float> p2 = std::make_pair(110, 3.15f);
    p.swap(p2);
    cout << p.second << endl;
    cout << "Hello World!" << endl;

    iter_practice ip;

    if (ip)
        cout << "object is what we need;" << endl;
    else
        cout << "object is not what we need;" << endl;

    ip.sort();

    if (ip)
        cout << "object is what we need;" << endl;
    else
        cout << "object is not what we need;" << endl;

    for (iter_practice::iter& it = ip.begin(); it != ip.end(); ++it)
        cout << *it <<",";
    cout << endl;

    for (auto& i : ip)
        cout << i << ",";

    cout << endl;

    vector<int> nums {10, 2, 5, 99, 1};
    for (auto& n:nums)
        cout << n << ",";
    cout <<endl;

    /**
     *  @note sss
     */
    for (vector<int>::iterator it = nums.begin(); it != nums.end(); it++)
        cout << *it.operator->() <<",";
    cout << endl;

    cout << __cplusplus << endl;
    cout << test_fr(ip) << endl;
    int a = 0xF9;
    cout << test(a) << endl;

    cout << ip[3] << endl;

    return 0;
}

```

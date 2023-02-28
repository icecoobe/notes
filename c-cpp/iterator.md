
# iterator

``` cpp

#include <iostream>
#include <stdio.h>
#include <vector>

using namespace std;

class Animal {
 public:
    // NOTE: 这里不用virtual 析构的话，delete不会调用子类的析构
  virtual ~Animal() { cout << "Animal ~()." << endl; }//= default;

  virtual void MakeSound() const = 0;
};

class Dog : public Animal {
 public:
  ~Dog() { cout << "Dog ~()." << endl; }
  virtual void MakeSound() const override { std::cout << "woof!" << std::endl; }
  //void MakeSound(int a) override {}
};

class NullAnimal : public Animal {
 public:
  virtual void MakeSound() const override {}
};

struct IterPractice
{
    struct iter
    {
        // iter m_internal;
        int *p = nullptr;
        iter(int* others) { p = others; }

        // //iter() = delete;
        // iter(const iter& i) { m_internal = i; }

        iter& operator++(int a)
        {
            cout << "++: " << a << endl;
            p += 1;
            return *this;
        }

        iter& operator+(int a)
        {
            p += a;
            return *this;
        }

        bool operator!=(const iter& it)
        {
            return (it.p != this->p);
        }

        int& operator*()//const iter& it)
        {
            return *p; //*this;
        }
    };

    // struct const_iter
    // {
    //     const iter& operator++()
    //     {}
    // };

    //int num[5] { 5, 100, 30, 49, 1 };
    int num[5] { 500, 100, 300, 490, 1000 };

    void sort()
    {
        for (int i = 0; i < 5; i++)
            for (int j = i + 1; j < 5; j++)
            {
                if (num[j] < num[i])
                {
                    auto temp = num[j];
                    num[j] = num[i];
                    num[i] = temp;
                }
            }
    }

    operator bool() const
    {
        if (num[0] == 100)
            return true;

        return false;
    }

    iter m_it { ((int*)&num[0]) };
    iter m_end { ((int*)&num[4]) };
    
    iter& begin() 
    { 
        m_it = iter((int*)&num[0]);
        return m_it; 
    }

    iter& end() { return m_end; } //m_it + 4; }

    // iter operator*(const iter& it)
    // {
    //     return m_it;
    // }
};

int get_num()
{
    int a = 10;
    return a;
}

int main(void)
{
    Dog *d = new Dog();
    Animal *a = d;

    delete a;
    //delete d;
    
    int &&ref_a = 3;
    ref_a = 4;
    int c = 1;
    // int &&ref_b = c;
    int && ref = get_num();
    cout << ref << endl;

    cout << ref_a << ", " << &ref_a << endl;
    cout << &c << endl;

    signed char i = 0B1'0'00'0000;
    printf("%i, \n", i);

    vector<int> nums {2, 3,4,12};

    for (auto &n : nums)
        cout << n << ", ";
    cout << endl;

    IterPractice ip;

    if (ip)
    {
        cout << "The object is what we need." << endl;
    }
    cout << ip << endl;
    ip.sort();
    cout << ip << endl;
    if (ip)
    {
        cout << "The object is what we need." << endl;
    }

    for (IterPractice::iter it = ip.begin(); it != ip.end(); it++)
        cout << *it << endl;

    cout << "END" << endl;
    // for (auto& t : ip)
    //     cout << t << endl;

    return 0;
}
```

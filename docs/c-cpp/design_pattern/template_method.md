# Template Method Pattern

## 简介

属于**行为设计模式** - Behavioral Design Pattern。

!!! Abstract

    常见的场景是当某种算法的整体步骤是固定的，但是某些步骤的实现可以有所不同或者可能会做定制化。

该算法本身是一个抽象类，定义了算法的骨架，而具体的实现则由其子类来完成。

比如，半导体测试设备的某个测试任务，通常包含加电DA转换，数据采集AD转换，数据后处理等步骤（当然还有状态机切换等复杂的任务，这里做了简化）。
每个步骤都可以作为一个钩子(hook)接口对子类开放修改，而该测试任务对外的接口是固定的`DoTest()`：

1. `protected` PreTest() - 准备测试 DA转换，外部不需要调用的接口
2. `protected` DA_Conversion() - 纯虚函数，子类必须实现的接口
3. `public` DoTest() - 执行测试 DA转换，加电，时序处理、中断标识处理、控制相机、控制光学仪器、采集数据、AD转换和数据后处理等，外部公开的接口
4. `protected` AD_Conversion() - 纯虚函数，子类必须实现的接口
5. `protected` PostTest() - 测试后处理 AD转换，外部不需要调用的接口

扩展场景来看，**代码生成**也符合这个特点。C#支持partial class机制，将类的文件拆分到多个文件中，最终编译时与生成代码合并。
而这里的`Template`指的是class，而不是某个具体的method。

新建一个WinForm程序，我们可以看到这个Form类被拆成了两部分，一个是用户代码，另一个是设计器生成的代码。最终，它们会被合并成一个XXForm类，而开放给开发者修改的可以看成是一个钩子接口（这里是类包围的多个hook接口）。

???+ note

    以类为基本单元来看，我觉得继承本身就是一种模板方法模式，或者说模板方法的目的就是多态，而继承也是其实现机制之一。父类的接口是固定的，而子类可以重写父类的某些方法来实现不同的行为。

## UML

=== "UML Diagram"

    ![Page-1](../../assets/drawio/c-cpp/template-method.drawio)

=== "C# Partial Class"

    ``` C#
    // Customer.Part1.cs
    public partial class Customer  
    {  
        public string Name { get; set; }  
        public string Email { get; set; }  
    }

    // Customer.Part2.cs
    public partial class Customer  
    {  
        public void DisplayCustomerInfo()  
        {  
            Console.WriteLine($"Name: {Name}, Email: {Email}");  
        }  
    }
    ```

## Sample

```cpp
#include <iostream>

using namespace std;

class Job
{
public:
    void Exec()
    {
        PreExec();
        DoJob();
        PostExec();
    }
protected:
    virtual void PreExec() { cout << "++ Preparing Job" << endl; }
    virtual void DoJob() { /* ... */ }
    virtual void PostExec() { cout << "-- Job finishes!" << endl; }
};

class AJob : public Job
{
protected:
    void DoJob() override { cout << "\tA Job running ..." << endl; }
};

class BJob : public Job
{
protected:
    void DoJob() override { cout << "\tB Job running ..." << endl; }
};

int main()
{
    AJob job_a;
    BJob job_b;

    Job& job1 = job_a;
    Job& job2 = job_b;

    job1.Exec();
    job2.Exec();

    return 0;
}
```

## Output

``` shell
++ Preparing Job
	A Job running ...
-- Job finishes!
++ Preparing Job
	B Job running ...
-- Job finishes!
```
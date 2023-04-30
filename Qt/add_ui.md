# add ui

当widget的类已经写好了，想增加ui文件。

新建文件，选择`Qt Designer Form`，命名`battery_s_w.ui`，它适合已经写好了界面业务逻辑类的场景。
之后双击ui文件，然后点击IDE最左侧的编辑按钮，xml格式编辑ui文件。

```xml
 <widget class="QWidget" name="BatteryServiceWidget">
```

name就是已经写好的界面业务逻辑类。再到该类里面绑定。

```c++
// BatteryServiceWidget.h
namespace Ui {
class BatteryServiceWidget;
}

class BatteryServiceWidget : public ServiceWidget
{
    Q_OBJECT
private:
    Ui::BatteryServiceWidget *ui;
    // ...
};
```

``` c++
// BatteryServiceWidget.cpp

// 注意这句，包含的编译期间生成的ui头文件名，就是ui文件的名称加上 ui_ 前缀
#include "ui_b_s_w.h"

BatteryServiceWidget::BatteryServiceWidget(ble::GapDevice &gap, ble::GattService &service, QWidget *parent)
    : ServiceWidget(gap, service, parent),
      ui(new Ui::BatteryServiceWidget) // 还有这一行，加上ui的部分
{
    ui->setupUi(this); // 在以前的构造函数顶部加上这个

    // ...
}
```

最后，选择重新构建，生成ui_xxx.h头文件等。

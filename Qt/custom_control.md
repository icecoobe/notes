# custom control

添加自定义控件的方式，就是新建一个class。可以选择带ui文件的，也可以c++ class，然后勾选qobject这些。

```c++
// battery_widget.h

#ifndef BATTERYWIDGET_H
#define BATTERYWIDGET_H

#include <QWidget>

class BatteryWidget : public QWidget
{
public:
    BatteryWidget(QWidget *parent = nullptr);
    QRectF getFrame();
    QPointF getWidgetFrameOffset(QSizeF newWidgetSize);
    void setValue(float newValue);
    float getValue() { return value_; }
private:
    // 这两个就是重载父类QWidget的方法，达到重绘效果
    void resizeEvent(QResizeEvent *event) override;
    void paintEvent(QPaintEvent *event) override;

    void validateValue(float newValue);
private:
    float value_ = 0;
    float maxValue = 100;
    float minValue = 0;

    QRectF widgetFrame;
    QRectF mainBatteryFrame;
    QRectF tipBatteryFrame;
    QRectF batteryLevelFrame;

    bool isCharging = false;
};

#endif // BATTERYWIDGET_H
```

添加到其他页面的方法：

- 用代码的方式，在其他页面添加到layout里。

```c++
auto layout = ui->verticalLayout;
auto lblService = new XxWidget();
layout->addWidget(lblService);
```

- 在其他页面拖拽一个Widget，然后右键选择提升，设置要提升的部件的源码文件路径。

记得写全相对路径，否则会导致生成的ui头文件有问题，导致编译不报错，但是信号没有触发！！！

```xml
 <customwidgets>
  <customwidget>
   <class>BatteryWidget</class>
   <extends>QWidget</extends>
   <!-- 写全相对路径 widget/battery_widget.h -->
   <header location="global">widget/battery_widget.h</header>
   <container>1</container>
  </customwidget>
 </customwidgets>
```


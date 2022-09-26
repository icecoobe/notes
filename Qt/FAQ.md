# FAQ

## Getting Started with QtQuick and QML

[Guide](https://qml.guide/getting-started-with-qml/)

## Awesome Qt QML

[GitHub Home](https://github.com/mikalv/awesome-qt-qml)

## Difference between Window and ApplicationWindow in QML?

>ApplicationWindow is a Window that adds convenience for positioning items, such as MenuBar, ToolBar, and StatusBar in a platform independent manner.

That is, it is an item that inherits from Window but has certain default attributes, it is similar to QMainWindow with respect to QWidget.

## What is the use of the ui.qml files in Qt5 (QML)?

The `.ui.qml` file exists to help Qt Quick Designer out. Normal QML files can contain JavaScript expressions, for example, but these are difficult for Qt Quick Designer to work with. Plain QML, on the other hand, is not as difficult, and is closer to the widgets equivalent of .ui files - a document that details a set of items in a user interface, not so much the logic behind them.

## Overview - QML and C++ Integration

[cppintegration overview](https://doc.qt.io/qt-5/qtqml-cppintegration-overview.html)

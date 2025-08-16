# nRF52840 dongle development

## CDC

USB Communications Device Class

## ACM

Abstract Control Model

## DFU

Device Firmware Upgrade

安装驱动之后，设备名应该如下:
nRF Connect USB CDC ACM (COM7)

## nRF52840 Donle introduction

https://www.nordicsemi.com/Products/Development-hardware/nrf52840-dongle

## USB CDC ACM module

https://infocenter.nordicsemi.com/topic/com.nordic.infocenter.sdk5.v15.2.0/lib_usbd_class_cdc.html

## Desktop library for BLE development

https://github.com/NordicSemiconductor/pc-ble-driver

## nRF Sniffer for Bluetooth LE

可以将nRF52840 dongle变成一个sniffer工具，使用如下链接下载zip包，使用里面的hex固件烧录。

nRF Sniffer for Bluetooth LE is a useful tool for debugging and learning about Bluetooth Low Energy applications.

https://www.nordicsemi.com/Products/Development-tools/nRF-Sniffer-for-Bluetooth-LE/Download?lang=en#infotabs

## nRF52840 Dongle Programming Tutorial

https://devzone.nordicsemi.com/guides/short-range-guides/b/getting-started/posts/nrf52840-dongle-programming-tutorial

## Softdevice

Softdevice命名规则介绍，烧录时可以根据规则选择正确的hex固件，比如：
`connectivity_4.1.4_usb_with_s140_6.1.1.hex`

https://devzone.nordicsemi.com/guides/short-range-guides/b/getting-started/posts/introduction-to-nordic-nrf5-sdk-and-softdevice
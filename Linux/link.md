
# link files

## Hard Link

硬链接相当于别名，指向同一个inode，inode再指向文件在设备上的具体block。
也因为硬链接的这个原理，硬链接不支持跨文件系统的链接。

``` shell
❯ l
total 12K
drwxrwxr-x  3 uec1szh uec1szh 4.0K Mar  6 00:57 .
drwx------ 26 uec1szh uec1szh 4.0K Mar  6 00:57 ..
drwxrwxr-x  3 uec1szh uec1szh 4.0K Mar  2 04:47 my-project
```

这里的第三列数字代表的是硬链接的数量。
每个文件夹内部有两个隐藏的硬链接，分别指向当前目录和上层目录，每当目录下新建一个子目录，当前目录的i link就会增加1。
硬链接不会创建磁盘文件；
只能给文件创建硬链接，不可以给目录创建。

``` shell
❯ ls
my-project
❯ ln my-project m
ln: my-project: hard link not allowed for directory
```

删除一个文件需要某个文件的硬链接i_link=0，且进程打开占用的数量i_count=0。

## Soft Link

软链接是一个独立的文件，内容描述其指向的文件。

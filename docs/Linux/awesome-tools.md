
# Awesome tools

## Shell

- Shellcheck

``` shell
sudo apt install -y shellcheck
```

``` shell
❯ shellcheck test/a.sh

In test/a.sh line 5:
echo $GGG
     ^--^ SC2086: Double quote to prevent globbing and word splitting.

Did you mean: 
echo "$GGG"

For more information:
  https://www.shellcheck.net/wiki/SC2086 -- Double quote to prevent globbing ...
```

- [explainshell.com][1]
- [Google Shell Style Guide][2]
- [System & Process Supervisor for Linux - watchdogd][3]
- [cppman - offline manual for cpp](https://github.com/aitjcize/cppman)

## Debugging

[gdbgui - A browser-based frontend to gdb](4)

![animation](https://github.com/cs01/gdbgui/raw/master/screenshots/gdbgui_animation.gif)

![tree explorer](https://github.com/cs01/gdbgui/raw/master/screenshots/tree_explorer.png)

[GDB Dashboard](https://github.com/cyrus-and/gdb-dashboard)

[VS Code Debug Visualizer](https://github.com/hediet/vscode-debug-visualizer)

## Profiling

- [google/perfetto](https://github.com/google/perfetto)
- [KDAB/hotspot: The Linux perf GUI for performance analysis](https://github.com/KDAB/hotspot)
- [Linux Tracing Technologies](https://docs.kernel.org/trace/index.html)
- [Practical Linux tracing ( Part 1/5) : symbols, debug symbols and stack unwinding](https://tungdam.medium.com/things-you-should-know-to-begin-playing-with-linux-tracing-tools-part-i-x-225aae1aaf13)
- [Brendan Gregg's Homepage](https://www.brendangregg.com/)

------------------------------------------------------------

[1]:https://www.explainshell.com/
[2]:https://google.github.io/styleguide/shellguide.html
[3]:https://github.com/troglobit/watchdogd
[4]:https://www.gdbgui.com/
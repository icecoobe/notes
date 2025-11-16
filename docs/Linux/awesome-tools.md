
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

------------------------------------------------------------

[1]:https://www.explainshell.com/
[2]:https://google.github.io/styleguide/shellguide.html
[3]:https://github.com/troglobit/watchdogd

# FAQ

## ssh login without password

Copy local public key to remote machine.

``` shell
ssh-copy-id -i id_rsa.pub uec1szh@SGHZ001036195
```

## Using Docker with Rootless Mode

1.Add docker group to system (if non-existed)
``` shell
sudo groupadd docker
```

2.Adding user uec1szh to group docker

``` shell
sudo gpasswd -a $USER docker
```

3.change group or logout to change to the new group

``` shell
newgrp docker
```

NOTE:
For lower version ubuntu (< `21.04`), still need to change socker file attribute.

``` shell
sudo chown root:docker /var/run/docker.sock
sudo chown -R root:docker /var/run/docker
```

4.(Optional) logout

``` shell
sudo pkill -u $USER
```

## logout via remote ssh

``` shell
sudo pkill -u $USER
```

## Cannot change default shell - user 'xxx' does not exist in /etc/passwd

The system is using distributed authentication (`Kerberos`), so user account doesn't appear in local `/etc/passwd`.

``` shell
xxx@xxx:~$ chsh
Password:
Changing the login shell for uec1szh
Enter the new value, or press ENTER for the default
        Login Shell [/bin/bash]:
chsh: user 'uec1szh' does not exist in /etc/passwd
```

However user account can be retrieved via:

``` shell
getent passwd $USER
```

output:

``` shell
xxx@host:~$ getent passwd $USER
xxx:*:1420530021:1420530021:xxx xxx (department/XXX):/home/xxx:/bin/bash
```

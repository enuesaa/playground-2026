# pyinfra

- 構成管理ツール。
- Ansible 相当
- ざっくり Ansible と同じような考え方と思っていれば良さそう
- ランタイムは Python
- エントリポイントは慣習的に deploy.py ってところに書くことになってそう？

## Commands
```bash
### Install Python
$ dnf install -y python3.13-pip

### Install Pyinfra
$ ip3.13 install pyinfra

### deploy
### ホストマシンの構成を変える
$ pyinfra @local deploy.py 
--> Loading config...
--> Loading inventory...
--> Connecting to hosts...
    [@local] Connected

--> Preparing operation files...
    Loading: deploy.py
    [@local] Ready: deploy.py

--> Detected changes:
    Operation                             Change       Conditional Change   
    Install nginx                         1 (@local)   -                    
    Ensure nginx is running and enabled   1 (@local)   -                    

    Detected changes may not include every change pyinfra will execute.
    Hidden side effects of operations may alter behaviour of future operations,
    this will be shown in the results. The remote state will always be updated
    to reflect the state defined by the input operations.

    Detected changes displayed above, skip this step with -y
                             
--> Beginning operation run...
--> Starting operation: Install nginx 
    [@local] Success

--> Starting operation: Ensure nginx is running and enabled 
    [@local] Success

--> Results:
    Operation                             Hosts   Success   Error   No Change   
    Install nginx                         1       1         -       -           
    Ensure nginx is running and enabled   1       1         -       -           
    Grand total                           2       2         -       -           

--> Disconnecting from hosts...
```

## Links
- https://github.com/pyinfra-dev/pyinfra

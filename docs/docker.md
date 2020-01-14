# Docker 配置


### Image build

1. Under this project folder and run ``` docker build -t marksimos .    ```  


### Create log and uploadimage folder on host 

1. ``` mkdir /nodejs/marksimos/log```.
1. ``` mkdir /nodejs/marksimos/uploadimage```.


### Run container 

1. Testing in container. Run ``` docker run -it -e "NODE_ENV=jindocker" -u "node" --name "marksimos" -p 3000:3000  marksimos /bin/bash ```, then run ``` npm run docker ```.
2. Run on local ``` docker run -d -e "NODE_ENV=jindocker" -v /Users/wangyp/Documents/jincode/Marksimos/log:/usr/src/nodejs/app/log -v /Users/wangyp/Documents/jincode/Marksimos/public/app/uploadimage:/usr/src/nodejs/app/public/app/uploadimage --name "marksimos" -p 3000:3000 marksimos ``` and check logs ```docker logs <container id> ```.
3. Run on production ``` docker run -d -e "NODE_ENV=jindocker" -v /nodejs/marksimos/log:/usr/src/nodejs/app/log -v /nodejs/marksimos/uploadimage:/usr/src/nodejs/app/public/app/uploadimage --name "marksimos" -p 3000:3000 marksimos ``` and check logs ```docker logs <container id> ```.



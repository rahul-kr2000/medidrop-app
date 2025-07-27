#!/bin/bash
echo 'run after_install.sh: ' >> /home/ubuntu/react-app-pipeline/deploy.log
echo 'cd /home/ubuntu/react-app-pipeline' >> /home/ubuntu/react-app-pipeline/deploy.log
cd /home/ubuntu/react-app-pipeline >> /home/ubuntu/react-app-pipeline/deploy.log
echo 'npm install' >> /home/ubuntu/react-app-pipeline/deploy.log
npm install >> /home/ubuntu/react-app-pipeline/deploy.log
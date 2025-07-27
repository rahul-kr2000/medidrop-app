#!/bin/bash
echo 'run application_start.sh: ' >> /home/ubuntu/react-app-pipeline/deploy.log
echo 'cd /home/ubuntu/react-app-pipeline' >> /home/ubuntu/react-app-pipeline/deploy.log
cd /home/ubuntu/react-app-pipeline >> /home/ubuntu/react-app-pipeline/deploy.log
echo 'npm run build' >> /home/ubuntu/react-app-pipeline/deploy.log
npm run build >> /home/ubuntu/react-app-pipeline/deploy.log 2>&1
echo 'starting react app with serve' >> /home/ubuntu/react-app-pipeline/deploy.log
pm2 start serve --name "react-app" -- -s build -l 3000 >> /home/ubuntu/react-app-pipeline/deploy.log 2>&1
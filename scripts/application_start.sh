#!/bin/bash
echo 'run application_start.sh: ' >> /home/ec2-user/react-app-pipeline/deploy.log
echo 'cd /home/ec2-user/react-app-pipeline' >> /home/ec2-user/react-app-pipeline/deploy.log
cd /home/ec2-user/react-app-pipeline >> /home/ec2-user/react-app-pipeline/deploy.log
echo 'npm run build' >> /home/ec2-user/react-app-pipeline/deploy.log
npm run build >> /home/ec2-user/react-app-pipeline/deploy.log 2>&1
echo 'starting react app with serve' >> /home/ec2-user/react-app-pipeline/deploy.log
pm2 start serve --name "react-app" -- -s build -l 3000 >> /home/ec2-user/react-app-pipeline/deploy.log 2>&1
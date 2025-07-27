#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/node-aws-pipeline/deploy.log
echo 'cd /home/ec2-user/aws-node-pipeline' >> /home/ec2-user/node-aws-pipeline/deploy.log
cd /home/ec2-user/node-aws-pipeline >> /home/ec2-user/node-aws-pipeline/deploy.log
echo 'npm install' >> /home/ec2-user/node-aws-pipeline/deploy.log
npm install >> /home/ec2-user/node-aws-pipeline/deploy.log
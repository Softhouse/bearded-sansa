#!/bin/sh
env
mkdir -p "$HOME/.ssh"
echo -e $PRIVATE_SSH_KEY >> $HOME/.ssh/id_rsa
chmod 600 $HOME/.ssh/id_rsa
ssh -tt -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no adminuser@kush.softhouselabs.com 'echo hej'

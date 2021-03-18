

#### Install

      sudo apt-get install ufw

      //commands
      sudo ufw allow 22
      sudo ufw deny 111

      sudo ufw allow from 123.45.67.89
      sudo ufw allow from 123.45.67.89 to any port 22 proto tcp

      sudo ufw delete allow 80

      sudo ufw enable

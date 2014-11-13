#!/bin/bash

# OS X
if [[ "$OSTYPE" == "darwin"* ]]; then
  # Install Homebrew if not found
  if ! bw="$(type -p "brew")" || [ -z "$bw" ]; then
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  fi

  # Install brew cask
  brew install caskroom/cask/brew-cask

  # Install Node
  if ! nj="$(type -p "npm")" || [ -z "$nj" ]; then
    brew cask install node
  fi

  # Install VirtualBox if not found
  if ! vb="$(type -p "virtualbox")" || [ -z "$vb" ]; then
    brew cask install virtualbox
  fi

  # Install Vagrant if not found
  if ! vg="$(type -p "vagrant")" || [ -z "$vg" ]; then
    brew cask install vagrant
  fi
  # Install ChefDk
  if ! cdk=$(type -p "chef") || [ -z "$cdk" ]; then
    brew cask install chefdk
  fi

# Linux
elif [[ "$OSTYPE" == "linux-gnu" ]]; then
  echo "7656767"
  if ! nj="$(type -p "npm")" || [ -z "$nj" ]; then
    sudo apt-get install nodejs npm
  fi

  # Install VirtualBox if not found
  if ! vb="$(type -p "virtualbox")" || [ -z "$vb" ]; then
    sudo apt-get install virtualbox -y
  fi

  # Install Vagrant if not found
  if ! vg="$(type -p "vagrant")" || [ -z "$vg" ]; then
    sudo apt-get install vagrant -y
  fi

  # Install ChefDk
  if ! cdk=$(type -p "chef") || [ -z "$cdk" ]; then
    sudo dpkg -i chefdk_0.3.4_amd64.deb
  fi
fi


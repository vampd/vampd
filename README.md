vampd
=================

vampd is a lamp stack and drupal automation machine! vampd stands for virtualized-apache-mysql-php-drupal. It is a vagrant chef provisioner that looks to ease local drupal development by automating the overhead of setting up the server, placing the files, and running the commands. Through vampd, all of this will be automated and can be customized to your needs.

vampd looks to become a one stop solution for local development and deployment
strategy helping to standardize processes and dev flow without constricting the
environments or needs of the developer. Our vision is to increase productivity
by providing a stable, reproducible, virtualized environments that include
meet all your drupal needs.

Installs
--------
* Ubuntu 14.04 (default)
** Apache 2.4
** PHP 5.5
** MySQL 5.5
* Ubuntu 12.04 (optional)
** Apache 2.2
** PHP 5.3
** MySQL 5.5


Installation Instructions
-------------------------

The install of vampd is not the easiest thing, but if you are familiar with the
command line, should be fairly simple.

First things first, you will need to install [vagrant](https://www.vagrantup.com/downloads.html),
[virtualbox](https://www.virtualbox.org/wiki/Downloads) and [ChefDK](https://downloads.getchef.com/chef-dk/).
If you are on a Mac you will also need to install X-code from the App store (for Git).

Now open your terminal of choice.

The following commands are recommended and will help us trouble shoot if future
issues arise.
```
cd ~
mkdir vagrant
cd vagrant
git clone https://github.com/vampd/vampd.git
cd vampd
vagrant plugin install vagrant-berkshelf
vagrant plugin install vagrant-omnibus
vagrant plugin install vagrant-cachier
vagrant up
```

Now, you will see a bunch of text run and automate. During this time we recommend you
edit your /etc/hosts file to add the proper site name and ip address so the site
will resolve.

To do this open a new tab in the terminal:
```
sudo nano /etc/hosts
```

By default the IP address found in the Vagrantfile is 192.168.50.5 So add this
line to the file below all other lines.

192.168.50.5 example.local

Now go back to your original terminal tab. If the process has finished, visit
http://example.local and check it out, a fresh Drupal install.


And voila, you have a site installed!

##Mounting the assets through NFS
An NFS recipe comes preconfigured in vampd. This allows unix based systems, as well
as some Windows versions to use NFS as a mount to access assets on the host.

In your Vagrantfile, leave the server.vm.synced_folder setting as "disabled: true":

```
server.vm.synced_folder 'assets', '/assets', disabled: true
```

Run 'vagrant up' from your machine (or 'vagrant provision' if your vbox is already running), then:

1. At the command line, cd into the vampd root directory and mkdir assets

1. Mount the virtual machine's /assets directory to vampd/assets:

	On an OSX run:  `sudo mount -o resvport 192.168.50.5:/assets assets`, or

  On linux run: `sudo mount 192.168.50.5:/assets assets`

NOTE: Your local machine might not have an `/assets` folder. To create one, `mkdir /assets`. Also, note it is possible to mount the folder to another folder of your choosing. The directory `/assets` guarantees the path is the same as that of the virtualized machine. This is neccessary under some conditions, such as gitsubmodules.

In the event that you get an `mount_nfs: can't mount :/assets from 192.168.50.5 onto /Users/username/vagrant/vampd/assets: RPC prog. not avail` error or similar, you may have to start/restart nfs on your Vagrant instance.  

1. From your local machine, ssh into your Vagrant instance using `vagrant ssh <identifier>`
1. `sudo su` to root directory
1. run `/etc/init.d/nfs-kernel-server restart`  -- if you get ` * Usage: nfs-kernel-server {start|stop|status|reload|force-reload|restart}` then run `start` instead of `restart`

##Mounting the assets through Samba
To mount your local machine to the host, you will need to do some leg work, but it
is very minimal.

1. In `Vagrantfile` comment out the line `chef.add_role('nfs_export')`.
1. In `chef/roles/base.json` uncomment the lines `"recipe['samba']"` and `"recipe[samba::server]"`. Also,comment out the line `"recipe[drupal-nfs]"`
1. Mount the drive as a guest using: `198.162.50.5` as the server, and `data` as the mount point.
1. On unix, the command is `sudo mount -t smbfs //guest@192.168.50.5/data /assets`

##Upgrading Instructions

If you want to upgrade vagrant-berkshelf to use 3.0. Unforunately, it isn't so easy.

You must first install [ChefDK](https://downloads.getchef.com/chef-dk/) and [uninstall Vagrant](https://docs.vagrantup.com/v2/installation/uninstallation.html)
making sure to remove user data by removing the `~/.vagrant.d` folder.

Then reinstall Vagrant and the vagrant plugins.

##Setup a Drush alias to your vagrant box

If you have drush installed on your local machine you can create a drush alias to run drush commands on your site from your local environment.

1. Create a drush alias file within ~/.drush. Name the file [site name].aliases.drushrc.php.
1. In the file the contents should look something like:

```
<?php

$aliases['local'] = array(
  'root' => '/srv/www/[site dir]/current/docroot/',
  'remote-host' => '127.0.0.1',
  'remote-user' => 'vagrant',
  'ssh-options' => '-p 2222 -i ~/.vagrant.d/insecure_private_key',
  'uri' => '127.0.0.1:8080',
);
```
Now you can access your site from your local machine by using drush @[site name].local [command]

##Connect to mysql from host machine

```
mysql -uroot -p -hdrupal.local
```

##Now let's have some fun.

For those who don't know, vampd isn't about just spinning up a site and dumping
a database to share across a team, actually it is quite against that. We aim to
create reproducible environments and code from every aspect. The server should match
what you are going live on, and your site should be able to deploy into production
with a simple install, or if you have a live site, updates should be applied via
update hooks, check out our desire for a standard dev process in the [wiki](http://github.com/vampd/vampd/wiki)

[Existing Sites](https://github.com/vampd/vampd/wiki/Existing-Sites) <br />
[Troubleshooting](https://github.com/vampd/vampd/wiki/Trobuleshooting) <br />
[**Examples**](https://github.com/vampd/vampd-examples): This will provide a great
set of examples for many different use cases. Please feel free to fork this and
post you examples here.

vampd is a fork of the open source project [drupal-lamp](newmediadenver/drupal-lamp).

# -*- mode: ruby -*-
# vi: set ft=ruby :
require 'json'

=begin

  You can use a specific provider with vagrant's provider flag like so:

  vagrant up --provider=vmware_fusion
  vagrant up --provider=virtualbox

  In order to use the vmware_fusion provider you will need to have a licensed
  copy of vmware fusion installed. You will also need to purchase a vagrant
  vmware seat http://www.vagrantup.com/vmware

  Virtualbox and Vmware each have different base boxes that can be automatically
  downloaded by uncommenting the appropriate server.vm.box_url line below. You
  can read more regarding base boxes at a wiki page you can help correct and
  keep up to date:

=end

Vagrant.configure("2") do |config|

  working_dir = File.dirname(__FILE__) + "/"
  config.omnibus.chef_version = '11.16.2'
  config.berkshelf.enabled = true
  config.berkshelf.berksfile_path = working_dir + "Berksfile"
  config.vm.define :drupaldev do |server|
    server.ssh.forward_agent = true

    # Ubuntu 14.04
    server.vm.box = "trusty64"
    server.vm.box_url = "https://oss-binaries.phusionpassenger.com/vagrant/boxes/latest/ubuntu-14.04-amd64-vbox.box"

    # Ubuntu 12.04
    # server.vm.box = "precise64current"
    # server.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box"

    server.vm.provider "vmware_fusion" do |v|
      v.vmx["memsize"]  = "1024"
    end

    server.vm.provider :virtualbox do |v|
      v.name = "vampd"
      v.customize ["modifyvm", :id, "--memory", "1024"]
    end

    server.vm.hostname = "drupal.local"

    server.vm.network :private_network, ip: "192.168.50.5"

    server.vm.synced_folder 'assets', '/assets', disabled: true


    server.vm.provision :chef_solo do |chef|
      chef.log_level = :info
      chef.roles_path = "chef/roles"
      chef.data_bags_path = "chef/data_bags"
      chef.environments_path = 'chef/environments'
      chef.environment = 'development'
      chef.add_role("base")
      Dir.foreach(working_dir + chef.roles_path) do |path, block|
        next if path == '.' or path == '..' or path == 'base.json' or path == 'nfs_export.json'
        chef.add_role(File.basename(working_dir + chef.roles_path + '/' + path, ".json"))
      end
      chef.add_role("nfs_export")
    end
  end
end

---
layout: post
title: Hello World!
---

Hello friends.

<iframe width="560" height="315" src="https://www.youtube.com/embed/G4VAdWJXyFk" frameborder="0" allowfullscreen></iframe>

-----

My setup for this is way better than my usual way of doing things. The actual website uses [Jekyll](http://jekyllrb.com/), which is an amazing little static site generator. 

#Maybe Not Being Myself Isn't So Bad

I came across [Alex Bilbie's](http://alexbilbie.com/) website while doing an investigation into [OAuth](http://alexbilbie.com/2015/04/oauth-open-redirector-attack/) and the look caught my eye. I found out he used [Hyde](http://hyde.getpoole.com/), which is a theme for Jekyll, and decided why not.

Jekyll is basically a little [CMS](https://wordpress.org/) that can do whatever you want it to. The blog posts are generated from [Markdown](http://daringfireball.net/projects/markdown/) files in the `_posts` folder, Hyde generates sidebar links from any files that have [YAML](http://yaml.org/) a certain block at the top, and from there you can change things as much or as little as you want.

I changed the color, the font of the title, wrote my name and now I'm a web designer.

#Sometimes I Feel Like This Isn't Home

I finally decided to try out [Vagrant](https://www.vagrantup.com/) the other day with [Laravel Homestead](http://laravel.com/docs/5.0/homestead), and it was one of the better choices I've made recently.

Clutter sucks, I have a lot of it, and need less. I'm using OS X and my old setup was a local MAMP server, an FTP client for use with a VPS, and a text editor. Now, I'm sure I could have set this up a little better, but my computer was (still is) a goddamn mess with different development tools, folders, and files. Vagrant allows you to always have a nice new environment to work with. You just add a box, initialize it, do a little configuring of folders and mapping hostnames, and start it up. Once you have everything setup the way you want, you can save the box and start with a fresh environment if (when) you fuck up.

I'm using the same [laravel/homestead](https://atlas.hashicorp.com/laravel/boxes/homestead) box for a couple different projects. As far as the website, installation went like this:

    vagrant ssh
    [Navigate to mapped folder]
    sudo apt-get ruby ruby-dev git
    gem install jekyll
    git clone https://github.com/poole/hyde.git .
    [Edit config.yaml accordingly]
    jekyll build
    serve personal.dev /home/vagrant/dev/personal/ 80
    exit
    [Edit host file accordingly]


#Life Gits To Me A Lot

Now... I know I should of been using [Git](http://git-scm.com/) the whole time. I really should of, but I wasn't. Why, Why didn't I, it's so good...

I followed this [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps) tutorial on the matter and pretty much have same thing that Jekyll's [documentation](http://jekyllrb.com/docs/deployment-methods/#git-post-receive-hook) has for the post-receive hook.

My workflow is so nice now. I edit, or make a post or something, make a commit, and push it to live/master, it uploads to the VPS and Github, and I have a post-receive Git hook that compiles everything and updates the wesbite.

    git add -A
    git commit -m "I'm making a commitment"
    git push live master
    [magic]

###And I'm probably doing this all wrong. Oh well.
Ninja User Interface Website
----------------------------

1. Install:

        brew install ruby node
        gem install jekyll
        git clone git://github.com/ninja/ui ~/Sites/ninja/ui
        cd ~/Sites/ninja/ui
        npm install
        git clone git://github.com/ninja/ninja.github.com ~/Sites/ninja/www
        cd ~/Sites/ninja/www
        npm install

2. Configure:

        NINJA_PROJECT="~/Sites/ninja/ui"
        NINJA_SITE="~/Sites/ninja/www"

        alias ninjabuild="jake --directory $NINJA_PROJECT --jakefile $NINJA_PROJECT/Jakefile.js"
        alias ninjabuildwww="jake --directory $NINJA_SITE --jakefile $NINJA_SITE/Jakefile.js"
        alias ninjawww="ninjabuildwww; cd $NINJA_SITE; jekyll --auto --server"

3. Development:

        ninjawww
        open http://localhost:4000

4. Deploy:

        cd $NINJA_SITE
        git add *
        git commit -r 'Updated Ninja UI website.'
        git push

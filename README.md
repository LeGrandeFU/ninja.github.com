Ninja User Interface Website
----------------------------

1. Install:

        brew install ruby node
        gem install jekyll
        git clone git://github.com/ninja/ui ~/Sites/ninja/ui
        cd ~/Sites/ninjaui
        npm install
        git clone git://github.com/ninja/ninja.github.com ~/Sites/ninja/www

2. Configure:

        NINJA_PROJECT="~/Sites/ninja/ui"
        NINJA_SITE="~/Sites/ninja/www"
        NINJA_CDN="$NINJA_SITE/cdn/`ninjabuild -vn`/"

        alias ninjabuildwww="mkdir $NINJA_CDN; ninjabuild $NINJA_PROJECT -o $NINJA_CDN; cat $NINJA_PROJECT/themes/*.css | cleancss -o $NINJA_SITE/css/themes.css; cp $NINJA_PROJECT/LICENSE $NINJA_SITE/LICENSE.txt"

        alias ninjawww="ninjabuildwww; cd $NINJA_SITE; jekyll --auto --server"

3. Development:

        ninjawebserver
        open http://localhost:4000

4. Deploy:

        cd $NINJA_SITE
        git add *
        git commit -r 'Updated Ninja UI website.'
        git push

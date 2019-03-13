git checkout master
git pull
git merge release-fixes
git push
git checkout release
git pull
git merge release-fixes
git push
git checkout development
git pull


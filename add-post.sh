#!/bin/bash
set -e

echo -e "Updating local repo...\n"
git switch main
git pull --rebase --autostash

if [ -z "$1" ]; then
    echo "ERROR: Expected date (YYYY-mm-dd) as the first argument"
    exit 1;
fi;

COLUMN_DATE=$1
BRANCH=feat/$COLUMN_DATE
BRANCH_EXISTS=$(git rev-parse --quiet --verify $BRANCH || true)

if [ -z "$BRANCH_EXISTS" ]; then
    git switch -c $BRANCH
else
    git switch $BRANCH
fi;

TEMPLATE=posts/${COLUMN_DATE:0:4}/$COLUMN_DATE.md
COLUMN=content/posts/${COLUMN_DATE:0:4}/$COLUMN_DATE.md

if [ ! -f "./content/$TEMPLATE" ]; then
    echo "Creating a new template"
    hugo new $TEMPLATE
    sed -i "/^date:/c\date: \"$COLUMN_DATE\"" ./content/$TEMPLATE
fi;

if [ -z "$2" ]; then
    echo "Opening template for editing"
    code "./content/$TEMPLATE"
    exit 0;
fi;

if [ "$2" != "--merge" ]; then
    echo "ERROR: Expected --merge as the second argument to create a merge request"
    exit 1;
fi;

git add .
git commit -am "feat: $COLUMN_DATE"
git push --set-upstream origin $BRANCH
gh pr create --title "feat: $COLUMN_DATE" --assignee "@me"

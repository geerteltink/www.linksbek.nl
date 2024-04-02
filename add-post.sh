#!/bin/bash
set -e

echo -e "Updating local repo...\n"
git switch main
git pull --rebase --autostash --prune
npm install

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

TEMPLATE="./src/posts/${COLUMN_DATE:0:4}/$COLUMN_DATE.md"
#COLUMN=content/posts/${COLUMN_DATE:0:4}/$COLUMN_DATE.md

if [ ! -f $TEMPLATE ]; then
    echo "Creating a new template"
    echo -e "---\ntitle: \"__TITLE__\"\ndate: \"$COLUMN_DATE\"\n---" > $TEMPLATE
fi;

if [ -z "$2" ]; then
    echo "Opening template for editing"
    code $TEMPLATE
    exit 0;
fi;

if [ "$2" != "--mr" ]; then
    echo "ERROR: Expected --mr as the second argument to create a merge request"
    exit 1;
fi;

git add .
git commit -am "feat: $COLUMN_DATE"
git push --set-upstream origin $BRANCH
gh pr create --title "feat: $COLUMN_DATE" --assignee "@me" --label "feat" --fill
gh pr merge $BRANCH --squash --auto

git switch main
git pull --rebase --autostash --prune
git gone

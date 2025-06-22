# Set strict error mode (similar to `set -e` in Bash)
$ErrorActionPreference = "Stop"

Write-Host "Updating local repo..."

git switch main
git pull --rebase --autostash --prune
npm install

if (-not $args[0]) {
  Write-Error "ERROR: Expected date (YYYY-mm-dd) as the first argument"
  exit 1
}

$COLUMN_DATE = $args[0]
$BRANCH = "feat/$COLUMN_DATE"
$BRANCH_EXISTS = (git branch --list --contains "$BRANCH" | Select-String -Pattern "^\s*$BRANCH") -ne $null

if (-not $BRANCH_EXISTS) {
  git switch -c $BRANCH
} else {
  git switch $BRANCH
}

$TEMPLATE = "./src/posts/{0}/$COLUMN_DATE.md" -f $COLUMN_DATE.Substring(0, 4)

if (-not (Test-Path $TEMPLATE)) {
  Write-Host "Creating a new template"
  $content = @"
---
title: "__TITLE__"
date: "$COLUMN_DATE"
---
"@
  Out-File -FilePath $TEMPLATE -InputObject $content -Encoding UTF8
}

# Check if second argument is provided
if (-not $args[1]) {
  Write-Host "Opening template for editing"
  code $TEMPLATE
  exit 0
}

# Check if second argument is "--mr"
if ($args[1] -ne "--mr") {
  Write-Error "ERROR: Expected --mr as the second argument to create a merge request"
  exit 1
}

git add -A
git commit -m "feat: $COLUMN_DATE"
git push --set-upstream origin $BRANCH
gh pr create --title "feat: $COLUMN_DATE" --assignee "@me" --label "feat" --fill
gh pr view --web
gh pr merge $BRANCH --squash --auto

git checkout main
git pull --rebase --autostash --prune
git gone

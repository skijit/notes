## Git Log
=======

## Filtering Examples

- `git log --author jschmoe`: filter by author
- `git log <directory>`: restricts to commits with a changed file in that directory
- `git log <branch-name>`: restricts to just that branch
  - when you filter on a branch, remember, it's probably supposed to be prefixed with `origin`
- `git log --no-merges`: No merge commits
  - or `git log --merges` to show only merges
- `git log -- <filename1> <filename2>`: to isolate to just commits which affect those files
- `git log --grep="search-term"`  - only searches the commit message

- Time parameters
  - `git log --since=8am` or `5 minutes ago`
  - `git log --since=yesterday`
  - `git log --before={2017-12-31}`
  - `git log --before={2017-12-31} --after={2017-06-01}`
    - or `git log <since>..<until>`

- Comparing branches
  - `<since>..<until>` also works with branches
  - `git log master..feature` will show any commits in feature that are not in master.  
  - `git log feature..master` will show you all of the commits in master but not feature
    - **remember**- the last branch is the one you're including
	- or compare branches with diff: `git diff master..feature` to see the diffs

## Paging
- `git log` output is piped through a pager (not an editor- like `vim`)
- usually, the pager is `less`
- `less` is compatible with many search patterns from `vim`
- `less` cheat sheet
  - Scroll: up/down arrow buttons (or j and k)
  - Get current position: `ctrl + G`
  - Search:
    - `/` text (`/skj`) or regexp `/p{2}` to search *forward*
    - `?` text (`/skj`) or regexp `/p{2}` to search *backward*
      - also good when you don't want to have to escape subsequent slashes (ie in a URL)
    - `n` for next match
    - `N` for prev match
  - Specific position in output:
    - Beginning: `g`
    - End: `G`
    - Specific line: `<any number> + g`
  - Mark a position: `ma` (is marked as 'a')
  - Return to a marked position `'a`
  - Exit: `q`
- you can set the pager to vim with `git config --global core.pager 'vim -'`
  - use `git config --list` 
- another way to control the output length: 
  - `git log -n 20` only shows 20 commits

## Appearance
- The graphical output is a little counter-intuitive:
  - The master branch not necessarily on the farthest left
  - Think like git: 
    - Most commits will eventually be associated with multiple branches    
    - Branches are only labelled at the tips with their references
- `git log --graph --decorate --all` shows a graphical version of commit, and decorate shows you the branch names.  
	- `--all` helps with resolving the branch names (since each commit can be a part of multiple branches, you want to find the one that was on the original command line) and tags, however you can't filter for branch with

## Best Practices
- Conventions
  - It is easiest to read the git log when you follow some standard conventions which allow you to make assumptions
  - Squash Merge
    - When you commit from a feature to the master or development branch, you don't want all those WIP commits showing up
    - Typically this is done from your PR-UI software, but behind the scenes, it uses `git rebase`
  - 3-way merge vs Rebase
    - If all your commits to master or development branch are 3-way merges (typically from a PR), such that you have 1 dedicated commit, this is pretty straight forward.
    - Alternately, you can use rebase to make the progression even smoother
    - Remember, you can also filter on merges with `--merges` or `--no-merges`
- Aliases
  - It's best to have some standard git log aliases since the variety of options is so large
  - You can still add parameters to the end (e.g. options, or files)
  - **Alias 1**: Graphical, streamlined
    ```
    git config --global alias.lg1 "log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)'"
    ```      
      - to apply to all branches, use `--all`

  - **Alias 2**: Not-graphical, expanded log

    ```
    git config --global alias.lg1 "log --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)'"
    ```      
      - to apply to all branches, use `--all`
  
  - [reference](https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs)
  - Other options:
    - a popular `pretty` format: `git log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short`
      - `%h`: abbreviated hash
      - `%d`: commit decorations
      - `%ad`: commit date
      - `%s`: comment
      - `%an`: author name
	    - The pretty format placeholders are in the git log man page (near the end)

- Diagnostics
  - if you want to test whether a particular branch contains a given commit, try:
    - `git branch -r --contains <commit-id> | grep <branch-name>`
      - the `-r` is important bc it includes remote tracking branches
  - for a quick snapshot of who is doing what, try `git shortlog`
    - `git shortlog` is a special format of log which groups each commit by author and displays the first line of each commit.
	  - use the `-n` flag to get more than the default (5) number of commits per author
    - this command was originally designed for making release announcements
  - `git log -p` will show you each of the diffs (patch)
  - `git show <sha>` to see the details of a particular commit (or `git show <sha> --stat` for summary)
  - Remember that (even when you filter on a branch) you'll see individual commits and then possibly a merge commit (which actually applied those changes), if they haven't squashed

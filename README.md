# js-stuff

## Git Helpers

### Squashing commits

Suppose we have `4` commits in `temp` branch

```
git rebase -i HEAD~4
```

Replace `pick` with `squash` for last 3 commits

```
squash <commit-hash>
```

Comment out the squashed commits and edit the final commit message

Verify the changes

```
git log --oneline
```

Force push the changes

```
git push origin temp --force
```

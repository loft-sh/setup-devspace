<p align="center">
  <a href="https://github.com/lizardruss/install-devspace-cli/actions"><img alt="install-devspace-cli status" src="https://github.com/lizardruss/install-devspace-cli/workflows/build-test/badge.svg"></a>
</p>

# Install DevSpace CLI GitHub Action

This is a GitHub Action to install the DevSpace CLI. Windows, Mac, and Linux runners are supported.

## Usage

This action will install the DevSpace CLI for use in job steps. The default behavior installs the latest release from [DevSpace Releases](https://github.com/loft-sh/devspace/releases). Subsequent steps may run any `devspace` CLI command.

### Example: Use DevSpace to deploy to `staging` namespace on commits to `main`.
```yaml
name: Deploy to Staging
on:
  push:
    branches:
      - 'main'
jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    steps:
      - name: Install DevSpace
        uses: lizardruss/install-devspace-cli
      - name: Deploy using DevSpace
        run: devspace deploy --namespace staging
```

### Example: Use a specific DevSpace Version
```yaml
name: devspace version
on:
  push:
    branches:
      - 'main'
jobs:
  dev:
    runs-on: ubuntu-latest
    steps:
      - name: Install DevSpace
        uses: lizardruss/install-devspace-cli
        with:
          version: v5.15.0
      - name: Show Version
        run: devspace --version
```

## Customizing

### inputs

The following inputs can be used as `step.with` keys

| Name                | Type     | Description                        |
|---------------------|----------|------------------------------------|
| `version`           | String   | The version of DevSpace CLI to install. See [DevSpace Releases](https://github.com/loft-sh/devspace/releases), for available versions.
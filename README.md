<p align="center">
  <a href="https://github.com/loft-sh/setup-devspace/actions"><img alt="install-devspace-cli status" src="https://github.com/loft-sh/setup-devspace/workflows/build-test/badge.svg"></a>
</p>

# setup-devspace

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
        uses: loft-sh/setup-devspace@main
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
        uses: loft-sh/setup-devspace@main
        with:
          version: v5.15.0
      - name: Show Version
        run: devspace --version
```

## Install `kubectl`

Options are provided to install `kubectl`. Many GitHub runners now come with `kubectl` pre-installed, however this allows for controlling the version of `kubectl` if desired.

### Example: Install DevSpace and a specific version of kubectl
```yaml
name: devspace and kubectl version
on:
  push:
    branches:
      - 'main'
jobs:
  dev:
    runs-on: ubuntu-latest
    steps:
      - name: Install DevSpace
        uses: loft-sh/setup-devspace@main
        with:
          kubectl-install: true
          kubectl-version: v1.21.0
      - name: Show Version
        run: devspace --version
```

## Customizing

### inputs

The following inputs can be used as `step.with` keys

| Name                     | Type     | Description                                          |
|--------------------------|----------|------------------------------------------------------|
| `version`                | String   | The version of DevSpace CLI to install. See [DevSpace Releases](https://github.com/loft-sh/devspace/releases), for available versions. Defaults to `latest`.
| `kubectl-install`        | Boolean  | Install kubectl if not already installed. Disabled by default.
| `kubectl-version`        | String   | The version of the kubectl to install. Defaults to `latest`.
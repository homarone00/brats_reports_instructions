# ReportX

Documentation site for the ReportX annotation protocol, served as a static nginx container.

## Site contents

The site covers the ReportX annotation protocol across four pages:

- **index.html** — main protocol reference: tumor region legend and field definitions for the annotation template
- **clinicians.html** — annotators guide (available in both English and Italian)
- **dataset-release.html** — dataset release template with field definitions and tumor region legend
- **join.html** — recruitment page for new annotators

## Repository structure

```
├── .github/workflows/
│   └── deploy.yml      # CI/CD pipeline (build → push → deploy)
├── Dockerfile
├── docker-compose.yml
├── *.html / *.css / *.js
└── assets/
```

## Branching flow

`dev-<username>` → `dev` → `production`

Work on your branch, then open a PR to `dev` for integration/staging. Once validated, `dev` is promoted to `production`.

## Environments

| Environment | URL | Availability |
|---|---|---|
| Dev | `http://services-host.ing.unimore.it:8096` | Unimore network only |
| Production | `https://reportx.unimore.it` | Public |

## Deploying

**Do not run `docker compose` manually.** Deploys are fully automated via GitHub Actions.

- Push/merge to `dev` → builds and pushes `ghcr.io/aimagelab-zip/reportx:dev`, then restarts the dev container.
- Push/merge to `production` → builds and pushes `ghcr.io/aimagelab-zip/reportx:latest`, then restarts the production container.

### Required GitHub secrets

| Secret | Description |
|---|---|
| `SSH_HOST` | Server hostname or IP |
| `SSH_USER` | SSH username on the server |
| `SSH_KEY` | Private SSH key for that user |

`GITHUB_TOKEN` is provided automatically by Actions and is used for GHCR authentication.

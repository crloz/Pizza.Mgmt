## Requirements
 - Node.js 16.0.0 or higher is required.
 - .Net Core 7.0 
 - yarn 1.22.10 or higher is required.
## Installation

### Client Dependencies
```bash
# install yarn
npm install --global yarn

# install dependencies
cd pizza-mgmt-client
yarn install
```

### Server Dependencies
```bash
# install entity framework tools
dotnet tool install --global dotnet-ef

# install dependencies
dotnet restore

# apply migrations
dotnet ef database update --project Pizza.Mgmt.Api
```
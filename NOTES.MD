# ReadMe

## Installation

First of all you need to verify you have pnpm installed, this repository requires a version **>9.0.0** as per the package.json.

     pnpm -v

If this doesn't return a version number, you can install it via your usual [package manager ](https://pnpm.io/installation)

    brew install pnpm
    npm install -g pnpm

Finally you need to install the node_modules, you can do so by running

    pnpm install

## Run the server

Running the server locally can be achieved by running the following command

    pnpm start

This will build the latest files and run them via express

From here you can either use the supplied postman config to import the collection or use the the integration tests to call the app.

## Running unit tests

To run the suite of Unit Tests we can call the corresponding pnpm command

    pnpm test:unit

Or to run a single unit test we can have the file name at the end

    pnpm test:unit create-user

## Running integration tests

A pre-requirement for running the integration tests is to have the server running in a terminal, you can then create a new terminal windows to run the integration tests.

    pnpm test:int

Or to run a single integration test we can have the file name at the end

    pnpm test:unit create-user

## Development

If you're looking to develop changes to this repo, it utilizes husky under the hood to perform some pre-commit checks.

### Commit Message

Commit messages must follow the format of [semantic commit message](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) . So a valid commit message might look like

    docs: updated the readme with commit message information

### Eslint/Prettier

It's highly recommended to grab the [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension if you're actively developing in this repository.

You can run the packages manually without code modifications via

    pnpm check:lint

Or likewise, you can instruct these packages to attempt to fix the errors via

    pnpm fix:lint

# Considerations / Trade-offs

## Async

I've created some methods which are async, because usually these would always been async in the real world because they're accessing databases or making API calls etc despite that not technically being the case in this app because the database is entirely in memory.

## Integration Tests

This implementation of having to run the server in parallel is a bit janky, but I can't remember the last time i wrote an API and didn't add integration tests.

Whilst this could technically be possible within a single command or a setup.ts file using some version of [child_process or similar sibling](https://nodejs.org/api/child_process.html#child-process) this felt like a somewhat complex modification to achieve a similar result, given in the real world I would've deployed out an ephemeral instance of the server to AWS and integration tested against that.

The former would've allowed me to add the integration tests to the workflows though which would've been a standard in my day to day.

## AWS

I spent a good while pondering if I should write this App utilizing things like API Gateway, Lambdas, CloudWatch & DynamoDB, as that would be my bread and butter usually, however I felt like it was stepping away from the requirements of the task a bit too far.

## Logging

I'm always torn with logging, my opinion shifts vastly based on variables like how many PII/Secrets we have in the traffic coming through our domain.

- The safest approach is to simply not log any objects other than
  messages that hint towards how the system has behaved, and allow for
  easy replaying of events when they go wrong but in an isolated
  environment.
- The more risky approach is to have a [logging library](https://docs.powertools.aws.dev/lambda/typescript/latest/core/logger/) with different log levels, which production and development environment are set to ignore anything but critical log levels, in our ephemeral stacks however we can lower the log level right down to debug to get a really good understanding on how the code is performing.

Both these solutions have their ups and downs, and I've seen them both work and fail for different reasons.

## Boilerplate Modifications

### Added dependabot config

This I think is quite an important aspect of repositories, I've seen some real nightmare situations over time where a repository is using so many out dated packages, it's a real chore to get them upgraded back to the modern day.

### Swap to PNPM

I'm not entirely set on using pnpm, however it's what I've been using for the last 2 years, so my poor little fingers are quite accustomed to the extra p. This has had some ups and downs for me, whilst it is quicker due to how it handles packages, the support has been flimsy in some instances, like dependabot.

There's plenty of similarities, you can revert to npm by deleting the pnpm-lock.yaml & removing the engine block in package.json.

### Eslint/Prettier

To try and save time i just adopted the config I've used previously. I think even the config that's implemented currently has a few niggling issues, Again i'm not set on the configs I've used, they're just and example from my boiler plate template which has them co-existing peacefully.

### Husky

I think pre-commit hooks are quite a useful tool for speed, allowing us to verify that our commits are valid before getting up to a pull request.

### tsconfig/package.json

I usually struggle a little bit with all the various options available in these files, I seldom have to modify them, and in the vast majority of repositories i'm working in they're already defined. I did attempt to upgrade the tsconfig to use es2022 given it's more modern, however like above, I felt like I was moving too far away from the specificed project to use, so i reverted it in the end. I found that pulling in the [tsup](https://github.com/egoist/tsup) library to bundle for me solved some of my problems too.

## Postman Collection

Ideally I would prefer to have a Open API spec file for an API rather than a postman collection, I had a quick look into the difficulty to achieve this and I didn't think it was worth the time for the tech test.

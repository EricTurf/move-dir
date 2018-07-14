## MoveDir

A recursive directory mover built with rxjs with support for promises.

## Installation

```
yarn add move-dir
```

or

```
npm i --save move-dir
```

## Usage

### Rxjs

This library will by default return an observable stream. The most basic usage is as follows

```typescript
import moveDir from 'move-dir';

moveDir(inputDirectory:string, outputDirectory:string).subscribe();

//Will copy the inputDirectory into the outputDirectory
```

### Promises

This library is also compatible with promises.

#### basic promise

```typescript
import moveDir from 'move-dir';

moveDir(inputDirectory:string,outputDirectory:string, { asPromise: true })
    .then()
    .catch()

//Will copy the inputDirectory into the outputDirectory
```

#### async/await

```typescript
import moveDir from 'move-dir';

await moveDir(inputDirectory:string,outputDirectory:string, { asPromise: true })

//Will copy the inputDirectory into the outputDirectory
```

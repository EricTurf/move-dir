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

### Example

Assuming you have a directory called input with the following structure

```
input
├── level 1
|   ├── level 2
|   |   └── file
|   ├── level 2
|   |   └── level 3
            └── file
```

If you want to move this a brand new COOL directory, `moveDir` will create the COOL directory with the following structure

```
COOL
├──input(level 1)
|   ├── level 2
|        ├── level 3
|        |   └── file
|        ├── level 3
|              └── level 4
|                    └── file
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

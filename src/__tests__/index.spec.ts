import moveDir from '../index';
import { Observable, of } from 'rxjs';

const mockOf = of;

jest.mock('../move-dir', () => jest.fn(() => mockOf({})));

describe('index', () => {
  it('should be a function of arity 2', () => {
    //Assert
    expect(moveDir).toBeInstanceOf(Function);
    expect(moveDir).toHaveLength(2);
  });

  it('should return an Observable by default', () => {
    //Arrange
    const inputDir = './';
    const outputDir = './';

    //Act
    const result = moveDir(inputDir, outputDir);

    //Assert
    expect(result).toBeInstanceOf(Observable);
  });

  it('should return a Promise is asPromise option is true', () => {
    //Arrange
    const inputDir = './';
    const outputDir = './';

    //Act
    const result = moveDir(inputDir, outputDir, { asPromise: true });

    //Assert
    expect(result).toBeInstanceOf(Promise);
  });
});

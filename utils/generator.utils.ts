import { CONTROL_NUMBERS } from '../tools/constants/constants';

type ControlSumType = "UL_N1" | "FL_N1" | "FL_N2";

enum StartPositionType {
    "UL_N1" = 2,
    "FL_N1" = 1,
    "FL_N2" = 0,
};

export type InnType = `ul` | `fl`;

const getRandomNum = (min: number = 0): number => Math.floor(Math.random() * (10 - min)) + min;

const controlNumber = (controlSumType: ControlSumType, inn: number[]): number => {
    const startPosition = StartPositionType[controlSumType];
    const controlSum = inn.reduce((prevNum, currentNum, i) => {
        return prevNum + currentNum * CONTROL_NUMBERS[i + startPosition];
    }, 0);
    const controlNumber = controlSum % 11;
    return (controlNumber % 11 > 9) ? controlNumber % 10 : controlNumber;
};

export const generateInn = (type: InnType): string => {
    const inn: number[] = [];
    const firstLength = type === 'ul' ? 9 : 10;
    let innNumber: number;

    for (let i = 0; i < firstLength; i++) {
        innNumber = getRandomNum((i === 1 && inn[0] === 0) ? 1 : 0);
        inn.push(innNumber);
    };

    if (type === 'ul') {
        inn.push(controlNumber('UL_N1', inn));
    } else {
        inn.push(controlNumber('FL_N1', inn));
        inn.push(controlNumber('FL_N2', inn));
    };

    return inn.join('');
};

export const generateKpp = (): string => {
    const kpp: number[] = [];
    let kppNumber: number;

    for (let i = 0; i < 9; i++) {
        kppNumber = getRandomNum((i === 1 && kpp[0] === 0) ? 1 : 0);
        kpp.push(kppNumber);
    };

    if (`${kpp[4]}${kpp[5]}` === `50` || `${kpp[4]}${kpp[5]}` === `01` || `${kpp[4]}${kpp[5]}` === `45`) {
        const tmp = kpp[4];
        kpp[4] = kpp[5];
        kpp[5] = tmp;
    }

    return kpp.join('');
};
